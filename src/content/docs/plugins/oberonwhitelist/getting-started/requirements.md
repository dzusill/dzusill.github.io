---
title: "Requirements"
description: "What OberonWhitelist needs to run: Paper 1.21+, Java 21, OberonCore 1.11.0 or newer, and optionally LuckPerms."
---

## Required

| | Version | Notes |
|---|---|---|
| **Server** | Paper 1.21+ | Folia is supported. Plain Spigot is not: the plugin uses Paper's command-tree and unknown-command events, and both are how it does its job. |
| **Java** | 21+ | |
| **OberonCore** | **1.11.0+** | The framework jar. Install it first. |

### Why the core version matters

OberonWhitelist calls `CommandRegistry.owns`, which was added in core **1.11.0**. Running it against an older core jar throws `NoSuchMethodError` the first time a player types a command.

If you are updating an existing server, replace the core jar **before** dropping in this plugin.

Check what you have:

```
/obw version
```

## Optional

| Plugin | What it adds |
|---|---|
| **LuckPerms** | Ranks can be resolved from a player's primary group, so you do not have to assign a permission node per rank. See [Groups & Ranks](/plugins/oberonwhitelist/features/groups/). |
| **DialogMaster** or any menu/GUI plugin | `/obw scan-dialogs` reads its config and tells you which of its commands belong in `execute-only`. See [Menu & Dialog Plugins](/plugins/oberonwhitelist/features/menu-plugins/). |

Neither is required. Without LuckPerms, ranks come from `oberonwhitelist.group.<name>` permission nodes, which every permissions plugin can grant.

## Proxy servers

OberonWhitelist runs on the backend server, and it sees the commands players type there.

Commands handled by the proxy itself — Velocity's `/server`, `/glist` and so on — never reach a backend server, so this plugin cannot filter them. Filter those on the proxy with its own permission system.

Velocity's clickable-message callback (`/velocity:callback`) *does* reach the backend and must keep working, which is why it ships in `execute-only` by default. Leave it there.
