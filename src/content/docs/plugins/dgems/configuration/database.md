---
title: "database.yml"
description: "Standard DzusillCore database configuration. Required — dGems does not enable without it."
---

Standard DzusillCore database configuration. **Required** — dGems does not enable without it.

```yaml
enabled: true
type: mysql          # mysql | postgresql
host: "127.0.0.1"
port: 3306
database: "dgems"
username: "dgems"
password: ""
```

---

## Supported engines

| Engine | `type` | Default port |
|---|---|---|
| MySQL / MariaDB | `mysql` | 3306 |
| PostgreSQL | `postgresql` | 5432 |

Schema files for both ship with the plugin and are applied automatically on first start. You never run them by hand.

## Permissions the user needs

`CREATE TABLE` on the first start (for migrations), then ordinary read/write. A dedicated user for dGems is worth the two minutes — the ledger is the last table you want a different plugin's migration touching.

## What is stored

| Table group | Contents |
|---|---|
| Accounts | one row per player, current balance |
| Ledger | append-only, one row per movement |
| Orders | purchase orders and their status |
| Shop items | name, price, stock |
| Audit | administrative actions with actor |
| External grants | reference ids, for idempotency |

## Networks

Point several servers at the same database and gems are shared. Every spend re-reads the balance inside its transaction, so cross-server double-spending is not possible even with the display cache on.

Set a distinct `orders.server-name` per server so webhook messages are attributable.

## Backups

Back this database up like any other financial record. Restoring an old snapshot rewinds balances **and** the ledger together, which keeps them consistent — restoring only one of them does not.

After any restore, run:

```
/gems admin verify
```

## If the connection fails

dGems refuses to enable. This is deliberate: serving balances it cannot write is worse than being offline. Check the console for the JDBC error, fix it, restart.

## Next

- [messages.yml](/plugins/dgems/configuration/messages/)
