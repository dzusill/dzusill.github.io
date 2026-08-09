---
title: "Requirements"
description: "---"
---

| Requirement | Version | Notes |
|---|---|---|
| Server | Paper / Purpur / Folia **1.21.x** | `folia-supported: true` |
| Java | **21+** | |
| DzusillCore | **required** | hard dependency |
| Phalanx API | **required** | the website that issues and checks the codes |
| LuckPerms | optional | needed for rank sync; without it only the username is pushed |

---

## What you need from the website side

Three values, all found in the Phalanx admin panel:

| Value | Goes into | What it is |
|---|---|---|
| API base URL | `api-base-url` | e.g. `https://api.yourserver.gg` — no trailing slash |
| Plugin API key | `api-key` | must match `MC_PLUGIN_API_KEY` on the API |
| Tenant slug | `tenant-slug` | which website tenant this Minecraft server belongs to |

Without these three, every command answers *"Website linking isn't configured on this server yet."* and nothing else happens. That is deliberate — the plugin refuses to guess.

## Network

The plugin makes **outbound HTTPS calls only**. It never opens a port and never accepts an inbound connection. If your host firewalls outbound traffic, allow the API's host.

All API calls run off the main thread, so a slow or unreachable website cannot lag the server. A failed call becomes a chat message to the player, not a stall.

## Folia

Fully supported. Scheduling goes through DzusillCore's Folia-aware scheduler.

## Next

- [Installation](/plugins/dweblink/getting-started/installation/)
