---
title: "The /afk teleport"
description: "/afk takes the player to an AFK zone. It is always manual: nothing in this plugin ever"
---

`/afk` takes the player to an AFK zone. It is always **manual**: nothing in this plugin ever
teleports a player who did not ask.

```
/afk                  to the default zone
/afk tp [zone]        to a named zone
```

## The warm-up

After the command the player has to stand still for `teleport.warmup-seconds` (3 by default). An
action-bar countdown ticks once a second.

| Event | Result |
|---|---|
| The player moves to **another block** | Cancelled (`cancel-on-move`). Looking around is fine |
| The player takes **damage** | Cancelled (`cancel-on-damage`). Damage another plugin cancelled does not count |
| The player is carried on a **vehicle** | Cancelled as well — a horse or boat does not carry a warm-up across the map |
| The player is **combat-tagged** | Refused, both when `/afk` is run and again at the moment of the teleport |
| The player holds `oberonafk.teleport.instant` | No warm-up |

Other refusals, each with its own message in [`messages.yml`](/plugins/oberonafk/configuration/messages/): the
player is already in that zone, a teleport is already pending, the zone does not exist, the zone has no
landing point yet, or the teleport is switched off (`teleport.enabled: false`).

There is **no cooldown** and no automatic return.

## Landing points

Where a player lands, in order:

1. The points added in game with `/afk zone setspawn <zone>`, kept in `data.yml`. Each run adds one;
   `/afk zone clearspawns <zone>` removes them again.
2. Otherwise the `teleport.points` list of the zone in `zones.yml`.

With more than one point, one is picked at random every time. A bare `/afk` goes to the zone marked
`teleport.default: true`, or the first enabled zone if none is.

## Combat

With [PvPManager](https://www.spigotmc.org/resources/pvpmanager.845/) installed (`teleport.block-in-combat`,
on by default), `/afk` is refused while the player is combat-tagged. The state is read in this order:

1. PvPManager's own live state — the source of truth.
2. PlaceholderAPI's `%pvpmanager_in_combat%`, if the first cannot be reached.
3. The tag events observed here, aged out after `teleport.combat-fallback-seconds`.

A cache of tags this plugin saw itself is only used as a last resort, so one missed untag can never
keep a player "in combat" after PvPManager has let them go. Without PvPManager nobody counts as in
combat.

## Taking over /afk

EssentialsX also has an `/afk` — it toggles the AFK status. `commands.main.take-over` in
[`config.yml`](/plugins/oberonafk/configuration/config/#commands) (on by default) makes OberonAFK answer `/afk` even so,
which means Essentials' own `/afk` is no longer reachable by that name. Turn it off, or rename the
command (`commands.main.name`), to keep both; Essentials' automatic AFK marking is not affected either
way.

Command names are read once at startup, so changing them needs a restart.
