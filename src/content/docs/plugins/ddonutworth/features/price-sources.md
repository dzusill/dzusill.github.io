---
title: "Price Sources"
description: "Where an item's base worth comes from. One setting picks the mode:"
---

Where an item's base worth comes from. One setting picks the mode:

```yaml
pricing:
  source: rotating-shop    # or: independent
```

## Mode 1 — derived from dRotatingShop (default)

```yaml
pricing:
  source: rotating-shop
  sell-ratio: 0.20
```

Worth is read live from the shop's item pool: **buy price × `sell-ratio`**. A potato that buys for 500 sells
for 100.

The reason to do it this way is that you keep **one** price list. Add an item to the shop and it becomes
sellable. Reprice it there and its sell price moves with it. There is no second file to keep in sync and no
way for the two to drift apart.

### It follows your events

The shop's blanket adjustment is included, and re-read on **every** lookup rather than cached:

```yaml
# dRotatingShop/config.yml
pricing:
  temporary-adjustment:
    enabled: true
    percent: 900
```

That potato now buys for 5000 and sells for 1000 — in the same tick, with nothing changed on this side and
no reload here.

### What is deliberately excluded

A buyer's **perk group** is not applied. A rank that buys at 20% off should not also sell for 20% less;
that would punish the rank it is meant to reward. Sell worth always derives from the shop's ungrouped price.

### Freshness

Base prices are cached for 30 seconds, because a lore pass over a double chest asks for dozens of prices at
once and the shop's pool holds well over a thousand items. The cache also drops when the pool's size
changes, and `/ddonutworth reload` clears it immediately. The *adjustment* is never cached.

## Mode 2 — independent

```yaml
pricing:
  source: independent
  temporary-adjustment:
    enabled: true
    percent: 20
```

[prices.yml](/plugins/ddonutworth/configuration/prices/) becomes the whole price list and the shop is ignored, even when it
is installed. The adjustment above is signed: `20` is a 20% markup, `-15` is 15% off.

Use this if you don't run dRotatingShop, or if you want sell prices that have nothing to do with buy prices.

## The resolution order

Whatever the mode, the first of these that produces a number wins:

1. A `prices.yml` entry under the item's **custom-item-plugin key** (`mmoitems:SWORD/CUTLASS`).
2. A `prices.yml` entry whose stored **item data** matches this one — how `/setworth` prices a one-off item.
3. A `prices.yml` entry under one of the item's **material keys**, most specific first.
4. The shop's **buy price × `sell-ratio`** (rotating-shop mode only).

Nothing matched means the item is unsellable, and says so.

An overriding entry always beats a derived price. A stored-item match outranks every material key — you
registered that exact item, whereas a material key is a generic fallback — but a plugin key still wins over
it, being the item's real identity rather than a snapshot of one copy.

Whichever rung answers, the item's **enchantments are added on top of it** — unless that price already
named them, in which case it stands as the whole price. See
[Enchantment Worth](/plugins/ddonutworth/features/enchantment-worth/).

## Adjusting hand-set prices

```yaml
pricing:
  adjust-overrides: false
```

Off by default: a price you typed is the price you get. Turn it on and `prices.yml` entries ride along with
the active adjustment too, so an event scales everything uniformly.

In independent mode the adjustment always applies, because there every price is a hand-set one.

## A global multiplier

```yaml
pricing:
  global-multiplier: 1.0
```

Applied to every payout on top of everything else — `2.0` for a double-sell weekend. Unlike the blanket
adjustment this scales what players are *paid*, not what items are *worth*, so the numbers shown in
`/worth hand` and the prices GUI stay honest.
