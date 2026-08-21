---
title: "Placeholders"
description: "Identifier oberonsell. Registered only when PlaceholderAPI is installed, and the expansion survives"
---

Identifier `oberonsell`. Registered only when PlaceholderAPI is installed, and the expansion survives
`/papi reload`.

## Player values

| Placeholder | Value |
|---|---|
| `%oberonsell_worth_hand%` | Worth of one of the held item |
| `%oberonsell_worth_hand_total%` | Worth of the whole held stack |
| `%oberonsell_worth_inventory%` | Worth of everything in the player's inventory |
| `%oberonsell_sold_total%` | Lifetime earnings from selling |
| `%oberonsell_sold_items%` | Lifetime count of items sold |
| `%oberonsell_worth_lore_enabled%` | `true` / `false` — whether worth lore is shown |
| `%oberonsell_auto_sell_enabled%` | `true` / `false` — whether auto-sell is on |
| `%oberonsell_multiplier_<category>%` | Multiplier earned in that category |
| `%oberonsell_tier_<category>%` | Tier reached in that category |
| `%oberonsell_progress_<category>%` | Progress to the next tier, e.g. `42%` |
| `%oberonsell_progress_bar_<category>%` | The progress bar |

`%oberonsell_toggle%` still resolves as an older name for `worth_lore_enabled`.

`<category>` is a category id — one of the values under `multipliers.categories` in
[config.yml](/plugins/oberonsell/configuration/config/).

## Leaderboard

The grammar matches OberonStats, so anything you already write for that plugin reads the same here. **The
track comes last** in every form, and is either `money` or `items`.

### One rank at a time

| Placeholder | Value |
|---|---|
| `%oberonsell_top_name_<rank>_<track>%` | Player name at that rank (`top_player_` also works) |
| `%oberonsell_top_uuid_<rank>_<track>%` | Their UUID |
| `%oberonsell_top_value_<rank>_<track>%` | Their total |
| `%oberonsell_top_line_<rank>_<track>%` | The whole row, built from `leaderboard.line-format` |
| `%oberonsell_top_size_<track>%` | How many ranked players there are |
| `%oberonsell_top_updated_<track>%` | How long ago the board was rebuilt |

`top_value` takes a format before the rank: `_short` (compact `4.2M`), `_raw` (plain number, for
arithmetic), `_styled`, `_plain`.

```
%oberonsell_top_name_1_money%              -> Notch
%oberonsell_top_value_short_1_money%       -> 4.2M
%oberonsell_top_value_raw_1_money%         -> 4230518.00
%oberonsell_top_items_3_items%             -> 18430
```

### Whole lists

One placeholder for many rows — what a dialogue screen usually wants.

```
%oberonsell_top_list_money%            the whole board, up to leaderboard.max-size
%oberonsell_top_list_1_10_money%       ranks 1 to 10
%oberonsell_top_list_1_100_money%      ranks 1 to 100
```

Each row is `leaderboard.line-format`, joined by `leaderboard.list-separator` (a newline by default).

A range needs **both** numbers. `%oberonsell_top_list_10_money%` is read as a typo, not as "ten rows", so a
missing number shows up rather than quietly meaning something else.

### Paging

Page-relative forms follow the viewer's current page, moved by `/selltop <track> <page>`.

| Placeholder | Value |
|---|---|
| `%oberonsell_page_name_<slot>_<track>%` | Name in that slot of the current page |
| `%oberonsell_page_value_<slot>_<track>%` | Their total |
| `%oberonsell_page_position_<slot>_<track>%` | Their absolute rank |
| `%oberonsell_page_line_<slot>_<track>%` | The whole row |
| `%oberonsell_page_list_<track>%` | Every row on this page |
| `%oberonsell_page_<track>%` | Current page number |
| `%oberonsell_page_count_<track>%` | How many pages there are |
| `%oberonsell_page_size_<track>%` | Rows per page |
| `%oberonsell_page_first_<track>%` / `%oberonsell_page_last_<track>%` | First and last rank on this page |
| `%oberonsell_page_has_next_<track>%` / `%oberonsell_page_has_prev_<track>%` | `true` / `false` |

The page argument moves these placeholders only. The `/selltop` chest menu holds `top-limit` rows, which is
a different number from `leaderboard.page-size`, and one counter meaning two page sizes would be a bug.

### A player's own rank

```
%oberonsell_position_money%            -> 7
%oberonsell_position_ordinal_money%    -> 7th
%oberonsell_position_raw_money%        -> 7
```

`position_raw` always answers with a number, so a menu doing arithmetic on it never has to strip a suffix.

### Someone else, or a remembered target

Append `_of_<player>` to any player-scoped form:

```
%oberonsell_sold_total_of_Notch%
%oberonsell_position_money_of_Notch%
```

Or prefix `target_` to use the player the viewer last inspected — clicking a head in the `/selltop` menu
sets it:

```
%oberonsell_target_sold_total%
%oberonsell_target_position_money%
```

### Older spellings

These still resolve: `%oberonsell_selltop_player_<rank>%`, `%oberonsell_selltop_money_<rank>%`,
`%oberonsell_selltop_money_raw_<rank>%`, `%oberonsell_selltop_items_<rank>%`,
`%oberonsell_selltop_uuid_<rank>%`.

## Configuration

```yaml
leaderboard:
  max-size: 100          # how deep the board goes; also caps a top_list range
  page-size: 10
  cache-ttl-seconds: 60
  empty-value: ""        # what a rank past the end returns
  line-format: "<gray>#%rank% <white>%player% <gray>- <green>%value%"
  list-separator: "\n"
```

## Cost

Every leaderboard placeholder reads one already-built in-memory snapshot: a list index and a field read, no
query and no sorting. That matters because a hundred-row dialogue resolves a couple of hundred placeholders
in a single render.

The snapshot is rebuilt asynchronously on `cache-ttl-seconds`, and a sale pulls the next rebuild forward
rather than forcing one immediately. So the board can trail a sale by a second or two. That is deliberate —
rebuilding per sale is exactly the per-transaction load the cache exists to avoid.

## Formatting

Money is written by this plugin's own formatter, so grouping, decimals and the compact `K` / `M` / `B` /
`T` / `Q` suffixes follow [`price-format`](/plugins/oberonsell/configuration/config/#price-format). No currency symbol is
added — put your own in the surrounding text.

`multiplier_` is the raw number (`1.3`), not `1.3x`; add the `x` in your template.

## What an unresolved placeholder means

A placeholder that does not parse is left as raw text, so a typo looks like a typo. One that parses but has
no answer — a rank past the end of the board, an unknown category — returns `leaderboard.empty-value`
(blank by default). The two are deliberately different: a mistyped name and a legitimately empty row should
not look the same.

## Offline players

`sold_total`, `sold_items`, the toggles and every leaderboard form work for offline players. The rest need
a live player — a held item, an inventory, a permission check — so they return nothing when the player is
offline.

## Scoreboard example

```yaml
lines:
  - "&7Holding: &f$%oberonsell_worth_hand_total%"
  - "&7Inventory: &f$%oberonsell_worth_inventory%"
  - ""
  - "&7Rank: &f%oberonsell_position_ordinal_money%"
  - "&7Ores &f%oberonsell_multiplier_ores%x"
  - "&f%oberonsell_progress_bar_ores%"
```

## Dialogue example

```
&7Top sellers:
%oberonsell_top_list_1_10_money%
```
