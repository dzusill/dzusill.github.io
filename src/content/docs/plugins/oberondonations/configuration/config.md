---
title: "config.yml"
description: "Store connection, currency formatting, the optional webhook listener and purchase consent. Everything player-facing lives in announcements.yml,…"
---

Store connection, currency formatting, the optional webhook listener and purchase consent. Everything player-facing lives in `announcements.yml`, `webhooks.yml`, `goals.yml`, `hype.yml`, `ggwave.yml`, `boards.yml` and `messages.yml` instead — nothing here is hardcoded.

## The whole file

```yaml
debug: false
store-url: store.example.com

format:
  numbers: comma
  money: comma
  money-decimals: 2
  currency-pattern: ''
  currency-symbols: {}
  timezone: UTC

store:
  tebex-secret: ''
  craftingstore-key: ''
  default-currency: USD
  timeout-seconds: 15
  poll:
    enabled: true
    interval-seconds: 60
    limit: 25
    ignore-older-than-hours: 24

webhook:
  port: 0
  tebex-secret: ''
  tebex-path: /tebex
  enforce-tebex-ips: false
  custom-path: /donation
  custom-secret: ''
  custom-fields:
    txn: txn
    player: player
    uuid: uuid
    amount: amount
    currency: currency
    packages: packages
    package-id: id
    package-name: name
    quantity: quantity

commands:
  trigger-allow-console: true
  aliases: []

purchase-consent:
  ask-before-announce: false
  timeout-seconds: 120
  timeout-behavior: none

refresh:
  interval-hours: 3
  run-on-startup: true
  startup-delay-ticks: 100
  exempt-fetch-multiplier: 8
  exempt-fetch-cap: 5000

update-checker:
  enabled: true

config-version: 1
```

## Key reference

### `format`

| Key | Controls |
|---|---|
| `numbers` / `money` | `comma` (`1,234.56`) or `dot` (`1.234,56`) grouping for leaderboards and money |
| `money-decimals` | Decimal places on formatted amounts |
| `currency-pattern` | Layout template understanding `{symbol} {amount} {code}`; blank uses each currency's own real-world convention — see [Currencies](/plugins/oberondonations/features/currencies/#currency-layout) |
| `currency-symbols` | Overrides/adds a symbol for a currency code |
| `timezone` | IANA zone for today/week/month boundaries and donation streaks. Defaults to UTC deliberately — moving hosting regions must not silently redraw every leaderboard boundary |

### `store`

| Key | Controls |
|---|---|
| `tebex-secret` | The **Plugin API** secret (Game Servers panel) — not the webhook secret below |
| `craftingstore-key` | See [Known Limitations](/plugins/oberondonations/limitations/) — unverified, ships disabled |
| `default-currency` | Fallback when a store sends no currency; must match every goal's own `currency` |
| `timeout-seconds` | HTTP timeout for store API calls |
| `poll.*` | See [Purchase Tracking](/plugins/oberondonations/features/purchase-tracking/#polling-default-recommended) |

Blank by design in the shipped file — this file ships inside the jar, and a real secret here would travel with every copy of it, plus the Plugin API key grants command-queue access on Tebex's side. Set it with `/donations setsecret tebex <key>` instead of editing the file directly where practical.

### `webhook`

| Key | Controls |
|---|---|
| `port` | `0` disables the listener entirely (default, recommended) |
| `tebex-secret` | The **webhook** secret (Developers → Webhooks → Endpoints) — different from `store.tebex-secret` |
| `tebex-path` | Path Tebex's deliveries arrive on |
| `enforce-tebex-ips` | Reject senders outside Tebex's published ranges — leave `false` behind a reverse proxy |
| `custom-path` / `custom-secret` / `custom-fields` | The generic signed webhook for any other store — see [Purchase Tracking](/plugins/oberondonations/features/purchase-tracking/#a-generic-webhook-for-any-other-store) |

### `purchase-consent`

| Key | Controls |
|---|---|
| `ask-before-announce` | Prompt the donor before announcing publicly. The purchase is always recorded and counted regardless of their answer |
| `timeout-seconds` | How long they have to answer |
| `timeout-behavior` | `none` (stay private) or `announce` (announce anyway) if they never do |

### `refresh`

Governs the background recompute that keeps leaderboards current without a command being run.

| Key | Controls |
|---|---|
| `interval-hours` / `run-on-startup` / `startup-delay-ticks` | When the recompute runs |
| `exempt-fetch-multiplier` / `exempt-fetch-cap` | A leaderboard over-fetches (rank-count × multiplier, capped) to still fill N slots once exempt/hidden donors are skipped from the results |

### Everything else

`debug: false` — verbose logging for support, safe to leave off. `store-url` — used by `{store}` and the clickable link in chat. `commands.trigger-allow-console` / `commands.aliases` — see [Commands & Permissions](/plugins/oberondonations/commands-and-permissions/). `update-checker.enabled` — parsed but currently does nothing; see [Known Limitations](/plugins/oberondonations/limitations/). `config-version` — internal, do not edit.

## See also

- [Reloading](/plugins/oberondonations/configuration/reloading/)
- [Purchase Tracking](/plugins/oberondonations/features/purchase-tracking/)
- [Currencies](/plugins/oberondonations/features/currencies/)
