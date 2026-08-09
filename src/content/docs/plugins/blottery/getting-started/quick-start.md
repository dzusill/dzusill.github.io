---
title: "Quick Start"
description: "Run a full round in a few minutes."
---

Run a full round in a few minutes.

---

## 1. Set a short round

For testing, in `settings.yml`:

```yaml
lossTime: 60
cooldown: 2
minPlayers: 1
ticketPrice: 100
```

`minPlayers: 1` lets you draw on your own. Put it back to 2 or more afterwards.

## 2. Open the GUI

```
/lot
```

Pot, countdown, your tickets and your odds.

## 3. Buy tickets

```
/lot buy 3
```

Blocked at your cap — the highest `maxTickets.blottery.<tier>` permission you hold, or 1 if none.

## 4. Watch the reminders

```yaml
remindsTime: [60, 30, 10, 5, 1]
announce:
  enable: true
```

Warnings at 60, 30, 10, 5 and 1 second before the draw, with an on-screen title if `announce.enable` is on.

## 5. Let it draw

At zero, the winner is picked by weighted random — more tickets, more entries. The pot minus `taxesPercent` is paid out.

## 6. Test the offline payout

The behaviour worth verifying, because it is the one that loses money if it is broken.

1. Have a second player buy tickets.
2. Force a draw: `/lot shuffle`.
3. If they win while offline, the payout is queued.
4. Have them rejoin — they are paid on login.

## 7. Check history and stats

```
/lot history
/lot top
```

History lists past rounds and winners. The leaderboard sorts by winnings, tickets bought, win count or biggest single win.

## 8. Try the admin controls

```
/lot shuffle    # force a draw now
/lot reset      # cancel the round, refund every ticket
```

`reset` is the safe escape hatch when a round went wrong: nobody loses money.

---

## Before going live

| Setting | Why |
|---|---|
| `minPlayers` | back to 2+, so one player cannot win their own money back minus tax |
| `lossTime` | a real round length, not 60 seconds |
| `ticketPrice` | tuned to your economy |
| `taxesPercent` | your money sink |
| `maxTickets` tiers | renamed to your actual ranks |

## Next

- [How a Round Works](/plugins/blottery/features/how-a-round-works/)
