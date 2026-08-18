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

Sources:
  Refresh-Seconds: 300
  Active-Within-Days: 90
  Max-Players: 2000
  Live-Cache-Seconds: 3
  Vault:
    Enabled: true
    Track-Id: money
    Name: Money
  Statistics:
    Enabled: true
    Tracks:
      kills:         { Statistic: PLAYER_KILLS, Name: Kills }
      mobs-killed:   { Statistic: MOB_KILLS,    Name: Mobs Killed }
      deaths:        { Statistic: DEATHS,       Name: Deaths }
      playtime:      { Statistic: PLAY_ONE_MINUTE, Unit: TIME, Name: Playtime }
      blocks-broken: { Aggregate: BLOCKS_MINED, Name: Blocks Broken }
      blocks-placed: { Aggregate: ITEMS_USED,   Name: Blocks Placed }

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

## Sources

Where the numbers come from. ExcellentEconomy needs nothing here — it ranks its own players. See
[Stat Sources](/plugins/oberonstats/features/stat-sources/).

| Key | Default | Meaning |
|---|---|---|
| `Refresh-Seconds` | `300` | How often the vanilla-statistic and Vault leaderboards are rebuilt. |
| `Active-Within-Days` | `90` | Skip players who have not logged in for this long. `0` ranks everybody the server remembers. |
| `Max-Players` | `2000` | Hard cap on how many players are read, most recently seen first. |
| `Live-Cache-Seconds` | `3` | How long an online player's aggregated statistic (`blocks-broken`) is remembered. |
| `Vault.Enabled` | `true` | Expose the Vault balance as a track. Needs Vault and an economy plugin. |
| `Vault.Track-Id` / `Vault.Name` | `money` / `Money` | What that track is called. |
| `Statistics.Enabled` | `true` | Expose vanilla statistics as tracks. |
| `Statistics.Tracks.<id>.Statistic` | — | Any name from Bukkit's `Statistic` enum. |
| `Statistics.Tracks.<id>.Aggregate` | `NONE` | `BLOCKS_MINED` or `ITEMS_USED` — use these instead of `Statistic`, since Minecraft stores them per block/item. |
| `Statistics.Tracks.<id>.Unit` | `COUNT` | `TIME` renders as `12h 34m` and unlocks the duration formats. |
| `Statistics.Tracks.<id>.Name` | the id | Display name for `%oberonstats_currency_name_<track>%`. |

`Sources.Statistics.Tracks` is an ignored section on merge, so a track you delete stays deleted after an update.
A track naming a statistic the server does not know is skipped with a warning rather than breaking the rest.

## Commands

| Key | Default | Meaning |
|---|---|---|
| `Stats.Enabled` | `false` | Whether OberonStats registers `/stats`. Off so your menu plugin keeps its own. |
| `Stats.Run` | `""` | Command run after `/stats [player]` sets the target. `%player%` is substituted. |
