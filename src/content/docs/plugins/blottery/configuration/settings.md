---
title: "settings.yml"
description: "The whole file, with defaults."
---

The whole file, with defaults.

```yaml
lossTime: 60
cooldown: 2
minPlayers: 2
maxTickets:
  blottery:
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

---

## Timing

| Key | Default | Meaning |
|---|---|---|
| `lossTime` | 60 | round length, **in seconds** |
| `cooldown` | 2 | gap before the next round opens, in seconds |

## Draw rules

| Key | Default | Meaning |
|---|---|---|
| `minPlayers` | 2 | distinct players needed for a draw |
| `ticketPrice` | 3000 | cost per ticket, via Vault |
| `taxesPercent` | 5 | percentage taken from the pot before payout |

Keep `minPlayers` at 2 or higher on a live server. At 1, a lone participant wins their own money back minus tax — a guaranteed loss presented as a lottery.

## Ticket caps

```yaml
maxTickets:
  blottery:
    default: 1
    iron: 2
    gold: 3
    diamond: 4
    emerald: 5
```

Each key doubles as the permission `blottery.<key>`. A player's cap is the **highest** value among the tiers they hold; caps do not add up. No tier at all means 1.

Rename these freely to match your ranks — and keep better ranks on bigger numbers, or "highest wins" produces surprises.

## Reminders

```yaml
remindsTime: [60, 30, 10, 5, 1]
```

Seconds before the draw at which to remind players. Any list works. Empty disables reminders.

## Announcements

| Key | Default | Meaning |
|---|---|---|
| `announce.enable` | `true` | show the on-screen title |
| `announce.fadeIn` | 10 | ticks fading in (20 ticks = 1s) |
| `announce.stay` | 50 | ticks fully visible |
| `announce.fadeOut` | 10 | ticks fading out |

Chat reminders fire regardless; this block only controls the title.

## Tuning for a live server

| Setting | Advice |
|---|---|
| `lossTime` | long enough that most online players see one full round |
| `ticketPrice` | roughly an hour of ordinary income |
| `taxesPercent` | 5–15% as a money sink |
| `minPlayers` | 2 minimum; 3+ on a busy server |
| `maxTickets` | keep the spread narrow, or rank alone decides the winner |

## Next

- [database.yml](/plugins/blottery/configuration/database/)
- [messages.yml](/plugins/blottery/configuration/messages/)
