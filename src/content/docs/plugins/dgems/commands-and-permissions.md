---
title: "Commands & Permissions"
description: "Everything lives under /gems."
---

Everything lives under `/gems`.

---

## Player commands

| Command | Permission | Description |
|---|---|---|
| `/gems balance` | `dgems.balance` | Your balance |
| `/gems balance <player>` | `dgems.balance.others` | Someone else's balance |
| `/gems pay <player> <amount>` | `dgems.pay` | Transfer gems (confirmation GUI) |
| `/gems top` | `dgems.top` | Balance leaderboard |
| `/gems shop` | `dgems.shop` | Open the shop |
| `/gems orders` | `dgems.orders` | Your order history |

## Admin commands

| Command | Permission | Description |
|---|---|---|
| `/gems admin give <player> <amount>` | `dgems.admin.give` | Add gems |
| `/gems admin take <player> <amount>` | `dgems.admin.take` | Remove gems |
| `/gems admin set <player> <amount>` | `dgems.admin.set` | Set a balance outright |
| `/gems admin items` | `dgems.admin.items` | List and edit shop items |
| `/gems admin items create` | `dgems.admin.items` | Create a shop item |
| `/gems admin orders` | `dgems.admin.orders` | Open the order queue |
| `/gems admin grant <ref> <player> <amount>` | `dgems.admin.grant` | Idempotent external grant |
| `/gems admin audit` | `dgems.admin.audit` | View the audit log |
| `/gems admin verify` | `dgems.admin.verify` | Reconcile ledger against balances |
| `/gems admin reload` | `dgems.admin.reload` | Reload configs |

---

## Permissions

| Permission | Default | Grants |
|---|---|---|
| `dgems.balance` | `true` | own balance |
| `dgems.balance.others` | `op` | others' balances |
| `dgems.pay` | `true` | transfers |
| `dgems.top` | `true` | leaderboard |
| `dgems.shop` | `true` | the shop |
| `dgems.orders` | `true` | own order history |
| `dgems.admin` | `op` | the `/gems admin` subtree |
| `dgems.admin.give` | `op` | give |
| `dgems.admin.take` | `op` | take |
| `dgems.admin.set` | `op` | set |
| `dgems.admin.items` | `op` | create and edit items |
| `dgems.admin.orders` | `op` | open the queue |
| `dgems.admin.orders.claim` | `op` | claim orders |
| `dgems.admin.orders.deliver` | `op` | mark delivered |
| `dgems.admin.orders.cancel` | `op` | cancel (refunds) |
| `dgems.admin.orders.override` | `op` | act on someone else's claimed order |
| `dgems.admin.grant` | `op` | external grants |
| `dgems.admin.audit` | `op` | audit log |
| `dgems.admin.verify` | `op` | reconciliation |
| `dgems.admin.reload` | `op` | reload |
| `dgems.bypass.limits` | **`false`** | skip transfer limits and cooldowns |

`dgems.bypass.limits` defaults to `false` **even for op**. It is the permission that lets an account move any amount at any speed — grant it deliberately, to an account you trust, or not at all.

---

## A sane staff hierarchy

Helpers deliver orders but cannot refund or touch balances:

```
lp group helper permission set dgems.admin.orders true
lp group helper permission set dgems.admin.orders.claim true
lp group helper permission set dgems.admin.orders.deliver true
```

Moderators additionally cancel and refund:

```
lp group mod permission set dgems.admin.orders.cancel true
lp group mod permission set dgems.admin.audit true
```

Admins get the balance commands and reconciliation:

```
lp group admin permission set dgems.admin true
```

Only senior staff can take an order off a colleague:

```
lp group admin permission set dgems.admin.orders.override true
```

Webstore integrations run `/gems admin grant` from console, which needs no permission grant.

## Next

- [Placeholders](/plugins/dgems/placeholders/)
