---
title: "Placeholders"
description: "Every placeholder is available under two identifiers — %oberonstats…% and the shorter %ostats…%. They are identical."
---

Every placeholder is available under two identifiers — `%oberonstats_…%` and the shorter `%ostats_…%`. They are identical.

Throughout this page:

- `<track>` is any **track id** — an ExcellentEconomy currency (`coins`, `stardust`), a vanilla statistic
  (`kills`, `deaths`, `playtime`, `mobs-killed`, `blocks-broken`, `blocks-placed`) or the Vault balance (`money`).
  Dashes and underscores are both fine. `/oberonstats status` lists yours. See [Stat Sources](/plugins/oberonstats/features/stat-sources/).
- `<pos>` is a **1-based leaderboard rank**.
- `<slot>` is a **1-based position on the current page**.
- `<player>` is a player name, online or offline.

## Two rules worth knowing first

1. A placeholder that **does not parse** returns nothing at all, so PlaceholderAPI leaves the raw `%oberonstats_…%` text visible. If you see the raw text in-game, you have a typo or an unknown currency id.
2. A placeholder that **parses but has nothing to show** returns `Blanking.Text` from `config.yml` — an empty string on a menu-focused setup. That is the difference between "you typed it wrong" and "this rank is empty".

---

## Player values

| Placeholder | Result |
|---|---|
| `%oberonstats_balance_<track>%` | Balance, currency-formatted, MiniMessage tags stripped |
| `%oberonstats_balance_short_<track>%` | Compact format (`1.2k`) |
| `%oberonstats_balance_raw_<track>%` | Bare number, no symbol |
| `%oberonstats_balance_styled_<track>%` | Currency format with its MiniMessage tags intact |
| `%oberonstats_balance_total%` | Every allowed track added up, as a plain number |

`value` works as a synonym for `balance` everywhere (`%oberonstats_value_short_coins%`), and every one of these works on a count as well as a currency: `%oberonstats_balance_kills%`, `%oberonstats_balance_short_mobs-killed%`.

### Durations

A track whose unit is a duration — `playtime` out of the box — accepts five more formats, usable anywhere a format goes (`balance_`, `top_value_`, `page_value_`):

| Placeholder | Result |
|---|---|
| `%oberonstats_balance_playtime%` | `6h 59m` — the two largest units that carry information |
| `%oberonstats_balance_long_playtime%` | `2d 3h 4m 5s` — every unit |
| `%oberonstats_balance_short_playtime%` | `6h` — largest unit only |
| `%oberonstats_balance_clock_playtime%` | `6:59` — hours never roll into days, so `51:04` is possible |
| `%oberonstats_balance_hours_playtime%` | `7` — a number, for sorting or arithmetic |
| `%oberonstats_balance_minutes_playtime%` | `419` |
| `%oberonstats_balance_days_playtime%` | `0.3` |
| `%oberonstats_balance_raw_playtime%` | `503456` — the raw tick count |

On a track that is **not** a duration these fall back to the plain number, so a menu that reuses one layout for several tracks never breaks.

### For another player

Append `_of_<player>` to any of the above:

```
%oberonstats_balance_coins_of_Notch%
%oberonstats_balance_short_gems_of_MetaElement%
```

Player names containing underscores are fine — everything after the first `_of_` is the name.

### For the session target

Prefix with `target_` to use the player this viewer last inspected (see [Other Players](/plugins/oberonstats/features/targets/)):

```
%oberonstats_target_balance_coins%
%oberonstats_target_balance_short_coins%
%oberonstats_target_name%
%oberonstats_target_online%
```

---

## Rank / position

| Placeholder | Result |
|---|---|
| `%oberonstats_position_<track>%` | Rank as a number, blank when unranked or worth nothing |
| `%oberonstats_position_ordinal_<track>%` | `1st`, `2nd`, `3rd`, `11th`, … |
| `%oberonstats_position_raw_<track>%` | Rank as a number, `0` instead of blank — use this when a menu compares numbers |

`rank` is a synonym for `position`. All three accept `_of_<player>` and the `target_` prefix.

---

## Leaderboard rows

| Placeholder | Result |
|---|---|
| `%oberonstats_top_name_<pos>_<track>%` | Name at that rank |
| `%oberonstats_top_value_<pos>_<track>%` | Value at that rank (`_short_`, `_raw_`, `_styled_` variants after `value`) |
| `%oberonstats_top_uuid_<pos>_<track>%` | UUID at that rank — handy for head textures |
| `%oberonstats_top_line_<pos>_<track>%` | The whole row rendered from `Format.Top-Line` |
| `%oberonstats_top_size_<track>%` | How many rows are **not** blank |
| `%oberonstats_top_list_<track>%` | Every non-blank row, joined by `Leaderboard.List-Separator` |
| `%oberonstats_top_updated_<track>%` | Seconds since the snapshot was rebuilt, or `-1` when the economy does not report it (ExcellentEconomy does not) |

**All four row fields blank together.** If rank 7 is empty or worth nothing, `top_name_7`, `top_value_7`, `top_uuid_7` and `top_line_7` all return the blank string — a menu row cannot end up half-drawn.

These are never player-scoped: `%oberonstats_top_name_1_coins_of_Notch%` is a typo and stays visible as raw text.

---

## Paging

The viewer's current page is moved with `/oberonstats page …` (see [Paging](/plugins/oberonstats/features/paging/)).

| Placeholder | Result |
|---|---|
| `%oberonstats_page_name_<slot>_<track>%` | Name in that slot of the current page |
| `%oberonstats_page_value_<slot>_<track>%` | Value in that slot (`_short_`/`_raw_`/`_styled_` after `value`) |
| `%oberonstats_page_uuid_<slot>_<track>%` | UUID in that slot |
| `%oberonstats_page_line_<slot>_<track>%` | Rendered row for that slot |
| `%oberonstats_page_position_<slot>_<track>%` | The **absolute** rank of that slot (slot 1 on page 2 is rank 11) |
| `%oberonstats_page_list_<track>%` | Every row on the current page, joined by the list separator |
| `%oberonstats_page_<track>%` | Current page number, 1-based |
| `%oberonstats_page_count_<track>%` | How many pages there are |
| `%oberonstats_page_size_<track>%` | Rows per page right now (changes after `page all`) |
| `%oberonstats_page_has_next_<track>%` | `true` / `false` |
| `%oberonstats_page_has_prev_<track>%` | `true` / `false` |
| `%oberonstats_page_first_<track>%` | Absolute rank of the first row on this page |
| `%oberonstats_page_last_<track>%` | Absolute rank of the last row on this page |

---

## Currency and server

| Placeholder | Result |
|---|---|
| `%oberonstats_currency_name_<track>%` | The currency's display name |
| `%oberonstats_currency_symbol_<track>%` | Its symbol |
| `%oberonstats_currency_id_<track>%` | Its id |
| `%oberonstats_currencies%` | Comma-separated list of every track OberonStats will answer for |
| `%oberonstats_server_balance_<track>%` | Every ranked player's balance added up (`_short_`/`_raw_`/`_styled_`) |

---

## Copy-paste: a Top 10 that collapses

```
%oberonstats_top_line_1_coins%
%oberonstats_top_line_2_coins%
%oberonstats_top_line_3_coins%
%oberonstats_top_line_4_coins%
%oberonstats_top_line_5_coins%
%oberonstats_top_line_6_coins%
%oberonstats_top_line_7_coins%
%oberonstats_top_line_8_coins%
%oberonstats_top_line_9_coins%
%oberonstats_top_line_10_coins%
```

With `Blanking.Text: ""` every unused rank renders as an empty line instead of `Nobody — 0`.

## Copy-paste: one layout, every track

```
Coins:    %oberonstats_balance_coins%          (%oberonstats_position_ordinal_coins%)
Money:    %oberonstats_balance_money%          (%oberonstats_position_ordinal_money%)
Kills:    %oberonstats_balance_kills%          (%oberonstats_position_ordinal_kills%)
Mobs:     %oberonstats_balance_mobs-killed%    (%oberonstats_position_ordinal_mobs-killed%)
Deaths:   %oberonstats_balance_deaths%         (%oberonstats_position_ordinal_deaths%)
Playtime: %oberonstats_balance_playtime%       (%oberonstats_position_ordinal_playtime%)
Mined:    %oberonstats_balance_blocks-broken%  (%oberonstats_position_ordinal_blocks-broken%)
Placed:   %oberonstats_balance_blocks-placed%  (%oberonstats_position_ordinal_blocks-placed%)
```

Add `_of_<player>` to every line and the same screen shows somebody else's stats.

## Copy-paste: a /stats screen

```
Player:  %oberonstats_target_name%
Balance: %oberonstats_target_balance_coins%
Rank:    %oberonstats_target_position_ordinal_coins%
Server:  %oberonstats_server_balance_coins%
```

Point it at somebody with `/oberonstats target <player>` — or drop `target_` and use `%oberonstats_balance_coins%` for the viewer's own screen.
