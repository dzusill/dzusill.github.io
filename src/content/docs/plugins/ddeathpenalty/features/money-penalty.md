---
title: "Money Penalty"
description: "Take money from a player when they die. Requires Vault + an economy plugin; without one, money penalties are skipped."
---

Take money from a player when they die. Requires [Vault](https://www.spigotmc.org/resources/vault.34315/) + an economy plugin; without one, money penalties are skipped.

```yaml
money:
  enabled: true
  mode: PERCENT
  amount: 10.0
  min: 0.0
  max: -1.0
  pvp-multiplier: 1.0
```

| Key | Default | Description |
|---|---|---|
| `enabled` | `true` | Toggle the money penalty. |
| `mode` | `PERCENT` | `PERCENT` = a percentage of the player's balance; `FIXED` = a flat amount. |
| `amount` | `10.0` | The percentage (PERCENT) or currency amount (FIXED). |
| `min` | `0.0` | Minimum loss, in currency units. |
| `max` | `-1.0` | Maximum loss; `-1` disables the cap. |
| `pvp-multiplier` | `1.0` | The loss is multiplied by this when the player was killed by another player. |

## How it's calculated

1. Compute the base loss: `balance × amount%` (PERCENT) or `amount` (FIXED).
2. If killed by a player, multiply by `pvp-multiplier`.
3. Clamp to `[min, max]` (unless `max: -1`).
4. Withdraw it; the player sees *"You died and lost `%money_lost%`."*

### Example

`mode: PERCENT, amount: 10, pvp-multiplier: 2.0` — a player with $1,000 killed by a mob loses **$100**; killed by another player, they lose **$200**.

## The lost money

By default the money simply vanishes (a sink). You can instead make it **drop as a physical item** at the death spot — see the money-item option in [Extra Penalties](/plugins/ddeathpenalty/features/extra-penalties/). The amount lost is also tracked for [stats & leaderboards](/plugins/ddeathpenalty/features/stats/) and the `%money_lost%` placeholder.
