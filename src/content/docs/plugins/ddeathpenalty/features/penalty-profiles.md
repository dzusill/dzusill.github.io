---
title: "Penalty Profiles"
description: "A profile is the full set of penalties applied on death. dDeathPenalty builds the profile for each death by layering three sources, most specific last."
---

A **profile** is the full set of penalties applied on death. dDeathPenalty builds the profile for each death by layering three sources, most specific last.

## Resolution order

```
default  →  worlds.<world>  →  groups.<group the player has>
```

Each layer **deep-merges** over the previous one, so an override only needs to list the keys it changes — everything else is inherited.

| Layer | Where | Applies to |
|---|---|---|
| **default** | `default:` | Everyone, everywhere. The base profile. |
| **world** | `worlds.<world>:` | Deaths in that world. |
| **group** | `groups.<group>:` | Players matched to that group. |

### Example

```yaml
default:
  money: { mode: PERCENT, amount: 10.0 }
worlds:
  world_nether:
    money: { amount: 25.0 }   # only changes the amount
groups:
  vip:
    money: { amount: 5.0 }
```

A VIP dying in the nether resolves to: PERCENT mode (from default), amount **5.0** (group beats world). A normal player dying in the nether gets amount **25.0**.

## How groups are matched

A player belongs to a group if they have the permission `deathpenalty.group.<name>`. If they match several, the **first group listed top-to-bottom** in `config.yml` wins. Assign with any permission plugin:

```
/lp group vip permission set deathpenalty.group.vip true
```

> **It's a permission node, not a LuckPerms group name.** Being in LuckPerms group `vip` does nothing by itself — you must grant the `deathpenalty.group.vip` node to that group (the command above). Works with any permission plugin.
>
> **Don't test as an OP:** operators pass every permission check, so an OP always matches the **first** group in the file regardless of nodes. Test group profiles with a real, non-OP player.

## Toggling a whole profile

Every layer supports `enabled`. Set `enabled: false` at the `default`, world or group level to switch the penalty off entirely for that scope:

```yaml
worlds:
  creative_world:
    enabled: false   # no penalties here at all
```

## What a profile contains

Each profile can configure: [money](/plugins/ddeathpenalty/features/money-penalty/), [XP](/plugins/ddeathpenalty/features/xp-penalty/), [items](/plugins/ddeathpenalty/features/item-penalty/), [respawn effects](/plugins/ddeathpenalty/features/respawn-effects/), and the [extra penalties](/plugins/ddeathpenalty/features/extra-penalties/) (monsters, money-item, commands). The full key reference is in [config.yml](/plugins/ddeathpenalty/configuration/config/).
