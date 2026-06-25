---
title: "FAQ & Troubleshooting"
description: "That permission only lets them run /setwarp. The actual limit is the highest warpgui.setwarp.max.<n> they have — with none, the cap is 0. Grant e.g.…"
---

### Players can't create warps even with `warpgui.setwarp`

That permission only lets them *run* `/setwarp`. The actual limit is the highest `warpgui.setwarp.max.<n>` they have — with none, the cap is **0**. Grant e.g. `warpgui.setwarp.max.5`, or `warpgui.setwarp.unlimited`. See [Creating Warps](/plugins/warpgui/features/creating-warps/).

### "This warp already exists"

A warp with that name exists. Pick another name, or grant `warpgui.setwarp.overwrite` to replace it.

### WarpGUI won't enable

Install [DzusillCore](https://github.com/dzusill/DzusillCore) first — it's a hard dependency. Check the console for *"unknown/invalid plugin DzusillCore"*.

### A warp says "You do not have permission to teleport"

The warp is permission-locked. Grant `warpgui.teleport.<warpname>` (or `warpgui.teleport.*`), or unlock it with `/warpadmin setpermission <warp>`. See [Teleporting](/plugins/warpgui/features/teleporting/).

### The teleport keeps cancelling

The warmup cancels on movement (`Settings.Teleport.CancelOnMove`). Stand still during the countdown, set `WarmupSeconds: 0`, or grant `warpgui.warmup.bypass`.

### Import says "Failed to load warps from the plugin"

Essentials/CMI isn't installed or enabled. Both are soft dependencies — the importer only works when the source plugin is actually running. See [Importing Warps](/plugins/warpgui/features/importing/).

### Can I share warps across servers?

Yes — enable MySQL/PostgreSQL in `database.yml` and point each server at the same database. See [Storage & Database](/plugins/warpgui/configuration/storage/).

### How do I change which menu `/warp` opens?

Set `Settings.DefaultMenu` to `all` or `categories` in [config.yml](/plugins/warpgui/configuration/config/).

### A warp teleports me to different spots each time

It has [extra locations](/plugins/warpgui/features/extra-locations/) — teleport picks one at random from the main plus extra locations. Remove them with `/extralocwarp remove <warp> <index>`.
