---
title: "Leaderboards (PRO)"
description: "dBloodMoney tracks per-player kill stats and exposes a leaderboard."
---

> **PRO feature.** Requires `dBloodMoney-PRO.jar`.

dBloodMoney tracks per-player kill stats and exposes a leaderboard.

## What's tracked

| Stat | Meaning |
|---|---|
| **Kills** | Players killed (paid kills). |
| **Deaths** | Times killed by another player. |
| **Earned** | Total money looted (including streak and bounty bonuses). |
| **Best streak** | Longest kill streak ever reached. |

## The leaderboard command

| Command | Permission | Description |
|---|---|---|
| `/killtop` | `dbloodmoney.killtop` | Top killers, ranked by kills. |
| `/dbmtop` | `dbloodmoney.killtop` | Alias of `/killtop`. |

Output (rows controlled by `Pro.Leaderboard.Top-Size`):

```
Top killers
1. Alice - 142 kills ($98,400)
2. Bob   - 119 kills ($75,100)
3. Carol -  88 kills ($60,250)
```

## Configuration

```yaml
Pro:
  Leaderboard:
    Enabled: true
    Top-Size: 10
```

| Key | Description |
|---|---|
| `Enabled` | Toggle stat tracking + the leaderboard. |
| `Top-Size` | Number of rows shown by `/killtop`. |

## Storage

Stats are saved to `stats.yml`, or to the `dbloodmoney_stats` table if a [database](/plugins/dbloodmoney/configuration/database/) is enabled — ideal for showing a **network-wide** leaderboard across servers.

## Showing stats elsewhere

With PlaceholderAPI installed you can put these numbers on scoreboards, tab and chat — see [Placeholders](/plugins/dbloodmoney/placeholders/). For example `%dbloodmoney_kills%`, `%dbloodmoney_earned%`, `%dbloodmoney_top_name_1%`.

## Resetting stats

There is no in-game reset command. To wipe the leaderboard:

- **Flat file:** stop the server, delete `stats.yml`, start.
- **Database:** `TRUNCATE TABLE dbloodmoney_stats;`
