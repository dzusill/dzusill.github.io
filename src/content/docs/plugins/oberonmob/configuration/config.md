---
title: "config.yml"
description: "Hide-mode tuning, feedback channels and the Toggles section, field by field."
---

`plugins/OberonMob/config.yml`. Reload with `/oberonmob reload` — except adding or removing a toggle, which needs a restart.

## Top level

```yaml
Debug: false
```

Extra console logging for working out why a spawn was or wasn't cancelled.

## Hide-Mode

Only relevant to toggles using `Mode: HIDE_ENTITY`. Nothing here runs while no toggle uses it.

```yaml
Hide-Mode:
  Refresh-Ticks: 40
  Hide-Existing: true
```

| Key | Default | What it does |
|---|---|---|
| `Refresh-Ticks` | `40` | How often to re-check what each player should see. 20 ticks = 1 second. Minimum 20. |
| `Hide-Existing` | `true` | Also hide mobs that were already there when the toggle went on. Off means only newly spawned mobs are hidden. |

The sweep is what catches mobs a player walked *towards*, rather than ones that spawned next to them. Lower `Refresh-Ticks` for a snappier effect at more cost; raise it if you have many players using hide mode.

## Feedback

How a player is told their toggle flipped.

```yaml
Feedback:
  Chat-Message: false
  Action-Bar: true
  Sound:
    Enabled: true
    Name: "entity.experience_orb.pickup"
    Volume: 1.0
    Pitch: 1.0
```

All three independent. The defaults match the old script — action bar and a sound, no chat line.

`Name` is any namespaced sound key.

## Toggles

The main section. Each entry becomes a command.

```yaml
Toggles:
  mobs:
    Enabled: true
    Command: mob
    Aliases: [ mobs ]
    Permission: "oberonmob.toggle.mobs"
    Radius: 256
    Mode: CANCEL_SPAWN
    Cancel-When-Others-Nearby: false
    Default-Disabled: false
    Prevent-Targeting: true
    Entities:
      - "#ENEMY"
      - IRON_GOLEM
      - BAT
      - GLOW_SQUID
    Excluded:
      - "#BOSS"
      - BREEZE
      - PHANTOM
    Spawn-Reasons:
      - NATURAL
      - REINFORCEMENTS
      - PATROL
      - RAID
      - VILLAGE_INVASION
```

Every field is documented on [Adding your own toggle](/plugins/oberonmob/features/custom-toggles/).

### The three that matter most

**`Mode`** — `CANCEL_SPAWN` or `HIDE_ENTITY`. The whole trade-off is on [How it works](/plugins/oberonmob/features/how-it-works/).

**`Cancel-When-Others-Nearby`** — `false` means a spawn is only stopped when nobody in range still wants mobs. `true` restores the old script's shared-dead-zone behaviour.

**`Spawn-Reasons`** — what may be cancelled. The default is natural spawning only, which is what keeps farms, spawn eggs and cured villagers safe. See [Spawn reasons](/plugins/oberonmob/features/spawn-reasons/).

### Radius

Ships at `256` to match the old script. **128 is plenty on most servers** — mobs only spawn near players anyway — and makes the nearby-player lookup cheaper. Nothing forces you to change it.

> `Toggles` is never merged back from the defaults. A toggle you delete stays deleted, including the shipped ones.

## A toggle that gets skipped

Two ways an entry is dropped at load, both with a console warning:

```
[OberonMob] Toggle 'mobs' has no command name — skipping it.
[OberonMob] Toggle 'mobs' matches no entities — skipping it.
```

The second usually means every name in `Entities` was misspelled. `/oberonmob status` will show the toggle missing entirely.
