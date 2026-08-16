---
title: "Quick Start"
description: "Five minutes from install to a leaderboard that collapses."
---

Five minutes from install to a leaderboard that collapses.

## 1. Make blank mean blank

`plugins/OberonStats/config.yml` ships with a visible dash so a fresh install is never mysteriously empty. For a menu, change one line:

```yaml
Blanking:
  Text: ""
```

Then `/oberonstats reload`.

## 2. Find your currency ids

```
/oberonstats status
```

```
Stats » Providers: 1, tracks: coins, gems
```

Those ids are what goes into `<track>` in every placeholder.

## 3. Build a Top 10

Put ten lines in your menu, one per rank:

```
%oberonstats_top_line_1_coins%
%oberonstats_top_line_2_coins%
…
%oberonstats_top_line_10_coins%
```

Ranks nobody holds — and ranks held by players with nothing — render as empty lines. Shape the visible ones in `config.yml`:

```yaml
Format:
  Top-Line: "<gray>#%pos% <white>%name% <dark_gray>- <gold>%value%"
```

## 4. Add a `/stats` screen

For the viewer themselves:

```
Balance: %oberonstats_balance_coins%
Rank:    %oberonstats_position_ordinal_coins%
```

For somebody else, either name them in the placeholder:

```
%oberonstats_balance_coins_of_Notch%
```

or have your menu's button run `/oberonstats target <player>` first and use:

```
%oberonstats_target_name%
%oberonstats_target_balance_coins%
```

## 5. Check it without a menu

```
/oberonstats dump MetaElement coins
```

```
Stats » Placeholders for MetaElement on track coins:
 » %oberonstats_balance_coins_of_MetaElement% = 12340$
 » %oberonstats_position_coins_of_MetaElement% = 3
 » %oberonstats_top_name_1_coins% = Rich
 » %oberonstats_top_line_1_coins% = #1 Rich - 98000$
 » %oberonstats_top_size_coins% = 7
```

`(blank)` in that output means the value resolved to nothing — which is usually the intended behaviour, not a fault. `(unparsed)` means the placeholder itself is wrong.
