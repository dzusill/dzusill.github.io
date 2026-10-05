---
title: "The combat tag"
description: "A player is tagged for combat.tag-duration (20 seconds by default) when they hurt another player or are hurt by one."
---

A player is **tagged** for `combat.tag-duration` (20 seconds by default) when they hurt another player or are hurt by one.
Both sides are tagged. Every further hit starts the time again. When it runs out the player is untagged, and is told so
if the reason is listed in `combat.untag-notice`.

Everything else in the plugin asks one place whether a player is tagged: the command blacklist, the item cooldowns, the
barrier, the restrictions, the combat log, the soup rule, OberonUtils, OberonAfk and OberonTools.

## What tags

Every kind of PvP damage, as long as the hit really happened: a hit another plugin cancelled (WorldGuard, a duel, the
[PvP toggle](/plugins/oberoncombat/features/pvp-toggle/)) tags nobody.

| Source | Setting | Notes |
|---|---|---|
| Melee, trident, indirect blows | `combat.tag-sources.melee` | |
| Arrows, tridents thrown, wind charges | `combat.tag-sources.projectiles` | |
| Eggs, snowballs, fishing rods | `combat.tag-sources.zero-damage-hits` | They deal no damage but still tag |
| Harmful splash and lingering potions | `combat.tag-sources.harmful-potions` | Which effects count: `combat.harmful-effects` |
| TNT, end crystals, respawn anchors, beds | `combat.tag-sources.explosions` | Credited to whoever lit, broke or used it |

A potion of healing thrown at a friend tags nobody. A potion with one harmful effect among helpful ones counts.
`combat.harmful-effects` is a list of effect names; a name that is not an effect is reported in the console and skipped.

### Who is responsible

Minecraft names the player behind an arrow, a TNT block or a crystal; that is read first. A respawn anchor or bed
blast names nobody, so the plugin notes who used one in the last two seconds within ten blocks. A fall, fire, lava or void
death is credited to the last player who hit the victim within `combat.attribution-window` (10 seconds).

### Never tagged

- Spectators.
- Anyone in a [globally excluded](/plugins/oberoncombat/features/exclusions/) place.
- A player with `oberoncombat.exempt.tag`. With `combat.exempt-both-sides: true` (the default) nobody is tagged *by* them
  either, so an exempt admin cannot be used to start a fight that never ends for the other side.
- Two players a guard separates: in a duel only the two fighters tag each other
  ([Duels-Shyam](/plugins/oberoncombat/features/duels/)).

## Renewals

A tagged player who throws an **ender pearl** or shoots a **wind charge** starts the time again
(`combat.renew.ender-pearl`, `combat.renew.wind-charge`). Throwing a pearl never *starts* a fight. Trying to enter a
safe zone renews the tag too ([barrier](/plugins/oberoncombat/features/barrier/)).

`combat.announce-renewals: true` sends the tagged message on every renewal rather than only when the fight begins.

## Ending the tag

| Reason | When |
|---|---|
| `expired` | the time ran out |
| `kill` | the killer, after a PvP kill, per `untag-on-kill` |
| `death` | the victim died |
| `quit` | the player left |
| `command` | `/untag` |
| `duel-end` | a duel ended |
| `excluded` | the player walked into an excluded place |
| `enemy-gone` | everyone they were fighting left, and they had nobody else |
| `api` | another plugin asked |

`combat.untag-notice: [expired, command, duel-end]` lists the reasons that send the *no longer in combat* message; every
other end is silent.

### Untag on kill

`combat.untag-on-kill`:

| Value | After a PvP kill |
|---|---|
| `always` | the killer is untagged |
| `all-enemies` | the killer is untagged once everyone they are fighting is dead |
| `killed-only` | only the victim is forgotten; the rest of the fight stays |

The killer is untagged *before* the money message goes out, so the countdown never paints over it.

### Deaths while tagged

`combat.tagged-deaths-count-pvp: true` counts a death while tagged as a PvP death even if the last blow was a fall, lava
or the void. The credit goes to the most recent enemy, except for `/kill` and suicide, which are nobody's kill.

## The countdown

The `combat-timer` message is shown the moment a player is tagged or renewed (a hit, a pearl, a barrier attempt), then refreshed once a second while tagged. It uses the action bar at the lowest priority, so a money
message or any other notice keeps the slot until its hold ends.

| Token | Meaning |
|---|---|
| `%time%` | seconds left |
| `%bar%` | a bar that empties as the tag runs out |
| `%enemies%` | the names of the players being fought |

The bar is `combat.timer.bar-symbol` repeated `bar-length` times, coloured `bar-full` and `bar-empty`.

### Boss bar

```yaml
combat:
  timer:
    boss-bar:
      enabled: true
      color: red          # pink, blue, red, green, yellow, purple, white
      style: solid        # solid, segmented_6, segmented_10, segmented_12, segmented_20
```

The text is the `bossbar` line of `combat-timer` in `messages.yml`, with the same tokens. The bar drains as the tag runs out
and is removed the moment the tag ends, the player leaves or dies, or you switch it off. A bar whose tag ran out unnoticed is swept away
on the next second.

## Mobs: the PvE tag

```yaml
combat:
  pve-tag:
    enabled: false
    only-hostile: true     # false: any mob or animal
    any-damage: false      # true: fall, fire, lava and the like tag as well
```

Off by default: this is a PvP plugin. When on, a mob that hurts a player tags **that player** (a mob has no tag of its own).
A hit another player is responsible for is left to the PvP rules. `/kill`, starvation, the void and custom damage never
tag. `oberoncombat.exempt.pve` keeps a player out. Note that a PvE-tagged player who logs out is punished like any
other, see [Combat log](/plugins/oberoncombat/features/combat-log/).

## /tag and /untag

`/tag` shows your time left, `/tag <player>` tags someone for the full time, `/untag` frees you and `/untag <player|all>`
frees others. See [Commands](/plugins/oberoncombat/reference/commands/).
