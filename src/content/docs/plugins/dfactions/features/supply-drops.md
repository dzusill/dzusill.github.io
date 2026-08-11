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
    worlds: ["world"]         # eligible worlds — a drop picks one at random
    radius: 2000              # max distance from spawn a drop may appear
    min-distance: 500         # min distance from spawn
    marker-material: CHEST    # block placed to mark the drop
    announce-landing: false   # chat broadcast; off because the boss bar shows the coordinates
    loot:                     # list of items; each rolled independently
      - material: DIAMOND
        amount: 8
      - material: GOLD_INGOT
        amount: 16
      - material: DIAMOND_SWORD          # optional custom/enchanted item
        amount: 1
        name: "<red>Raider's Blade"
        enchantments:
          SHARPNESS: 4
        chance: 10                        # rare: 10% chance to appear in a drop
```

Each `loot` entry supports `material`, `amount`, `name`, `lore`, `enchantments`, and an optional
`chance` (0–100, default 100). **Rare drops** are simply low-`chance` entries — add as many as you
like, each rolled on its own.

## How a drop plays out

1. **Spawn** — every `interval-minutes` (up to `max-active`), a marker block is placed at a random
   point in a **randomly chosen** eligible world between `min-distance` and `radius` of spawn. The
   broadcast **names the world** and coordinates it landed in.
2. **Contest window** — the drop can't be opened for `unlock-seconds`, giving factions time to travel
   and fight over it.
3. **Loot** — after it unlocks, the crate is **fully contested: any player may open and loot it**,
   regardless of whose territory it lands in. The first opener "secures" it (a one-time announcement),
   but nobody is locked out.
4. **Cleared** — once the crate is emptied, it **auto-removes** and a broadcast names the faction that
   cleared it out. Any drop that isn't emptied despawns after its grace period.

### Drops in claimed territory

A drop can land anywhere, including inside a faction's claim. While a drop is active:

- Its chunk **cannot be claimed or created on** — it stays neutral and contested until the drop is
  gone.
- The chunk is marked with a **gold ◉** on `/f map` so players can see it.

Because drops appear in the open world with a contest delay and are open to everyone, they naturally
create PvP hotspots.

> Supply drops use the Folia-safe scheduler and behave correctly on region-threaded servers.
