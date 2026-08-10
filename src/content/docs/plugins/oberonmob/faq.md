---
title: "FAQ & Troubleshooting"
description: "Farms stopped working, mobs still spawn, one player empties the area — the usual causes and the setting that fixes each one."
---

## My mob farm stopped producing

Something added `SPAWNER` to `Spawn-Reasons`. The default list is natural spawning only, precisely so this cannot happen.

Remove it. See [Spawn reasons](/plugins/oberonmob/features/spawn-reasons/) for what each reason means and why the defaults are what they are.

## Iron golems stopped appearing in my village

Same cause: `VILLAGE_DEFENSE` or `BUILD_IRONGOLEM` in `Spawn-Reasons`. Neither is in the default list.

Note that `IRON_GOLEM` being in `Entities` is fine on its own — it only matters together with a reason that covers how the golem was spawned.

## Will it despawn mobs that already exist?

**No.** Neither mode ever removes, kills or despawns a mob that is already in the world.

`CANCEL_SPAWN` only acts on a spawn as it happens. `HIDE_ENTITY` only changes what one player's client is sent. Walking past a zombie villager trading hall with mobs off leaves every villager exactly where it was.

## One player turns the whole area into a dead zone

`Cancel-When-Others-Nearby: true` does that — it is the old script's behaviour. Set it to `false` and a spawn is only stopped when nobody in range still wants mobs.

If you want *nobody* to be able to affect anybody else at all, switch that toggle to `Mode: HIDE_ENTITY`.

## Mobs still spawn with the toggle off

Work through it in this order:

1. **`/oberonmob status`** — does the toggle cover a sensible number of entities? `1 entities` on `mobs` means the `Entities` list is misspelled.
2. **Is the mob in range?** The radius is per toggle. Outside it, nothing is suppressed.
3. **Is somebody else nearby?** With `Cancel-When-Others-Nearby: false`, a player who still wants mobs keeps them for everyone in range.
4. **What spawned it?** A spawner, an egg or breeding is not in the default `Spawn-Reasons` and never will be cancelled.
5. **Is it a phantom?** Phantoms have their own toggle.

## In hide mode, invisible mobs still hit me

Expected. The mob is physically there — hide mode only stops it being drawn. `Prevent-Targeting: true` stops it hunting you, but you can still walk into a creeper you cannot see.

If that is unacceptable, use `CANCEL_SPAWN`.

## Hidden mobs come back when I walk around

They shouldn't. The sweep re-hides anything that comes into range every `Hide-Mode.Refresh-Ticks` — 2 seconds by default. Lower it for a snappier effect.

If a mob stays visible permanently, check it is actually in the toggle's `Entities` list with `/oberonmob status`.

## Adding a toggle did nothing

Restart. A toggle's command is registered with the server at startup; a reload cannot add one. The reload message says `Restart needed for command changes: yes` when it notices.

## My new toggle says "You do not have permission"

`plugin.yml` cannot declare a node for a toggle you invented. Grant it:

```
/lp group default permission set oberonmob.toggle.creepers true
```

## Toggles reset every restart

`enabled: false` in `database.yml`, or the database failed to open. Check the console at startup:

```
[OberonMob] Database is off; toggles will reset when the server restarts.
```

## Does it hurt performance?

No — and specifically, not when nobody is using it.

The state is stored as one small set per toggle holding only the players who turned it off. When that set is empty the whole spawn check is an `isEmpty()`. Nearby players are only looked up once somebody actually has a toggle off, and that lookup is chunk-local.

Hide mode's sweep only runs while at least one player has a hide-mode toggle off.

## What is `#ENEMY` and why not `#MONSTER`?

Bukkit's `Monster` interface leaves out slimes, magma cubes, ghasts and hoglins, even though every player would call all four hostile. `#ENEMY` uses the interface that includes them.

Use `#ENEMY` unless you specifically want the narrower list. See [Entity groups](/plugins/oberonmob/features/entity-groups/).

## Does it work on Folia?

Yes, `folia-supported: true`. In hide mode the per-player sweep is dispatched on each player's own region thread.

## Where do I report a problem?

[github.com/dzusill](https://github.com/dzusill). Please include:

- Server software and version (`/version`)
- OberonMob and DzusillCore versions
- The output of `/oberonmob status`
- The `Toggles` entry in question
