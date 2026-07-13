---
title: "Supply Drops"
description: "Supply drops are timed, contested loot events. On a schedule, a loot chest spawns at a random"
---

**Supply drops** are timed, contested loot events. On a schedule, a loot chest spawns at a random
location; the first faction to reach and claim it wins the contents — expect a fight.

> **Disabled by default.** Enable with `factions.supply-drops.enabled: true`.

## Configuration

```yaml
factions:
  supply-drops:
    enabled: false
    interval-minutes: 30      # time between drops
    unlock-seconds: 300       # delay before a drop can be claimed (contest window)
    max-active: 1             # simultaneous active drops
    worlds: ["world"]         # eligible worlds
    radius: 2000              # max distance from spawn a drop may appear
    min-distance: 500         # min distance from spawn
    marker-material: CHEST    # block placed to mark the drop
    loot:                     # Material: amount
      DIAMOND: 8
      GOLD_INGOT: 16
      IRON_INGOT: 32
      EXPERIENCE_BOTTLE: 16
```

## How a drop plays out

1. **Spawn** — every `interval-minutes` (up to `max-active`), a marker block is placed at a random
   point in an eligible world between `min-distance` and `radius` of spawn, and announced.
2. **Contest window** — the drop can't be claimed for `unlock-seconds`, giving factions time to
   travel and fight over it.
3. **Claim** — after it unlocks, the first player to interact with the marker claims the `loot` for
   their faction; the marker is removed.

Loot is a simple `Material: amount` table — tune it to your economy. Because drops appear in the open
world with a contest delay, they naturally create PvP hotspots.

> Supply drops use the Folia-safe scheduler and behave correctly on region-threaded servers.
