---
title: "Quick Start"
description: "On first start the pool is seeded from the bundled 1.21 price list — 1,200 vanilla items, priced and ready. Nothing to do."
---

## 1. The pool is already full

On first start the pool is **seeded** from the bundled [1.21 price list](/plugins/drotatingshop/configuration/default-prices/) — ~1,200 vanilla items, priced and ready. Nothing to do.

To re-load the catalogue later (e.g. after clearing the pool), run:

```
/dshop seed
```

## 2. Add your own items (optional)

Hold an item — vanilla, enchanted or custom — and run:

```
/dshop additem 2500 50 1
```

That reads as **price 2500**, **stock 50**, **per-player limit 1**. Use `-1` for unlimited stock or limit. See [Custom Items](/plugins/drotatingshop/features/custom-items/).

## 3. Rotate

Items only appear once a rotation selects them. Force one now instead of waiting:

```
/dshop rotate
```

This picks a fresh random set (up to 7), resets stock and per-player purchases, and broadcasts the rotation.

## 4. Open the shop and buy

```
/market
```

The GUI shows the active items in the centre row with a **countdown clock** in the footer. **Click an item** to open the [buy menu](/plugins/drotatingshop/features/the-buy-menu/): use the `+/-` buttons to choose an amount (1 / half-stack / full-stack), watch the preview and total price update, then **click the preview to buy**.

A **sold-out** item turns grey and can't be opened until the next rotation.

## 5. Tune it

In [config.yml](/plugins/drotatingshop/configuration/config/):

```yaml
shop:
  command: "market"          # the command players run
  rotation-interval: 3600     # seconds between rotations (1 hour)
  open-duration: 0            # 0 = always open; e.g. 120 = open 2 min per rotation
  items-per-rotation: 7       # how many items per rotation (max 7)
```

You can also restyle the buy menu in [quantity-menu.yml](/plugins/drotatingshop/configuration/quantity-menu/) and tweak [sounds](/plugins/drotatingshop/configuration/sounds/).

## Admin essentials

```
/dshop seed                                # load the default 1.21 catalogue into the pool
/dshop additem <price> <stock> [limit]     # hold an item, add it to the pool
/dshop removeitem <id>                      # remove an item from the pool
/dshop list                                 # list the whole pool
/dshop rotate                               # force a rotation now
/dshop reload                               # reload config/items/messages/quantity-menu
```

All admin commands need `drotatingshop.admin` (op by default). See [Commands & Permissions](/plugins/drotatingshop/commands-and-permissions/).
