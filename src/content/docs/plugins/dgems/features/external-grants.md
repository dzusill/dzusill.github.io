---
title: "External Grants"
description: "Selling gems on Tebex, Craftingstore or your own webstore means an external system tells the server \"give this player 500 gems\". Webstores retry. If a retry…"
---

Selling gems on Tebex, Craftingstore or your own webstore means an external system tells the server "give this player 500 gems". Webstores retry. If a retry pays twice, you have handed out free money.

```
/gems admin grant <ref> <player> <amount>
```

The `<ref>` is the fix.

---

## Idempotency by reference

`ref` is the webstore's own identifier for the transaction — a Tebex transaction id, an order number, anything stable and unique.

| Call | Result |
|---|---|
| First time with `ref` | gems granted, `EXTERNAL_GRANT` ledger row written, ref recorded |
| Same `ref` again | recognised, **nothing granted**, success reported |

So the webstore can retry as often as it likes. The command is safe to run twice by hand, safe to fire from a flaky webhook, and safe to replay from a log.

## Wiring it to a webstore

Configure the command in your webstore's command panel, passing its transaction id through:

```
gems admin grant {transaction} {username} 500
```

The exact placeholder syntax depends on the store. The rule that matters: **the ref must come from the store, and must be unique per purchase.** A constant ref grants once and then silently never again; a random ref per attempt grants on every retry. Both defeat the mechanism.

## Permission

`dgems.admin.grant` — default op. On a webstore integration the command runs from console, which always has it.

## What the buyer sees

The grant lands as a normal deposit. Their balance moves and it appears in their ledger as `EXTERNAL_GRANT`, distinguishable from an admin give — useful when reconciling with the store's own reports.

## Verifying

```
/gems admin audit
/gems admin verify
```

The audit log shows each grant with its ref. Reconciliation proves the totals still add up after a batch of them.

## Next

- [Discord Webhooks](/plugins/dgems/features/webhooks/)
