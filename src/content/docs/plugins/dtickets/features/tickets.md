---
title: "Tickets"
description: "A ticket is never an empty text box. The player picks a category, and the wizard asks that category's"
---

## The wizard

A ticket is never an empty text box. The player picks a category, and the wizard asks that category's
questions one at a time. Only when they are all answered does the ticket exist — so a ticket in your
queue is always complete.

Four categories ship configured:

| Id | Display | Icon | Default priority |
|---|---|---|---|
| `general_support` | General Support | `PAPER` | `NORMAL` |
| `player_report` | Player Report | `NETHERITE_SWORD` | `HIGH` |
| `bug_report` | Bug Report | — | — |
| `appeal` | Appeal | — | — |

Each question has an `Id`, a `Prompt`, and a `Type`:

- `TEXT` — free text
- `PLAYER` — a username, which links the ticket to that player

`Require-Link: true` on a `PLAYER` question refuses the answer unless the name resolves to a real
account, which stops a report naming a player who does not exist.

The wizard abandons itself after `Wizard-Timeout` seconds (60 by default) so a player who walks away
mid-question does not leave a half-built ticket behind.

## Priority

Four levels ship, each with a display string and a weight that decides queue order:

| Level | Weight |
|---|---|
| `LOW` | 1 |
| `NORMAL` | 2 |
| `HIGH` | 3 |
| `URGENT` | 4 |

A category's `Default-Priority` sets where its tickets start. Staff holding
`dtickets.ticket.priority` can change it afterwards.

## Status and flags

Status is one of `OPEN`, `CLAIMED` or `CLOSED`. On top of that, a row can carry flags:

| Flag | Means |
|---|---|
| `Unclaimed` | nobody has taken it yet |
| `Stale` | it has gone quiet — shown as *Inactive* |
| `Late` | it has been waiting past your threshold |
| `Merged` | duplicates were folded into it, with the count |

Flags are display strings in `config.yml`, so rename or recolour them freely.

## Claiming

Claiming is how a queue of five staff avoids three people answering the same ticket. A claimed ticket
shows its owner, and `dtickets.ticket.unclaim` lets it be handed back. Staff who claim a ticket start
following it automatically, so they get its notifications.

## Limits and lifecycle

| Setting | Default | What it does |
|---|---|---|
| `Max-Open-Per-Player` | `3` | refuses a new ticket while the player already has this many open |
| `Auto-Close-After-Days` | `14` | closes a ticket nobody has touched in this long |
| `Retention-Days` | `90` | deletes closed tickets after this long |

Retention is a real delete, not an archive. Turn on `Tickets.Transcripts` if you want a file copy
kept before a ticket disappears.

## Merging

Two tickets about the same thing can be merged with `dtickets.ticket.merge`. The surviving ticket
carries a `Merged` flag with the count, and everyone who reported it stays subscribed to the
outcome.

## Rating

When a ticket closes, the player can rate how it was handled. The stars, the empty star and the
"not rated" text are all display strings under `Tickets.Rating`, and the ratings feed the per-staffer
[statistics](/plugins/dtickets/features/statistics/).

## Canned replies

Three short replies ship for the things staff type twenty times a day — `rules`, `wait` and `proof`.
Add your own under `Tickets.Canned-Replies`; each is an id and the text it inserts.
