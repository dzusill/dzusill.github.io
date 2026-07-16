---
title: "Commands & Permissions"
description: "Ticket panels also expose buttons (open a category, Claim, Close, Close-Request, star ratings) — these need no permission beyond what the Discord…"
---

## In-game commands (Minecraft)

| Command | Description | Permission | Default |
|---|---|---|---|
| `/discord` | Post a clickable Discord invite | `dphalanx.discord` | everyone |
| `/report <player> <reason>` | Report a player to Discord | `dphalanx.report` | everyone |
| `/ticket create <category>` | Open a ticket (runs a question wizard) | `dphalanx.ticket` | everyone |
| `/ticket reply [<n>] <text>` | Reply to your ticket | `dphalanx.ticket` | everyone |
| `/ticket view <n>` / `list` | View / list your tickets | `dphalanx.ticket` | everyone |
| `/ticket close <n>` | Close your ticket | `dphalanx.ticket` | everyone |
| `/ticket confirm-close <n>` | Confirm a staff close-request | `dphalanx.ticket` | everyone |
| `/ticket review <n> <1-5> [comment]` | Rate a closed ticket | `dphalanx.ticket` | everyone |
| `/claim [daily\|monthly]` | Claim a reward | `dphalanx.claim` | everyone |
| `/suggest <text>` | Submit a suggestion | `dphalanx.suggest` | everyone |
| `/staffchat [message]` | Toggle staff chat, or send one line | `dphalanx.staffchat` | op |
| `/adminchat [message]` | Toggle admin chat, or send one line | `dphalanx.adminchat` | op |
| `/dphalanx reload\|status` | Reload config / show connection status | `dphalanx.admin` | op |

> Tickets, reports, claims, and suggestions require a **linked** account (via [dWebLink](/plugins/dweblink/)) — the API rejects them otherwise with a "link first" message.

## Discord slash commands (bot)

| Command | Description | Who |
|---|---|---|
| `/link <code>` | Link your Discord to your Minecraft account | everyone (from dWebLink's `/linkdiscord` code) |
| `/stats` | Show your Minecraft stats (ephemeral) | linked users |
| `/claim <daily\|monthly>` | Claim a reward (delivered on next join) | linked users |
| `/suggest <text>` | Submit a suggestion | linked users |
| `/ticket create <category>` | Open a ticket from Discord | linked users |
| `/panel publish <panelId> <channel>` | Post/refresh a ticket panel | admin |
| `/priority <low\|normal\|high\|urgent>` | Set ticket priority (in a ticket channel) | staff |
| `/ticket-user <add\|remove> <user>` | Add/remove a user to a ticket | staff |
| `/console <command>` | Run a server command | console role |
| `/suggestion <approve\|deny\|implement> <id> [reason]` | Moderate a suggestion | staff |
| `/supportstats [user]` | Ticket-handling stats for a staff member | staff |

Ticket panels also expose **buttons** (open a category, Claim, Close, Close-Request, star ratings) — these need no permission beyond what the Discord channel/role setup allows.

## Staff & admin gating

"Staff" and "admin" in Discord are the roles set as `staffRoleId` / `adminRoleId` in `DiscordIntegrationConfig` (a Discord Administrator always qualifies). The console role is `consoleRoleId`. In Minecraft, staff/admin chat visibility is the `dphalanx.staffchat` / `dphalanx.adminchat` permission.
