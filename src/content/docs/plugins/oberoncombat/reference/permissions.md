---
title: "Permissions"
description: "Nobody has these by default, not even ops."
---

| Node | Default | Allows |
|---|---|---|
| `oberoncombat.admin` | op | `/oberoncombat reload`, `status`, `debug` |
| `oberoncombat.command.tag` | everyone | `/tag` on yourself |
| `oberoncombat.command.tag.others` | op | `/tag <player>` |
| `oberoncombat.command.untag` | op | `/untag` on yourself |
| `oberoncombat.command.untag.others` | op | `/untag <player>` and `/untag all` |
| `oberoncombat.command.soup` | everyone | `/soup` |
| `oberoncombat.command.pvp` | **op** | `/pvp` on yourself. Not given to everyone, as in PvPManager: grant it to the ranks that may switch PvP off |
| `oberoncombat.command.pvp.others` | op | `/pvp <player>` |
| `oberoncombat.command.pvpstatus` | everyone | `/pvpstatus` on yourself |
| `oberoncombat.command.pvpstatus.others` | op | `/pvpstatus <player>` |
| `oberoncombat.command.pvpinfo` | op | `/pvpinfo` on yourself |
| `oberoncombat.command.pvpinfo.others` | op | `/pvpinfo <player>` |
| `oberoncombat.soup` | everyone | The soup effect, when `soup.require-permission` is on |

## Exemptions

Nobody has these by default, **not even ops**.

| Node | Exempts the holder from |
|---|---|
| `oberoncombat.exempt.tag` | being tagged, and (with `exempt-both-sides`) from tagging others |
| `oberoncombat.exempt.commands` | the command blacklist |
| `oberoncombat.exempt.combatlog` | the combat-log punishment |
| `oberoncombat.exempt.moneysteal` | having money stolen on death |
| `oberoncombat.exempt.expsteal` | having experience stolen on death |
| `oberoncombat.exempt.pve` | being tagged by mobs |
| `oberoncombat.exempt.restrictions` | every [restriction](/plugins/oberoncombat/features/restrictions/) |
| `oberoncombat.exempt.tageffects` | every [tag effect](/plugins/oberoncombat/features/restrictions/) |
| `oberoncombat.exempt.killabuse` | the [kill-abuse guard](/plugins/oberoncombat/features/kill-abuse/) |
| `oberoncombat.exempt.pvpcooldown` | the `/pvp` cooldown |
| `oberoncombat.exempt` | **all of the above** |

`oberoncombat.*` grants the admin, `/pvp`, `/pvpinfo` and `.others` nodes and `/soup`, but **not** the exemptions: an admin group with
`oberoncombat.*` is still tagged. Grant `oberoncombat.exempt` on purpose.

## PvPManager equivalents

| PvPManager | OberonCombat |
|---|---|
| `pvpmanager.exempt.combattag` | `oberoncombat.exempt.tag` |
| `pvpmanager.exempt.blockcommands` | `oberoncombat.exempt.commands` |
| `pvpmanager.exempt.combatlog` | `oberoncombat.exempt.combatlog` |
| `pvpmanager.command.tag`, `.tag.others` | `oberoncombat.command.tag`, `.tag.others` |
| `pvpmanager.command.untag` | `oberoncombat.command.untag`, `.untag.others` |
| `pvpmanager.admin` | `oberoncombat.admin` |
| `pvpmanager.command.pvp` | `oberoncombat.command.pvp` |
| `pvpmanager.command.pvpinfo` | `oberoncombat.command.pvpinfo` |
| `pvpmanager.exempt.disableactions` | `oberoncombat.exempt.tageffects` |
| `pvpmanager.exempt.nopvetag` | `oberoncombat.exempt.pve` |
| `pvpmanager.exempt.killabuse` | `oberoncombat.exempt.killabuse` |
| `pvpmanager.exempt.pvptogglecooldown` | `oberoncombat.exempt.pvpcooldown` |
