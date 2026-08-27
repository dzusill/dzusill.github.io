---
title: "Placeholders"
description: "Needs PlaceholderAPI. The namespace is %dshop...%."
---

Needs **PlaceholderAPI**. The namespace is `%dshop_...%`.

## Balances

| | |
|---|---|
| `%dshop_balance_<currency>%` | The player's balance in a currency from `economy.currencies` |

```
%dshop_balance_money%
%dshop_balance_stardust%
```

## Prices

| | |
|---|---|
| `%dshop_price_<shop>_<product>%` | Current effective price, formatted |
| `%dshop_price_raw_<shop>_<product>%` | The same, unformatted, for maths |
| `%dshop_currency_<shop>_<product>%` | The currency's display name |

```
%dshop_price_blocks_oak_log%
%dshop_price_raw_keys_plasma%
```

Prices are quoted **for the viewer**, so a rank discount shows in that player's scoreboard rather than
the shop's list price.

## Stock and limits

| | |
|---|---|
| `%dshop_stock_<shop>_<product>%` | What is left, or `unlimited` |
| `%dshop_stock_percent_<shop>_<product>%` | 0–100 |
| `%dshop_limit_remaining_<shop>_<product>%` | What this player may still buy |
| `%dshop_limit_reset_<shop>_<product>%` | Time until the window rolls, e.g. `4h 20m` |

## Sales

| | |
|---|---|
| `%dshop_sale_active_<shop>_<product>%` | `true` / `false` |
| `%dshop_sale_percent_<shop>_<product>%` | 0–100, or 0 when nothing is running |

## The player

| | |
|---|---|
| `%dshop_last_item%` | The product they bought last |
| `%dshop_last_variant%` | Which choice, if it had any |
| `%dshop_favorites_count%` | How many favourites they have |

## Asking about someone else

Append `_of_<player>`:

```
%dshop_favorites_count_of_Steve%
%dshop_limit_remaining_blocks_oak_log_of_Steve%
```

The target must be online — these read counters keyed by UUID, and resolving a name offline would mean a
blocking lookup on whatever thread PlaceholderAPI is using.

## Two rules that explain the odd shapes

**`<shop>_<product>` splits on the first underscore.** That is why a category id may not contain one and
a product id freely may — `%dshop_price_blocks_oak_log%` is `blocks` / `oak_log`.

**The target is introduced by the literal `_of_` token**, because player names contain underscores.
Everything after the first `_of_` is unambiguously a name.

## If one prints itself

A placeholder that cannot be parsed or answered returns nothing, which leaves the raw text on screen.
That is deliberate: a typo reads as a typo. An empty string would look like a working placeholder for a
blank value, and you would go looking for the wrong bug.

Common causes: a category id with an underscore in it, a product that does not exist, a currency id that
is not in `economy.currencies`, or an offline `_of_` target.
