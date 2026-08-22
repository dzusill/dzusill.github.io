---
title: "database.yml"
description: "Configure OberonLive's mandatory embedded H2 or external MySQL storage and understand which state is held in each table."
---

OberonLive requires storage. The default is an embedded H2 file and needs no database server:

```yaml
enabled: true
type: H2
file: data

host: localhost
port: 3306
database: minecraft
username: root
password: ""

pool:
  maximum-pool-size: 10
  connection-timeout-ms: 30000

properties:
  useSSL: "false"
  characterEncoding: "utf8"
  serverTimezone: "UTC"
```

The H2 path is relative to `plugins/OberonLive/`; `file: data` creates `data.mv.db`.

## MySQL

```yaml
enabled: true
type: MYSQL
host: 127.0.0.1
port: 3306
database: minecraft
username: oberonlive
password: "replace-me"
```

Create the database and account before starting the plugin. The account needs permission to create tables and indexes and to select, insert, update and delete rows in that database.

## Tables

| Table | Stores |
|---|---|
| `oberonlive_players` | UUID, last name, receiving state, cooldown time, last stream and lifetime count |
| `oberonlive_announcements` | complete live history and normalized duplicate key |
| `oberonlive_blocks` | persistent domain and exact-URL moderation entries |

The player state update and new history event are committed in one transaction. SQL values use prepared statements.

## Connection changes need a restart

`/olive reload` deliberately does not rebuild the connection pool. Changes to `enabled`, `type`, file, host, port, database, credentials, pool or driver properties take effect after a full server restart.

If storage cannot initialize, OberonLive fails to enable. Check the first database exception in the console; later `not-ready` messages are a consequence, not the root cause.

## Migration

There is no PerfLive SQLite import or legacy schema adapter. OberonLive starts with its own new H2/MySQL schema.

