---
title: "Requirements"
description: "dPhalanx is a client to your Phalanx stack — it does not run standalone. You need the Minecraft side, the web/API side, and Discord all wired together."
---

dPhalanx is a client to your **Phalanx** stack — it does not run standalone. You need the Minecraft side, the web/API side, and Discord all wired together.

## Minecraft server

| Requirement | Version / note |
|---|---|
| Server software | Paper **1.21.x** |
| Java | **21** |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | **1.1.0+** — installed as a separate jar in `plugins/` |
| [dWebLink](/plugins/dweblink/) | required — handles account linking; dPhalanx reuses those links |
| **LuckPerms** | optional — adds the player's rank/prefix to chat and `/stats` |
| A faction plugin | optional — adds the faction name to chat/stats via a configurable PlaceholderAPI placeholder (default `%pvpindex_faction_name%`) |
| A ban plugin | optional — AdvancedBan is hooked automatically for the "banned role" feature; vanilla/EssentialsX bans work via a command fallback |

## Web / API side (Phalanx)

| Requirement | Note |
|---|---|
| Phalanx **API** running | the hub — the plugin and bot both talk to it |
| Phalanx **Discord bot** running | ingests Discord messages/interactions |
| A database migration | `pnpm --filter @repo/db db:migrate` adds the dPhalanx tables |
| Two service keys | `MC_PLUGIN_API_KEY` (plugin) and `DISCORD_BOT_API_KEY` (bot) — different values |

## Discord

| Requirement | Note |
|---|---|
| A bot application | with **Message Content** + **Server Members** privileged intents enabled |
| Channels | one per feature you want (chat, staff/admin, reports, tickets-closed, reviews, suggestions, console) |
| A ticket category + support role(s) | for the ticket system |
| A "banned" role (optional) | for the ban → role feature |

> One API + one bot can serve **many** Minecraft communities — everything is keyed by a tenant slug. The plugin's `tenant-slug`, the bot's `TENANT_SLUG`, and the seeded database tenant must all match.

Next: [Installation & setup](/plugins/dphalanx/getting-started/installation/).
