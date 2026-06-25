---
title: "database.yml"
description: "dLottery stores everything — rounds, tickets, history and player stats — in MySQL/MariaDB. A database is required; there is no flat-file mode."
---

dLottery stores **everything** — rounds, tickets, history and player stats — in MySQL/MariaDB. A database is **required**; there is no flat-file mode.

```yaml
enabled: true
type: MYSQL
host: localhost
port: 3306
database: dlottery
username: root
password: ""

pool:
  maximum-pool-size: 10
  connection-timeout-ms: 30000

properties:
  useSSL: "false"
  characterEncoding: "utf8"
```

| Key | Description |
|---|---|
| `enabled` | Must be `true` — the plugin needs the database. |
| `type` | `MYSQL` (MariaDB is compatible). |
| `host` / `port` / `database` / `username` / `password` | Connection details. |
| `pool.maximum-pool-size` | HikariCP max connections. |
| `pool.connection-timeout-ms` | Connection acquire timeout. |
| `properties.*` | Extra JDBC connection properties. |

## Schema

The tables are created automatically from the bundled `schema-mysql.sql` on first connect — you don't run any SQL by hand. They include the open round, per-round tickets, finished-round history, player stats and pending (offline) payouts.

## Cross-server

Point multiple servers at the same database to run a **network-wide lottery** sharing one pool, tickets and stats. Make sure only the intended server(s) draw — running the draw timer on several servers at once isn't supported.

> Requires MySQL **5.7+** or MariaDB **10.3+**.
