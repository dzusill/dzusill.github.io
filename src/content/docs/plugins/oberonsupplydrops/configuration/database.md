---
title: "database.yml"
description: "Storage for claim statistics. Nothing else uses it — the drops themselves never touch a database."
---

Storage for claim statistics. Nothing else uses it — the drops themselves never touch a database.

```yaml
enabled: true
type: H2
file: data
```

## H2 (default)

Embedded and file-backed: no server, no credentials, no install step. It writes `data.mv.db` inside
the plugin folder.

`file` is a path relative to the plugin folder, with the extension left off — H2 adds it. The
`host`, `port`, `database` and `properties` keys are ignored for H2, because the driver rejects
connection settings it does not recognise.

Reach for anything else only if you already run one.

## MySQL / PostgreSQL

```yaml
type: MYSQL
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
```

The schema is applied at startup from the matching `schema-<type>.sql`, so the table is created for
you. H2 runs in MySQL compatibility mode, which is why one schema shape serves both.

## Turning it off

```yaml
enabled: false
```

Supported, and worth understanding before you do it:

| Still works | Stops working |
|---|---|
| Every drop, exactly as before | Totals surviving a restart |
| Claim counting for the session | Nothing else |

The leaderboard and the placeholders keep answering — from memory — they just start empty after each
restart. Nothing in the event lifecycle depends on storage being there.

To stop recording entirely, use `stats.enabled: false` in `config.yml` instead.

## The table

```
oberonsupplydrops_claims(uuid, name, tier, claims, items, updated_at)
```

One row per player per tier, primary key `(uuid, tier)`.

That grain is why the whole table is read into memory once at startup: it is bounded by how many
people have ever opened a crate, and holding it is what lets the leaderboard and every placeholder
answer without touching the database again. Writes are asynchronous and fire-and-forget — losing the
last second of them to a hard kill costs a crate count, not correctness.

A tier renamed or deleted in `tiers.yml` simply stops accumulating. Its old rows stay and still count
towards a player's totals, which is usually what you want after a season change; delete them by hand
if it is not.
