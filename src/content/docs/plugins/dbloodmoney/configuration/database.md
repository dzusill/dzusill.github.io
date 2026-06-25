---
title: "database.yml"
description: "By default the PRO edition saves stats and bounties to flat files (stats.yml, bounties.yml). For a single server that's all you need. Switch to a database…"
---

> **PRO only.** The free edition stores nothing and ignores this file. Stats and bounties are PRO features.

By default the PRO edition saves stats and bounties to flat files (`stats.yml`, `bounties.yml`). For a **single server** that's all you need. Switch to a database when you run a **network** and want stats/bounties shared across servers.

## File

`plugins/dBloodMoney/database.yml`:

```yaml
enabled: false
type: MYSQL
host: localhost
port: 3306
database: minecraft
username: root
password: ''
pool:
  maximum-pool-size: 10
  connection-timeout-ms: 30000
properties:
  useSSL: 'false'
  characterEncoding: 'utf8'
```

| Key | Description |
|---|---|
| `enabled` | `false` = flat files. `true` = use the database below. |
| `type` | `MYSQL` or `POSTGRESQL`. (No SQLite.) |
| `host` / `port` / `database` | Connection target. |
| `username` / `password` | Credentials. |
| `pool` | HikariCP connection pool tuning. |
| `properties` | Extra JDBC properties. |

## Enabling a database

1. Create an empty database (e.g. `CREATE DATABASE minecraft;`).
2. Set `enabled: true` and fill in `host`, `database`, `username`, `password`.
3. Restart the server.

On startup dBloodMoney creates its tables automatically:

| Table | Holds |
|---|---|
| `dbloodmoney_stats` | Per-player kills, deaths, earnings, best streak. |
| `dbloodmoney_bounties` | Pooled bounty per target. |

You should see:

```
[dBloodMoney] Connected to MYSQL database.
```

## Switching back to flat files

Set `enabled: false` and restart. The plugin reads from `stats.yml` / `bounties.yml` again.

> **Migration** between flat files and SQL is not automatic — pick your backend before going live, or copy data manually.
