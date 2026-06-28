---
title: "Requirements"
description: "Nothing. Players need no mod and no resource pack. Gradient text uses vanilla hex colors (Minecraft 1.16+) and the nametag is a vanilla TextDisplay entity…"
---

| Requirement | Version | Notes |
|---|---|---|
| **Paper** | 1.21.x | Spigot is not supported — dNicks uses Paper-only APIs (the chat renderer and `TextDisplay`). |
| **Java** | 17+ | dNicks is built to Java-17 bytecode; Paper 1.21 itself runs on Java 21. |
| **[DzusillCore](https://github.com/dzusill/DzusillCore)** | 1.1.0+ | **Required.** Installed as its own jar — dNicks will not load without it. |

## Optional

| Plugin | Adds |
|---|---|
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | The `%dnicks_name%` family of placeholders, so scoreboards / other chat plugins can render the nick. |
| [EssentialsX](https://essentialsx.net/) | dNicks coexists — its chat renderer runs at `HIGHEST` and wins. See [Integrations](/plugins/dnicks/integrations/). |
| [TAB](https://github.com/NEZNAMY/TAB) | Optional cooperative mode for the tab list. See [Integrations](/plugins/dnicks/integrations/). |

## Client

**Nothing.** Players need no mod and no resource pack. Gradient text uses vanilla hex colors (Minecraft 1.16+) and the nametag is a vanilla `TextDisplay` entity (1.19.4+) — any normal 1.21 client renders everything.

Next: [Installation](/plugins/dnicks/getting-started/installation/).
