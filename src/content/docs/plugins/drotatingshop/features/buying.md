---
title: "Buying Items"
description: "DRotatingShop is buy-only — there's no selling. Players spend Vault currency to take items out of the rotating shop."
---

DRotatingShop is **buy-only** — there's no selling. Players spend Vault currency to take items out of the rotating shop.

## How a purchase works

**Left-click** an item in the [shop menu](/plugins/drotatingshop/features/the-shop-menu/). The plugin checks, in order:

1. **In stock?** — sold-out items can't be bought (*"This item is sold out."*).
2. **Under your limit?** — if you've hit the per-player limit for this rotation (*"reached your purchase limit"*).
3. **Can you afford it?** — Vault balance ≥ price (*"Not enough money."*).

If all pass, the price is withdrawn through Vault and the item is delivered.

## Inventory full

If your inventory has no room, the purchase **still goes through**: the item is **dropped at your feet** and you get a heads-up (*"Your inventory was full — … was dropped at your feet."*). You are charged either way, so clear some space first if you'd rather not chase drops.

## Live updates

After a purchase, the shop GUI refreshes for everyone viewing it — stock counts tick down, and an item that just hit zero immediately shows as **Sold Out**. See [Stock & Purchase Limits](/plugins/drotatingshop/features/stock-and-limits/).

## Messages

Every line is configurable in [messages.yml](/plugins/drotatingshop/configuration/messages/):

| Message key | When |
|---|---|
| `purchase-success` | Bought successfully. |
| `purchase-fail-stock` | Item is sold out. |
| `purchase-fail-limit` | Per-player limit reached this rotation. |
| `purchase-fail-money` | Not enough Vault currency. |
| `purchase-inventory-full` | Bought, but the item was dropped (inventory full). |
