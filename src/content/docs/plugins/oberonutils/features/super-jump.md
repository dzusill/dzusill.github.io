---
title: "Super Jump"
description: "A mid-air second jump that shares the flight flag with EssentialsX /fly without ever fighting it for ownership."
---

`/superjump`, or `/doublejump`, `/sj`, `/odj`. Press space a second time in mid-air to launch forward.

Bare `/superjump` toggles it for yourself, the way `/nightvision` does.

## Enabling it

```yaml
modules:
  superjump: true
```

## How it works, and why that matters

Minecraft has no double-jump event. The only way to catch a second press of space is to give the player
`allowFlight`, wait for the client to ask to start flying, refuse that, and launch them instead.

That flag is the same one EssentialsX `/fly` uses. EssentialsX has no separate state — `/fly` decides
whether it is switching flight on or off purely by reading `allowFlight`. So the flag has to be false
whenever a player is standing still, because standing still is when they type `/fly`.

It is therefore held **only while airborne**, and only until the jump is spent. On the ground it is false,
and `/fly` reads exactly what it expects.

## It never takes flight that is not its own

A lease records what `allowFlight` was **before** arming, and releasing restores that value rather than
assuming `false`. Flight granted by anything else survives the whole arm-and-release cycle untouched.

If the flag was already true when the lease was taken, the flight belongs to somebody else and no jump is
produced from it.

That check does not depend on knowing *who* granted flight, which matters: EssentialsX fires an event for
`/fly`, but restores a saved fly state on join by setting the flag directly, and another plugin need not
announce itself at all.

Creative and Spectator manage flight themselves, so the flag is never touched there.

## Eligibility

```yaml
superjump:
  require-permission: false

  eligibility:
    allowed-gamemodes:
      - SURVIVAL
    allowed-worlds: []
    blocked-worlds: []
    allow-in-water: false
    allow-on-ladders: false
    allow-while-gliding: false
    allow-while-riptiding: false
    allow-in-vehicles: false
```

Every posture rule defaults to refusing, and each can be re-enabled on its own.

An empty `allowed-worlds` means every world. A blocked world always wins.

## Regions

```yaml
  region:
    missing-worldguard-policy: DISABLE_FEATURE
    whitelist: []
    blacklist: []
```

Region ids are matched **exactly** and case-insensitively — never as a substring, so a rule for `spawn`
leaves `spawn_pvp` alone. A blacklisted region always wins; a non-empty whitelist means the player must be
standing in one of them.

Both lists ship empty, so the jump works everywhere until you say otherwise.

`missing-worldguard-policy` decides what happens when rules exist but WorldGuard cannot answer.
`DISABLE_FEATURE` refuses the jump, which is the safe default: a spawn-only setup must not silently become
server-wide because WorldGuard failed to load. `IGNORE_REGIONS` allows it instead.

## Movement

```yaml
  horizontal: 1.81
  vertical: 0.62
  max-vertical: 0.65
  cancel-fall-damage-ticks: 40
  cooldown-seconds: 0.0
```

`horizontal` is the push along the way the player is looking. `vertical` is the floor added to their
current upward speed, and `max-vertical` caps the result so a running jump cannot stack into a launch.

The fall-damage ticket is spent once and cleared on landing, on a world change and on a game-mode change —
so it can never soften an unrelated fall a few seconds later.

## Why it will not fire

`/superjump status` answers that directly instead of failing silently: wrong game mode, wrong world, a
region rule, a cooldown, a posture rule, or flight already granted by something else.

`/superjump status <player>` needs `oberonutils.admin`, since it exposes another player's world, region
and game mode.

## Permissions

| Node | Default | |
|---|---|---|
| `oberonutils.superjump.jump` | everyone | Only checked when `require-permission: true` |
| `oberonutils.superjump.toggle` | everyone | `/superjump toggle` |
| `oberonutils.admin` | op | `/superjump status <player>` |

`oberondoublejump.jump` and `perfdonutjump.jump` are accepted as children, so a server migrating from the
standalone plugin keeps working without re-granting anything.

## Storage

Only players who switched the jump **off** are written to `superjump.yml`. Someone who never runs the
command is not stored at all.
