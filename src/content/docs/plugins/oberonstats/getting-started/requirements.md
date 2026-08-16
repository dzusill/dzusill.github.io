---
title: "Requirements"
description: "Leaderboards must be on, or every rank, page and position placeholder is blank:"
---

| Requirement | Version | Why |
|---|---|---|
| Paper / Purpur / Folia | **1.21+** | Server platform |
| Java | **21+** | Compile target |
| OberonCore (DzusillCore) | **1.12.0+** | The framework OberonStats is built on — a separate jar in `plugins/` |
| ExcellentEconomy | **2.8.0+** | The data source |
| nightcore | as required by ExcellentEconomy | ExcellentEconomy already depends on it; nothing extra to install |
| PlaceholderAPI | any recent release | OberonStats publishes placeholders and nothing else — without it the plugin enables, warns, and does nothing |

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
