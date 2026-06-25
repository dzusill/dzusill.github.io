---
title: "Installation"
description: "Place one of these into plugins/ and restart:"
---

## 1. Drop in the jar

Place **one** of these into `plugins/` and restart:

- `ToolsNotifier-x.y.z.jar` — the free edition, or
- `ToolsNotifierPro-x.y.z.jar` — the PRO edition.

Don't install both. On first start the plugin creates:

```
plugins/ToolsNotifier/
└── config.yml      # thresholds, channels, messages, sounds
```

PRO also keeps a `players.yml` for per-player [preferences](/plugins/toolsnotifier/features/preferences-gui/).

## 2. (Optional) PlaceholderAPI

Install PlaceholderAPI to use the `%toolsnotifier_…%` [placeholders](/plugins/toolsnotifier/placeholders/).

## 3. Verify

```
/toolsnotifier
```

shows the version line. Then damage a tool and watch for the warning, or check everything you're holding:

```
/tn status
```

## 4. Configure

Tune the thresholds, channels, messages and sounds in [config.yml](/plugins/toolsnotifier/configuration/config/), then apply without a restart:

```
/tn reload
```

Next: the [Quick Start](/plugins/toolsnotifier/getting-started/quick-start/).
