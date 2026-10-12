---
title: "Requirements"
description: "dSusMenu keeps its data in an embedded H2 database in plugins/dSusMenu/data.mv.db. That covers profiles, flags, cases, evidence, notes and the audit log.…"
---

| | |
| --- | --- |
| **Server** | Paper 1.21.x or 26.x (one jar for both). Folia is not supported. |
| **Java** | 21 or newer |
| **Required** | [DzusillCore](/plugins/dzusillcore/) **1.14.4+**. Use one core jar per server; dPhalanx 1.3.0 is built for the same core. |
| **Detections** | **Vulcan** (2.9.7.x, through its public API). Without Vulcan, the list only shows client detections and test flags. |

## Optional

| Plugin | What it adds |
| --- | --- |
| **AdvancedBan** | Mute and ban (temporary or permanent) from the menus and Discord, plus each player's punishment history in their profile. |
| **SimpleVanish** | Teleport and spectate invisibly. dSusMenu toggles it with its command and reads its PlaceholderAPI placeholder. |
| **PlaceholderAPI** | Lets dSusMenu read SimpleVanish's vanish state. |
| **ViaVersion** | The client's real Minecraft version, for profiles and version rules. |
| **LuckPerms** | Permission checks for Discord buttons pressed by staff who are offline in game. |
| **dPhalanx 1.3.0+** | Everything on Discord. See [Discord](/plugins/dsusmenu/features/discord/). |

## Storage

dSusMenu keeps its data in an embedded **H2** database in `plugins/dSusMenu/data.mv.db`. That covers profiles, flags, cases, evidence, notes and the audit log. Nothing needs installing and there are no credentials. Only H2 is supported: any other `type` in `database.yml` stops the plugin with a clear message.

Old data is removed daily according to [`retention`](/plugins/dsusmenu/configuration/config/#retention).
