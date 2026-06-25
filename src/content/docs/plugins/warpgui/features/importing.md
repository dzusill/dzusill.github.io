---
title: "Importing Warps"
description: "Already running Essentials or CMI? Import their warps into WarpGUI in one command — handy when migrating."
---

Already running Essentials or CMI? Import their warps into WarpGUI in one command — handy when migrating.

```
/warpadmin import <essentials|cmi>
```

Requires `warpgui.exportwarps`.

| Source | Needs | Imports |
|---|---|---|
| `essentials` | [Essentials](https://essentialsx.net/) installed & enabled | All Essentials warps. |
| `cmi` | [CMI](https://www.zrips.net/cmi/) + CMILib installed & enabled | All CMI warps. |

On success you'll see *"Imported `<n>` new warps."* (`<n>` = the number of **new** warps added). If the source plugin isn't active, you get *"Failed to load warps from the plugin."*

## Notes

- Imported warps are owned by the server (console), so they appear under All Warps but not any player's My Warps.
- Re-running import only adds warps that don't already exist — it won't duplicate ones you've already imported.
- The integration classes load **only** when the matching plugin is present, so listing `Essentials`/`CMI` as soft dependencies is safe even if you don't use them.
