---
title: "database.yml"
description: "Optional SQL storage. Off by default — a single server runs perfectly well on the flat file."
---

Optional SQL storage. Off by default — a single server runs perfectly well on the flat file.

```yaml
enabled: false
type: MYSQL
host: localhost
port: 3306
database: minecraft
username: root
password: ''
pool:
  maximum-pool-size: 10
  connection-timeout-ms: 30000
properties:
  useSSL: 'false'
  characterEncoding: 'utf8'
```

Only **MySQL** and **PostgreSQL** are supported — DzusillCore has no SQLite backend. Set `type: POSTGRESQL` for the latter.

## When to turn it on

**On a network.** The chosen mode belongs to the account, not to one server. A player who chose hardcore on survival must still be hardcore after a lobby round-trip, and a flat file per server cannot do that.

A single server has no reason to enable it. `modes.yml` holds one small node per player and is read once at startup.

## The table

Created automatically at startup from the shipped schema:

```sql
CREATE TABLE IF NOT EXISTS dfate_modes (
    uuid            VARCHAR(36) PRIMARY KEY,
    name            VARCHAR(32),
    mode            VARCHAR(16) NOT NULL,
    chosen_at       BIGINT  NOT NULL DEFAULT 0,
    hardcore_deaths INT     NOT NULL DEFAULT 0,
    last_death_at   BIGINT  NOT NULL DEFAULT 0,
    chosen_by_admin TINYINT NOT NULL DEFAULT 0,
    hearts          INT     NOT NULL DEFAULT 0,
    INDEX idx_dfate_mode (mode)
);
```

> **Upgrading from a pre-lifesteal install:** MySQL has no `ADD COLUMN IF NOT EXISTS`, so the `hearts` column has to be added by hand once. PostgreSQL does it itself.
>
> ```sql
> ALTER TABLE dfate_modes ADD COLUMN hearts INT NOT NULL DEFAULT 0;
> ```

`uuid` is the key, so the mode follows the account through a name change. `name` is kept only so admin output has something readable for an offline player.

## How writes work

Every mode is loaded into memory once at startup. Reads never touch the backend — which is what lets a placeholder resolve an offline player as cheaply as an online one.

Writes are immediate rather than batched: a fate changes a handful of times in an account's life, so there is nothing to batch, and writing at once means a crash cannot lose someone's mode. They run on an async executor, so neither the choice screen nor the death handler blocks the main thread on a database round-trip.

If a write fails, the change **stays live in memory** and the failure is logged as `SEVERE`. The player has already been told they are hardcore; reverting would make the screen lie.

## Startup failure

If loading fails, dFate refuses to enable:

```
Could not load player modes — refusing to start with an empty cache
```

This is deliberate. Starting with an empty cache would re-ask everyone and — far worse — treat every hardcore player on the server as unchosen.

## Migrating from the flat file

There is no built-in importer. `modes.yml` is small and readable, so a short script or a hand-written `INSERT` covers it:

```yaml
# modes.yml
069a79f4-44e9-4726-a5be-fca90e38aaf5:
  Name: Steve
  Mode: HARDCORE
  Chosen-At: 1690000000000
  Hardcore-Deaths: 2
  Last-Death-At: 1690500000000
  Chosen-By-Admin: false
  Hearts: 8
```

maps one-to-one onto the columns above.

> Do not hand-edit `modes.yml` while the server is running — it is rewritten on every save. An unreadable `Mode:` value drops that record entirely, and the player is asked again on their next join. That is the safe failure: an unreadable mode is never silently downgraded to normal, because that would quietly pardon a hardcore player.
