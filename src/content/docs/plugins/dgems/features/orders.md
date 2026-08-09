---
title: "Orders"
description: "Every purchase becomes an order. Because the goods are delivered by a human, the order is the piece of paperwork that stops two staff members sending the…"
---

Every purchase becomes an order. Because the goods are delivered by a human, the order is the piece of paperwork that stops two staff members sending the same gift card — or nobody sending it at all.

---

## The lifecycle

```
PENDING ──claim──► CLAIMED ──deliver──► DELIVERED
   │                  │
   └──────cancel──────┴──► CANCELLED   (buyer refunded)
```

| Status | Meaning |
|---|---|
| `PENDING` | paid for, nobody has picked it up |
| `CLAIMED` | a named staff member is working on it |
| `DELIVERED` | done — the reward actually reached the buyer |
| `CANCELLED` | called off; the buyer's gems were refunded |

## Staff view

```
/gems admin orders
```

The queue GUI, oldest first. Actions:

| Action | Permission | Effect |
|---|---|---|
| Claim | `dgems.admin.orders.claim` | assigns the order to you |
| Deliver | `dgems.admin.orders.deliver` | closes a claimed order |
| Cancel | `dgems.admin.orders.cancel` | closes it and refunds the buyer |
| Override | `dgems.admin.orders.override` | act on an order **claimed by someone else** |

Splitting these means a trusted helper can claim and deliver without ever being able to cancel-and-refund, and only a senior admin can take an order off a colleague.

## Buyer view

```
/gems orders
```

Their own history with current status — so the answer to "where is my reward?" is self-service.

## Refunds

Cancelling refunds automatically, in one transaction:

```
order → CANCELLED
  └─ REFUND ledger row
       └─ balance credited
```

There is no separate refund command, because a manual `/gems admin give` would restore the gems without the ledger recording *why*. Cancel the order instead — it produces a complete audit trail.

## Claim discipline

Claiming is what makes the queue safe to work with several staff online. The rule: **claim first, act second.** Two people delivering the same order is not something the plugin can detect — it cannot see your email outbox. Claiming is how they see each other.

`override` exists for the ordinary case where a colleague claimed something and went offline.

## Limits

```yaml
shop:
  max-pending-orders-per-player: 5
```

Caps how many PENDING/CLAIMED orders one player may hold. Prevents a single buyer flooding the queue, and gives staff a bounded backlog.

## Next

- [Ledger & Audit](/plugins/dgems/features/ledger-and-audit/)
- [Discord Webhooks](/plugins/dgems/features/webhooks/)
