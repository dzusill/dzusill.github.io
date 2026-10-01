---
title: "zones.yml"
description: "A zone is a WorldGuard region plus the rules for paying the people in it. The file is never saved"
---

A zone is a WorldGuard region plus the rules for paying the people in it. The file is **never saved
by the plugin** — it is yours, comments included. (Teleport points set in game go to
[`data.yml`](/plugins/oberonafk/configuration/database/#datayml).)

```yaml
zones:
  afk:
    enabled: true
    world: "spawn"
    region: "afk"
    interval: 30m
    chance: 100
    table: default
    countdown: true
    teleport:
      points: [ ]
      default: true
```

| Key | Default | Meaning |
|---|---|---|
| `enabled` | `true` | `false` keeps the zone in the file but switches it off |
| `world` | — | The world the region is in |
| `region` | — | The WorldGuard region id. Compared case-insensitively |
| `interval` | `30m` | Time in the zone per roll |
| `chance` | `100` | Percent chance that a finished interval pays anything. `100` always pays |
| `table` | `default` | Which table in [`rewards.yml`](/plugins/oberonafk/configuration/rewards/) it draws from |
| `countdown` | `true` | `false` hides the action-bar countdown in this zone only |
| `teleport.points` | empty | Landing points of `/afk`. One is picked at random |
| `teleport.default` | `false` | A bare `/afk` goes to the first enabled zone with this set, else the first enabled zone |

## Intervals

`90s`, `30m`, `1h30m` or `1h 30m`. A bare number is **minutes**. Zero, negative or unreadable values
disable the zone and the console says so; an absurdly large one does the same instead of stopping the
plugin.

## Teleport points

Easiest is in game: stand where players should land and run `/afk zone setspawn <zone>`. Points set that
way are kept in `data.yml` and **replace** the ones listed here until `/afk zone clearspawns <zone>`.
Written by hand:

```yaml
points:
  - { world: "spawn", x: 0.5, y: 100.0, z: 0.5, yaw: 0.0, pitch: 0.0 }
```

## Several zones

```yaml
zones:
  afk:
    world: "spawn"
    region: "afk"
    interval: 30m
    table: default
  vip:
    world: "spawn"
    region: "afk_vip"
    interval: 10m
    table: vip
```

When two enabled zones cover the same spot, the one listed first wins.

## Checking a zone

```
/afk zone list
/afk zone info <zone>
```

The status reads `active`, `disabled`, `region missing` (WorldGuard has no such region in that world) or
`table missing` (no such table in `rewards.yml`). The console reports the same at startup and after
every reload.

## Upgrading

`zones` and the shipped `zones.afk` are owner-curated: the core's key merge never puts back a zone or
a key you removed. A zone id longer than 64 characters is refused, because the database columns cannot
hold it.
