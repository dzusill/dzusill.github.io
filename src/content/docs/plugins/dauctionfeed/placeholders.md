---
title: "Placeholders"
description: "Requires PlaceholderAPI. The expansion registers itself when PlaceholderAPI is installed, and is simply absent"
---

Requires **PlaceholderAPI**. The expansion registers itself when PlaceholderAPI is installed, and is simply absent
when it is not — no configuration either way.

Identifier: `dauctionfeed`

## Available

| Placeholder | Example | What it is |
|---|---|---|
| `%dauctionfeed_next_restock%` | `3h 12m` | Time until the next restock, formatted |
| `%dauctionfeed_next_restock_seconds%` | `11520` | Seconds until the next restock |
| `%dauctionfeed_next_restock_clock%` | `2026-09-02 04:00` | Wall-clock time of the next restock, in the restock timezone |
| `%dauctionfeed_active_listings%` | `12` | How many seeded listings are live right now |
| `%dauctionfeed_purchases%` | `1` | How many seeded listings **this player** has bought from the current restock |
| `%dauctionfeed_purchases_left%` | `2` | How many they have left, or `unlimited` |
| `%dauctionfeed_purchase_limit%` | `3` | The configured cap, or `unlimited` |
| `%dauctionfeed_sale%` | `SALE` | The sale tag while a sale is running, otherwise empty |

## Notes

- `next_restock` reads `now` when a restock is due but has not fired yet — the scheduler checks every
  `advanced.check-interval-seconds`.
- `active_listings` counts live listings owned by this plugin's sellers, so it drops as players buy them out.
- `purchases` and `purchases_left` need a player context. On a console or an offline lookup they read `0` and the
  full limit.
- The expansion is registered with `persist`, so it survives a PlaceholderAPI reload rather than going blank until
  the next server restart.

## Examples

Scoreboard line:

```
&7Next restock: &e%dauctionfeed_next_restock%
```

Only show the countdown when something is coming:

```
%dauctionfeed_active_listings% items up &8| &7next in &e%dauctionfeed_next_restock%
```

Sale banner that is empty when no sale is running:

```
%dauctionfeed_sale%
```

Per-player allowance during a drop:

```
&7You can still buy &e%dauctionfeed_purchases_left%&7 of today's items
```
