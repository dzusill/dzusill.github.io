---
title: "Leaderboards and top payouts"
description: "A snapshot of every board is rebuilt every leaderboard.refresh-seconds (30) from the database, with"
---

## Boards

| Board | Ranks |
|---|---|
| `kills_daily`, `kills_weekly`, `kills_monthly`, `kills_alltime` | Counted kills in the period |
| `streak_daily`, `streak_weekly`, `streak_monthly`, `streak_alltime` | Best streak in the period |
| `current` | Live streaks of online players |

A snapshot of every board is rebuilt every `leaderboard.refresh-seconds` (30) from the database, with
online players' numbers from memory on top. Placeholders and `/ffa top` only ever read the snapshot.

Players with a value of 0 are not ranked. Players with `oberonffa.leaderboard.exempt` (remembered from
their last time online) and those in `leaderboard.exempt-players` are left out of every board and every
payout.

**Ties** are decided, never shared: a kills board puts the better best streak (same period) first, a
streak board the player with more kills; then the name without case, then the UUID. The same numbers
always give the same order.

## Top payouts

`leaderboard.payouts.<board>` pays places when a board's period ends. Shipped: weekly kills and weekly
best streak — #1 10,000 stardust + 3 keys, #2 5,000 + 2 keys, #3 2,500 + 1 key; monthly boards present,
switched off.

- The finished period is frozen after every pending write is in.
- Each place and each player is paid once per board and period — also after a restart and if the period
  is ended again with `/ffa admin rollover <period> --pay` (without `--pay` a forced rollover never pays the top).
- A period that ended while the server was down is paid at the next start: `data.yml` remembers the last
  processed day, week and month.
- Offline winners get the rewards at their next join.
- Exempt players are skipped; the next player moves up.
- The winners are announced by `broadcasts.top` (scope, chat, action bar, title, sound) with
  `broadcast.top` from messages.yml; `leaderboard.broadcast-positions` sets how many are listed.

## In chat

`/ffa top <kills|streak|current> [period] [page]` — period defaults to weekly; a number in the period's
place is the page.
