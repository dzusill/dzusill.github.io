---
title: "Statistics"
description: "Needs dtickets.ticket.stats. The screen is Stats in menus.yml."
---

```
/ticket stats
```

Needs `dtickets.ticket.stats`. The screen is `Stats` in [menus.yml](/plugins/dtickets/configuration/menus/).

## What it measures

- **Volume** — how many tickets and reports came in over the period, and by category
- **Response time** — how long a ticket waits before a staffer first replies
- **Resolution time** — how long from creation to close
- **Per-staffer counts** — claimed, replied to, closed
- **Ratings** — the average a staffer's closed tickets were rated

## Why it is worth having

Promotions usually get argued from impressions: who *seems* active, who is loud in the staff channel.
The queue knows better. A staffer who quietly closes twenty tickets a week with a four-star average is
doing the job; one who claims tickets and never replies shows up here too.

The same numbers tell you whether the desk itself is working. A response time creeping upward means
you need more staff or fewer categories, and it says so before your players start complaining that
nobody answers.

## Ratings

Ratings only exist if you leave the close-time rating prompt enabled — see
[Tickets](/plugins/dtickets/features/tickets/#rating). Without it the rating column stays empty and the rest still works.

Treat them as a signal, not a score. Players rate the outcome as much as the service, so a staffer
who mostly handles appeals will always rate lower than one who handles cosmetic questions.

## Retention

Statistics are computed from the tickets that still exist. `Tickets.Retention-Days` deletes closed
tickets after 90 days by default, so the window is bounded by that — raise retention if you want
longer-term trends, and remember it is a real delete, not an archive.

## Placeholders

Live counts are also available through PlaceholderAPI for scoreboards and staff tab lists:

```
%dtickets_tickets_open%
%dtickets_tickets_unclaimed%
%dtickets_tickets_mine%
%dtickets_reports_open%
```

The full list is in [Placeholders](/plugins/dtickets/reference/placeholders/).
