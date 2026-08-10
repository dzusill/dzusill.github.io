---
title: "Requirements"
description: "Paper 1.21.x, Java 21 and DzusillCore. Nothing else — no database, no optional integrations."
---

## Server

| | |
|---|---|
| Software | Paper, Purpur or Folia **1.21.x** |
| Java | **21** or newer |

Spigot and CraftBukkit are not supported. OberonKills uses Paper's runtime command registration and Adventure text,
neither of which exists on plain Spigot.

Folia is supported (`folia-supported: true`).

**1.21 or newer specifically**, for the mace. On an older server the mace keys simply never fire and everything else
works.

## DzusillCore

**Required.** OberonKills is a plugin *on* the framework, not a copy of it — `DzusillCore.jar` must sit in `plugins/`
next to it.

| | |
|---|---|
| Minimum version | **1.5.0** |
| Download | [github.com/dzusill/DzusillCore](https://github.com/dzusill/DzusillCore) |

## Nothing else

No database. Nothing here needs to survive a restart — the only state is the last blow each player took, and it is
meaningless a few seconds later.

No PlaceholderAPI, no Vault, no economy. Death messages need no permission either; everybody sees them.

## Alongside other plugins

| | |
|---|---|
| **AxKills, DeathMessages, or similar** | Remove it. Two plugins rewriting the death message means whichever runs last wins, and the result depends on load order. |
| **A plugin that suppresses death messages** | Fine — OberonKills sets the message at `HIGH`, so anything running at `HIGHEST` still has the last word. |
| **dKillTracker** | Fine, and complementary. That counts kills; this describes them. |
