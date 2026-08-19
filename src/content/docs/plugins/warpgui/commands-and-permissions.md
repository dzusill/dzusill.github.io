---
title: "Commands & Permissions"
description: "/warpadmin has the alias /wadmin. Commands are registered at runtime by DzusillCore — there are no entries in plugin.yml."
---

## Commands

| Command | Permission | Description |
|---|---|---|
| `/warp` *(alias `/warps`)* | `warpgui.use` | Open the warp menu. |
| `/warp <name>` | `warpgui.use` | Teleport to a warp. |
| `/warp search [query]` | `warpgui.use` | Search warps by name. |
| `/warp reload` | `warpgui.reload` | Reload config & messages. |
| `/setwarp <name> [category]` | `warpgui.setwarp` | Create a warp. |
| `/setserverwarp <name>` | `warpgui.serverwarp` | Create an official [server warp](/plugins/warpgui/features/server-warps/). Alias `/setswarp`. |
| `/delwarp <name>` | `warpgui.delwarp` | Delete a warp. Someone else's needs `warpgui.delwarp.others`; a [server warp](/plugins/warpgui/features/server-warps/) needs `warpgui.serverwarp.delete`. |
| `/extralocwarp <list\|add\|edit\|remove> <warp> [index]` | `warpgui.locations.*` | Manage [extra locations](/plugins/warpgui/features/extra-locations/). |
| `/warpadmin setpermission <warp>` | `warpgui.setpermissions` | Toggle a warp's teleport lock. |
| `/warpadmin sethidden <warp>` | `warpgui.sethidden` | Hide/unhide a warp. |
| `/warpadmin category <warp> <id\|none>` | `warpgui.category` | Assign a category. |
| `/warpadmin setserver <warp>` | `warpgui.serverwarp` | Flag a warp as an official [server warp](/plugins/warpgui/features/server-warps/), or unflag it. |
| `/warpadmin seticon <warp> <material\|oraxen:id>` | `warpgui.edit.material` | Set a warp's icon by name — works from console and reaches [Oraxen](/plugins/warpgui/compatibility/oraxen/) items without holding them. |
| `/warpadmin import <essentials\|cmi>` | `warpgui.exportwarps` | Import warps. |
| `/warpadmin reload` | `warpgui.reload` | Reload config & messages. |

`/warpadmin` has the alias `/wadmin`. Commands are registered at runtime by DzusillCore — there are no entries in `plugin.yml`.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `warpgui.*` | op | Everything below. |
| `warpgui.use` | everyone | Open the menu and teleport. |
| `warpgui.setwarp` | op | Create warps. |
| `warpgui.setwarp.max.<n>` | — | **Warp limit** = highest `<n>` you have. No `max.*` = limit 0. |
| `warpgui.setwarp.unlimited` | op | Bypass the warp limit. |
| `warpgui.setwarp.overwrite` | op | Overwrite an existing warp. |
| `warpgui.delwarp` | op | Delete your own warp. |
| `warpgui.delwarp.others` | op | Delete anyone's warp — except [server warps](/plugins/warpgui/features/server-warps/). |
| `warpgui.edit` | op | Open the edit menu. |
| `warpgui.edit.material` | op | Change a warp's icon. |
| `warpgui.edit.description` | everyone | Change a warp's description. |
| `warpgui.edit.category` | everyone | Change a warp's category. |
| `warpgui.edit.top` | op | Promote (recommend) a warp. |
| `warpgui.edit.others` | op | Edit other players' warps. |
| `warpgui.setpermissions` | op | Toggle a warp's teleport lock. |
| `warpgui.sethidden` | op | Hide/unhide a warp. |
| `warpgui.category` | op | Assign categories via command. |
| `warpgui.serverwarp` | op | Create [server warps](/plugins/warpgui/features/server-warps/) and flag existing ones. |
| `warpgui.serverwarp.delete` | op | Delete a server warp. Required even for its creator. |
| `warpgui.teleport.*` | op | Teleport to every warp, locked ones included. |
| `warpgui.teleport.<warp>` | — | Teleport to one permission-locked warp. |
| `warpgui.locations.list/add/edit/remove` | op | Manage extra locations. |
| `warpgui.warmup.bypass` | op | Skip the teleport warmup. |
| `warpgui.reload` | op | Reload the plugin. |
| `warpgui.exportwarps` | op | Import from Essentials/CMI. |

### Suggested setup

```
# players: open menu, teleport, keep up to 5 warps, edit their own
/lp group default permission set warpgui.use true
/lp group default permission set warpgui.setwarp true
/lp group default permission set warpgui.setwarp.max.5 true
/lp group default permission set warpgui.edit true
/lp group default permission set warpgui.edit.material true
/lp group default permission set warpgui.delwarp true

# VIP: more warps + promote
/lp group vip permission set warpgui.setwarp.max.15 true
/lp group vip permission set warpgui.edit.top true

# staff: everything
/lp group staff permission set warpgui.* true
```

> **Remember the limit gotcha:** `warpgui.setwarp` alone lets a player *run* the command but their cap is **0** until you also grant a `warpgui.setwarp.max.<n>` (or `warpgui.setwarp.unlimited`).
