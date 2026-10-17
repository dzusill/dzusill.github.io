---
title: "Requirements"
description: "Each of these is checked when the plugin starts, before anything that talks to it is created. The console says once which ones are used, for example:"
---

| | |
| --- | --- |
| **Server** | Paper 1.21.x or 26.x (one jar for both). Folia is not supported. |
| **Java** | 21 or newer |
| **Required** | **OberonCore 1.14.4+**. Keep it at the same version as any DzusillCore jar on the same server. |
| **Detections** | **Vulcan** (2.9.7.x, through its public API). Without Vulcan, the list only shows client detections and test flags. |

## Optional

| Plugin | What it adds |
| --- | --- |
| **LiteBans** | Kick, mute and ban (temporary or permanent) from the menus, silently with `-s`, and a check that LiteBans really applied them. A click in the profile opens LiteBans' `/history`. |
| **PremiumVanish** | Teleport and spectate invisibly. OberonSusMenu vanishes you through its API. |
| **ViaVersion** | The client's real Minecraft version, for profiles and version rules. |
| **Floodgate** | Recognises Bedrock players through its API too, including linked accounts. Without it, Bedrock players are still recognised by their Floodgate UUID. |

Each of these is checked when the plugin starts, before anything that talks to it is created. The console says once which ones are used, for example:

```
[OberonSusMenu] Vanish for spectate/teleport: PremiumVanish.
[OberonSusMenu] Floodgate found: Bedrock players are marked in /sus.
[OberonSusMenu] Listening to Vulcan flags.
```

### Without LiteBans

Mute and ban still run the commands in [`punishments.commands`](/plugins/oberonsusmenu/configuration/config/#punishments), but without `-s` and without the check that they were applied. Kick is a plain kick.

### Without PremiumVanish

Set `vanish.enable-command` and `disable-command` to another vanish plugin's commands, or use `vanish.fallback-hide`. With none of them, teleport and spectate work without vanish. See [`vanish`](/plugins/oberonsusmenu/configuration/config/#vanish).

## Storage

OberonSusMenu keeps its data in an embedded **H2** database in `plugins/OberonSusMenu/data.mv.db`. That covers profiles, flags, cases, evidence, notes and the audit log. Nothing needs installing and there are no credentials. Only H2 is supported: any other `type` in `database.yml` stops the plugin with a clear message.

Old data is removed daily according to [`retention`](/plugins/oberonsusmenu/configuration/config/#retention).
