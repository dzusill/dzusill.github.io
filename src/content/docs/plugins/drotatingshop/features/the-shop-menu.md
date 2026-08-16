---
title: "The Shop Menu"
description: "/market (the name is configurable) opens the shop — a GUI showing the items on sale this rotation."
---

`/market` (the name is configurable) opens the shop — a GUI showing the items on sale this rotation.

## Layout

By default the GUI **grows to fit** `items-per-rotation` (21 out of the box — a full 3 × 7 grid, the rightmost diagram below) and always centres the items on both axes. Three rows of chrome are fixed — a filler border above the items, a filler border below, and a footer row for the clock — and the item rows (7 per row) sit centred between the borders:

```
7 items (4 rows / 36 slots)      14 items (5 rows / 45 slots)      21 items (6 rows / 54 slots)
. . . . . . . . .                . . . . . . . . .                 . . . . . . . . .
. ▪ ▪ ▪ ▪ ▪ ▪ ▪ .                . ▪ ▪ ▪ ▪ ▪ ▪ ▪ .                 . ▪ ▪ ▪ ▪ ▪ ▪ ▪ .
. . . . . . . . .                . ▪ ▪ ▪ ▪ ▪ ▪ ▪ .                 . ▪ ▪ ▪ ▪ ▪ ▪ ▪ .
. . . . ⏱ . . . .                . . . . . . . . .                 . ▪ ▪ ▪ ▪ ▪ ▪ ▪ .
                                  . . . . ⏱ . . . .                 . . . . . . . . .
                                                                     . . . . ⏱ . . . .
```

- **Items** are packed `gui.items-per-row` per row (7 by default) and centred; a shorter final row (e.g. 3 items) is centred horizontally too, and the whole block is centred between the top and bottom borders.
- The **countdown clock** always sits in the centre of the bottom row — a `CLOCK` that reads *"Next rotation in 1h 5m 3s"* and ticks down once a second.
- Every other slot is **filler** (`gui.fill-material` in [config.yml](/plugins/drotatingshop/configuration/config/)).

### Sizing the grid

Two `gui` keys reshape the grid (see [config.yml → gui](/plugins/drotatingshop/configuration/config/#gui)):

- **`gui.items-per-row`** (default `7`, range 1–9) — the grid width. `7` keeps a filler border down each side; `9` fills a row edge to edge. A wider grid also raises how many items a rotation can show.
- **`gui.rows`** (default `0`) — `0` auto-sizes the inventory to the items; a fixed `4`–`6` pins the height (a chest maxes out at 6 rows). When pinned, the items are centred inside the fixed box and `items-per-rotation` is capped to `items-per-row × (rows − 3)`.

The title comes from `gui.title`; the clock's own text comes from `gui.clock.*` — both MiniMessage, both editable without recompiling.

## While the shop is rotating

When a [rotation](/plugins/drotatingshop/features/rotations/) fires, there's a brief **reveal hold** (`rotation-reveal-seconds`, default 3): the item slots go blank, the clock switches to *"Market is rotating…"* with a live *"Revealing new items in Ns"* countdown, and clicking does nothing. Once the hold ends the new items appear. Set `rotation-reveal-seconds: 0` to skip the hold and swap instantly.

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
| **Click** anywhere during the reveal hold | Nothing — there's nothing to click while items are hidden. |

If the item is sold out or you've already hit its per-player limit, the click is refused with a message (and a sound) instead of opening the buy menu.

The menu is **live**: it rebuilds for everyone currently viewing it whenever the shop [rotates](/plugins/drotatingshop/features/rotations/) (including the reveal hold) — and once a second to update the clock and live stock.

> If [opening hours](/plugins/drotatingshop/features/opening-hours/) are configured and the market is currently **closed**, `/market` is refused with a countdown to the next opening.
