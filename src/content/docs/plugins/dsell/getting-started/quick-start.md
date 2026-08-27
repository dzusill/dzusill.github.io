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
You already have prices — `prices.yml` ships with 1,480 material prices and 136 potion variants in it, so
most vanilla items are covered before you configure anything.

```
/worth hand
```

Hold something: what one of it is worth, and — on a stack of more than one — what the whole stack is worth.

## 2. Sell something

```
/sell          a menu to drop items into — close it to sell
/sell hand     sell the stack in your hand
/sellall       sell everything sellable in your inventory
/sell auto     toggle selling items as you pick them up
```

## 3. See worth lore

Open a chest with items in it. Each priced item gets a line:

```
Worth: $500
```

Put a full shulker box in and the box's line covers the box **and** everything inside it, added together:

```
Shulker Box
Worth: $46,800
```

Players who don't want it can run `/toggleworth`.

## 4. Change a price you don't like

```
/setworth 30
```

Prices the item you are holding. This writes one readable line:

```yaml
items:
  DIAMOND: 30.0
```

An `items` entry always beats the shipped table, so this is how you correct a migrated price. `/delworth`
removes your override again and the shipped price takes over; `/delworth <key>` tab-completes the keys that
exist.

To make something unsellable, price it at zero rather than deleting it:

```
/setworth DIAMOND 0
```

See [prices.yml](/plugins/dsell/configuration/prices/#making-a-migrated-price-unsellable) for why.

This works on custom items too — hold an MMOItems sword and it becomes `mmoitems:SWORD/CUTLASS`. See
[Custom Items](/plugins/dsell/features/custom-items/).

## 5. Run an event

The simplest lever scales what players are **paid**, leaving the prices they see alone. In `config.yml`:

```yaml
pricing:
  global-multiplier: 2.0
```

```
/dsell reload
```

To scale the **prices themselves** instead, use the blanket adjustment — and note it needs
`source: independent`:

```yaml
pricing:
  source: independent
  temporary-adjustment:
    enabled: true
    percent: 20        # -15 for 15% off
```

## 6. Hand out a sell axe

```
/sellaxe give <player> 7d
```

Right-click a container with it and everything sellable inside is sold. See
[The Sell Axe](/plugins/dsell/features/the-sell-axe/).

## 7. Look at the multipliers

```
/sellmultipliers
```

Nine categories, each with a twenty-tier ladder. Selling ores raises your ores multiplier and nothing else.
Tune the ladders in `sell/<category>.yml` — see [Sell Multipliers](/plugins/dsell/features/sell-multipliers/).

## Where to go next

- [Pricing](/plugins/dsell/features/pricing/) — where a price comes from and how money is rounded
- [config.yml](/plugins/dsell/configuration/config/) — every key
- [Commands & Permissions](/plugins/dsell/commands-and-permissions/)
