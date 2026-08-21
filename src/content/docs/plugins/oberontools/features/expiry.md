---
title: "Expiry"
description: "A tool can be a rental. expires-after gives every copy a deadline, %expiry% shows the countdown in its lore, and expired-policy decides what the dead item…"
---

A tool can be a rental. `expires-after` gives every copy a deadline, `%expiry%` shows the countdown in its lore, and `expired-policy` decides what the dead item does afterwards.

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
| `REMOVE` | The item is deleted the next time it is looked at by the refresh pass or by `/oberontools refresh`. |

> **`REMOVE` needs the refresh task to actually run.** Deletion happens during the countdown pass, so it only reaches slots inside `processing.expiry-refresh-scope`. With `expiry-refresh-scope: NONE` the pass never runs and a `REMOVE` tool is never deleted automatically — it behaves like `KEEP_DISABLED` until somebody runs `/oberontools refresh` while holding it. With `HOTBAR` (the shipped value), a dead tool buried in the backpack survives until the player moves it into the hotbar.

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
| `HELD` | Main hand and off hand |
| `HOTBAR` | The nine hotbar slots, plus the off hand |
| `INVENTORY` | Every slot, armour included, plus the off hand |

Two things keep this cheap:

- **Only items with an expiry stamp are considered.** A permanent tool is skipped before any text is built, so a server whose tools are all `PERMANENT` pays nothing but the scan.
- **Only stacks whose rendered lore actually changed are rewritten**, and a player's inventory is only re-sent if at least one of their stacks changed. A countdown showing `6d 23h` does not move once a second.

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
