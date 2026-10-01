---
title: "Leaderboard"
description: "Who has AFKed the longest — and who has received the most rewards, or the most of one reward. Built in"
---

Who has AFKed the longest — and who has received the most rewards, or the most of one reward. Built in
the same shape as OberonStats, so a menu or hologram made for one reads the other with only the identifier
changed.

## Tracks

| Track | Ranks by |
|---|---|
| `time` | Time spent collecting in zones — the same number `/afk stats` shows. Only time in an eligible game mode counts |
| `drops` | Rewards received. Failed deliveries do not count |
| `drops-<reward id>` | How many of one reward a player received, e.g. `drops-koth-key` |

Every reward in `rewards.yml` has a track from the start, even before anybody has received it. Track names
ignore case, and `_` and `-` are the same: `drops_koth_key` works. Everything is lifetime.

## Where the numbers come from

Placeholders and `/afk top` read a **snapshot** rebuilt in the background every
`leaderboard.refresh-seconds` (60 by default): the database supplies every player who ever collected time,
and players online at that moment are taken from memory, where their numbers are newer. A scoreboard that
asks twice a second therefore never touches the database, and the board is never more than one refresh
behind. `/afk reload` rebuilds it at once.

## Blanking

A player whose value is at or below `leaderboard.min-value` (0 by default — for `time` it is seconds) is
**nothing** and never ranked. Ranks close up instead of leaving holes: rank 5 is always the fifth player
worth showing, so a menu sized to `%oberonafk_top_size_time%` never draws an empty row in the middle.

A rank past the end of the board renders as `leaderboard.blank-text` (empty by default) — and **all fields
of that row blank together**: `top_name`, `top_value`, `top_uuid` and `top_line`. A row can never come out
half-drawn.

Two kinds of empty are deliberately different:

- a placeholder that **does not parse** — an unknown track, a rank that is not a number — returns nothing at
  all, so PlaceholderAPI leaves the raw `%oberonafk_…%` text visible and the typo is easy to spot;
- a placeholder that parses but **has nothing to show** returns `blank-text`.

A player's *own* zero is information ("you have AFKed 0s"), so `value_` placeholders keep showing it unless
`hide-zero-value: true`. `position_` shows `unranked-position` (empty by default) for a player who is not on
the board; `position_raw_` shows `0`.

## Hiding staff

Holders of `oberonafk.top.exempt` (the `exempt-permission`) are left out of every board; their own value
placeholders still answer. A permission can only be checked for somebody online, so each player's answer is
stored when they join and leave — offline staff stay hidden. For anyone who has not joined since the
permission was set, list them under `exempt-players` (names or UUIDs).

## Paging

Every viewer has their own page per track, which the `page_` placeholders follow. A menu button moves it:

| Command | Effect |
|---|---|
| `/afk top page next [track]` | Forward one page, stops at the last |
| `/afk top page prev [track]` | Back one page, stops at the first |
| `/afk top page first` / `last [track]` | First / last page |
| `/afk top page <n> [track]` | Jump to page n |
| `/afk top page all [track]` | One page holding every ranked player |
| `/afk top page reset [track]` | Back to page 1 at the normal size |

The track defaults to `time`. These commands are silent unless you give `top.page-set` in
`messages.yml` a text. Page state lives in memory and resets when the player leaves.

## In chat

```
/afk top [track] [page]
```

A page of `page-size` rows, with the reader's own place under it. `/afk top 2` is page 2 of `time`. Every
line is a `messages.yml` key — see [messages.yml](/plugins/oberonafk/configuration/messages/#top).

## Settings

All under `leaderboard` in [`config.yml`](/plugins/oberonafk/configuration/config/#leaderboard).

The placeholders themselves are listed in [Placeholders](/plugins/oberonafk/reference/placeholders/#leaderboard).
