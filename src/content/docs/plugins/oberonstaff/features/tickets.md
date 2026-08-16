---
title: "Ticket Desk"
description: "Players open tickets through a guided wizard, staff work them from a paged queue, and both sides talk inside the ticket without leaving Minecraft."
---

The ticket desk is a support system inside OberonStaff. Players open tickets with `/ticket`, staff work them from `/tickets`, and everything lives in the plugin's own database — no website, no external service, nothing extra to install.

Turn it off with `Tickets.Enabled: false` and the rest of OberonStaff behaves exactly as before.

:::caution[Version 1.6.0]
This release ships the ticket half of the desk: categories, the wizard, both queues, ticket chat and the menus. Player **reports** (`/report`), punishment buttons, notifications, staff statistics and auto-close are specified but **not implemented yet** — see [What is not here yet](#what-is-not-here-yet).
:::

---

## What a player does

### Opening the hub

`/ticket` opens their own tickets, newest first, colour-coded by status. Closed ones stay listed — somebody coming back to find out what happened to last week's report is looking for exactly that.

### Opening a ticket

The **New ticket** button opens the category picker. Each category is its own icon, colour and set of questions, all from `config.yml`.

Picking one starts a short **guided wizard**. Questions are answered in chat, one at a time — no commands, no syntax:

```
[Tickets] Player report — question 1 of 4
          Which player are you reporting?
> xX_Griefer_Xx
[Tickets] Question 2 of 4 — What did they do?
> broke into my base
[Tickets] ✔ Ticket #43 created. Staff have been notified.
```

Three things about the wizard are worth knowing:

- **Nothing is written until the last answer.** Walk away, log off, or type `cancel` and no row is created — there is no half-ticket for staff to find.
- **The player is never asked their own name.** We know who they are. A `PLAYER` question means somebody *else* — the player being reported.
- **It times out.** `Tickets.Wizard-Timeout` seconds per question, then the draft is dropped.

`/ticket create <category>` skips the picker.

### Ticket chat

`/ticket chat 43` puts a player into **ticket chat mode**: everything typed goes into that ticket instead of public chat. `/ticket leave` — or just typing `leave` — returns to normal.

The mode is deliberately not persistent. It is dropped when the player disconnects, because a chat mode that survived a relog would be somebody saying "hi" into a week-old ticket believing they were in public chat.

---

## What staff do

`/tickets` opens the queue. Every ticket is one item: the category's icon, stacked by priority, glowing while unclaimed, named in its priority colour.

### One click, one thing

| Click | Action | Permission |
|---|---|---|
| **Left** | Open the ticket | `oberonstaff.ticket.admin` |
| **Shift-left** | Claim / unclaim | `oberonstaff.ticket.claim` |
| **Right** | Cycle priority | `oberonstaff.ticket.priority` |
| **Shift-right** | Close (asks first) | `oberonstaff.ticket.close` |
| **Drop (Q)** | Teleport to where it was opened | `oberonstaff.ticket.teleport` |

:::note[Why drop and not middle-click]
`ClickType.MIDDLE` only fires in creative mode. On a survival server a middle-click button is a button that does nothing, with no way for the player to tell why. Teleport is on **Q** for that reason.
:::

The click hints in each item's lore are filtered to what *you* can actually do. A rank without close never reads a "close" hint.

### Filters

The bottom row cycles four filters, and the title shows where you are:

| Filter | Cycles through |
|---|---|
| Scope | open → claimed → closed → all |
| Owner | all → unclaimed → mine |
| Category | all → each category in this queue → all |
| Sort | priority → newest → oldest → waiting |

All of it is filtered and sorted **in SQL**, not in memory. The queue is the screen that gets opened constantly on a busy server, and the table behind it is the one that grows without bound.

### Two queues

`/tickets` shows General Support and Bug Report. `/reports` shows Player Report. Which categories count as reports is `Tickets.Admin-GUI.Report-Categories`.

They are the same queue with a different filter — same claim machinery, same clicks, same everything. Moving a ticket into a report category (`/tickets category 43 player_report`) simply makes it appear in the other one.

:::tip
A player without the staff permission who types `/tickets` is sent to **their own hub** rather than refused. "No permission" for guessing a command name teaches nobody anything.
:::

---

## Statuses and priorities

Three statuses — `OPEN`, `CLAIMED`, `CLOSED` — and deliberately no more. Every extra state is another thing staff have to set by hand and another thing they forget to set; the filters already answer those questions from data that maintains itself.

Four priorities: `LOW`, `NORMAL`, `HIGH`, `URGENT`. Renameable and recolourable in `config.yml`, but the ladder itself is fixed so "urgent" keeps meaning something.

Two flags are computed rather than stored, so they cost nothing and can never go stale:

- **STALE** — no activity for `Admin-GUI.Stale-Hours`.
- **LATE** — still no staff reply after `Admin-GUI.Response-Target-Minutes`.

---

## The thread

Every ticket has a conversation, and every line has a kind:

| Kind | Who sees it |
|---|---|
| `PLAYER` | Everybody on the ticket |
| `STAFF` | Everybody on the ticket |
| `NOTE` | **Staff only** — the player never sees it |
| `SYSTEM` | Everybody. What the plugin did: claimed, closed, priority changed |

Internal notes are excluded **in SQL** when the thread is read for a player, not filtered afterwards in the menu. One place to get right instead of one per screen — and a note reaching the person it is about is the one failure here that cannot be walked back.

```
/tickets note 43 checked the logs, their story does not hold up
```

The `SYSTEM` lines are the audit trail. They live in the thread rather than in `/oberonstaff log` because that log is teleport-shaped — actor, target player, coordinates — and half of what happens to a ticket has no target player at all. Keeping it in the thread also means staff can read it, and that retention purges it along with everything else about that ticket.

---

## Response time, and why claiming is not answering

Each ticket records when a staff member **first replied**. Claiming a ticket does not set it, and that is on purpose: claiming a ticket and then ignoring it is not a response, and a measure that counts it would reward exactly the wrong behaviour.

The stamp is written in SQL with an `IS NULL` guard, so two staff replying in the same tick cannot both be recorded as first.

---

## Anti-abuse

- **`Tickets.Max-Open-Per-Player`** — checked at the *write*, not before the wizard. A player can hold two windows open and finish both; only checking at the write cannot be raced.
- **Player text is escaped** before it reaches any staff-facing lore line or message. A ticket title is typed by a player and read by a moderator; unescaped, anyone could put markup — or a click-to-run command — under a moderator's mouse.
- **Ratings are once only.** A rating that could be changed is one player deciding a staff member's average.

---

## What is not here yet

Specified, designed, and not in 1.6.0:

| Feature | Status |
|---|---|
| `/report` with evidence capture | Not implemented |
| Punish button (LiteBans) | Not implemented |
| Anticheat flags on reports (Vulcan) | Not implemented |
| Notifications and offline delivery | Not implemented |
| Staff statistics leaderboard | Not implemented |
| Auto-close, stale warnings, retention purge | Not implemented |
| Ban appeals from a hub server | Not implemented |

The database tables, the config blocks and the message keys for all of these are already shipped, so turning them on later is a plugin update rather than a migration. `/reports` works today — it is just a queue with nothing filing into it yet except tickets moved there by hand.

---

## See also

- [Menus](/plugins/oberonstaff/configuration/menus/) — every size, slot and icon
- [Configuration](/plugins/oberonstaff/configuration/config/) — categories, priorities, timings
- [Commands & Permissions](/plugins/oberonstaff/commands-and-permissions/)
