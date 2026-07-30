---
title: "sellaxe.yml"
description: "The sell axe's look, its enchantments and its countdown format. Whether the feature runs at all is"
---

The sell axe's look, its enchantments and its countdown format. Whether the feature runs at all is
`sellaxe.enabled` in [config.yml](/plugins/ddonutworth/configuration/config/).

```yaml
sell-axe:
  display-name: "&fᴅɪᴀᴍᴏɴᴅ ꜱᴇʟʟ ᴀxᴇ"
  lore:
    - "&7Instantly sells all items in a chest"
  material: DIAMOND_AXE

  enchants:
    - "EFFICIENCY:5"
    - "UNBREAKING:3"
    - "MENDING"

sell-shulker-contents: true

lore:
  self-destruct-prefix: "&7Self Destruct: "
  timer-prefix: "&7"

time-format:
  days-format: "%dd "
  hours-format: "%dh "
  minutes-format: "%dm"
  empty-format: "Broken"
```

## sell-axe

| Key | What it does |
|---|---|
| `display-name` | The axe's name. Any colour dialect |
| `lore` | Static lore lines. The countdown is appended below them |
| `material` | Any material; an unknown one falls back to `DIAMOND_AXE` |
| `enchants` | Cosmetic. `ENCHANT` or `ENCHANT:LEVEL`; a bad level enchants at 1 rather than dropping it |

## sell-shulker-contents

Whether the axe also counts shulker boxes it finds inside the container, rather than just selling the boxes
themselves.

## lore

The countdown line is `self-destruct-prefix` + `timer-prefix` + the formatted time:

```
Self Destruct: 6d 23h 58m
```

Set both to `""` for a bare timer.

## time-format

`printf` patterns, one per unit. Units that are zero are left out, so two days and five minutes reads
`2d 5m` rather than `2d 0h 5m`. Under a minute still reads `0m` rather than blank.

`empty-format` is shown once the axe has expired — it is about to be consumed, so this is only briefly
visible.

A malformed pattern falls back to the bare number rather than breaking the item.

## Giving one out

```
/sellaxe give <player> 7d
```

Durations: `7d`, `12h`, `30m`, `45s`, or combinations like `1d12h`. A bare number is read as days.

See [The Sell Axe](/plugins/ddonutworth/features/the-sell-axe/) for how the timer is stored and what it interacts with.
