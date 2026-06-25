---
title: "Respawn Effects"
description: "Punish a player past the death itself by controlling how they come back — weakened, hungry, and debuffed."
---

Punish a player past the death itself by controlling how they come back — weakened, hungry, and debuffed.

```yaml
respawn:
  set-health: -1.0
  set-food: -1
  potion-effects: []
  # - "SLOWNESS:200:0"
```

| Key | Default | Description |
|---|---|---|
| `set-health` | `-1.0` | Respawn health in **half-hearts** (max 20). `-1` = leave untouched (full). |
| `set-food` | `-1` | Respawn food level (0–20). `-1` = leave untouched. |
| `potion-effects` | `[]` | Potion effects applied on respawn. |

## Potion effects

Each entry is `EFFECT:durationTicks:amplifier` (20 ticks = 1 second; amplifier `0` = level I):

```yaml
respawn:
  set-health: 10.0          # respawn on 5 hearts
  set-food: 6               # respawn hungry
  potion-effects:
    - "SLOWNESS:200:0"      # Slowness I for 10s
    - "WEAKNESS:200:1"      # Weakness II for 10s
```

Use any valid [Bukkit PotionEffectType](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/potion/PotionEffectType.html) name.

> Respawn effects make death sting after the player is back on their feet — great for a "recovering from death" feeling. Combine with a harsh [item](/plugins/ddeathpenalty/features/item-penalty/) or [money](/plugins/ddeathpenalty/features/money-penalty/) penalty, or use them as the *only* penalty for a lighter server.
