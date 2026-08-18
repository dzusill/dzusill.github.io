---
title: "Requirements"
description: "ExcellentEconomy is declared as a hard dependency, so it must be installed even if you only want the vanilla"
---

| Requirement | Version | Why |
|---|---|---|
| Paper / Purpur / Folia | **1.21+** | Server platform |
| Java | **21+** | Compile target |
| OberonCore (DzusillCore) | **1.12.0+** | The framework OberonStats is built on — a separate jar in `plugins/` |
| PlaceholderAPI | 2.12+ on 1.21.9 and newer | OberonStats publishes placeholders and nothing else — without it the plugin enables, warns, and does nothing |
| ExcellentEconomy | **2.8.0+** | Only for currency tracks |
| nightcore | as required by ExcellentEconomy | ExcellentEconomy already depends on it; nothing extra to install |
| Vault + an economy plugin | any | Only for the `money` track |
| Vanilla statistic tracks | — | Nothing to install: kills, deaths, playtime and blocks come from the server's own data |

ExcellentEconomy is declared as a hard dependency, so it must be installed even if you only want the vanilla
statistic tracks. Vault is optional — without it the `money` track is skipped and everything else works.

## ExcellentEconomy settings that matter

Leaderboards must be on, or every rank, page and position placeholder is blank:

```yaml
# ExcellentEconomy/config.yml
Top:
  Enabled: true
  Update_Interval: 900   # seconds between rebuilds
```

A currency can also opt out individually:

```yaml
# ExcellentEconomy/currencies/<id>.yml
Leaderboard:
  Enabled: true
```

OberonStats logs a warning on startup when leaderboards are off, so you are not left guessing.

## Version note

ExcellentEconomy **2.8.0** is the first release under that name; earlier versions were called CoinsEngine and use different package names. OberonStats is compiled against 2.8.0 and will not hook CoinsEngine 2.7.x or older.
