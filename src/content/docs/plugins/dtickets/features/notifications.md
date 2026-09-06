---
title: "Notifications"
description: "Staff who get pinged for everything stop reading the pings. Every staffer picks their own alerts, per"
---

Staff who get pinged for everything stop reading the pings. Every staffer picks their own alerts, per
event, from a menu.

```
/ticket notifications
```

Or the notifications button on the staff queue. The screen is `Notifications` in
[menus.yml](/plugins/dtickets/configuration/menus/).

## Defaults

New staff start on the defaults you set:

```yaml
Tickets:
  Notifications:
    Enabled: true
    Announce: BROADCAST
    Defaults:
      Reply: true
      Status-Change: true
      Closed: true
      Sounds: true
      Titles: false
      Offline-Notice: true
      New-Ticket: true
      New-Report: true
```

| Setting | Fires when |
|---|---|
| `Reply` | somebody replies on a ticket they follow |
| `Status-Change` | its status or priority changes |
| `Closed` | it closes |
| `New-Ticket` | any ticket is created |
| `New-Report` | any report is filed |
| `Sounds` | plays the sound for the event, from `sounds.yml` |
| `Titles` | shows it as a title as well as in chat |
| `Offline-Notice` | delivers what they missed on their next join |

`Titles` is off by default on purpose — a title in the middle of a build is intrusive, and staff who
want it can turn it on themselves.

`Offline-Notice` is what stops a ticket filed at 3am from being invisible to the staffer who logs in
at 9.

These are only starting values. A staffer's own choices are stored per player and survive restarts;
changing the defaults later does not overwrite anyone.

## Who gets notified

Notifications follow the ticket's followers, not a blanket staff broadcast. See
[Ticket chat](/plugins/dtickets/features/ticket-chat/#followers) for how following works.

`New-Ticket` and `New-Report` are the exception: those go to everyone holding the staff node who has
that setting on, because nobody follows a ticket that does not exist yet.

## Announce

```yaml
Announce: BROADCAST
```

How a new ticket is announced to staff. `BROADCAST` sends it to the staff who qualify. The per-staffer
`New-Ticket` and `New-Report` settings still apply on top, so this is the channel rather than an
override.

## Sounds

Every event's sound lives in `sounds.yml` and can be changed or silenced individually. A staffer who
turns `Sounds` off gets none of them regardless.

## Turning it all off

`Notifications.Enabled: false` stops every alert from the plugin. Tickets still work; staff just have
to look at the queue. Reasonable if you run your alerts through Discord instead.
