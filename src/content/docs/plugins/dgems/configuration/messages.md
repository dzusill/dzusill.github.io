---
title: "messages.yml"
description: "Every line the plugin sends, in MiniMessage."
---

Every line the plugin sends, in [MiniMessage](https://docs.advntr.dev/minimessage/format.html).

---

## Structure

Messages are grouped by area:

| Section | Covers |
|---|---|
| top-level | prefix, `no-permission`, `players-only`, `invalid-usage`, `player-not-found` |
| `balance` | `/gems balance`, own and others |
| `pay` | transfer flow — confirmation, success, and every rejection reason |
| `shop` | browsing, `shop.purchase.success`, out of stock, cooldown |
| `orders` | player order history and status lines |
| `admin` | give / take / set / grant / verify / audit results |

## Amount formatting

Amounts are rendered by `currency.format` in `config.yml`, **not** here. Change the currency's look in one place and every message follows. `messages.yml` controls the sentences around the number.

## Multi-line messages

Any key may be a list, and each entry becomes its own line:

```yaml
shop:
  purchase:
    success:
      - "<prefix><green>Purchase complete!"
      - "<gray>Order <white>#%order%</white> — staff will deliver it shortly."
      - "<gray>Track it with <white>/gems orders</white>."
```

## Common placeholders

| Placeholder | Where |
|---|---|
| `%player%` | most messages |
| `%amount%` | balance, transfer, admin |
| `%item%` | shop and order messages |
| `%price%` | purchase messages |
| `%order%` | order messages |
| `%seconds%` | cooldown messages |

## Making support self-service

Two changes remove most staff questions:

```yaml
shop:
  purchase:
    success:
      - "<prefix><green>Purchase complete — order <white>#%order%</white>."
      - "<gray>Check its status any time with <click:run_command:/gems orders><white><u>/gems orders</u></white></click>."
```

A clickable `/gems orders` in the purchase message answers "where is my reward?" before it gets asked.

## Reloading

```
/gems admin reload
```

Reloads `config.yml` and `messages.yml`. See [Reloading](/plugins/dgems/configuration/reloading/).

## Next

- [Reloading](/plugins/dgems/configuration/reloading/)
