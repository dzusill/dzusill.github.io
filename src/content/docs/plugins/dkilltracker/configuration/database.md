---
title: "database.yml"
description: "Optional. dKillTracker works perfectly on flat files — this is for networks and very large servers."
---

Optional. dKillTracker works perfectly on flat files — this is for networks and very large servers.

## Flat file (default)

```yaml
enabled: false
```

Kill data lives in `plugins/dKillTracker/kills.yml`, one node per player:

```yaml
069a79f4-44e9-4726-a5be-fca90e38aaf5:
  Name: Alice
  Kills: 132
  Lifetime-Kills: 187
  Deaths: 41
  Last-Milestone: 50
  Last-Kill-At: 1753733742000
```

Everything is cached in memory; only changed records are written, every `Storage.Save-Interval-Seconds` and once on shutdown.

> Don't edit `kills.yml` while the server is running — the in-memory copy is authoritative and will overwrite you on the next save. Stop the server first, or use `/killtracker set`.

## SQL

```yaml
enabled: true
type: MYSQL          # or POSTGRESQL
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

MySQL and PostgreSQL only. There is no SQLite backend; for a single server, flat file already fills that role.

## The table

Created automatically on first start:

```sql
CREATE TABLE IF NOT EXISTS killtracker_stats (
    uuid           VARCHAR(36) PRIMARY KEY,
    name           VARCHAR(32),
    kills          BIGINT NOT NULL DEFAULT 0,
    lifetime_kills BIGINT NOT NULL DEFAULT 0,
    deaths         BIGINT NOT NULL DEFAULT 0,
    last_milestone INT    NOT NULL DEFAULT 0,
    last_kill_at   BIGINT NOT NULL DEFAULT 0,
    INDEX idx_killtracker_kills (kills)
);
```

Rows are upserted on `uuid` using the dialect's own syntax, so the same code works on both engines.

## Networks

Point every server at the same database and kill counts follow players across the network.

Two things to know:

- **Each server keeps its own in-memory cache**, written back on its own timer. A player who kills on server A, hops to B and back within the save interval may briefly see a stale number. Lower `Storage.Save-Interval-Seconds` if that matters.
- **Milestone commands run on the server where the kill happened.** If your rank command is a proxy-wide LuckPerms call that's fine. If it's a per-server command, the reward lands on that server only.

## Migrating from flat file to SQL

There is no import command. To move existing data:

1. Stop every server.
2. Set `enabled: true` and start once — the table is created.
3. Recreate the rows from `kills.yml` yourself (a short script, or `/killtracker set` for a handful of players), or accept the reset.

Decide before launch if you can; there is no clean automated path back either.

## Troubleshooting

**`Communications link failure`** — wrong host/port, or the MySQL user isn't allowed to connect from the server's IP.

**Table exists but stays empty** — the flush is on a timer. Wait out `Save-Interval-Seconds` or stop the server cleanly.

**Everything reset after enabling SQL** — expected. The SQL backend starts empty; see migrating, above.
