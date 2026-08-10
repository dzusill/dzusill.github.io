---
title: "Requirements"
description: "Paper 1.21.x and Java 21. DzusillCore is required; PremiumVanish and EssentialsX are optional but are what the vanish and AFK features need."
---

## Server

| | |
|---|---|
| Software | Paper, Purpur or Folia **1.21.x** |
| Java | **21** or newer |

Spigot and CraftBukkit are not supported. OberonMSG uses Paper's runtime command registration, Adventure text and the
modern chat event, none of which exist on plain Spigot.

Folia is supported (`folia-supported: true`).

## DzusillCore

**Required.** OberonMSG is a plugin *on* the framework, not a copy of it — `DzusillCore.jar` must sit in `plugins/`
next to it.

| | |
|---|---|
| Minimum version | **1.5.0** |
| Download | [github.com/dzusill/DzusillCore](https://github.com/dzusill/DzusillCore) |

## Optional, and what each adds

| | Adds |
|---|---|
| **PremiumVanish / SuperVanish** | Vanished players are unreachable and invisible in tab completion. Without one, everybody is visible — which is correct, not degraded. |
| **EssentialsX** | The "they might not reply" note when the recipient is away. Without it, no note; nothing else changes. |
| **PlaceholderAPI** | The `%oberonmsg_*%` [placeholders](/plugins/oberonmsg/placeholders/). |
| **MySQL / PostgreSQL** | Shared ignore lists and preferences across a network. Without it, an H2 file inside the plugin folder. |

Run `/oberonmsg status` after installing — it names the vanish and AFK integrations. `none` for either means that
integration is doing nothing, which looks identical to it working until somebody vanishes or goes away.

## What it does *not* need

- **A chat plugin.** Private messages are delivered directly. Public chat is only touched to hide ignored players
  from it, and that can be switched off.
- **EssentialsX for messaging.** If you already run it, switch off the overlapping commands in `config.yml` rather
  than letting load order decide which `/msg` wins.
