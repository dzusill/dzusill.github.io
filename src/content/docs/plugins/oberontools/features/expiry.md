---
title: "Expiry"
description: "A tool can be a rental. expires-after gives every copy a deadline, %expiresat% shows that deadline in its lore, and expired-policy decides what the dead…"
---

A tool can be a rental. `expires-after` gives every copy a deadline, `%expires_at%` shows that deadline in its lore, and `expired-policy` decides what the dead item does afterwards.

```yaml
    item:
      expires-after: 7d
      expired-policy: KEEP_DISABLED
```

## The one thing to understand first

**The deadline is stamped onto each item at the moment it is created**, as an absolute timestamp in the item's own persistent data. It is not read from the config when the tool is used.

So:

- A `7d` bucket crafted on Monday dies the following Monday. A `7d` bucket crafted on Friday dies the following Friday. They are different items with different deadlines, even though they came from the same definition.
- Changing `expires-after: 7d` to `30d` and reloading **does not extend a single tool already in circulation.** It only changes what the next crafted or given tool gets stamped with.
- Changing it to `PERMANENT` does not rescue existing tools either. They keep the deadline they were born with.
- `/oberontools refresh` re-renders an item from the current config but deliberately **preserves** the stamp. There is no supported way to extend a tool that already exists.

This is intentional. A rental period that silently changes retroactively is not a rental period, and a player who paid for seven days should get seven days regardless of what you edit afterwards. If you need to hand somebody a longer copy, give them a new one:

```
/oberontools give Steve sponge_bucket 1 30d
```

## Writing a duration

| Value | Meaning |
|---|---|
| `PERMANENT` | Never expires |
| `never`, `none`, `-1`, an empty value | Same as `PERMANENT` |
| `7d` | Seven days |
| `12h30m` | Twelve and a half hours |
| `12h 30m` | The same — whitespace is stripped first |
| `90s` | Ninety seconds |

Units are `d`, `h`, `m`, `s` and may be combined in any order. Parsing is strict: `7x`, `7dbogus` and a duration that adds up to zero are all rejected outright rather than being silently truncated. A rejected value refuses the config.

## What happens when it expires

An expired tool **always** stops working. Every activation is refused with `tool.expired`, regardless of policy. The policy only decides whether the dead item is left in the inventory.

| `expired-policy` | Behaviour |
|---|---|
| `KEEP_DISABLED` | The item stays where it is. It still shows its lore, which will read `Expired`. Nothing it does works. |
| `REMOVE` | The item is deleted by the refresh pass, inventory-open refresh, `/oberontools refresh`, or an attempted use after its deadline. |

> Periodic redraws intentionally skip the selected main-hand item and the off hand. Changing item lore while held makes the vanilla client replay its re-equip animation. A held countdown therefore stays frozen until the player switches slots or opens an inventory; attempted use still enforces the deadline immediately and removes a `REMOVE` item.

## Lore placeholders

Three placeholders render the state, and all three take their wording from `messages.yml` rather than from Java:

| Placeholder | Renders | Permanent tool | Expired tool |
|---|---|---|---|
| `%expiry%` | Time left, as `6d 23h 4m 12s` | `expiry.permanent` | `expiry.expired` |
| `%expires_at%` | The absolute moment, formatted with `expiry.date-format` | `expiry.permanent` | the date, as normal |
| `%expiry_status%` | A single word | `expiry.permanent` | `expiry.expired` (otherwise `expiry.active`) |

```yaml
# messages.yml
expiry:
  permanent: "<green>Never</green>"
  expired: "<red>Expired</red>"
  active: "<green>Active</green>"
  date-format: "yyyy-MM-dd HH:mm"
```

`%expires_at%` is rendered in the **server's** time zone, using a `java.time` pattern. Units below one second are dropped from `%expiry%`, and anything under a second reads `0s`.

> **`%expiry%` goes stale outside a player's inventory.** The countdown is redrawn by a task that walks online players' inventories and nothing else, so the moment a tool goes into a chest, an ender chest or an auction listing, its text freezes at whatever it said on the way in. A listing can sit there reading `6d 23h` while the tool has two days left, and the buyer has no way to tell.
>
> Nothing is paused by this — the deadline is an absolute timestamp stamped into the item at creation and it is never rewritten, so where the item sits has no bearing on when it dies. It is only the *displayed* number that stops keeping up.
>
> This is why the shipped tools use `%expires_at%`. A date cannot go stale, so it stays right in a chest, on an auction house, and across restarts. Use `%expiry%` where the tool is expected to live in a player's hands.

Used in lore:

```yaml
      lore:
        - "<dark_gray>Expires in: %expiry%</dark_gray>"
        - "<dark_gray>Deadline: %expires_at%</dark_gray>"
        - "<dark_gray>Status: %expiry_status%</dark_gray>"
```

## Keeping the countdown ticking

Lore is static text on an item, so a countdown only moves if something rewrites it.

```yaml
processing:
  expiry-refresh-interval-ticks: 20
  expiry-refresh-scope: HOTBAR
```

| Key | Default | |
|---|---|---|
| `expiry-refresh-interval-ticks` | `20` | Ticks between passes. Must be 1–1200. `20` is once a second. |
| `expiry-refresh-scope` | `HOTBAR` | How much of each online player's inventory a pass looks at. |

| Scope | Slots scanned |
|---|---|
| `NONE` | Nothing. The task is never even scheduled. Countdowns only move when a tool is used or refreshed. |
| `HELD` | No periodic slot writes; held hands refresh when an inventory opens. |
| `HOTBAR` | The eight unselected hotbar slots. |
| `INVENTORY` | Every unselected storage slot. |

Two things keep this cheap:

- **Only items with an expiry stamp are considered.** A permanent tool is skipped before any text is built, so a server whose tools are all `PERMANENT` pays nothing but the scan.
- **Only stacks whose rendered lore actually changed are rewritten.** There is no full `updateInventory()` resend, and held slots are never mutated by the periodic pass, preventing the hand-bob animation.

Raise the scope to `INVENTORY` only if players complain that a bagged tool shows a stale number, or if you use `REMOVE` and want dead tools cleared out of backpacks too.

## Checking one item

```
/oberontools inspect
```

```
sponge_bucket
 • instance: 5f1c…-…-…
 • uses: 250/250
 • expires: 2026-08-27 14:03
 • remaining: 6d 23h 59m 58s
 • status: Active
```

`expires` and `remaining` are read straight off the item, so this is the authoritative answer when a player disputes their deadline.
