---
title: "Pricing"
description: "prices.yml is the only source of worth. There is no external price feed, no shop bridge and nothing"
---

`prices.yml` is the **only** source of worth. There is no external price feed, no shop bridge and nothing
that can move a price underneath you — a price is whatever the file says.

The file ships with the client's migrated table already in it, so most of an economy is priced before you
touch anything:

| Section | Entries | What it holds |
|---|---|---|
| `items` | starts empty | your own overrides, and anything `/setworth` writes |
| `prices.by-serialized` | **136** | potion variants — `POTION[healing]`, `SPLASH_POTION[strength]`, one tipped arrow |
| `prices.by-material` | **1,480** | one price per material — `DIAMOND`, `POTATO`, `ACACIA_LOG` |
| `enchant-worth.enchants` | **40** | a `base` + `per_level` value per enchantment, migrated alongside the table |

See [prices.yml](/plugins/oberonsell/configuration/prices/) for the file itself, and
[Readable Item Keys](/plugins/oberonsell/features/item-keys/) for the key grammar.

> The `enchant-worth` block at the bottom of `prices.yml` came across with the migration and is **not read
> by the plugin**. Enchantment values live in [enchantments.yml](/plugins/oberonsell/configuration/enchantments/) and are
> the ones that actually apply. The migrated block is kept as a record of the source table.

## The resolution order

An item's keys are built from **most to least specific**, and the first section that answers wins:

1. A `prices.yml` **`items`** entry under the item's custom-item-plugin key (`mmoitems:SWORD/CUTLASS`).
2. An `items` entry whose stored **item data** matches this one — how `/setworth` prices a one-off item.
3. An `items` entry under one of the item's **material keys**, most specific first.
4. A **`prices.by-serialized`** entry under one of those keys.
5. A **`prices.by-material`** entry under one of those keys.

Then, whichever rung answered, the item's **enchantments are added on top of it** — unless the key that won
already named them, in which case it stands as the whole price. See
[Enchantment Worth](/plugins/oberonsell/features/enchantment-worth/).

Nothing matched means the item is unsellable, and `/worth hand` says so.

An `items` override always beats both migrated tables. A stored-item match outranks every material key —
you registered that exact item, whereas a material key is a generic fallback — but a plugin key still wins
over it, being the item's real identity rather than a snapshot of one copy.

## Zero is a price, not an absence

```yaml
prices:
  by-material:
    GOLD_NUGGET: 0
```

A price of `0` means **explicitly unsellable**. It is a different answer from an item having no entry at
all, and the plugin keeps the two apart everywhere: an explicit zero resolves and reports as a price of
nothing, while a missing key resolves to nothing at all.

That distinction is what makes `0` the supported way to retire a migrated price — see
[making a migrated entry unsellable](/plugins/oberonsell/configuration/prices/#making-a-migrated-price-unsellable).

Three materials ship at `0`: `GOLD_NUGGET`, `IRON_NUGGET` and `MOSSY_COBBLESTONE_SLAB`. No price anywhere
in the shipped file is negative.

## Money is exact

Every price, payout, category total and lifetime total is held as a `BigDecimal` and rounded **once**, to
the scale you configure:

```yaml
pricing:
  rounding:
    decimals: 2       # 0 for a currency with no subunit; max 8
    mode: HALF_UP     # any Java RoundingMode name
```

| `mode` | Behaviour |
|---|---|
| `HALF_UP` | round `.5` away from zero — what a player expects (the default) |
| `HALF_EVEN` | banker's rounding, unbiased over many transactions |
| `DOWN` | always toward zero: the house keeps the fraction |
| `UP` | always away from zero: the player does |

An unrecognised name falls back to `HALF_UP` rather than failing startup.

This matters because the multiplier ladder already asks for 640 billion per category, and a lifetime total
lands squarely in the range where repeated `double` rounding starts losing cents. Amounts are also stored
as plain strings in `playerdata.yml`, so a total is exact at rest.

Money is never negative: a configured percentage or a hand-edited data file that would produce one is
floored at zero.

## A global multiplier

```yaml
pricing:
  global-multiplier: 1.0
```

Applied to every payout on top of everything else — `2.0` for a double-sell weekend. Unlike a price edit
this scales what players are **paid**, not what items are **worth**, so the numbers shown in `/worth hand`
and the prices GUI stay honest.

## The blanket adjustment

```yaml
pricing:
  source: independent
  temporary-adjustment:
    enabled: true
    percent: 20        # signed: 20 = +20%, -15 = 15% off
```

Scales every price the file produces, for a weekend event. `percent` is signed.

> **`pricing.source` must be `independent` for this to do anything.** The key is a leftover from the
> version that derived prices from a shop, and it still ships as `rotating-shop`, which is the value that
> tells the plugin to leave `temporary-adjustment` to the (now absent) shop. With no shop to ask, the
> adjustment is simply never applied. Set `source: independent` and it works.

Two more keys are inert for the same reason and can be ignored:

| Key | Status |
|---|---|
| `pricing.sell-ratio` | **Inert.** It scaled a shop's buy price into a sell price. There is no shop. |
| `pricing.adjust-overrides` | **Inert.** It decided whether hand-set prices rode a shop's adjustment. In `independent` mode the adjustment applies to every price regardless. |

## What a payout is

```
worth × amount × category tier × permission multiplier × global multiplier
```

Rounded to `pricing.rounding`, floored at zero. See [Sell Multipliers](/plugins/oberonsell/features/sell-multipliers/) for the two
multiplier sources, and [Selling](/plugins/oberonsell/features/selling/) for what happens around the payout.

## How prices are displayed

Formatting only changes what is **shown**. The amount actually paid is always the exact one — nothing
under `price-format` can create or destroy money. See
[`price-format` in config.yml](/plugins/oberonsell/configuration/config/#price-format) for grouping, decimals and the
compact `K` / `M` / `B` / `T` / `Q` suffixes.
