---
title: "sellaxe.yml"
description: "The sell axe's look, its enchantments and its countdown format. Whether the feature runs at all is"
---

The sell axe's look, its enchantments and its countdown format. Whether the feature runs at all is
`sellaxe.enabled` in [config.yml](/plugins/oberonsell/configuration/config/).

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
  item-flags: []

  # Optional. Left out entirely, each of these leaves the item exactly as vanilla would build it.
  # custom-model-data: 10021
  # unbreakable: true
  # glint: true

sell-shulker-contents: true

lore:
  self-destruct-prefix: "&7Self Destruct: "
  timer-prefix: "&7"

time-format:
  days-format: "%dd "
  hours-format: "%dh "
  minutes-format: "%dm "
  seconds-format: "%ds"
  empty-format: "Broken"
```

## sell-axe

| Key | What it does |
|---|---|
| `display-name` | The axe's name. Any colour dialect |
| `lore` | Static lore lines. The countdown is appended below them |
| `material` | Any material; an unknown one falls back to `DIAMOND_AXE` |
| `enchants` | Cosmetic. `ENCHANT` or `ENCHANT:LEVEL`; a bad level enchants at 1 rather than dropping it |
| `item-flags` | What the tooltip hides. `HIDE_ENCHANTS` is the usual one, so a glint-only axe does not list enchantments |
| `custom-model-data` | Optional. For a resource pack. `-1` or absent means none — `0` is a real model, not "off" |
| `unbreakable` | Optional, default `false` |
| `glint` | Optional. `true` forces the shine, `false` suppresses it even with real enchantments. Left out entirely, vanilla decides |

Every optional key is only written onto the item when you actually set it. That matters because the axe is
rebuilt and compared against the one in hand on refresh: a key that was always written would make every
axe look changed on every check.

The axe is yours to redesign — material, name, lore, model and glint are all yours. Nothing in the plugin
recognises it by how it looks; identity lives in the item's persistent data, so a completely restyled axe
keeps working and a hand-made lookalike does not become one.

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
`2d 5m` rather than `2d 0h 5m`.

`seconds-format` is optional. Leave it out and the countdown stops at minutes, which is what a multi-day
timer wants; set it and the last minute counts down properly instead of sitting on `0m`.

`empty-format` is shown once the axe has expired — it is about to be consumed, so this is only briefly
visible.

A malformed pattern falls back to the bare number rather than breaking the item.

## Giving one out

```
/sellaxe give <player> 7d
```

Durations: `7d`, `12h`, `30m`, `45s`, or combinations like `1d12h`. A bare number is read as days.

See [The Sell Axe](/plugins/oberonsell/features/the-sell-axe/) for how the timer is stored and what it interacts with.
