---
title: "Installation"
description: "The schema is created automatically on the first successful connection."
---

1. Install **DzusillCore**, **Vault** and an economy plugin.
2. Drop `bLottery.jar` into `plugins/`.
3. Start once to generate `settings.yml`, `messages.yml` and `database.yml`.
4. Fill in `database.yml`.
5. Restart.

The schema is created automatically on the first successful connection.

---

## database.yml

```yaml
enabled: true
type: mysql
host: "127.0.0.1"
port: 3306
database: "blottery"
username: "blottery"
password: "..."
```

The user needs `CREATE TABLE` on the first start, then read/write.

## settings.yml — the four values to set first

```yaml
ticketPrice: 3000     # cost of one ticket
taxesPercent: 5       # cut taken from the pot
minPlayers: 2         # distinct players needed for a draw
lossTime: 60          # round length in seconds
```

`ticketPrice` is the one to think about. Too cheap and the pot is meaningless; too expensive and nobody plays. A useful starting point is roughly what an hour of ordinary play earns on your economy.

## Ticket caps by rank

```yaml
maxTickets:
  blottery:
    default: 1
    iron: 2
    gold: 3
    diamond: 4
    emerald: 5
```

Each key doubles as a permission: `blottery.iron` grants a cap of 2. A player's cap is the **highest** tier they hold. Rename these to match your own ranks.

```
lp group vip permission set blottery.gold true
```

## Verifying it worked

```
/lot
```

The GUI should open showing an open round and a zero pot. Then:

```
/lot buy 1
/lot status
```

## Updating

Replace the jar and restart. New config keys are merged with their comments; your values are preserved.

## Next

- [Quick Start](/plugins/blottery/getting-started/quick-start/)
