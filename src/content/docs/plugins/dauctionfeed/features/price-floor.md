---
title: "The Price Floor"
description: "The one rule that makes this plugin safe to leave running unattended. Read this before changing any price setting."
---

The one rule that makes this plugin safe to leave running unattended. Read this before changing any price setting.

## The problem it solves

Your server buys items from players. `/sell`, a sell shop, a sell wand — whatever the mechanism, there is a price
at which the server pays out.

Now suppose a seeded listing is **cheaper than that**. A player buys 64 diamonds from the auction house for $6,000
and sells them straight back to the server for $6,400. Then does it again. And again.

That is an unlimited money printer, it runs as fast as they can click, and it will wreck an economy in an evening.

It is not a hypothetical corner: three separate steps in the [pricing formula](/plugins/dauctionfeed/features/pricing/) move prices *down*
independently — the tier's random multiplier, a running sale, and the market adjustment. Any of them, or a
combination, can land a price under the sell value without a single misconfigured value.

## How it is solved

The floor is applied **last**, over the top of everything else:

```
base × tier × enchant × sale → market adjustment → PRICE FLOOR → rounding
```

No seeded price can land below:

```
sell value of one item  ×  multiplier  ×  amount
```

Every step that can lower a price runs before it. The only step after it — rounding — is forced upward whenever
the floor was reached, so even rounding to the nearest 100 cannot dip back under.

The result is a property of the code, not of a careful config. A misconfigured tier cannot break it. A 90%-off
sale cannot break it. Every correction is written to the console and tagged in `/auctionfeed preview`.

## Configuration

```yaml
pricing:
  floor:
    enabled: true
    multiplier: 1.5
    source: DDONUTWORTH
    assumed-sell-ratio: 0.35
```

### `multiplier`

How far above the sell value a listing must sit.

`1.0` merely breaks even, and breaking even is **already exploitable** on most servers: sell multipliers, rank
perks, bulk-sell bonuses and double-money events all push the real payout above the base sell value. **Do not go
below 1.2.** The default of 1.5 leaves room for all of it.

Values under 1.0 are clamped up to 1.0 — below that the floor would be sanctioning the very exploit it exists to
prevent.

### `source`

Where the sell value comes from.

| Value | Behaviour |
|---|---|
| `DDONUTWORTH` | Read live from dDonutWorth, so retuning `/sell` prices retunes the floor automatically. Falls back to `POOL` per-item when dDonutWorth cannot price something. |
| `POOL` | Derived from the item's own unit price in `items.yml`, via `assumed-sell-ratio`. |

`/auctionfeed status` reports which one it actually attached to:

```
 • Price floor: on at 1.5x, source dDonutWorth
```

If dDonutWorth is missing or changed shape, it degrades to the pool estimate and says so. **It never degrades to
no floor** — losing the floor silently is the one outcome that would let the exploit back in.

### `assumed-sell-ratio`

The fraction of the pool's price you assume `/sell` pays. Used with `source: POOL`, and as the per-item fallback
under `DDONUTWORTH`.

At the default `0.35`, an item priced 1,000 in the pool is assumed to sell back for 350, giving a floor of
`350 × 1.5` = **525**.

Set this to roughly match your actual sell ratio. Too low and the floor is too weak; too high and cheap items get
priced above what anyone will pay.

## Items with no sell value

If nothing pays out for an item, there is nothing to arbitrage, so it gets no floor and is priced purely by its
tier. That is correct — it is also why an item with no `/sell` price can legitimately list very cheaply.

## Turning it off

```yaml
pricing:
  floor:
    enabled: false
```

You will get this on every startup, and a red line on `/auctionfeed status`:

```
[dAuctionFeed] The price floor is DISABLED. Seeded listings can be bought and sold straight back
               to the server for profit if any price lands below its sell value.
```

The only defensible reason is a server with **no** sell mechanism at all. If players can sell anything to the
server for money, leave it on.

## Checking it

```
/auctionfeed preview 30
```

Listings the floor had to raise are tagged `(raised by price floor)`. A batch where most lines carry that tag
means your tier multipliers are pitched below your sell prices — the floor is holding the economy up single
handed, and the tiers are worth revisiting.
