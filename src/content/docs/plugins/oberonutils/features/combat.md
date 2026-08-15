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
```

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

Any material works. An entry that is not a real material is named in console and skipped rather than
taking the module down.

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

By reflection, with the tag events registered dynamically. Nothing to pin to a version, nothing that
breaks when PvPManager updates, and the module simply does not install when it is absent.

Combat state is tracked from PvPManager's own tag and untag events rather than asked for through a
placeholder — so the answer is exact, and it does not quietly become "nobody is in combat" whenever
PlaceholderAPI is reloading.
