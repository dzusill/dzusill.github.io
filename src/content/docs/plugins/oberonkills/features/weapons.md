---
title: "Weapons & Causes"
description: "Every key the three message sets accept, how the mace smash is told apart from a mace swing, and where the projectile distance comes from."
---

## PvP keys

The weapon in the killer's hand at the moment of the blow.

| Key | Is |
|---|---|
| `sword` | any sword |
| `axe` | any axe — **not** a pickaxe, which ends in `_AXE` too |
| `bow` | an arrow from a bow |
| `crossbow` | an arrow or firework from a crossbow |
| `trident` | thrown or melee |
| `mace` | a mace, swung on the ground |
| `mace-smash` | a mace, brought down from a fall |
| `item` | anything else held — a pickaxe, a stick, a cake |
| `unarmed` | bare hands |
| `default` | anything the above did not cover |

Splitting these is the point. AxKills reads the same for all of them.

## The mace smash

The move the mace exists for, and it gets its own key.

Telling it from a mace swing is only possible by whether the attacker was **falling** — and fall distance resets the
instant they land, which is a fraction of a second after the hit. So it is read at the moment of the blow and
remembered, not guessed at when the player dies.

## Mob keys

The entity type, lower-cased with `_` as `-`:

```yaml
  Mob:
    creeper: [ … ]
    wither-skeleton: [ … ]
    ender-dragon: [ … ]
    default: [ … ]
```

A skeleton's arrow counts as the skeleton, not as a bow — the projectile is followed back to whoever fired it.

## Environment keys

Bukkit's own damage causes, lower-cased with `_` as `-`:

`fall` `lava` `drowning` `void` `fire` `fire-tick` `suffocation` `starvation` `magic` `lightning` `freeze`
`hot-floor` `cramming` `fly-into-wall` `entity-explosion` `block-explosion` `contact` `poison` `wither` …

The full list is in the [Paper Javadocs](https://jd.papermc.io/) under `EntityDamageEvent.DamageCause`. You do not
need to cover them all — `default` catches the rest.

## Distance

`<distance>` is filled for `bow`, `crossbow` and `trident` kills: the blocks between shooter and victim **when the
projectile landed**, rounded to a whole number.

Measured then, because the arrow is gone by the time the death message is built.

A melee kill leaves `<distance>` empty rather than showing `0` or `-1`, so a format that mentions it in a melee
message simply reads oddly rather than lying.

## The ten-second window

Both the fall distance and the projectile distance live in a small per-victim record that expires after **ten
seconds**.

That is what stops a player who was shot, healed, and then killed by a fall an hour later from being reported as
shot — and it is why the record cannot grow for the lifetime of the server.

If somebody dies more than ten seconds after their last hit from another entity, the death falls through to the
environmental set, which is almost always correct: whatever finished them was not that blow.

## Key matching is forgiving

Keys are matched case-insensitively, and `_` and `-` are interchangeable. `MACE_SMASH`, `mace-smash` and `Mace_Smash`
all find the same entry.
