---
title: "Requirements"
description: "Paper 1.21.x and Java 21. DzusillCore is required — OberonMob is a plugin on the framework, not a copy of it."
---

## Server

| | |
|---|---|
| Software | Paper, Purpur or Folia **1.21.x** |
| Java | **21** or newer |

Spigot and CraftBukkit are not supported. OberonMob uses Paper's runtime command registration and Adventure text, neither of which exists on plain Spigot.

Folia is supported (`folia-supported: true`). In hide mode the per-player sweep is dispatched on each player's own region thread, which is where Folia allows their entities to be touched.

## DzusillCore

**Required.** OberonMob is a plugin *on* the framework, not a copy of it — `DzusillCore.jar` must sit in `plugins/` next to it.

| | |
|---|---|
| Minimum version | **1.5.0** |
| Download | [github.com/dzusill/DzusillCore](https://github.com/dzusill/DzusillCore) |

1.5.0 is the version that added the embedded H2 backend OberonMob stores toggles in. If DzusillCore is missing, the server refuses to enable OberonMob and logs `Unknown/missing dependency: DzusillCore`.

## Optional

| | What it adds |
|---|---|
| **PlaceholderAPI** | The `%oberonmob_*%` [placeholders](/plugins/oberonmob/placeholders/). Without it the plugin works fine. |
| **MySQL / PostgreSQL** | Shared toggles across a network, so a player's choice follows them between servers. Without it, toggles live in an H2 file inside the plugin folder. |
| **A permissions plugin** | Not required, but each toggle has its own node and the defaults give both shipped toggles to everyone. |

## What it does *not* need

- **A mob-spawning plugin, or any changes to yours.** OberonMob only ever cancels or hides; it never spawns anything, and it never changes spawn rates for the server as a whole.
- **WorldGuard.** Toggles are per player and radius-based, not region-based.
