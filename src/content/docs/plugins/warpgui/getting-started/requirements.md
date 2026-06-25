---
title: "Requirements"
description: "All of these are soft dependencies — WarpGUI loads without them and simply disables the related feature."
---

## Server

| Requirement | Version | Notes |
|---|---|---|
| Server software | Paper **1.21** | Spigot works; Paper recommended. |
| Java | **21** | Required by 1.21. |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | latest | **Hard dependency** — WarpGUI won't enable without it. |

## Optional integrations

All of these are soft dependencies — WarpGUI loads without them and simply disables the related feature.

| Plugin | Enables |
|---|---|
| [Vault](https://www.spigotmc.org/resources/vault.34315/) + an economy plugin | Charging for [Recommended](/plugins/warpgui/features/recommended-warps/) promotion. |
| [Essentials](https://essentialsx.net/) | Importing Essentials warps (`/warpadmin import essentials`). |
| [CMI](https://www.zrips.net/cmi/) + CMILib | Importing CMI warps (`/warpadmin import cmi`). |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | The `%warpgui_…%` [placeholders](/plugins/warpgui/placeholders/). |
| MySQL / PostgreSQL | Cross-server [storage](/plugins/warpgui/configuration/storage/) instead of flat files. |

> **Install DzusillCore first.** Put `DzusillCore-x.y.z.jar` in `plugins/` before WarpGUI. If it's missing, the server logs an *"unknown/invalid plugin DzusillCore"* error and WarpGUI stays disabled.
