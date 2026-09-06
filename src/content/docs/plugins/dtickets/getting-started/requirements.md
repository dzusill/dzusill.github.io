---
title: "Requirements"
description: "Spigot and CraftBukkit are not supported: the plugin is built against the Paper API and uses it."
---

## Server

| | |
|---|---|
| Software | Paper, or Folia — `plugin.yml` declares `folia-supported: true` |
| Minecraft | 1.21 and newer (`api-version: '1.21'`) |
| Java | 21 or newer |

Spigot and CraftBukkit are not supported: the plugin is built against the Paper API and uses it.

## Required plugin

**DzusillCore** must be installed and enabled first. It is a hard `depend`, so the server refuses to
enable dTickets without it — the framework provides the config stack, the message service, the menu
manager, the scheduler and the database layer this plugin builds on.

## Optional integrations

None of these is required. Each one is a `softdepend`: if it is missing, the feature that uses it
switches itself off rather than erroring.

| Plugin | What it adds |
|---|---|
| **PlaceholderAPI** | the `%dtickets_…%` placeholders, and prefix rendering inside ticket chat |
| **PremiumVanish** | vanish levels respected in lists, counts, alerts and tab completion |
| **SuperVanish** | the same, for the free edition |
| **LiteBans** | punishment commands issued from the report menu |
| **Vulcan** | anticheat flags collected as evidence on a report |

Punishments are not tied to LiteBans specifically — the action list runs whatever command you write,
so any punishment plugin with a console command works. See [Punishments](/plugins/dtickets/features/punishments/).

## Storage

H2 is the default and needs nothing installed. MySQL and PostgreSQL are both supported if you would
rather keep tickets in a database you already run — see [Database](/plugins/dtickets/configuration/database/).
