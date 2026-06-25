---
title: "Stats & Leaderboards"
description: "dDeathPenalty tracks how much each player has suffered — their death count and total money lost — and exposes it through a command and PlaceholderAPI."
---

dDeathPenalty tracks how much each player has suffered — their death count and total money lost — and exposes it through a command and PlaceholderAPI.

## What's tracked

| Stat | Description |
|---|---|
| Deaths | Total penalised deaths for the player. |
| Money lost | Cumulative money taken from the player. |
| Per-world money lost | Server-wide money lost in a given world. |

Stats are cached in memory and flushed to `stats.yml` periodically:

```yaml
settings:
  stats-save-interval-seconds: 300
```

## Checking stats in-game

```
/dp check            # your own stats
/dp check <player>   # someone else's
```

Shows `<player>: <deaths> deaths, lost <money>`. Requires `deathpenalty.check`.

## Leaderboards (PlaceholderAPI)

With PlaceholderAPI installed, the `dp` expansion exposes per-player stats and server leaderboards by deaths and by money lost — ideal for a "Hall of Shame" scoreboard or hologram. See the full list in [Placeholders](/plugins/ddeathpenalty/placeholders/):

```
Top death:       %dp_top_death_1%  (%dp_top_death_amount_1%)
Most money lost:  %dp_top_money_lost_1%  (%dp_top_money_lost_amount_1%)
Your deaths:      %dp_total_death%
```
