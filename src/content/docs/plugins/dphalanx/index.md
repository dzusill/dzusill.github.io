---
title: "dPhalanx"
description: "dPhalanx is the two-way bridge between your Minecraft server, your Phalanx website/API, and your Discord server. It builds on top of dWebLink (which handles…"
---

**dPhalanx** is the two-way bridge between your **Minecraft server**, your **Phalanx website/API**, and your **Discord server**. It builds on top of [dWebLink](/plugins/dweblink/) (which handles account linking) and adds everything else: live chat sync, staff/admin chat, a full ticket system, reports, `/stats`, remote console, link rewards, suggestions, and a "banned" Discord role.

It is built on the [DzusillCore](https://github.com/dzusill/DzusillCore) framework and, like dWebLink, is a thin client — it talks *out* to the Phalanx API over HTTP and holds a persistent WebSocket for instant inbound events. No player data lives on the plugin.

---

## What it does

- 💬 **Chat sync** — Minecraft chat mirrors to a Discord channel (with the player's LuckPerms rank + faction), and Discord messages appear in game. Join/leave and server start/stop too.
- 🛡️ **Staff & admin chat** — `/staffchat` and `/adminchat` toggle private cross-platform channels synced to dedicated Discord channels.
- 🎫 **Ticket system** — PlexTickets-style: Discord panels with buttons + modal questions, private ticket channels, claim, priority, add/remove user, close with an HTML transcript, ratings, and auto-close on inactivity. Players open and reply from **either** Minecraft (`/ticket`) or Discord.
- 🚩 **Reports** — `/report <player> <reason>` posts an embed to a Discord reports channel.
- 💡 **Suggestions** — `/suggest` posts to a suggestions channel with up/down reactions; staff can approve/deny/implement.
- 📊 **Stats** — `/stats` in Discord shows a linked player's playtime, K/D, balance, rank, faction, and first join.
- 🔗 **`/discord`** — a clickable invite in game.
- 🖥️ **Remote console** — run server commands from Discord (quadruple-gated, off by default).
- 🎁 **Rewards** — one-time link reward + daily/monthly claimables, delivered in game.
- 🔨 **Ban → Discord role** — when a linked player is banned in Minecraft, they get a "banned" Discord role that (via your channel permissions) leaves them able to open an appeal ticket and nothing else.

---

## How the pieces fit

```
 Minecraft (dPhalanx)  ── HTTP POST ──►  Phalanx API  ◄── HTTP POST ──  Discord bot
        ▲                                  │   ▲                          │
        └────────── WebSocket ─────────────┘   │ REST / webhooks          │ gateway events
                (instant inbound events)        ▼                          │  + slash / buttons
                                            Discord server  ◄──────────────┘
```

- **dPhalanx** (this plugin) runs on the Minecraft server: sends chat/reports/tickets/stats out over HTTP, receives Discord chat / ticket replies / console commands over the WebSocket.
- **Phalanx API** is the hub. It owns all outbound Discord delivery (channel messages, webhooks, ticket channels, role grants) and every feature flag.
- **Discord bot** ingests gateway events (messages, interactions) and forwards them to the API. It never touches Minecraft directly.

Everything is keyed by **tenant** (your server community), so one API + one bot can serve many servers.

---

## Requirements

| Requirement | Version / note |
|---|---|
| Server | Paper **1.21.x** |
| Java | **21** |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | **1.1.0+** (installed separately) |
| [dWebLink](/plugins/dweblink/) | required — dPhalanx reuses its account links |
| A running **Phalanx** API + Discord bot | required |
| **LuckPerms** | optional — enables rank in chat / stats |
| A faction plugin (e.g. dFactions) | optional — faction name in chat / stats via a PlaceholderAPI placeholder |

---

## Quick links

- [Requirements](/plugins/dphalanx/getting-started/requirements/)
- [Installation & setup (step by step)](/plugins/dphalanx/getting-started/installation/)
- [Features](/plugins/dphalanx/features/)
- [config.yml reference](/plugins/dphalanx/configuration/)
- [Commands & permissions](/plugins/dphalanx/commands-and-permissions/)
