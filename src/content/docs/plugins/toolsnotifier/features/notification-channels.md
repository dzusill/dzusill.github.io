---
title: "Notification Channels"
description: "A notification can be delivered through four visual channels plus a sound. Each is toggled in config.yml, and on PRO each player can further opt in/out per…"
---

A notification can be delivered through four visual channels plus a sound. Each is toggled in [config.yml](/plugins/toolsnotifier/configuration/config/), and on PRO each player can further opt in/out per channel.

## Channels

| Channel | Toggle | Notes |
|---|---|---|
| **Chat** | `Settings.NotifyInMessage` | Multi-line chat message. |
| **Action bar** | `Settings.NotifyInActionBar` | The text above the hotbar. |
| **Title** | `Settings.Title.NotifyInTitle` | Big on-screen title + subtitle, with fade timings. |
| **Boss bar** | `Settings.BossBar.NotifyInBossBar` | Coloured bar at the top (off by default). |
| **Sound** | `Sounds.Warn` / `Sounds.Critical` | Played alongside the visual channels. |

## Title timings

```yaml
Settings:
  Title:
    NotifyInTitle: true
    FadeInTime: 5
    StayOnScreenTime: 20
    FadeOutTime: 10
```

Times are in ticks (20 ticks = 1 second).

## Boss bar

```yaml
Settings:
  BossBar:
    NotifyInBossBar: false
    DurationTicks: 60
    WarnBarColor: YELLOW
    CriticalBarColor: RED
```

The bar **colour** is limited by Minecraft to seven values: `PINK`, `BLUE`, `RED`, `GREEN`, `YELLOW`, `PURPLE`, `WHITE` (no hex — a client limitation). The bar **text** (`Messages.BossBarMessage`) does support `&` codes and `&#RRGGBB` hex.

## Sounds

```yaml
Sounds:
  Warn: ENTITY_CHICKEN_EGG/0.5/1.0
  Critical: ENTITY_ITEM_BREAK/1.0/1.0
```

Format `SOUND/volume/pitch`, using any valid [Bukkit Sound](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Sound.html) name. A bad sound spec logs a console warning instead of crashing.

> All the message text for each channel lives under `Messages:` — see [Messages & Sounds](/plugins/toolsnotifier/configuration/messages/).
