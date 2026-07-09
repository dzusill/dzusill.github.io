---
title: "Buying Items"
description: "dRotatingShop is buy-only — there's no selling. Players spend Vault currency to take items out of the rotating shop, choosing how many in the buy menu."
---

dRotatingShop is **buy-only** — there's no selling. Players spend Vault currency to take items out of the rotating shop, choosing how many in the [buy menu](/plugins/drotatingshop/features/the-buy-menu/).

## How a purchase works

1. **Click an item** in the [shop menu](/plugins/drotatingshop/features/the-shop-menu/). If it's sold out or you're at its per-player limit, the click is refused with a message; otherwise the [buy menu](/plugins/drotatingshop/features/the-buy-menu/) opens.
2. **Pick an amount** with the `+/-` buttons. The preview shows the running **total price** (`price × quantity`).
3. **Click the preview** to buy. The plugin checks, in order:
   - **Is the market mid-[rotation](/plugins/drotatingshop/features/rotations/)?** (*"The market is rotating — wait for the new items to appear."*)
   - **In stock?** (*"This item is sold out."*)
   - **Under your limit?** (*"reached your purchase limit"*)
   - **Can you afford the total?** — Vault balance ≥ `price × quantity` (*"Not enough money."*)
4. If all pass, the total is withdrawn through Vault and the items are delivered.

The amount is re-validated and clamped server-side at the moment of purchase, so a stale menu can never over-buy.

## Inventory full

If your inventory has no room, the purchase **still goes through**: the overflow is **dropped at your feet** and you get a heads-up (*"Your inventory was full — … was dropped at your feet."*). You are charged either way, so clear some space first if you'd rather not chase drops.

## After buying

The buy menu **stays open and resets the amount to 1**, so you can keep buying. Stock counts tick down live; when the item hits zero (or you reach your limit) the menu closes with the matching message, and the shop GUI shows it as **Sold Out**. See [Stock & Purchase Limits](/plugins/drotatingshop/features/stock-and-limits/).

## Sounds

Each step plays a configurable sound — open, click, purchase, the various failures, and a warning when items drop. See [Sounds](/plugins/drotatingshop/configuration/sounds/).

## Messages

Every line is configurable in [messages.yml](/plugins/drotatingshop/configuration/messages/):

| Message key | When |
|---|---|
| `purchase-success` | Bought successfully (`{quantity}`, `{item}`, `{price}` = total). |
| `purchase-fail-stock` | Item is sold out. |
| `purchase-fail-limit` | Per-player limit reached this rotation. |
| `purchase-fail-rotating` | The market is mid-rotation (reveal hold) — buying is blocked. |
| `purchase-fail-money` | Not enough Vault currency for the total. |
| `purchase-inventory-full` | Bought, but the overflow was dropped (inventory full). |
| `economy-unavailable` | Vault economy missing. |
