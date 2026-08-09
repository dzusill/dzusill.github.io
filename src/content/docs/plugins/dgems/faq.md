---
title: "FAQ & Troubleshooting"
description: "Almost always the database. dGems refuses to start without one — there is no flat-file mode, because the guarantees it makes need SQL transactions. Check…"
---

### The plugin will not enable.

Almost always the database. dGems refuses to start without one — there is no flat-file mode, because the guarantees it makes need SQL transactions. Check `database.yml` is `enabled: true` and the console for the JDBC error.

### Can gems be duplicated?

There is nothing to duplicate. Gems are a database balance, never an item and never a scoreboard value. Every change is one transaction that writes a ledger row and the balance together.

### Can a player spend gems they do not have?

No. Spending re-reads the balance inside the transaction that debits it — never from the display cache.

### Two players bought the last item at once.

One gets it, the other is told it is out of stock. Stock is decremented in the same transaction as the debit.

### A player says they were charged but got nothing.

Ask for the order number, then check `/gems admin orders`. Almost always the order is sitting PENDING because nobody claimed it — that is a staffing gap, not a bug. To confirm the money side, run `/gems admin verify`.

### How do I refund someone?

Cancel their order — that refunds automatically and records a `REFUND` ledger row. Do **not** `/gems admin give` the amount back; the gems return but the ledger never records why.

### Two staff delivered the same order.

Claim first, act second. The plugin cannot see your email outbox, so claiming is how staff see each other. Use `dgems.admin.orders.override` only for a colleague who claimed something and went offline.

### Our webstore granted gems twice.

Check the `ref` passed to `/gems admin grant`. It must be the store's unique transaction id. A constant ref grants once and then never again; a random one per attempt grants on every retry. Only a stable-per-purchase ref makes retries safe.

### `/gems admin verify` reports a mismatch.

The ledger and the stored balances disagree. Do not paper over it with an admin set. Capture the output, check the audit log around the affected accounts, and look for a database restore or a manual SQL edit — those are the realistic causes.

### Placeholders are blank.

PlaceholderAPI is not installed, or the surface is not parsing placeholders. Test with `/papi parse me %dgems_balance%`.

### A placeholder shows an old number.

The display cache, up to `balance-cache-ttl-seconds` (default 3). Set it to `0` for live reads. Spending is never affected.

### Can I disable player transfers?

```yaml
transfers:
  enabled: false
```

Sensible when gems are sold for real money and you do not want a secondary market. Shop purchases and admin gives keep working.

### Can I share gems across a network?

Yes — point every server at the same database, and give each a distinct `orders.server-name` so webhook messages are attributable.

### Does it work on Folia?

Yes.

### How big does the database get?

Small, and it never shrinks. One row per movement, per order, per admin action. Do not add a cleanup job — an audit trail with holes is not an audit trail.

### Can I change the currency name later?

Yes. `currency.name-singular`, `name-plural` and `format` in `config.yml`, then `/gems admin reload`. Every message, GUI and placeholder follows.

## Next

- [Credits](/plugins/dgems/credits/)
