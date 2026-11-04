---
title: "Builder's wand, /radius and %size% — in-game test plan"
description: "About twenty minutes. Geometry, payment order, water and the cycle order are covered by unit tests; this"
---

About twenty minutes. Geometry, payment order, water and the cycle order are covered by unit tests; this
proves them in the world, against real protection plugins and a real client.

## Setup

```
/op <you>
/oberontools give <you> wand
/oberontools give <you> pickaxe
/oberontools give <you> sponge_bucket
```

Wand in the off hand (F), a stack of cobblestone in the hotbar, survival mode. A flat floor and a flat wall
with open space in front of both.

## Placing

| # | Do | Expected |
|---|---|---|
| 1 | Place cobble on the floor | a 3x3 layer at the placed block's Y; action bar "Placed 9 blocks"; 8 cobble gone |
| 2 | Place cobble on the wall | an upright 3x3 on the wall, centred on the placed block |
| 3 | Place oak stairs / an oak log sideways / a top slab | every copy has the same facing / axis / half |
| 4 | Place a slab onto a slab (double slab) | nothing extra, no message |
| 5 | Place a chest, a door, a bed, a fence | nothing extra; action bar "The wand cannot copy that block." |
| 6 | Hold only 3 cobble, place one on the floor | 2 extra, nearest the centre first; inventory empty |
| 7 | Hold 1 cobble, place it | "You have no more of that block to place." |
| 8 | Creative mode, place on the floor | full 3x3, no items used |
| 9 | Stand where the square would go, place next to yourself | your own block is skipped, nothing placed inside you |
| 10 | Place on the floor at the edge of a 1-wide ledge | blocks over the drop are skipped (require-support) |
| 11 | Place sand on a wall over air | sand only where there is something solid below |
| 12 | Place a slab next to a water source (slab plane crosses the water) | the slab in the water is waterlogged, the dry ones are not; no new water anywhere |
| 13 | Place cobble with a named cobble stack | nothing extra, "cannot copy" |
| 13a | Place a carpet / rail on a wall-adjacent floor edge, a flower on stone | copies only where they survive (floor under the carpet, soil under the flower); no floating carpet |
| 13b | Place a slab next to seagrass in an ocean | the slab replacing seagrass is waterlogged |
| 13c | Place at the world border | nothing appears outside the border |
| 13d | Wand in a crafting grid, a furnace fuel slot, a brewing stand fuel slot | no blaze powder result; it never burns |
| 13e | With Vulcan: bridge normally with the wand in the off hand but no blocks to copy (e.g. merged slabs) | Vulcan still flags real Scaffold/FastPlace |

## Protection and rules

| # | Do | Expected |
|---|---|---|
| 14 | Place at the edge of a WorldGuard region you cannot build in | blocks inside the region are not placed, no cobble charged for them, no flicker |
| 15 | `combat.block-tools: true`, get tagged, place | only the placed block; in-combat message if notify is on |
| 16 | Wand in a blacklisted world | "cannot be used in this world" |
| 17 | `/oberontools give <you> wand 5s`, wait, place a block | wand deleted from the off hand, expired message |
| 18 | CoreProtect `/co inspect` on a wand block | logged as placed by you |
| 19 | With Vulcan: place 7x7 squares quickly | no FastPlace / AirPlace / Scaffold alerts for you; other players still flagged normally |

## Widths and /radius

```
lp user <you> permission set oberontools.radius.wand.2 true
lp user <you> permission set oberontools.radius.*.3 true
```

| # | Do | Expected |
|---|---|---|
| 20 | Within a second of the grant, look at the wand's lore | "Places a 7x7 Area" (wildcard .3 wins) |
| 21 | `/radius` with wand in off hand, empty main hand | 3x3, then 5x5, then 7x7, then 3x3; lore updates each time |
| 22 | `/radius` holding the drill in the main hand and the wand in the off hand | the drill cycles, not the wand |
| 23 | `/radius` holding the lumber axe | "has no adjustable width" |
| 24 | `/drill radius 2`, `/excavator radius auto`, `/bucket radius`, `/wand radius` without holding them | each changes that tool; tab completion lists only your tiers |
| 25 | Revoke the grants | within one refresh interval every %size% is back to 3x3 / 3x3x3, held items included |
| 26 | Bucket lore | "a 3x3x3 cube" / "5x5x5" following the holder |

## Live config upgrade

Start once with a 1.0 `config.yml` (config-version 1, lore "Mines a 3x3 Area"):

- the console says config.yml moved to config-version 2;
- the drill and excavator lore lines read `%size%`, the bucket's `3x3x3` line too;
- a lore line you had reworded is untouched;
- `tools.wand` is NOT added by the plugin itself (plugin-deploy adds it).
