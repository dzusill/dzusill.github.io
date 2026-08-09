---
title: "config.yml"
description: "Every key, with its default. The database connection lives separately in database.yml."
---

Every key, with its default. The database connection lives separately in [database.yml](/plugins/dgems/configuration/database/).

---

## Currency

```yaml
currency:
  name-singular: "Gem"
  name-plural: "Gems"
  format: "<gradient:#a855f7:#ec4899><bold>%amount%</bold> %currency%</gradient>"
  group-thousands: true
```

`format` is MiniMessage with `%amount%` and `%currency%`, and applies everywhere an amount appears. See [The Currency](/plugins/dgems/features/currency/).

## Balance cache

```yaml
balance-cache-ttl-seconds: 3
```

Display only. Spending always re-reads the database. `0` disables caching.

## Transfers

```yaml
transfers:
  enabled: true
  min-amount: 1
  max-amount: 100000
  cooldown-seconds: 30
  daily-cap: 0
  confirmation-timeout-seconds: 30
```

`daily-cap: 0` means unlimited. `dgems.bypass.limits` skips the cooldown and limits. See [Transfers](/plugins/dgems/features/transfers/).

## Shop

```yaml
shop:
  purchase-cooldown-ms: 1000
  item-cache-seconds: 30
  max-pending-orders-per-player: 5
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

`title` and `subtitle` are lists — one entry per line, each MiniMessage. Placeholders: `%item%`, `%price%`, `%order%`, `%player%`. See [The Shop](/plugins/dgems/features/shop/).

## Orders and webhook

```yaml
orders:
  server-name: "server"
  webhook:
    enabled: false
    url: ""
    username: "dGems Orders"
    mention-role-id: ""
    notify-on-created: true
    notify-on-resolved: true
```

See [Discord Webhooks](/plugins/dgems/features/webhooks/).

## Leaderboard

```yaml
top:
  page-size: 10
```

## GUI titles

```yaml
gui:
  titles:
    shop: "<dark_purple><bold>Gem Shop</bold></dark_purple>"
    confirm-purchase: "<dark_purple>Confirm purchase</dark_purple>"
    orders: "<dark_purple>Your orders</dark_purple>"
    top: "<dark_purple>Top balances</dark_purple>"
    confirm-transfer: "<dark_purple>Confirm transfer</dark_purple>"
    admin-items: "<dark_red>Shop items</dark_red>"
    admin-item-edit: "<dark_red>Edit item</dark_red>"
    admin-orders: "<dark_red>Order queue</dark_red>"
```

All MiniMessage. The admin titles are deliberately a different colour from the player ones — a staff member glancing at a screenshot can tell which side of the plugin it came from.

## Security note

`orders.webhook.url` is a credential. `chmod 600` the file and keep it out of screenshots.

## Next

- [database.yml](/plugins/dgems/configuration/database/)
- [messages.yml](/plugins/dgems/configuration/messages/)
