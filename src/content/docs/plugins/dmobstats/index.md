---
title: "dMobStats"
description: "dMobStats lets you set every stat of every mob as a range, override it per world or biome, and edit it all in an in-game admin GUI. Zombies with 22-28…"
---

**dMobStats** lets you set every stat of every mob as a range, override it per world or biome, and edit it all in an in-game admin GUI. Zombies with 22-28 health, creepers with a shorter fuse, a witch that spawns with Resistance, an Enderman that drops XP x1.4: all of it as plain numbers, with nothing hard-coded.

It is free, built on [DzusillCore](https://github.com/dzusill/DzusillCore), and runs on Paper 1.21.x to 26.x with a single jar.

---

## The one rule: new spawns only

Every value is rolled **once, when a mob comes into existence**, and then stored on that mob.

- Change a value, save, reload: only mobs that spawn **afterwards** use it.
- A mob that already exists keeps the values it spawned with. This also holds across chunk unloads, restarts and `/dms reload`.
- Mobs that existed before you installed the plugin stay vanilla until they die or despawn.
- Nothing is ever re-rolled. There is no command to re-roll existing mobs.

Details and the exceptions are in [New Spawns Only](/plugins/dmobstats/features/new-spawns-only/).

---

## What it does

- **Every property as a range** - attributes (health, damage, speed, armor, follow range, scale...), special properties (creeper fuse, slime size, horse colour, wolf variant...), damage multipliers, equipment, potion effects, drops and XP, spawn chance and replacement.
- **Per-world and per-biome overrides** - merged key by key: mob, then world, then biome.
- **Admin GUI** - click to step a value, shift-click for a big step, Q to type an exact value. Equipment and extra drops are added by inserting an item (the GUI stores a copy).
- **Safe by default** - every mob file ships `enabled: false` and `vanilla`. Hard limits on every value, a confirmation above dangerous thresholds, a backup before every GUI save and an audit log of every change.
- **Tools** - `/dms inspect` shows what a mob was rolled with, `/dms spawn` makes test mobs, `/dms validate` lints every file, presets apply a whole set-up with one confirmed command.
- **Works with what you have** - which spawn reasons are modified is a config list, so spawners, eggs, `/summon` and other plugins' mobs are yours to include or leave alone.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper **1.21.x to 26.x** |
| Java | **21+** |
| DzusillCore | **1.14.6+** (required) |
| Other plugins | none |

---

## The idea in one picture

```
mob spawns (CreatureSpawnEvent, or a brand-new chunk's worldgen mobs)
  └─ is it modified at all?     plugin enabled · world allowed · spawn reason listed · not already stamped
     └─ profile                 mobs/<mob>.yml  →  world override  →  biome override
        └─ spawn rules          chance (cancel) · replace with another mob
           └─ roll and apply    attributes · special · equipment · effects
              └─ store on mob   damage multipliers · XP · drop snapshot · revision (inside the mob's own data)
```

Death and damage handlers read the numbers stored on the mob, never the current config. That is why a later config change cannot touch a mob that already exists.

---

## Quick links

- [Requirements](/plugins/dmobstats/getting-started/requirements/)
- [Installation](/plugins/dmobstats/getting-started/installation/)
- [Quick Start](/plugins/dmobstats/getting-started/quick-start/)
- [New Spawns Only](/plugins/dmobstats/features/new-spawns-only/)
- [Mob Files](/plugins/dmobstats/features/mob-files/)
- [Admin GUI](/plugins/dmobstats/features/admin-gui/)
- [config.yml](/plugins/dmobstats/configuration/config/)
- [Commands & Permissions](/plugins/dmobstats/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/dmobstats/faq/)
