---
title: "The Currency"
description: "Gems are a whole-number balance stored in one place: the database. There is no gem item, no gem block, no scoreboard objective holding the real value.…"
---

Gems are a whole-number balance stored in one place: the database. There is no gem item, no gem block, no scoreboard objective holding the real value. Nothing to duplicate, nothing to drop on death, nothing to lose in a rollback that does not also roll back the ledger.

---

## Naming and formatting

```yaml
currency:
  name-singular: "Gem"
  name-plural: "Gems"
  format: "<gradient:#a855f7:#ec4899><bold>%amount%</bold> %currency%</gradient>"
  group-thousands: true
```

| Key | Effect |
|---|---|
| `name-singular` / `name-plural` | picked automatically by amount — `1 Gem`, `2 Gems` |
| `format` | MiniMessage template with `%amount%` and `%currency%` |
| `group-thousands` | `12345` → `12,345` |

`format` is applied everywhere: chat messages, GUI lore, confirmation screens and the `balance_formatted` placeholder. Rebranding the currency is one config change and a reload.

## Checking a balance

```
/gems balance            # your own
/gems balance <player>   # someone else — needs dgems.balance.others
```

Also available as placeholders for scoreboards and TAB — see [Placeholders](/plugins/dgems/placeholders/).

## The display cache

```yaml
balance-cache-ttl-seconds: 3
```

Balances may be served from memory for up to this long **for display only**. Spending always re-reads the database inside the transaction that debits it.

The distinction matters: a scoreboard three seconds behind is harmless. A purchase validated against a stale balance is an overdraft. dGems never does the second one, which is why the cache can be aggressive without risk.

Set it to `0` to disable caching if you would rather have every placeholder hit the database.

## The leaderboard

```
/gems top
```

Opens a paginated GUI of the highest balances, `top.page-size` per page (default 10).

## Where balances come from

| Source | Ledger type |
|---|---|
| Admin give / take / set | `ADMIN_GIVE`, `ADMIN_TAKE`, `ADMIN_SET` |
| Player transfer | `TRANSFER_OUT` + `TRANSFER_IN` |
| Shop purchase | `PURCHASE` |
| Cancelled order | `REFUND` |
| Webstore grant | `EXTERNAL_GRANT` |
| Other deposits / withdrawals | `DEPOSIT`, `WITHDRAW` |

Every one is a row. A balance that changed without a ledger row is not possible — they are written in the same transaction.

## Next

- [Transfers](/plugins/dgems/features/transfers/)
- [Ledger & Audit](/plugins/dgems/features/ledger-and-audit/)
