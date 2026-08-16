---
title: "Credits"
description: "Who built it and what it stands on."
---

**OberonUtils** — server utilities for the Oberon network.

Built by **dzusill**.

## Stands on

- **[OberonCore](/plugins/dzusillcore/)** — the framework underneath: modules, the message pipeline,
  configuration, and the platform scheduler that makes the same jar correct on Paper and Folia.
- **Paper** — 26.2 API.
- **Adventure / MiniMessage** — every piece of text in the configs.

## Talks to, when present

| | |
|---|---|
| **PlaceholderAPI** | the `%oberon_keyall_timer%` expansion |
| **PvPManager** | combat state, and the exempt tag fix |
| **WorldGuard** | region rules for teleport bypasses |
| **PremiumVanish** / **SuperVanish** | hiding vanished players from `/ping` |
| **AxKoth** | the KOTH requirement on a warp |
| **DDialogs** | opening your warps screen, and supplying it the live warp list |

None are required. Each is optional, detected at startup, and reported by `/oberonutils hooks`.

## Replaces

Seven Skript files: `Combat`, `KeyAll`, `Kill`, `NightVision`, `Ping`, `Spawn` and `Warp`.

Every message, sound, menu slot, countdown and permission node is reproduced as those scripts
behaved. New options ship switched off, so the first restart changes nothing about how the server
plays — only that the errors stop.
