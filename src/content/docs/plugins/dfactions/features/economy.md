---
title: "Economy & Bank"
description: "dFactions has a per-faction bank plus optional tax and interest cycles. Money features"
---

dFactions has a per-faction **bank** plus optional **tax** and **interest** cycles. Money features
use an economy provider through **Vault** — install Vault + an economy plugin to enable them.
Without Vault, money features gracefully no-op.

## Costs

```yaml
factions:
  economy:
    enabled: true
    cost-create: 50.0   # charged on /f create
    cost-claim: 100.0   # charged per chunk on /f claim
```

## The faction bank

```
/f bank                 # (aliases: /f money, /f balance) show balance
/f bank deposit <amt>
/f bank withdraw <amt>
/f bank history         # paginated transaction log
```

The bank funds shield purchases, war stakes (steal-per-kill), tax and interest.

### Bank GUI

The bank menu (Gold Ingot in the [GUI](/plugins/dfactions/features/gui/)) offers quick **green** deposit and **red** withdraw
buttons for each configured amount:

```yaml
factions:
  bank:
    # Deposit/withdraw amount buttons shown in the /f bank GUI (up to 7 values).
    gui-amounts: [1, 10, 100, 1000, 10000, 100000, 1000000]
```

Bank transactions also appear in the **Activity log** GUI, formatted with the acting player's name,
a friendly action label ("Bank Withdraw"), and a grouped amount (`$10,000.00`).

## Tax

**Disabled by default.** Periodically deducts a fraction of each faction's bank — a money sink.

```yaml
factions:
  economy:
    tax:
      enabled: false
      rate: 0.05             # 5% of the bank each interval
      interval-hours: 24
      min-bank-balance: 0.0  # don't tax below this
      min-charge-amount: 0.01
```

## Interest

**Disabled by default.** The mirror of tax — periodically **pays** factions a fraction of their
eligible bank.

```yaml
factions:
  economy:
    interest:
      enabled: false
      rate: 0.02                       # 2% payout each interval
      interval-hours: 24
      max-eligible-balance: 1000000.0  # balance above this earns nothing
      min-balance: 0.0
```

Interest can be boosted by prestige via `factions.prestige.bonuses.interest-boost-per-prestige` —
see [Leveling & Prestige](/plugins/dfactions/features/progression/).

> Tax and interest run on independent Folia-safe schedulers. Run either, both, or neither.

## Warp costs

Warps can carry a per-use cost and/or password, managed by officers:

```
/f warp set <name> [password]
```

Costs are charged through Vault on warp use.
