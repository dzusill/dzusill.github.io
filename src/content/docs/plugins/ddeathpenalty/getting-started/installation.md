---
title: "Installation"
description: "dDeathPenalty depends on DzusillCore 1.1.0+. Put DzusillCore-x.y.z.jar in plugins/ first."
---

## 1. Install DzusillCore

dDeathPenalty **depends** on [DzusillCore](https://github.com/dzusill/DzusillCore) **1.1.0+**. Put `DzusillCore-x.y.z.jar` in `plugins/` first.

## 2. Drop in dDeathPenalty

Place `dDeathPenalty-x.y.z.jar` into `plugins/` and restart. On first start it creates:

```
plugins/dDeathPenalty/
├── config.yml      # the penalty profiles (default / worlds / groups)
├── messages.yml    # player-facing text
└── stats.yml       # tracked deaths & money lost (managed by the plugin)
```

## 3. (Optional) integrations

Install Vault + an economy plugin for money penalties, PlaceholderAPI for leaderboards, and WorldGuard for per-region control.

## 4. Configure & verify

Out of the box, the default profile takes **10% of a player's balance** and uses vanilla item drops. Edit [config.yml](/plugins/ddeathpenalty/configuration/config/) to taste, then:

```
/dp reload
```

Test by dying (or `/kill`) and watching for the *"You died and lost …"* message. Check a player's stats with:

```
/dp check <player>
```

Next: the [Quick Start](/plugins/ddeathpenalty/getting-started/quick-start/).
