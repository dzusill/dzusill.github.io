---
title: "enchantments.yml"
description: "What each enchantment adds to the item carrying it — one editable table, every vanilla enchantment priced."
---

What each enchantment adds to the item carrying it. See
[Enchantment Worth](/plugins/ddonutworth/features/enchantment-worth/) for how and when that addition
happens; this page is the file itself.

It ships with every vanilla enchantment already priced, so it works out of the box and you only edit the
ones you disagree with.

## The settings

```yaml
enabled: true
transfer-ratio: 1.0
diminishing: 1.0
max-bonus: -1

defaults:
  per-level: 100
```

| Setting | Default | Does |
|---|---|---|
| `enabled` | `true` | Master switch. Off, and an enchanted item is worth what a plain one is. |
| `transfer-ratio` | `1.0` | Fraction of an enchantment's value the item carries. `0.6` pays 60%. |
| `diminishing` | `1.0` | What each further enchantment on the same item is worth relative to the one before it, most valuable first. `0.8` tames six-enchantment god tools. |
| `max-bonus` | `-1` | Ceiling on one item's total bonus. `-1` is no ceiling. |
| `defaults.per-level` | `100` | Used for an enchantment listed neither here nor as a book — a modded one, or a vanilla one added after this file was written. Never silently free. |

## The table

Two entry shapes:

```yaml
values:
  silk_touch: 2000          # flat, multiplied by the level

  efficiency:               # per-level, with exact figures where
    per-level: 150          # straight multiplication is wrong
    levels:
      5: 900
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

## Books with no price of their own

```yaml
price-books-by-enchantment: true
```

An enchanted book has no item underneath its enchantment, so it is the one thing this table will price with
no base price at all — otherwise a book nothing had named would be unsellable. See
[Enchantment Worth](/plugins/ddonutworth/features/enchantment-worth/#enchanted-books). Set it to `false` to
require a price for every book instead.

## Deleted entries stay deleted

`values` is never merged from the jar's defaults. Remove `mending` and it is gone — it will fall to its
book price, or to `defaults.per-level`, rather than reappearing on the next start.

Everything above `values` **is** merged, so a setting added in a future version appears in your file with
its comment intact.

## Reloading

`/ddonutworth reload` picks up every change here. See
[Reloading](/plugins/ddonutworth/configuration/reloading/).
