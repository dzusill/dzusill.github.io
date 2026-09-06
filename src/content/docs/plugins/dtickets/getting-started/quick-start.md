---
title: "Quick start"
description: "Walk one ticket end to end before you change any settings. It takes about five minutes and shows you"
---

Walk one ticket end to end before you change any settings. It takes about five minutes and shows you
every screen your staff and players will use.

## As a player

```
/ticket
```

The hub opens: your open tickets, and a button to create a new one. Click create and the category
picker appears — **General Support**, **Player Report**, **Bug Report** and **Appeal** ship
configured.

Pick one and the wizard asks that category's questions in turn. General Support asks a single free-text
question; Player Report asks for a username first. Answer them and the ticket exists.

A player may hold **3** open tickets at once by default, and the wizard times out after **60 seconds**
of no answer. Both are in `config.yml` under `Tickets:`.

## As staff

Give yourself the staff node and open the queue:

```
/lp user <you> permission set dtickets.ticket.staff true
/tickets
```

The queue lists everything still open, oldest first, paginated. Each row carries its priority, its
status, and any flags — `unclaimed` until somebody takes it, `Inactive` once it goes stale, `Late`
when it has been waiting too long.

Click the ticket to open the detail screen. From there you can:

- **claim** it, so the queue shows it is yours
- **reply**, which opens the thread the player also sees
- change **priority** or **category**
- add a **note** only staff can read
- **teleport** to where the ticket was made
- **close** it

Reply once, then close it. The player gets a notification, and — if you leave rating enabled — a
prompt to rate how it was handled.

## Try a report

```
/report <player>
```

A report opens with the accused already attached, along with the reporter's location, the players
within 32 blocks, the last 15 lines of chat, and any anticheat flags from the ten minutes around it.
Staff see it in:

```
/reports
```

Punishments are **off by default**. Turn them on in `config.yml` under `Reports.Punishments` and the
detail screen gains a punish menu that runs your own commands — see
[Punishments](/plugins/dtickets/features/punishments/).

## Then start configuring

- Your own categories and wizard questions → [config.yml](/plugins/dtickets/configuration/config/)
- The look of every screen → [menus.yml](/plugins/dtickets/configuration/menus/)
- Every line of text → [messages.yml](/plugins/dtickets/configuration/messages/)

Run `/dtickets reload` after each edit. Command labels are the one exception — those need a restart.
