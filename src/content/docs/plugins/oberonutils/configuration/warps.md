---
title: "warps.yml"
description: "One file for every warp — position, name, permission, cooldown, requirements and arrival effects."
---

One source of truth. Tab completion, the fallback warps list and the coloured names all read from
here, so a warp created with `/setwarp` works everywhere the moment it exists.

## A plain warp

```yaml
warps:
  hub:
    display: "<gradient:#C21807:#F11800>Hub</gradient>"
    location: {world: world, x: 0.5, y: 70.0, z: 0.5, yaw: -180.0, pitch: 0.0}
```

`yaw` and `pitch` are which way the player faces on arrival. `/setwarp` records both from where you
are standing and looking.

## Everything a warp can carry

| Key | Default | Meaning |
|---|---|---|
| `display` | the name | MiniMessage name used in messages |
| `location` | — | `world` / `x` / `y` / `z` / `yaw` / `pitch` |
| `permission` | none | When set, only holders may warp here |
| `warmup` | `teleport.warmup` | Per-warp countdown override |
| `cooldown` | `0s` | Per-player cooldown after arriving |
| `cooldown-bypass-permission` | `warp.bypass` | Node that skips that cooldown |
| `ignore-bypass-regions` | `false` | `true` means standing in a bypass region does **not** skip the countdown for this warp |
| `requires.koth-active` | `false` | Refuse unless AxKoth reports a running KOTH |
| `countdown-message` | — | Replaces the normal countdown line |
| `on-arrive.effects` | — | Potion effects applied on arrival |
| `on-arrive.sounds` | — | Sounds, each with an optional delay |
| `on-arrive.commands` | — | Console commands, `<player>` substituted |

## A warp with the full treatment

```yaml
  koth:
    display: "<gradient:#C21807:#F11800>Koth</gradient>"
    location: {world: world, x: 100.5, y: 94.0, z: 200.5, yaw: -90.0, pitch: 0.0}
    cooldown: 3m
    cooldown-bypass-permission: warp.bypass
    ignore-bypass-regions: true
    requires:
      koth-active: true
    countdown-message: "<#FF0000>ᴇɴᴛᴇʀɪɴɢ ᴀ ᴘᴠᴘ ᴢᴏɴᴇ<dots>"
    on-arrive:
      effects:
        - {type: SLOW_FALLING, amplifier: 1, duration: 4s, particles: false}
      sounds:
        - {name: entity.wither.spawn, volume: 1.0, pitch: 1.0, delay: 1s}
```

Everything that used to be an `if` branch buried in the warp command is data here — which is why
these options are available on *any* warp, not only this one.

`ignore-bypass-regions: true` is the rule that stops someone standing in the spawn region from
dropping into a PvP arena with no countdown at all.

`<dots>` in `countdown-message` expands to a run of dots that grows as the countdown runs down.
`<time>` gives the seconds remaining.

## Naming

Names are stored lowercase and may contain `a-z`, `0-9`, `-` and `_`, up to 32 characters.
`/warp KOTH` and `/warp koth` are the same warp.

`/setwarp <existing>` moves the position and **keeps** the display name, cooldown and arrival
effects you wrote by hand.

## Per-warp permissions

```yaml
  staffroom:
    display: "<gray>Staff Room</gray>"
    permission: oberonutils.warp.staffroom
    location: {world: world, x: 0.5, y: 100.0, z: 0.5, yaw: 0.0, pitch: 0.0}
```

Leave `permission` out and anyone can use the warp, which is how every warp behaves by default.

## Broken worlds are named, not thrown

If a warp points at a world that is not loaded, the names are listed in console once at startup, and
a player who tries it gets a message rather than a stack trace.

## Deleting

`/delwarp <name>` removes the entry. `warps` is listed under `advanced.ignored-sections`, so a
deleted warp stays deleted instead of reappearing when defaults are merged on the next start.
