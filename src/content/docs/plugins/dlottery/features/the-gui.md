---
title: "The Lottery GUI"
description: "(requires dlottery.gui) opens the live lottery menu — the friendliest way for players to see the round and join."
---

```
/lottery
```

(requires `dlottery.gui`) opens the live lottery menu — the friendliest way for players to see the round and join.

## What it shows

- The current **pool**.
- **Your tickets** in this round.
- The **time remaining** until the draw.
- A way to **buy tickets** without typing the command.

## Live updates

The menu is **live**: when anyone buys tickets, every open lottery GUI **refreshes automatically** to show the new pool and ticket counts — players watch the pot grow in real time. When a round draws, all open lottery menus close.

> Because the GUI renders synchronously, dLottery keeps a write-through snapshot of the open round in memory (updated only after each database write actually succeeds), so the menu is always accurate without waiting on the database.

## Leaderboard GUI

```
/lottery top [sort]
```

opens the [leaderboard](/plugins/dlottery/features/leaderboard/) menu — a separate GUI ranking players by winnings, tickets, win count or biggest win.
