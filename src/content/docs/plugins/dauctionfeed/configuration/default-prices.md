---
title: "Default Prices (1.21)"
description: "prices121.yml is the bundled price list used for the one-time fill of"
---

`prices_1_21.yml` is the bundled price list used for the one-time fill of
[`items.yml`](/plugins/dauctionfeed/configuration/items/). It is the same list dRotatingShop ships, so an economy built on both stays consistent.

It is copied into the plugin folder on first use, so you can retune it before running
[`/auctionfeed seed`](/plugins/dauctionfeed/commands-and-permissions/) again.

## Format

A flat map keyed by Minecraft item id:

```yaml
diamond_boots:
  name: diamond boots      # human label
  category: armor
  stack: 1
  unit_buy: 1120           # price per single item -> the pool's unit price
  stack_buy: 1120
```

Only `name` and `unit_buy` are read (with `stack_buy` as a fallback). The rest is carried for compatibility with
the shared list.

## Ids that are not materials

Two families of id name an item no material can express on its own, and both are recognised from the id itself.

### Enchanted books

```
enchanted_book_fortune_3          -> ENCHANTED_BOOK with stored Fortune III
enchanted_book_bane_of_arthropods_5
```

Split at the **last** underscore, because plenty of enchantment names contain one — so that second example is
Bane of Arthropods V, not "bane" at some level.

### Brewed items

```
potion_of_healing_2               -> POTION, strong_healing
splash_potion_of_poison_extended  -> SPLASH_POTION, long_poison
arrow_of_slowness_1               -> TIPPED_ARROW, slowness
water_bottle                      -> POTION, water
awkward_potion                    -> POTION, awkward
```

The tail carries the tier the same way for every form: `_2` is the upgraded potion, `_extended` the longer one.
Since Minecraft 1.20.5 those are separate registry entries prefixed `strong_` and `long_` rather than flags on a
base type, which the parser handles.

## What is skipped

An id that resolves to neither a material nor one of the two families above is skipped, so `items.yml` stays clean
on every Minecraft release — items from a newer version simply do not appear until you run on that version.

```
[dAuctionFeed] Pool seed: skipped 47 entr(ies) with no matching item on this version.
[dAuctionFeed] Pool seed: skipped 68 entr(ies) matching seed.exclude.
```

## Tuning the fill

```yaml
# config.yml
seed:
  price-multiplier: 1.0     # applied to every price taken from this file
  auto-tier:
    legendary: 5000
    epic: 1000
    rare: 250
    uncommon: 50
    common: 0
  exclude:
    - "*_spawn_egg"
    - "bedrock"
```

`price-multiplier` is the quick way to scale the whole catalogue to an economy that runs richer or poorer than the
list assumes. It only affects the fill — it does not rescale a pool that already exists.
