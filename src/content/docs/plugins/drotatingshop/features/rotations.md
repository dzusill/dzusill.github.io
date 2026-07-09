---
title: "Rotations"
description: "The shop's contents change on a timer. Each rotation picks a fresh random set of items from the pool and resets the per-rotation state."
---

The shop's contents change on a timer. Each **rotation** picks a fresh random set of items from the pool and resets the per-rotation state.

## How it works

Every `rotation-interval` seconds (default `3600` = 1 hour), the plugin:

1. **Picks** up to `items-per-rotation` items at random from the pool (max 21 — see [The Shop Menu](/plugins/drotatingshop/features/the-shop-menu/) for how the GUI grows to fit them).
2. **Resets** every player's purchase counts for the new rotation.
3. **Resets** each shown item's global stock to its configured starting value.
4. **Saves** the new state to `data.yml`.
5. **Broadcasts** the `rotation-broadcast` message.
6. **Closes** any open buy menus so nobody can buy into the set that's about to disappear.
7. **Holds** for `rotation-reveal-seconds` (see below), then reveals the new items to every open shop GUI.
8. **Opens** the market for this rotation (see [Opening Hours](/plugins/drotatingshop/features/opening-hours/)).

The timing lives in [config.yml](/plugins/drotatingshop/configuration/config/):

```yaml
shop:
  rotation-interval: 3600         # seconds between rotations
  items-per-rotation: 7           # items per rotation (max 21)
  rotation-reveal-seconds: 3      # hold before the new items appear (0 = instant)
```

## The reveal hold

Instead of items silently swapping under a player's cursor, each rotation opens with a short **hold**: item slots go blank, the clock switches to *"Market is rotating…"* with a live *"Revealing new items in Ns"* countdown, and **buying is blocked** for everyone viewing the shop — including someone who opens `/market` for the first time mid-hold. When the hold ends, the new items appear and purchases work normally again.

Set `rotation-reveal-seconds: 0` to disable the hold entirely — rotations then swap instantly, like before.

## The countdown

The clock in the footer shows the time left until the next rotation (e.g. `1h 5m 3s`) and updates once a second. The same value is available to PlaceholderAPI as [`%drotatingshop_next_rotation%`](/plugins/drotatingshop/placeholders/).

## Forcing a rotation

```
/dshop rotate
```

Rotates immediately and reschedules the next one a full interval out. Handy after adding items, to refresh the shop on demand, or to open the market right now if you use [opening hours](/plugins/drotatingshop/features/opening-hours/).

## Restart-safe

Rotation state is persisted to [data.yml](/plugins/drotatingshop/configuration/data/). When the server restarts mid-rotation, dRotatingShop resumes the **same** rotation with the time it had left — stock, per-player purchases and the open window included. Only when that remaining time has already elapsed does it roll straight into a new rotation.

## Small pools

If the pool has **fewer items than `items-per-rotation`**, the rotation simply shows all of them — no error, no empty duplicates.
