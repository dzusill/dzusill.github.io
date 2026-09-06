---
title: "Commands and permissions"
description: "Every player-facing label below is the default. All four are renameable, and each can be switched"
---

Every player-facing label below is the **default**. All four are renameable, and each can be switched
off, under `Commands:` in [config.yml](/plugins/dtickets/configuration/config/) — a change that needs a server
restart.

## Commands

| Command | Does | Permission |
|---|---|---|
| `/ticket` (alias `t`) | the player's own hub — their open tickets | `dtickets.ticket.use` |
| `/ticket create` | the guided wizard | `dtickets.ticket.create` |
| `/ticket notifications` | per-staffer alert preferences | `dtickets.ticket.notify` |
| `/ticket stats` | the statistics screen | `dtickets.ticket.stats` |
| `/tickets` (alias `ta`) | the staff queue | `dtickets.ticket.staff` |
| `/report` | open a player report | `dtickets.report.use` |
| `/reports` | the report queue | `dtickets.report.admin` |
| `/dtickets reload` | reload the configuration | `dtickets.admin` |
| `/dtickets status` | the plugin's own health | `dtickets.admin` |

## Player permissions

Default `true` — every player has these unless you take them away.

| Node | Allows |
|---|---|
| `dtickets.ticket.use` | opening their own ticket hub |
| `dtickets.ticket.create` | creating a ticket |
| `dtickets.ticket.close.own` | closing a ticket they opened |
| `dtickets.ticket.follow` | following a ticket, if `Allow-Player-Follow` is on |
| `dtickets.report.use` | filing a report |

## Staff permissions

Default `op`.

| Node | Allows |
|---|---|
| `dtickets.ticket.staff` | the `/tickets` queue |
| `dtickets.report.admin` | the `/reports` queue |
| `dtickets.ticket.claim` | claiming a ticket |
| `dtickets.ticket.unclaim` | handing one back |
| `dtickets.ticket.assign` | assigning one to another staffer |
| `dtickets.ticket.reply` | replying in the thread |
| `dtickets.ticket.note` | staff-only notes |
| `dtickets.ticket.priority` | changing priority |
| `dtickets.ticket.category` | changing category |
| `dtickets.ticket.merge` | merging duplicates |
| `dtickets.ticket.close` | closing anyone's ticket |
| `dtickets.ticket.reopen` | reopening a closed one |
| `dtickets.ticket.teleport` | teleporting to where it was made |
| `dtickets.ticket.stats` | the statistics screen |
| `dtickets.ticket.notify` | the notification preferences screen |
| `dtickets.report.punish` | the punish menu |
| `dtickets.ticket.admin` | administrative ticket operations |
| `dtickets.admin` | `/dtickets`, reload and status |

## The wildcard

```
dtickets.*
```

Grants every node above. Convenient for owners; think twice before giving it to a moderator rank,
because it includes `dtickets.report.punish` and `dtickets.admin`.

## A sensible split

| Rank | Nodes |
|---|---|
| Helper | `dtickets.ticket.staff`, `.claim`, `.unclaim`, `.reply`, `.note`, `.close`, `.teleport`, `.notify` |
| Moderator | the above, plus `dtickets.report.admin`, `.priority`, `.category`, `.merge`, `.reopen`, `.assign` |
| Admin | the above, plus `dtickets.report.punish`, `dtickets.ticket.stats` |
| Owner | `dtickets.*` |

The point of splitting `dtickets.report.punish` out is that a helper can work the report queue —
read, claim, reply, close — without being able to ban anyone.
