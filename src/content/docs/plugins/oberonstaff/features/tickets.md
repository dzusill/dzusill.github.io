---
title: "Ticket Desk"
description: "Players open tickets through a guided wizard, staff work them from a paged queue, and both sides talk inside the ticket without leaving Minecraft."
---

The ticket desk is a support system inside OberonStaff. Players open tickets with `/ticket`, staff work them from `/tickets`, and everything lives in the plugin's own database — no website, no external service, nothing extra to install.

Turn it off with `Tickets.Enabled: false` and the rest of OberonStaff behaves exactly as before.

:::note[Version 1.6.0]
The desk is complete: categories and the wizard, both queues, ticket chat, [reports](/plugins/oberonstaff/features/reports/) with evidence capture, punishment buttons, [notifications](/plugins/oberonstaff/features/notifications/), [staff statistics](/plugins/oberonstaff/features/statistics/), auto-close and ban appeals.
:::

---

## What a player does

### Opening the hub

`/ticket` opens their own tickets — **the same menu staff get**, with the same status, category and sort filters, minus the staff-only controls. "Show me my closed bug reports" is a question a player asks too, and a player with eleven tickets needs the filters more than a staff member with a fresh queue does.

Two things differ from the staff queue:

- The scope is **pinned** to their own tickets, separately from every visible filter, so no amount of clicking can widen it to somebody else's.
- The **Owner** filter is gone — "unclaimed" and "mine" are questions about who is working a ticket, and every ticket in this list is already theirs. **New ticket** takes its slot.

Closed tickets stay listed. Somebody coming back to find out what happened to last week's report is looking for exactly that, which is why both queues open on **All** by default:

```yaml
Tickets:
  Admin-GUI:
    Default-Scope: ALL          # /tickets and /reports
    Player-Default-Scope: ALL   # /ticket
```

Two settings rather than one: staff opening a queue and a player opening their own history are different enough questions to deserve different answers.

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
A player without the staff permission who types `/tickets` is sent to **their own hub** rather than refused — the same hub `/ticket` opens, filters and all. "No permission" for guessing a command name teaches nobody anything, and two commands that both claim to open "your tickets" should not disagree about what that means.
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

The whole conversation can be read in chat, paged and clickable, with rank prefixes — see **[Conversation](/plugins/oberonstaff/features/conversation/)**:

```
/ticket thread 43
/tickets thread 43     staff — includes internal notes
```

---

## Response time, and why claiming is not answering

Each ticket records when a staff member **first replied**. Claiming a ticket does not set it, and that is on purpose: claiming a ticket and then ignoring it is not a response, and a measure that counts it would reward exactly the wrong behaviour.

The stamp is written in SQL with an `IS NULL` guard, so two staff replying in the same tick cannot both be recorded as first.

---

## Ratings

When a ticket closes, its owner is offered the chance to rate how it was handled:

```
How did we do? [Rate ticket #43] (1-5, reason optional)
```

The click **suggests** the command rather than sending it, so there is room to change the number or add a reason before pressing enter:

```
/ticket rate 43 5 fixed it fast, thanks!
```

Anything malformed — missing arguments, a rating that is not a number, or one outside 1–5 — gets the same explanation rather than three different ways of being unhelpful.

A rating does three things:

- writes a line into the ticket's thread, next to everything else that happened to it
- shows in both queues and in the ticket's detail view, as `★★★★☆` with the comment underneath
- **tells staff**, with the ticket number clickable straight to its detail view

```
Ticket #43 rated ★★★★☆ | by Steve [Open]
   "fixed it fast, thanks!"
```

That announcement is staff-wide rather than sent to the ticket's followers, and it has its own switch in `/ticket notifications` (**Ratings**) and its own sound (`Staff-Rated`). A rating is feedback on how the team is doing, worth telling every admin — not only whoever happened to touch that one ticket.

Rating is **once only**. A rating that could be changed is one player deciding a staff member's average.

---

## Anti-abuse

- **`Tickets.Max-Open-Per-Player`** — checked at the *write*, not before the wizard. A player can hold two windows open and finish both; only checking at the write cannot be raced.
- **Player text is escaped** before it reaches any staff-facing lore line or message. A ticket title is typed by a player and read by a moderator; unescaped, anyone could put markup — or a click-to-run command — under a moderator's mouse.
- **Ratings are once only.** A rating that could be changed is one player deciding a staff member's average.

---

## Lifecycle

A ticket nobody answers does not sit in the queue forever.

Every fifteen minutes the plugin sweeps:

| Step | When | What happens |
|---|---|---|
| **Warning** | One day before auto-close | A line is added to the thread and everybody following it is told |
| **Auto-close** | `Auto-Close-After-Days` of silence | Closed with a reason saying why |
| **Purge** | `Retention-Days` after closing | The ticket and everything attached to it is deleted |

Nothing is ever auto-closed without a warning first, even if it is old enough for both in the same sweep — it warns now and closes next time. **Replying clears the warning**, so answering on day 13 does not still close the ticket on day 14.

Set `Auto-Close-After-Days: 0` to never close anything, or `Retention-Days: 0` to keep closed tickets forever.

```yaml
Tickets:
  Auto-Close-After-Days: 14
  Retention-Days: 90
```

---

## Ban appeals

An appeal is the one category that usually cannot be filed where the ticket desk lives: the player is banned from that server. The shipped `appeal` category is off for that reason — on a single server it would only ever be opened by people who are not banned.

It becomes useful when a hub and a survival server **share one MySQL database**:

```yaml
# hub's config.yml
Tickets:
  Server-Name: "hub"
  Categories:
    appeal:
      Enabled: true
      Allow-From: ["hub"]      # filed here and nowhere else
  Admin-GUI:
    This-Server-Only: false    # hub staff see every server's tickets
```

```yaml
# survival's config.yml
Tickets:
  Server-Name: "survival"
  Admin-GUI:
    This-Server-Only: true     # no appeals in the survival queue
```

`Allow-From` decides where a category can be **opened**; `This-Server-Only` decides whose tickets a queue **shows**. Leave `This-Server-Only` off on the server that handles appeals.

Two safeguards come with it:

- **Teleporting** to a ticket opened on another server is refused with a message naming that server, rather than dropping you at the same coordinates in the wrong world.
- Tickets written before `Server-Name` meant anything have no server recorded and are shown everywhere, so turning `This-Server-Only` on never makes old tickets disappear.

---

## See also

- [Menus](/plugins/oberonstaff/configuration/menus/) — every size, slot and icon
- [Configuration](/plugins/oberonstaff/configuration/config/) — categories, priorities, timings
- [Commands & Permissions](/plugins/oberonstaff/commands-and-permissions/)
