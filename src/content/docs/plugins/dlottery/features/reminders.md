---
title: "Reminders & Announcements"
description: "Keep players engaged by reminding them a draw is coming and announcing the result."
---

Keep players engaged by reminding them a draw is coming and announcing the result.

## Countdown reminders

```yaml
remindsTime:
  - 60
  - 30
  - 10
  - 5
  - 1
```

`remindsTime` is a list of **minutes before the draw** at which dLottery broadcasts a reminder: *"The lottery will be drawn in `<n>`s!"*. With the default list, players are nudged at 60, 30, 10, 5 and 1 minute(s) to go — your last chance to buy in.

Edit the list to add or remove reminder points.

## Draw announcement

```yaml
announce:
  enable: true
  fadeIn: 10
  stay: 50
  fadeOut: 10
```

| Key | Default | Description |
|---|---|---|
| `enable` | `true` | Show an on-screen title when a round draws. |
| `fadeIn` | `10` | Title fade-in time, in ticks. |
| `stay` | `50` | How long the title stays, in ticks. |
| `fadeOut` | `10` | Title fade-out time, in ticks. |

When a round draws, the win (or no-winner) result is broadcast to everyone online, and — with `announce.enable` — shown as a title with these timings (20 ticks = 1 second).
