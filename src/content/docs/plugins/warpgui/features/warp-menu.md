---
title: "The Warp Menu"
description: "/warp opens the main menu — a paginated, tabbed GUI for browsing every warp on the server."
---

`/warp` opens the main menu — a paginated, tabbed GUI for browsing every warp on the server.

## Tabs

A navigation bar runs along the bottom row. Each tab is an optional feature you can disable in [config.yml](/plugins/warpgui/configuration/config/):

| Tab | Shows | Toggle |
|---|---|---|
| **All Warps** | Every visible warp, paginated. | always on |
| **My Warps** | The warps you own (left-click to teleport, right-click to edit). | always on |
| **Recommended** | Promoted warps, shown first. | `Settings.Topped.Enabled` |
| **Favourites** | Warps you've favourited. | `Settings.Favorites.Enabled` |
| **Trending** | Popular warps by recent visits. | `Settings.Trending.Enabled` |
| **Categories** | The category list (PvP, Shops, …). | `Settings.Categories.Enabled` |
| **Search** | Prompts for a query. | `Settings.Search.Enabled` |

The tab icons, names and lore all live under `GUI:` in config. Tabs auto-fill the free bottom-row slots (46, 47, 48, 50, 51, 52) unless you pin one with a fixed `Slot`.

## Which tab opens first

`Settings.DefaultMenu` decides the landing tab:

- `all` — open **All Warps** first (categories reachable from the bottom bar).
- `categories` — open the **category list** first (with an "All Warps" button inside).

`categories` only takes effect if the Categories feature is enabled and at least one category exists.

## Interacting with a warp icon

| Action | Result |
|---|---|
| **Left-click** | Teleport (subject to [warmup](/plugins/warpgui/features/teleporting/) and permission). |
| **Shift-click** | Toggle [favourite](/plugins/warpgui/features/favorites-and-ratings/). |
| **Right-click** (in My Warps) | Open the [edit menu](/plugins/warpgui/features/editing-warps/). |

## Decorative filler

The border/background is configurable under `GUI.Filler` — set `Border: true` for an edge-only frame, or `false` to fill every empty slot. Change `Material` to recolour it.
