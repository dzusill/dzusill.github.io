---
title: "Placeholders"
description: "PlaceholderAPI expansion, identifier oberonafk. Registered when PlaceholderAPI is installed; a stale"
---

PlaceholderAPI expansion, identifier `oberonafk`. Registered when PlaceholderAPI is installed; a stale
registration left behind by a PlugMan reload is replaced rather than left answering from a dead instance.

| Placeholder | Value |
|---|---|
| `%oberonafk_in_zone%` | `true` or `false` |
| `%oberonafk_zone%` | The zone id, empty outside one |
| `%oberonafk_next%` | Time until the next roll, written by the [countdown format](/plugins/oberonafk/features/notifications/#time-formatting) (`24:31` by default). Empty when the player is not collecting time |
| `%oberonafk_next_seconds%` | The same as a bare number of seconds, `0` when not collecting |
| `%oberonafk_drops_total%` | Rewards the player has received, lifetime |
| `%oberonafk_drops_<reward id>%` | Lifetime count of one reward, e.g. `%oberonafk_drops_koth-key%` |
| `%oberonafk_storage_count%` | Stacks waiting in the player's claim storage |
| `%oberonafk_time_in_zone%` | Lifetime time spent collecting, written by the [duration format](/plugins/oberonafk/features/notifications/#time-formatting) (`3h 12m 5s` by default) |

Every value is answered from memory. A scoreboard that refreshes twice a second can never make the plugin
touch the database.

Totals are those of **online** players; an offline player's placeholders read `0`. `%oberonafk_next%` and
`%oberonafk_next_seconds%` count down only while the player is eligible: in a zone and in an allowed game
mode.

Unknown placeholders return nothing, so PlaceholderAPI leaves the text as written.
