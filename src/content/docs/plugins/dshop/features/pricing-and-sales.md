---
title: "Pricing & Sales"
description: "Rounding happens once, on the total. Rounding each unit and multiplying is how a three-decimal price ends"
---

## How a price is worked out

```
base       the number in the shop file
× dynamic  demand multiplier      (only when pricing.mode: dynamic)
× discount sale, rank, first purchase
= total    unit × amount, rounded ONCE at the end
```

Rounding happens once, on the total. Rounding each unit and multiplying is how a three-decimal price ends
up showing one number in the lore and charging another — on exactly the figure a player checks.

Money is held as an exact decimal throughout, not a floating-point number. A 5,000,000 crate key times a
stack quantity times a discount is squarely in the range where a `double` starts losing cents.

## Sales

```yaml
  diamond:
    material: DIAMOND
    price: 5000
    slot: 8
    sale:
      percent: 25
      label: WEEKEND
      from: '2026-12-24'
      to: '2026-12-31T23:59'
```

Both bounds are optional: only `to` means "running now, stops then"; neither means "running until I
change it". A sale can also sit at the top of a category file and apply to everything in it.

> **Quote your dates.** Unquoted, YAML turns `2026-12-24` into a timestamp rather than text. The plugin
> handles both, but quoting makes what you wrote unambiguous.
>
> A date that cannot be read **switches the sale off** and says so at load. Both outcomes are wrong, but
> only one of them gives your shop away until somebody notices.

The lore line comes from `sale-lore` in `config.yml` and can show `%old-price%`, `%discount%`,
`%sale-label%` and `%sale-ends%`.

## Rank discounts

```yaml
discounts:
  ranks:
    vip:
      permission: dshop.discount.vip
      percent: 5
      priority: 10
    mvp:
      permission: dshop.discount.mvp
      percent: 10
      priority: 20
```

## First purchase

```yaml
discounts:
  first-purchase:
    enabled: false
    percent: 25
```

Applies to a product this player has never bought. It reads the recently-bought table, so it is only
meaningful once that has been recording — and on a fresh install after an import, everything in the
imported history already counts as bought.

## Stacking

```yaml
discounts:
  stacking: highest-only
  max-percent: 75
```

| Mode | 40% and 40% together |
|---|---|
| `highest-only` *(default)* | 40% — one winner |
| `additive` | 80%, then capped |
| `multiplicative` | 64% — each applies to what is left |

Every mode is clamped to `max-percent` and then to 0–100. That cap is not paranoia: additive stacking of
three 40% discounts is 120%, which without it is a shop paying players to take its items.

## Dynamic pricing

Off by default, and the default is the right choice for most servers.

```yaml
pricing:
  mode: dynamic
  dynamic:
    baseline: 64
    sensitivity: 0.35
    min-multiplier: 0.5
    max-multiplier: 2.0
    stock-weight: 0.0
    decay:
      interval-minutes: 60
      factor: 0.15
    reset-on-restock: true
```

Then per item:

```yaml
    dynamic:
      enabled: true
```

The model is one line:

```
multiplier = clamp(1 + sensitivity × (demand − baseline) / baseline
                     + stock-weight × (1 − stock / maxStock),
                   min, max)
```

A player has to be able to look at a price, remember buying a lot of that item, and connect the two.
Anything with more terms stops being a shop and becomes a market nobody can reason about.

**Demand decays toward the baseline, not toward zero.** Decaying to zero would drift every price to the
minimum overnight, so the shop would reopen each morning at a discount nobody asked for.

A restock resets demand, since that is the point in the cycle where "this was scarce" stops being true.
