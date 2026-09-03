---
title: "Placeholders"
description: "The %odonations…% PlaceholderAPI expansion. Every value is served from an in-memory cache refreshed on its own schedule (see config.yml → refresh) — reading…"
---

The `%odonations_…%` PlaceholderAPI expansion. Every value is served from an in-memory cache refreshed on its own schedule (see [config.yml → refresh](/plugins/oberondonations/configuration/config/#refresh)) — reading one on a scoreboard or in TAB, even several times a second, never touches the database or the network.

Names below are contractual: an existing one is never renamed or removed, only deprecated first. New ones are added freely.

## Totals

| Placeholder | Shows |
|---|---|
| `%odonations_last_donor%` | The most recent donor's name (or the anonymous name, if they declined) |
| `%odonations_last_product%` | What they bought |
| `%odonations_last_amount%` | The last purchase's amount, in **its own** currency |
| `%odonations_last_currency%` | That purchase's ISO currency code |
| `%odonations_last_time%` | That purchase's timestamp, epoch milliseconds |
| `%odonations_total_donations%` | Lifetime purchase count |
| `%odonations_total_amount%` | Lifetime total, formatted in the store's default currency (a sum across whatever currencies your history contains — see [Currencies](/plugins/oberondonations/features/currencies/)) |
| `%odonations_total_donors%` | Lifetime unique donor count |

## Per-donor

Needs an online or offline player context (a scoreboard for the viewing player, `%player_name%` in a placeholder that supports a target, etc.).

| Placeholder | Shows |
|---|---|
| `%odonations_donor_spent%` | That player's lifetime total |
| `%odonations_donor_purchases%` | Their purchase count |
| `%odonations_donor_streak%` | Their current donation streak |
| `%odonations_donor_streak_best%` | Their best streak ever |
| `%odonations_donor_hype%` | What they've contributed toward Hype Trains |
| `%odonations_donor_rank%` | Their leaderboard rank |

A player with no recorded purchases resolves every numeric one to `0` rather than blank, so a scoreboard line does not go empty.

## GG Wave

| Placeholder | Shows |
|---|---|
| `%odonations_gg_active%` | `true` / `false` |
| `%odonations_gg_seconds_left%` | Seconds until the window closes |
| `%odonations_gg_participants%` | Current entrant count |

## Hype Train

| Placeholder | Shows |
|---|---|
| `%odonations_hype_active%` | `true` / `false` |
| `%odonations_hype_level%` | Current level |
| `%odonations_hype_percent%` | Progress toward the next level |
| `%odonations_hype_total%` | Total raised this train, formatted |
| `%odonations_hype_donors%` | Unique donor count this train |
| `%odonations_hype_seconds_left%` | Seconds until it ends |
| `%odonations_hype_top_name%` | Top contributor this train |

With no train running, the numeric ones resolve to `0` (or `0.0` for the percent) rather than a stale figure from the last one. These are exactly the values the announcement templates in `announcements.yml` also use.

## Community Goals

`%odonations_goal_<id>_<field>%` — `<id>` is the goal's key under `goals:` in `goals.yml`.

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

`%odonations_board_<id>_name%` and `%odonations_board_<id>_value%` — the holder's name and their value for that board's metric/period, read from the same cache the in-world display uses. Useful for repeating a board's top line somewhere else, like a scoreboard.

## See also

- [announcements.yml](/plugins/oberondonations/configuration/announcements-yml/) uses `{brace}` placeholders in its own templates — a different, larger set specific to each event, documented there.
- [webhooks.yml](/plugins/oberondonations/configuration/webhooks-yml/) uses `<angle>` placeholders for Discord embeds.
