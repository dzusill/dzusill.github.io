---
title: "Quick Start"
description: "Set up a working shop and run one purchase through the full order lifecycle."
---

Set up a working shop and run one purchase through the full order lifecycle.

---

## 1. Name the currency

`config.yml`:

```yaml
currency:
  name-singular: "Gem"
  name-plural: "Gems"
  format: "<gradient:#a855f7:#ec4899><bold>%amount%</bold> %currency%</gradient>"
  group-thousands: true
```

`/gems admin reload`.

## 2. Give yourself some gems

```
/gems admin give <you> 1000
/gems balance
```

## 3. Create a shop item

```
/gems admin items create
```

You are prompted in chat for a name, a price and a stock. Set stock to something small so you can watch it decrement.

Check it:

```
/gems shop
```

## 4. Buy it

Click the item, confirm in the GUI. You should get:

- the success message in chat
- an on-screen title (if `shop.purchase-title.enabled`)
- your balance reduced
- an order number

## 5. Work the order queue as staff

```
/gems admin orders
```

Claim it, then deliver it:

- **Claim** marks it as yours, so two staff cannot work the same order.
- **Deliver** closes it. Do this after you have actually sent the gift card.
- **Cancel** refunds the buyer automatically.

The buyer can watch it all with:

```
/gems orders
```

## 6. Prove the books balance

```
/gems admin verify
```

Reconciliation re-adds the ledger and compares it against stored balances. A clean result is the answer to "did the plugin lose anyone's money" — worth running before and after anything unusual.

## 7. Look at the audit trail

```
/gems admin audit
```

Your give, the purchase, the claim, the delivery — each with an actor and a timestamp.

---

## Typical first-run problems

| Symptom | Cause |
|---|---|
| Plugin does not enable | `database.yml` disabled or unreachable — by design |
| Shop is empty | nothing created yet; use `/gems admin items create` |
| "too many pending orders" | the buyer is at `shop.max-pending-orders-per-player` (default 5) |
| Transfers rejected | below `min-amount`, above `max-amount`, or inside `cooldown-seconds` |
| Placeholders blank | PlaceholderAPI missing |

## Next

- [The Shop](/plugins/dgems/features/shop/)
- [Orders](/plugins/dgems/features/orders/)
