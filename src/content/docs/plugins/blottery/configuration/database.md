---
title: "database.yml"
description: "Standard DzusillCore database configuration. Required — bLottery does not run without MySQL."
---

Standard DzusillCore database configuration. **Required** — bLottery does not run without MySQL.

```yaml
enabled: true
type: mysql
host: "127.0.0.1"
port: 3306
database: "blottery"
username: "blottery"
password: ""
```

---

## Permissions the user needs

`CREATE TABLE` on the first start, so `schema-mysql.sql` can be applied, then ordinary read/write.

## What is stored

| Data | Why it must survive a restart |
|---|---|
| Rounds | an open round with tickets already sold |
| Tickets | who bought what, this round |
| Pending payouts | money owed to an offline winner |
| Round history | past rounds and winners |
| Player stats | lifetime tickets, spend, winnings, wins |

Pending payouts are the reason a database is mandatory rather than nice to have. A payout held in memory or in a file written only on clean shutdown is a payout that disappears in a crash — and a player who was owed real in-game money and never got it.

## Networks

Point several servers at the same database and they share the round, the pot, the history and the leaderboard. A player can buy tickets on one server and be paid on another.

## Backups

Back it up with your world. Restoring an old snapshot rewinds rounds and payouts together, which keeps them consistent.

## If the connection fails

The plugin does not enable. There is no degraded mode — running a lottery that cannot record a payout is worse than not running one.

Check the console for the JDBC error, fix it, restart.

## Next

- [messages.yml](/plugins/blottery/configuration/messages/)
