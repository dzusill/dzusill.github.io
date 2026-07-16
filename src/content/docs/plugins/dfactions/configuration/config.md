---
title: "config.yml"
description: "The main settings file, plugins/dFactions/config.yml. Apply changes with /fa reload"
---

The main settings file, `plugins/dFactions/config.yml`. Apply changes with `/fa reload`
(settings that need a full restart are noted in the file). Database settings live separately in
[database.yml](/plugins/dfactions/configuration/database/).

## Feature toggles

These systems ship **disabled by default** — flip them on when ready:

| System | Path | Default |
|---|---|---|
| Beacon HQ | `factions.beacon.enabled` | `false` |
| Purchasable shields | `factions.shield.enabled` | `false` |
| Declared wars | `factions.war.enabled` | `false` |
| Supply drops | `factions.supply-drops.enabled` | `false` |
| Bank tax | `factions.economy.tax.enabled` | `false` |
| Bank interest | `factions.economy.interest.enabled` | `false` |
| Faction merges | `factions.merge.enabled` | `false` |
| Admin war-shield | `factions.war.shield.enabled` | `false` |
| Phalanx Discord | `integrations.phalanx.enabled` | `false` |

Enabled by default: leveling, combat stats, economy, fly, safe/war zones, bStats, update checks.

## Core limits

```yaml
factions:
  max-members: 50
  max-warps: 10
  max-team-chests: 1
  max-allies: 5
  max-truces: 5
  invites: { ttl-hours: 72 }
```

## Language

```yaml
factions:
  language:
    default: en                    # server default locale
    allow-player-override: false   # English-only for now — player overrides disabled
    command-opens-gui: true
    visible-locales: ["en"]
```

See [Messages & Languages](/plugins/dfactions/configuration/messages/).

## Sections at a glance

Each system has its own section; the full detail is on the feature pages:

- `factions.land`, `factions.claims`, `factions.zones`, `factions.territory`, `factions.visualizer` —
  [Territory & Claims](/plugins/dfactions/features/territory/)
- `factions.leveling`, `factions.prestige` — [Leveling & Prestige](/plugins/dfactions/features/progression/)
- `factions.beacon` — [Beacon HQ](/plugins/dfactions/features/beacon/)
- `factions.stats`, `factions.shield`, `factions.war` — [Wars, Shields & Stats](/plugins/dfactions/features/wars-and-shields/)
- `factions.economy` — [Economy & Bank](/plugins/dfactions/features/economy/)
- `factions.supply-drops` — [Supply Drops](/plugins/dfactions/features/supply-drops/)
- `factions.flags` — per-faction PvP/explosion/fire/open toggles
- `factions.fly` — faction flight in own territory
- `integrations.*` — [Integrations](/plugins/dfactions/integrations/)

## Flags

```yaml
factions:
  flags:
    pvp:           { default: true,  player-editable: true }
    friendly-fire: { default: false, player-editable: true }
    explosions:    { default: false, player-editable: true }
    fire-spread:   { default: false, player-editable: true }
    open:          { default: false, player-editable: true }   # join without invite
```

Officers toggle flags with `/f flag set <flag>` unless `player-editable: false`.

## Fly

```yaml
factions:
  fly: { enabled: true, disable-on-threat: true, require-own-territory: true }
```

## Territory indicators & border visualizer

```yaml
factions:
  territory:
    message-max-length: 64       # max length of a custom /f entermsg /f leavemsg subtitle
  visualizer:
    enabled: true
    particle: HAPPY_VILLAGER     # any Bukkit Particle; use DUST to colour it
    dust-color: "#3BE55A"        # only used when particle: DUST
    radius-chunks: 3
    interval-ticks: 10
    duration-seconds: 30
    height: 3
    points-per-edge: 8
```

`/f entermsg` / `/f leavemsg` set a faction's custom territory title+subtitle (officer+), and
`/f border` toggles the particle claim-border visualizer for the player who ran it. See
[Territory & Claims](/plugins/dfactions/features/territory/).

## Metrics & updates

```yaml
factions:
  metrics: { bstats: { enabled: true } }
  updates: { enabled: true, notify-ops-on-join: true }
```
