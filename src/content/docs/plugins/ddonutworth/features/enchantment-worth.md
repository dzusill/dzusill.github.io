---
title: "Enchantment Worth"
description: "An enchanted item is worth its own price plus what its enchantments are worth, priced from one editable table."
---

An enchanted item is worth its own price **plus** what its enchantments are worth. A Diamond Pickaxe with
Efficiency V, Unbreaking III and Fortune III sells for the pickaxe price plus the value of those three
enchantments — the same figures you would price their books at.

```
DIAMOND_PICKAXE          1,000
  Efficiency V            +900
  Unbreaking III          +700
  Fortune III           +2,400
                       ────────
                          5,000
```

It applies to every enchantable item: tools, weapons, armour, elytra, fishing rods, tridents, maces and
enchanted books. Nothing is whitelisted — an item either carries enchantments or it does not.

The values live in [enchantments.yml](/plugins/ddonutworth/configuration/enchantments/), which ships with
every vanilla enchantment already priced.

## When the bonus is *not* added

An item whose price already describes its enchantments is worth exactly that price, and nothing is added on
top. Otherwise the same enchantment would be paid for twice.

| The price that matched | Bonus |
|---|---|
| `DIAMOND_SWORD` — a plain material key | **added** |
| a price derived from dRotatingShop | **added** |
| `DIAMOND_SWORD[sharpness=5]` — a key naming the enchantments | no |
| `custom:legendary_axe` — an item priced by a stored copy of itself | no |
| `mmoitems:SWORD/CUTLASS` — a custom-item plugin's item | no |

This is also the escape hatch. `/setworth` on an enchanted item writes the `[…]` form, so pricing one exact
loadout by hand takes it out of this system entirely:

```
/setworth 25000        while holding a Sharpness V, Mending, Unbreaking III sword
```

That sword now sells for 25,000 flat, whatever the table says.

## An item with no price stays unsellable

Enchantments add to a price; they do not create one. If `NETHERITE_HOE` is priced nowhere, an Efficiency V
one is still unsellable. Price the base item and the enchantments start counting.

**Enchanted books are the one exception** — see below. They have no product underneath the enchantment, so
the table may price them on its own.

## Where an enchantment's value comes from

For each enchantment, in order:

1. an exact figure for that level in `enchantments.yml`
2. its per-level value in `enchantments.yml`, times the level
3. the price of the matching book — `ENCHANTED_BOOK[silk_touch=1]` — in `prices.yml` or from the shop
4. the file's `defaults.per-level`, times the level, so nothing is ever silently free

The table wins over the book price on purpose: dRotatingShop rotates, and gear whose worth moved with every
rotation would be impossible to price against.

## Enchanted books

A book's enchantment *is* the book — there is no item underneath it — so a book is the only thing the table
will price with no base price at all:

| What matched | Worth |
|---|---|
| `ENCHANTED_BOOK[mending=1]` in `prices.yml`, or the same book in the shop | that price, whole |
| a plain `ENCHANTED_BOOK` price | that price **plus** the table value |
| nothing at all | the table value **on its own** |

That last row is what makes books work with no setup, and it is why they are exempt from the rule above.
It matters most for combinations no price list names — a book carrying two enchantments, or a level the
list stops short of — since no catalogue can enumerate them all.

Turn it off if you would rather books were unsellable until you price them yourself:

```yaml
price-books-by-enchantment: false
```

`transfer-ratio` and `max-bonus` still apply, so a book is never worth more than the table's ceiling.

> **If books show no worth at all**, your `items.yml` was seeded by a dRotatingShop build that dropped the
> price list's 121 `enchanted_book_*` entries — their ids match no Bukkit material, so every one was skipped
> and the shop never offered a book. Update dRotatingShop and run `/dshop seed`; existing ids are never
> overwritten. Books work without that too, on the last row above.

## Keeping the economy in hand

Villager trading is a renewable source of books, and this makes those books worth more. Three levers in
[enchantments.yml](/plugins/ddonutworth/configuration/enchantments/):

| Setting | Does |
|---|---|
| `transfer-ratio` | pays a fraction of the table — `0.6` means an enchanted tool carries 60% of its enchantments' value |
| `diminishing` | discounts each further enchantment on the same item, most valuable first |
| `max-bonus` | a hard ceiling on one item's bonus |

All three are inert at their defaults (`1.0`, `1.0`, `-1`), so out of the box an enchantment is worth the
same on a tool as it is in a book.

Curses are worth nothing. A cursed item is priced as though the curse were not there.
