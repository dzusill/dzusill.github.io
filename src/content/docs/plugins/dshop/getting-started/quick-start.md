---
title: "Quick Start"
description: "Open shops/blocks.yml and add a block under items::"
---

## Add an item

Open `shops/blocks.yml` and add a block under `items:`:

```yaml
items:
  diamond:
    displayname: '&bDiamond'
    material: DIAMOND
    price: 5000
    page: 1
    slot: 8
    amount: 1
```

`/adminshop reload`, then `/shop blocks`. It is there.

`slot` is the position in the menu, counted from 0. `amount` is how many items one purchase unit hands
over — a product selling arrows in tens would say `amount: 10`.

## Add a category

1. Copy `shops/_example_potions_enchants.yml` to `shops/magic.yml`. The file name is the category id.
2. Add an icon to `gui/maingui.yml` under `main-menu` → `categories`, with `action: magic`.
3. `/adminshop reload`.

Two rules on the id, both checked at load with a message naming the file: no underscore (use `-`), and
not one of `search`, `favorites`, `recent`, `popular`, `repeat` — those are `/shop` subcommands, so a
category named after one could never be opened.

## Price something in Stardust

```yaml
# at the top of the category file — the default for everything in it
currency: stardust
```

or on one item:

```yaml
  cool_thing:
    material: NETHER_STAR
    price: 250
    slot: 4
    currency: stardust
```

The currency ids come from `economy.currencies` in `config.yml`, which ships with `money`, `stardust` and
`legacy-shards`. See [Currencies](/plugins/dshop/features/currencies/).

## Give an item a choice

```yaml
  firework:
    displayname: '&bFirework'
    material: FIREWORK_ROCKET
    slot: 10
    variants:
      id: flight
      title: '&bChoose flight duration'
      generate: firework-flights
      flights: [ 1, 2, 3 ]
      prices: [ 50, 90, 140 ]
```

Right-clicking now opens the choice instead of quick-buying, because there is nothing to buy until one is
made. See [Variants](/plugins/dshop/features/variants/) — `shops/_example_variants.yml` has a worked example of
every shape, including a three-level potion.

## Turn on stock

```yaml
# config.yml
stock:
  enabled: true
```

That alone changes nothing: an item with no `max` is still unlimited, which is what lets you switch the
feature on without closing the shop. Give an item a number:

```yaml
  diamond:
    material: DIAMOND
    price: 5000
    slot: 8
    stock:
      max: 64
      restock:
        mode: full
        interval-minutes: 1440
```

`/adminshop restock` refills now without waiting. See
[Stock & Limits](/plugins/dshop/features/stock-and-limits/).

## Run a sale

```yaml
  diamond:
    material: DIAMOND
    price: 5000
    slot: 8
    sale:
      percent: 25
      label: WEEKEND
      to: '2026-12-31T23:59'
```

Quote the dates. Unquoted, YAML reads `2026-12-31` as a timestamp rather than text — the plugin handles
both, but quoting makes what you meant obvious. See
[Pricing & Sales](/plugins/dshop/features/pricing-and-sales/).
