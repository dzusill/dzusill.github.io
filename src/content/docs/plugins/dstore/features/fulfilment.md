---
title: "How Fulfilment Works"
description: "dStore is a worker. It asks the API for work, does it, and reports back. Everything about the design follows from one requirement: a consumable side effect…"
---

dStore is a worker. It asks the API for work, does it, and reports back. Everything about the design follows from one requirement: **a consumable side effect must happen at most once**, no matter what the network does.

---

## The loop

```
every poll.interval-seconds
  └─ GET jobs (up to poll.batch-size)
       └─ for each job:
            ├─ already in the ledger?  → replay stored result, execute nothing
            └─ new → route to an executor
                       └─ write receipt to SQLite   (durable)
                            └─ report result to the API
```

Between polls, a heartbeat every `poll.heartbeat-seconds` tells the API this installation is alive. A server that stops heartbeating shows as offline in the admin panel, which is how you find a dead fulfilment client before your customers do.

---

## Where each step runs

| Step | Thread |
|---|---|
| Polling, heartbeat, reporting | async worker |
| Ledger reads and writes | worker, synchronized |
| Console commands, item grants | main thread (or the player's region on Folia) |
| LuckPerms grants | async |

Only the steps that genuinely need the server tick touch it, and those are bounded by `execution.main-thread-timeout-seconds` (default 10). A hung command cannot freeze the server indefinitely.

---

## Failure handling

| Failure | Result |
|---|---|
| API unreachable | poll skipped, retried next interval, nothing lost |
| Job fails during execution | reported as failed; the website shows it undelivered |
| Response lost after execution | the API retries; the ledger prevents a second execution |
| Player offline | the job stays queued for a later delivery |

A **failed** job and a **lost response** are different, and dStore treats them differently. Failed means the effect did not happen and may be retried for real. Lost response means it did happen and must never happen again.

---

## Batching

`poll.batch-size` (default 10) caps how many jobs come back per poll. Jobs are executed one at a time in order — the batch bounds the request, not the concurrency. Raising it helps a backlog drain faster; it does not increase the load per tick.

## Timeouts

`poll.request-timeout-seconds` (default 15) bounds each HTTP call. A hanging API delays one poll and no more.

## Next

- [The Receipt Ledger](/plugins/dstore/features/receipt-ledger/)
- [Action Types](/plugins/dstore/features/action-types/)
