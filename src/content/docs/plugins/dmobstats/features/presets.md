---
title: "Presets"
description: "A preset is a file in plugins/dMobStats/presets/<name>.yml that sets many mobs at once. Presets are never applied on their own."
---

A preset is a file in `plugins/dMobStats/presets/<name>.yml` that sets many mobs at once. Presets are **never applied on their own**.

dMobStats ships one, `hard.yml`, a moderate "harder mobs" example. It is installed on first start and never overwritten.

## Commands

```
/dms preset list
/dms preset apply <name>
/dms preset apply <name> confirm
```

Permission `dmobstats.admin` for all of them. Preset names are lowercase letters, digits, `_` and `-` (up to 64 characters).

1. `apply <name>` reads and lints the preset and **shows what it would change** (keys per mob), plus a clickable `[Click to apply]` (in the console: the command to type). Nothing is written yet.
2. Within **60 seconds**, the same sender confirms by clicking or running `apply <name> confirm`.
3. dMobStats then, under one lock:
   1. backs up **every** file in `mobs/` to `backups/`,
   2. writes the preset's keys into each mob file listed (a key the preset sets replaces your value; **every other key you set stays exactly as it is**),
   3. sets `enabled: true` for every mob in the preset,
   4. logs every changed key to `logs/changes.log`,
   5. reloads the profiles.

Only **new spawns** get the new values; mobs that already exist are never changed. If a mob file could not be written (missing or broken YAML) the others are still updated and you are told which one failed.

## Format

One section per mob, with the same keys as `mobs/<mob>.yml` (`attributes`, `special`, `damage`, `equipment`, `effects`, `drops`, `spawn`, `overrides`). Leave out a key to keep whatever the mob file has. "Key" means the second level (`attributes.max_health`, `equipment.main-hand`, `drops.xp`) or a whole top-level list (`effects`).

```yaml
zombie:
  attributes:
    max_health: { min: 22, max: 28 }        # vanilla 20
  equipment:
    mode: FILL_EMPTY
    main-hand:
      chance: 0.1
      items:
        - { item: IRON_SWORD, weight: 1 }
      drop-chance: 0.05
  drops:
    xp: { mode: MULTIPLY, min: 1.2, max: 1.5 }

witch:
  effects:
    - { effect: resistance, chance: 0.25, amplifier: 0, duration: infinite }
```

Overrides work the same way:

```yaml
zombie:
  overrides:
    worlds:
      world_nether: { attributes: { max_health: { min: 30, max: 40 } } }
```

Mobs the server does not know are skipped. Problems inside a preset are logged, and those keys are ignored when the files load.

## The bundled `hard` preset

Touches: zombie, husk, drowned, skeleton, stray, creeper, spider, enderman, phantom, witch. Highlights: somewhat more health on the undead (for example zombies 22-28 instead of 20), a chance for an iron sword in a zombie's or husk's hand, skeletons and strays hit up to 30 % harder (arrows included), creepers with a shorter fuse (20-30 ticks) and a bigger radius (3-4), phantoms up to size 2, witches with a chance of permanent Resistance or Speed, and an XP multiplier of about 1.2-1.5 on all of them.

## Make your own

Copy `hard.yml` to `presets/<name>.yml`, edit it, run `/dms preset list`, then `/dms preset apply <name>`. After applying, `/dms validate` checks the resulting mob files.
