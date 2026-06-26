---
title: "data.yml"
description: "plugins/dRotatingShop/data.yml holds runtime state — the current rotation, live stock, per-player purchases, and the one-time seed flag. It is written…"
---

`plugins/dRotatingShop/data.yml` holds **runtime state** — the current rotation, live stock, per-player purchases, and the one-time seed flag. It is written automatically and **should not be edited by hand**.

```yaml
seeded: true                       # the first-run price seed has happened
rotation:
  started-at: 1700000000000        # epoch millis of the current rotation (drives the open window too)
  active-items:                    # ids on sale this rotation
    - diamond_sword
    - jungle_log
    - diamond
stock-remaining:                   # live global stock per id (-1 = unlimited)
  diamond_sword: 47
  jungle_log: 9
  diamond: -1
player-purchases:                  # per-player buys this rotation (cleared each rotation)
  "550e8400-e29b-41d4-a716-446655440000":
    diamond_sword: 1
```

## What uses it

- **`seeded`** records that the one-time [price seed](/plugins/drotatingshop/configuration/default-prices/) ran, so it never re-seeds automatically. (`/dshop seed` ignores this flag.)
- **`started-at`** drives the countdown, the [open window](/plugins/drotatingshop/features/opening-hours/), and the restart-resume: on boot dRotatingShop continues the same rotation with the time it had left. See [Rotations](/plugins/drotatingshop/features/rotations/).
- **`active-items`** is re-shown after a restart (ids are resolved back against the current pool).
- **`stock-remaining`** and **`player-purchases`** restore live [stock and limits](/plugins/drotatingshop/features/stock-and-limits/) exactly as they were.

It's rewritten on every rotation and every purchase.

> **`/dshop reload` never touches this file.** Reloading re-reads the editable configs only, so the current rotation, stock and purchases are preserved. To wipe runtime state (and re-arm the auto-seed), stop the server, delete `data.yml`, and start again.
