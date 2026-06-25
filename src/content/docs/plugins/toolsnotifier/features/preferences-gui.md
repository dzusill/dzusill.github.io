---
title: "Preferences GUI (PRO)"
description: "On the PRO edition, players run:"
---

On the PRO edition, players run:

```
/tn settings
```

to open a personal **Notification Preferences** menu (requires `toolsnotifier.pro.settings`, default: everyone). Each player decides which channels they want, without affecting anyone else.

## The toggles

The 27-slot menu has seven toggles:

| Toggle | Controls |
|---|---|
| **Chat** | Chat-message notifications. |
| **Action Bar** | Action-bar notifications. |
| **Title** | Title notifications. |
| **Boss Bar** | Boss-bar notifications. |
| **Warn Sound** | The Warn-level sound. |
| **Critical Sound** | The Critical-level sound. |
| **Inventory Scan** | The PRO [inventory scan](/plugins/toolsnotifier/features/inventory-scan/) for this player. |

Click a toggle to flip it: a **green** pane means enabled, **red** means disabled. The setting saves immediately (to `players.yml`) and persists across sessions.

## Admin-locked channels

A toggle is only available if the admin has enabled that channel **globally** in [config.yml](/plugins/toolsnotifier/configuration/config/). If an admin turned a channel off (e.g. `Settings.BossBar.NotifyInBossBar: false`), it appears as a greyed-out **"Disabled by admin"** barrier that players can't switch on. This keeps server-wide policy in charge while still letting players opt **out** of channels that are on.

> The free edition's `/tn toggle` is all-or-nothing; the PRO Preferences GUI is the per-channel version of it.
