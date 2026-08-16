---
title: "Leaderboards"
description: "OberonStats reads ExcellentEconomy's leaderboard — it does not build one of its own. Ranking, hidden staff and the rebuild schedule stay EE's job."
---

OberonStats reads ExcellentEconomy's leaderboard — it does not build one of its own. Ranking, hidden staff and the rebuild schedule stay EE's job.

## Three ways to draw a row

**Field by field**, when your menu wants its own layout:

```
%oberonstats_top_name_1_coins%   %oberonstats_top_value_1_coins%
```

**One rendered line**, when you want the decoration to disappear with the row:

```
%oberonstats_top_line_1_coins%
```

```yaml
Format:
  Top-Line: "<gray>#%pos% <white>%name% <dark_gray>- <gold>%value%"
```

Placeholders inside the template: `%pos%`, `%ordinal%`, `%name%`, `%value%`, `%value_short%`, `%uuid%`, `%track%`.

This matters more than it looks. If you write `#1 %oberonstats_top_name_1_coins%` in the menu itself, an empty rank still leaves a lonely `#1` behind. Put the decoration in `Top-Line` and the whole thing vanishes.

**The whole list in one placeholder**, when the menu has a single text area:

```
%oberonstats_top_list_coins%
```

Rows are joined by `Leaderboard.List-Separator` (a newline by default) and capped at `Leaderboard.List-Max`.

## How current is it?

ExcellentEconomy rebuilds its snapshot on a timer — `Top.Update_Interval`, 900 seconds by default. So:

- **ranks and top rows** are as fresh as that timer;
- an **online player's own balance** is always live, because it comes from EE's player cache, not the snapshot.

If your leaderboard looks stale, lower EE's interval; OberonStats has nothing to cache away.

## Hidden players

Anyone with `coinsengine.hidefromtops` is excluded by ExcellentEconomy before OberonStats ever sees the list, so staff stay out of your menus with no extra configuration.

## Guard rails

```yaml
Leaderboard:
  Max-Position: 100   # a request beyond this blanks without touching the economy
  List-Max: 100       # hard cap on rows in one list placeholder
```

`%oberonstats_top_size_<track>%` returns the number of rows that are **not** blank, which is the number your menu should actually draw.
