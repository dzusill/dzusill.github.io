---
title: "Placeholders"
description: "With PlaceholderAPI installed, WarpGUI registers the warpgui expansion. Use these anywhere PAPI is supported (scoreboards, tab, chat, holograms)."
---

With [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed, WarpGUI registers the `warpgui` expansion. Use these anywhere PAPI is supported (scoreboards, tab, chat, holograms).

## Counts & ranks

| Placeholder | Returns |
|---|---|
| `%warpgui_total%` | Total number of warps on the server. |
| `%warpgui_player_count%` | Warps owned by the player. |
| `%warpgui_player_rank%` | The player's rank by warp count. |
| `%warpgui_player_favorites%` | How many warps the player has favourited. |

## Featured warp fields

These resolve a warp and then a field on it. Replace `<field>` with one of:
`name`, `owner`, `description`, `item`, `createdat`, `visits`, `rating`.

| Placeholder | Resolves to |
|---|---|
| `%warpgui_topped<field>%` | A **promoted** warp's field, rotating by the current minute (cycles through promoted warps). |
| `%warpgui_newesttopped<field>%` | The most recently promoted warp's field. |
| `%warpgui_newest<field>%` | The most recently created warp's field. |

### Examples

```
%warpgui_toppedname%        -> e.g. "DiamondShop"
%warpgui_toppedowner%       -> e.g. "Steve"
%warpgui_toppedrating%      -> e.g. "4.6"
%warpgui_newestname%        -> the latest warp's name
%warpgui_total%             -> e.g. "128"
```

> When there's no warp to resolve (e.g. nothing promoted yet), the placeholder returns the "no data" token from `messages.yml` (`Warps.NoData`, default `-`).
