---
title: "Buying Tickets"
description: "Or click the buy button in /lot. Requires blottery.buy."
---

```
/lot buy <amount>
```

Or click the buy button in `/lot`. Requires `blottery.buy`.

---

## Price

```yaml
ticketPrice: 3000
```

Charged per ticket through Vault. Buying three costs three times the price, in one transaction — a player is never charged for a partial purchase.

## The ticket cap

```yaml
maxTickets:
  blottery:
    default: 1
    iron: 2
    gold: 3
    diamond: 4
    emerald: 5
```

Each key doubles as a permission node: `maxTickets.blottery.gold` is granted by `blottery.gold`.

A player's cap is the **highest value among the tiers they hold**, so overlapping ranks are not additive — someone with both `blottery.iron` and `blottery.emerald` gets 5, not 7.

A player with no tier at all gets **1**.

### Wiring it to ranks

```
lp group default permission set blottery.default true
lp group vip     permission set blottery.gold true
lp group vip+    permission set blottery.emerald true
```

Rename the keys to match your ranks — the names are yours, not fixed by the plugin. Keep the values ordered so a better rank is a bigger number, or the "highest wins" rule produces surprises.

## Rejections

| Reason | What the player is told |
|---|---|
| Not enough money | the shortfall |
| Over their cap | their cap and how many they already hold |
| Round closed | the round is drawing; wait for the next one |
| Invalid amount | zero or negative is rejected |

Every rejection leaves the player's balance untouched.

## Refunds

Tickets are refunded when an admin runs `/lot reset`. That is the only automatic refund path — a completed draw is final.

## Odds

The GUI shows a player's current chance: their tickets against the total sold. It updates as other people buy, so the number moves during a round — which is exactly the pressure that makes people buy again.

## Next

- [The Lottery GUI](/plugins/blottery/features/the-gui/)
