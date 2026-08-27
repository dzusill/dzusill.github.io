---
title: "database.yml"
description: "This file needs a server restart. It is the one thing /dlive reload does not pick up, because"
---

**This file needs a server restart.** It is the one thing `/dlive reload` does not pick up, because
swapping a live connection pool underneath in-flight queries is not safe.

## H2, the default

Nothing to configure. dLive creates a local file in `plugins/dLive/` and uses it. Right for a single
server.

## MySQL

Point it at a database when the data has to follow players across a network, or when you want the
history readable from outside the server:

```yaml
type: MYSQL
host: 127.0.0.1
port: 3306
database: dlive
username: dlive
password: ""
```

Then restart.

> Treat the password as a credential. Do not paste `database.yml` into a support ticket or a public
> issue without blanking it first.

## The tables

| Table | Holds |
|---|---|
| `dlive_players` | opt-out state, last announcement, lifetime count |
| `dlive_announcements` | the history, one row per announcement |
| `dlive_blocks` | the runtime blocklist from `/dlive block` |
| `dlive_saved_links` | one row per player per platform |

The schema is applied on every start with `CREATE TABLE IF NOT EXISTS`, so upgrading to a version that
adds a table needs no migration step — start the new jar and the table appears.

## Sharing one database

Several servers can point at the same MySQL database. They then share history, the blocklist, saved
links and opt-out state, and the duplicate window applies across all of them.

Announcements are **not** relayed between servers — each one announces to its own players. Use the
[Discord webhook](/plugins/dlive/features/discord-webhook/) if you want one shared feed.
