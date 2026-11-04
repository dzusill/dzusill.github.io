---
title: "Radius Tiers"
description: "One tool, several sizes. A permission node widens the area for the players who hold it, without a second item, a second recipe or a second definition.…"
---

One tool, several sizes. A permission node widens the area for the players who hold it, without a second item, a second recipe or a second definition. `LIQUID_CLEAR`, `AREA_MINE` and `BUILD_WAND` work this way — a bucket's cube and a pickaxe's or wand's square are resolved by the exact same permission scan, and only the shape each one reads the number as differs.

```yaml
    liquid-clear:
      radius: 1        # what everyone gets: 3x3x3
      max-radius: 3    # the ceiling a permission may reach, never exceeded
      max-blocks: 0    # 0 = derive the cap from the granted radius

    area-mine:
      radius: 1        # what everyone gets: 3x3
      max-radius: 3    # the ceiling a permission may reach, never exceeded

    build-wand:
      radius: 1        # what everyone gets: 3x3
      max-radius: 3    # the ceiling a permission may reach, never exceeded
```

`radius` is the floor and `max-radius` is the ceiling. If they are equal the tool is not upgradable, no nodes exist for it, and the permission check is skipped entirely.

## The nodes

| Node | Effect |
|---|---|
| `oberontools.radius.<tool-id>.<n>` | Raise **that one tool** to radius `n` |
| `oberontools.radius.*.<n>` | Raise **every** radius tool to `n` at once, cube and square alike |

`<n>` is a whole radius, not a multiplier. What it produces depends on the tool's behavior:

| Radius | `LIQUID_CLEAR` cube `(2n+1)³` | `AREA_MINE` / `BUILD_WAND` square `(2n+1)²` |
|---|---|---|
| 1 | 3×3×3 — 27 blocks | 3×3 — 9 blocks |
| 2 | 5×5×5 — 125 blocks | 5×5 — 25 blocks |
| 3 | 7×7×7 — 343 blocks | 7×7 — 49 blocks |
| 4 | 9×9×9 — 729 blocks | 9×9 — 81 blocks |

A wildcard grant (`oberontools.radius.*.<n>`) reaches the wand as well as the pickaxe and bucket, and means different amounts of work per tool — tier 3 is 343 blocks for a bucket and 49 for a pickaxe — because each behavior answers with its own geometry. Nothing about the permission scan itself changes.

`radius` and `max-radius` are both capped at **8** by validation: 17×17×17 (4 913 blocks) for `LIQUID_CLEAR`, 17×17 (289 blocks) for `AREA_MINE` and `BUILD_WAND`. Anything larger refuses the config.

## Highest granted tier wins

The check walks **down** from `max-radius` and stops at the first node the player holds. Granting a group tier 2 and a rank tier 3 behaves the way you expect: the player gets 3.

Walking down rather than up matters in practice. If the scan went upwards and stopped at the first *missing* node, a LuckPerms setup that denies tier 2 while granting tier 3 would silently clamp the player to tier 1. Descending means a denied middle tier cannot mask a higher one the player legitimately holds.

A player with no radius node at all gets the tool's configured `radius`. The ceiling is absolute — a node above `max-radius` is never registered and never consulted.

## A worked example

The shipped `sponge_bucket` has `radius: 1`, `max-radius: 3`. Tiers 2 and 3 therefore exist:

```
lp group donator permission set oberontools.radius.sponge_bucket.2 true
lp group elite   permission set oberontools.radius.sponge_bucket.3 true
```

- Default players — 3×3×3, up to 27 blocks
- `donator` — 5×5×5, up to 125 blocks
- `elite` — 7×7×7, up to 343 blocks

To widen every radius tool a rank owns at once:

```
lp group elite permission set oberontools.radius.*.3 true
```

Confirm what a player actually resolves to by having them run:

```
/oberontools inspect
```

```
 • permitted: 5x5x5 (up to 125 blocks)
 • radius: 5x5x5 (up to 125 blocks)
```

The shipped `pickaxe`, `shovel` and `wand` follow the identical pattern, resolved as a square instead of a cube — also `radius: 1`, `max-radius: 3`:

```
lp group donator permission set oberontools.radius.pickaxe.2 true
lp group elite   permission set oberontools.radius.pickaxe.3 true
```

- Default players — 3×3, up to 9 blocks
- `donator` — 5×5, up to 25 blocks
- `elite` — 7×7, up to 49 blocks

```
 • radius: 5x5 (up to 25 blocks)
```

The wand is the same with `wand` as the id (`oberontools.radius.wand.2`); its lines read `up to 24 extra blocks`, because the centre block is the player's own.

## Letting a donor choose

A wide tool is not always the tool you want. A `donator` on tier 3 digging a 1-wide corridor is fighting their own pickaxe, so they can narrow it themselves:

```
/oberontools radius                    what every tool of yours is set to
/oberontools radius pickaxe 1          narrow it to 3x3
/oberontools radius pickaxe auto       track the rank again
```

The pick is per player and per tool, so a narrow pickaxe and a wide bucket live side by side. It is written to `radius-preferences.yml` and survives a restart. A player who never runs the command has no pick stored and behaves exactly as before: their tool sits at whatever tier their ranks reach.

### Cycling with `/radius`

Players do not need to type the tool or a number. `/radius` with no argument steps the tool they are **holding** to the next width they may use, wraps from the widest back to the narrowest, and reports it on the action bar:

```
/radius                  3x3 -> 5x5 -> 7x7 -> 3x3 ...
/radius 2                pick radius 2 (5x5) directly
/radius auto             follow the rank again
```

Which tool counts as held:

1. The **main hand**, if it holds a tool with an adjustable width (drill, excavator, bucket, wand).
2. Otherwise the **off hand**, but only for the two tools that work from there: the builder's wand and the sponge bucket. A drill in the off hand is just being carried and is never cycled by surprise.

Each tool also has its own shortcut, for when the player is not holding it:

| Command | Tool id |
|---|---|
| `/drill radius [radius\|auto]` | `pickaxe` |
| `/excavator radius [radius\|auto]` | `shovel` |
| `/bucket radius [radius\|auto]` | `sponge_bucket` |
| `/wand radius [radius\|auto]` | `wand` |

`width` works as an alias of `radius` on these. Landing on the widest tier stores `auto` rather than the number, so a player who cycled up to their top width keeps following their rank. A player with only one width gets `command.radius-only-one` instead of a change.

The lumber axe has no adjustable width: `/radius` with it in hand answers `command.radius-fixed`, and it has no shortcut. The labels are fixed (they are not configurable) and a shortcut is registered at startup only for a tool that exists and is enabled in `config.yml`. A label another plugin already owns is **not** taken; the console logs `Command name clash: …` and `/oberontools:<name>` still reaches this plugin. WorldEdit registers `//wand`, not `/wand`, so it does not clash.

Neither `/radius` nor the shortcuts have a permission node. They go through the same clamp as `/oberontools radius`, and tab completion lists only the tiers the player holds.

### It can only ever narrow

The command has no permission node because it does not need one. A pick is not a grant:

- Asking for a tier you were never given is **refused**, and nothing is stored.
- The ceiling is recomputed from permissions on **every single click**, then the pick is clamped against it. A pick above that ceiling collapses to the ceiling.
- Nothing about width is written to the item. Hand a tier-3 pickaxe to a player whose rank tops out at tier 1 and they mine 3×3 with it — not because we cleared anything, but because their permissions are what is asked on their swing.

That last point is what makes a donor tool safe to trade, sell or lose. The width belongs to the hand, never to the item:

| Situation | What the next swing does |
|---|---|
| Donor picked 3×3, still `elite` | 3×3 — their own choice stands |
| Donor picked 7×7, rank expires to nothing | 3×3 — the stored 7 is capped by what they now hold |
| `elite` gives their pickaxe to a default player | 3×3 for that player, 7×7 again in the owner's hand |
| Default player is granted `elite` tomorrow | 7×7 immediately, no reissue, no reload |

A pick above the ceiling falls back to the **ceiling**, not to the tool default: a player entitled to 5×5 who once asked for 11×11 still gets their 5×5.

## `%size%` in lore

A tool's lore can show the width it currently has for **whoever holds it**:

```yaml
      lore:
        - "<#7e7e7e>Mines a %size% Area"        # 3x3, 5x5, 7x7 ...
        - "<gray>a <white>%size%</white> cube around it.</gray>"   # sponge bucket: 3x3x3, 5x5x5 ...
```

It is the holder's effective radius: their permission ceiling with their own pick applied. It is redrawn after `/radius`, and within one `processing.expiry-refresh-interval-ticks` after a rank or permission change, in the whole inventory and **both hands**, whatever `expiry-refresh-scope` is set to. The item remembers the width it was drawn with and is only rewritten when that no longer matches, so an unchanged width costs one data lookup and writes nothing. A held item that does change replays the client's re-equip animation once, which is the change being shown.

Like `%expiry%`, it goes stale outside a player's inventory: in a chest, an ender chest or an auction listing it keeps showing the **last holder's** width. A `TIMBER` tool renders `%size%` as blank. Write a fixed size into the lore instead if you want one that never moves. See [Placeholders](/plugins/oberontools/placeholders/).

## They tab-complete

Tool ids and ceilings come from `config.yml`, so these nodes cannot be listed in `plugin.yml` the way a fixed node can. OberonTools registers them with the server at enable, and again on every reload, which is what puts them into LuckPerms' tab-completion and permission browser instead of leaving you to type them blind. It is also what gives `oberontools.radius.<tool>.*` something to expand to — a trailing wildcard only covers children the server has been told about.

Registration is scoped exactly to what exists: for each upgradable tool, tiers `radius + 1` through `max-radius`, and nothing else. Rename a tool or lower its ceiling, reload, and the stale tiers are removed from the list in the same pass.

Radius tiers are registered with **`default: false`**, deliberately. A donator tier nobody was granted must not fall through to operators, or every admin would quietly be draining or mining a far larger area than they meant to.

## The block cap (`LIQUID_CLEAR` only)

`max-blocks` is the hard limit on how many blocks one activation may change. `AREA_MINE` and `BUILD_WAND` have no equivalent key: a square is always exactly `(2n+1)²` blocks at whatever radius the player resolved to, so there is nothing separate to cap.

| Value | Behaviour |
|---|---|
| `0` | Derive it from the radius the player actually got: 27 at radius 1, 125 at 2, 343 at 3 |
| a number | Use exactly that, at every radius |

`max-blocks: 0` is what makes a granted tier actually mean something — widening the area without widening the cap would just spread the same 27 blocks over a bigger box. A hand-set cap is honoured as written and is the tool for "a wider reach, but never more than 100 blocks of work".

The cap is applied to a list sorted **nearest-first**, so when it bites, the blocks that get cleared are the ones closest to what the player clicked.

Valid values are `0`, or 1 up to 4 913.

## The tick budget does not scale with radius

This is the important half of the design, and it is deliberate.

`processing.max-block-attempts-per-tick` is a single server-wide allowance and it is **completely independent of radius**. A 343-block drain does not get a bigger slice of a tick than a 27-block one — it gets the same slice, for more ticks.

```
radius 1  →  27 blocks  ≈  27 attempts   ≈  under one tick's budget
radius 3  → 343 blocks  ≈ 343 attempts   ≈  four ticks at the shipped budget of 96
```

So selling a bigger bucket costs your server *time*, not *headroom*. The worst tick on a server where everyone has tier 3 is exactly the worst tick on a server where nobody does. See [The Job Queue](/plugins/oberontools/features/job-queue/).

## Timber tools have no tiers

`LIQUID_CLEAR`, `AREA_MINE` and `BUILD_WAND` all get radius tiers. `TIMBER` is the one behavior that does not, and deliberately: it bounds its work with `max-logs`, `max-leaves` and the two search radii, all fixed per definition and not raisable by a permission. A tree is felled whole regardless of how far the search looked, so widening the search radius finds more of the *same* tree rather than giving a donator a bigger one. If you want a bigger axe for a donator rank, define a second `TIMBER` tool with its own `use-permission`.
