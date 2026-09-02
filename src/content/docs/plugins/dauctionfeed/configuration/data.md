---
title: "data.yml"
description: "Runtime state. Not a config file — the plugin writes it, and hand edits are overwritten."
---

Runtime state. **Not a config file** — the plugin writes it, and hand edits are overwritten.

```yaml
last-restock: 1756800000000
next-restock: 1756886400000
batch-id: 42
batch:
  listings: [ 1183, 1184, 1185 ]
  entries: [ diamond, iron_ingot, redstone ]
purchases:
  069a79f4-44e9-4726-a5be-fca90e38aaf5: 2
daily:
  2026-09-01:
    items: 11
    value: 84320.0
```

## What it holds

| Key | What it is |
|---|---|
| `last-restock` | Epoch millis of the last completed restock |
| `next-restock` | Epoch millis the next one is due |
| `batch-id` | Increments every restock; purchase limits are counted per batch |
| `batch.listings` | AxAuctions listing ids created by the current batch |
| `batch.entries` | Pool item ids used by the current batch, for duplicate avoidance |
| `purchases` | Seeded listings bought per player in the current batch |
| `daily` | Listings and value created per calendar day, against the daily caps |

## Why the listing ids matter

They are how the plugin recognises **its own** listings. Without them a restart between two restocks would leave
yesterday's listings in the auction house forever — there would be no way to tell a seeded listing from a
player's.

Clearing also scans the live auction house for this plugin's seller UUIDs, so a `/auctionfeed clear` still catches
listings created before this file was last deleted. Between the two, "remove everything of ours" genuinely means
that.

## Deleting it

Safe **while the server is stopped**. The plugin rebuilds it.

The cost: the current batch stops being recognised as this plugin's by id. Those listings sit in the auction house
until they expire on AxAuctions' own timer — unless the seller names are unchanged, in which case the UUID scan
still finds them.

## Day counters

Only the current day is ever read. A week is kept so an owner investigating "why did nothing get listed
yesterday" can see the answer; older entries are pruned automatically.

## Sections are protected from config merging

`batch`, `purchases` and `daily` are registered as ignored sections. A merge that re-added defaults would
silently reset a batch mid-day.
