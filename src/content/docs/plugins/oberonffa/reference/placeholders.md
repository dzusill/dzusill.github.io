---
title: "Placeholders"
description: "PlaceholderAPI expansion, identifier oberonffa. Registered when PlaceholderAPI is installed; a stale"
---

PlaceholderAPI expansion, identifier `oberonffa`. Registered when PlaceholderAPI is installed; a stale
registration left by a PlugMan reload is replaced. Everything is answered from memory and the leaderboard
snapshot — never the database.

The leaderboard forms have the same shape as OberonStats', so a DialogMaster dialog built for
`%oberonstats_..._kills%` works with `%oberonffa_..._kills_weekly%`.

Boards: `kills_daily`, `kills_weekly`, `kills_monthly`, `kills_alltime`, `streak_daily`,
`streak_weekly`, `streak_monthly`, `streak_alltime`, `current`.

## Leaderboards

| Placeholder | Value |
|---|---|
| `%oberonffa_top_name_<N>_<board>%` | Name at rank N (`top_player_` works too) |
| `%oberonffa_top_uuid_<N>_<board>%` | UUID at rank N |
| `%oberonffa_top_value_<N>_<board>%` | Value at rank N, `1,250` |
| `%oberonffa_top_value_short_<N>_<board>%` | `1.2K` |
| `%oberonffa_top_value_raw_<N>_<board>%` | `1250` |
| `%oberonffa_value_<board>%`, `_short_`, `_raw_` | The player's own value (ranked or not) |
| `%oberonffa_position_<board>%` | The player's rank; `leaderboard.unranked-position` when not on the board |
| `%oberonffa_position_raw_<board>%` | Rank, `0` when not on the board |

Add `_of_<player>` at the end of a `value_`, `position_`, `streak` … placeholder for another player:
`%oberonffa_value_short_kills_weekly_of_Steve%`. A rank is never player-scoped (`top_..._of_` is a typo).

An empty rank returns `leaderboard.blank-text` for every field of the row, so a dialog row collapses. A
placeholder that does not parse returns nothing, and PlaceholderAPI shows it as typed — that is how a typo
is spotted.

## Player

| Placeholder | Value |
|---|---|
| `%oberonffa_streak%`, `_short`, `_raw` | Current streak |
| `%oberonffa_streak_tag%` | The streak tag from `streak-effects.tags` (`🔥5`), `streak-effects.none` below it |
| `%oberonffa_daily_progress%` | `3/5` |
| `%oberonffa_daily_kills%`, `_left`, `_total` | Daily first kills done, left, needed |
| `%oberonffa_pass_<id>_progress%` | The pass's progress, short (`1.2K`) |
| `%oberonffa_pass_<id>_progress_raw%` | The same as a plain number |
| `%oberonffa_pass_<id>_claimable%` | Tiers ready to claim |

Daily and pass placeholders need the player online; for an offline one they are blank.
