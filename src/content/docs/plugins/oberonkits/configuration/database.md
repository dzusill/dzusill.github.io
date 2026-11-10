---
title: "database.yml"
description: "Stores, per player: the last kit in each profile, a kit queued for the next respawn, and Stardust kit uses."
---

Stores, per player: the last kit in each profile, a kit queued for the next respawn, and Stardust kit uses.

```yaml
enabled: true
type: H2            # H2, MYSQL or POSTGRESQL
file: data          # H2 file in the plugin folder
host: localhost     # MYSQL / POSTGRESQL only
port: 3306
database: minecraft
username: root
password: ""
pool:
  maximum-pool-size: 4
  connection-timeout-ms: 30000
```

- **H2** (default) is a single file, `plugins/OberonKits/data.mv.db`. Nothing to install.
- **MySQL / PostgreSQL** for a shared database. The table `oberonkits_data` is created on start.
- `enabled: false` writes the same data to `playerdata.yml` instead.

Data is loaded when a player joins and saved on change, off the main thread. Until it has loaded, Stardust
kits wait with the `data-loading` message rather than guess the uses.
