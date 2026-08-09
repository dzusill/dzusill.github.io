---
title: "The Shop"
description: "A paginated GUI of everything players can buy with gems. Unlike a normal server shop, the goods are not Minecraft items — they are real-world rewards a…"
---

```
/gems shop
```

A paginated GUI of everything players can buy with gems. Unlike a normal server shop, the goods are **not** Minecraft items — they are real-world rewards a staff member fulfils by hand. The plugin's job is to take the payment correctly and produce an order.

---

## Managing items

```
/gems admin items          # list and edit
/gems admin items create   # create a new one
```

Creation is a chat-prompted flow: name, price, stock. Editing opens a GUI where each field is a clickable slot.

| Field | Meaning |
|---|---|
| **Name** | shown in the shop and in order messages |
| **Price** | in gems |
| **Stock** | remaining units; decremented on purchase |

Requires `dgems.admin.items`.

## Buying

1. Click an item in `/gems shop`.
2. A confirmation GUI shows exactly what is being bought and for how much.
3. Confirm.

On success the buyer gets a chat message, an optional on-screen title, and an order number to quote at staff.

## What a purchase does, atomically

```
one SQL transaction
  ├─ re-read the balance      (never the cache)
  ├─ check stock
  ├─ debit the buyer
  ├─ PURCHASE ledger row
  ├─ decrement stock
  └─ create the order (PENDING)
```

Two players clicking the last unit at the same instant: one gets it, the other is told it is out of stock. Neither is charged incorrectly.

## Guard rails

```yaml
shop:
  purchase-cooldown-ms: 1000
  item-cache-seconds: 30
  max-pending-orders-per-player: 5
```

| Key | Purpose |
|---|---|
| `purchase-cooldown-ms` | anti double-click, on top of idempotency |
| `item-cache-seconds` | how long the item list may be cached before re-reading |
| `max-pending-orders-per-player` | stops one player filling the staff queue |

A player at the pending-order cap is told to wait for staff rather than being silently ignored.

## The purchase title

```yaml
shop:
  purchase-title:
    enabled: true
    fade-in-ticks: 10
    stay-ticks: 60
    fade-out-ticks: 20
    title:
      - "<gradient:#a855f7:#ec4899><bold>Purchase complete!</bold></gradient>"
    subtitle:
      - "<white>%item%"
      - "<gray>Paid <white>%price%</white> · Order <white>#%order%</white>"
```

Both `title` and `subtitle` are **lists**, so each renders as several lines, and every line is MiniMessage. Placeholders: `%item%`, `%price%`, `%order%`, `%player%`.

The chat message is always sent regardless; this block only adds the on-screen version.

## Next

- [Orders](/plugins/dgems/features/orders/)
