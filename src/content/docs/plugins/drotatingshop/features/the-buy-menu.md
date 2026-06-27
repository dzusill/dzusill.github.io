---
title: "The Buy Menu"
description: "Clicking an item in the shop menu opens the buy menu — a quantity picker where the player dials in how many to buy, watches a live preview, then clicks the…"
---

Clicking an item in the [shop menu](/plugins/drotatingshop/features/the-shop-menu/) opens the **buy menu** — a quantity picker where the player dials in *how many* to buy, watches a live preview, then clicks the **Buy** button to purchase.

## Layout

A 27-slot menu. The item sits centre as an **info display**; a separate **Buy** button (a paper item, bottom-right by default) is what actually purchases.

```
. . . . . . . . .
. ➖ ➖ ➖ 🪵 ➕ ➕ ➕ .     -64 -32 -1   item (info)   +1 +32 +64
⬅ . . . . . . . 📄        back ................. [✔ BUY]
```

| Element | Default slot | What it does |
|---|---|---|
| **Item (preview)** | 13 | Info only — shows the selected amount and lore (quantity/max, unit & total price, stock, limit). **Not clickable.** |
| **Buy** | 26 | The paper button — **click it to buy** the selected amount. |
| **+1 / +half / +full** | 14 / 15 / 16 | Increase the amount by 1, half a stack, or a full stack. |
| **−1 / −half / −full** | 12 / 11 / 10 | Decrease the amount. |
| **Back** | 18 | Return to the shop menu. |

Every slot, icon, name and lore is configurable in [quantity-menu.yml](/plugins/drotatingshop/configuration/quantity-menu/) — including swapping the `+/-` panes or the Buy paper for custom heads.

## How the amount works

- **Steppers are relative to the item's stack size.** "Half" and "full" mean half and a full stack of *that* item — `32`/`64` for normal items, `8`/`16` for things like ender pearls. For non-stackable items (elytra, tools, armour) the half/full buttons are hidden and only `±1` shows.
- The amount is clamped to a sensible maximum (below) and never drops below `1`.
- The item's stack count and the **total price** update live as you click.

## Maximum per purchase

A single purchase is capped at **one stack**, and never more than what's actually available:

```
max = min( item's max stack size, stock remaining, your remaining per-rotation limit )
```

So `+full` fills up to that cap. You can still buy again (open the item again) until the stock or your limit runs out. See [Stock & Purchase Limits](/plugins/drotatingshop/features/stock-and-limits/).

## Buying

**Click the Buy button** to buy the selected amount. The total (`price × quantity`) is withdrawn through Vault and the items are delivered (overflow drops at your feet — see [Buying Items](/plugins/drotatingshop/features/buying/)).

The price shown is **per player** — VIP/donor groups and any [pricing adjustment](/plugins/drotatingshop/features/pricing-and-perks/) are reflected here.

After a successful buy the menu **stays open and resets to 1**, so you can keep buying — until the item is sold out or you hit your limit, at which point it closes with the matching message.

## When it closes on its own

- On a [rotation](/plugins/drotatingshop/features/rotations/) (the selected item may have just rotated out).
- On `/dshop reload`.
- When [opening hours](/plugins/drotatingshop/features/opening-hours/) end and the market closes.
