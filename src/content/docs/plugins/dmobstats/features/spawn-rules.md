---
title: "Spawn Rules"
description: "Spawn rules run before anything else is applied, on spawns that pass the filter (see New Spawns Only)."
---

```yaml
spawn:
  chance: 0.5            # 0.0-1.0, default 1.0
  replace:               # weighted list, default empty
    - { type: husk, weight: 1 }
    - { type: keep, weight: 3 }
```

Spawn rules run **before** anything else is applied, on spawns that pass the filter (see [New Spawns Only](/plugins/dmobstats/features/new-spawns-only/)).

## chance

The probability that the spawn happens at all. `0.5` cancels half of the spawns of this mob, `0` cancels all of them. A cancelled worldgen mob is removed.

## replace

A weighted list of mob types. One entry is picked; the spawn is cancelled and the picked mob is spawned in its place at the same location, one tick later.

| Entry | |
|---|---|
| `type` | A mob key as used for the file names in `mobs/`, for example `husk`. Unknown mobs are skipped with a warning. |
| `weight` | Positive number, default `1`. |
| `keep`, `none` or `self` as `type` | Means "no replacement" (the original mob stays). Picking the mob's own type also keeps it. |

The replacement mob is marked, **modified like any other mob of its type** (from its own file, with the original spawn reason), and is **never replaced again**. That is the loop guard: a zombie that is replaced by a husk is not replaced again even if the husk file replaces husks.

The GUI shows the replacement list read-only; edit it in the file. Spawn chance has a number control.

## Example: fewer creepers, some of them become zombies

```yaml
# mobs/creeper.yml
enabled: true
spawn:
  chance: 0.8
  replace:
    - { type: zombie, weight: 1 }
    - { type: keep, weight: 4 }
```

Of every 100 creeper spawns, 20 are cancelled, and of the remaining 80 about one fifth become zombies.
