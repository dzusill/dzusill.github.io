---
title: "Reminders & Announcements"
description: "A lottery nobody notices sells no tickets. Reminders are the plugin's marketing."
---

A lottery nobody notices sells no tickets. Reminders are the plugin's marketing.

---

## Countdown reminders

```yaml
remindsTime:
  - 60
  - 30
  - 10
  - 5
  - 1
```

Seconds before the draw at which a reminder fires. Any list of values works; they do not need to be evenly spaced, and the shipped set deliberately tightens as the deadline approaches.

Remove entries to make the lottery quieter, add them to make it louder. An empty list disables reminders entirely.

## On-screen announcements

```yaml
announce:
  enable: true
  fadeIn: 10
  stay: 50
  fadeOut: 10
```

| Key | Meaning |
|---|---|
| `enable` | master switch for the title |
| `fadeIn` | ticks to fade in (20 ticks = 1 second) |
| `stay` | ticks fully visible |
| `fadeOut` | ticks to fade out |

The defaults show a title for roughly 3.5 seconds in total. Chat reminders still fire when `enable` is false — this block only controls the on-screen version.

## Tuning the noise

The right amount depends on round length. A 60-second round with five reminders is a countdown; a 30-minute round with five reminders is background.

| Round length | Reasonable reminders |
|---|---|
| 1–5 minutes | `[60, 30, 10]` |
| 15 minutes | `[300, 60, 10]` |
| 1 hour | `[900, 300, 60, 10]` |

## Wording

Every reminder line lives in `messages.yml` and is MiniMessage, so you can add a clickable `/lot buy` straight into the countdown:

```yaml
reminder: "<gold>Lottery draws in <yellow>%seconds%s</yellow>! <click:run_command:/lot><white><u>Open</u></white></click>"
```

That single change does more for ticket sales than any config value here.

## Next

- [Admin Controls](/plugins/blottery/features/admin-controls/)
