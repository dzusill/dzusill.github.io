---
title: "Inventory Scan (PRO)"
description: "By default ToolsNotifier only reacts when an item is used. The PRO inventory scan adds a periodic sweep of the player's entire inventory, so a…"
---

By default ToolsNotifier only reacts when an item is **used**. The PRO inventory scan adds a periodic sweep of the player's **entire inventory**, so a low-durability spare in a backpack slot still gets flagged.

```yaml
Settings:
  ProInventoryScan:
    Enabled: true
    IntervalSeconds: 30
```

| Key | Default | Description |
|---|---|---|
| `Enabled` | `true` | Master switch for the periodic scan (PRO only). |
| `IntervalSeconds` | `30` | How often (seconds) the scan runs for each player. |

## How it works

Every `IntervalSeconds`, the scan checks all damageable items a player is carrying against the same [thresholds & categories](/plugins/toolsnotifier/features/thresholds-and-categories/) as normal notifications, and warns about anything low — respecting the per-player [cooldown](/plugins/toolsnotifier/features/how-notifications-work/#cooldown) so it never spams.

## Opting out

- **Server-wide:** set `ProInventoryScan.Enabled: false`.
- **Per player:** each player can turn off **Inventory Scan** in their [Preferences GUI](/plugins/toolsnotifier/features/preferences-gui/). When the admin has disabled it globally, the per-player toggle is locked off.

> This is a PRO-only feature. On the free edition, only in-use items trigger notifications.
