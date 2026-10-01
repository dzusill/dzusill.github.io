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

## Leaderboard

The same shape as OberonStats. How the boards are built, blanked and paged is explained in
[Leaderboard](/plugins/oberonafk/features/leaderboard/).

- `<track>` is `time`, `drops` or `drops-<reward id>` (`_` and `-` are the same, case does not matter).
- `<pos>` is a 1-based rank; `<slot>` a 1-based position on the viewer's current page.
- `<player>` is any player name, online or offline.

### Player values

| Placeholder | Result |
|---|---|
| `%oberonafk_value_<track>%` | The viewer's value: `3h 12m 5s` for `time` (the [duration format](/plugins/oberonafk/features/notifications/#time-formatting)), `1,234` for a count |
| `%oberonafk_value_raw_<track>%` | Bare number — seconds for `time` |
| `%oberonafk_value_short_<track>%` | `3h` for `time` (largest unit), `1.2K` for a count |
| `%oberonafk_value_long_time%` | `0d 3h 12m 5s` — every unit |
| `%oberonafk_value_clock_time%` | `3:12` — hours never roll into days |
| `%oberonafk_value_hours_time%` / `_minutes_time%` | Whole hours / minutes, a number |

`long`, `short` and `clock` are styles in `time-format` in `config.yml`, so they are yours to reshape.
Append `_of_<player>` for another player: `%oberonafk_value_time_of_Notch%`.

### Rank

| Placeholder | Result |
|---|---|
| `%oberonafk_position_<track>%` | Rank as a number; `unranked-position` (blank) when not on the board |
| `%oberonafk_position_ordinal_<track>%` | `1st`, `2nd`, `3rd`, `11th` … |
| `%oberonafk_position_raw_<track>%` | Rank, `0` when unranked — for menus that compare numbers |

All three accept `_of_<player>`.

### Rows

| Placeholder | Result |
|---|---|
| `%oberonafk_top_name_<pos>_<track>%` | Name at that rank |
| `%oberonafk_top_value_<pos>_<track>%` | Value at that rank. `top_value_raw_`, `_short_`, `_long_`, `_clock_`, `_hours_`, `_minutes_` work too |
| `%oberonafk_top_uuid_<pos>_<track>%` | UUID — for head textures |
| `%oberonafk_top_line_<pos>_<track>%` | The whole row from `leaderboard.line-format`, as MiniMessage text |
| `%oberonafk_top_size_<track>%` | How many ranks are shown (capped at `max-position`) |
| `%oberonafk_top_list_<track>%` | Every row, joined by `list-separator` |

All four row fields blank together when a rank is empty. These never take `_of_`.

### Paging

| Placeholder | Result |
|---|---|
| `%oberonafk_page_name_<slot>_<track>%` | Name in that slot of the viewer's page |
| `%oberonafk_page_value_<slot>_<track>%` | Value in that slot (same formats as `top_value`) |
| `%oberonafk_page_uuid_<slot>_<track>%`, `_line_` | As the `top_` versions |
| `%oberonafk_page_position_<slot>_<track>%` | The absolute rank of that slot (slot 1 on page 2 is rank 11) |
| `%oberonafk_page_list_<track>%` | Every row on the page |
| `%oberonafk_page_<track>%` | Current page, 1-based |
| `%oberonafk_page_count_<track>%` / `_size_` | Pages / rows on this page |
| `%oberonafk_page_has_next_<track>%` / `_has_prev_` | `true` / `false` |
| `%oberonafk_page_first_<track>%` / `_last_` | Ranks shown on this page |

Pages move with [`/afk top page …`](/plugins/oberonafk/features/leaderboard/#paging).
