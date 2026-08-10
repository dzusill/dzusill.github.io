---
title: "database.yml"
description: "Where staff preferences and the action log live. Embedded H2 by default — nothing to install."
---

`plugins/OberonStaff/database.yml`. **You probably do not need to touch this file.**

## The default: embedded H2

```yaml
enabled: true
type: H2
file: data
```

H2 writes a single file, `plugins/OberonStaff/data.mv.db`, created on first connect. No server to install, no credentials.

`file` is relative to the plugin's folder. H2 appends `.mv.db` itself, so leave the extension off.

> `host`, `port`, `database`, `username`, `password` and the `properties` block are **ignored** when `type: H2`.

## Turning it off

```yaml
enabled: false
```

The plugin still works, and loses two things:

1. **Staff chat mode and `/tptoggle` reset on restart** — they live in memory only.
2. **No action log.** `/oberonstaff log` says so.

Everything else — teleports, the vanish ladder, ranks, staff chat itself — is unaffected.

## MySQL

Worth it if you run several servers and want staff preferences to follow people, or one action log across the network.

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

## The tables

Two, created automatically on first start.

**Preferences** — staff chat mode and teleport blocking, keyed by UUID so a rename never loses them:

```sql
CREATE TABLE IF NOT EXISTS oberonstaff_preferences (
    uuid       VARCHAR(36) NOT NULL,
    pref_key   VARCHAR(32) NOT NULL,
    enabled    BOOLEAN     NOT NULL,
    updated_at BIGINT      NOT NULL,
    PRIMARY KEY (uuid, pref_key)
);
```

`pref_key` is `staffchat` or `tptoggle`.

**Actions** — the teleport log. Schema and details on [Action log](/plugins/oberonstaff/features/action-log/).

## When preferences load and save

- **Loaded** on join, asynchronously.
- **Saved** immediately when the command runs.
- **Dropped from memory** on quit; the row stays.

## Networks

Point every server at the same database and staff preferences follow people between them. The action log becomes network-wide, which is usually what you want — `/oberonstaff log` on any server shows teleports from all of them.

## Troubleshooting

**`Communications link failure`** — wrong host or port, or the MySQL user isn't allowed to connect from the server's IP.

**Preferences reset every restart** — `enabled: false`, or the database failed to open. Check the console at startup for `Database is off; staff preferences will reset when the server restarts.`

**`/oberonstaff log` says the log is off** — either `Teleport.Log-Actions: false` in `config.yml`, or the database is off. Both have to be on.

**Everything reset after switching backends** — expected. There is no import between them.
