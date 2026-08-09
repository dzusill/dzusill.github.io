---
title: "Leaderboard & Stats"
description: "Requires blottery.top."
---

```
/lot top
```

Requires `blottery.top`.

---

## Sort modes

| Sort | Ranks by |
|---|---|
| **Winnings** | total currency won |
| **Tickets** | total tickets bought |
| **Win count** | number of rounds won |
| **Biggest win** | largest single payout |

Four modes because they tell four different stories. *Winnings* rewards luck plus volume. *Tickets* is the honest measure of who actually plays. *Win count* finds the suspiciously lucky. *Biggest win* is the one players screenshot.

## What is tracked per player

| Field | Meaning |
|---|---|
| `ticketsBought` | lifetime tickets |
| `currencySpent` | lifetime spend |
| `currencyWon` | lifetime winnings |
| `winCount` | rounds won |
| `biggestWin` | largest single payout |
| `lastWinAt` | when they last won |
| `roundsParticipated` | rounds they bought into |
| `lastSeenAt` | last activity |

`currencySpent` against `currencyWon` is the useful pair: it tells you whether the lottery is a working money sink or quietly redistributing wealth to a handful of players.

## Persistence

Stats are cumulative and never reset. They live in MySQL, so they survive restarts and are shared by every server pointed at the same database.

## Answering "is it rigged?"

Compare a player's `winCount` against their share of tickets bought over the same period. A weighted lottery gives a player with 10% of tickets roughly 10% of wins over enough rounds. Short runs are noisy — that is what random looks like — but the numbers are there to check rather than argue about.

## Next

- [Round History](/plugins/blottery/features/history/)
