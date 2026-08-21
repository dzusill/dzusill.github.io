---
title: "Radius Tiers"
description: "One LIQUIDCLEAR tool, several sizes. A permission node widens the cube for the players who hold it, without a second item, a second recipe or a second…"
---

One `LIQUID_CLEAR` tool, several sizes. A permission node widens the cube for the players who hold it, without a second item, a second recipe or a second definition.

```yaml
    liquid-clear:
      radius: 1        # what everyone gets: 3x3x3
      max-radius: 3    # the ceiling a permission may reach, never exceeded
      max-blocks: 0    # 0 = derive the cap from the granted radius
```

`radius` is the floor and `max-radius` is the ceiling. If they are equal the tool is not upgradable, no nodes exist for it, and the permission check is skipped entirely.

## The nodes

| Node | Effect |
|---|---|
| `oberontools.radius.<tool-id>.<n>` | Raise **that one tool** to radius `n` |
| `oberontools.radius.*.<n>` | Raise **every** radius tool to `n` at once |

`<n>` is a whole radius, not a multiplier. The cube it produces is `(2n+1)³`:

| Radius | Cube | Blocks |
|---|---|---|
| 1 | 3×3×3 | 27 |
| 2 | 5×5×5 | 125 |
| 3 | 7×7×7 | 343 |
| 4 | 9×9×9 | 729 |

`radius` and `max-radius` are both capped at **8** (17×17×17, 4 913 blocks) by validation. Anything larger refuses the config.

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
 • radius: 5x5x5 (125 blocks max)
```

## They tab-complete

Tool ids and ceilings come from `config.yml`, so these nodes cannot be listed in `plugin.yml` the way a fixed node can. OberonTools registers them with the server at enable, and again on every reload, which is what puts them into LuckPerms' tab-completion and permission browser instead of leaving you to type them blind. It is also what gives `oberontools.radius.<tool>.*` something to expand to — a trailing wildcard only covers children the server has been told about.

Registration is scoped exactly to what exists: for each upgradable tool, tiers `radius + 1` through `max-radius`, and nothing else. Rename a tool or lower its ceiling, reload, and the stale tiers are removed from the list in the same pass.

Radius tiers are registered with **`default: false`**, deliberately. A donator tier nobody was granted must not fall through to operators, or every admin would quietly be draining a far larger area than they meant to.

## The block cap

`max-blocks` is the hard limit on how many blocks one activation may change.

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

Radius tiers apply only to `LIQUID_CLEAR`. `TIMBER` bounds its work with `max-logs`, `max-leaves` and the two search radii, all of which are fixed per definition and cannot be raised by a permission. If you want a bigger axe for a donator rank, define a second `TIMBER` tool with its own `use-permission`.
