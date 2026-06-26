---
title: "Reloading"
description: "Requires drotatingshop.admin. It:"
---

```
/dshop reload
```

Requires `drotatingshop.admin`. It:

1. Re-reads **`config.yml`**, **`items.yml`** and **`messages.yml`** from disk.
2. Rebuilds the item pool in memory.
3. **Closes** any open shop GUIs (players just reopen with `/market`).

It does **not** touch [data.yml](/plugins/drotatingshop/configuration/data/) — the current rotation, live stock and per-player purchases all survive a reload.

## What takes effect when

| Change | When it applies |
|---|---|
| `messages.yml` text | Immediately. |
| `gui.title` / `gui.fill-material` | Next time the GUI is opened. |
| New / removed items (`items.yml`, `additem`, `removeitem`) | Eligible from the **next [rotation](/plugins/drotatingshop/features/rotations/)**. |
| Edited `price` | Next rotation for what's shown; already-open GUIs refresh on the next tick. |
| Edited `stock` / `per-player-limit` | Next rotation (the *starting* values; live counts in `data.yml` are untouched). |
| `rotation-interval` | At the next reschedule (the running timer finishes first). |
| `shop.command` (rename) | **Restart only** — the command is registered at startup. |

> Want the changes live right now? Run `/dshop reload` then `/dshop rotate` to start a fresh rotation immediately.
