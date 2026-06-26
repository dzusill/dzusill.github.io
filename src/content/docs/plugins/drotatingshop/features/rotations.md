---
title: "Rotations"
description: "The shop's contents change on a timer. Each rotation picks a fresh random set of items from the pool and resets the per-rotation state."
---

The shop's contents change on a timer. Each **rotation** picks a fresh random set of items from the pool and resets the per-rotation state.

## How it works

Every `rotation-interval` seconds (default `3600` = 1 hour), the plugin:

1. **Picks** up to `items-per-rotation` items at random from the pool (max 7 — the GUI's item slots).
2. **Resets** every player's purchase counts for the new rotation.
3. **Resets** each shown item's global stock to its configured starting value.
4. **Saves** the new state to `data.yml`.
5. **Broadcasts** the `rotation-broadcast` message.
6. **Refreshes** every open shop GUI to the new items.

Both values live in [config.yml](/plugins/drotatingshop/configuration/config/):

```yaml
shop:
  rotation-interval: 3600     # seconds between rotations
  items-per-rotation: 7       # items per rotation (max 7)
```

## The countdown

The clock at slot 31 shows the time left until the next rotation (e.g. `1h 5m 3s`) and updates once a second. The same value is available to PlaceholderAPI as [`%drotatingshop_next_rotation%`](/plugins/drotatingshop/placeholders/).

## Forcing a rotation

```
/dshop rotate
```

Rotates immediately and reschedules the next one a full interval out. Handy after adding items, or to refresh the shop on demand.

## Restart-safe

Rotation state is persisted to [data.yml](/plugins/drotatingshop/configuration/data/). When the server restarts mid-rotation, DRotatingShop resumes the **same** rotation with the time it had left — stock and per-player purchases included. Only when that remaining time has already elapsed does it roll straight into a new rotation.

## Small pools

If the pool has **fewer items than `items-per-rotation`**, the rotation simply shows all of them — no error, no empty duplicates.
