---
title: "Round History"
description: "Every finished round is logged, so players and staff can see who won what."
---

Every finished round is logged, so players and staff can see who won what.

```
/lottery history
```

Requires `dlottery.history`. Shows the most recent rounds with their winner and prize:

```
Recent winners:
 * Steve - $48,250
 * Alex - $12,000
 * round 41: no winner
```

## What's recorded

For each round, dLottery stores:

- The **prize** paid out and the **tax** taken.
- The **winner** (UUID + name), or none.
- The **winning ticket count** and the **number of players** in the round.
- A **timestamp**.

No-winner rounds (no tickets, or too few players) are recorded too, shown as *"round N: no winner"*.

> History lives in the database, so it's the permanent record of every draw — useful for transparency and for resolving disputes about past winners.
