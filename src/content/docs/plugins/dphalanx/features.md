---
title: "Features"
description: "Every feature is gated by a per-tenant flag in the database (DiscordIntegrationConfig) and by the plugin's config.yml, so you can roll them out one at a…"
---

Every feature is gated by a per-tenant flag in the database (`DiscordIntegrationConfig`) **and** by the plugin's `config.yml`, so you can roll them out one at a time. The riskier ones (rewards, remote console, ban role) ship **off**.

## 💬 Chat sync

Minecraft chat is mirrored to a Discord channel and vice-versa.

- **MC → Discord**: each line is sent to the `CHAT` channel. If you set a channel **webhook**, the line renders with the player's name and skin avatar, and their **LuckPerms rank + faction** as the label (`[Owner] Steve [Knights]: hello`). Mentions and markdown in player text are neutralised so chat can't ping `@everyone` or break formatting.
- **Discord → MC**: messages in the `CHAT` channel appear in game as `[Discord] Name: message`. Discord text is inserted as literal text — it can never be interpreted as a color/format code.
- **Presence**: join/leave lines and server start/stop notices (to `SERVER_STATUS`, or `CHAT` if unset). If the server crashes, the API posts an "offline" note when the plugin's heartbeat lapses.

## 🛡️ Staff & admin chat

`/staffchat` toggles you into a private staff channel: your normal chat is rerouted to everyone with the staff permission **and** mirrored to the `STAFFCHAT` Discord channel (which you lock to staff roles in Discord). `/staffchat <message>` sends one line without toggling. `/adminchat` is the same for admins.

## 🎫 Tickets

A ticket system modeled on PlexTickets, usable from **both** sides:

- **Panels** — a Discord embed with buttons or a dropdown, posted with `/panel publish`. Each button/option is a **category**.
- **Categories** (Discord side, in the database) — name, emoji, button color, the Discord category ticket channels spawn under, support roles, required roles, a channel-name template, a welcome message, and up to **5 modal questions** asked when opening.
- **Opening** — in Discord, click a panel button → fill the modal → a **private channel** opens (only you + support roles can see it). In Minecraft, `/ticket create <category>` runs a short chat wizard against its own category list, configured locally in the plugin's `config.yml` (`tickets.categories`) — independent of the Discord-side categories above.
- **In the ticket** — Claim 🙋, Close 🔒, and Close-Request ⏳ buttons; `/priority`, `/ticket-user add|remove`. Replies flow both ways: staff replies in Discord show privately to the player in game; the player replies with `/ticket reply` or from the channel.
- **Lifecycle** — optional auto-close on inactivity (with a warning first), staff close-requests the player confirms, and configurable working hours.
- **Closing** — the channel is deleted and a full **HTML transcript** (built from stored messages) is posted to `TICKETS_CLOSED`. The opener is then DM'd a **1–5 star rating** prompt; ratings land in `REVIEWS`.
- **Offline players** — staff replies are queued and delivered when the player next joins ("you have N unread ticket replies").

## 🚩 Reports

`/report <player> <reason>` (60-second cooldown) posts an embed to the `REPORTS` channel with reporter, target, reason, and server time.

## 💡 Suggestions

`/suggest <text>` (in game or via the bot) posts to `SUGGESTIONS` with 👍/👎 reactions. Staff run `/suggestion approve|deny|implement <id> [reason]` — the embed recolors and the suggester is notified.

## 📊 Stats

The plugin pushes a stats snapshot (playtime, kills, deaths, balance, rank, faction, first join) on join/quit and every few minutes. In Discord, a linked player runs `/stats` for an ephemeral embed — it works even while the server is offline ("as of <time>").

## 🔗 /discord

Shows a clickable invite in game (from the tenant's Discord invite URL).

## 🖥️ Remote console

Run server commands from Discord with `/console <command>`. Quadruple-gated: the plugin config must allow it, the command must pass the plugin's blacklist, the Discord user must have the console role, and the API flag must be on. Every command is audited; a queued command that isn't delivered within 5 minutes expires (so a stale `stop` never fires after a reconnect). Off by default.

## 🎁 Rewards

A one-time **link reward** plus **daily** and **monthly** claimables for linked players. Rewards are lists of console commands in the plugin config (`%player%` is substituted). `/claim [daily|monthly]` in game, or a Discord slash command (delivered on next join). One claim per period is guaranteed even under concurrent clicks. Off by default.

## 🔨 Ban → Discord role

When a linked player is **banned in Minecraft**, dPhalanx grants them a configured **"banned" Discord role**. You set that role's Discord permissions so a banned member can see only your appeal/ticket channel — they can still open a ticket to appeal, but nothing else. Unban removes the role; a temporary ban removes it automatically when it expires.

Detection: **AdvancedBan** is hooked automatically (via its Bukkit punishment events); **vanilla/EssentialsX** bans are caught via a command fallback that reads the server ban list. (LiteBans support is a small follow-up — ask if you use it.) Off by default.

## 🎖️ Rank → role sync

Already handled by [dWebLink](/plugins/dweblink/) + the API's rank-role mapping — a player's LuckPerms group grants the mapped Discord role. dPhalanx doesn't duplicate it.
