---
title: "Storage & Database"
description: "WarpGUI stores warps and per-player data (favourites, ratings). By default it uses flat files; for cross-server setups you can switch to MySQL or PostgreSQL."
---

WarpGUI stores warps and per-player data (favourites, ratings). By default it uses flat files; for cross-server setups you can switch to MySQL or PostgreSQL.

## Flat files (default)

With the database disabled, data lives in:

```
plugins/WarpGUI/
├── data.yml         # warps
└── playerdata.yml   # favourites & ratings
```

No setup needed — this is the default and works for single servers.

## MySQL / PostgreSQL

Edit `plugins/WarpGUI/database.yml`:

```yaml
enabled: false       # set true to use a database
type: MYSQL          # MYSQL or POSTGRESQL
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
| `enabled` | `true` switches storage to the database; `false` uses flat files. |
| `type` | `MYSQL` or `POSTGRESQL` (DzusillCore has no SQLite backend). |
| `host` / `port` / `database` / `username` / `password` | Connection details. |
| `pool.*` | HikariCP pool tuning. |
| `properties.*` | Extra JDBC connection properties. |

Set `enabled: true`, fill in your connection details, and restart. The schema is created automatically on first connect.

### Upgrading an existing database

2.5.0 adds an `icon` column to `warpgui_warps`, holding the full [warp icon item](/plugins/warpgui/features/editing-warps/#warp-icons). Tables created by an older version are migrated on startup — you'll see this once in the console:

```
[WarpGUI] Added the 'icon' column to warpgui_warps (stores custom warp icon items).
```

No action needed, and no message means the column was already there. To add it by hand instead:

```sql
ALTER TABLE warpgui_warps ADD COLUMN icon TEXT;
```

> **Cross-server:** point several servers at the same database to share warps and player data. Changes made on one server are visible to the others.
