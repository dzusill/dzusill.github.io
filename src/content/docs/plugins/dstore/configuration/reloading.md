---
title: "Reloading"
description: "Requires dstore.admin (default op)."
---

```
/dstore reload
```

Requires `dstore.admin` (default op).

---

## What reloads

- `api-base-url`, `installation-id`, `secret`
- every `poll.*` timing
- `execution.*` toggles
- `update-check` and `logging`

The polling worker picks up the new timings on its next cycle.

## What does not reload

- **The ledger file.** Changing `receipt-database` needs a restart — the SQLite connection is opened once at startup and is deliberately not swapped under a running worker.
- **A job already executing.** It finishes under the settings it started with.

## Checking the result

```
/dstore status
```

Shows worker state and the last contact with the API. After changing credentials, run this before assuming the change took.

## Forcing a poll

```
/dstore poll
```

Schedules an immediate poll instead of waiting for the interval. Handy after fixing a credential — you get an answer in a second rather than in five.

## Never use `/reload confirm`

Bukkit's global reload re-enables plugins in an uncontrolled order. For a fulfilment client holding an open SQLite connection and an in-flight poll, that is a genuinely bad idea. Use `/dstore reload` for config, and a real restart for a jar change.

## Next

- [Commands & Permissions](/plugins/dstore/commands-and-permissions/)
