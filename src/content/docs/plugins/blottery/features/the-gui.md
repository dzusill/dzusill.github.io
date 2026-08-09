---
title: "The Lottery GUI"
description: "The no-argument command. Requires blottery.gui."
---

```
/lot
```

The no-argument command. Requires `blottery.gui`.

---

## What it shows

| Element | Purpose |
|---|---|
| **Pot** | current total, after nothing — the gross figure |
| **Countdown** | time left in the round |
| **Your tickets** | how many you hold this round |
| **Your odds** | your tickets against the total sold |
| **Ticket price** | so nobody has to remember it |
| **Buy** | purchase without typing a command |

## Why the odds are shown

A weighted lottery is only trustworthy if players can see the weighting. Showing "you hold 4 of 37 tickets — 10.8%" makes the fairness checkable, and it is also the most effective thing on the screen: watching your own percentage drop as others buy is what sells the next ticket.

## The leaderboard GUI

```
/lot top
```

A separate menu, sortable by:

- total winnings
- tickets bought
- number of wins
- biggest single win

See [Leaderboard & Stats](/plugins/blottery/features/leaderboard/).

## Refreshing

The GUI reflects the state at the moment it was opened. Reopen it to see the current pot — or watch the [countdown reminders](/plugins/blottery/features/reminders/) in chat, which push updates without anyone having a menu open.

## Titles and colours

GUI titles come from `messages.yml` and are MiniMessage, so you can match the lottery to your server's colour scheme.

## Next

- [Winning & Payouts](/plugins/blottery/features/winning-and-payouts/)
