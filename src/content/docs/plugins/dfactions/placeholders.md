---
title: "Placeholders"
description: "With PlaceholderAPI installed, dFactions"
---

With [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed, dFactions
registers the **`pvpindex`** expansion. Use these in scoreboards, tab lists, holograms and chat.

> Placeholders resolve for the viewing player's faction (or the player themselves for `player_*`).

## Faction identity & territory

| Placeholder | Shows |
|---|---|
| `%pvpindex_faction_name%` | Faction name |
| `%pvpindex_faction_power%` | Faction power |
| `%pvpindex_faction_members%` | Member count |
| `%pvpindex_faction_land%` | Claimed chunks |
| `%pvpindex_faction_bank%` | Bank balance |

## Progression

| Placeholder | Shows |
|---|---|
| `%pvpindex_faction_level%` | Current level |
| `%pvpindex_faction_prestige%` | Prestige rank |
| `%pvpindex_faction_xp%` | Current XP toward next level |
| `%pvpindex_faction_xp_required%` | XP for the next level |
| `%pvpindex_faction_prestige_color%` | Prestige color tag |

## Combat & stats

| Placeholder | Shows |
|---|---|
| `%pvpindex_faction_kills%` | Total kills |
| `%pvpindex_faction_deaths%` | Total deaths |
| `%pvpindex_faction_kd%` | Kill/death ratio |
| `%pvpindex_faction_wars_won%` | Wars won |
| `%pvpindex_faction_wars_lost%` | Wars lost |

## Player

| Placeholder | Shows |
|---|---|
| `%pvpindex_player_power%` | The player's personal power |
| `%pvpindex_player_role%` | The player's role name |
| `%pvpindex_player_role_prefix%` | The player's role prefix |

## Example — scoreboard

```
&aFaction: &f%pvpindex_faction_name% &7(L%pvpindex_faction_level%)
&aPower: &f%pvpindex_faction_power%  &aLand: &f%pvpindex_faction_land%
&aK/D: &f%pvpindex_faction_kd%
```

A placeholder with no value (e.g. a factionless player) resolves to an empty/neutral string rather
than erroring.
