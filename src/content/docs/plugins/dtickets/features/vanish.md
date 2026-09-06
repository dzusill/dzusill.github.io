---
title: "Vanish awareness"
description: "A vanished admin who shows up in a ticket's nearby-players list is not vanished. dTickets respects"
---

A vanished admin who shows up in a ticket's nearby-players list is not vanished. dTickets respects
PremiumVanish and SuperVanish everywhere it names or counts players.

```yaml
Vanish:
  Enabled: true
  Filter-Tab-Completion: true
  Levels:
    - Target: "pv.see.level6"
      Required: "pv.see.level100"
    - Target: "pv.see.level5"
      Required: "pv.see.level5"
    - Target: "pv.see.level4"
      Required: "pv.see.level4"
    - Target: "pv.see.level3"
      Required: "pv.see.level3"
    - Target: "pv.see.level2"
      Required: "pv.see.level2"
    - Target: "pv.see.level1"
      Required: "pv.see.level1"
  Fallback-Required: "pv.see"
```

## Where it applies

- the nearby-players list captured as [evidence](/plugins/dtickets/features/evidence/)
- staff lists and online counts
- alerts and announcements
- tab completion, when `Filter-Tab-Completion` is on

`Filter-Tab-Completion` matters more than it looks. Without it, a player typing `/report a` and seeing
a vanished admin's name complete has learned they are online — the leak is in the autocomplete, not
in any message.

## Levels

PremiumVanish supports vanish levels: a level-6 admin should be invisible to a level-3 moderator, not
just to players. The `Levels` list maps each level to the permission needed to see somebody at it.

Read a pair as: *a player holding `Target` is only visible to somebody holding `Required`.*

The first entry is the interesting one. A `pv.see.level6` admin requires `pv.see.level100` to be
seen — a node nobody normally has, which makes the top level effectively invisible to everyone. Change
it to `pv.see.level6` if you want same-level staff to see each other.

Levels are checked in list order, so keep the highest first.

## Fallback

```yaml
Fallback-Required: "pv.see"
```

Used for anyone vanished who matches none of the `Levels` entries — including SuperVanish, which has
no level concept at all. Plain `pv.see` is the standard node both plugins use.

## Without a vanish plugin

Neither is required. With both absent the whole block is inert, nobody is treated as vanished, and
`Vanish.Enabled` makes no difference. You can also set `Enabled: false` to ignore vanish even when a
vanish plugin is installed — but there is rarely a good reason to.
