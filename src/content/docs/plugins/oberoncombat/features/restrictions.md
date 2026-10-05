---
title: "Restrictions and tag effects"
description: "Two groups of switches, both off by default, for what a tagged player may not do and what being tagged does to them."
---

Two groups of switches, both **off by default**, for what a tagged player may not do and what being tagged does to them.

## Restrictions

```yaml
restrictions:
  ender-pearl: false
  chorus-fruit: false
  teleport: false
  eat: false
  totem: false
  place-blocks: false
  break-blocks: false
  open-inventory: false
  portal: false
  riptide: false
  message-cooldown: 1s
```

While a player is tagged, each switch that is on refuses the action and shows its `blocked-…` message (action bar, at most once
per `message-cooldown`).

| Switch | Refuses | Message |
|---|---|---|
| `ender-pearl` | throwing an ender pearl | `blocked-ender-pearl` |
| `chorus-fruit` | eating chorus fruit | `blocked-chorus-fruit` |
| `teleport` | **teleport commands** only | `blocked-teleport` |
| `eat` | eating food (a potion is not food; soup is handled by [soup PvP](/plugins/oberoncombat/features/soup/)) | `blocked-eat` |
| `totem` | a totem of undying saving the player, so they die | `blocked-totem` |
| `place-blocks` | placing blocks | `blocked-place-blocks` |
| `break-blocks` | breaking blocks | `blocked-break-blocks` |
| `open-inventory` | opening chests, ender chests, crafting tables, plugin menus | `blocked-open-inventory` |
| `portal` | entering a nether or end portal | `blocked-portal` |
| `riptide` | using a riptide trident | `blocked-riptide` |

Details worth knowing:

- **`teleport` blocks only the `COMMAND` cause.** Warps, duels and every other plugin's teleport are never in the way,
  so a tagged player can still be taken somewhere by a plugin that decides to. Pearls and chorus fruit that would land in a
  safe zone are the [barrier's](/plugins/oberoncombat/features/barrier/) job.
- **`riptide`** refuses the *use* of the trident, since the launch cannot be cancelled once it happens. A plain trident
  is untouched.
- Other plugins that already cancelled the action are left alone.
- `oberoncombat.exempt.restrictions` skips all of these for a player; excluded places (`restrictions`) switch them off.

## Tag effects

```yaml
tag-effects:
  disable-fly: false
  restore-fly: true
  force-survival: false
  disable-godmode: false
  remove-invisibility: false
```

Applied when a player is tagged:

| Switch | Effect |
|---|---|
| `disable-fly` | takes away flight (`allowFlight`) and stops them flying. Creative and spectator players are left to `force-survival` |
| `restore-fly` | gives flight back when the tag ends or the player leaves, **only** to a player who had it before |
| `force-survival` | moves a creative player to survival. Not given back |
| `disable-godmode` | switches EssentialsX god mode off. Needs Essentials; without it the switch does nothing and the console says so once |
| `remove-invisibility` | removes the invisibility potion effect |

Abilities are changed on the player's own thread (Folia-safe), a moment after the tag. A player who dies just after their tag ran
out still gets flight back. `oberoncombat.exempt.tageffects` skips them all; excluded places (`tag-effects`) switch them off. God mode is reached by
reflection on three Essentials methods only (`getUser`, `isGodModeEnabled`, `setGodModeEnabled`), so no Essentials class is
ever loaded by OberonCombat.

## PvE and the boss bar

Those two also belong to the combat tag: see [The combat tag](/plugins/oberoncombat/features/combat-tag/).
