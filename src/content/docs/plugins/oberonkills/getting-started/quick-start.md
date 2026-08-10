---
title: "Quick Start"
description: "Write a message, preview it, add variants, and decide what happens to deaths you have not written wording for."
---

## 1. Write one

`config.yml`, under `Messages`:

```yaml
Messages:
  Pvp:
    bow:
      - "<#C21807><victim></#C21807> <gray>was picked off by</gray> <#C21807><killer></#C21807> <gray>from <distance> blocks"
```

`/oberonkills reload`.

## 2. Preview it

```
/oberonkills preview pvp bow
```

Renders the line with stand-in names — `Victim`, `Killer`, 42 blocks, a Netherite Sword. No second account, nobody
dying repeatedly.

## 3. Add variants

A key takes one line or a list. With a list, one is picked at random per death:

```yaml
    mace-smash:
      - "<#C21807><killer></#C21807> <gray>came down on</gray> <#C21807><victim></#C21807> <gray>like a meteor"
      - "<#C21807><victim></#C21807> <gray>was flattened from above by</gray> <#C21807><killer></#C21807>"
```

## 4. The tags

| Tag | Is |
|---|---|
| `<victim>` | who died |
| `<killer>` | who killed them (PvP) |
| `<mob>` | the mob that killed them (Mob) |
| `<item>` | the weapon, named properly |
| `<distance>` | blocks — bow, crossbow and trident kills only |
| `<cause>` | the raw key, e.g. `fall` |
| `<killer_rank>` `<victim_rank>` | rank prefixes, if you configure `Ranks` |

## 5. Decide about deaths you haven't written

```yaml
Keep-Vanilla-When-Unconfigured: true
```

Every category has a `default` key that catches anything you have not named, so you can write wording for the six
causes you care about and leave the rest to one line.

If a death reaches neither a specific key nor a default:

- `true` (default) — the vanilla message is used
- `false` — nothing is said at all, which is what a server that only wants PvP announcements asks for

## 6. Item names

```yaml
Item-Names:
  Mode: TRANSLATE
  Hover: true
```

`TRANSLATE` is almost always what you want — each player's client renders the proper name in their own language, and
it is right for items this plugin has never heard of. See [Item names](/plugins/oberonkills/features/item-names/).

## 7. Rank prefixes — optional

Empty by default; most servers do not want a rank in a death message. If you do:

```yaml
Ranks:
  - Permission: "group.admin"
    Display: "<red>[Admin]</red>"
Default-Rank: ""
```

Then use `<killer_rank>` and `<victim_rank>` in your messages.

> Order matters: an owner usually also holds every lower group's permission, so the highest rank must be listed first.
