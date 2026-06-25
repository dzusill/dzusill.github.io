---
title: "How a Round Works"
description: "dLottery always has exactly one open round. Players buy in, the timer runs down, a winner is drawn, and a fresh round opens immediately."
---

dLottery always has exactly **one open round**. Players buy in, the timer runs down, a winner is drawn, and a fresh round opens immediately.

## Lifecycle

```
open round  →  players buy tickets  →  timer reaches 0  →  draw  →  new round opens
```

1. **A round opens** with a duration of `lossTime` and the current `taxesPercent`. On startup, an in-progress round is resumed from the database rather than restarted.
2. **Players buy tickets** ([Buying Tickets](/plugins/dlottery/features/buying-tickets/)), each adding to the shared **pool** (minus tax).
3. **The timer ends** (or an admin runs `/lottery shuffle`) and the round **draws**.
4. **A new round opens** straight away.

## The draw

When a round draws, dLottery checks:

| Condition | Outcome |
|---|---|
| No tickets sold | No winner — *"ended with no tickets sold."* |
| Fewer than `minPlayers` unique players | No winner — **everyone is refunded**. |
| Otherwise | A winner is selected, **weighted by ticket count**. |

So a round only pays out if at least `minPlayers` different players took part. See [Winning & Payouts](/plugins/dlottery/features/winning-and-payouts/) for the weighting and prize.

## Weighted odds

Win chance is proportional to tickets held. If three players hold 1, 3 and 6 tickets (10 total), their odds are 10%, 30% and 60%. Buying more tickets is buying more chances — but never a guarantee.

## Persistence

Everything — the open round, every ticket, the pool, history and player stats — lives in MySQL, so a restart resumes exactly where it left off.
