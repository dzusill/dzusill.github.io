---
title: "zones.yml"
description: "Named regions a crate may land in. Only used when placement.mode is ZONES."
---

Named regions a crate may land in. Only used when `placement.mode` is `ZONES`.

The file ships empty on purpose — nothing here does anything until you switch the mode.

Like `tiers`, the `zones` section is never default-merged, so what you write is what stays.

## Keys

```yaml
zones:
  northern-wastes:
    world: "world"
    x: 1200
    z: -800
    radius: 400
    min-radius: 0
    weight: 10
    tiers: [ ]
```

| Key | Default | Meaning |
|---|---|---|
| `world` | required | Must also be listed under `worlds` in `config.yml` |
| `x`, `z` | `0` | Centre of the zone |
| `radius` | `200` | How far from the centre a crate may land |
| `min-radius` | `0` | Keeps crates off the exact centre |
| `weight` | `1` | Relative chance of this zone being chosen |
| `tiers` | `[]` | Tier ids allowed here; empty means every tier |

A zone with `min-radius` is a ring rather than a circle — useful around an arena or a build you do not
want crates landing on top of.

## Creating them in game

Reading coordinates off a map and typing them into YAML is exactly the step that stops people from
using zones, so there is a command for it:

```
/supplydrop zone add northern-wastes 400
/supplydrop zone list
/supplydrop zone remove northern-wastes
```

`add` uses your current position and world. Edit the file afterwards to set a weight or restrict
tiers.

## When no zone matches

If the picked tier is allowed by no zone in the chosen world, the cycle is skipped and the reason is
logged (with `general.debug` on). Check that at least one zone allows every tier you expect to spawn —
a legendary tier that no zone permits will silently never appear.
