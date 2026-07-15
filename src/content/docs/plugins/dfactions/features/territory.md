---
title: "Territory & Claims"
description: "Factions control the world by claiming chunks. Claimed land is protected from non-members"
---

Factions control the world by **claiming chunks**. Claimed land is protected from non-members
according to the faction's flags, and forms the battlefield for raids and wars.

## Claiming

```
/f claim            # claim the chunk you stand in
/f claim auto       # toggle auto-claim as you walk
/f unclaim          # release the current chunk
/f unclaimall       # release all of your land (leader)
/f map              # ASCII map of nearby territory
```

Area claims (fill / square / circle modes) are capped per command by
`factions.land.max-per-command` (default 200).

## Claim capacity is prestige-gated

The number of chunks a faction may hold comes from its **prestige rank**, not its power:

```yaml
factions:
  claims:
    per-prestige: [1, 2, 4, 6, 8, 10]   # index = prestige rank
```

Prestige 0 → 1 claim, prestige 1 → 2, … up to the table's end (which then repeats). Level up and
prestige to expand — see [Leveling & Prestige](/plugins/dfactions/features/progression/).

## What claimed land protects against outsiders

Inside a faction's claim, players who are **not members** are blocked from interfering — **unless
their faction is in an active [war](/plugins/dfactions/features/wars-and-shields/) with the owner**, which lifts every one of
these protections between the two belligerents (siege). Members always have full access to their own
land, and admins with `factions.bypass` are exempt.

- **Blocks** — no breaking or placing.
- **Containers & openables** — chests, barrels, furnaces, hoppers, shulkers, doors, trapdoors,
  gates, buttons, levers, pressure plates, anvils, and enchanting tables can't be used by outsiders.
- **Entity placement** — end crystals (e.g. on obsidian), armor stands, boats, minecarts, item
  frames and paintings can't be placed.
- **Animals & entities** — outsiders can't harm the faction's animals, pets, villagers, golems,
  water mobs, item frames, armor stands or vehicles (including via bows/tridents — projectiles are
  traced back to their shooter).
- **Potions** — harmful splash and lingering potions thrown by outsiders don't affect protected
  players or animals in the claim.
- **Home PvP protection** — a player standing in **their own** faction's claim is safe from
  outsiders who aren't at war with them, even a wilderness attacker firing arrows.

> **Faction team chests are never locked**, even during a war — members can always retrieve their
> gear. A losing faction only loses its chest contents if its [beacon](/plugins/dfactions/features/beacon/) is destroyed.
>
> An active [supply drop](/plugins/dfactions/features/supply-drops/) that lands inside a claim stays contested — its crate is
> exempt from container protection so anyone can loot it.

## Overclaiming

When enabled, a faction whose **power** has dropped below its claim count becomes raidable — enemies
can take its land chunk by chunk.

```yaml
factions:
  overclaiming:
    enabled: false
    require-enemy-relation: true          # must be ENEMY to overclaim
    offline-protection: { enabled: false } # block pure offline raiding
```

Power (not prestige) governs this vulnerability — see [Power & Raiding](/plugins/dfactions/features/power/).

## Buffer zones

Optionally force a gap between rival factions' land:

```yaml
factions:
  land:
    buffer-zone: 0    # minimum chunk gap between enemy factions (0 = off)
```

## Safe & war zones

Admins carve out special territory:

- **Safe zone** (`/fa safezone`) — no PvP, no building. Spawn/market areas.
- **War zone** (`/fa warzone`) — PvP always on, no building.

```yaml
factions:
  zones:
    safe-zone: { enabled: true }
    war-zone:  { enabled: true }
```
