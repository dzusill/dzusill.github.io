---
title: "Configuration"
description: "Configuration lives in two places:"
---

Configuration lives in two places:

- **`plugins/dPhalanx/config.yml`** — how the plugin connects and which in-game features it runs.
- **The admin panel** (*Server → Discord*) — per-tenant Discord feature flags, channel mappings, role ids and the ticket auto-close timers, stored in the database (`DiscordIntegrationConfig` + `DiscordChannelLink`) and read by the API and bot. Requires the `settings` permission. The `pnpm --filter @repo/api seed:discord` script still works for first-time provisioning, but the panel is now the normal way to change any of this.

Ticket **categories** and **panels** remain database-only (seed script or direct DB edit) — they aren't in the admin panel yet.

---

## Plugin `config.yml`

```yaml
api:
  base-url: "https://your-api-host"   # ws/wss scheme + host derived from this
  key: ""                             # must equal the API's MC_PLUGIN_API_KEY
  tenant-slug: "default"              # must match the bot's TENANT_SLUG + the DB tenant
  ws-path: "/ws/plugin"               # inbound WebSocket path

chat-sync:
  enabled: true
  presence: true                      # join/leave + server start/stop lines

staffchat:
  enabled: true
adminchat:
  enabled: true

tickets:
  enabled: true
  max-open-per-player: 3
  wizard-timeout-seconds: 60          # /ticket create question prompts
  # Categories themselves live in the database (see above) — the plugin fetches them at startup.

reports:
  enabled: true
  cooldown-seconds: 60

rewards:
  enabled: false                      # off until you configure the commands below
  link:    ["give %player% diamond 5", "eco give %player% 500"]
  daily:   ["crate key give %player% daily 1"]
  monthly: ["crate key give %player% monthly 1"]

stats:
  enabled: true
  push-interval-minutes: 5

remote-console:
  enabled: false                      # authoritative off switch (also gated API-side)
  blacklist: [stop, restart, reload, op, deop, whitelist, pardon, ban-ip]

suggestions:
  enabled: true

ban-role-sync:
  enabled: false                      # MC ban → Discord "banned" role
  # vanilla / EssentialsX fallback: which commands mean ban / unban
  ban-commands:   [ban, tempban, banip, tempbanip]
  unban-commands: [unban, pardon, unpunish, unbanip]

faction:
  placeholder: "%pvpindex_faction_name%"   # any faction plugin's PAPI placeholder

anticheat-bridge:                     # dSusMenu ↔ Discord anti-cheat bridge
  enabled: true                       # false: events dropped, Discord actions refused (with a reply)
  outbox-size: 500                    # events held while the API is down; beyond it new ones are dropped
```

Notes:

- `api.key` / `api.tenant-slug` must line up with the API (`MC_PLUGIN_API_KEY`) and the bot (`TENANT_SLUG`) and the seeded database tenant. `/dphalanx status` prints the slug + host so you can confirm.
- `remote-console.enabled` and `ban-role-sync.enabled` are **off** by default. Remote console also requires the API flag; ban-role also requires `bannedRoleId` in the database.
- Ticket categories (and their wizard questions) are fetched from the website at startup and on `/dphalanx reload`. The last successful fetch is cached to `plugins/dPhalanx/ticket-categories.yml`, and that cache is loaded *before* the network call — so `/ticket create` keeps working with the last-known-good categories even if the website is unreachable when the server boots. The cache is never overwritten with an empty list.
- `faction.placeholder` works with **any** faction plugin — set it to whatever placeholder that plugin exposes (requires PlaceholderAPI).
- `anticheat-bridge` only matters with **dSusMenu** installed. Events go to `POST /api/v1/anticheat/events` through a bounded in-memory outbox on its own thread (never the main thread), one at a time and in order. While the API is unreachable (network errors, `5xx`, `408`, `425`, `429`) the whole outbox pauses and retries with exponential backoff (1s, 2s, 4s … capped at 30s) for as long as the outage lasts, so nothing is lost to a restart of the website; a delivery is given up only on any other `4xx` (the first one of each event type is logged by name) or when it is still undelivered an hour after it was queued. Replies to Freeze/Kick/Ban go ahead of waiting events in a slot of their own (64), not counted in `outbox-size`. The outage start and end, and one summary line of failures and full-outbox drops, are logged at most once a minute. `enabled` and `outbox-size` both apply on `/dphalanx reload`. Contract: dSusMenu `docs/BRIDGE_CONTRACT.md`.

---

## Admin panel — `DiscordIntegrationConfig` (per tenant)

Edit these under *Server → Discord* in the admin panel. `workingHours` is the one field that isn't
exposed there yet.

| Field | Meaning |
|---|---|
| `chatSyncEnabled` / `presenceEnabled` | global chat mirror / join-leave + start-stop |
| `staffChatEnabled` / `adminChatEnabled` | relay staff/admin chat to Discord |
| `ticketsEnabled` | ticket system |
| `reportsEnabled` | `/report` |
| `suggestionsEnabled` | `/suggest` |
| `statsEnabled` | stats push + `/stats` |
| `rewardsEnabled` | rewards |
| `consoleEnabled` + `consoleRoleId` | remote console (API gate) + the Discord role allowed to use it |
| `banRoleSyncEnabled` + `bannedRoleId` | grant this role to a linked account while banned in MC |
| `staffRoleId` / `adminRoleId` | roles that may reply in tickets / see staff & admin chat |
| `claimLocksTicket` | make a claimed ticket read-only to other support roles |
| `inactivityWarnHours` / `inactivityCloseHours` | auto-close sweep (0 = off) |
| `closeRequestAutoHours` | auto-close after an unanswered close-request |
| `timezone` | tenant timezone for daily/monthly reward periods + working hours |
| `workingHours` | JSON `{enabled, days:{mon:{start,end},…}}` |
| `aiAutoResponseEnabled` | optional AI first-response on ticket open (off) |

---

## Admin panel — `DiscordChannelLink` (channel kinds)

One row per `(tenant, kind)`, editable under *Server → Discord*. `CHAT` may carry a `webhookUrl`
(nicer per-line name+avatar). Clearing a channel field removes the mapping, and that feature then has
nowhere to post.

| Kind | Used by |
|---|---|
| `CHAT` | global chat mirror |
| `STAFFCHAT` / `ADMINCHAT` | staff / admin chat |
| `REPORTS` | `/report` embeds |
| `TICKETS_CLOSED` | closed-ticket transcripts |
| `REVIEWS` | ticket ratings |
| `SUGGESTIONS` | `/suggest` embeds |
| `CONSOLE` | remote-console audit + results |
| `SERVER_STATUS` | join/leave + start/stop (optional; falls back to `CHAT`) |

Ticket **categories** and **panels** are their own tables (`TicketCategory`, `TicketPanel`) — the seed creates a starter Support category + panel when you pass `DPH_TICKET_PARENT_ID`. They drive both the Discord panel buttons/modals and the in-game `/ticket create` wizard. Not yet editable from the admin panel.
