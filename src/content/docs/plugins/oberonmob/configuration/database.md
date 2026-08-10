---
title: "database.yml"
description: "Where toggle choices are stored. Embedded H2 by default — nothing to install. MySQL for networks."
---

`plugins/OberonMob/database.yml`. **You probably do not need to touch this file.**

## The default: embedded H2

```yaml
enabled: true
type: H2
file: data
```

H2 writes a single file, `plugins/OberonMob/data.mv.db`, created on first connect. No server to install, no credentials. This is the right choice for a single server.

`file` is relative to the plugin's folder. H2 appends `.mv.db` itself, so leave the extension off.

> `host`, `port`, `database`, `username`, `password` and the `properties` block are **ignored** when `type: H2`.

## Turning it off

```yaml
enabled: false
```

The plugin still works — toggles just reset when the server restarts. That is what the old script did, so if you are happy with the current behaviour this loses you nothing.

Everything else is unaffected: the toggles, both strategies, the radius, the entity lists.

## MySQL

Worth it if you run several servers and want a player's toggle choice to follow them.

```yaml
enabled: true
type: MYSQL
host: localhost
port: 3306
database: minecraft
username: root
password: 'secret'
```

Restart after changing this — the backend is chosen at startup. PostgreSQL works too (`type: POSTGRESQL`, port `5432`).

## The table

Created automatically on first start:

```sql
CREATE TABLE IF NOT EXISTS oberonmob_toggles (
    uuid        VARCHAR(36) NOT NULL,
    toggle_key  VARCHAR(32) NOT NULL,
    is_disabled BOOLEAN     NOT NULL,
    updated_at  BIGINT      NOT NULL,
    PRIMARY KEY (uuid, toggle_key)
);
```

One row per player per toggle. A toggle removed from the config simply stops being read — no migration needed, and adding it back brings the old choices with it.

`is_disabled` being `true` means the mobs are **off** for that player.

## When choices are loaded and saved

- **Loaded** on join, asynchronously. A player's first second on the server may run on the defaults.
- **Saved** immediately when they run the command.
- **Dropped from memory** on quit — which matters for performance, not for storage: the row stays.

That last point is worth knowing. The spawn check's fast path is "does anybody have this off", so leaving disconnected players in that set would keep every spawn on the server doing the slow lookup on behalf of somebody who is not even online.

## Networks

Point every server at the same database and a player's toggles follow them. Each server loads them on join, so there is no cross-server cache to go stale.

## Troubleshooting

**`Communications link failure`** — wrong host or port, or the MySQL user isn't allowed to connect from the server's IP.

**Toggles reset every restart** — `enabled: false`, or the database failed to open. Check the console at startup for `Database is off; toggles will reset when the server restarts.`

**Everything reset after switching backends** — expected. There is no import between them.
