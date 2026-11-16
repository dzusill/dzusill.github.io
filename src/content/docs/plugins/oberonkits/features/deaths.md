---
title: "Deaths and killer XP"
description: "The death block decides what happens when a player dies in a kit world."
---

The `death` block decides what happens when a player dies in a kit world.

```yaml
death:
  drop-items: false
  drop-xp: false
  killer-xp:
    enabled: true
    type: bottles
    amount: 10-15
    xp-each: 3-11
    same-world-only: true
    last-damager-seconds: 15
    message: killer-xp
```

## Drops

- `drop-items: false` — the kit stays out of the arena: nothing drops, and nothing is kept either (the
  player gets a fresh kit on respawn).
- `drop-xp: false` — the victim drops no XP orbs.

### Per kit

A kit can override `drop-items` for the players holding it, for example basic kits drop and Stardust kits
don't:

```yaml
death:
  drop-items: true
kits:
  - { kit: ffa1 }                                         # drops (like the profile)
  - { kit: ffa6, price: 500, uses: 3, drop-items: false } # nothing drops
```

- The kit the player was last given in this profile decides, for their whole inventory: loot a Stardust
  player picked up is lost with them too.
- A kit left without `drop-items` follows the profile's `death.drop-items`.
- When OberonKits doesn't know the kit (given before 1.5.0, or by another plugin) or the kit was removed
  from the profile, the profile decides.
- XP stays per profile (`drop-xp`).

In game: `/okits gui` → profile → Kits → the kit → **Items drop on death** (like the profile / drop / no drop).

## Killer XP

The killer receives XP, which Mending uses to repair gear.

| Key | Meaning |
|---|---|
| `type` | `bottles` — XP bottles are thrown onto the killer and break on them; `orbs` — orbs appear at the killer |
| `amount` | How many bottles or orbs: a range `10-15` or a number |
| `xp-each` | XP in each one, again a range or a number |
| `same-world-only` | Only when the killer is in the same world |
| `last-damager-seconds` | Who counts as the killer when there is no direct one |
| `message` | `messages.yml` key sent to the killer, `""` for none |

Bottles land right on the killer, so they collect the XP in a moment; each one holds exactly its
`xp-each` value.

### Combat logout and indirect kills

When the victim dies with no direct killer — they logged out in combat, fell after a hit, or burned — the
last player who hit them within `last-damager-seconds` gets the XP. This works even when the victim's death
comes from a combat-log plugin killing them on quit. `0` means direct kills only.
