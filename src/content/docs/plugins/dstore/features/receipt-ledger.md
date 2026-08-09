---
title: "The Receipt Ledger"
description: "A SQLite file, receipts.db, in the plugin folder. One row per executed job. It is the difference between \"usually delivers once\" and \"delivers at most once\"."
---

A SQLite file, `receipts.db`, in the plugin folder. One row per executed job. It is the difference between "usually delivers once" and "delivers at most once".

---

## The problem it solves

Every fulfilment client has the same hole:

```
execute the grant  ✅
report success     ❌  ← connection dropped here
```

The API never heard back, so it retries. Without a ledger the grant runs a second time and the player gets two ranks, two crate keys, two of whatever they bought.

Reporting **before** executing is not a fix either — then a crash between the report and the execution loses the purchase entirely, and the customer paid for nothing.

## The fix

Record the execution locally, durably, **before** the network call:

| Column | Meaning |
|---|---|
| `execution_key` | primary key — identifies this specific side effect |
| `job_id` | the API's job |
| `executed_at` | when it ran |
| `result_code` | what happened |

On every job, dStore looks up the execution key first. A hit means "this already ran" — it replays `result_code` to the API and executes nothing.

## Why SQLite, and why these pragmas

```
PRAGMA journal_mode = WAL
PRAGMA synchronous  = FULL
```

`synchronous=FULL` makes the write hit the disk before the call returns. Anything weaker and a power cut between the receipt and the report reopens the exact hole the ledger exists to close. WAL keeps that durability without the write blocking reads.

A flat file or an in-memory set would be faster and would both lose the guarantee on an unclean shutdown.

---

## Operating it

**Back it up with your world.** It is small, and losing it means an in-flight retry can double-deliver.

**Do not delete it to "reset" the plugin.** There is nothing to reset — the file only ever grows by one row per delivered purchase.

**Do not share it between servers.** Each installation has its own execution keys. Two servers pointed at one file is undefined behaviour.

**Moving servers?** Copy `receipts.db` with the rest of the plugin folder.

## Changing the filename

```yaml
receipt-database: "receipts.db"
```

Relative to the plugin folder. Change it only if you have a reason to — and move the existing file to match, or you start with an empty ledger.

## Next

- [Action Types](/plugins/dstore/features/action-types/)
