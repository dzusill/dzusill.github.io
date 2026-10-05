---
title: "Combat log"
description: "Leaving while tagged is a combat log. The player dies where they stand, and their drops follow the config."
---

Leaving while tagged is a **combat log**. The player dies where they stand, and their drops follow the config.

```yaml
combat-log:
  enabled: true
  mode: kill                  # kill | none
  drops:
    inventory: true
    experience: true
  punish-on-shutdown: false
  punish-on-kick: false
  kick-reasons: []
  release-enemies: true
  money-penalty: 0
```

## What happens

1. `CombatLogEvent` is fired for other plugins.
2. Everyone else online gets the `combat-log-broadcast` message (empty by default).
3. If `money-penalty` is set, the fine is taken (below).
4. The player is killed. For the moment of that death they carry the metadata `oberoncombat_combat_log`, so OberonKills can
   print its combat-log line.
5. The death is **not** a PvP kill: no lightning, no money or experience for the enemy.

## What is not punished

| Case | Punished? |
|---|---|
| A server restart or shutdown | **no**, unless `punish-on-shutdown: true` |
| A kick | **no**, unless `punish-on-kick: true`; with `kick-reasons: [flying, spam]` only kicks whose reason contains one of those words |
| A connection that failed with an error | no |
| A player with `oberoncombat.exempt.combatlog` | no |
| A player in a place excluded for `combat-log` | no |
| A player in a duel | no, Duels handles it ([Duels-Shyam](/plugins/oberoncombat/features/duels/)) |

`release-enemies: true` untags the people the leaver was fighting when they have no other enemy, so they are not left
"in combat" with nobody.

## The fine

`money-penalty: 10` takes 10 percent of the leaver's balance and gives it to **nobody**. The leaver is told the next time
they join (`combat-log-penalty`, token `%amount%`). It needs Vault and an economy, like [money steal](/plugins/oberoncombat/features/kills/), and uses
the same decimals and rounding. `0` is off.

## Combat tag by PvE

A player tagged only by mobs ([PvE tag](/plugins/oberoncombat/features/combat-tag/)) is punished for logging out like anyone else.
