---
title: "Requirements"
description: "What OberonWhitelist needs to run: Paper 1.21+, Java 21, OberonCore 1.12.1 or newer, and optionally LuckPerms — plus Velocity 3.3+ with LuckPerms for the proxy jar."
---

## Required

| | Version | Notes |
|---|---|---|
| **Server** | Paper 1.21+ | Folia is supported. Plain Spigot is not: the plugin uses Paper's command-tree and unknown-command events, and both are how it does its job. |
| **Java** | 21+ | |
| **OberonCore** | **1.12.1+** | The framework jar. Install it first. |

### Why the core version matters

OberonWhitelist needs core **1.12.1**: it calls `CommandRegistry.owns` (added in 1.11.0), and 1.12.1 is the version it is built and tested against. Running it against an older core jar throws `NoSuchMethodError` the first time a player types a command.

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

Commands the proxy answers itself — Velocity's `/server`, `/glist` and `/velocity`, and those of plugins installed on the proxy, such as `/geyser` — never reach a backend server, so this jar cannot filter them. The companion jar does: `OberonWhitelistProxy.jar`, installed on Velocity, applies the same ranks and the same error to exactly those commands. It needs:

| | Version | Notes |
|---|---|---|
| **Velocity** | 3.3+ | |
| **Java** | 21+ | on the proxy as well |
| **LuckPerms for Velocity** | 5.x | On the same storage as the backend. A proxy grants no permission by itself — without it every player is `default` there and nobody holds the bypass. |

Velocity's clickable-message callback, `/velocity:callback`, is one of those proxy commands: the proxy answers it and it never reaches the backend. What keeps clickable proxy messages working is its entry in the proxy config's `execute-only`, which ships there by default.

→ [Velocity Proxy](/plugins/oberonwhitelist/features/velocity-proxy/)
