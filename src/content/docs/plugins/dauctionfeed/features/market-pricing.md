---
title: "Market Pricing"
description: "Before listing, the feed reads the live auction house and prices just under what players are already asking"
---

Before listing, the feed reads the **live auction house** and prices just under what players are already asking
for the same item.

This is the part that makes the auction house feel contested rather than static. A server listing that sits above
every player price is decoration; one that undercuts by a few percent puts real pressure on players to price
competitively.

```yaml
pricing:
  market:
    enabled: true
    undercut-percent: 5.0
    sane-range:
      min-ratio: 0.25
      max-ratio: 4.0
    max-adjust-percent: 40.0
    ignore-own-listings: true
```

## How it works

1. Find every live listing of the **same item**, and take the cheapest **per-item** price.
2. Target that price minus `undercut-percent`.
3. Clamp the move to `max-adjust-percent` of what the tier roll produced.
4. Hand the result to the [price floor](/plugins/dauctionfeed/features/price-floor/), which can still raise it.

Per-item, not per-stack: a listing of 64 diamonds for $6,400 and one of 1 diamond for $90 are compared as $100 and
$90. The cheaper is $90.

## What counts as "the same item"

Strict equality of type **and** item meta. A plain diamond sword is never priced against a Sharpness V one — they
are different goods and comparing them would drag one wildly off. Enchanted gear therefore rarely finds
competition, and simply falls back to its tier roll.

## The sane range

```yaml
sane-range:
  min-ratio: 0.25
  max-ratio: 4.0
```

A player listing only counts as competition when its per-item price is between 0.25× and 4× the item's own pool
price.

This is the whole defence against a **price spiral**. Without it, one troll listing at $1 drags the next seeded
price down, which becomes the new market reference, which drags the one after it down further — restock after
restock, until the floor is the only thing left holding the market up. The same guard ignores an absurdly
overpriced listing at the other end.

## The adjustment cap

```yaml
max-adjust-percent: 40.0
```

The most the market step may move a price in either direction, as a percentage of the tier roll. Keeps market
awareness a nudge rather than a takeover: even a market full of cheap listings can only pull a seeded price 40%
below what its tier decided.

## Never undercutting itself

```yaml
ignore-own-listings: true
```

Listings created by this plugin are never treated as competition. Without it, a batch left in the auction house
would become the reference for the next batch, and the feed would undercut itself into the floor over a few days.

Recognition is by seller UUID, so it holds even if you rename a seller.

## Turning it off

```yaml
pricing:
  market:
    enabled: false
```

Prices then come purely from the tier roll and the floor. Nothing else changes, and the feed is slightly cheaper
to run (it skips reading the auction house once per restock).

## Seeing it

`/auctionfeed preview` tags adjusted lines:

```
 • 16x Diamond [Rare] for 4,300 (market-adjusted)
```

A preview with no `(market-adjusted)` tags at all usually means the auction house holds nothing that matches the
rolled items — normal on a quiet server, and nothing to fix.
