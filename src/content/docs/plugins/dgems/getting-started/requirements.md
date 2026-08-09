---
title: "Requirements"
description: "---"
---

| Requirement | Version | Notes |
|---|---|---|
| Server | Paper / Purpur / Folia **1.21.x** | `folia-supported: true` |
| Java | **21+** | |
| DzusillCore | **required** | hard dependency |
| MySQL **or** PostgreSQL | **required** | there is no flat-file mode |
| PlaceholderAPI | optional | balance placeholders |

---

## Why a database is mandatory

Most economy plugins offer a YAML fallback. dGems does not, deliberately.

The guarantees it makes — atomic balance changes, an append-only ledger, idempotent grants, reconciliation — all rest on SQL transactions. YAML cannot provide them. A flat-file mode would be a currency that *looks* auditable and is not, which is worse than no fallback at all.

If the database is unreachable at startup, dGems refuses to enable rather than serving balances it cannot trust.

## Schema

Shipped as `schema-mysql.sql` and `schema-postgresql.sql`, applied automatically by the migration runner on first start. You do not run them by hand; you only need a database and a user that can create tables in it.

## Sizing

Small. Accounts, a ledger row per transaction, an order row per purchase, an audit row per admin action. A busy server generates a few thousand rows a month.

The ledger is **append-only** and is never pruned — that is the point of it. Budget for it to grow forever, slowly.

## Networks

Point several servers at one database and gems are shared across all of them. Balances are cached per server for display only (`balance-cache-ttl-seconds`, default 3), and every spend re-reads the database, so cross-server double-spending is not possible.

## Folia

Supported. All database work is off the main thread; GUIs are opened on the player's region scheduler.

## Next

- [Installation](/plugins/dgems/getting-started/installation/)
