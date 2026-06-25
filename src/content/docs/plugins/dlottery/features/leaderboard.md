---
title: "Leaderboard & Stats"
description: "dLottery records lifetime stats for every player and ranks them in a leaderboard."
---

dLottery records lifetime stats for every player and ranks them in a leaderboard.

## Tracked stats

| Stat | Meaning |
|---|---|
| Tickets bought | Total tickets purchased across all rounds. |
| Currency spent | Total money spent on tickets. |
| Currency won | Total prize money won. |
| Win count | Number of rounds won. |
| Biggest win | Largest single prize. |
| Rounds participated | Distinct rounds joined. |

## The leaderboard

```
/lottery top [sort]
```

Opens the leaderboard GUI (requires `dlottery.top`). The optional `sort` chooses the ranking:

| Sort | Ranks by |
|---|---|
| `winnings` | Total currency won (default). |
| `tickets` | Total tickets bought. |
| `wins` | Number of wins. |
| `biggest` | Largest single win. |

```
/lottery top tickets
/lottery top biggest
```

The text command also shows ranked entries as `#rank player - value`.

> Stats persist in MySQL and accumulate across restarts — the leaderboard reflects the whole history of the lottery, not just the current round.
