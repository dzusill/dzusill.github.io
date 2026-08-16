---
title: "enchantments.yml"
description: "What each enchantment adds to the item carrying it. See"
---

What each enchantment adds to the item carrying it. See
[Enchantment Worth](/plugins/ddonutworth/features/enchantment-worth/) for how and when that addition happens; this page is
the file itself.

It ships with every vanilla enchantment already priced, so it works out of the box and you only edit the
ones you disagree with.

## The settings

```yaml
enabled: true
scale: 1.0
transfer-ratio: 1.0
diminishing: 1.0
max-bonus: -1

defaults:
  per-level: 50
```

| Setting | Default | Does |
|---|---|---|
| `enabled` | `true` | Master switch. Off, and an enchanted item is worth what a plain one is. |
| `scale` | `1.0` | Multiplies every value in the table, and `defaults.per-level` with it. The one number to move when your economy is on another scale. |
| `transfer-ratio` | `1.0` | Fraction of an enchantment's value the item carries. `0.6` pays 60%. |
| `diminishing` | `1.0` | What each further enchantment on the same item is worth relative to the one before it, most valuable first. `0.8` tames six-enchantment god tools. |
| `max-bonus` | `-1` | Ceiling on one item's total bonus. `-1` is no ceiling. |
| `defaults.per-level` | `50` | Used for an enchantment listed neither here nor as a book — a modded one, or a vanilla one added after this file was written. Never silently free. |

## What scale the numbers are in

The shipped table is dRotatingShop's bundled book prices at the default `pricing.sell-ratio` of `0.20`, so
Fortune III is `240` because that shop's Fortune III book buys for `1200` and therefore sells for `240`. The
numbers are **worth**, not buy prices.

Run `sell-ratio: 0.50` and every enchantment should be worth 2.5× as much. That is one edit:

```yaml
scale: 2.5
```

`scale` multiplies your own edits too, and never touches a value that came from an actual book price —
that figure is already a worth.

## The table

Two entry shapes:

```yaml
values:
  silk_touch: 260           # flat, multiplied by the level

  density:                  # per-level, with exact figures where
    per-level: 100          # straight multiplication is wrong
    levels:
      2: 130
      3: 160
```

Names are Minecraft's own (`fire_protection`, `bane_of_arthropods`, `binding_curse`), which are also the
names that appear inside a price key such as `DIAMOND_SWORD[sharpness=5]`.

An enchantment set to **`0`** is worth nothing *and stops there* — it does not fall through to its book
price. That is how the two curses are shipped:

```yaml
values:
  binding_curse: 0
  vanishing_curse: 0
```

Set a value there instead if you want cursed gear to pay.

## Where a value comes from

Per enchantment, first hit wins:

1. `values.<name>.levels.<level>`
2. `values.<name>.per-level` × level
3. the price of `ENCHANTED_BOOK[<name>=<level>]` in [prices.yml](/plugins/ddonutworth/configuration/prices/) or from the shop
4. `defaults.per-level` × level

Steps 1, 2 and 4 are multiplied by `scale`. Step 3 is not.

## Books with no price of their own

```yaml
price-books-by-enchantment: true
```

An enchanted book has no item underneath its enchantment, so it is the one thing this table will price with
no base price at all — otherwise a book nothing had named would be unsellable. It also wins over a price
filed under the plain `ENCHANTED_BOOK` key, which is already an enchanted book's price and would otherwise
be charged for twice. See [Enchantment Worth](/plugins/ddonutworth/features/enchantment-worth/#enchanted-books).

Set it to `false` to price books only from `prices.yml` and the shop. A plain `ENCHANTED_BOOK` price is
then used exactly as it stands — still never topped up with the table.

## Deleted entries stay deleted

`values` is never merged from the jar's defaults. Remove `mending` and it is gone — it will fall to its
book price, or to `defaults.per-level`, rather than reappearing on the next start.

Everything above `values` **is** merged, so a setting added in a future version appears in your file with
its comment intact.

## Reloading

`/ddonutworth reload` picks up every change here. See [Reloading](/plugins/ddonutworth/configuration/reloading/).
