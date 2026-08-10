---
title: "database.yml"
description: "Where violation history lives. Embedded H2 by default — nothing to install, no credentials. MySQL and PostgreSQL for networks."
---

`plugins/OberonChat/database.yml`. **You probably do not need to touch this file.**

## The default: embedded H2

```yaml
enabled: true
type: H2
file: data
```

H2 writes a single file, `plugins/OberonChat/data.mv.db`, created on first connect. No server to install, no credentials, no setup. This is the right choice for a single server.

`file` is relative to the plugin's folder. H2 appends `.mv.db` itself, so leave the extension off.

> `host`, `port`, `database`, `username`, `password` and the `properties` block are **ignored** when `type: H2`. H2's driver rejects settings it does not recognise, so they are not passed to it at all.

## Turning it off

```yaml
enabled: false
```

The plugin still works. Violation totals live in memory and reset when the server restarts, and `/oberonchat history` falls back to the short in-memory window.

You lose two things worth having: history for staff to review, and totals surviving a restart — which means reconnecting becomes a way to shed an in-progress escalation.

## MySQL

Only worth it if you run several servers that should share violation history.

```yaml
enabled: true
type: MYSQL
host: localhost
port: 3306
database: minecraft
username: root
password: 'secret'
pool:
  maximum-pool-size: 10
  connection-timeout-ms: 30000
properties:
  useSSL: 'false'
  characterEncoding: 'utf8'
```

Restart after changing this — the backend is chosen at startup.

PostgreSQL works too (`type: POSTGRESQL`, port `5432`).

## The table

Created automatically on first start:

```sql
CREATE TABLE IF NOT EXISTS oberonchat_violations (
    id         BIGINT       NOT NULL AUTO_INCREMENT,
    uuid       VARCHAR(36)  NOT NULL,
    player     VARCHAR(16)  NOT NULL,
    reason     VARCHAR(64)  NOT NULL,
    weight     INT          NOT NULL DEFAULT 0,
    source     VARCHAR(16)  NOT NULL,
    message    VARCHAR(512) NOT NULL,
    created_at BIGINT       NOT NULL,
    PRIMARY KEY (id)
);
```

One row per offence. `player` is stored alongside `uuid` so history stays readable after a rename. Messages longer than 512 characters are truncated before storing.

A second, tiny table holds staff who silenced their own alerts with `/oberonchat alerts`:

```sql
CREATE TABLE IF NOT EXISTS oberonchat_preferences (
    uuid       VARCHAR(36) NOT NULL,
    pref_key   VARCHAR(32) NOT NULL,
    enabled    BOOLEAN     NOT NULL,
    updated_at BIGINT      NOT NULL,
    PRIMARY KEY (uuid, pref_key)
);
```

The absence of a row means the default — alerts on — so a staff member granted the permission starts hearing them
without a row being written first.

## Networks

Point every server at the same MySQL database and violation history follows players across the network.

Two things to know:

- **Running totals are per server.** Each server keeps its own in-memory window and restores it from the database when a player joins. A player who offends on server A and hops to B immediately carries their total; one who hops back and forth faster than the join restore may briefly see a lower number.
- **Punishment commands run on the server where the offence happened.** If your mute is a proxy-wide LuckPerms call that's fine. If it's a per-server command, the mute lands on that server only.

## Troubleshooting

**`Communications link failure`** — wrong host or port, or the MySQL user isn't allowed to connect from the server's IP.

**`Unsupported connection setting "USESSL"`** — you set `type: H2` but left MySQL properties in place *and* a previous version passed them through. Update DzusillCore to 1.5.0 or newer; it does not pass them to H2 at all.

**History is empty but violations happen** — check `Violations.Persist: true` in `config.yml`. The database being on is not enough on its own.

**Everything reset after switching backends** — expected. There is no import between them.
