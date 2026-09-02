---
title: "Quick Start"
description: "Five minutes to a tuned feed."
---

Five minutes to a tuned feed.

## 1. See what it would list

```
/auctionfeed preview
```

This rolls a batch and prints it **without listing anything**. It runs the identical code path a real restock
does and stops before the insert, so what you see is what you would get:

```
Preview — 11 listings this plugin would create right now:
 • 48x Iron Ingot [Common] for 1,920
 • 16x Diamond [Rare] for 4,300 (market-adjusted)
 • 1x Diamond Pickaxe [Epic] for 27,500
 • 32x Redstone [Common] for 640 (raised by price floor)
```

Run it as many times as you like. It is the right way to tune tiers.

## 2. Set the restock time

```yaml
restock:
  mode: DAILY_AT
  hour: 4          # 24h clock
  minute: 0
  timezone: ""     # blank = the machine's own zone
```

Pick a low-traffic hour. Players wake up to a full auction house.

Prefer several drops a day?

```yaml
restock:
  mode: INTERVAL
  interval-hours: 8
```

## 3. Set the batch size

```yaml
restock:
  items:
    min: 8
    max: 14
```

Rolled fresh every restock, so the number varies. Set both to the same value for a fixed count.

## 4. Check the price floor

This is the setting that keeps your economy safe. Leave it on.

```yaml
pricing:
  floor:
    enabled: true
    multiplier: 1.5
    source: DDONUTWORTH
```

`/auctionfeed status` shows which source it actually attached to. If it says `pool` rather than `dDonutWorth`,
the floor is working from an estimate — still safe, just less precise. See [The Price Floor](/plugins/dauctionfeed/features/price-floor/).

## 5. Tune the tiers

Weights decide how often each tier is picked; the ranges decide what it produces.

```yaml
rare:
  weight: 18
  price-multiplier: { min: 0.90, max: 1.40 }
  amount: { min: 4, max: 32, snap-to: 4 }
  enchant:
    chance: 0.30
```

After every edit:

```
/auctionfeed reload
/auctionfeed preview
```

## 6. Trim the pool

The bundled fill prices the entire vanilla catalogue, which includes plenty you may not want sold by the server.

```
/auctionfeed list rare          # see what is in a tier
/auctionfeed removeitem bedrock # delete an entry
```

To keep an entry but never list it, set `weight: 0.0` in `items.yml`. Its price is still used by the market
comparison and the price floor, which deleting would lose.

Adding your own is a held item away:

```
/auctionfeed additem legendary 25000
```

## 7. Go live

```
/auctionfeed restock
```

Runs a restock now and moves the schedule on, exactly as the timer would.

---

## Where to go next

- [Restocks](/plugins/dauctionfeed/features/restocks/) — timing, catch-up, clearing the previous batch
- [How a Price Is Built](/plugins/dauctionfeed/features/pricing/) — the full formula, in order
- [Sellers & the Money Sink](/plugins/dauctionfeed/features/sellers-and-money-sink/) — who sells, and where the money goes
- [Announcements](/plugins/dauctionfeed/features/announcements/) — chat, sound, title, Discord
