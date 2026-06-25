---
title: "Exemptions & Ignore"
description: "Two permissions let specific players or staff escape the penalty, each with a per-world variant."
---

Two permissions let specific players or staff escape the penalty, each with a per-world variant.

| Permission | Effect |
|---|---|
| `deathpenalty.exempt` | The player **dies normally but loses nothing**, and sees the exempt message. |
| `deathpenalty.ignore` | The plugin **does nothing at all** for this player — no penalty, no message, no stat tracking. |

## Per-world variants

Append a world name to scope the bypass to that world only:

```
deathpenalty.exempt.<world>      # e.g. deathpenalty.exempt.world_nether
deathpenalty.ignore.<world>
```

So `deathpenalty.exempt.spawn_world` exempts a player only in `spawn_world`, while they're penalised everywhere else.

## exempt vs ignore

| | `exempt` | `ignore` |
|---|---|---|
| Penalty applied | No | No |
| Message shown | Yes (*"You kept everything…"*) | No |
| Counts toward stats | Yes (a death) | No |

Use **exempt** for "this area/player is safe" (still visible to players), and **ignore** for "pretend the plugin isn't installed for them" (e.g. staff in creative).

## Ops

```yaml
settings:
  ignore-ops: false
```

Set `ignore-ops: true` to make the plugin treat all server operators as if they had `deathpenalty.ignore` — handy so admins testing in-game aren't penalised.

> For region-based exemptions (rather than per-player), use the [WorldGuard flag](/plugins/ddeathpenalty/features/worldguard/).
