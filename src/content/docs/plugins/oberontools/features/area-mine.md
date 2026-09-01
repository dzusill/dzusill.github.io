---
title: "Area Mine"
description: "behavior: AREAMINE mines a square plane perpendicular to the face the player breaks. The shipped radius of 1 is a 3×3 area: vanilla breaks the centre block,…"
---

`behavior: AREA_MINE` mines a square plane perpendicular to the face the player breaks. The shipped radius of `1` is a 3×3 area: vanilla breaks the centre block, then OberonTools queues up to eight eligible neighbours.

```yaml
tools:
  pickaxe:
    behavior: AREA_MINE
    item:
      material: NETHERITE_PICKAXE
      max-uses: -1
      expires-after: 7d
      expired-policy: REMOVE
    area-mine:
      tool: PICKAXE
      vertical-anchor: FLOOR
      radius: 1
      max-radius: 3
```

## Orientation

The hit face determines the plane:

| Face mined | Plane |
|---|---|
| Top or bottom | Horizontal X/Z square |
| North or south | Vertical X/Y square |
| East or west | Vertical Y/Z square |

The listener ray-traces the block still under the crosshair. If another plugin or unusual client state prevents an exact trace, it falls back to the player's dominant look axis.

## Where a wall square sits vertically

`vertical-anchor` decides where the square is placed on the vertical axis. It applies to the four wall faces only — a floor or ceiling square is flat and has no height to place.

| Value | Placement |
|---|---|
| `FLOOR` *(default)* | The bottom row stays **one block below** the block you mined, at every radius. The extra height a wider tier buys is added upward. |
| `CENTERED` | The square is centred on the block you mined, so each step up in radius also digs one block further down. |

That one block below is the floor of a tunnel. Aiming level, a standing player's crosshair lands one block above the block their feet occupy, so a bottom row at −1 sits exactly at their feet and the block they are standing on is never cut.

This only matters once a tool is upgradable. **3×3 is identical under both anchors** — it is the wider tiers that diverge:

```
                CENTERED                      FLOOR

  5×5     ░ ░ ░ ░ ░   +2              ░ ░ ░ ░ ░   +3
          ░ ░ ░ ░ ░   +1              ░ ░ ░ ░ ░   +2
          ░ ░ X ░ ░    0  ← aimed     ░ ░ ░ ░ ░   +1
          ░ ░ ░ ░ ░   -1  ← floor     ░ ░ X ░ ░    0  ← aimed
          ░ ░ ░ ░ ░   -2  ← standing  ░ ░ ░ ░ ░   -1  ← floor
          ▓ ▓ ▓ ▓ ▓   -3              ▓ ▓ ▓ ▓ ▓   -2  ← standing, untouched
```

Centred, a 5×5 cuts one block into the ground the player is standing on and a 7×7 cuts two, so holding a level tunnel means aiming one block higher for 5×5 and two for 7×7. `FLOOR` removes that: aim straight ahead at any tier and the tunnel keeps its Y.

The shift never lifts the square clear of the block that was mined — the range is −1 to 2×radius−1 — so the mined block is always inside the square and the centre-skip keeps working.

`CENTERED` restores the pre-1.1 behaviour if you want a tool that digs down as it widens.

## Which blocks qualify

`tool: PICKAXE` follows Minecraft's `mineable/pickaxe` block tag and requires the held item to be a vanilla pickaxe material. `tool: SHOVEL` does the same with `mineable/shovel` and a shovel item. Every candidate is also checked with Paper's preferred-tool rule, so the tool must actually be suitable for that block.

This means a drill does not erase adjacent dirt and an excavator does not break adjacent stone. Air and every block outside the matching vanilla tag are ignored.

## Drops, protections, and cost

The centre block remains a normal `BlockBreakEvent`. Every eligible secondary block goes through the shared job queue and fires its own protection event when `processing.fire-protection-events` is enabled. Secondary drops use a snapshot of the actual tool, preserving Fortune and Silk Touch behavior.

One successful plane spends one configured use, not one use per block. The shipped drill and excavator use `max-uses: -1`, so time is their only limit. Both are removed seven days after their individual creation timestamps.

## Configuration

| Key | Default | |
|---|---|---|
| `tool` | required | `PICKAXE` or `SHOVEL` |
| `vertical-anchor` | `FLOOR` | `FLOOR` or `CENTERED`. Wall faces only |
| `radius` | `1` | The square everyone gets. 1–8; side length is `radius × 2 + 1` |
| `max-radius` | same as `radius` | The ceiling a permission may raise `radius` to. Must be ≥ `radius`, ≤ 8 |

Larger radii do not increase a single tick's work. They add more queued operations, still bounded by `processing.max-block-attempts-per-tick`.

## Permission tiers

`radius` is the floor and `max-radius` the ceiling, exactly as on a `LIQUID_CLEAR` bucket — the same permission scan serves both, and only the shape it resolves to differs. Both shipped mining tools ship `radius: 1`, `max-radius: 3`, so tiers 2 and 3 exist and are registered with the server at enable:

```
lp group donator permission set oberontools.radius.pickaxe.2 true
lp group elite   permission set oberontools.radius.pickaxe.3 true
```

| Radius | Square | Blocks |
|---|---|---|
| 1 | 3×3 | 9 |
| 2 | 5×5 | 25 |
| 3 | 7×7 | 49 |
| 4 | 9×9 | 81 |

`oberontools.radius.*.<n>` raises every radius tool at once, cube and square alike — so a wildcard tier 3 is 343 blocks on a bucket and 49 on a pickaxe. The highest tier a player holds wins. Setting `max-radius` equal to `radius` registers no nodes and skips the check entirely.

Confirm what a player actually resolves to with `/oberontools inspect`, which prints the square and its cap:

```
 • radius: 5x5 (up to 25 blocks)
```

Full rules in [Radius Tiers](/plugins/oberontools/features/radius-tiers/).
