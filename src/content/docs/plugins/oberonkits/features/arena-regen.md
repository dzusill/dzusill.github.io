---
title: "Arena regen"
description: "OberonKits can rebuild a kit world's arena on a timer. It does not rebuild anything itself: it runs console"
---

OberonKits can rebuild a kit world's arena on a timer. It does not rebuild anything itself: it runs console
commands you choose, such as the duels plugin's `sduels arena regen <arena>`, and handles the timing,
the warnings and the players.

```yaml
regen:
  enabled: true
  every: 30m
  commands:
    - "sduels arena regen ffa"
  warnings: [60s, 10s]
  players: stay
  move-to: ""
  back-after: 5s
  skip-if-empty: false
```

## Setting it up with the duels plugin

1. In the duels plugin, create the FFA arena and save its schematic. The arena name goes into the command.
2. Keep that arena out of the duels queue (disabled in the duels plugin), so nobody is sent into it for a
   duel. Check that `sduels arena regen` still works on a disabled arena.
   Duels-Shyam also protects its arenas' bounds (`protect-arena-bounds: true` in its `config.yml`), which
   stops players outside a duel from building, throwing and hitting there. Set it to `false` before players
   use the kit world.
3. Set the command and `enabled: true` in the profile, then `/okits reload`.
4. `/okits regen ffa` runs it once at once to test.

## Keys

| Key | Default | Meaning |
|---|---|---|
| `enabled` | `false` | Switches the timer on |
| `every` | `30m` | Time between two regens: `90s`, `30m`, `1h`. Minimum 10 s |
| `commands` | `[]` | Console commands, run in order. `%profile%` and `%world%` (the first loaded world of the profile) are replaced. A leading `/` is ignored. Can only be changed in the file, never in the admin GUI |
| `warnings` | `[60s, 10s]` | When players in the world are warned (`regen-warning` message) |
| `players` | `stay` | `stay` — nothing happens to them; `move` — they are moved to `move-to` while the arena is rebuilt |
| `move-to` | `""` | `world,x,y,z` or `world,x,y,z,yaw,pitch`, best outside the rebuilt area |
| `back-after` | `5s` | How long after the commands moved players are brought back. `0s` = they stay where they were moved |
| `skip-if-empty` | `false` | Skip the regen while nobody is in the world (the timer still restarts) |

## How it behaves

- The timer counts server time, so a lag spike delays the regen; it never fires early.
- `/okits reload` keeps the running countdown unless `every` changed.
- With `players: move`, each player is brought back to the exact spot they were moved from, and keeps their
  kit (the regen is not a world change). Anyone who died, logged out or teleported elsewhere meanwhile is
  left alone.
- A dead player at the moment of the regen is not moved.
- `/okits regen <profile>` runs it now and restarts the countdown.
- `%oberonkits_regen_in%` shows the time left in the player's kit world, `%oberonkits_regen_in_<profile>%`
  for a named one.
- Each regen is logged to the console with the number of commands and players.
