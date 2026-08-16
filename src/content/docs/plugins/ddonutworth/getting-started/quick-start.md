---
title: "Quick Start"
description: "Five minutes from a fresh install to a working sell economy."
---

Five minutes from a fresh install to a working sell economy.

## 1. Check a price

```
/worth
```

The full price list, paginated. Cycle **Sort** for name / highest / lowest and **Filter** for a category.
With [dRotatingShop](/plugins/drotatingshop/) installed you already have prices — its pool is seeded from a
bundled 1.21 price list, so most vanilla items are covered before you configure anything.

```
/worth hand
```

Hold something: what one of it is worth, and what the whole stack is worth.

## 2. Sell something

```
/sell          a menu to drop items into — close it to sell
/sell hand     sell the stack in your hand
/sellall       sell everything sellable in your inventory
```

## 3. See worth lore

Open a chest with items in it. Each priced item gets a line:

```
Worth: $500
```

Put a full shulker box in and the box itself shows what its contents are worth:

```
Worth: $1,200
Total worth: $46,800
```

Players who don't want it can run `/toggleworth`.

## 4. Tune the ratio

Sell worth is 20% of the shop's buy price by default. In `config.yml`:

```yaml
pricing:
  sell-ratio: 0.20
```

That is the only number most servers ever change. A potato that buys for 500 sells for 100.

## 5. Run an event

Bump your **shop's** prices and sell prices follow automatically — in `dRotatingShop/config.yml`:

```yaml
pricing:
  temporary-adjustment:
    enabled: true
    percent: 100
```

```
/dshop reload
```

Everything now buys for double and sells for double. Nothing to change in dDonutWorth.

## 6. Override a price you don't like

```
/setworth 500
```

Prices the held item. This writes one readable line:

```yaml
items:
  POTATO: 500.0
```

An override always beats the derived price, so `prices.yml` is where you correct the handful of items whose
derived price is wrong — not a list you have to fill in. `/delworth` removes it again, and `/delworth <key>`
tab-completes the keys that exist.

This works on custom items too — hold an MMOItems sword and it becomes
`mmoitems:SWORD/CUTLASS`. See [Custom Items](/plugins/ddonutworth/features/custom-items/).

## 7. Hand out a sell axe

```
/sellaxe give <player> 7d
```

Right-click a container with it and everything sellable inside is sold. See
[The Sell Axe](/plugins/ddonutworth/features/the-sell-axe/).

## 8. Look at the multipliers

```
/sellmultipliers
```

Nine categories, each with a twenty-tier ladder. Selling ores raises your ores multiplier and nothing else.
Tune the ladders in `sell/<category>.yml` — see [Sell Multipliers](/plugins/ddonutworth/features/sell-multipliers/).

## Where to go next

- [Price Sources](/plugins/ddonutworth/features/price-sources/) — the two modes, and how the shop link works
- [config.yml](/plugins/ddonutworth/configuration/config/) — every key
- [Commands & Permissions](/plugins/ddonutworth/commands-and-permissions/)
