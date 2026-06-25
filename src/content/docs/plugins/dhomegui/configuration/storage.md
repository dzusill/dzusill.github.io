---
title: "Storage & Database"
description: "dHomeGUI keeps homes and player data in memory with an async write-through cache, persisted either to flat files or to a database."
---

dHomeGUI keeps homes and player data in memory with an async write-through cache, persisted either to flat files or to a database.

## Flat files (default)

```
plugins/dHomeGUI/
├── homes.yml        # all homes
└── playerdata.yml   # per-player data (bought slots, last location, etc.)
```

No setup needed — the default for single servers.

## MySQL / PostgreSQL

Edit `plugins/dHomeGUI/database.yml`:

```yaml
enabled: false       # set true to use a database
type: MYSQL          # MYSQL or POSTGRESQL
host: localhost
port: 3306
database: minecraft
username: root
password: ''
```

Set `enabled: true`, fill in the connection details and restart. The schema is created automatically. Point several servers at the same database to share homes across a network.

> DzusillCore supports **MySQL and PostgreSQL** only — there's no SQLite backend.

## Backups

`/dhomeadmin backup` exports a timestamped JSON snapshot of all homes into the plugin folder — handy before switching storage or running mass deletes. See [Admin Tools](/plugins/dhomegui/features/admin-tools/).
