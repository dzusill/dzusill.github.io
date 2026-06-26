---
title: "The Buy Menu"
description: "Clicking an item in the shop menu opens the buy menu — a quantity picker where the player dials in how many to buy, sees a live preview, then clicks to…"
---

Clicking an item in the [shop menu](/plugins/drotatingshop/features/the-shop-menu/) opens the **buy menu** — a quantity picker where the player dials in *how many* to buy, sees a live preview, then clicks to purchase.

## Layout

A 27-slot menu, item-centred:

```
. . . . . . . . .
. ➖ ➖ ➖ 💎 ➕ ➕ ➕ .     -64 -32 -1  | item |  +1 +32 +64
. ⬅ . . . . . . .         back
```

| Element | Default slot | What it does |
|---|---|---|
| **Preview / buy** | 13 | Shows the item with the **selected amount** and its lore (quantity, unit & total price, stock, limit). **Click it to buy.** |
| **+1 / +half / +full** | 14 / 15 / 16 | Increase the amount by 1, half a stack, or a full stack. |
| **−1 / −half / −full** | 12 / 11 / 10 | Decrease the amount. |
| **Back** | 18 | Return to the shop menu. |

Every slot, icon, name and lore is configurable in [quantity-menu.yml](/plugins/drotatingshop/configuration/quantity-menu/) — including swapping the `+/-` panes for custom heads.

## How the amount works

- **Steppers are relative to the item's stack size.** "Half" and "full" mean half and a full stack of *that* item — `32`/`64` for normal items, `8`/`16` for things like ender pearls. For non-stackable items (elytra, tools, armour) the half/full buttons are hidden and only `±1` shows.
- The amount is always clamped to a sensible maximum (below), and never drops below `1`.
- The preview icon's stack count and the **total price** update live as you click.

## Maximum per purchase

A single purchase is capped at **one stack**, and never more than what's actually available:

```
max = min( item's max stack size, stock remaining, your remaining per-rotation limit )
```

So `+full` fills up to that cap. You can still buy again (open the item again) until the stock or your limit runs out. See [Stock & Purchase Limits](/plugins/drotatingshop/features/stock-and-limits/).

## Buying

**Click the preview** to buy the selected amount. The total (`price × quantity`) is withdrawn through Vault and the items are delivered (overflow drops at your feet — see [Buying Items](/plugins/drotatingshop/features/buying/)).

After a successful buy the menu **stays open and resets to 1**, so you can keep buying — until the item is sold out or you hit your limit, at which point it closes with the matching message.

## When it closes on its own

- On a [rotation](/plugins/drotatingshop/features/rotations/) (the selected item may have just rotated out).
- On `/dshop reload`.
- When [opening hours](/plugins/drotatingshop/features/opening-hours/) end and the market closes.
