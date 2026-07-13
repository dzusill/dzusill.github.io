---
title: "database.yml"
description: "dFactions persists everything through the Jaloquent ORM, configured in"
---

dFactions persists everything through the Jaloquent ORM, configured in
`plugins/dFactions/database.yml`. **Changes require a full server restart.**

## Default: embedded H2 (no setup)

Out of the box, dFactions uses a file-based **H2** database in MySQL-compatibility mode. No external
server needed.

```yaml
type: h2

h2:
  # Path relative to plugins/dFactions/
  file: data/factions
```

This creates `plugins/dFactions/data/factions.mv.db`. For most servers this is all you need.

## Optional: MySQL / MariaDB

For multi-server setups or external backups. Connection pooling uses HikariCP (bundled).

```yaml
type: mysql

mysql:
  host: localhost
  port: 3306
  database: factions
  username: root
  password: ""
  pool-size: 10
```

**Steps:**

1. Create the database and a user:

   ```sql
   CREATE DATABASE factions CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'factions'@'%' IDENTIFIED BY 'a-strong-password';
   GRANT ALL PRIVILEGES ON factions.* TO 'factions'@'%';
   FLUSH PRIVILEGES;
   ```

2. Set `type: mysql` and fill in the `mysql:` block.
3. **Restart** — tables are created automatically on first connect.

> H2, MySQL Connector/J and HikariCP are all shaded into the plugin jar — you install no driver
> separately.

## Debugging

```yaml
debug:
  # Log every SQL query Jaloquent runs. Very noisy — keep false in production.
  jaloquent-logging: false
```

## Backups

- **H2:** copy `plugins/dFactions/data/` while stopped.
- **MySQL:** `mysqldump factions > factions-backup.sql`.
