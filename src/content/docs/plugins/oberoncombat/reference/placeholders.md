---
title: "Placeholders"
description: "With PlaceholderAPI installed, the expansion oberoncombat is registered, and with integrations.papi-alias-pvpmanager: true"
---

With PlaceholderAPI installed, the expansion `oberoncombat` is registered, and with `integrations.papi-alias-pvpmanager: true`
(the default) **the same answers are given under `pvpmanager`**. Every placeholder on PvPManager's wiki is answered, so a TAB
layout, scoreboard or hologram written for PvPManager needs no edit. `/papi info oberoncombat` lists them in game.

## Combat

| Placeholder | Answers |
|---|---|
| `%oberoncombat_in_combat%` | whether the player is tagged; the text is `integrations.boolean-format` (`true` / `false`) |
| `%oberoncombat_timeleft%`, `%pvpmanager_combat_timeleft%` | seconds left, rounded up; `0` when not tagged |
| `%oberoncombat_timeleft_ms%`, `%pvpmanager_combat_timeleft_ms%` | milliseconds left; `0` when not tagged |
| `%oberoncombat_timeleft_formatted%` | the same as `20s`; `0s` when not tagged |
| `%oberoncombat_combat_prefix%` | `placeholders.combat-prefix` while tagged, empty otherwise (a nametag prefix for TAB) |
| `%oberoncombat_enemies%` | the names of everyone the player is fighting, comma separated |
| `%oberoncombat_current_enemy%` | the player they hit or were hit by last, empty if none |
| `%oberoncombat_current_enemy_health%` | that player's health, one decimal at most; `0` if none |
| `%oberoncombat_current_enemy_hearts%` | that player's health as hearts: `placeholders.heart-symbol` once per heart, rounded up |
| `%oberoncombat_player_health%` | the player's own health, one decimal at most |

## PvP toggle

| Placeholder | Answers |
|---|---|
| `%oberoncombat_pvp_state%` | `on` or `off` |
| `%oberoncombat_pvp_status%` | `true` / `false` (the boolean format): whether the player's own PvP is on |
| `%oberoncombat_pvp_status_prefix%` | `placeholders.pvp-status-prefix-on` or `-off` by that state |
| `%oberoncombat_pvp_command_timeleft%` | seconds until the player may use `/pvp` again; `0` when they may |
| `%oberoncombat_global_pvp_status%` | always `true`: there is no global PvP switch |

All of these answer `on` / `true` while `pvp-toggle.enabled` is off.

## Answered for features this plugin does not have

These return a fixed value so that nothing shows the placeholder's own text:

| Placeholder | Answers |
|---|---|
| `%oberoncombat_is_newbie%`, `has_override`, `has_respawn_prot`, `has_teleport_prot` | `false` |
| `%oberoncombat_newbie_timeleft%`, `grant_timeleft` | `0` |
| `%oberoncombat_newbie_timeleft_formatted%` | `0s` |

## Configuring the text

```yaml
placeholders:
  combat-prefix: ""
  pvp-status-prefix-on: "&4PvP On "
  pvp-status-prefix-off: "&2PvP Off "
  heart-symbol: "❤"
integrations:
  boolean-format:
    'true': 'true'
    'false': 'false'
```

Colour codes in the prefixes are returned as written (`&4`), which is what TAB expects.
