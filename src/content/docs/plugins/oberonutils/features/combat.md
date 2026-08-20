---
title: "Combat"
description: "Crystal and anchor cooldowns applied on real placements, from either hand — plus the PvPManager tag fix."
---

Two unrelated things that both need PvPManager, so they live together.

## Placement cooldowns

```yaml
combat:
  only-when-tagged: true
  cooldowns:
    END_CRYSTAL: 2s
    RESPAWN_ANCHOR: 2s
    FIREWORK_ROCKET: 8s
    ENDER_PEARL: 10s
```

**Any item can be given a cooldown**, not just the ones shipped. Fireworks — the elytra-boost case —
ender pearls, chorus fruit, totems all work.

A cooldown lands after the placement **actually happens**, and applies from either hand.

Both halves of that matter:

**Either hand.** Reading the item in the player's *main* hand misses crystals held in the off hand
entirely — main hand empty, crystals in the off hand, and the cooldown never applies. Which defeats
the point of the module. The cooldown is driven by what was placed, so both hands are covered.

**Actually happens.** Charging the cooldown as soon as a right-click passes a material check means a
placement refused by WorldGuard, or spawn protection, or an entity in the way, still costs the
player two seconds for something that never occurred. End crystals are tracked by the entity being
created; respawn anchors by comparing the charge level before and one tick after, so a click on an
already-full anchor — which consumes nothing and does nothing — costs nothing.

### Which item gets the cooldown

Charging an anchor consumes **glowstone**, but the cooldown goes on the **anchor**. So what it
throttles is placing the *next* anchor, not the charging — which does slow the place → charge →
detonate → place loop down.

To throttle the charging itself instead, add a `GLOWSTONE` entry:

```yaml
  cooldowns:
    END_CRYSTAL: 2s
    RESPAWN_ANCHOR: 2s
    GLOWSTONE: 2s
```

An entry that is not a real material, is not an item at all, or has no usable duration is named in
console at load and skipped — rather than sitting in the config looking configured and doing nothing.

### Three detection paths

Which path an item takes decides how precise its cooldown is:

| Item | Charged when |
|---|---|
| `END_CRYSTAL`, `ARMOR_STAND` | the entity really exists — a placement refused by WorldGuard costs nothing |
| `RESPAWN_ANCHOR` | the charge level actually rises — a full anchor costs nothing |
| everything else | the item is used from the hand and the use is not cancelled |

### Only in combat

`only-when-tagged: true` applies the cooldowns only while PvPManager has the player tagged. Set it
`false` to apply them always.

Without PvPManager installed nobody reads as tagged, so with this on, the cooldowns never apply —
and `/oberonutils hooks` says so plainly, rather than leaving you to work out why nothing happens.

## The exempt tag fix

```yaml
  exempt-tag-fix:
    enabled: true
    permission: pvpmanager.exempt
    cancel-both-sides: true
```

Cancels a PvPManager combat tag when either party holds the exempt node.

`cancel-both-sides: true` means exempt is exempt in both directions — an exempt player puts nobody
into combat, and nobody is tagged for fighting one. Set it `false` for the narrower behaviour, where
only the player fighting an exempt player escapes the tag.

## How PvPManager is reached

Through its published API — PvPManager ships an artifact on CodeMC, and every reference to it lives
in one class that is only loaded when the plugin is installed. A server without PvPManager never
touches those types.

That API is the free build's; the premium build exposes the same `CombatPlayer.get(player)` and
`isInCombat()`, which is the getter PvPManager's own documentation names as the one to prefer for
exactly that reason.

Combat state is read from PvPManager itself: its `CombatPlayer` API first, its PlaceholderAPI
expansion second, and only then a cache of the tag events we observed — aged out by
`combat.tag-cache-ttl` and cleared on death and on quit.

That order matters. The cache used to be trusted *over* PvPManager, so a single missed untag left a
player permanently "in combat" as far as this plugin was concerned — refused `/spawn` and `/warp`
indefinitely while PvPManager itself, and every other plugin on the server, considered them out of
combat.

`/oberonutils hooks` reports whether the live state is reachable separately from whether PvPManager
is merely installed, so a silent downgrade to the fallback is visible.
