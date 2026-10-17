---
title: "Permissions"
description: "Every node defaults to op, except the two marked false. oberonsentry. gives everything except those two."
---

Every node defaults to **op**, except the two marked *false*. `oberonsentry.*` gives everything except those two.

| Permission | Allows |
| --- | --- |
| `oberonsentry.open` | `/sus` and the actions menu |
| `oberonsentry.view` | Profiles and flag history (also the profile/history clicks in the list) |
| `oberonsentry.alerts` | Silent risk alerts and frozen-player logout alerts |
| `oberonsentry.action.teleport` | Teleport to suspects |
| `oberonsentry.action.spectate` | Spectate invisibly |
| `oberonsentry.action.freeze` | Freeze and unfreeze |
| `oberonsentry.action.kick` | Kick (through LiteBans when installed) |
| `oberonsentry.action.mute` | Mute and tempmute through LiteBans |
| `oberonsentry.action.ban` | Ban and tempban through LiteBans |
| `oberonsentry.note` | Staff notes |
| `oberonsentry.case` | Open, review, resolve, assign cases |
| `oberonsentry.case.dismiss` | Dismiss cases as false positives (removes their points) |
| `oberonsentry.export` | Case reports |
| `oberonsentry.see-vanished` | See staff hidden by the `vanish.fallback-hide` fallback |
| `oberonsentry.admin` | `/sus reload`, `/sus health`, `/sus debug` |
| `oberonsentry.view.ip` | See the stored IP hash, only with IP logging on (*false*) |
| `oberonsentry.bypass.clientscan` | Skip client detection on join (*false*) |

Sub-commands only need their own node. For example, `/sus alerts` works with just `oberonsentry.alerts`.

## LiteBans

Kick, mute and ban run LiteBans' commands as the staff member, so they also need LiteBans' own permissions for those commands, including the one for silent (`-s`) punishments while `punishments.silent` is on. If LiteBans refuses, OberonSentry reports the punishment as *not applied*.

The Punishments click in a profile runs LiteBans' `/history <player>` as the staff member, so it needs LiteBans' history permission too.
