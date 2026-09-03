---
title: "Migrating from PerfDonation"
description: "OberonDonations replaces PerfDonation and imports its history automatically — nothing to run by hand under normal circumstances."
---

OberonDonations replaces PerfDonation and imports its history automatically — nothing to run by hand under normal circumstances.

## How it triggers

On first enable, the plugin checks for `plugins/PerfDonation/perfdonation.db` right next to its own data folder. If it exists, the import runs once, on the async pool, without blocking the rest of startup:

```
[OberonDonations] Found a PerfDonation database; importing its history once.
[OberonDonations] PerfDonation import: imported 30, skipped 0, 3 milestones
```

Whether it ran is recorded as a row in this plugin's **own** database, not a marker file next to the source — so cleaning up loose files in the data folder cannot accidentally trigger a second import. It only ever checks once, at enable, and only that first time it finds nothing does it also record that outcome, so it does not re-scan for the file on every subsequent boot either.

## The WAL trap

PerfDonation's SQLite database runs in **WAL (Write-Ahead Log) mode**. Recently committed writes live in a separate `perfdonation.db-wal` file next to the main one, and reading only `perfdonation.db` by itself gives you a **stale snapshot** — missing whatever was written since the last checkpoint. That can plausibly be your most recent donations and the current goal cycle.

**Copy all three files together, always:**

```
perfdonation.db
perfdonation.db-wal
perfdonation.db-shm
```

If only `perfdonation.db` is present when you migrate, the import still runs, but on data that may be measurably behind what PerfDonation's own commands would have shown you at the time you took the copy.

## What gets imported

- Every donation row, split back into individual package line items — PerfDonation's schema flattened a multi-package checkout into one comma-separated `product_name` string, and this un-flattens it.
- Each row's **own currency**, preserved rather than assumed — PerfDonation's history is not necessarily all in one currency, and this plugin never guesses.
- Goal state and already-fired milestones, remapped onto this plugin's own goal cycle numbering — so a goal that already earned progress under PerfDonation does not restart from zero, and a milestone that already fired does not fire its reward a second time.
- Rows with no `payment_id` at all (which do occur in real PerfDonation data) get a synthetic one derived from their own content, so they still deduplicate correctly if the import is ever run again.

## Is it safe to re-run?

Yes, by design — every purchase is stored keyed by `(provider, transaction id)` with a unique index, so a second run reports every donation row as skipped rather than duplicating a single one or re-firing a milestone reward. There is currently no exposed command to deliberately re-trigger it, since the one-shot gate lives inside this plugin's own database; the only way to force a fresh import today is to also clear that database, which is a deliberate, rare, destructive operation rather than a normal maintenance step.

## After migrating

```
/donations rebuild
```

recomputes every donor's cached statistics (spent, streaks, rank) from the full purchase history, including whatever was just imported, and refreshes every donation board — worth running once right after a migration even though the import itself already recorded the raw purchases.

## See also

- [Purchase Tracking](/plugins/oberondonations/features/purchase-tracking/)
- [Installation](/plugins/oberondonations/getting-started/installation/#migrating-an-existing-perfdonation-install)
