---
title: "Requirements"
description: "All of these are soft dependencies — WarpGUI loads without them and simply disables the related feature."
---

## Server

| Requirement | Version | Notes |
|---|---|---|
| Server software | Paper **1.21 – 26.3** | Spigot works; Paper recommended. One jar covers the whole range. |
| Java | **21**, or **25** on Paper 26.1+ | Set by the server version, not by the plugin. |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | 1.14.5 or newer | **Hard dependency** — WarpGUI won't enable without it. Update the core jar alongside the plugin; on Paper 26.x 1.14.5 is the minimum, older cores break player-head icons there. |

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
