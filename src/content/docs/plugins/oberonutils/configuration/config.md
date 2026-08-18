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
  tag-cache-ttl: 60s
  cooldowns:
    END_CRYSTAL: 2s
    RESPAWN_ANCHOR: 2s
    FIREWORK_ROCKET: 8s
    ENDER_PEARL: 10s
  exempt-tag-fix:
    enabled: true
    permission: pvpmanager.exempt
    cancel-both-sides: true
```

| Key | Meaning |
|---|---|
| `only-when-tagged` | Apply the cooldowns only while PvPManager has the player combat-tagged. `false` applies them always. |
| `cooldowns` | Material → cooldown. **Any item works.** Applied after a successful placement or use, and from either hand. |
| `tag-cache-ttl` | How long an observed combat tag stays trusted when PvPManager itself cannot be reached. A backstop — see below. |
| `exempt-tag-fix.cancel-both-sides` | `true` means nobody is tagged when either side of the fight holds the exempt node. |

Charging a respawn anchor puts the cooldown on the **anchor**, so what it throttles is placing the
next one. To throttle the charging itself, add a `GLOWSTONE` entry.

### Which items can have a cooldown

All of them. Three detection paths are used, and which one an item takes decides how precise it is:

| Item | Path | Charged when |
|---|---|---|
| `END_CRYSTAL`, `ARMOR_STAND` | the entity being created | the entity really exists — a placement refused by WorldGuard costs nothing |
| `RESPAWN_ANCHOR` | charge-level comparison | the charge actually rises — a full anchor costs nothing |
| everything else | the item being used from the hand | the use is not cancelled |

That third path is what makes `FIREWORK_ROCKET: 8s`, `ENDER_PEARL: 10s` and the like work.

A material that is not an item, or has no usable duration, is **named in console at load** rather
than sitting in the config doing nothing.

### Combat state

Combat state is read from PvPManager directly — its `CombatPlayer` API first, its PlaceholderAPI
expansion second. `tag-cache-ttl` governs a fallback used only when neither can answer, and exists
because the cache was once trusted *over* PvPManager: one missed untag left a player permanently "in
combat" here, locked out of `/spawn` and `/warp`, while PvPManager knew they were fine.

`/oberonutils hooks` reports whether the live state is reachable, separately from whether PvPManager
is merely installed.

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
  no-args-action: MENU
  repeat-command-action: IGNORE
  warps-menu-command: "warps"
  dialog: "warps"
  register-dialog-source: true
  dialog-source: oberonutils_warps
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
| `no-args-action` | What `/warp` does with no arguments — see below. |
| `repeat-command-action` | What a second `/spawn` or `/warp` does mid-countdown — see below. |
| `warps-menu-command` | The command run when `no-args-action` is `MENU`. |
| `dialog` | The DDialogs id opened when `no-args-action` is `DIALOG`. |
| `register-dialog-source` | Publish the warp list to DDialogs so a dialog can build itself. |
| `safe-arrival-check` | **Improvement.** Nudge a player out of blocks if a destination gets built over. |

### `/warp` with no arguments

Also applies to a warp name that does not exist.

| Value | Does |
|---|---|
| `MENU` | Runs `warps-menu-command`. What the Skript version did, so it is the default. |
| `DIALOG` | Opens one of your own DDialogs screens by id, through its API rather than a command. |
| `USAGE` | Prints the `usage.warp` message, like any other mistyped command. |
| `LIST` | Prints the warps the player can actually reach — gated warps they lack the permission for are left out. |

With `LIST`, an unknown name also gets `warp.not-found` first, so the player is told they mistyped
rather than silently handed a list.

Two fallbacks, both so a player who asked for warps never gets nothing:

- A blank `warps-menu-command` makes `MENU` print the list instead of leaving the player with
  "unknown command" if the menu plugin is ever removed.
- `DIALOG` falls back to the list when the dialog cannot be shown — unknown id, a permission the
  player lacks, or a client too old to draw one.

### Feeding your dialog the warp list

`register-dialog-source` publishes the warps to DDialogs as a `dynamic-list` source. Write **one**
template button in your dialog and it repeats for every warp, so `/setwarp arena` puts a new button
on the screen with no dialog edit at all.

Rows are read each time the dialog opens, and are per player: a warp behind a permission they lack
is not in their list, so the screen cannot offer a button that would refuse them.

| Token | Gives |
|---|---|
| `$(warp_name)` | The id — use it for `/warp $(warp_name)` |
| `$(warp_display)` | The coloured name from `warps.yml` |
| `$(warp_icon)` | The `icon` material — use it as the button's item |
| `$(warp_world)` | Destination world |
| `$(warp_x)` `$(warp_y)` `$(warp_z)` | Rounded coordinates |
| `$(warp_cooldown)` | Time left, or empty when there is none |
| `$(warp_on_cooldown)` | `true` / `false` |

Set `register-dialog-source: false` to leave DDialogs alone entirely.

### Running the command twice

What a second `/spawn` or `/warp` does while a countdown is already running.

| Value | Does |
|---|---|
| `IGNORE` | Nothing at all. What the scripts did, and the default. |
| `MESSAGE` | Sends `spawn.already-teleporting` / `warp.already-teleporting`. |
| `RESTART` | Cancels the running countdown and starts a fresh one. |

`MESSAGE` looks like it stalls the countdown, and the reason is worth knowing: those messages are
`ERROR` category, which goes to chat **and** the action bar — and the action bar is where the
countdown is drawn. Overwriting a line that only refreshes once a second reads as a pause. Pin them
to chat if you want the message without that:

```yaml
Presentation:
  Overrides:
    warp.already-teleporting: {Channel: CHAT}
    spawn.already-teleporting: {Channel: CHAT}
```

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
