---
title: "Quick Start"
description: "(aliases /lot, /dlottery, /dlot) opens the live GUI for the current round — the pool, your tickets and the time remaining."
---

## 1. Open the lottery

```
/lottery
```

(aliases `/lot`, `/dlottery`, `/dlot`) opens the live GUI for the current round — the pool, your tickets and the time remaining.

## 2. Buy tickets

```
/lottery buy 3
```

Buys 3 tickets at the configured `ticketPrice` (charged via Vault). You can hold up to your [VIP tier](/plugins/dlottery/features/buying-tickets/) cap (default 1). The pool grows by your contribution minus tax.

## 3. Check the round

```
/lottery status
```

Shows players, pool, your tickets and the time to the draw.

## 4. The draw

When the round timer ends, a winner is picked **weighted by ticket count** and takes the pool. If fewer than `minPlayers` joined, everyone is refunded. Winners offline at draw time are paid on their next login.

## 5. See who's winning

```
/lottery history       # recent winners
/lottery top           # leaderboard GUI
/lottery top tickets   # leaderboard sorted by tickets bought
```

## Admin

```
/lottery shuffle    # draw the current round right now
/lottery reset      # cancel the round and refund everyone
```

Tune everything — round length, price, tax, VIP caps, reminders — in [settings.yml](/plugins/dlottery/configuration/settings/).
