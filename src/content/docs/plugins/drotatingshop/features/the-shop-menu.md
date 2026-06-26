---
title: "The Shop Menu"
description: "/market (the name is configurable) opens the shop — a 54-slot GUI showing the items on sale this rotation."
---

`/market` (the name is configurable) opens the shop — a 54-slot GUI showing the items on sale this rotation.

## Layout

```
. . . . . . . . .
. . . . . . . . .
. ▪ ▪ ▪ ▪ ▪ ▪ ▪ .     items in slots 19–25 (centre row)
. . . . . . . . .
. . . . . . . . .
. . . . ⏱ . . . .     countdown clock at slot 49 (bottom centre)
```

- **Items** occupy the seven centre slots **19–25**, with two empty rows above and below so they sit dead-centre. A rotation shows up to 7 items (`items-per-rotation`, capped at 7).
- The **countdown clock** sits in the footer at slot **49** — a `CLOCK` that reads *"Next rotation in 1h 5m 3s"* and ticks down once a second.
- Every other slot is **filler** (`gui.fill-material` in [config.yml](/plugins/drotatingshop/configuration/config/)).

The title comes from `gui.title` (MiniMessage).

## Item display

Each item's icon shows the real item with a lore panel:

```
Price:  2,500
Stock:  47 remaining      (or "Unlimited", or "Sold Out")
Limit:  1 per rotation    (or "Unlimited")
Click to purchase
```

## Interacting

| Action | Result |
|---|---|
| **Click** an available item | Opens the [buy menu](/plugins/drotatingshop/features/the-buy-menu/) to choose a quantity. |
| **Click** a sold-out item | Nothing — it's greyed-out and inert until the next rotation. |
| **Click** filler / the clock | Nothing. |

If the item is sold out or you've already hit its per-player limit, the click is refused with a message (and a sound) instead of opening the buy menu.

The menu is **live**: it rebuilds for everyone currently viewing it whenever the shop [rotates](/plugins/drotatingshop/features/rotations/) — and once a second to update the clock and live stock.

> If [opening hours](/plugins/drotatingshop/features/opening-hours/) are configured and the market is currently **closed**, `/market` is refused with a countdown to the next opening.
