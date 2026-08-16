---
title: "ExcellentEconomy"
description: "OberonStats is a read-only consumer of ExcellentEconomy. It never deposits, withdraws or sets a balance, and it registers no currency of its own."
---

OberonStats is a read-only consumer of [ExcellentEconomy](https://nightexpressdev.com/excellenteconomy/). It never deposits, withdraws or sets a balance, and it registers no currency of its own.

## What it reads

| ExcellentEconomy API | Used for |
|---|---|
| `getCurrencies()` / `currencyById(id)` | Turning `<track>` in a placeholder into a currency |
| `getBalance(Player, currency)` | An online player's live value |
| `TopManager.getTopEntries(currency)` | The leaderboard, for `top_*` and `page_*` |
| `TopManager.getTopEntry(currency, name)` | Any player's rank and value, offline included, with no database hit |
| `TopManager.getTotalBalance(currency)` | `server_balance` |
| `loadUserDataByName(name)` | Last resort for a player who is neither online nor ranked — asynchronous, cached |
| `ExcellentCurrency.format/formatCompact/formatRaw` | Formatting, so numbers look exactly as they do everywhere else in ExcellentEconomy |

## What stays ExcellentEconomy's job

- **Ranking and the rebuild timer** (`Top.Update_Interval`, 900s by default).
- **Hiding staff** — anybody with `coinsengine.hidefromtops` never reaches OberonStats.
- **Number formatting**, including compact forms and MiniMessage styling.
- **Per-currency leaderboard opt-out** (`Leaderboard.Enabled: false` in a currency file).

If a leaderboard looks stale or a player is missing from it, the fix is in ExcellentEconomy's config, not here.

## Turning leaderboards on

Rank, position and page placeholders need them:

```yaml
# ExcellentEconomy/config.yml
Top:
  Enabled: true
```

OberonStats logs a warning at startup when they are off.

## Overlap with EE's own placeholders

ExcellentEconomy's expansion keeps working; use whichever fits.

| Need | Use |
|---|---|
| Viewer's balance in chat or TAB | `%excellenteconomy_balance_coins%` is fine |
| Another player's balance | `%oberonstats_balance_coins_of_<name>%` — EE has no equivalent |
| Leaderboard row that must vanish when empty | `%oberonstats_top_line_1_coins%` |
| Leaderboard row where `Nobody`/`0` is acceptable | either |

## Version

Compiled against **ExcellentEconomy 2.8.0** and **nightcore 2.16.4**. Both are `provided` dependencies — nothing is shaded into the jar, so the plugin always uses whatever versions the server runs.

CoinsEngine (2.7.x and earlier) uses different package names and is not supported.
