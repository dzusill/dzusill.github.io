---
title: "The Shop Menu"
description: "/market (the name is configurable) opens the shop — a 54-slot GUI showing the items on sale this rotation."
---

`/market` (the name is configurable) opens the shop — a 54-slot GUI showing the items on sale this rotation.

## Layout

```
. . . . . . . . .
. ▪ ▪ ▪ ▪ ▪ ▪ ▪ .     items in slots 10–16
. . . . . . . . .
. . . . ⏱ . . . .     countdown clock at slot 31
. . . . . . . . .
. . . . . . . . .
```

- **Items** occupy the seven slots **10–16**. A rotation shows up to 7 items (`items-per-rotation`, capped at 7).
- The **countdown clock** sits at slot **31** — a `CLOCK` that reads *"Next rotation in 1h 5m 3s"* and ticks down once a second.
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
| **Left-click** an item | [Buy it](/plugins/drotatingshop/features/buying/). |
| **Click** a sold-out item | Nothing — it's greyed-out and inert until the next rotation. |
| **Click** filler / the clock | Nothing. |

The menu is **live**: it rebuilds for everyone currently viewing it whenever a purchase happens, stock changes, or the shop [rotates](/plugins/drotatingshop/features/rotations/) — and once a second to update the clock.
