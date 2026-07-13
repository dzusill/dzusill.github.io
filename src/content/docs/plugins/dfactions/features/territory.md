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
