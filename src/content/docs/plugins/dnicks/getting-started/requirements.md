---
title: "Requirements"
description: "Nothing. Players need no mod and no resource pack. Gradient text uses vanilla hex colors (Minecraft 1.16+) — any normal 1.21 client renders everything."
---

| Requirement | Version | Notes |
|---|---|---|
| **Paper** | 1.21.x | Spigot is not supported — dNicks uses Paper-only APIs (the async chat renderer). |
| **Java** | 17+ | dNicks is built to Java-17 bytecode; Paper 1.21 itself runs on Java 21. |
| **[DzusillCore](https://github.com/dzusill/DzusillCore)** | 1.1.0+ | **Required.** Installed as its own jar — dNicks will not load without it. |

## Optional

| Plugin | Adds |
|---|---|
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | The `%dnicks_name%` family of placeholders, so scoreboards / other chat plugins can render the nick. |
| [EssentialsX](https://essentialsx.net/) | dNicks coexists — its chat renderer runs at `HIGHEST` and wins. See [Integrations](/plugins/dnicks/integrations/). |
| [TAB](https://github.com/NEZNAMY/TAB) | Renders the nametag above the head (and optionally the tab list) from `%dnicks_name%`, keeping your role prefix. See [Integrations](/plugins/dnicks/integrations/). |

## Client

**Nothing.** Players need no mod and no resource pack. Gradient text uses vanilla hex colors (Minecraft 1.16+) — any normal 1.21 client renders everything.

Next: [Installation](/plugins/dnicks/getting-started/installation/).
