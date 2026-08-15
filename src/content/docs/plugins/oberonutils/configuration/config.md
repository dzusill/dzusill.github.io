---
title: "config.yml"
description: "Module switches and every behavioural setting, with the parity default and the recommended value side by side."
---

Every setting ships on the value that reproduces the Skript behaviour. Anything marked
**improvement** is new and ships **off**, so the first restart changes nothing about how the server
plays.

Durations accept `30s`, `5m`, `2h`, `1d`, or a plain number meaning seconds.

## Modules

```yaml
modules:
  combat: true
  teleport: true
  keyall: true
  kill: true
  nightvision: true
  ping: true
```

A disabled module registers no commands, no listeners and no tasks. Turning one on or off needs a
restart, not a reload — command registration only happens at startup.

## Combat

```yaml
combat:
  only-when-tagged: true
  cooldowns:
    END_CRYSTAL: 2s
    RESPAWN_ANCHOR: 2s
  exempt-tag-fix:
    enabled: true
    permission: pvpmanager.exempt
    cancel-both-sides: true
```

| Key | Meaning |
|---|---|
| `only-when-tagged` | Apply the cooldowns only while PvPManager has the player combat-tagged. `false` applies them always. |
| `cooldowns` | Material → cooldown. Applied after a **successful** placement, and from either hand. |
| `exempt-tag-fix.cancel-both-sides` | `true` means nobody is tagged when either side of the fight holds the exempt node. |

Charging a respawn anchor puts the cooldown on the **anchor**, so what it throttles is placing the
next one. To throttle the charging itself, add a `GLOWSTONE` entry.

[More on the combat module →](/plugins/oberonutils/features/combat/)

## Teleport

```yaml
teleport:
  warmup: 5s
  cancel-on-move: true
  move-mode: DISTANCE
  move-threshold: 0.1
  cancel-on-damage: false
  block-while-tagged: false
  bypass-permission: warp.bypass
  bypass-regions: [spawn]
  force-warmup-regions: [pvpzone]
  bypass-worlds: [spawn]
  bypass-worlds-applies-to-spawn-command: false
  warps-menu-command: "warps"
  safe-arrival-check: false
  remember-previous-location: false
  spawn:
    others-instant: true
    others-exempt-permission: ""
```

| Key | Meaning |
|---|---|
| `move-mode` | `DISTANCE` cancels past `move-threshold` blocks. `BLOCK` cancels only when the player leaves the block they started on — far more forgiving of knockback, boats and edge jitter. |
| `cancel-on-damage` | **Improvement.** Being hit currently does not stop a teleport, so a player under attack can stand still and escape. |
| `block-while-tagged` | **Improvement.** Refuse `/spawn` and `/warp` outright while combat-tagged. |
| `bypass-regions` | WorldGuard region IDs where the countdown is skipped. Matched **exactly**. |
| `force-warmup-regions` | Regions where the countdown always applies. Beats everything, including the bypass permission. |
| `warps-menu-command` | What `/warp` with no arguments runs. Blank prints a plain list instead. |
| `safe-arrival-check` | **Improvement.** Nudge a player out of blocks if a destination gets built over. |

Region IDs are matched exactly. The Skript check tested whether the *printed list* of regions
contained the text, so `spawn_pvp` and `oldspawn` both granted a bypass meant for `spawn`, and
`nopvpzone` forced a countdown because it contains `pvpzone`.

[More on teleports →](/plugins/oberonutils/features/teleport/)

## Kill

```yaml
kill:
  suicide-cause: SUICIDE
  staff-kill-cause: KILL
  block-in-combat: false
  cooldown: 0s
  menu:
    title: "<#C21807>💀 <gradient:#C21807:#F11800><b>Confirm Kill</b></gradient>"
    rows: 3
    cancel:  {slot: 11, material: RED_STAINED_GLASS_PANE,  name: "<gradient:#FF5555:#E64D4D>Cancel</gradient>",  lore: []}
    confirm: {slot: 15, material: LIME_STAINED_GLASS_PANE, name: "<gradient:#55FF55:#4DE64D>Confirm</gradient>", lore: []}
    target:  {slot: 13, name: "<#C21807><target>", lore: []}
    filler: AIR
```

`suicide-cause` and `staff-kill-cause` are damage cause names, so a death-message plugin sees the
death it expects. `/suicide` reads as a suicide; `/kill <player>` deliberately does not.

`block-in-combat` is the switch that closes "type `/suicide` to deny your attacker the kill".

[More on the kill menu →](/plugins/oberonutils/features/kill-menu/)

## Night vision

```yaml
nightvision:
  permission: ""
  effect:
    amplifier: 0
    ambient: true
    particles: false
  reapply-on:
    join: true
    respawn: true
    milk: true
    effect-cleared: true
    world-change: true
  respect-foreign-effects: true
```

A blank `permission` means open to everyone. `effect-cleared` is the one that matters — see
[Night Vision](/plugins/oberonutils/features/night-vision/).

## Ping

```yaml
ping:
  permission: ""
  permission-others: ""
  hide-vanished: true
  see-vanished-permission: pv.see
  colour-thresholds: []
  samples: 1
```

```yaml
  colour-thresholds:
    - {below: 80,    colour: "<green>"}
    - {below: 150,   colour: "<yellow>"}
    - {below: 99999, colour: "<red>"}
```

`samples` above 1 averages the last N readings instead of showing one spiky sample.

## Hooks

```yaml
hooks:
  fail-closed: true
  log-status-on-startup: true
```

`fail-closed` is what stops a check that cannot be answered from being read as "allow". Leave it on.

## Advanced

```yaml
advanced:
  debug: false
  ignored-sections:
    - warps
    - keyall.tiers
    - combat.cooldowns
    - ping.colour-thresholds
```

`ignored-sections` are the parts the config merger must never re-populate. Without it, a warp or a
crate tier you delete comes back on the next restart when the shipped defaults are merged in.
