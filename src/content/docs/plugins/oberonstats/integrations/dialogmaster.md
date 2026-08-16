---
title: "DialogMaster"
description: "OberonStats publishes placeholders and nothing else, so any menu plugin that resolves PlaceholderAPI can use it. DialogMaster is the one it was designed…"
---

OberonStats publishes placeholders and nothing else, so any menu plugin that resolves PlaceholderAPI can use it. DialogMaster is the one it was designed against.

## A stats screen

```yaml
# DialogMaster dialog
title: "<gold>Stats"
body:
  - "<gray>Player: <white>%oberonstats_target_name%"
  - "<gray>Balance: <gold>%oberonstats_target_balance_coins%"
  - "<gray>Rank: <yellow>%oberonstats_target_position_ordinal_coins%"
  - ""
  - "<dark_gray>Server total: <gray>%oberonstats_server_balance_coins%"
```

Point it at somebody before opening it — a button, a command alias or a click handler runs:

```
/oberonstats target %player%
```

If DialogMaster can substitute the argument straight into the placeholder, skip the target entirely and use `%oberonstats_balance_coins_of_<name>%`.

For the viewer's own screen, drop `target_`:

```
"<gray>Balance: <gold>%oberonstats_balance_coins%"
"<gray>Rank: <yellow>%oberonstats_position_ordinal_coins%"
```

## A Top 10 that collapses

```yaml
title: "<gold>Top Coins"
body:
  - "%oberonstats_top_line_1_coins%"
  - "%oberonstats_top_line_2_coins%"
  - "%oberonstats_top_line_3_coins%"
  - "%oberonstats_top_line_4_coins%"
  - "%oberonstats_top_line_5_coins%"
  - "%oberonstats_top_line_6_coins%"
  - "%oberonstats_top_line_7_coins%"
  - "%oberonstats_top_line_8_coins%"
  - "%oberonstats_top_line_9_coins%"
  - "%oberonstats_top_line_10_coins%"
```

With `Blanking.Text: ""` an unused rank is an empty line rather than `Nobody — 0`.

**Keep the decoration inside `Format.Top-Line`, not in the dialog.** Write `#%pos% %name%` in the dialog and an empty rank still leaves a stray `#7` behind; put it in the template and the entire row disappears.

## First ten, then everyone

Draw the page slots instead of absolute ranks:

```yaml
body:
  - "%oberonstats_page_line_1_coins%"
  - "%oberonstats_page_line_2_coins%"
  # … through 10
  - ""
  - "<gray>Page %oberonstats_page_coins%/%oberonstats_page_count_coins%"
buttons:
  - label: "<gray>« Previous"
    command: "oberonstats page prev coins"
  - label: "<gray>Next »"
    command: "oberonstats page next coins"
  - label: "<gold>Show everyone"
    command: "oberonstats page all coins"
  - label: "<gray>Back to top 10"
    command: "oberonstats page reset coins"
```

After `page all` the page holds every ranked player, so `%oberonstats_page_size_coins%` grows and `%oberonstats_page_list_coins%` prints the lot in one element.

Reopen or refresh the dialog after the button runs — placeholders are resolved when the screen is drawn.

## If a placeholder shows up as raw text

That is deliberate: it means the request did not parse. Check the currency id with `/oberonstats status`, then confirm the exact string with:

```
/oberonstats dump <player> coins
/papi parse me %oberonstats_top_line_1_coins%
```

A placeholder that parsed but had nothing to show returns `Blanking.Text` instead — usually invisible, which is the point.
