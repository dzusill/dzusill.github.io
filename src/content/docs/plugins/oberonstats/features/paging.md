---
title: "Paging"
description: "Show the first ten. Then let a button show the next ten — or everybody."
---

Show the first ten. Then let a button show the next ten — or everybody.

## How it works

Every viewer has their own page number per track. The `page_` placeholders resolve against it:

```
%oberonstats_page_line_1_coins%   … slot 1 of the current page
%oberonstats_page_line_10_coins%  … slot 10 of the current page
```

On page 1 those are ranks 1–10; on page 2, ranks 11–20. The absolute rank of a slot is available as `%oberonstats_page_position_<slot>_<track>%`, so a row can print `#14` while sitting in slot 4.

Only rows that survive [blanking](/plugins/oberonstats/features/blanking/) take up slots, so a page never wastes space on empty wallets.

## Driving it from a menu

| Button runs | Effect |
|---|---|
| `/oberonstats page next [track]` | Forward one page, stops at the last |
| `/oberonstats page prev [track]` | Back one page, stops at the first |
| `/oberonstats page first [track]` | Back to page 1 |
| `/oberonstats page 3 [track]` | Jump to page 3 |
| `/oberonstats page all [track]` | **Expand** — one page holding every ranked player |
| `/oberonstats page reset [track]` | Back to page 1 at the configured page size |

Omit `[track]` and the first available currency is used.

`page all` is the "show everyone" button: the page grows to the full leaderboard, so `%oberonstats_page_list_coins%` prints all of it and `%oberonstats_page_size_coins%` tells you how many rows that turned out to be.

## Building the controls

```
Page %oberonstats_page_coins% / %oberonstats_page_count_coins%
Showing ranks %oberonstats_page_first_coins%–%oberonstats_page_last_coins%
```

`%oberonstats_page_has_next_coins%` and `%oberonstats_page_has_prev_coins%` return `true` / `false`, so a menu that supports conditions can hide the arrows at the ends.

## Settings

```yaml
Leaderboard:
  Page-Size: 10        # rows per page
  List-Separator: "\n" # joins %oberonstats_page_list_<track>%
```

Page state lives in memory only: it resets when the player quits, and OberonStats never writes it anywhere.
