---
title: "Requirements"
description: "Paper 1.21.x and Java 21. DzusillCore is required — OberonChat is a plugin on the framework, not a copy of it."
---

## Server

| | |
|---|---|
| Software | Paper, Purpur or Folia **1.21.x** |
| Java | **21** or newer |

Spigot and CraftBukkit are not supported. OberonChat uses Paper's runtime command registration and Adventure text, neither of which exists on plain Spigot.

Folia is supported (`folia-supported: true`).

## DzusillCore

**Required.** OberonChat is a plugin *on* the framework, not a copy of it — `DzusillCore.jar` must sit in `plugins/` next to it.

| | |
|---|---|
| Minimum version | **1.5.0** |
| Download | [github.com/dzusill/DzusillCore](https://github.com/dzusill/DzusillCore) |

1.5.0 is the version that added the embedded H2 backend OberonChat stores its violation history in. If DzusillCore is missing, the server refuses to enable OberonChat and logs `Unknown/missing dependency: DzusillCore`.

## Optional

| | What it adds |
|---|---|
| **PlaceholderAPI** | The `%oberonchat_*%` [placeholders](/plugins/oberonchat/placeholders/). Without it the plugin works fine — the placeholders just aren't registered. |
| **MySQL / PostgreSQL** | Shared violation history across a network. Without it, history lives in an H2 file inside the plugin folder. |
| **A punishment plugin** | Only if you use the [violation thresholds](/plugins/oberonchat/features/violations/). The commands they run are yours — `mute`, `kick`, `tempban`, whatever your setup provides. |

## What it does *not* need

- **A chat formatting plugin** — but you almost certainly have one, and that's fine. OberonChat never formats anything; see [What gets checked](/plugins/oberonchat/features/what-gets-checked/) for how the two sit together.
- **A database** — the default is an embedded file. You only touch `database.yml` if you want MySQL.
