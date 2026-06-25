---
title: "Admin Monitoring (PRO)"
description: "PRO adds a staff GUI for inspecting players' gear durability at a glance:"
---

PRO adds a staff GUI for inspecting players' gear durability at a glance:

```
/tn admin
```

Requires `toolsnotifier.pro.admin` (default: op).

## Player list

`/tn admin` opens an **Online Players** menu — one head per online player, sorted by name. Each head's lore shows that player's **worst** gear status:

| Colour | Meaning |
|---|---|
| 🟢 **OK** | All gear above its warn threshold. |
| 🟡 **WARN** | At least one piece in the warn range. |
| 🔴 **CRITICAL** | At least one piece in the critical range. |

Click a head to inspect that player.

## Gear detail

The detail view shows the target's gear:

- **Top row** — equipped items: helmet, chestplate, leggings, boots, main hand, off hand.
- **Below** — every other damageable item in their inventory.

Each item gets an extra lore line — `Durability: remaining/max (percent%)` — coloured by its level. A **Back** button returns to the player list.

This lets staff spot players about to lose valuable gear, or audit durability during events, without touching the player's inventory.

> Read-only: the monitor displays gear but doesn't modify it.
