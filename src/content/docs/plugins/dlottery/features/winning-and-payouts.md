---
title: "Winning & Payouts"
description: "At the draw, a winner is chosen from all tickets using weighted random selection — each player's chance equals their share of the total tickets. More…"
---

## Picking a winner

At the draw, a winner is chosen from all tickets using **weighted random selection** — each player's chance equals their share of the total tickets. More tickets, better odds (see [How a Round Works](/plugins/dlottery/features/how-a-round-works/)).

## The prize

The winner receives the round's **pool**. The pool is what players paid in, minus tax: each purchase contributes `ticketPrice × amount × (100 − taxesPercent) / 100`. So with `taxesPercent: 5`, the server skims 5% as a money sink and the winner takes the other 95%.

Everyone online sees: *"`<player>` won `<amount>` in the lottery with `<n>` tickets!"*

## Online vs offline payouts

| Winner is… | What happens |
|---|---|
| **Online** | Paid immediately through Vault. |
| **Offline** | A **pending payout** is stored; they're paid automatically the next time they log in, with *"You received `<amount>` from a lottery win while you were offline!"* |

This means a player never misses a prize just because the draw landed while they were away.

## No-winner rounds

If the round can't pay out, every ticket is **refunded** in full and a new round opens:

| Reason | Broadcast |
|---|---|
| No tickets were sold | *"The lottery round ended with no tickets sold."* |
| Fewer than `minPlayers` joined | *"Not enough players for a draw — everyone was refunded."* |

## Reliability

Purchases are transactional and the pool only ever reflects confirmed payments, so the prize a winner receives always matches what players actually paid in.
