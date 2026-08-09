---
title: "Round History"
description: "Requires blottery.history."
---

```
/lot history
```

Requires `blottery.history`.

---

## What it shows

Recent rounds, most recent first:

- when the round drew
- who won
- how much they were paid
- rounds that ended without a winner, and why

## Why it matters

Two questions come up on every server running a lottery:

1. *"Who won the last one?"* — asked by everyone who missed the broadcast.
2. *"How does X keep winning?"* — asked when the same name appears twice.

History answers the first, and turns the second into something checkable instead of a chat argument. Cross-reference with `/lot top` to compare a player's wins against their share of tickets.

## No-winner rounds

These appear in history too, with their reason:

| Reason | Meaning |
|---|---|
| `NO_TICKETS` | nobody bought a ticket |
| `TOO_FEW_PLAYERS` | fewer than `minPlayers` distinct players took part |

Worth watching. A run of `TOO_FEW_PLAYERS` means `minPlayers` is set higher than your active player count can support, or `ticketPrice` is too steep.

## Retention

History is not pruned. It lives in MySQL and grows by one row per round — small, and the point of having it.

## Networks

Servers sharing a database share history. Round numbering is global, so a round is unambiguous no matter which server a player is on.

## Next

- [Reminders & Announcements](/plugins/blottery/features/reminders/)
