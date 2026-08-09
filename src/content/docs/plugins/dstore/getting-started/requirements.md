---
title: "Requirements"
description: "DzusillCore is not required. dStore is deliberately standalone — it is the one plugin in the stack that must keep working even if the framework is being…"
---

| Requirement | Version | Notes |
|---|---|---|
| Server | Paper / Purpur / Folia **1.21.x** | `folia-supported: true` |
| Java | **21+** | |
| Phalanx API | **required** | issues the fulfilment jobs |
| LuckPerms | optional | required only for entitlement grant/revoke actions |
| Disk | a few MB | for `receipts.db` |

**DzusillCore is not required.** dStore is deliberately standalone — it is the one plugin in the stack that must keep working even if the framework is being upgraded.

---

## Credentials

Created once in **Admin → Store → Settings** on the website:

| Value | Config key |
|---|---|
| Installation ID | `installation-id` |
| Installation secret | `secret` |
| API base URL | `api-base-url` |

> ⚠️ **Never reuse dWebLink's API key here.** They are different credentials with different scopes. A store installation can grant ranks and items; an account-linking key cannot, and should not be able to.

## Network

Outbound HTTPS only. dStore opens no ports and accepts no inbound connections — nothing to expose, nothing to firewall inbound.

Default cadence: a poll every **5 seconds**, a heartbeat every **60**. Both are configurable.

## Storage

A single SQLite file, `receipts.db`, in the plugin folder. It uses WAL journalling with `synchronous=FULL`, so a receipt is on disk before dStore reports success — the property the whole design rests on.

**Back it up with your world.** Losing it means a retry of an in-flight job can double-deliver.

## Folia

Supported. Actions that must touch the main thread (giving items, running commands) are scheduled onto the correct region scheduler and bounded by `execution.main-thread-timeout-seconds`.

## Next

- [Installation](/plugins/dstore/getting-started/installation/)
