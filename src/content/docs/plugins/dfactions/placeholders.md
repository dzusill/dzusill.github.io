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

## Season statistics

Served from an in-memory cache rather than the database, so a scoreboard refreshing every tick
costs nothing. Requires [Statistics & Seasons](/plugins/dfactions/features/statistics/).

| Placeholder | Shows |
|---|---|
| `%dfactions_stat_rating%` | Skill rating |
| `%dfactions_stat_position%` | Leaderboard position, or `—` when unranked |
| `%dfactions_stat_kills%` | Kills this season |
| `%dfactions_stat_deaths%` | Deaths this season |
| `%dfactions_stat_kdr%` | Season K/D |
| `%dfactions_stat_streak%` | Current kill streak |
| `%dfactions_stat_best_streak%` | Best streak this season |
| `%dfactions_stat_playtime%` | Playtime this season |
| `%dfactions_stat_sessions%` | Sessions this season |
| `%dfactions_stat_money%` | Money earned this season |
| `%dfactions_stat_networth%` | Value contributed this season |
| `%dfactions_season_number%` | Current season number |
| `%dfactions_season_label%` | Current season name |
| `%dfactions_season_ends_in%` | Time until the season ends, or `never` |

Faction-side equivalents use the `fstat_` prefix — `%dfactions_fstat_networth%`,
`%dfactions_fstat_raids_made%`, `%dfactions_fstat_defences%`, `%dfactions_fstat_claims%`,
`%dfactions_fstat_power%`, `%dfactions_fstat_nemesis%`, and the rest of the profile metrics.

> There is no placeholder for a weighting, a flag or a suspicion score, and there never will be.
> See [how the ranking stays honest](/plugins/dfactions/features/statistics/#how-the-ranking-stays-honest).

## Example — scoreboard

```
&aFaction: &f%dfactions_faction_name% &7(L%dfactions_faction_level%)
&aLand: &f%dfactions_faction_land%
&aK/D: &f%dfactions_faction_kd%
&aRating: &f%dfactions_stat_rating% &7(#%dfactions_stat_position%)
&aSeason ends: &f%dfactions_season_ends_in%
```

A placeholder with no value (e.g. a factionless player) resolves to an empty/neutral string rather
than erroring.
