---
title: "config.yml"
description: "The whole file, with defaults."
---

The whole file, with defaults.

```yaml
# Outbound Phalanx API. No trailing slash.
api-base-url: "http://localhost:3000/api/v1"

# Created once in Admin → Store → Settings. Never reuse dWebLink's key.
installation-id: ""
secret: ""

poll:
  interval-seconds: 5
  heartbeat-seconds: 60
  batch-size: 10
  request-timeout-seconds: 15

# The SQLite ledger is the at-most-once boundary for consumable side effects.
receipt-database: "receipts.db"

execution:
  console-commands-enabled: true
  main-thread-timeout-seconds: 10

update-check:
  enabled: true

logging:
  debug: false
```

---

## Connection

| Key | Default | Notes |
|---|---|---|
| `api-base-url` | `http://localhost:3000/api/v1` | **no trailing slash**; includes the `/api/v1` path |
| `installation-id` | *(empty)* | from Admin → Store → Settings |
| `secret` | *(empty)* | same place; treat as a password |

> ⚠️ These are **store** credentials. They are not dWebLink's `api-key` and must not be reused across the two plugins.

## Polling

| Key | Default | Notes |
|---|---|---|
| `interval-seconds` | 5 | how often to ask for jobs; lower = snappier delivery, more requests |
| `heartbeat-seconds` | 60 | liveness ping between polls |
| `batch-size` | 10 | max jobs per poll; jobs still execute one at a time |
| `request-timeout-seconds` | 15 | per HTTP call |

For most servers 5 seconds is already faster than a player can alt-tab back. Raise it to 15–30 on a large network if you want fewer requests.

## Ledger

| Key | Default | Notes |
|---|---|---|
| `receipt-database` | `receipts.db` | relative to the plugin folder; move the existing file if you change this |

## Execution

| Key | Default | Notes |
|---|---|---|
| `console-commands-enabled` | `true` | `false` makes `CONSOLE_COMMAND` jobs fail instead of running |
| `main-thread-timeout-seconds` | 10 | bounds actions that must touch the server tick |

## Updates and logging

| Key | Default | Notes |
|---|---|---|
| `update-check.enabled` | `true` | checks only; never installs by itself |
| `logging.debug` | `false` | verbose poll/execute logging — useful when diagnosing, noisy otherwise |

## Next

- [Reloading](/plugins/dstore/configuration/reloading/)
