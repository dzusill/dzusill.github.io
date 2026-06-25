---
title: "Extra Locations"
description: "A warp can have more than one destination. When a player teleports, WarpGUI picks one location at random from the warp's main location plus all of its extra…"
---

A warp can have more than one destination. When a player teleports, WarpGUI picks **one location at random** from the warp's main location plus all of its extra locations — handy for spreading players across a hub, an arena, or a set of shop stalls.

## Managing extra locations

```
/extralocwarp list   <warp>
/extralocwarp add    <warp>
/extralocwarp edit   <warp> <index>
/extralocwarp remove <warp> <index>
```

| Subcommand | Permission | Behaviour |
|---|---|---|
| `list` | `warpgui.locations.list` | List the warp's extra locations and their indices. |
| `add` | `warpgui.locations.add` | Add **your current position** as a new extra location. |
| `edit` | `warpgui.locations.edit` | Move extra location `<index>` to your current position. |
| `remove` | `warpgui.locations.remove` | Delete extra location `<index>`. |

As a player, `add`/`edit` use **your standing location**. From console you can pass an explicit `World;X;Y;Z` location instead.

## How teleport picks a destination

```
destinations = [ main location ] + [ all extra locations ]
chosen       = random( destinations )
```

So a warp with the main spot plus 3 extra locations sends players to one of **4** places, evenly at random. A warp with no extra locations always uses its main location.

> Extra locations are independent of the warp's icon, category and permission — those still apply to the warp as a whole.
