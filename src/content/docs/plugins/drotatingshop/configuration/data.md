---
title: "data.yml"
description: "plugins/DRotatingShop/data.yml holds runtime state — the current rotation, live stock, and per-player purchases. It is written automatically and should not…"
---

`plugins/DRotatingShop/data.yml` holds **runtime state** — the current rotation, live stock, and per-player purchases. It is written automatically and **should not be edited by hand**.

```yaml
rotation:
  started-at: 1700000000000       # epoch millis of the current rotation
  active-items:                    # ids on sale this rotation
    - diamond_sword
    - legendary_axe
    - diamond
stock-remaining:                   # live global stock per id (-1 = unlimited)
  diamond_sword: 47
  legendary_axe: 3
  diamond: -1
player-purchases:                  # per-player buys this rotation (cleared each rotation)
  "550e8400-e29b-41d4-a716-446655440000":
    diamond_sword: 1
```

## What uses it

- **`started-at`** drives the countdown and the restart-resume: on boot DRotatingShop continues the same rotation with the time it had left. See [Rotations](/plugins/drotatingshop/features/rotations/).
- **`active-items`** is re-shown after a restart (ids are resolved back against the current pool).
- **`stock-remaining`** and **`player-purchases`** restore live [stock and limits](/plugins/drotatingshop/features/stock-and-limits/) exactly as they were.

It's rewritten on every rotation and every purchase.

> **`/dshop reload` never touches this file.** Reloading re-reads `config.yml`/`items.yml`/`messages.yml` only, so the current rotation, stock and purchases are preserved. To wipe runtime state, stop the server, delete `data.yml`, and start again — the next boot begins a fresh rotation.
