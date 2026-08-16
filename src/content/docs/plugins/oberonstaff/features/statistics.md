---
title: "Staff Statistics"
description: "Who handled what, how fast they answered, how players rated it, and how often the ticket came back."
---

`/tickets stats` opens a leaderboard of everybody who has closed a ticket: one head per staff member, sorted however you like.

Needs `oberonstaff.ticket.stats`, which is part of `oberonstaff.ticket.staff`.

---

## The numbers

| Column | What it is |
|---|---|
| **Handled** | Tickets they claimed and closed |
| **First reply** | Average time from opening to their first staff reply |
| **Time to close** | Average time from opening to closing |
| **Rating** | Average of the stars players left |
| **Reopened** | How many came back, as a count and a rate |

### Why the reopen rate is on every row

Handled and time-to-close both improve by closing tickets quickly, whether or not anything was actually solved. A ticket the player reopens says it was not.

A high handled count next to a high reopen rate is the pattern worth looking at, which is exactly what a promotion conversation should be looking at — so the two sit next to each other rather than on separate screens.

It is shown as a **rate**, not a count. Three reopens out of two hundred tickets and three out of five are not the same record, and only the rate tells you which is which.

### Missing averages

Somebody whose tickets never got a first reply has no average, and nobody rating somebody means no rating. Those show as `—` and **sort last** on their column — an absent average must never read as the best score on the board.

---

## Windows and sorting

Two buttons on the bottom row cycle through them.

**Windows:** Today · This week · This month · All time

**Sorts:** Handled · Response time · Rating · Reopen rate

Both work from chat too:

```
/tickets stats                  # the board, this week
/tickets stats month            # the board, last 30 days
/tickets stats Notch            # one staff member, this week
/tickets stats Notch all        # one staff member, all time
```

A name that happens to look like a window still resolves as a name in the first position, so a staff member called `Today` is not a problem.

---

## Where the numbers come from

Computed by the database from the ticket rows themselves — a `GROUP BY` over what is already there — rather than accumulated in counters.

Counters would have to survive restarts, agree with the tickets table after a retention purge, and be rebuilt whenever either drifted. An aggregate over the rows cannot drift, because it *is* the rows.

The consequence worth knowing: **purged tickets stop counting.** With `Retention-Days: 90`, an all-time board shows the last 90 days. Set `Retention-Days: 0` to keep everything forever if the history matters more than the table size.

:::note[Cached for a minute]
A board is held for 60 seconds per window, because flipping between "this week" and "all time" would otherwise be a full aggregate per click.

Nothing acts on these numbers automatically — a human reads them — so a minute of staleness costs nothing. `/oberonstaff reload` clears the cache, since that is the one moment somebody is watching for the display to change.
:::

---

## Placeholders

For a scoreboard or tab list, without opening anything:

| Placeholder | Shows |
|---|---|
| `%oberonstaff_tickets_open%` | Open tickets |
| `%oberonstaff_tickets_unclaimed%` | Open and unclaimed |
| `%oberonstaff_reports_open%` | Open reports |
| `%oberonstaff_tickets_mine%` | Tickets this staff member has claimed |

These come from a background snapshot refreshed every half minute, not a query — PlaceholderAPI resolves on the main thread and is asked again on every scoreboard tick, so a `COUNT(*)` there would be one database round trip per player per tick.

With the ticket desk switched off they resolve to nothing, so you see the raw placeholder text and know why, rather than a confident zero.

---

## See also

- [Ticket Desk](/plugins/oberonstaff/features/tickets/) — where the tickets come from
- [Placeholders](/plugins/oberonstaff/placeholders/) — the full list
- [Commands & Permissions](/plugins/oberonstaff/commands-and-permissions/)
