---
title: "Installation & Setup"
description: "dPhalanx has three moving parts: the plugin (Minecraft), the API (apps/api), and the Discord bot (apps/bot). This guide sets up all three from scratch. If…"
---

dPhalanx has three moving parts: the **plugin** (Minecraft), the **API** (`apps/api`), and the **Discord bot** (`apps/bot`). This guide sets up all three from scratch. If you already run [dWebLink](/plugins/dweblink/) + the Phalanx API + bot, you only need the new steps marked **(new)**.

---

## 1. Database migration (new)

dPhalanx adds tables (integration config, channel links, tickets, rewards, stats, the plugin outbox, the banned-role tracker). Apply them from the monorepo root:

```bash
pnpm --filter @repo/db db:migrate
```

This runs `prisma migrate dev` and generates the client. Nothing else touches your existing tables.

---

## 2. Service keys & environment (new)

Two shared secrets authenticate the plugin and the bot to the API. They are **not** in `.env.example` yet — add them to your root `.env`:

```bash
# Shared service keys (generate two long random strings)
MC_PLUGIN_API_KEY=<random-string-A>     # the plugin uses this
DISCORD_BOT_API_KEY=<random-string-B>   # the bot uses this

# Already present if the bot ran before — confirm they are set:
DISCORD_BOT_TOKEN=...        # the bot token
DISCORD_CLIENT_ID=...        # the application id (used for ticket-channel bot perms)
DISCORD_GUILD_ID=...         # your Discord server id
TENANT_SLUG=<your-slug>      # must match the plugin's tenant-slug + the DB tenant
API_INTERNAL_URL=http://localhost:3000   # where the bot reaches the API
```

> The API distinguishes the two keys: plugin-only routes (chat relay, stats, tickets/mc, console result) reject the bot key, and bot-only routes (console execute, ban/gateway ingestion) reject the plugin key. Keep them different and secret.

---

## 3. Enable the privileged Message Content intent (new)

Chat sync and ticket replies read message text, which requires a **privileged** Discord intent. In the [Discord Developer Portal](https://discord.com/developers/applications) → your app → **Bot** → **Privileged Gateway Intents**, enable **Message Content Intent** (and keep **Server Members Intent** on for role sync). Without this, Discord→Minecraft chat and Discord-side ticket replies silently never arrive.

---

## 4. Create the Discord channels & roles (new)

In your Discord server, create the channels you want to use (any you skip are simply inactive):

| Purpose | Channel kind |
|---|---|
| Global chat mirror | `CHAT` |
| Staff chat | `STAFFCHAT` |
| Admin chat | `ADMINCHAT` |
| Player reports | `REPORTS` |
| Closed-ticket transcripts | `TICKETS_CLOSED` |
| Ticket ratings | `REVIEWS` |
| Suggestions | `SUGGESTIONS` |
| Remote-console log | `CONSOLE` |
| Join/leave & start/stop (optional; else uses CHAT) | `SERVER_STATUS` |

For tickets you also need a **Discord category** (the parent that ticket channels are created under) and one or more **support roles**.

For the **banned role** feature, create a role (e.g. `Banned`) and set channel permissions so that role can **only** see your appeal/ticket channel.

**Tip — global chat webhook:** for the `CHAT` mirror, create a channel webhook so each mirrored line shows the player's name + skin avatar. Copy its URL for the next step.

---

## 5. Seed the integration (new)

A script writes the per-tenant config row, the channel mappings, and a starter ticket panel/category. Set the channel ids as env vars, then run it:

```bash
DPH_CHANNEL_CHAT=123... \
DPH_CHAT_WEBHOOK_URL=https://discord.com/api/webhooks/... \
DPH_CHANNEL_STAFFCHAT=123... \
DPH_CHANNEL_ADMINCHAT=123... \
DPH_CHANNEL_REPORTS=123... \
DPH_CHANNEL_TICKETS_CLOSED=123... \
DPH_CHANNEL_REVIEWS=123... \
DPH_CHANNEL_SUGGESTIONS=123... \
DPH_TICKET_PARENT_ID=123... \
DPH_SUPPORT_ROLE_ID=123... \
DPH_TIMEZONE=Europe/Bratislava \
pnpm --filter @repo/api seed:discord
```

The seed enables the safe features (chat, tickets, reports, stats, suggestions) and leaves the **risky ones off** (rewards, remote console, ban role). You flip those on later in the `DiscordIntegrationConfig` row (an admin-panel page is planned; until then edit the row directly or extend the seed).

---

## 6. Deploy the API and bot

```bash
pnpm --filter @repo/api build   # then run it (nest / node dist/main)
pnpm --filter @repo/bot build   # then run the bot
```

The API automatically opens the plugin WebSocket at `/ws/plugin` when it starts. The bot pulls its runtime config (channels, flags, roles, ticket categories) from `GET /integration/bot-config` on startup and refreshes every 5 minutes — so most changes need **no bot restart**.

Publish a ticket panel once with the bot's slash command:

```
/panel publish <panelId> <channel>
```

---

## 7. Install & configure the plugin

1. Drop `DzusillCore.jar` and `dPhalanx.jar` into `plugins/`.
2. Start the server once to generate `plugins/dPhalanx/config.yml`.
3. Set the API section — the key must equal the API's `MC_PLUGIN_API_KEY`, and the slug must match `TENANT_SLUG` + the DB tenant:

```yaml
api:
  base-url: "https://your-api-host"   # ws/wss is derived from this
  key: "<MC_PLUGIN_API_KEY>"
  tenant-slug: "<your-slug>"
  ws-path: "/ws/plugin"
```

4. Toggle the features you want (see the [config.yml reference](/plugins/dphalanx/configuration/)). Note: `remote-console.enabled` is `false` by default — it stays off unless you explicitly turn it on **and** enable it on the API side.
5. `/dphalanx reload`, or restart.

---

## 8. Verify

Run `/dphalanx status` in game — it shows the WebSocket connection state, the tenant slug, and the API host. Then:

- Type in Minecraft chat → it appears in the `CHAT` Discord channel.
- Type in that Discord channel → it appears in game.
- `/discord` → a clickable invite.
- `/report SomePlayer testing` → an embed in `REPORTS`.
- Click your ticket panel → a private channel opens; reply from both sides; close it → a transcript lands in `TICKETS_CLOSED`.

If chat only flows one way, re-check the **Message Content intent** (step 3). If nothing flows, check `/dphalanx status` for the WebSocket state and confirm the slug + key match on all three sides.
