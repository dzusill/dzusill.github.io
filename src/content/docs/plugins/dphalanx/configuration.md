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
```

Notes:

- `api.key` / `api.tenant-slug` must line up with the API (`MC_PLUGIN_API_KEY`) and the bot (`TENANT_SLUG`) and the seeded database tenant. `/dphalanx status` prints the slug + host so you can confirm.
- `remote-console.enabled` and `ban-role-sync.enabled` are **off** by default. Remote console also requires the API flag; ban-role also requires `bannedRoleId` in the database.
- Ticket categories (and their wizard questions) are fetched from the website at startup and on `/dphalanx reload`. The last successful fetch is cached to `plugins/dPhalanx/ticket-categories.yml`, and that cache is loaded *before* the network call — so `/ticket create` keeps working with the last-known-good categories even if the website is unreachable when the server boots. The cache is never overwritten with an empty list.
- `faction.placeholder` works with **any** faction plugin — set it to whatever placeholder that plugin exposes (requires PlaceholderAPI).

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
