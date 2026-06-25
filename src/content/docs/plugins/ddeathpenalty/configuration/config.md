---
title: "config.yml"
description: "The settings file at plugins/dDeathPenalty/config.yml. It's organised as one default penalty profile plus worlds and groups overrides. Apply changes with…"
---

The settings file at `plugins/dDeathPenalty/config.yml`. It's organised as one **default** penalty profile plus `worlds` and `groups` overrides. Apply changes with `/dp reload`.

## settings

```yaml
settings:
  stats-save-interval-seconds: 300
  ignore-ops: false
```

| Key | Default | Description |
|---|---|---|
| `stats-save-interval-seconds` | `300` | How often cached [stats](/plugins/ddeathpenalty/features/stats/) are flushed to `stats.yml`. |
| `ignore-ops` | `false` | `true` = operators are completely ignored by the plugin. |

## The profile structure

`default`, each `worlds.<world>`, and each `groups.<group>` share the same shape. Overrides only need the keys they change — see [Penalty Profiles](/plugins/ddeathpenalty/features/penalty-profiles/) for the layering.

```yaml
default:
  enabled: true
  money:   { enabled: true, mode: PERCENT, amount: 10.0, min: 0.0, max: -1.0, pvp-multiplier: 1.0 }
  exp:     { enabled: true, keep: false, lose-levels: -1 }
  items:   { mode: VANILLA, random-count: 1 }
  respawn: { set-health: -1.0, set-food: -1, potion-effects: [] }
  monster: { enabled: false, mobs: [ ... ] }
  money-item: { enabled: false, material: GOLD_INGOT, currency-per-item: 100.0, fixed-count: -1 }
  commands: []
```

| Block | Reference |
|---|---|
| `money` | [Money Penalty](/plugins/ddeathpenalty/features/money-penalty/) |
| `exp` | [XP Penalty](/plugins/ddeathpenalty/features/xp-penalty/) |
| `items` | [Item Penalty](/plugins/ddeathpenalty/features/item-penalty/) |
| `respawn` | [Respawn Effects](/plugins/ddeathpenalty/features/respawn-effects/) |
| `monster`, `money-item`, `commands` | [Extra Penalties](/plugins/ddeathpenalty/features/extra-penalties/) |

## worlds & groups

```yaml
worlds:
  world_nether:
    money: { amount: 25.0 }

groups:
  vip:
    money: { amount: 5.0 }
```

- `worlds.<world>` overrides apply to deaths in that world.
- `groups.<group>` overrides apply to players with `deathpenalty.group.<group>`; the **first** matching group in file order wins.

Both deep-merge over `default`, so list only the keys you change.
