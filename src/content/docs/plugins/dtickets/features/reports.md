---
title: "Player reports"
description: "A report is a ticket with a target. /report <player> opens one with the accused already attached,"
---

A report is a ticket with a target. `/report <player>` opens one with the accused already attached,
so staff never receive *"he was hacking"* with no name, no time and no place.

## What a report carries

Beyond the reporter's own answers, the plugin attaches what it can see at the moment the report is
made. That is covered in [Evidence](/plugins/dtickets/features/evidence/): location, nearby players, recent chat, and any
anticheat flags from the window around it.

## Cooldown

```yaml
Reports:
  Cooldown-Seconds: 60
```

One report per player per minute by default. It exists to stop a frustrated player filing the same
report six times while staff are already reading the first one.

## Telling the target

```yaml
Reports:
  Notify-Target: false
```

Off by default, and worth leaving off. Telling somebody they have just been reported mostly teaches
them to stop doing it while staff are watching.

## Duplicates

When several players report the same target at once, the reports fold together instead of filling the
queue:

```yaml
Reports:
  Duplicates:
    Merge-Window-Minutes: 10
    Escalate-After-Reporters: 3
    Escalate-To: URGENT
```

Reports about the same target inside the window are merged into one. Once three separate reporters
have joined it, the priority jumps to `URGENT` — three independent people is a stronger signal than
any single report, and the queue should say so.

The merged report shows the count on its `Merged` flag, and every reporter stays subscribed to the
outcome.

## The report queue

```
/reports
```

Needs `dtickets.report.admin`. It works like the ticket queue — priority order, flags, claiming — but
each row shows the target as well as the reporter, and the detail screen carries the evidence block
and, if you have enabled it, the [punish menu](/plugins/dtickets/features/punishments/).

## Turning reports off

```yaml
Reports:
  Enabled: false
```

The whole subsystem switches off and `/report` stops being registered, leaving the ticket desk on its
own. Useful if you already run a dedicated report plugin and only want dTickets for support.
