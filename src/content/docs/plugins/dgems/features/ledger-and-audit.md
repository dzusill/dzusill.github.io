---
title: "Ledger & Audit"
description: "Two separate records, answering two different questions."
---

Two separate records, answering two different questions.

- **The ledger** — where did the gems go? Every movement, append-only.
- **The audit log** — who did that? Every administrative action, with an actor.

---

## The ledger

One row per movement, written in the same SQL transaction as the balance change. Never updated, never deleted.

| Type | Written when |
|---|---|
| `DEPOSIT` | gems added |
| `WITHDRAW` | gems removed |
| `TRANSFER_OUT` / `TRANSFER_IN` | the two halves of a `/gems pay` |
| `PURCHASE` | a shop purchase |
| `REFUND` | a cancelled order |
| `ADMIN_GIVE` / `ADMIN_TAKE` / `ADMIN_SET` | admin balance commands |
| `EXTERNAL_GRANT` | a webstore grant |

Because it is append-only, a balance is always reconstructible: add up the rows. That is exactly what reconciliation does.

## Reconciliation

```
/gems admin verify
```

Re-adds every ledger entry per account and compares the total to the stored balance. A clean run means the books balance.

Worth running:

- after a database restore
- after any crash mid-transaction
- before and after a large migration
- periodically, if gems map to real money

Requires `dgems.admin.verify`.

## The audit log

```
/gems admin audit
```

Who gave, took, set, granted, claimed, delivered or cancelled — with a timestamp and an actor. The ledger tells you a balance changed; the audit log tells you which staff member caused it.

Requires `dgems.admin.audit`.

## Why both

A ledger alone cannot tell an admin give from a player transfer once you are looking at a number. An audit log alone cannot prove the totals add up. Together they answer *what happened* and *who is accountable*, which is the pair of questions that actually get asked when money is missing.

## Retention

Neither is pruned. Both grow slowly and are the cheapest insurance in the plugin. Do not add a cleanup job — an audit trail with holes in it is not an audit trail.

## Next

- [External Grants](/plugins/dgems/features/external-grants/)
