---
title: "Placeholders"
description: "With PlaceholderAPI installed, the expansion oberoncombat is registered:"
---

With PlaceholderAPI installed, the expansion `oberoncombat` is registered:

| Placeholder | Answers |
|---|---|
| `%oberoncombat_in_combat%` | whether the player is tagged; the text is `integrations.boolean-format` (`true` / `false`) |
| `%oberoncombat_timeleft%` | seconds left, rounded up; `0` when not tagged |
| `%oberoncombat_timeleft_formatted%` | the same as `20s`; `0s` when not tagged |
| `%oberoncombat_enemies%` | the names of the players being fought, comma separated |
| `%oberoncombat_player_health%` | the player's health, one decimal at most |
| `%oberoncombat_pvp_state%` | `on` or `off`: the player's own PvP ([PvP toggle](/plugins/oberoncombat/features/pvp-toggle/)); `on` while the toggle is disabled |

## PvPManager names

With `integrations.papi-alias-pvpmanager: true` (the default) the same answers are given under the identifier `pvpmanager`,
and PvPManager's spelling of the time works too:

| Old | Same as |
|---|---|
| `%pvpmanager_in_combat%` | `%oberoncombat_in_combat%` |
| `%pvpmanager_combat_timeleft%` | `%oberoncombat_timeleft%` |
| `%pvpmanager_player_health%` | `%oberoncombat_player_health%` |

TAB, scoreboards and holograms that read them keep working without an edit.
