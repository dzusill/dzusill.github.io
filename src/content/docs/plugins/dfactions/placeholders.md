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

## Control zone

| Placeholder | Shows |
|---|---|
| `%dfactions_controlzone_active%` | `true` / `false` |
| `%dfactions_controlzone_state%` | `NEUTRAL`, `CAPTURING`, `HELD`, `CONTESTED` or `None` |
| `%dfactions_controlzone_owner%` | Holding faction (or player) name |
| `%dfactions_controlzone_world%` | Zone world |
| `%dfactions_controlzone_x%` | Zone centre X |
| `%dfactions_controlzone_z%` | Zone centre Z |
| `%dfactions_controlzone_time_left%` | `m:ss` until the zone closes |
| `%dfactions_controlzone_distance%` | Blocks from the viewer to the zone centre |

These read live in-memory state, so a scoreboard refreshing every tick costs no database work.
See [Control Zones](/plugins/dfactions/features/control-zones/).

## Bounties

The whole bounty family resolves only while bounties are enabled. It reads a cached snapshot, so
these are as cheap as the control-zone keys above. See [Bounties](/plugins/dfactions/features/bounties/).

The same keys work in `gui.yml` lore and in the message files as `{key}` — without the
`%dfactions_` wrapper.

### Server totals

| Placeholder | Shows |
|---|---|
| `%dfactions_bounty_count%` | Factions with a bounty on them |
| `%dfactions_bounty_total%` | Every pool added together |
| `%dfactions_bounty_claimable_total%` | How much of that is past its holding period |
| `%dfactions_bounty_average%` | Average pool size |
| `%dfactions_bounty_funders_total%` | Distinct players who have funded anything |
| `%dfactions_bounty_paid_total%` | Lifetime paid out |
| `%dfactions_bounty_refunded_total%` | Lifetime refunded |
| `%dfactions_bounty_settled_count%` | Bounties that have been claimed |
| `%dfactions_bounty_highest_faction%` | Faction at the top of the board |
| `%dfactions_bounty_highest_amount%` | That faction's pool |

### The viewer's own faction

`%dfactions_faction_bounty%` is the pool on the viewer's faction, and
`%dfactions_faction_bounty_<field>%` any [entry field](#entry-fields) — for example
`%dfactions_faction_bounty_expires_in%`.

### The board

| Placeholder | Shows |
|---|---|
| `%dfactions_bounty_top_<rank>%` | Faction name at that rank, starting at 1 |
| `%dfactions_bounty_top_<rank>_<field>%` | Any [entry field](#entry-fields) at that rank |

`%dfactions_bounty_top_1_amount%`, `%dfactions_bounty_top_3_funders%`, and so on.

### Funders

| Placeholder | Shows |
|---|---|
| `%dfactions_bounty_funder_top_<rank>%` | Funder name at that rank |
| `%dfactions_bounty_funder_top_<rank>_<field>%` | Any [funder field](#funder-fields) |
| `%dfactions_bounty_my_<field>%` | The same fields, for the viewer |

`%dfactions_bounty_my_rank%` is where the viewer sits among funders;
`%dfactions_bounty_my_top_target%` is the faction they have staked the most on.

### Where the viewer is standing, and who they are at war with

| Placeholder | Shows |
|---|---|
| `%dfactions_bounty_here%` / `%dfactions_bounty_here_<field>%` | The bounty on the faction owning the chunk under the viewer |
| `%dfactions_bounty_target%` / `%dfactions_bounty_target_<field>%` | The bounty on the viewer's current war opponent |

Both take any [entry field](#entry-fields); the bare form is the pool total. These are what turn a
bounty into something a player notices while walking around rather than only on a board.

### A named faction

| Placeholder | Shows |
|---|---|
| `%dfactions_bounty_faction_<name>%` | That faction's pool |
| `%dfactions_bounty_faction_<name>_<field>%` | Any [entry field](#entry-fields) |

A faction name containing underscores still works: the field suffix is matched first, and whatever
is left is the name.

> `%dfactions_bounty_<name>%` is a legacy short form kept for compatibility. It cannot carry a
> field, and a faction named after one of the keys above is unreachable through it — which is why
> the `bounty_faction_` form exists. Prefer it.

### The log

| Placeholder | Shows |
|---|---|
| `%dfactions_bounty_last_action%` / `_last_action_<field>%` | The most recent bounty event |
| `%dfactions_bounty_last_claim%` / `_last_claim_<field>%` | The most recent claim |

Log fields: `action` (the bare form), `faction`, `amount`, `by` (`system` when the server did it),
`ago`.

### Configured limits

`%dfactions_bounty_enabled%`, `_min_amount%`, `_max_amount%`, `_max_pool%`, `_holding_hours%`,
`_expiry_days%` — useful for a GUI that explains the rules without hardcoding them.

### Entry fields

Every placeholder above that takes a `<field>` accepts:

`total` (or `amount`), `faction` (or `name`), `claimable`, `held`, `funders`, `top_funder`,
`top_funder_amount`, `rank`, `level`, `members`, `online`, `active`, `age`, `last_funded_ago`,
`expires_in`, `next_claim_in`.

### Funder fields

`name`, `amount` (or `funded_total`, `staked`), `claimable_total`, `held_total`, `funded_count`
(or `pools`), `top_target`, `top_target_amount`, `rank`.

### Raw numbers

Append `_exact` to any money placeholder for the unformatted number —
`%dfactions_bounty_total_exact%` gives `1234.5` where `%dfactions_bounty_total%` gives the display
form. Use it wherever something else is going to do the maths.

### When there is nothing

A missing bounty is not an error: money keys resolve to a formatted zero, counts to `0`, names to
`None`, and time keys to `never`.

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
