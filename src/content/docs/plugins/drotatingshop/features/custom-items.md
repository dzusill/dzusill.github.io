---
title: "Custom Items"
description: "The pool can hold any item — plain vanilla, enchanted, renamed, or fully custom items from other plugins (MMOItems, ItemsAdder, Oraxen, …). There's no…"
---

The pool can hold **any** item — plain vanilla, enchanted, renamed, or fully custom items from other plugins (MMOItems, ItemsAdder, Oraxen, …). There's no per-plugin integration: dRotatingShop serialises the actual `ItemStack`, so whatever you can hold, you can sell.

## Adding the item in your hand

Hold the item and run:

```
/dshop additem <price> <stock> [limit]
```

For example, holding a custom sword:

```
/dshop additem 15000 3 1
```

dRotatingShop then:

1. Serialises the held item to a portable **Base64** string.
2. Derives an **id** from its name (colours stripped, lower-cased, spaces → `_`; clashes get `_2`, `_3`, …).
3. Appends it to [items.yml](/plugins/drotatingshop/configuration/items/) as an `nbt-base64` entry.
4. Rebuilds the pool — the item is eligible from the next rotation.

`stock` and `limit` follow the usual rules (`-1` = unlimited); see [Stock & Purchase Limits](/plugins/drotatingshop/features/stock-and-limits/).

## Vanilla items by hand

For plain vanilla items you don't need to hold anything — write a `material` block in `items.yml` and `/dshop reload`:

```yaml
items:
  diamond:
    display-name: "<aqua>Diamond"
    material: DIAMOND
    price: 250.0
    stock: -1
    per-player-limit: -1
```

You can also add `enchantments:` to a `material` entry. Full format in [items.yml](/plugins/drotatingshop/configuration/items/).

> Don't want to hand-write vanilla items? Most of them are already in the pool via the seeded [default price list](/plugins/drotatingshop/configuration/default-prices/) — or run `/dshop seed` to (re)load it.

## Removing items

```
/dshop removeitem <id>
```

Deletes the entry from `items.yml` and rebuilds the pool. (Use `/dshop list` to see ids.) An item that's removed while it's in the **current** rotation stays on sale until the rotation ends, then never returns.

## A note on versions

`nbt-base64` items are tied to the Minecraft data version they were serialised on. If you copy `items.yml` to a server on an **incompatible** version and an item can't be read, dRotatingShop logs a warning and **skips just that item** — the rest of the pool loads normally. Re-add it with `/dshop additem` on the new version.
