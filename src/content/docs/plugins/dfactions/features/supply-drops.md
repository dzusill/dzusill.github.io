---
title: "Supply Drops"
description: "Supply drops are timed, contested loot events. On a schedule, a loot chest spawns at a random"
---

**Supply drops** are timed, contested loot events. On a schedule, a loot **chest** spawns at a random
location with a floating hologram; it stays locked for a contest window, then anyone can open it and
grab the loot — expect a fight.

> **Disabled by default.** Enable with `factions.supply-drops.enabled: true`.

## Configuration

```yaml
factions:
  supply-drops:
    enabled: false
    interval-minutes: 30      # time between drops
    unlock-seconds: 300       # locked period after landing (contest window)
    max-active: 1             # simultaneous active drops
    worlds: ["world"]         # eligible worlds
    radius: 2000              # max distance from spawn a drop may appear
    min-distance: 500         # min distance from spawn
    marker-material: CHEST    # block placed for the drop
    despawn-seconds: 600      # after unlock, time before the drop despawns
    hologram:                 # floating text above the chest (MiniMessage; {x}/{z} available)
      - "<gold><bold>Supply Drop"
      - "<yellow>Right-click to loot"
    loot:                     # list of item definitions (custom / enchanted items supported)
      - material: DIAMOND
        amount: 8
      - material: DIAMOND_SWORD
        amount: 1
        name: "<red>Raider's Blade"
        lore:
          - "<gray>Recovered from a supply drop"
        enchantments:
          SHARPNESS: 4
          UNBREAKING: 3
```

## How a drop plays out

1. **Spawn** — every `interval-minutes` (up to `max-active`), a loot-filled chest lands at a random
   point in an eligible world between `min-distance` and `radius` of spawn, with a hologram above it,
   and is announced.
2. **Contest window** — for `unlock-seconds` the chest is **locked**: it can't be opened *or mined*,
   so nobody can bypass the timer. Factions travel and fight over it in the meantime.
3. **Open** — once it unlocks, **anyone** can open the chest and take the loot inside. The first
   player to open it triggers a *"secured"* broadcast, but that's just an announcement — it does **not**
   lock anyone else out. The drop despawns `despawn-seconds` after unlocking.

Loot is a list of item definitions — each with a `material` and optional `amount`, display `name`,
`lore`, and `enchantments` — so you can hand out fully custom, enchanted gear. You **cannot create a
faction** on top of an active drop. Because drops appear in the open world with a contest delay, they
naturally create PvP hotspots.

> Supply drops use the Folia-safe scheduler and behave correctly on region-threaded servers.
