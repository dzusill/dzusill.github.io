---
title: "Commands"
description: "Commands are registered at runtime; there is no commands: block in plugin.yml. /tag, /untag, /soup, /pvp and"
---

Commands are registered at runtime; there is no `commands:` block in `plugin.yml`. `/tag`, `/untag`, `/soup`, `/pvp` and
`/pvpstatus` answer to their names even when another plugin has a command of the same name.

| Command | Aliases | Permission | Does |
|---|---|---|---|
| `/tag` | `/combattag`, `/pvptag` | `oberoncombat.command.tag` | Show your time left |
| `/tag <player>` | | `oberoncombat.command.tag.others` | Tag a player for the full tag time |
| `/untag` | | `oberoncombat.command.untag` | Free yourself |
| `/untag <player>` | | `oberoncombat.command.untag.others` | Free a player |
| `/untag all` | | `oberoncombat.command.untag.others` | Free everyone |
| `/soup` | `/refillsoup` | `oberoncombat.command.soup` | Turn empty bowls into soup ([Soup](/plugins/oberoncombat/features/soup/)) |
| `/pvp [on\|off]` | `/pvptoggle`, `/togglepvp` | `oberoncombat.command.pvp` | Switch your own PvP ([PvP toggle](/plugins/oberoncombat/features/pvp-toggle/)) |
| `/pvp <player> [on\|off]` | | `oberoncombat.command.pvp.others` | Switch another player's PvP |
| `/pvpstatus` | | `oberoncombat.command.pvpstatus` | Your PvP state |
| `/pvpstatus <player>` | | `oberoncombat.command.pvpstatus.others` | Another player's PvP state |
| `/oberoncombat reload` | `/ocombat`, `/oc` | `oberoncombat.admin` | Re-read `config.yml` and `messages.yml` and restart what depends on them |
| `/oberoncombat status` | | `oberoncombat.admin` | What is switched on, and what was found: WorldGuard, Vault, Duels-Shyam |
| `/oberoncombat debug` | | `oberoncombat.admin` | Toggle the event trace (damage and death events in the console) |
| `/oberoncombat debug <player>` | | `oberoncombat.admin` | One player's state: tagged, milliseconds left, enemies |

`/pvp` and `/pvpstatus` say the toggle is not enabled until `pvp-toggle.enabled` is turned on.
