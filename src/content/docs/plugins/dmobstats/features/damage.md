---
title: "Damage Multipliers"
description: "Both are ranges from 0 to 100. The final damage of a hit is multiplied by the attacker's dealt-multiplier and then by the victim's taken-multiplier. A…"
---

```yaml
damage:
  dealt-multiplier: { min: 1.0, max: 1.3 }   # damage this mob deals
  taken-multiplier: 0.8                       # damage this mob takes from entities
```

Both are ranges from `0` to `100`. The final damage of a hit is multiplied by the attacker's `dealt-multiplier` and then by the victim's `taken-multiplier`. A result is never negative.

The GUI steps are 0.1 / 1.0. It asks for confirmation when `dealt-multiplier` is above 10 or `taken-multiplier` is 0 (an invulnerable-to-entities mob).

## What counts

| | Applies to |
|---|---|
| `dealt-multiplier` | Damage dealt by the mob itself (melee) **and by its projectiles and attacks**: arrows, fireballs, shulker bullets, wind charges, evoker fangs, area effect clouds it created. |
| `taken-multiplier` | Damage the mob takes from **entities**: other mobs, players, projectiles. |

`taken-multiplier` does **not** change fall, fire, lava, drowning, suffocation, explosions from blocks, or any other damage that is not caused by an entity.

## Rolled at spawn

Each mob rolls its two multipliers once when it spawns and stores them. Changing the config later does not change mobs that already exist. A mob dMobStats never modified has no stored multipliers and is never touched.

## Example

A skeleton that hits 0-30 % harder, arrows included:

```yaml
damage:
  dealt-multiplier: { min: 1.0, max: 1.3 }
```
