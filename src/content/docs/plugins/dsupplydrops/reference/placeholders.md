---
title: "Placeholders"
description: "Requires PlaceholderAPI. The expansion registers itself when the plugin enables and survives"
---

Requires PlaceholderAPI. The expansion registers itself when the plugin enables and survives
`/papi reload`.

## Per player

| Placeholder | Value |
|---|---|
| `%dsupplydrops_claims%` | Crates this player opened first |
| `%dsupplydrops_items%` | Items this player took out of crates |
| `%dsupplydrops_claims_<tier>%` | Claims of one tier, e.g. `_claims_legendary` |
| `%dsupplydrops_rank%` | Leaderboard position, or `-` when unranked |

## Server state

| Placeholder | Value |
|---|---|
| `%dsupplydrops_active%` | How many drops are on the map |
| `%dsupplydrops_next%` | Time until the next scheduled drop, e.g. `12m 30s` |
| `%dsupplydrops_next_seconds%` | The same as a bare number, for progress bars |

## Leaderboard

`N` is the position, starting at 1.

| Placeholder | Value |
|---|---|
| `%dsupplydrops_top_name_N%` | Name at position N |
| `%dsupplydrops_top_claims_N%` | Crates claimed at position N |
| `%dsupplydrops_top_items_N%` | Items taken at position N |

A position nobody occupies yet returns an **empty string** for `name` and `-` for the numbers, so an
unfilled leaderboard row collapses out of a scoreboard instead of sitting there claiming somebody
scored nothing.

## Performance

Every value is answered from memory. A scoreboard refreshing twice a second cannot make this plugin
touch a database.
