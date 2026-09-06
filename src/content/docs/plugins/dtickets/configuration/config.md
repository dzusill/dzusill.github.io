---
title: "config.yml"
description: "Everything about how the desk behaves. Six top-level sections."
---

Everything about how the desk behaves. Six top-level sections.

```yaml
Debug: false

Presentation:
  ...
Commands:
  ...
Vanish:
  ...
Tickets:
  ...
Reports:
  ...
```

## Debug

```yaml
Debug: false
```

Extra logging. Leave it off unless you are chasing something — it is verbose, and support will ask
you to turn it on when it is useful.

## Presentation

DzusillCore's presentation layer: how messages are delivered, per category, with overrides. Chat,
action bar, title, sound — the framework decides the surface, this section configures it. It behaves
identically across every dzusill plugin, so if you have tuned it in one you already know this block.

## Commands

```yaml
Commands:
  ticket:
    Enabled: true
    Name: ticket
    Aliases: [ t ]
  tickets:
    Enabled: true
    Name: tickets
    Aliases: [ ta ]
  report:
    Enabled: true
    Name: report
    Aliases: []
  reports:
    Enabled: true
    Name: reports
    Aliases: []
```

Every player-facing label is yours. `Name` is the command itself, `Aliases` are extra labels, and
`Enabled: false` stops it being registered at all — the way to give up `/report` to a plugin that
already owns it without losing the rest of dTickets.

**These need a restart, not a reload.** Bukkit builds its command map once at enable, so a renamed
command is not live until the server restarts.

`/dtickets` is not in this list. It is the admin command and keeps its name.

## Vanish

See [Vanish awareness](/plugins/dtickets/features/vanish/).

## Tickets

The largest section. Covered across the feature pages:

| Key | Page |
|---|---|
| `Max-Open-Per-Player`, `Wizard-Timeout`, `Retention-Days`, `Auto-Close-After-Days` | [Tickets](/plugins/dtickets/features/tickets/) |
| `Categories`, `Priorities`, `Statuses`, `Flags`, `Rating` | [Tickets](/plugins/dtickets/features/tickets/) |
| `Wizard` | [Tickets](/plugins/dtickets/features/tickets/#the-wizard) |
| `Canned-Replies` | [Tickets](/plugins/dtickets/features/tickets/#canned-replies) |
| `Notifications` | [Notifications](/plugins/dtickets/features/notifications/) |
| `Watchers`, `Thread`, `Transcripts` | [Ticket chat](/plugins/dtickets/features/ticket-chat/) |
| `Admin-GUI` | the staff queue's own behaviour — page size and sorting |
| `Server-Name` | the name this server records on a ticket, for networks running several |

## Reports

| Key | Page |
|---|---|
| `Cooldown-Seconds`, `Notify-Target` | [Player reports](/plugins/dtickets/features/reports/) |
| `Evidence` | [Evidence](/plugins/dtickets/features/evidence/) |
| `Duplicates` | [Player reports](/plugins/dtickets/features/reports/#duplicates) |
| `Punishments` | [Punishments](/plugins/dtickets/features/punishments/) |

## After editing

```
/dtickets reload
```

Reloads this file, `menus.yml`, `messages.yml` and `sounds.yml`. Command names are the exception —
see [Reloading](/plugins/dtickets/configuration/reloading/).
