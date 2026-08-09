---
title: "Quick Start"
description: "Verify fulfilment end to end in a few minutes."
---

Verify fulfilment end to end in a few minutes.

---

## 1. Check the connection

```
/dstore status
```

You want a recent successful contact with the API. Anything else — auth failure, connection refused — stops here; fix it before creating products.

## 2. Create a cheap test product

On the website, make a product that grants something harmless and reversible, for example a console command:

```
say %player% bought the test product
```

## 3. Buy it

Complete a purchase for your own account. Within one poll interval (5 seconds by default) the command runs on the server.

Impatient? Force a poll:

```
/dstore poll
```

## 4. Prove the ledger works

This is the test worth doing, because it is the behaviour you are actually paying for.

1. Buy the test product again.
2. In the website admin panel, retry the same fulfilment job.
3. Watch the console.

The job is acknowledged, but **the command does not run twice**. dStore found the receipt for that execution key and replayed the stored result. That is exactly what happens when a real HTTP response is lost in transit.

## 5. Test an offline delivery

1. Buy something for a player who is offline.
2. Confirm the job stays queued rather than failing.
3. Have them join — delivery happens then.

---

## Typical first-run problems

| Symptom | Cause |
|---|---|
| `status` shows an auth failure | wrong `installation-id` / `secret`, or credentials from a different tenant |
| Nothing ever polls | `api-base-url` wrong, or outbound HTTPS blocked |
| Rank products fail | LuckPerms not installed |
| Console-command products fail | `execution.console-commands-enabled` is `false` |
| A delivery times out | the action needed the main thread and exceeded `main-thread-timeout-seconds` |

## Next

- [How Fulfilment Works](/plugins/dstore/features/fulfilment/)
- [The Receipt Ledger](/plugins/dstore/features/receipt-ledger/)
