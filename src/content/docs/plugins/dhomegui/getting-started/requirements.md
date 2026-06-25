---
title: "Requirements"
description: "All soft dependencies — dHomeGUI loads without them and disables the related feature."
---

## Server

| Requirement | Version | Notes |
|---|---|---|
| Server software | Paper or **Folia** 1.21.x | Folia is supported natively. |
| Java | **17+** | |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | **1.1.0+** | **Hard dependency** — installed separately on the server. |

## Optional integrations

All soft dependencies — dHomeGUI loads without them and disables the related feature.

| Plugin | Enables |
|---|---|
| [Vault](https://www.spigotmc.org/resources/vault.34315/) + economy | [Economy](/plugins/dhomegui/features/economy/) costs (set / teleport / rename / buy-slot). |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | The `%dhomegui_…%` [placeholders](/plugins/dhomegui/placeholders/). |
| [WorldGuard](https://dev.bukkit.org/projects/worldguard) | Region checks on `/sethome` ([World Rules](/plugins/dhomegui/features/world-rules/)). |
| [LuckPerms](https://luckperms.net/) | Reading the `homes` meta value for [home limits](/plugins/dhomegui/features/home-limits/). |
| [EssentialsX](https://essentialsx.net/) | Importing existing Essentials homes. |
| MySQL / PostgreSQL | Cross-server [storage](/plugins/dhomegui/configuration/storage/). |

> **Install DzusillCore first.** Without it, dHomeGUI stays disabled and the console logs an *"unknown/invalid plugin DzusillCore"* error.

## Folia

dHomeGUI auto-detects Folia and uses its region/entity scheduler for teleports; on regular Paper it falls back to the Bukkit scheduler. No configuration needed — see [Folia Support](/plugins/dhomegui/features/folia/).
