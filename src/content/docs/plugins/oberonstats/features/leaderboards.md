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

Give a player `oberonstats.exempt` and they are left out of **every** leaderboard placeholder — `top_*`, `page_*`, the lists, `top_size` and their own rank — on every track, whatever the source. Their own value placeholders still answer, so a stats screen shows them their real number; only the ranking hides them.

```yaml
Leaderboard:
  Exempt-Permission: "oberonstats.exempt"   # "" ranks everybody
```

An **offline** staff member can only be recognised through Vault, so a permission plugin that answers Vault lookups (LuckPerms does) is what makes the hiding survive them logging off. Without one, only players who have been online since the last restart are hidden. The lookup never happens inside a placeholder — it runs off the request thread and the answer is remembered — so a slow permission database costs no lag.

`/oberonstats board <track>` counts hidden rows on its own line, and `/oberonstats why <player>` says outright when the permission is what is keeping somebody off the board.

ExcellentEconomy has its own node for the same idea: anyone with `coinsengine.hidefromtops` is excluded by EE before OberonStats ever sees the list. Use either; `oberonstats.exempt` is the one that covers vanilla statistics and Vault money as well.

## Guard rails

```yaml
Leaderboard:
  Max-Position: 100   # a request beyond this blanks without touching the economy
  List-Max: 100       # hard cap on rows in one list placeholder
```

`%oberonstats_top_size_<track>%` returns the number of rows that are **not** blank, which is the number your menu should actually draw.
