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
| `%oberonsupplydrops_next%` | Time until the next scheduled drop, e.g. `3h 4m 2s` |
| `%oberonsupplydrops_next_seconds%` | The same as a bare number, for progress bars |

Countdowns read `3h 4m 2s` — largest unit first. A zero unit is dropped only when nothing bigger is
left; below the largest unit everything is printed, zero or not:

| Remaining | Shows |
|---|---|
| 5h 0m 42s | `5h 0m 42s` — the zero minutes stay |
| exactly 1h | `1h 0m 0s` |
| 52m 42s | `52m 42s` — no `0h` in front |
| 30s | `30s` — no `0h 0m` in front |

That keeps the width stable across a tick: a countdown that jumped from `5h 1m 42s` to `5h 42s`
would look like it lost a column.

It is the same formatter the rest of the Oberon plugins use, so a scoreboard mixing several of them
reads consistently.

The `{time_long}` message token spells the same countdown out — `5 hours 0 minutes 42 seconds` — and
trims exactly these units, so the two forms can never disagree about one moment. See
[Messages](/plugins/oberonsupplydrops/configuration/messages/#picking-a-countdown-form) for when to use which. There is no
spelled-out PAPI placeholder; scoreboards want the short form.

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
