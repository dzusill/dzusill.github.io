---
title: "database.yml and data.yml"
description: "Holds the claim storage, the drop history and the per-player totals."
---

## database.yml

Holds the claim storage, the drop history and the per-player totals.

```yaml
enabled: true
type: H2
file: data
```

The default needs nothing installed and no credentials: H2 writes a single file (`data.mv.db`) inside the
plugin folder. Switch to MySQL or PostgreSQL only if you already run one.

| Key | Meaning |
|---|---|
| `enabled` | **Keep it on.** Off means stored items and all statistics are lost on restart |
| `type` | `H2`, `MYSQL` or `POSTGRESQL` |
| `file` | The H2 file, relative to the plugin folder, without the extension |
| `host` `port` `database` `username` `password` | For `MYSQL` and `POSTGRESQL`; ignored by H2 |
| `pool.maximum-pool-size` `pool.connection-timeout-ms` | Connection pool |
| `properties` | Extra JDBC driver properties; ignored by H2 |

The schema is applied at startup from a bundled `schema-<type>.sql`; every statement is
`CREATE … IF NOT EXISTS`, so starting against an existing database is safe. The tables are
`oberonafk_storage`, `oberonafk_history`, `oberonafk_players`, `oberonafk_exempt` and
`oberonafk_addresses`. The last belongs to the [alt guard](/plugins/oberonafk/features/alt-guard/): an account, a keyed
hash of an address it connected from, and when. Never the address itself. Rows older than
`alt-guard.remember` are deleted.

Zone and reward ids are stored in 64-character columns, so longer ids are refused when the files load.

On shutdown the plugin waits for queued storage writes and for the totals to be saved before the
connection pool closes, so a restart cannot lose a claim or bring one back.

## data.yml

Written by the plugin itself, and the only file it writes:

- **`items`** — items captured with `/afk reward capture <name>`, one line of text each, used from
  `rewards.yml` as `item: { saved: <name> }`.
- **`spawns`** — teleport points set with `/afk zone setspawn <zone>`.
- **`alt-guard.key`** — the secret the [alt guard](/plugins/oberonafk/features/alt-guard/) hashes addresses with
  before they reach the database, made on first start. Keep it private. Deleting it makes the plugin forget
  every link between accounts.

It is a plain YAML file that no merge ever touches, which is why captured items and points do not live in
`rewards.yml` and `zones.yml`: re-saving a hand-edited file through the core's comment-preserving config
rewrites its formatting, and the plugin never does that to a file you edit. If `data.yml` cannot be read,
the console says so and the file is **not** overwritten.

Editing it by hand is fine while the server is stopped.
