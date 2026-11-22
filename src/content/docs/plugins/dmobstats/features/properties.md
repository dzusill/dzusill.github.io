---
title: "Properties"
description: "Properties live in the attributes and special sections of a mob file. Only what a mob actually has on your server version is generated and shown in the GUI."
---

Properties live in the `attributes` and `special` sections of a mob file. Only what a mob actually has on your server version is generated and shown in the GUI.

## Attributes

Attributes are written as the mob's **base value**, so they live in the mob's own saved data and keep working across restarts. Health is set to the rolled max health on spawn.

| Key | Hard limits | GUI step (click / shift) | GUI confirm above |
|---|---|---|---|
| `max_health` | 1 - 1024 | 1 / 10 | |
| `attack_damage` | 0 - 2048 | 0.5 / 5 | |
| `attack_knockback` | 0 - 5 | 0.1 / 1 | |
| `movement_speed` | 0 - 1024 | 0.01 / 0.05 | 0.5 |
| `flying_speed` | 0 - 1024 | 0.01 / 0.1 | |
| `armor` | 0 - 30 | 1 / 5 | |
| `armor_toughness` | 0 - 20 | 1 / 5 | |
| `knockback_resistance` | 0 - 1 | 0.05 / 0.25 | |
| `follow_range` | 0 - 2048 | 1 / 16 | 64 |
| `jump_strength` | 0 - 32 | 0.05 / 0.25 | |
| `spawn_reinforcements` | 0 - 1 | 0.01 / 0.1 | |
| `scale` | 0.0625 - 16 | 0.1 / 1 | 3 |
| `step_height` | 0 - 10 | 0.1 / 1 | |
| `gravity` | -1 - 1 | 0.01 / 0.04 | |
| `safe_fall_distance` | -1024 - 1024 | 1 / 5 | |
| `fall_damage_multiplier` | 0 - 100 | 0.1 / 1 | |
| `movement_efficiency` | 0 - 1 | 0.1 / 0.5 | |
| `water_movement_efficiency` | 0 - 1 | 0.1 / 0.5 | |
| `oxygen_bonus` | 0 - 1024 | 1 / 10 | |
| `burning_time` | 0 - 1024 | 0.1 / 1 | |
| `explosion_knockback_resistance` | 0 - 1 | 0.05 / 0.25 | |
| `tempt_range` | 0 - 2048 | 1 / 10 | |

A key is offered only if the mob has that attribute and your server version knows it (the plugin also resolves the older `generic.` attribute names used before 1.21.2). Player-only attributes are never offered.

## Common special properties

Available on every mob that has the matching trait. All are in the `special` section.

| Key | Type | Applies to | Notes |
|---|---|---|---|
| `baby-chance` | chance | mobs that can be babies | vanilla: random |
| `iframes` | range, integer 0 - 200 | all | maximum no-damage ticks |
| `can-pick-up-items` | chance | all | vanilla: random, by difficulty |
| `silent` | chance | all | |
| `glowing` | chance | all | |
| `left-handed` | chance | all | vanilla: random, 5 % |
| `burn-in-daylight` | chance | zombies, skeletons, phantoms | |
| `custom-name` | text (MiniMessage) | all | file-only: shown but not editable in the GUI |

## Per-mob special properties

| Mob | Keys |
|---|---|
| Creeper | `fuse-ticks` (1 - 1200, integer), `explosion-radius` (0 - 32, integer, confirm above 6), `powered` (chance) |
| Slime, Magma Cube | `size` (1 - 32, integer, confirm above 8; vanilla random 1, 2 or 4) |
| Phantom | `phantom-size` (0 - 64, integer, confirm above 16) |
| Ghast | `explosion-power` (0 - 32, integer, confirm above 4) |
| Zombie family | `can-break-doors` (chance; not on drowned or zombified piglins) |
| Bogged | `sheared` (chance) |
| Piglin, Piglin Brute, Hoglin | `immune-to-zombification` (chance); Piglin also `can-hunt`; Hoglin also `can-be-hunted` |
| Raiders (pillager, vindicator, evoker, ravager, witch...) | `patrol-leader`, `can-join-raid` (chances); Vindicator `johnny` |
| Vex | `limited-lifetime-ticks` (0 - 72000, integer; 0 = lives forever) |
| Endermite | `lifetime-ticks` (1 - 2400, integer) |
| Shulker | `shulker-color` (weighted) |
| Horse | `horse-color`, `horse-style` (weighted) |
| Horse-like mobs (horse, donkey, mule, llama, camel...) | `max-domestication` (1 - 1000, integer) |
| Llama | `llama-color` (weighted), `llama-strength` (1 - 5, integer) |
| Wolf, Cat, Frog | `wolf-variant`, `cat-variant`, `frog-variant` (weighted) |
| Fox | `fox-type` (weighted) |
| Axolotl | `axolotl-variant` (weighted) |
| Parrot | `parrot-variant` (weighted) |
| Rabbit | `rabbit-type` (weighted, includes the killer bunny) |
| Mooshroom | `mooshroom-variant` (weighted) |
| Panda | `main-gene`, `hidden-gene` (weighted) |
| Sheep | `wool-color` (weighted) |
| Tropical fish | `fish-pattern`, `body-color`, `pattern-color` (weighted) |
| Goat | `screaming`, `left-horn`, `right-horn` (chances) |
| Bee | `angry` (chance) |
| Snow Golem | `derp` (chance) |
| Pig, Cow, Chicken, Salmon, Copper Golem, Zombie Nautilus | variant properties, **only on server versions whose Paper API has them** |

Weighted names are listed in the generated file above the key (`weights, one of: ...`), for example:

```yaml
special:
  wool-color: { WHITE: 5, BLACK: 1, PINK: 1 }
```

Not offered: zombie conversion time (the Paper API starts a conversion instead of changing a timer). Wither, Ender Dragon, Warden and Elder Guardian have attributes and damage multipliers; the Wither and the Ender Dragon spawn with reasons that are not in the default list, so add the reasons you need.

## Why `vanilla` and not a number

`vanilla` means untouched. dMobStats never writes a fixed "vanilla" number, because vanilla often randomises (horse speed and jump, 5 % baby zombies, gear by difficulty) and a fixed value would remove that randomness.
