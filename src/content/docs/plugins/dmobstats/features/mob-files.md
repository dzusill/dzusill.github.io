---
title: "Mob Files"
description: "Every mob has one file: plugins/dMobStats/mobs/<mob>.yml. They are generated on first start for every mob your server version has, with everything set to…"
---

Every mob has one file: `plugins/dMobStats/mobs/<mob>.yml`. They are generated on first start for every mob your server version has, with everything set to `vanilla`.

## Value syntax

| Type | Write it as | Notes |
|---|---|---|
| Not touched | `vanilla` or leave the key out | The plugin does not write anything. Vanilla's own randomness (baby zombies, horse speed, gear by difficulty) stays. |
| Fixed number | `4.0` | |
| Range | `{ min: 3.0, max: 5.0 }` | Rolled uniformly in `[min, max]`. Add `integer: true` for whole numbers. |
| Chance | `0.25`, `true`, `false` | `0.0`-`1.0`. `true` is `1.0`, `false` is `0.0`. A chance of `0` forces "no" (for example `baby-chance: 0` makes every zombie an adult). |
| Weighted pick | `{ RED: 3, BLUE: 1 }` | For colours and variants. A list `[RED, BLUE]` or a single name also works (weight 1). Names are case-insensitive. |
| Text | `"<red>Boss"` | `custom-name` only, MiniMessage. |

Hard limits apply to every value. A value outside its limits is **clamped** with a warning, `min` greater than `max` is swapped, an unknown key or a property the mob does not have is ignored with a warning. One bad value never disables the rest of the file. Run [`/dms validate`](/plugins/dmobstats/features/validate-and-debug/) to see all problems with line numbers.

## Schema

```yaml
# Zombie (minecraft:zombie) - generated for Paper 1.21.4
enabled: false                      # true = apply this file to new spawns of this mob

attributes:                         # see Properties
  max_health: vanilla               # vanilla 20.0
  attack_damage: { min: 3.0, max: 5.0 }
  movement_speed: vanilla           # vanilla 0.23
  armor: { min: 0, max: 4, integer: true }

special:                            # common + per-mob properties, see Properties
  baby-chance: vanilla              # vanilla: random
  can-break-doors: vanilla
  burn-in-daylight: vanilla

damage:
  dealt-multiplier: vanilla         # damage this mob deals, projectiles included
  taken-multiplier: vanilla         # damage this mob takes from entities

equipment:
  mode: VANILLA                     # VANILLA | REPLACE | FILL_EMPTY
  main-hand:
    chance: 0.25
    items:
      - { item: IRON_SWORD, weight: 3, enchants: { sharpness: { min: 1, max: 2 } } }
      - { base64: "H4sIAAAA...", weight: 1 }
    drop-chance: 0.085

effects:                            # not generated: add it yourself
  - { effect: speed, chance: 0.1, amplifier: { min: 0, max: 1 }, duration: infinite }

drops:
  xp: vanilla                       # vanilla | 2.0 | { mode: MULTIPLY|SET, min: .., max: .. }
  vanilla-drops: KEEP               # KEEP | CLEAR | { mode: MULTIPLY, min: 1.0, max: 2.0 }
  extra: []

spawn:
  chance: 1.0                       # 0.5 = half of the spawns are cancelled
  replace: []                       # [{ type: husk, weight: 1 }]

overrides:
  worlds: {}
  biomes: {}
```

Which keys appear under `attributes` and `special` depends on the mob and on your server version: only what the mob really has is generated. The vanilla number next to each key is read from your server when the file is created, so it matches your version.

The top-level keys are `enabled`, the property sections `attributes`, `special` and `damage`, the structured sections `equipment`, `effects` and `drops`, plus `spawn` and `overrides`. Any other top-level key is reported as unknown and ignored.

## Sections in detail

| Section | Page |
|---|---|
| `attributes`, `special` | [Properties](/plugins/dmobstats/features/properties/) |
| `damage` | [Damage Multipliers](/plugins/dmobstats/features/damage/) |
| `equipment`, `effects` | [Equipment & Effects](/plugins/dmobstats/features/equipment-and-effects/) |
| `drops` | [Drops & XP](/plugins/dmobstats/features/drops-and-xp/) |
| `spawn` | [Spawn Rules](/plugins/dmobstats/features/spawn-rules/) |
| `overrides` | [World & Biome Overrides](/plugins/dmobstats/features/overrides/) |

## Editing safely

- You can edit files by hand and keep using the GUI; the GUI re-checks the file before saving and refuses to overwrite a change somebody else made in between ("changed by someone else, reopen").
- GUI saves keep your comments and your own values; they only change the keys you edited.
- After a hand edit run `/dms validate`, then `/dms reload`. Existing mobs are not changed.
- If you lose a file, `backups/<mob>/` has the copies made before every GUI save and preset apply.
