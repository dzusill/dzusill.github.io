---
title: "Database"
description: "Tickets, reports, replies, notes, follower lists, notification preferences and ratings are all stored"
---

Tickets, reports, replies, notes, follower lists, notification preferences and ratings are all stored
in a database. `database.yml` decides which one.

```yaml
enabled: true

type: H2

# H2 only.
file: data

# Ignored when type is H2.
host: localhost
port: 3306
database: minecraft
username: root
password: ""
```

## Choosing a type

| Type | When it makes sense |
|---|---|
| **H2** | the default. A file in the plugin folder, nothing to install, fine for a single server |
| **MySQL** | you already run MySQL, or several servers must share one ticket desk |
| **PostgreSQL** | the same, on Postgres |

A schema ships for each — `schema-h2.sql`, `schema-mysql.sql`, `schema-postgresql.sql` — and the
right one is applied automatically on first start. You do not create tables yourself.

## Networks

A shared MySQL or PostgreSQL database is what lets a player open a ticket on survival and have staff
answer it from the hub. Point every server at the same database and set a different `Server-Name`
under `Tickets:` in [config.yml](/plugins/dtickets/configuration/config/) on each, so tickets record where they came from.

Do not point two servers at the same **H2 file**. H2 is a single-process store; two servers will
corrupt it.

## Switching type later

There is no migration between types. Changing `type` starts from an empty database and the old
tickets stay where they were — recoverable by switching back, but not merged. If you plan to move to
MySQL, do it before you go live.

## Retention

`Tickets.Retention-Days` (90 by default) deletes closed tickets. That is a real delete, at the
database level. Turn on `Tickets.Transcripts` if you need a copy kept — see
[Ticket chat](/plugins/dtickets/features/ticket-chat/#transcripts).

## Turning storage off

`enabled: false` disables the database layer entirely, which disables the plugin's ability to keep a
ticket. It exists for debugging, not as a mode to run in.

## If the connection fails

The plugin reports it on enable and `/dtickets status` shows it. Check credentials first, then that
the database exists and the user may create tables in it — the schema runs on first start and needs
`CREATE TABLE`.
