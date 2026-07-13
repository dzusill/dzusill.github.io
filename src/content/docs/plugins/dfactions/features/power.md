---
title: "Power & Raiding"
description: "Power is the raid/PvP-vulnerability axis. Each online member contributes power; a faction whose"
---

**Power** is the raid/PvP-vulnerability axis. Each online member contributes power; a faction whose
power falls below its claim count can be overclaimed. Power is independent of faction **level** —
level/prestige handle progression and claim capacity, power handles raidability.

## How power works

```yaml
factions:
  power:
    per-player-max: 10.0          # max power each member contributes
    regen-per-second: 0.1
    loss-on-death: 4.0
    grace-period-seconds: 3600    # after restart, before death-loss applies
    tick-interval-seconds: 60
```

- Members **regenerate** power over time while online.
- Dying (in enemy or war-zone territory) **costs** power.
- Killing an enemy can **grant** power.

## Kill rewards

```yaml
factions:
  power:
    gain-on-kill:
      enabled: true
      amount: 2.0
      scale: { enabled: false, min-factor: 0.25, max-factor: 2.0 }
```

With `scale.enabled`, killing a stronger enemy pays more, a weaker one less.

## Anti-abuse & tuning

```yaml
factions:
  power:
    inactive-exclusion: { enabled: false, days: 7 }   # dead factions lose land cap
    death-streak:       { enabled: false, window-seconds: 600, multiplier: 1.5 }
    buy:                { enabled: false, cost-per-point: 100.0, max-per-purchase: 5.0 }
    constraints:        { min-power: 0.0, max-power: 10.0, max-change-per-event: 0.0 }
    freeze:             { blocks-automatic: true, blocks-regen: true, allow-admin-bypass: true }
```

- **inactive-exclusion** — members offline beyond N days stop counting toward the land cap,
  discouraging dead factions from hoarding territory.
- **death-streak** — escalating penalties for repeated quick deaths.
- **buy** — optional: let players purchase personal power with money.
- **freeze** — admins can freeze a player's power (`/fa power freeze`).

## Commands

```
/f power [player]     # view faction / player power
/f power history      # recent power changes
/fa power <view|set|add|remove|reset|freeze|history> <player> [amount]
```

## Raidable broadcasts

```yaml
factions:
  raidable:
    broadcast: { enabled: true, server-wide: false }
```

Members (and optionally the whole server) are notified when a faction flips between raidable and
safe during a power tick.
