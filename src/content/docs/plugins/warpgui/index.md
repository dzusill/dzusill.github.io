---
title: "WarpGUI"
description: "WarpGUI is a player-warp system with a polished, paginated menu. Players create their own warps, browse everyone's in a sortable GUI, favourite the ones…"
---

**WarpGUI** is a player-warp system with a polished, paginated menu. Players create their own warps, browse everyone's in a sortable GUI, favourite the ones they like, rate them, and teleport with a warmup. Server owners get categories, per-warp permissions, recommended (paid) listings and a trending feed.

It is built on the [DzusillCore](https://github.com/dzusill/DzusillCore) framework.

---

## What it does

- 🧭 **Warp menu** — `/warp` opens a tabbed GUI: All Warps, My Warps, Recommended, Favourites, Trending, Categories and Search.
- 📍 **Player warps** — `/setwarp` to create, edit the icon, description and category from a GUI, `/delwarp` to remove.
- ⭐ **Favourites & ratings** — shift-click to favourite; rate warps 1–5 stars.
- 🔥 **Trending & Recommended** — a visit-based trending feed, plus paid "Recommended" promotion that floats a warp to the top.
- 🗂️ **Categories** — admin-defined categories (PvP, Shops, Farms, …) with their own icons and optional view permission.
- 🎯 **Extra locations** — give one warp several destinations; teleports pick one at random.
- 🚪 **Per-warp permissions** — lock a warp so only permitted players can teleport.
- ⏳ **Teleport warmup** — configurable countdown that cancels on movement.
- 🔌 **Imports & placeholders** — import warps from Essentials or CMI, expose stats via PlaceholderAPI.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper **1.21** |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | required (hard dependency) |
| Vault + economy | optional — only for paid "Recommended" promotion |
| Essentials / CMI / CMILib | optional — only for importing existing warps |
| PlaceholderAPI | optional — for placeholders |
| MySQL / PostgreSQL | optional — cross-server storage |

See [Requirements](/plugins/warpgui/getting-started/requirements/).

---

## Quick links

- [Installation](/plugins/warpgui/getting-started/installation/)
- [Quick Start](/plugins/warpgui/getting-started/quick-start/)
- [The Warp Menu](/plugins/warpgui/features/warp-menu/)
- [config.yml reference](/plugins/warpgui/configuration/config/)
- [Commands & Permissions](/plugins/warpgui/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/warpgui/faq/)
