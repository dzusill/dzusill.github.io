---
title: "Ticket Notifications"
description: "Who gets told when a ticket moves, what happens to updates nobody was online to receive, and how a player switches any of it off."
---

Every change to a ticket reaches the people who care about it, and nobody else. Players hear about tickets they opened or follow; staff hear about the queue.

---

## Who hears what

Two audiences, routed differently on purpose.

**Followers** — the ticket's owner, plus any staff who claimed or replied to it. They are told when their specific ticket is replied to, changed or closed. If they are offline, the update is **held and replayed** on their next login.

**Staff at large** — told when a ticket is opened or a report is filed, live only. Nothing is queued for them.

That asymmetry is deliberate. A staff member logging in tomorrow does not want sixty "new ticket" lines replayed at them; they want to know what is open *now*. So instead of a replay they get the current state of the queue:

> **7 open tickets · 3 unclaimed · 2 open reports** [Click to open]

A player gets the replay, because a specific ticket moving is still worth knowing about an hour later.

:::note
A report names a suspected cheat. It is only announced to staff who hold `oberonstaff.report.admin` — handing that to a moderator who cannot open the report is a rumour, not a notification.
:::

---

## Clickable messages

The shipped messages carry click and hover actions, so a notification is one click from the thing it is about:

```yaml
notify:
  new-ticket: "<prefix><#5DADE2>New ticket <white>#<id></white> <dark_gray>| <gray><category> <dark_gray>| <gray>by <white><player></white> <click:run_command:'/tickets'><yellow>[Open]</yellow></click>"
```

Any MiniMessage `<click:>` and `<hover:>` works here. Player-typed text inside a notification is escaped before it is rendered, so a ticket title can never smuggle in markup or a click action of its own.

---

## What a player can switch off

`/ticket notifications` opens a menu of switches. Each is per-player and stored in the database, so it survives restarts and name changes.

| Switch | Default | What it controls |
|---|---|---|
| Replies | On | Somebody answered a ticket you follow |
| Status changes | On | Priority, category or assignee changed |
| Closed | On | A ticket you follow was closed |
| Sounds | On | Play a sound with notifications |
| Missed updates | On | The replay when you log in |
| New tickets | On | *Staff.* A ticket landed in the queue |
| New reports | On | *Staff.* A player was reported |
| Stale warnings | On | *Staff.* Something has been waiting too long |
| My categories only | Off | *Staff.* See below |

Staff-only switches are hidden from players rather than greyed out.

### My categories only

Off by default: everybody with the staff node hears about every category. Turn it on and that staff member only hears about categories they hold `oberonstaff.ticket.notify.<category>` for.

This is for teams with specialists. Give a build team `oberonstaff.ticket.notify.bug_report` and nothing else, and they stop hearing about refund requests. A server without specialists never needs to grant these nodes at all.

---

## Changing the defaults

`Tickets.Notifications.Defaults` sets what somebody gets **before** they have touched the menu:

```yaml
Tickets:
  Notifications:
    Enabled: true
    Announce: BROADCAST        # or STAFF_CHAT, or BOTH
    Defaults:
      Reply: true
      Status-Change: true
      Closed: true
      Sounds: true
      Titles: false
      Offline-Notice: true
      New-Ticket: true
      New-Report: true
      Stale-Warning: true
      Own-Categories-Only: false
```

:::tip[Changing a default moves the right people]
Change one of these and reload, and it moves **everybody who never opened the menu**. Anyone who set that switch for themselves keeps their choice.

The plugin records "this player has chosen" separately from the value, which is what makes that possible — otherwise a first login would be indistinguishable from somebody asking to be left alone.
:::

---

## Missed updates

```yaml
Tickets:
  Notifications:
    Offline:
      Enabled: true
      Deliver-On-Join: true
      Mode: COUNT          # or SUMMARY
      Delay-Seconds: 3
      Max-Lines: 5
      Expire-After-Days: 30
```

**COUNT** is one clickable line: *"2 of your tickets have new updates."*

**SUMMARY** sends that line and then one row per update, capped at `Max-Lines` — the count is still sent, so somebody who was away a week sees "12 updates" and five of them rather than a truncated list with no hint it was truncated.

`Delay-Seconds` keeps the line out from under the join message and the MOTD. A player who joins and immediately disconnects is never sent anything; it is checked again when the delay elapses.

`Expire-After-Days` drops undelivered updates that old, so somebody returning after a year does not come back to four hundred of them. `0` keeps them forever.

Muting a notification type means it is **not queued either** — otherwise turning one off would only delay it.

---

## Sounds

Sounds live in their own file, `sounds.yml`. Every entry is optional and a blank `Sound` turns one off:

```yaml
Ticket-Reply:
  Sound: BLOCK_NOTE_BLOCK_PLING
  Volume: 0.7
  Pitch: 1.5

# The short form works too:
Ticket-Closed: BLOCK_NOTE_BLOCK_BELL
```

| Key | When |
|---|---|
| `Ticket-Reply` | Somebody answered a ticket you follow |
| `Ticket-Status` | Status, priority or assignee changed |
| `Ticket-Closed` | A ticket you follow was closed |
| `Ticket-Created` | Your ticket was accepted |
| `Staff-New-Ticket` | A ticket landed in the queue |
| `Staff-New-Report` | A report was filed |
| `Staff-Stale` | Something has been waiting too long |
| `Offline-Digest` | The missed-updates line on join |
| `Wizard-Step` | A wizard answer was accepted |
| `Error` | An answer was rejected, or an action refused |

A sound name this server does not know plays nothing rather than erroring, so a typo costs you a sound and not a working ticket desk. Players can silence all of them with `/ticket notifications`.

---

## Restyling the menu

Every switch has its own block in [`menus.yml`](/plugins/oberonstaff/configuration/menus/#notification-switches), keyed by the same short name the command takes — so the word you edit is the word a player types:

```yaml
Notifications:
  Buttons:
    reply:
      Material: WRITABLE_BOOK
      Name: "<green>Replies"
      Help: "Somebody answers a ticket you follow."
```

The icon a switched-off row uses (`Off-Material`) and the On/Off wording (`State`) are shared across all of them, so off looks off the same way everywhere.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `oberonstaff.ticket.notify` | — | Parent of the per-category nodes |
| `oberonstaff.ticket.notify.<category>` | — | Hear about this category when "my categories only" is on |

Neither is needed for normal notifications. `oberonstaff.ticket.admin` already hears about everything.

---

## See also

- [Ticket Desk](/plugins/oberonstaff/features/tickets/) — categories, the wizard, the queues
- [Reports](/plugins/oberonstaff/features/reports/) — what a report notification is about
- [messages.yml](/plugins/oberonstaff/configuration/messages/) — the notification lines themselves
