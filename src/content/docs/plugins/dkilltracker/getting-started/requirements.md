---
title: "Requirements"
description: "Spigot and CraftBukkit are not supported. dKillTracker uses Paper's runtime command registration and Adventure text, neither of which exists on plain Spigot."
---

## Server

| | |
|---|---|
| Software | Paper, Purpur or Folia **1.21.x** |
| Java | **21** or newer |

Spigot and CraftBukkit are not supported. dKillTracker uses Paper's runtime command registration and Adventure text, neither of which exists on plain Spigot.

Folia is fully supported (`folia-supported: true`). Milestone commands are always dispatched on the global region thread, which is the only place Folia allows console commands to run.

## DzusillCore

**Required.** dKillTracker is a plugin *on* the framework, not a copy of it — `DzusillCore.jar` must sit in `plugins/` next to it.

| | |
|---|---|
| Minimum version | **1.2.0** |
| Download | [github.com/dzusill/DzusillCore](https://github.com/dzusill/DzusillCore) |

If DzusillCore is missing, the server refuses to enable dKillTracker and logs `Unknown/missing dependency: DzusillCore`.

## Optional

| | What it adds |
|---|---|
| **PlaceholderAPI** | All `%killtracker_*%` placeholders. Without it the plugin works fine — the placeholders just aren't registered. |
| **MySQL / PostgreSQL** | Shared kill data across a network. Without it, stats live in `kills.yml`. |

No economy plugin and no Vault are needed. dKillTracker never touches money itself — if you want a kill milestone to pay out, put an `eco give %player% 5000` line in the milestone's command list and let your economy plugin do it.

## What it does *not* need

- **A permissions plugin** — not required, but you will almost certainly want one, since the headline feature is running `rank %player% bandit` at a milestone and that command comes from LuckPerms (or whatever you use).
- **WorldGuard** — world-level safezones are built in. Region-level exclusions are not supported.
