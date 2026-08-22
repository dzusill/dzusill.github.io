---
title: "Cooldowns & Player Opt-out"
description: "Configure a default announcement cooldown, shorter LuckPerms tiers and the separate per-player receiving toggle."
---

## Cooldown tiers

```yaml
cooldowns:
  default-seconds: 30
  tiers:
    media:
      permission: oberonlive.cooldown.media
      seconds: 15
    partner:
      permission: oberonlive.cooldown.partner
      seconds: 5
```

OberonLive asks Bukkit whether the player holds each configured permission. It has no direct LuckPerms dependency. The shortest eligible value wins:

| Granted nodes | Effective cooldown |
|---|---|
| none | 30 seconds |
| `oberonlive.cooldown.media` | 15 seconds |
| media and partner | 5 seconds |
| `oberonlive.cooldown.bypass` | 0 seconds |

Tier node names are owner-defined and do not need entries in OberonLive's `plugin.yml`. Grant them normally through LuckPerms.

The last successful announcement time is stored in the database, so reconnecting or restarting does not clear the cooldown. A failed validation or failed database write does not advance it.

## Receiving toggle

```text
/live toggle
```

`oberonlive.toggle` defaults to everyone. The setting is stored by UUID in H2 or MySQL.

The toggle controls **receiving other announcements only**:

- a player with receiving disabled can still use `/live <link>` if they have `oberonlive.use`,
- the streamer always sees their own broadcast,
- the console setting and Discord webhook are unaffected.

The shipped enabled/disabled confirmations retain the red OberonLive gradient style from the supplied PerfLive messages. Both messages can be replaced in `messages.yml` and routed through the `TOGGLE` presentation category.

