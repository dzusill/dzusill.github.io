---
title: "database.yml and data.yml"
description: "type: H2 (default, a file in the plugin folder, nothing to set up), MYSQL or POSTGRESQL with"
---

## database.yml

`type`: `H2` (default, a file in the plugin folder, nothing to set up), `MYSQL` or `POSTGRESQL` with
`host`, `port`, `database`, `username`, `password`, `pool` and `properties`. With `enabled: false` kills
still count and pay, but statistics, claims, the claim storage and rewards waiting for offline players
last only until the restart.

Tables (all created on start):

| Table | Holds |
|---|---|
| `oberonffa_stats` | Kills and best streak per player, period and period key (`2026-11-12`, `2026-W46`, `2026-11`, `all`) |
| `oberonffa_daily` | Today's daily-first-kill progress and victims |
| `oberonffa_claims` | Daily steps, pass tiers (keyed by their threshold, `pass:<id>:at:<n>`) and top payouts already taken (per account and per address hash) |
| `oberonffa_storage` | Items waiting in the claim storage |
| `oberonffa_pending` | Rewards waiting for an offline player |
| `oberonffa_addresses` | The alt guard's address hashes, deleted after `rules.alt-guard.remember` |
| `oberonffa_exempt` | Who was leaderboard-exempt at their last visit |

## data.yml

Written by the plugin, never merged: items captured with `/ffa admin reward capture <name>`, the alt
guard's secret key and the last processed day, week and month (`periods`, so a restart across midnight or a
new week still runs that period's end). Keep the key private; deleting it makes the plugin forget every address link. Edit
only while the server is stopped.
