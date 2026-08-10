---
title: "database.yml"
description: "Where ignore lists, preferences and the log live. Embedded H2 by default — nothing to install."
---

`plugins/OberonMSG/database.yml`. **You probably do not need to touch this file.**

## The default: embedded H2

```yaml
enabled: true
type: H2
file: data
```

H2 writes a single file, `plugins/OberonMSG/data.mv.db`, created on first connect. No server to install, no
credentials.

> `host`, `port`, `database`, `username`, `password` and the `properties` block are **ignored** when `type: H2`.

## Turning it off

```yaml
enabled: false
```

The plugin still works. What you lose:

- **Ignore lists reset on restart.** Players have to ignore people again.
- **`/msgtoggle` and `/socialspy` reset on restart.**
- **No message log** — but it is off by default anyway.

Messaging itself, vanish, AFK and reply targets are unaffected.

## MySQL

Worth it if you run several servers and want ignore lists to follow people, or one message log across the network.

```yaml
enabled: true
type: MYSQL
host: localhost
port: 3306
database: minecraft
username: root
password: 'secret'
```

Restart after changing — the backend is chosen at startup. PostgreSQL works too (`type: POSTGRESQL`, port `5432`).

## The tables

Three, created automatically on first start.

**Ignore lists** — UUIDs at both ends, so a rename on either side cannot break the entry:

```sql
CREATE TABLE IF NOT EXISTS oberonmsg_ignores (
    uuid         VARCHAR(36) NOT NULL,
    ignored_uuid VARCHAR(36) NOT NULL,
    ignored_name VARCHAR(32) NOT NULL,
    created_at   BIGINT      NOT NULL,
    PRIMARY KEY (uuid, ignored_uuid)
);
```

**Preferences** — `/msgtoggle` and `/socialspy`, keyed by UUID and preference name.

**Log** — only written when `Log.Enabled` is true. Indexed by time and by both participants.

## When things load and save

- **Ignore lists and preferences** load on join, asynchronously, and save immediately when changed.
- **Both are dropped from memory** on quit; the rows stay.
- **Reply targets are never stored** — a coordinate from a previous session is one thing, but a conversation from
  before a restart is another. They expire on their timer instead.

## Troubleshooting

**`Communications link failure`** — wrong host or port, or the MySQL user isn't allowed to connect from the server's IP.

**Ignore lists reset every restart** — `enabled: false`, or the database failed to open. Check the console at startup
for `Database is off; ignore lists and preferences will reset when the server restarts.`

**`/oberonmsg log` says the log is off** — either `Log.Enabled: false` in `config.yml`, or the database is off. Both
have to be on.

**Everything reset after switching backends** — expected. There is no import between them.
