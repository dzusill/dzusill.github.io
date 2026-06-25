---
title: "Admin Controls"
description: "Two operator commands give staff manual control over the current round."
---

Two operator commands give staff manual control over the current round.

## Force a draw

```
/lottery shuffle
```

Draws the **current round immediately**, instead of waiting for the timer (requires `dlottery.shuffle`). The same rules apply as an automatic draw — it still needs at least `minPlayers`, otherwise everyone is refunded. Useful for events or to wrap up a round early.

Confirmation: *"Draw triggered."*

## Reset & refund

```
/lottery reset
```

**Cancels the current round and refunds every ticket** to its buyer, then opens a fresh round (requires `dlottery.reset`). Use it to undo a misconfigured round or to clear the board.

Confirmation: *"Round reset, every ticket was refunded."*

## Admin help

```
/lottery admin
```

Shows the admin command list (requires `dlottery.admin`).

> Both `shuffle` and `reset` act on the live round and persist their effects to the database immediately. Refunds return the exact amount each player paid (pre-tax contributions are tracked per ticket).
