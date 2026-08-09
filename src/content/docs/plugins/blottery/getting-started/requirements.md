---
title: "Requirements"
description: "---"
---

| Requirement | Version | Notes |
|---|---|---|
| Server | Paper / Purpur / Folia **1.16.5 – 1.21.x** | `api-version: 1.16` |
| Java | **21+** | |
| DzusillCore | **required** | hard dependency |
| MySQL | **required** | rounds, tickets, history and stats |
| Vault | **required** | the economy; on Folia use **VaultUnlocked** |

---

## Why MySQL is required

Everything the plugin promises outlives a restart:

- an open round with tickets already sold
- a payout owed to a player who is currently offline
- lifetime stats and the leaderboard
- round history

A flat file could hold all of that, but not safely across a network and not with the transactional guarantees a payout needs. There is no file-based fallback.

`schema-mysql.sql` ships with the plugin and is applied automatically on first start.

## Vault and Folia

On a regular Paper server any Vault-compatible economy works.

On **Folia**, use **VaultUnlocked** — the original Vault API is not region-thread-safe, and economy calls from a region thread are exactly the case that breaks.

## Storage size

Small. A row per round, a row per ticket, a row per player. A server running a round every few minutes generates a few thousand rows a day, and history is the point of keeping them.

## Networks

Point several servers at the same database and they share rounds, pot, history and stats.

## Next

- [Installation](/plugins/blottery/getting-started/installation/)
