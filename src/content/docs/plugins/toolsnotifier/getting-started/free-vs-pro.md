---
title: "Free vs PRO"
description: "ToolsNotifier comes in two editions built from the same codebase. PRO is a superset of free."
---

ToolsNotifier comes in two editions built from the same codebase. PRO is a superset of free.

| Feature | Free | PRO |
|---|:---:|:---:|
| Warn & Critical notifications | ✅ | ✅ |
| Chat / action bar / title / boss bar channels | ✅ | ✅ |
| Per-category thresholds (Tools / Armor / Elytra) | ✅ | ✅ |
| Per-item overrides | ✅ | ✅ |
| Unbreaking-aware thresholds | ✅ | ✅ |
| Sounds (Warn / Critical) | ✅ | ✅ |
| `/tn status` and `/tn toggle` | ✅ | ✅ |
| PlaceholderAPI placeholders | ✅ | ✅ |
| **Per-player preferences GUI** (`/tn settings`) | — | ✅ |
| **Periodic inventory scan** | — | ✅ |
| **Admin gear monitor** (`/tn admin`) | — | ✅ |

## What the PRO features add

- **[Preferences GUI](/plugins/toolsnotifier/features/preferences-gui/)** — each player opens `/tn settings` and toggles which channels (chat, action bar, title, boss bar, sounds) and the inventory scan they personally receive. Channels an admin disabled globally show as locked.
- **[Inventory scan](/plugins/toolsnotifier/features/inventory-scan/)** — every N seconds, ToolsNotifier scans the whole inventory (not just held/worn items) and warns about anything low. Players can opt out in `/tn settings`.
- **[Admin monitoring](/plugins/toolsnotifier/features/admin-monitoring/)** — `/tn admin` opens a live GUI of online players coloured by their worst gear level; click a player to inspect every durability item they carry.

## Switching

The editions are separate jars. To upgrade, replace `ToolsNotifier.jar` with `ToolsNotifierPro.jar` and restart — your `config.yml` is unchanged and carries over.
