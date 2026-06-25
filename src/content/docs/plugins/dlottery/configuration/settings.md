---
title: "settings.yml"
description: "The lottery behaviour file at plugins/dLottery/settings.yml."
---

The lottery behaviour file at `plugins/dLottery/settings.yml`.

```yaml
lossTime: 60
cooldown: 2
minPlayers: 2
maxTickets:
  dlottery:
    default: 1
    iron: 2
    gold: 3
    diamond: 4
    emerald: 5
ticketPrice: 3000
taxesPercent: 5
remindsTime:
  - 60
  - 30
  - 10
  - 5
  - 1
announce:
  enable: true
  fadeIn: 10
  stay: 50
  fadeOut: 10
```

| Key | Default | Description |
|---|---|---|
| `lossTime` | `60` | Round duration, in **minutes**. |
| `cooldown` | `2` | Seconds between ticket purchases per player. |
| `minPlayers` | `2` | Minimum unique players for a draw; below this, everyone is refunded. |
| `ticketPrice` | `3000` | Price per ticket in your economy currency. |
| `taxesPercent` | `5` | Percentage skimmed from contributions as tax (money sink). |
| `maxTickets.dlottery.<tier>` | 1–5 | Max tickets per round per [VIP tier](/plugins/dlottery/features/buying-tickets/). |
| `remindsTime` | `[60,30,10,5,1]` | Minutes before the draw to broadcast a [reminder](/plugins/dlottery/features/reminders/). |
| `announce.*` | see above | Draw [title announcement](/plugins/dlottery/features/reminders/) toggle and fade/stay timings (ticks). |

## VIP tiers

The `maxTickets.dlottery` map defines ticket caps by permission tier. A player's cap is the tier they have a permission for:

| Tier | Permission | Default |
|---|---|---|
| default | *(everyone)* | 1 |
| iron | `dlottery.tickets.iron` | 2 |
| gold | `dlottery.tickets.gold` | 3 |
| diamond | `dlottery.tickets.diamond` | 4 |
| emerald | `dlottery.tickets.emerald` | 5 |

Change the numbers to whatever caps you like; the tier names map to `dlottery.tickets.<tier>` permissions.
