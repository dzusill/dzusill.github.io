---
title: "Extra Penalties"
description: "Beyond money, XP and items, a profile can spawn avengers, drop the lost money as an item, and run console commands."
---

Beyond money, XP and items, a profile can spawn avengers, drop the lost money as an item, and run console commands.

## Avenging monsters

```yaml
monster:
  enabled: false
  mobs:
    - type: ZOMBIE
      count: 1
      equip-victim-gear: false
      target-player: false
```

Spawn mobs at the death location. Each entry:

| Key | Description |
|---|---|
| `type` | [EntityType](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/EntityType.html) to spawn (e.g. `ZOMBIE`). |
| `count` | How many of this mob. |
| `equip-victim-gear` | Put the victim's armor + held item on the mob — so it carries off your loot. |
| `target-player` | After respawn, the mob hunts the player down. |

A great "your stuff is guarded now" mechanic — list several entries for a whole ambush.

## Money-item drop

```yaml
money-item:
  enabled: false
  material: GOLD_INGOT
  currency-per-item: 100.0
  fixed-count: -1
```

Instead of money vanishing, drop a physical item representing it at the death spot:

| Key | Description |
|---|---|
| `material` | The [Material](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Material.html) dropped. |
| `currency-per-item` | Items dropped = `ceil(money_lost / currency-per-item)`. |
| `fixed-count` | Drop exactly this many items regardless of money lost; `-1` = use `currency-per-item`. |

This turns the [money penalty](/plugins/ddeathpenalty/features/money-penalty/) into recoverable loot the killer (or anyone) can pick up — money leaves the victim but isn't destroyed.

## Console commands

```yaml
commands:
  - "say %player% died in %world% and lost %money_lost%"
  - "broadcast %player% got punished!"
```

Commands run from console on each death. Placeholders: `%player%`, `%world%`, `%money_lost%`. Use them for broadcasts, custom effects, integration with other plugins, or jail/teleport mechanics.
