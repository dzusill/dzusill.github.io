---
title: "Credits"
description: "Who built OberonWhitelist, what it is built on, and where to get support."
---

## Built by

**dzusill** — [github.com/dzusill](https://github.com/dzusill)

## Built on

**[DzusillCore](/plugins/dzusillcore/)** (shipped as OberonCore) provides the module lifecycle, the comment-preserving config layer, message rendering, the runtime command registry and the service registry this plugin is assembled from.

Version **1.11.0** or newer is required — it adds `CommandRegistry.owns`, which lets a plugin that inspects commands before they run tell the framework's own label rewrite apart from a player typing a namespaced command to get around a list.

## Works with

| | |
|---|---|
| **LuckPerms** | optional — ranks can resolve from primary groups |
| **DialogMaster** and other menu plugins | optional — `/obw scan-dialogs` reads their configs |

Neither is required.

## Support

Bug reports and questions: [github.com/dzusill](https://github.com/dzusill)

When reporting a problem, the output of `/obw check <player> <command>` answers most of the questions that would otherwise be asked first.
