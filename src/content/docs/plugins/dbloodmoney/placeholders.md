---
title: "Placeholders (PRO)"
description: "dBloodMoney registers a PlaceholderAPI expansion under the identifier dbloodmoney. Use these anywhere PlaceholderAPI is supported — scoreboards, tab lists,…"
---

> **PRO feature.** Requires `dBloodMoney-PRO.jar` **and** [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/).

dBloodMoney registers a PlaceholderAPI expansion under the identifier `dbloodmoney`. Use these anywhere PlaceholderAPI is supported — scoreboards, tab lists, chat, holograms.

## Player stats

| Placeholder | Returns |
|---|---|
| `%dbloodmoney_kills%` | The player's total kills. |
| `%dbloodmoney_deaths%` | The player's deaths to other players. |
| `%dbloodmoney_earned%` | Total money looted. |
| `%dbloodmoney_best_streak%` | Longest streak ever reached. |
| `%dbloodmoney_streak%` | Current live kill streak. |
| `%dbloodmoney_bounty_on_me%` | The bounty currently on this player. |

## Leaderboard

`<n>` is the rank (1, 2, 3…):

| Placeholder | Returns |
|---|---|
| `%dbloodmoney_top_name_<n>%` | Name of the player at rank `n`. |
| `%dbloodmoney_top_kills_<n>%` | Kill count at rank `n`. |

Example: `%dbloodmoney_top_name_1%` → the #1 killer's name.

## Usage examples

**Scoreboard line:**

```
&7Kills: &c%dbloodmoney_kills%
&7Streak: &6%dbloodmoney_streak%
&7Bounty: &e%dbloodmoney_bounty_on_me%
```

**Top-3 hologram / tab:**

```
&6#1 &f%dbloodmoney_top_name_1% &7- &c%dbloodmoney_top_kills_1%
&6#2 &f%dbloodmoney_top_name_2% &7- &c%dbloodmoney_top_kills_2%
&6#3 &f%dbloodmoney_top_name_3% &7- &c%dbloodmoney_top_kills_3%
```

## Setup

1. Install PlaceholderAPI.
2. Run the PRO edition. The expansion registers automatically on startup (no `/papi ecloud` download needed — it's built in).
3. Verify: `/papi parse me %dbloodmoney_kills%`.

> Ranks beyond the number of tracked players return `-`.
