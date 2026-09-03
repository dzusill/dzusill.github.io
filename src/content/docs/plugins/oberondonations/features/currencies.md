---
title: "Currencies"
description: "A purchase is always shown in the currency it was actually paid in. A €2.09 donation reads €2.09; a $4.99 one reads $4.99. Nothing is ever converted,…"
---

A purchase is always shown in the currency it was actually paid in. A €2.09 donation reads €2.09; a $4.99 one reads $4.99. Nothing is ever converted, anywhere, and that will not change — see [Known Limitations](/plugins/oberondonations/limitations/).

## Per-purchase placeholders

| Placeholder | Shows |
|---|---|
| `{amount}` | The formatted amount **with** its own currency symbol, e.g. `$4.99` or `€2.09` |
| `{amount_plain}` | The bare number, `4.99`, if you want to place the currency symbol yourself |
| `{amount_raw}` | Unformatted, for sorting or arithmetic |
| `{currency}` | The ISO code, e.g. `USD` |
| `{currency_symbol}` | Just the symbol, e.g. `$` |

These are always exact — a single purchase never mixes units with anything else.

## Currency layout

`format.currency-pattern` in `config.yml` controls how the symbol and number combine. Left blank (the default), each currency uses its own real-world convention: symbol before the number for most, but after it for `PLN`, `CZK`, `SEK`, `NOK` and `DKK`, which are conventionally written that way (`12,50 zł`, not `zł12,50`). Set an explicit pattern like `'{symbol}{amount}'` or `'{amount} {code}'` to override that everywhere.

`format.currency-symbols` overrides or adds a symbol for a currency code. Recognised out of the box: `USD EUR GBP CAD AUD NZD JPY CNY INR BRL MXN PLN CZK SEK NOK DKK CHF RUB TRY ZAR`. Anything else shows its bare ISO code until you add one.

## Where "mixed" totals come from

Leaderboards, community goal progress and lifetime totals are all **sums of one number** — they do not know or care what currency each contributing purchase was in. If your donation history genuinely spans more than one currency, those aggregate figures mix units, silently, because there is no honest single currency to convert them into without picking an arbitrary exchange rate that would go stale immediately.

```
/donations currencies
```

shows exactly how your recorded history splits by currency — the tool for noticing this before it surprises you, not a fix for it.

## Where it matters most

- **Community goals** — a goal's `currency` in `goals.yml` must match `store.default-currency` in `config.yml`, or it refuses to start, precisely so it never silently measures the wrong thing.
- **The Hype Train and GG Wave** — their thresholds (`min-amount`, `target`, and so on) are compared in whatever unit your purchases arrive in; if you take payments in more than one currency, size these thresholds with that in mind.
