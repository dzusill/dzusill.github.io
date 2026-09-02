---
title: "How a Price Is Built"
description: "Every seeded listing goes through the same seven steps, in this order. The order is the design — see"
---

Every seeded listing goes through the same seven steps, in this order. The order is the design — see
[The Price Floor](/plugins/dauctionfeed/features/price-floor/) for why.

```
       pool unit price × amount          the honest base
     × tier price multiplier             random, per listing
     × enchantment bonus                 if the item was enchanted
     × sale modifier                     if a sale is running
     → market adjustment                 undercut the cheapest player listing, bounded
     → PRICE FLOOR                       never below sell value × multiplier
     → rounding                          upward whenever the floor was reached
```

**Every step that can lower a price runs before the floor, and the only step after it can only round up.**

## 1. The base

`price` from [items.yml](/plugins/dauctionfeed/configuration/items/) is the price of one item. Times the amount the tier rolled.

## 2. The tier multiplier

Rolled per listing inside the tier's `price-multiplier` band. See [Tiers](/plugins/dauctionfeed/features/tiers/).

## 3. The enchantment bonus

Only when the item actually rolled enchantments:

```
price × (1 + per-level-bonus × total enchantment levels)
```

```yaml
# tiers.yml
enchantments:
  per-level-bonus: 0.35
```

A Sharpness V / Unbreaking III sword is 8 total levels, so at the default that is `1 + 0.35 × 8` = **3.8×**.
Enchanted gear is expensive on purpose; it is also always listed singly.

## 4. Sales

A signed blanket adjustment to every seeded price:

```yaml
pricing:
  sale:
    enabled: true
    percent: -30        # 30% off.  +20 would be a 20% markup.
    tag: "<red><bold>SALE"
```

`tag` is appended to the restock broadcast while the sale is on, and is available as
`%dauctionfeed_sale%`.

Flip `enabled` back to `false` to end it. Existing listings keep the price they were created with — a sale changes
what the *next* restock produces, not what is already up.

## 5. Market adjustment

Prices the listing against what players are actually charging. Bounded in both directions. See
[Market Pricing](/plugins/dauctionfeed/features/market-pricing/).

## 6. The price floor

The hard minimum. See [The Price Floor](/plugins/dauctionfeed/features/price-floor/).

## 7. Rounding

```yaml
pricing:
  round-to: 10      # 0 disables rounding
```

Prices land on clean numbers rather than `1,847.3927`.

Rounding to the nearest multiple can move a price *down* by up to half a step. On a `round-to: 10` that is pocket
change; on an item floored at 120 with `round-to: 100` it is the difference between safe and exploitable. So a
rounded-down result that lands under the floor is pushed **up** to the next multiple instead.

## Rejected rolls

```yaml
pricing:
  minimum-price: 1.0
```

A roll that comes out under this is discarded and the slot rolls a different item, up to a dozen attempts. If the
whole batch cannot be filled that way, the restock lists what it managed and logs it.

## Watching it work

```
/auctionfeed preview 20
```

Each line is tagged when the floor or the market moved it:

```
 • 32x Redstone [Common] for 640 (raised by price floor)
 • 16x Diamond [Rare] for 4,300 (market-adjusted)
```
