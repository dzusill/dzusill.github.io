---
title: "Quick Start"
description: "The pool ships empty. Add items the fast way — hold one and run:"
---

## 1. Fill the pool

The pool ships empty. Add items the fast way — hold one and run:

```
/dshop additem 2500 50 1
```

That reads as **price 2500**, **stock 50**, **per-player limit 1**. Use `-1` for unlimited stock or limit. Repeat for as many items as you like. See [Custom Items](/plugins/drotatingshop/features/custom-items/).

## 2. Rotate

Items only appear once a rotation selects them. Force one now instead of waiting:

```
/dshop rotate
```

This picks a fresh random set (up to 7), resets stock and per-player purchases, and broadcasts the rotation.

## 3. Open the shop

```
/market
```

`/market` is the default command name (change it with `shop.command` in [config.yml](/plugins/drotatingshop/configuration/config/)). The GUI shows the active items in the middle, a **countdown clock** at the centre, and filler around the edges.

## 4. Buy

**Left-click** an item to buy it. The cost is withdrawn through Vault, the item goes to your inventory (or drops at your feet if it's full), and the stock count updates live for everyone.

A **sold-out** item turns grey and can't be clicked until the next rotation.

## 5. Tune it

In [config.yml](/plugins/drotatingshop/configuration/config/):

```yaml
shop:
  command: "market"          # the command players run
  rotation-interval: 3600     # seconds between rotations (1 hour)
  items-per-rotation: 7       # how many items per rotation (max 7)
```

## Admin essentials

```
/dshop additem <price> <stock> [limit]   # hold an item, add it to the pool
/dshop removeitem <id>                     # remove an item from the pool
/dshop list                                # list the whole pool
/dshop rotate                              # force a rotation now
/dshop reload                              # reload config/items/messages
```

All admin commands need `drotatingshop.admin` (op by default). See [Commands & Permissions](/plugins/drotatingshop/commands-and-permissions/).
