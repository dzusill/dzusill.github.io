---
title: "Buying Tickets"
description: "Buys tickets for the current round (requires dlottery.buy). You can also buy from the GUI."
---

```
/lottery buy <amount>
```

Buys tickets for the current round (requires `dlottery.buy`). You can also buy from the [GUI](/plugins/dlottery/features/the-gui/).

## Price & the pool

Each ticket costs `ticketPrice` (default `3000`), charged through Vault. The money goes into the round's **pool**, minus the configured [tax](#tax):

```
pool contribution = ticketPrice × amount × (100 − taxesPercent) / 100
```

The charge is taken **first** and confirmed before any ticket is recorded — if the database write fails, you're automatically refunded.

## Ticket caps & VIP tiers

Each player has a maximum number of tickets **per round**, set by permission tier:

| Tier | Permission | Default cap |
|---|---|---|
| Default | *(all players)* | 1 |
| Iron | `dlottery.tickets.iron` | 2 |
| Gold | `dlottery.tickets.gold` | 3 |
| Diamond | `dlottery.tickets.diamond` | 4 |
| Emerald | `dlottery.tickets.emerald` | 5 |

The caps and tier names are configurable under `maxTickets` in [settings.yml](/plugins/dlottery/configuration/settings/). Trying to exceed your cap gives *"You can't hold more than `<max>` tickets."*

```
/lp group vip permission set dlottery.tickets.gold true   # 3 tickets/round
```

## Cooldown

A per-player cooldown (`cooldown`, default 2s) sits between purchases to prevent spam: *"Wait `<n>`s before buying again."*

## Failure messages

| Message | Cause |
|---|---|
| *"You don't have enough money for that."* | Vault balance below the cost. |
| *"You can't hold more than X tickets."* | Would exceed your tier cap. |
| *"Wait Ns before buying again."* | Purchase cooldown active. |
