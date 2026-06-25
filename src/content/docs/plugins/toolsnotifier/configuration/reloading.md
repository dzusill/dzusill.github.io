---
title: "Reloading"
description: "Apply config changes without restarting the server:"
---

Apply config changes without restarting the server:

```
/tn reload
```

(aliases `/toolsnotifier reload`, `/toolnotifier reload`). Requires `toolsnotifier.reload` (default: op).

The config wrapper **preserves your comments** on reload, and returns a fresh configuration — every change to `Settings`, `Messages`, `Sounds` and `IgnoreItems` takes effect immediately, including thresholds, channels and the PRO inventory-scan interval.

> Per-player [preferences](/plugins/toolsnotifier/features/preferences-gui/) (PRO) are stored separately in `players.yml` and are not affected by a config reload.
