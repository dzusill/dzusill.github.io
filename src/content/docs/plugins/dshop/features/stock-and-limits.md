---
title: "Stock & Limits"
description: "Two different things: stock is how much the shop has, shared by everyone. A limit is how much one"
---

Two different things: **stock** is how much the shop has, shared by everyone. A **limit** is how much one
player may buy.

Both are off by default, so a shop behaves as an unlimited one until you say otherwise.

## Stock

```yaml
# config.yml — the global default
stock:
  enabled: true
  broadcast: false
  restock:
    mode: full
    interval-minutes: 1440
```

```yaml
# a category file — for everything in it, or on one item
stock:
  enabled: true
  max: 512
  restock:
    mode: fixed
    amount: 64
    interval-minutes: 360
```

**Switching `enabled` on globally changes nothing on its own.** An item with no `max` is unlimited even
while tracking is on — otherwise turning the feature on would close every item you had not yet given a
number to. `/adminshop doctor` says so if that is your situation.

A tracked item with no stored row starts **full**, not empty, for the same reason.

### Restock modes

| `mode` | What a restock does |
|---|---|
| `full` | Straight back to `max` |
| `fixed` | Adds `amount`, never past `max` |
| `capped` | Adds `amount`, never past `cap` |

Restocking is checked once a minute against each item's own interval, measured from when it was last
refilled — so a server that was offline across a restock window performs it on the next tick rather than
silently skipping it.

`/adminshop restock [shop] [item]` refills now. It reports how many entries actually **moved**, so
"Restocked 0 items" on a full shop is the honest answer rather than a claim about 200 items that did not
change.

## Purchase limits

```yaml
# config.yml
limits:
  enabled: true
  default-reset: daily
  reset-hour: 0
  timezone: ""
  prune-after-days: 90
  modifiers:
    vip:
      permission: dshop.limit.vip
      multiplier: 2.0
```

```yaml
# on a category or an item
limit:
  enabled: true
  amount: 64
  reset: daily      # daily | weekly | monthly | lifetime
```

Permission modifiers multiply the allowance and **the highest wins** — a player with both `vip` (2×) and
`mvp` (3×) gets 3×, not 6×.

### How a window rolls over

It does not reset. The stored row is keyed by the window it belongs to — `2026-08-24`, `2026-W34`,
`2026-08`, or `lifetime` — and at midnight the key simply becomes tomorrow's. Yesterday's row stops being
consulted.

There is no reset job that can fail to run, and a server that was offline across the boundary needs no
catch-up. Old rows are pruned at startup once they are `prune-after-days` old, and nothing depends on
that happening.

`reset-hour: 5` **moves** the boundary rather than adding one: the "day" runs 05:00 to 05:00, which is
what a server whose players are online past midnight actually wants.

`timezone` takes a zone name such as `Europe/Prague`. An unreadable one falls back to the server's rather
than failing.

## Both counted per variant

`max: 512` on a firework with three flight levels means 512 of each, not 512 shared. The choices are
different products to a buyer, and one running out should not empty the others.

## Bypasses

| Permission | Effect |
|---|---|
| `dshop.bypass.stock` | Buy regardless of stock |
| `dshop.bypass.limit` | Ignore purchase limits |

## Lore lines

```yaml
# config.yml
stock-lore: "&7Stock: &#00FC00%stock%&7/&f%max-stock%"
limit-lore: "&7Limit: &#00FC00%limit-remaining%&7/&f%limit-max% &8(%limit-reset%)"
```

Each is only drawn on items that actually use the feature. Leave one blank to hide it.

## If storage is down

Both features switch off and the shop keeps selling — unlimited stock, no limits enforced — with the
reason in the log and in `/adminshop doctor`.
