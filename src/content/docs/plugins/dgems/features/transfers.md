---
title: "Transfers"
description: "Player-to-player transfers, behind a confirmation GUI and four independent limits."
---

```
/gems pay <player> <amount>
```

Player-to-player transfers, behind a confirmation GUI and four independent limits.

---

## Configuration

```yaml
transfers:
  enabled: true
  min-amount: 1
  max-amount: 100000
  cooldown-seconds: 30
  daily-cap: 0
  confirmation-timeout-seconds: 30
```

| Key | Default | Effect |
|---|---|---|
| `enabled` | `true` | `false` disables `/gems pay` entirely |
| `min-amount` | 1 | blocks dust-spam transfers |
| `max-amount` | 100000 | per-transfer ceiling |
| `cooldown-seconds` | 30 | per player, between transfers |
| `daily-cap` | 0 | max sent per day; `0` = unlimited |
| `confirmation-timeout-seconds` | 30 | how long the confirm GUI stays valid |

`dgems.bypass.limits` (default **false**, not granted to op) skips the cooldown and the limits. Grant it deliberately — it is the permission that lets an account move any amount at any speed.

---

## The confirmation step

`/gems pay` does not transfer immediately. It opens a GUI showing the recipient and the amount, and waits for a click.

This is a typo guard. `/gems pay Steve 10000` and `/gems pay Steve 1000` differ by one keystroke and the transfer is irreversible — there is no undo, because a reversal would be a second transfer needing the recipient's consent.

Let the confirmation expire and nothing happens. No gems move until the click.

## Atomicity

A transfer is one SQL transaction containing four things:

1. debit the sender
2. `TRANSFER_OUT` ledger row
3. credit the recipient
4. `TRANSFER_IN` ledger row

All four commit or none do. A crash mid-transfer cannot leave gems debited from one account and not credited to the other.

## Offline recipients

Supported. Balances are accounts in the database, not player state, so the recipient does not need to be online.

## Turning transfers off

```yaml
transfers:
  enabled: false
```

Sensible when gems are sold for real money and you do not want a secondary market between players. Admin gives and shop purchases keep working.

## Next

- [The Shop](/plugins/dgems/features/shop/)
