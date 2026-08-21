---
title: "Enchantment Worth"
description: "An enchanted item is worth its own price plus what its enchantments are worth. A Diamond Pickaxe with"
---

An enchanted item is worth its own price **plus** what its enchantments are worth. A Diamond Pickaxe with
Efficiency V, Unbreaking III and Fortune III sells for the pickaxe price plus the value of those three
enchantments — the same figures you would price their books at.

```
DIAMOND_PICKAXE          1,000
  Efficiency V            +200
  Unbreaking III          +150
  Fortune III             +240
                        ───────
                          1,590
```

It applies to every enchantable item: tools, weapons, armour, elytra, fishing rods, tridents, maces and
enchanted books. Nothing is whitelisted — an item either carries enchantments or it does not.

The values live in [enchantments.yml](/plugins/oberonsell/configuration/enchantments/), which ships with **42** vanilla
enchantments already priced.

> `prices.yml` also carries a migrated `enchant-worth` block of 40 entries in a `base` + `per_level` shape.
> **The plugin does not read it.** `enchantments.yml` is the file that decides what an enchantment is worth.

## What scale the shipped numbers are in

They are **worth** — what the enchantment adds to what a player is *paid*, not a buy price. The shipped
figures were taken from a book price list at a 0.20 sell ratio, so an enchantment on a tool is worth
roughly what its book would sell for and the two never look inconsistent side by side.

Running an economy on another scale? Move `scale` rather than editing 42 entries:

```yaml
scale: 2.5      # every enchantment is worth 2.5x the shipped table
```

It multiplies the table and `defaults.per-level`, including entries you have edited yourself. It does not
touch a price that came from an actual book entry in `prices.yml` — that figure is already a worth.

## When the bonus is *not* added

An item whose price already describes its enchantments is worth exactly that price, and nothing is added on
top. Otherwise the same enchantment would be paid for twice.

| The price that matched | Bonus |
|---|---|
| `DIAMOND_SWORD` — a plain material key, from `items` or the shipped table | **added** |
| `DIAMOND_SWORD[sharpness=5]` — a key naming the enchantments | no |
| `custom:legendary_axe` — an item priced by a stored copy of itself | no |
| `mmoitems:SWORD/CUTLASS` — a custom-item plugin's item | no |

The test is simply whether the key that won carries a `[…]` qualifier. Potions are the only other users of
that form and carry no enchantments, so they are unaffected either way.

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

1. an exact figure for that level — `values.<name>.levels.<level>`
2. its per-level value — `values.<name>.per-level` × level
3. the price of the matching book — `ENCHANTED_BOOK[<name>=<level>]` — in `prices.yml`
4. the file's `defaults.per-level` × level, so nothing is ever silently free

Steps 1, 2 and 4 are multiplied by `scale`. Step 3 is not — a book price is already a worth.

A value configured as `0` is an answer, not an absence: it stops at step 1 or 2 rather than falling through
to the book price. That is how the two curses ship.

The book lookup reads `prices.yml` directly rather than going back through the normal valuation, which is
what stops an unpriced book from asking for its own bonus forever.

## Enchanted books

A book's enchantment *is* the book — there is no item underneath it, and a blank one is `BOOK` — so books
are the exception to both rules above:

| What matched | Worth |
|---|---|
| `ENCHANTED_BOOK[mending=1]` in `prices.yml` | that price, whole |
| a plain `ENCHANTED_BOOK` price | the table value; that price is the fallback when the table prices the book at nothing |
| nothing at all | the table value **on its own** |

The last row is what makes books work with no setup. It matters most for combinations no price list names —
a book carrying two enchantments, or a level the list stops short of — since no catalogue can enumerate
them all.

**A plain `ENCHANTED_BOOK` price is never topped up**, and that is the middle row's whole point. For a
pickaxe the plain key prices the *unenchanted* tool, so the enchantments belong on top of it. A price filed
under `ENCHANTED_BOOK` is already the price of an enchanted book, so adding the table to it would charge
for the enchantment twice — a Mending book reading $560 against a $280 table value, while the same Mending
correctly added $280 to a pickaxe. The table wins over the generic price rather than the other way round,
because a price list that names books only as `ENCHANTED_BOOK` gives Mending and Fortune III the same
number, which is the thing this plugin exists to fix.

Turn it off if you would rather books were unsellable until you price them yourself:

```yaml
price-books-by-enchantment: false
```

`transfer-ratio` and `max-bonus` still apply, so a book is never worth more than the table's ceiling.

## Keeping the economy in hand

Villager trading is a renewable source of books, and this makes those books worth more. Three levers in
[enchantments.yml](/plugins/oberonsell/configuration/enchantments/):

| Setting | Does |
|---|---|
| `transfer-ratio` | pays a fraction of the table — `0.6` means an enchanted tool carries 60% of its enchantments' value. Floored at zero, deliberately not capped above |
| `diminishing` | discounts each further enchantment on the same item, most valuable first. Clamped to `0`–`1` |
| `max-bonus` | a hard ceiling on one item's bonus. A negative value means none |

All three are inert at their defaults (`1.0`, `1.0`, `-1`), so out of the box an enchantment is worth the
same on a tool as it is in a book. `scale` is the fourth knob, but it is for matching your economy's size
rather than for holding it down — see above.

Curses are worth nothing. A cursed item is priced as though the curse were not there.
