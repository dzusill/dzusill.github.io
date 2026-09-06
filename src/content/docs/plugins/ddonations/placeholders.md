---
title: "Placeholders"
description: "The %ddonations…% PlaceholderAPI expansion. Every value is served from an in-memory cache refreshed on its own schedule (see config.yml → refresh) — reading…"
---

The `%ddonations_…%` PlaceholderAPI expansion. Every value is served from an in-memory cache refreshed on its own schedule (see [config.yml → refresh](/plugins/ddonations/configuration/config/#refresh)) — reading one on a scoreboard or in TAB, even several times a second, never touches the database or the network.

Names below are contractual: an existing one is never renamed or removed, only deprecated first. New ones are added freely.

## Totals

| Placeholder | Shows |
|---|---|
| `%ddonations_last_donor%` | The most recent donor's name (or the anonymous name, if they declined) |
| `%ddonations_last_product%` | What they bought |
| `%ddonations_last_amount%` | The last purchase's amount, in **its own** currency |
| `%ddonations_last_currency%` | That purchase's ISO currency code |
| `%ddonations_last_time%` | That purchase's timestamp, epoch milliseconds |
| `%ddonations_total_donations%` | Lifetime purchase count |
| `%ddonations_total_amount%` | Lifetime total, formatted in the store's default currency (a sum across whatever currencies your history contains — see [Currencies](/plugins/ddonations/features/currencies/)) |
| `%ddonations_total_donors%` | Lifetime unique donor count |

## Per-donor

Needs an online or offline player context (a scoreboard for the viewing player, `%player_name%` in a placeholder that supports a target, etc.).

| Placeholder | Shows |
|---|---|
| `%ddonations_donor_spent%` | That player's lifetime total |
| `%ddonations_donor_purchases%` | Their purchase count |
| `%ddonations_donor_streak%` | Their current donation streak |
| `%ddonations_donor_streak_best%` | Their best streak ever |
| `%ddonations_donor_hype%` | What they've contributed toward Hype Trains |
| `%ddonations_donor_rank%` | Their leaderboard rank |

A player with no recorded purchases resolves every numeric one to `0` rather than blank, so a scoreboard line does not go empty.

## GG Wave

| Placeholder | Shows |
|---|---|
| `%ddonations_gg_active%` | `true` / `false` |
| `%ddonations_gg_seconds_left%` | Seconds until the window closes |
| `%ddonations_gg_participants%` | Current entrant count |

## Hype Train

| Placeholder | Shows |
|---|---|
| `%ddonations_hype_active%` | `true` / `false` |
| `%ddonations_hype_level%` | Current level |
| `%ddonations_hype_percent%` | Progress toward the next level |
| `%ddonations_hype_total%` | Total raised this train, formatted |
| `%ddonations_hype_donors%` | Unique donor count this train |
| `%ddonations_hype_seconds_left%` | Seconds until it ends |
| `%ddonations_hype_top_name%` | Top contributor this train |

With no train running, the numeric ones resolve to `0` (or `0.0` for the percent) rather than a stale figure from the last one. These are exactly the values the announcement templates in `announcements.yml` also use.

## Community Goals

`%ddonations_goal_<id>_<field>%` — `<id>` is the goal's key under `goals:` in `goals.yml`.

| Field | Shows |
|---|---|
| `name` | The goal's display name |
| `description` | Its description text |
| `percent` | Progress, one decimal place |
| `current` | Progress so far, formatted in the goal's currency |
| `target` | The target, formatted |
| `remaining` | Target minus current |
| `bar` | A 25-segment progress bar, using `bar.full` / `bar.empty` from `goals.yml` |
| `bar_10` | The same bar, 10 segments |
| `complete` | `true` / `false` |
| `cycle` | The current cycle number (increments on reset) |

A goal id that does not exist resolves to an empty string.

## Donation Boards

`%ddonations_board_<id>_name%` and `%ddonations_board_<id>_value%` — the holder's name and their value for that board's metric/period, read from the same cache the in-world display uses. Useful for repeating a board's top line somewhere else, like a scoreboard.

## See also

- [announcements.yml](/plugins/ddonations/configuration/announcements-yml/) uses `{brace}` placeholders in its own templates — a different, larger set specific to each event, documented there.
- [webhooks.yml](/plugins/ddonations/configuration/webhooks-yml/) uses `<angle>` placeholders for Discord embeds.
