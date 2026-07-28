---
title: "Installation"
description: "DzusillCore is a separate download. dKillTracker will not enable without it."
---

## 1. Drop in both jars

```
plugins/
├── DzusillCore.jar      ← required framework
└── dKillTracker.jar
```

DzusillCore is a separate download. dKillTracker will not enable without it.

## 2. Start the server

On first start the plugin creates:

```
plugins/dKillTracker/
├── config.yml       tracking, anti-farm, milestones, leaderboard
├── messages.yml     every line of text the plugin sends
├── database.yml     optional SQL storage (disabled by default)
└── kills.yml        the kill data itself — created on the first save
```

You should see this in the console:

```
[dKillTracker]
[dKillTracker]   dKillTracker v1.0.0
[dKillTracker]   Powered by DzusillCore
[dKillTracker]
[dKillTracker] Registered PlaceholderAPI expansion 'killtracker'.
```

The last line only appears when PlaceholderAPI is installed.

## 3. Point the milestones at your rank commands

The shipped `config.yml` uses `rank %player% <name>` as a placeholder for whatever your permissions plugin actually uses. Open it and fix those lines before anyone hits 5 kills — see [Milestones & Ranks](/plugins/dkilltracker/features/milestones/).

For LuckPerms, that usually means:

```yaml
Tiers:
  '5':
    Rank: "Bandit"
    Commands:
      - "lp user %player% parent set bandit"
```

## 4. Reload

```
/killtracker reload
```

No restart needed for config or message changes. See [Reloading](/plugins/dkilltracker/configuration/reloading/) for the one setting that is an exception.

## Updating

Replace `dKillTracker.jar` and restart. Your `config.yml`, `messages.yml` and `kills.yml` are kept. New config keys added by an update are merged in automatically, with their comments — **except** the milestone tiers, which are deliberately left alone so a tier you deleted stays deleted.

## Uninstalling

Stop the server, delete `dKillTracker.jar`. Keep `plugins/dKillTracker/` if you might come back — the kill counts are in there.
