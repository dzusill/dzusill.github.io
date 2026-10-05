---
title: "Developer API"
description: "OberonCombat has no compile-time API artifact: other plugins reach it through Bukkit."
---

OberonCombat has no compile-time API artifact: other plugins reach it through Bukkit.

## Services

Registered with Bukkit's service manager:

```java
CombatService combat = Bukkit.getServicesManager().load(CombatService.class);
boolean tagged = combat.isTagged(player.getUniqueId());
```

`CombatService` (`me.dzusill.oberoncombat.core`): `tag`, `tagSelf`, `renew`, `isTagged`, `remainingMillis`, `enemiesOf`, `lastEnemy`,
`forgetEnemy`, `untag`, `untagAll`, `releaseEnemies`, `addGuard`, `allowed`, `tracked`, `expireIfDue`.
`PvpAttribution` answers "which player is responsible for this damage".

**Without a compile-time link:** OberonUtils, OberonAfk and OberonTools ask by reflection on the class
`me.dzusill.oberoncombat.core.CombatService` and its method `isTagged(UUID)`. That class name and method are a contract;
a test in each of those plugins pins it.

### Guards

`combat.addGuard(TagGuard)` lets a plugin veto a tag between two players, as Duels-Shyam does for fighters. `allowed(a, b)` tells
whether every guard lets two players fight each other.

## Events

All in `me.dzusill.oberoncombat.api`:

| Event | Fired | Cancellable |
|---|---|---|
| `CombatTagEvent` | before a player is tagged or renewed: `getPlayer()`, `getEnemy()`, `getReason()`, `isAttacker()` | yes |
| `CombatUntagEvent` | when a tag ends: `getPlayer()`, `getReason()` | no |
| `PvpKillEvent` | on every PvP kill: `getKiller()`, `getVictim()`, `getHow()` | no |
| `CombatLogEvent` | before a combat log is punished: `getPlayer()`, `getEnemyId()`, `getEnemyName()` | no |

`TagReason` values: `MELEE`, `PROJECTILE`, `POTION`, `TNT`, `CRYSTAL`, `ANCHOR`, `BED`, `EXPLOSION`, `PEARL`, `WIND_CHARGE`,
`COMMAND`, `BARRIER`, `PVE`. `UntagReason` values are the ones in [The combat tag](/plugins/oberoncombat/features/combat-tag/#ending-the-tag).

## The combat-log marker

During the death event of a combat log, the player carries the Bukkit metadata `oberoncombat_combat_log` whose value is the
enemy's name (or empty). OberonKills reads it to print its combat-log line. **The key is a contract; it will not be renamed.**
