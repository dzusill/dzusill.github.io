---
title: "Requirements"
description: "See Installation next."
---

| Requirement | Version | Notes |
|---|---|---|
| Server | Paper **26.2+** | `api-version: '1.21'` in `plugin.yml` |
| Java | **25+** | |
| OberonCore | required | The DzusillCore framework, shipped under this coordinate. A separate jar, installed first |
| A Tebex store | required for real purchases | Plugin API secret from the Game Servers panel (**not** the webhook secret — they are different keys) |
| PlaceholderAPI | optional | Enables the `%odonations_…%` expansion |
| Vault + an economy plugin | optional | Only needed for GG Wave's `money` reward; falls back to `money-command` without it |
| FancyNpcs, ZNPCsPlus or Citizens | optional | Only for donation boards using `npc.type: skin` — a `head`-type or `TEXT_DISPLAY` board needs none of them |
| Folia | supported | Every scheduled task and per-player effect uses the region-aware scheduler |

## What it never needs

- **An open port.** Polling is the default and supported way to receive purchases. The inbound webhook (`webhook.port`) is optional, off by default, and only worth turning on for lower announcement latency.
- **Write access to Tebex.** The Plugin API secret this plugin uses is only ever sent to read-only endpoints — `/information`, `/payments`, `/community_goals` — never to a queue or command endpoint. Tebex's own plugin remains installed for delivery.

See [Installation](/plugins/oberondonations/getting-started/installation/) next.
