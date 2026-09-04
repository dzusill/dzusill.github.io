---
title: "Placeholders"
description: "Requires PlaceholderAPI. The expansion registers itself when the plugin enables and survives"
---

Requires PlaceholderAPI. The expansion registers itself when the plugin enables and survives
`/papi reload`.

## Per player

| Placeholder | Value |
|---|---|
| `%oberonsupplydrops_claims%` | Crates this player opened first |
| `%oberonsupplydrops_items%` | Items this player took out of crates |
| `%oberonsupplydrops_claims_<tier>%` | Claims of one tier, e.g. `_claims_legendary` |
| `%oberonsupplydrops_rank%` | Leaderboard position, or `-` when unranked |

## Server state

| Placeholder | Value |
|---|---|
| `%oberonsupplydrops_active%` | How many drops are on the map |
| `%oberonsupplydrops_next%` | Time until the next scheduled drop, e.g. `12m 30s` |
| `%oberonsupplydrops_next_seconds%` | The same as a bare number, for progress bars |

## Leaderboard

`N` is the position, starting at 1.

| Placeholder | Value |
|---|---|
| `%oberonsupplydrops_top_name_N%` | Name at position N |
| `%oberonsupplydrops_top_claims_N%` | Crates claimed at position N |
| `%oberonsupplydrops_top_items_N%` | Items taken at position N |

A position nobody occupies yet returns an **empty string** for `name` and `-` for the numbers, so an
unfilled leaderboard row collapses out of a scoreboard instead of sitting there claiming somebody
scored nothing.

## Performance

Every value is answered from memory. A scoreboard refreshing twice a second cannot make this plugin
touch a database.
