---
title: "Updates"
description: "dStore can update itself. Because it is a plugin that grants ranks and items, the update path is deliberately strict."
---

dStore can update itself. Because it is a plugin that grants ranks and items, the update path is deliberately strict.

---

## Checking

```yaml
update-check:
  enabled: true
```

When enabled, dStore asks the API whether a newer build exists and logs the answer. It never installs anything on its own.

## Installing

```
/dstore update
```

Requires `dstore.admin`. The installer:

1. Rejects any URL that is not **HTTPS** (localhost is allowed, for development).
2. Requires a **SHA-256** from the API, and validates the format before downloading.
3. Refuses a download larger than **50 MB**.
4. Verifies the downloaded bytes against that hash.
5. Stages the jar for the next restart.

A mismatched hash aborts the install and leaves the running jar untouched. The update **applies on restart** — nothing is hot-swapped, because replacing a running fulfilment client mid-poll is exactly how a job gets executed twice.

## Manual updates

Perfectly fine, and what you want if your host does not allow outbound downloads:

1. Stop the server.
2. Replace `dStore.jar`.
3. Start.

Keep `receipts.db` in place. Deleting it discards the at-most-once guarantee for any job still in flight.

## Turning it off

```yaml
update-check:
  enabled: false
```

Silences the check entirely. `/dstore update` still works if you run it by hand.

## Next

- [config.yml](/plugins/dstore/configuration/config/)
