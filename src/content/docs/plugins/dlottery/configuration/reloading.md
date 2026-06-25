---
title: "Reloading"
description: "dLottery reads settings.yml, database.yml and messages.yml at startup."
---

dLottery reads `settings.yml`, `database.yml` and `messages.yml` at **startup**.

| Change | How to apply |
|---|---|
| `settings.yml` (round length, price, tax, VIP caps, reminders) | Restart the server (or a full plugin reload). New values apply to the **next** round. |
| `messages.yml` | Restart / full reload. |
| `database.yml` | Restart — the connection pool is built at startup. |

> Changing `lossTime`, `ticketPrice` or `taxesPercent` does **not** retroactively alter the round that's already open — it takes effect when the next round opens (or after a restart). Use `/lottery shuffle` or `/lottery reset` to end the current round first if you want new settings to apply right away.
