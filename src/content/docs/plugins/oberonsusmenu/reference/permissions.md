---
title: "Permissions"
description: "Every node defaults to op, except the two marked false. oberonsusmenu. gives everything except those two."
---

Every node defaults to **op**, except the two marked *false*. `oberonsusmenu.*` gives everything except those two.

| Permission | Allows |
| --- | --- |
| `oberonsusmenu.open` | `/sus` and the actions menu |
| `oberonsusmenu.view` | Profiles and flag history (also the profile/history clicks in the list) |
| `oberonsusmenu.alerts` | Silent risk alerts and frozen-player logout alerts |
| `oberonsusmenu.action.teleport` | Teleport to suspects |
| `oberonsusmenu.action.spectate` | Spectate invisibly |
| `oberonsusmenu.action.freeze` | Freeze and unfreeze |
| `oberonsusmenu.action.kick` | Kick (through LiteBans when installed) |
| `oberonsusmenu.action.mute` | Mute and tempmute through LiteBans |
| `oberonsusmenu.action.ban` | Ban and tempban through LiteBans |
| `oberonsusmenu.note` | Staff notes |
| `oberonsusmenu.case` | Open, review, resolve, assign cases |
| `oberonsusmenu.case.dismiss` | Dismiss cases as false positives (removes their points) |
| `oberonsusmenu.export` | Case reports |
| `oberonsusmenu.see-vanished` | See staff hidden by the `vanish.fallback-hide` fallback |
| `oberonsusmenu.admin` | `/sus reload`, `/sus health`, `/sus debug` |
| `oberonsusmenu.view.ip` | See the stored IP hash, only with IP logging on (*false*) |
| `oberonsusmenu.bypass.clientscan` | Skip client detection on join (*false*) |

Sub-commands only need their own node. For example, `/sus alerts` works with just `oberonsusmenu.alerts`.

## LiteBans

Kick, mute and ban run LiteBans' commands as the staff member, so they also need LiteBans' own permissions for those commands, including the one for silent (`-s`) punishments while `punishments.silent` is on. If LiteBans refuses, OberonSusMenu reports the punishment as *not applied*.

The Punishments click in a profile runs LiteBans' `/history <player>` as the staff member, so it needs LiteBans' history permission too.
