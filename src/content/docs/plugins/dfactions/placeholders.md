---
title: "Placeholders"
description: "With PlaceholderAPI installed, dFactions"
---

With [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed, dFactions
registers the **`dfactions`** expansion. Use these in scoreboards, tab lists, holograms and chat.

> Placeholders resolve for the viewing player's faction (or the player themselves for `player_*`).

## Faction identity & territory

| Placeholder | Shows |
|---|---|
| `%dfactions_faction_name%` | Faction name |
| `%dfactions_faction_members%` | Member count |
| `%dfactions_faction_land%` | Claimed chunks |
| `%dfactions_faction_bank%` | Bank balance |

## Progression

| Placeholder | Shows |
|---|---|
| `%dfactions_faction_level%` | Current level |
| `%dfactions_faction_prestige%` | Prestige rank |
| `%dfactions_faction_xp%` | Current XP toward next level |
| `%dfactions_faction_xp_required%` | XP for the next level |
| `%dfactions_faction_prestige_color%` | Prestige color tag |

## Combat & stats

| Placeholder | Shows |
|---|---|
| `%dfactions_faction_kills%` | Total kills |
| `%dfactions_faction_deaths%` | Total deaths |
| `%dfactions_faction_kd%` | Kill/death ratio |
| `%dfactions_faction_wars_won%` | Wars won |
| `%dfactions_faction_wars_lost%` | Wars lost |

## Player

| Placeholder | Shows |
|---|---|
| `%dfactions_player_role%` | The player's role name |
| `%dfactions_player_role_prefix%` | The player's role prefix |

## Example — scoreboard

```
&aFaction: &f%dfactions_faction_name% &7(L%dfactions_faction_level%)
&aLand: &f%dfactions_faction_land%
&aK/D: &f%dfactions_faction_kd%
```

A placeholder with no value (e.g. a factionless player) resolves to an empty/neutral string rather
than erroring.
