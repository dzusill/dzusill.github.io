---
title: "Requirements"
description: "Before installing dFactions, make sure your server meets these requirements."
---

Before installing dFactions, make sure your server meets these requirements.

| Requirement | Details |
|---|---|
| **Server software** | Paper, Folia, or Spigot — **1.21.x** (Paper recommended) |
| **Java** | **21 or newer** — check with `java -version` |
| **Database** | None required. Embedded **H2** is built in. MySQL/MariaDB optional. |
| **RAM** | No special requirement beyond your normal server needs |

## Folia

dFactions is **Folia-aware** (`folia-supported: true`). It never calls the Bukkit scheduler
directly — it uses a platform abstraction with a dedicated Folia implementation — so region-threaded
servers work without extra configuration.

## Optional companions

None of these are required; each integration disables itself gracefully when absent.

- **[Vault](https://www.spigotmc.org/resources/vault.34315/)** + an economy plugin — enables faction
  costs, bank, tax, interest and shield purchases.
- **[PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/)** — exposes faction
  placeholders for scoreboards, tab lists and holograms.
- **WorldGuard / WorldEdit**, **EssentialsX**, **dynmap**, **DiscordSRV**, **LWC/LWCX**, **TeamsAPI**
  — see [Integrations](/plugins/dfactions/integrations/).

Next: **[Installation](/plugins/dfactions/getting-started/installation/)**
