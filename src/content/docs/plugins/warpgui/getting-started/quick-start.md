---
title: "Quick Start"
description: "Opens the warp GUI. The bottom row has tabs: All Warps, My Warps, Recommended, Favourites, Trending, Categories and Search. Which tab opens first is set by…"
---

## 1. Open the menu

```
/warp
```

Opens the warp GUI. The bottom row has tabs: **All Warps**, **My Warps**, **Recommended**, **Favourites**, **Trending**, **Categories** and **Search**. Which tab opens first is set by `Settings.DefaultMenu` (`all` or `categories`) in [config.yml](/plugins/warpgui/configuration/config/).

## 2. Create a warp

Stand where you want the warp and run:

```
/setwarp spawn
```

You need `warpgui.setwarp` plus a limit permission (e.g. `warpgui.setwarp.max.3`). Optionally pass a category: `/setwarp spawn shops`.

## 3. Edit it from the GUI

Open **My Warps**, **right-click** your warp to open the edit menu, where you can:

- **Change icon** to the item in your hand
- **Edit description** (typed in chat)
- **Choose a category**
- **Toggle hidden / permission-locked**
- **Recommend** the warp (paid promotion)
- **Delete** it

See [Editing Warps](/plugins/warpgui/features/editing-warps/).

## 4. Teleport

Left-click any warp to teleport. There's a short **warmup** (default 3s) that cancels if you move. Some warps may be permission-locked or have several random destinations.

## 5. Favourite & rate

- **Shift-click** a warp in All Warps to add it to your **Favourites**.
- Open a warp's edit/rate menu to give it **1–5 stars**.

## Admin essentials

```
/warpadmin category <warp> <pvp|shops|farms|none>   # assign a category
/warpadmin sethidden <warp>                          # hide/unhide
/warpadmin setpermission <warp>                      # lock/unlock teleport
/warpadmin import <essentials|cmi>                   # import existing warps
/warp reload                                         # reload config & messages
```
