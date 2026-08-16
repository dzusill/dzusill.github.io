---
title: "Teleports & Warps"
description: "One warmup engine behind /spawn and /warp, with exact region rules and per-warp arrival effects."
---

`/spawn` and `/warp` are one module because they are the same feature twice — the same countdown,
the same move-cancel, the same bypass rules.

Written separately they drifted apart, and both wrote the player's start position into the same
place. Starting a `/spawn` countdown and then running `/warp` left two handlers believing they owned
a teleport with one shared position between them: the cancellation message arrived twice, and
whichever ran first deleted the position the other was about to read. That read is what filled the
console — a distance measured against a value that no longer existed, or against a location in a
different world.

Here there is one list of pending teleports, a new request cancels the previous one, and every
distance check is preceded by a same-world check.

## The warmup

Default five seconds, counted down on the action bar once a second, cancelled by moving.

```yaml
teleport:
  warmup: 5s
  cancel-on-move: true
  move-mode: DISTANCE
  move-threshold: 0.1
```

`move-mode: BLOCK` cancels only when the player leaves the block they started on. Far more forgiving
— knockback, boats, pistons and standing on a block edge all exceed a tenth of a block without the
player meaning to move.

A warp can override the warmup for itself:

```yaml
  hub:
    warmup: 2s
```

## What skips the countdown

Checked in this order:

1. **A force-warmup region.** Beats everything, including the bypass permission.
2. **`warp.bypass`.**
3. **The warp's `ignore-bypass-regions`.** When `true`, nothing below applies to it.
4. **A bypass region.**
5. **A bypass world.** `/warp` only, unless `bypass-worlds-applies-to-spawn-command` is on.

```yaml
  bypass-regions: [spawn]
  force-warmup-regions: [pvpzone]
  bypass-worlds: [spawn]
```

Region IDs are matched **exactly**, through WorldGuard's own query API. Matching on substrings meant
`spawn_pvp`, `oldspawn` and `spawnarena` all satisfied a rule that named `spawn` — and `nopvpzone`
satisfied one that named `pvpzone`, forcing a countdown inside a region named for the opposite.

## What cancels a pending teleport

| Event | Message |
|---|---|
| Moving past the threshold | `teleport.cancelled-moved` |
| Taking damage, when `cancel-on-damage` is on | `teleport.cancelled-damage` |
| Logging out | silent |
| Changing world | silent |
| Starting another teleport | silent |

`cancel-on-damage` is off by default. Turning it on closes "stand still under attack and teleport
out anyway", which the force-warmup rule for a PvP zone suggests was the intent all along.

## Cooldowns

```yaml
  arena:
    cooldown: 3m
    cooldown-bypass-permission: warp.bypass
```

Per player, per warp, held in memory with expiry. `/kothcooldown` clears a player's cooldowns and
says so — the Skript version cleared them silently, so staff could not tell whether it had worked.

## Requirements

```yaml
  koth:
    requires:
      koth-active: true
```

Refuses the warp unless AxKoth reports a running KOTH. If AxKoth cannot be reached at all, the warp
is **refused** and the reason is logged once. Comparing a placeholder to the literal text `"false"`
meant a missing plugin read as "not false", so the warp went through and players landed in an
inactive arena.

## Arrival

```yaml
    on-arrive:
      effects:
        - {type: SLOW_FALLING, amplifier: 1, duration: 4s, particles: false}
      sounds:
        - {name: entity.wither.spawn, volume: 1.0, pitch: 1.0, delay: 1s}
      commands:
        - "title <player> title {\"text\":\"Arena\"}"
```

Available on any warp. A delayed sound re-checks the player is still online first — the Skript
version played it at whoever had run the command, whether or not they were still there.

## `/spawn <player>`

Instant, no countdown, no move-cancel. Both players are told. Targeting yourself sends one message
rather than both halves of a two-player exchange.

```yaml
  spawn:
    others-instant: true
    others-exempt-permission: ""
```

Set `others-exempt-permission` and holders cannot be moved by `/spawn <player>` — useful if a junior
rank has `spawn.others`.

## `/warp` with no arguments

Three behaviours, set by `teleport.no-args-action`. The same setting covers a warp name that does
not exist.

```yaml
teleport:
  no-args-action: MENU        # MENU | USAGE | LIST
  warps-menu-command: "warps"
```

**`MENU`** runs `warps-menu-command`, so an external menu plugin stays in charge. This is what the
Skript version did, so it is the default.

**`USAGE`** prints the `usage.warp` message instead — `/warp` behaves like any other command given
the wrong arguments. Being an ordinary message, that line can be moved to the action bar or given
its own sound:

```yaml
Presentation:
  Overrides:
    usage.warp:
      Channel: ACTION_BAR
      Sound: {Name: block.note_block.bass, Volume: 1.0, Pitch: 0.5}
```

**`LIST`** prints the warps the player can actually reach — anything gated behind a permission they
lack is left out. On an unknown name they get `warp.not-found` first, so a typo reads as a typo
rather than as a menu appearing for no reason.

Blanking `warps-menu-command` makes `MENU` fall back to the list, so removing the menu plugin later
leaves players with a warp list rather than "unknown command".
