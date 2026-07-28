---
title: "Placeholders"
description: "Identifier: killtracker. Requires PlaceholderAPI."
---

Identifier: **`killtracker`**. Requires [PlaceholderAPI](https://www.spigotmc.org/resources/6245/).

No expansion to download — dKillTracker registers its own on startup. You'll see this in the console:

```
[dKillTracker] Registered PlaceholderAPI expansion 'killtracker'.
```

Everything is served from memory, so **offline players resolve too** — holograms and web integrations don't need the player online.

## Kill counts

| Placeholder | Returns | With no data |
|---|---|---|
| `%killtracker_kills%` | Counted kills — the number that drives everything | `0` |
| `%killtracker_lifetime_kills%` | Every PvP kill, anti-farm suppressed ones included | `0` |
| `%killtracker_total_kills%` | Alias of the above | `0` |
| `%killtracker_suppressed_kills%` | The difference between the two | `0` |
| `%killtracker_deaths%` | PvP deaths | `0` |

## Rank and milestones

| Placeholder | Returns | With no data |
|---|---|---|
| `%killtracker_rank%` | Rank of the last **awarded** milestone | `Default-Rank` |
| `%killtracker_last_milestone_rank%` | Alias of the above | `Default-Rank` |
| `%killtracker_last_milestone%` | Its kill threshold | `0` |
| `%killtracker_next_milestone%` | The next threshold | `-` |
| `%killtracker_next_rank%` | Rank of the next milestone | `-` |
| `%killtracker_next_milestone_rank%` | Alias of the above | `-` |
| `%killtracker_kills_remaining%` | Kills still needed for the next one | `0` |
| `%killtracker_milestones_total%` | How many tiers are configured | tier count |

`%killtracker_rank%` reads the awarded watermark, not the raw kill count — so it can never disagree with the last rank command that actually ran. See [Milestones & Ranks](/plugins/dkilltracker/features/milestones/#ranks).

## Progress

| Placeholder | Returns | Example |
|---|---|---|
| `%killtracker_progress%` | Progress inside the current band | `2/15` |
| `%killtracker_progress_absolute%` | Raw kills over the next threshold | `12/25` |
| `%killtracker_progress_percent%` | Whole percentage, `0`–`100` | `13` |

Two forms because servers want different things. With tiers at 5/10/25 and a player on 12 kills:

- `progress` → `2/15` — "2 of the 15 kills in this band". Right for a progress bar.
- `progress_absolute` → `12/25` — "12 kills toward 25". Right for a plain counter.

Once every milestone is reached both return `MAX`, and `progress_percent` returns `100`. With no tiers configured at all, `progress` returns `0/0`.

## Leaderboard

| Placeholder | Returns | Out of range |
|---|---|---|
| `%killtracker_top_name_<n>%` | Name at position n | `-` |
| `%killtracker_top_kills_<n>%` | Kills at position n | `0` |
| `%killtracker_position%` | The player's own position | `0` (unranked) |

`<n>` is 1-based and capped by `Leaderboard.Top-Size`.

## Unknown placeholders

Anything not on this list returns nothing at all, so PlaceholderAPI leaves the raw `%killtracker_typo%` visible in chat. That's deliberate — a typo showing as `0` would be much harder to spot.

Test one with:

```
/papi parse me %killtracker_progress%
```

## Examples

### TAB

```yaml
tabprefix: "&8[&c%killtracker_rank%&8] "
```

### Scoreboard

```
&7Rank: &f%killtracker_rank%
&7Kills: &c%killtracker_kills%
&7Next: &f%killtracker_next_rank% &7(&f%killtracker_kills_remaining%&7)
&7Progress: &a%killtracker_progress_percent%&7%
```

### Chat format

```
&8[&c%killtracker_rank%&8] &f%player_name%&7: &f%message%
```

### Hologram

```
&6&lTOP KILLERS
&e#1 &f%killtracker_top_name_1% &7- &c%killtracker_top_kills_1%
&e#2 &f%killtracker_top_name_2% &7- &c%killtracker_top_kills_2%
&e#3 &f%killtracker_top_name_3% &7- &c%killtracker_top_kills_3%
```

### Spotting a farmer

```
&7Kills: &f%killtracker_kills% &8(&7%killtracker_suppressed_kills% suppressed&8)
```

A big suppressed number next to a small counted one is somebody working an alt.
