---
title: "Requirements"
description: "All soft dependencies — the plugin loads without them and disables the related feature."
---

| Requirement | Version | Notes |
|---|---|---|
| Server software | Paper **1.21+** | |
| Java | **21+** | |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | **1.1.0+** | **Hard dependency** — installed separately. |

## Optional integrations

All soft dependencies — the plugin loads without them and disables the related feature.

| Plugin | Enables |
|---|---|
| [Vault](https://www.spigotmc.org/resources/vault.34315/) + an economy plugin | The [money penalty](/plugins/ddeathpenalty/features/money-penalty/) and money-item drop. Without it, money penalties are skipped. |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | The `%dp_…%` [placeholders](/plugins/ddeathpenalty/placeholders/) and leaderboards. |
| [WorldGuard 7](https://dev.bukkit.org/projects/worldguard) | The `death-penalty` [region flag](/plugins/ddeathpenalty/features/worldguard/). |

> **Install DzusillCore first.** Without it, dDeathPenalty stays disabled.

> **WorldGuard note:** the custom region flag must be registered during `onLoad`, before WorldGuard finishes enabling. This happens automatically when WorldGuard is present — no setup needed.
