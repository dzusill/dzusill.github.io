---
title: "Installation"
description: "WarpGUI depends on DzusillCore. Drop DzusillCore-x.y.z.jar into plugins/ first."
---

## 1. Install DzusillCore

WarpGUI **depends** on [DzusillCore](https://github.com/dzusill/DzusillCore). Drop `DzusillCore-x.y.z.jar` into `plugins/` first.

## 2. Drop in WarpGUI

Place `WarpGUI.jar` into `plugins/` and restart the server. On first start it creates:

```
plugins/WarpGUI/
├── config.yml        # settings, categories, GUI layout
├── messages.yml      # all player-facing text + sounds
├── database.yml      # optional MySQL/PostgreSQL storage
├── data.yml          # flat-file warp storage (when database disabled)
└── playerdata.yml    # favourites & ratings (flat-file)
```

## 3. Grant permissions

By default players can **open** the menu and teleport (`warpgui.use`), but **cannot create warps** until you grant a limit. Warp limits are permission-based:

```
# allow the default group to create up to 3 warps
/lp group default permission set warpgui.setwarp true
/lp group default permission set warpgui.setwarp.max.3 true
```

See [Commands & Permissions](/plugins/warpgui/commands-and-permissions/) for the full list and [Creating Warps](/plugins/warpgui/features/creating-warps/) for how limits work.

## 4. Verify

```
/warp
```

The warp menu should open. Then:

```
/setwarp home
```

creates your first warp at your location. Tune categories, GUI icons and the teleport warmup in [config.yml](/plugins/warpgui/configuration/config/).

Next: the [Quick Start](/plugins/warpgui/getting-started/quick-start/).
