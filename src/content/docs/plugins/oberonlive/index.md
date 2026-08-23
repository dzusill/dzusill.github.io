---
title: "OberonLive"
description: "Safe, configurable live-stream announcements for Paper and Folia, with player opt-outs, H2 or MySQL history, moderation and Discord webhooks."
---

**OberonLive** lets an approved streamer publish a live link with one command. The server validates the destination, stores the event, broadcasts a clickable message to players who want it, and can mirror the same announcement to Discord.

It is built on [DzusillCore](https://github.com/dzusill/DzusillCore), shipped on a server as the required **OberonCore** jar.

## What it does

- 📡 **Live announcements** — `/live <link>` publishes a configurable MiniMessage broadcast with a clickable stream URL.
- 🌐 **Platform-aware validation** — YouTube, Twitch, TikTok and Kick ship by default; owners can define more platforms and hostname rules.
- 🔒 **Safe links** — bare and HTTP input is upgraded to HTTPS before explicit domain, user-info, fragment, port and suffix-spoofing checks.
- ⏱️ **Permission cooldowns** — a default delay plus any number of LuckPerms-managed tiers; the shortest granted tier wins.
- 🔕 **Player opt-out** — `/live toggle` controls receiving only. A muted streamer can still publish and always sees their own announcement.
- 💾 **Required storage** — embedded H2 by default or MySQL, with player preference, lifetime count, full history and persistent blocks.
- 🛡️ **Moderation** — static config blocks and runtime `/olive block` entries for domains or exact URLs.
- 📨 **Discord Incoming Webhook** — configurable identity, plain content, role mention and fully switchable embed sections, sent asynchronously with timeout and retry.
- 🧩 **PlaceholderAPI** — optional placeholders inside broadcasts plus five self-only OberonLive placeholders.
- 🧵 **Paper and Folia scheduling** — SQL and webhook work stays off the server thread; player delivery uses each entity's scheduler.

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper or Folia **1.21–26.x** target range |
| Java | **25+** |
| OberonCore | **1.12.0+**, required as a separate jar |
| PlaceholderAPI | optional, 2.12+ |
| Database | H2 (included through OberonCore) or MySQL |

See [Requirements](/plugins/oberonlive/getting-started/requirements/) for the compatibility details.

## Announcement flow

```text
/live twitch.tv/name
  ├─ permission and loaded player state
  ├─ normalize to HTTPS + configured platform hostname
  ├─ static and database blocklists
  ├─ permission-derived cooldown + global duplicate window
  └─ one database transaction
       ├─ update player stats
       └─ append history
            ├─ Folia-safe in-game broadcast
            └─ asynchronous Discord webhook
```

The game broadcast and webhook are queued only after storage succeeds. A Discord failure never rolls back the saved announcement or suppresses the in-game one.

## Quick links

- [Installation](/plugins/oberonlive/getting-started/installation/)
- [Quick Start](/plugins/oberonlive/getting-started/quick-start/)
- [Live Announcements](/plugins/oberonlive/features/live-announcements/)
- [Platforms & Link Safety](/plugins/oberonlive/features/platforms-and-link-safety/)
- [Cooldowns & Player Opt-out](/plugins/oberonlive/features/cooldowns-and-opt-out/)
- [Discord Webhooks](/plugins/oberonlive/features/discord-webhooks/)
- [History & Moderation](/plugins/oberonlive/features/history-and-moderation/)
- [Commands & Permissions](/plugins/oberonlive/commands-and-permissions/)
- [Configuration](/plugins/oberonlive/configuration/config/)
- [FAQ & Troubleshooting](/plugins/oberonlive/faq/)
