---
title: "Winning & Payouts"
description: "---"
---

---

## The payout

```
payout = pot − (pot × taxesPercent / 100)
```

```yaml
taxesPercent: 5
```

The tax is a money sink: currency leaves the economy permanently rather than moving between players. On a server with inflation problems, this is one of the few sinks players volunteer for.

Set it to `0` for a pure pass-through pot.

## Online winners

Paid immediately through Vault, with a broadcast so everyone sees who won and how much. That announcement is what makes the next round sell.

## Offline winners

A player can win a round they are not online for — they bought tickets and left.

```
draw → winner offline
  └─ payout queued in the database
       └─ winner joins → paid, and told they won
```

The payout is a database row, not something held in memory, so it survives restarts and crashes. It is paid on their next join, whenever that is.

This is why the plugin requires a database. An offline payout held in a YAML file that is only written on clean shutdown is a payout that eventually goes missing.

## No winner

| Reason | When |
|---|---|
| `NO_TICKETS` | nobody bought a ticket |
| `TOO_FEW_PLAYERS` | fewer than `minPlayers` distinct players took part |

No payout, no tax, and the pot carries into the next round.

## Fairness

The winner is chosen by weighted random selection: each ticket is one entry. Selection happens once, server-side, when the timer expires. Nothing about a player other than their ticket count affects the result — not rank, not balance, not playtime.

## Records

Every completed round is written to history with its winner and amount, and every player's stats are updated: tickets bought, currency spent, currency won, win count, biggest win and rounds participated.

So "did X actually win three times this week" is a `/lot history` question, not an argument.

## Next

- [Leaderboard & Stats](/plugins/blottery/features/leaderboard/)
- [Round History](/plugins/blottery/features/history/)
