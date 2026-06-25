---
title: "config.yml"
description: "The single settings file at plugins/ToolsNotifier/config.yml. Apply changes with /tn reload. Four top-level sections: Settings, IgnoreItems, Messages and…"
---

The single settings file at `plugins/ToolsNotifier/config.yml`. Apply changes with `/tn reload`. Four top-level sections: `Settings`, `IgnoreItems`, `Messages` and `Sounds` (the last two are covered in [Messages & Sounds](/plugins/toolsnotifier/configuration/messages/)).

---

## Global thresholds

```yaml
Settings:
  NotifyInActionBar: true
  NotifyInMessage: true
  NotifyIfBelowPercentage: 90
  CriticalIfBelowPercentage: 10
  NotifyDelayInSeconds: 3
  UnbreakingAware: true
```

| Key | Default | Description |
|---|---|---|
| `NotifyInActionBar` | `true` | Master toggle for the action-bar channel. |
| `NotifyInMessage` | `true` | Master toggle for the chat channel. |
| `NotifyIfBelowPercentage` | `90` | Global warn threshold (fallback). |
| `CriticalIfBelowPercentage` | `10` | Global critical threshold; must be **lower** than the warn %. |
| `NotifyDelayInSeconds` | `3` | Per-player cooldown between notifications. |
| `UnbreakingAware` | `true` | Account for Unbreaking before comparing thresholds. |

See [How Notifications Work](/plugins/toolsnotifier/features/how-notifications-work/).

---

## Categories & overrides

```yaml
Settings:
  Categories:
    Tools:  { Enabled: true, Percentage: 90, CriticalPercentage: 10 }
    Armor:  { Enabled: true, Percentage: 50, CriticalPercentage: 10 }
    Elytra: { Enabled: true, Percentage: 20, CriticalPercentage: 5 }
  ItemOverrides:
    DIAMOND_PICKAXE: { Enabled: true, Percentage: 50 }
    ELYTRA:          { Enabled: false }
```

Per-category and per-material thresholds. Full reference in [Thresholds & Categories](/plugins/toolsnotifier/features/thresholds-and-categories/).

---

## Title & boss bar

```yaml
Settings:
  Title:
    NotifyInTitle: true
    FadeInTime: 5
    StayOnScreenTime: 20
    FadeOutTime: 10
  BossBar:
    NotifyInBossBar: false
    DurationTicks: 60
    WarnBarColor: YELLOW
    CriticalBarColor: RED
```

The title and boss-bar channels — see [Notification Channels](/plugins/toolsnotifier/features/notification-channels/). Boss-bar colours are limited to the seven Minecraft values.

---

## PRO inventory scan

```yaml
Settings:
  ProInventoryScan:
    Enabled: true
    IntervalSeconds: 30
```

PRO only — the periodic [inventory scan](/plugins/toolsnotifier/features/inventory-scan/).

---

## Ignored items

```yaml
IgnoreItems:
  - ''
```

A list of [Bukkit Material](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Material.html) names never to notify about — overriding categories and overrides.
