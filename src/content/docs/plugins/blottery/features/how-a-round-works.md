---
title: "How a Round Works"
description: "A round has two states — OPEN and CLOSED — and one job: collect tickets, then pick a winner fairly."
---

A round has two states — `OPEN` and `CLOSED` — and one job: collect tickets, then pick a winner fairly.

---

## The cycle

```
OPEN                      lossTime seconds
  └─ players buy tickets, each ticket = one entry in the pot
       └─ timer expires → CLOSED
            ├─ fewer than minPlayers took part → no winner (TOO_FEW_PLAYERS)
            ├─ no tickets sold at all          → no winner (NO_TICKETS)
            └─ otherwise → weighted draw
                 └─ pot − taxesPercent → winner
                      └─ cooldown seconds → next round OPEN
```

## The timings

```yaml
lossTime: 60    # round length, in seconds
cooldown: 2     # gap before the next round opens, in seconds
```

`cooldown` exists so the payout message is not immediately buried by a new round starting.

## The weighted draw

Every ticket is one entry. A player with ten tickets has ten entries, and better odds than someone with one — but no guarantee. That difference is the whole design: buying more tickets must improve your chances without turning the lottery into "whoever spends most wins".

The GUI shows each player their current odds, so the weighting is visible rather than something they have to take on trust.

## When there is no winner

| Reason | Meaning |
|---|---|
| `NO_TICKETS` | nobody bought anything |
| `TOO_FEW_PLAYERS` | fewer than `minPlayers` distinct players took part |

```yaml
minPlayers: 2
```

Without this, a round with one participant pays that player their own money back minus tax — a guaranteed loss dressed up as a lottery. Keep it at 2 or higher on a live server.

The pot from a no-winner round is not lost; it carries into the next one.

## Persistence

Rounds, tickets and status live in MySQL, so a restart mid-round loses nothing. The round resumes where it was, with its tickets and its pot.

## Next

- [Buying Tickets](/plugins/blottery/features/buying-tickets/)
- [Winning & Payouts](/plugins/blottery/features/winning-and-payouts/)
