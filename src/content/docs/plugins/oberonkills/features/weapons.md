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
| `trident` | a trident, thrown |
| `trident-melee` | a trident, kept hold of and stabbed with |
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

## The two tridents

A trident is the only weapon that is a projectile in one hand and a spear in the other, and the two deserve different
wording — a thrown one has a distance, a stab does not.

They are told apart by the blow itself: a recorded hit that arrived as a projectile is `trident`, one that arrived as
a swing is `trident-melee`.

Delete `trident-melee` from your config and a stab falls back to the thrown wording, which then reads
*"from  blocks away"* with a hole where the number belongs. That is the one thing to keep in mind if you trim the
message list.

## Distance

`<distance>` is filled for `bow`, `crossbow` and thrown `trident` kills: the blocks between shooter and victim **when
the projectile landed**, rounded to a whole number.

Measured then, because the arrow is gone by the time the death message is built.

Every other key leaves `<distance>` empty. Write `from <distance>m` only in a key that has one — in a `sword` message
it renders as a gap, not as a zero.

### When the shot was never recorded

Some kills produce no measurement at all:

- the hit aged out of the window below — an arrow set them on fire and the burning finished them off later;
- **another plugin dealt the damage itself.** Custom-item and custom-enchant plugins routinely cancel the arrow's
  damage and re-apply their own, so no projectile is ever seen. This is the usual cause of a bow message reading
  *"from  blocks away"* on a server that runs one.

`Combat.Measure-Distance-At-Death` (on by default) covers both: those kills are measured killer-to-victim at the
moment of death instead. A little late — they may have moved — but far better than a hole in the message. Turn it off
to leave `<distance>` empty rather than approximate it.

Set `Debug: true` to see which happened; every death then logs its key and its distance, or `distance=none`.

## The ten-second window

Both the fall distance and the projectile distance live in a small per-victim record that expires after
`Combat.Remember-Hits-Seconds`, **ten seconds** by default.

That is what stops a player who was shot, healed, and then killed by a fall an hour later from being reported as
shot — and it is why the record cannot grow for the lifetime of the server.

If somebody dies more than ten seconds after their last hit from another entity, the death falls through to the
environmental set, which is almost always correct: whatever finished them was not that blow. Raise the setting if
players on your server regularly die of burning or falling well after the shot that started it.

## Key matching is forgiving

Keys are matched case-insensitively, and `_` and `-` are interchangeable. `MACE_SMASH`, `mace-smash` and `Mace_Smash`
all find the same entry.
