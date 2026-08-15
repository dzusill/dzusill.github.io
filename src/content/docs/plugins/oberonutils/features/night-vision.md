---
title: "Night Vision"
description: "A permanent toggle that survives anything clearing potion effects, and never touches an effect it did not apply."
---

`/nightvision`, or `/nv`. Toggles an infinite night vision effect with the particles hidden.

## It comes back from anything

The effect is reapplied whenever it is removed — by **any** cause.

```yaml
nightvision:
  reapply-on:
    join: true
    respawn: true
    milk: true
    effect-cleared: true
    world-change: true
```

`effect-cleared` is the one that matters. Handling only the obvious cases — respawning, and drinking
milk — leaves every other path open: `/heal`, an admin's `/effect clear`, another plugin wiping
effects on a world change. Any of those and night vision is gone for good, while the stored toggle
still says it is on. The player has no way to work out that toggling twice is the fix.

Watching for the removal itself closes all of them at once, including ones nobody has thought of yet.

## It leaves other effects alone

```yaml
  respect-foreign-effects: true
```

Toggling off removes only the effect this plugin applied. A player who drinks a real night vision
potion, or stands near a beacon, keeps it.

The infinite duration is the signature. Anything with a real duration came from somewhere else and
is not touched.

## Stored on the player

The toggle lives in the player's own persistent data, not a plugin file. It survives restarts, needs
no save cycle, and goes away with the player — so there is no table slowly filling with UUIDs of
people who ran the command once in 2023 and never came back.

## Options

```yaml
  permission: ""
  effect:
    amplifier: 0
    ambient: true
    particles: false
```

- **`permission`** blank means open to everyone. Set a node to make it a rank perk.
- **`amplifier: 0`** is tier 1. Night vision has no meaningful second tier.
- **`particles: false`** hides the swirls.

## For staff

```
/nv <player>
```

Requires `oberonutils.admin`. Both the staff member and the target are told.

## Messages

Both toggle messages are in the `TOGGLE` category, which ships as action-bar-only with the
experience orb pickup sound:

```yaml
Presentation:
  Categories:
    TOGGLE:
      Channel: ACTION_BAR
      Sound: {Name: entity.experience_orb.pickup, Volume: 1.0, Pitch: 1.0}
```

Move them to `BOTH` or `CHAT` there.
