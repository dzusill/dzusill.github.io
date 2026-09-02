---
title: "Restocks"
description: "A restock is one batch of listings dropped into the auction house. Everything about when it happens lives"
---

A **restock** is one batch of listings dropped into the auction house. Everything about when it happens lives
under `restock` in [config.yml](/plugins/dauctionfeed/configuration/config/).

## When

Two modes.

### `DAILY_AT` — once a day at a wall-clock time

```yaml
restock:
  mode: DAILY_AT
  hour: 4
  minute: 0
  timezone: ""      # blank = the machine's own zone
```

The time is resolved through a real calendar, not by adding 24 hours, so **the restock stays at 04:00 local
across a daylight-saving change** instead of drifting an hour twice a year. On the spring-forward day, when 04:00
may not exist at all, it moves forward past the gap.

`timezone` takes any IANA zone: `Europe/Bratislava`, `America/New_York`, `UTC`. A zone it does not recognise falls
back to the machine's own — an owner who typed a zone wrong wants their local time, not a silent shift of several
hours.

### `INTERVAL` — every N hours

```yaml
restock:
  mode: INTERVAL
  interval-hours: 8
```

Measured from the last restock, not from server start.

## How many

```yaml
restock:
  items:
    min: 8
    max: 14
```

Rolled fresh every restock. A varying count is what stops the feed reading as a machine. Set both to the same
number for a fixed size.

The actual size can come out lower when a [daily cap](#daily-caps) is close, or when the pool has run out of items
it has not already used — both are logged.

## What happens to the previous batch

```yaml
restock:
  clear-previous: true
```

**`true` (default)** — every unsold listing this plugin created is deleted first, so there is always exactly one
fresh batch in the auction house. Clearing happens before the new roll and happens even if that roll then produces
nothing: an owner who has emptied their pool still wants yesterday's stale listings gone.

**`false`** — they are left to expire on AxAuctions' own timer. With a 3-day expiry and a daily restock that means
30+ seeded listings at once. If you choose this, leave duplicate avoidance on:

```yaml
restock:
  avoid-duplicates-across-batches: true
```

## Missed restocks

If the server was down when a restock was due:

```yaml
restock:
  catch-up-on-startup: true    # run it as soon as the server is back
```

With `false` it is skipped and the next scheduled one is used.

A long outage never produces a burst — coming back after a week runs **one** restock, not seven.

## The first ever start

On a brand-new install the plugin restocks **immediately** rather than waiting for the configured hour. An owner
who has just installed this wants to open the auction house and see it working, not find it empty until 4am
tomorrow.

## Daily caps

Hard ceilings, so one unlucky roll cannot flood the server.

```yaml
daily:
  max-items: 50           # listings per calendar day; -1 = uncapped
  max-total-value: -1     # total listed value per calendar day; -1 = uncapped
```

Both are counted per calendar day in the restock timezone, and both are logged when they bite:

```
[dAuctionFeed] Daily item cap trimmed this restock from 12 to 4 listing(s).
[dAuctionFeed] Daily value cap reached — stopping this restock at 6 listing(s).
```

Today's usage is on `/auctionfeed status`.

## Duplicates

```yaml
restock:
  avoid-duplicates-within-batch: true      # never roll the same item twice in one restock
  avoid-duplicates-across-batches: true    # only applies when clear-previous is false
```

## Forcing one

```
/auctionfeed restock
```

Runs a restock now **and moves the schedule on**, exactly as the timer would. A forced restock that left the clock
alone would fire again minutes later, which is not what "restock now" means.

## Restart safety

The next restock time, the current batch's listing ids, and the per-player purchase counters all live in
[`data.yml`](/plugins/dauctionfeed/configuration/data/) and survive a restart.
