---
title: "config.yml"
description: "Everything about how placeholders look and when they blank."
---

Everything about how placeholders look and when they blank.

```yaml
Enabled: true
Debug: false

Blanking:
  Text: "-"
  Min-Value: 0.0
  Hide-Zero-Rows: true
  Hide-Zero-Value: false
  Unranked-Position: ""

Format:
  Strip-MiniMessage: true
  Top-Line: "<gray>#%pos% <white>%name% <dark_gray>- <gold>%value%"
  Ordinal:
    Default: "th"
    One: "st"
    Two: "nd"
    Three: "rd"

Leaderboard:
  Max-Position: 100
  Page-Size: 10
  List-Separator: "\n"
  List-Max: 100

Targets:
  Enabled: true
  Cache-TTL-Seconds: 60
  Session-TTL-Seconds: 300

Tracks:
  Whitelist: []

Commands:
  Stats:
    Enabled: false
    Run: ""
```

## Blanking

| Key | Default | Meaning |
|---|---|---|
| `Text` | `"-"` | What "nothing" renders as. **Set it to `""` for menus** so empty rows collapse. |
| `Min-Value` | `0.0` | Values at or below this count as nothing. Raise it to hide poor players from the leaderboard. |
| `Hide-Zero-Rows` | `true` | Whether a leaderboard row worth nothing blanks. This is the plugin's headline feature. |
| `Hide-Zero-Value` | `false` | Whether a player's *own* zero blanks too. |
| `Unranked-Position` | `""` | What `%oberonstats_position_<track>%` shows for somebody not on the board. |

See [Blanking Empty Rows](/plugins/oberonstats/features/blanking/).

## Format

| Key | Default | Meaning |
|---|---|---|
| `Strip-MiniMessage` | `true` | ExcellentEconomy formats through MiniMessage. Leave on for plain-text surfaces; turn off if your menu renders tags. The `*_styled_*` placeholders always keep tags regardless. |
| `Top-Line` | see above | Template behind `top_line` / `page_line`. Supports `%pos%`, `%ordinal%`, `%name%`, `%value%`, `%value_short%`, `%uuid%`, `%track%`. |
| `Ordinal.*` | `st/nd/rd/th` | Suffixes for `%oberonstats_position_ordinal_<track>%`. Teens are handled for you (`11th`, not `11st`). |

## Leaderboard

| Key | Default | Meaning |
|---|---|---|
| `Max-Position` | `100` | Highest rank any placeholder may ask for; beyond it, blank without touching the economy. |
| `Page-Size` | `10` | Rows on one page of `%oberonstats_page_*%`. |
| `List-Separator` | `"\n"` | Joins rows in `top_list` / `page_list`. |
| `List-Max` | `100` | Hard cap on rows in one list placeholder. |

## Targets

| Key | Default | Meaning |
|---|---|---|
| `Enabled` | `true` | Allows `_of_<player>` and `target_` placeholders at all. |
| `Cache-TTL-Seconds` | `60` | How long a value fetched from the database stays cached. |
| `Session-TTL-Seconds` | `300` | How long `/oberonstats target` keeps pointing at somebody. |

## Tracks

```yaml
Tracks:
  Whitelist: [coins]
```

Empty means every ExcellentEconomy currency. Listed ids are the only ones answered — anything else returns nothing, so a menu cannot accidentally expose a currency you keep internal.

`Tracks` is an ignored section on merge, so an entry you delete stays deleted after an update.

## Commands

| Key | Default | Meaning |
|---|---|---|
| `Stats.Enabled` | `false` | Whether OberonStats registers `/stats`. Off so your menu plugin keeps its own. |
| `Stats.Run` | `""` | Command run after `/stats [player]` sets the target. `%player%` is substituted. |
