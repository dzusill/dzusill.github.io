---
title: "Permissions"
description: "Every node defaults to op, except the two marked false. dsusmenu. gives everything except those two."
---

Every node defaults to **op**, except the two marked *false*. `dsusmenu.*` gives everything except those two.

| Permission | Allows |
| --- | --- |
| `dsusmenu.open` | `/sus` and the actions menu |
| `dsusmenu.view` | Profiles and flag history (also the profile/history clicks in the list) |
| `dsusmenu.alerts` | Silent risk alerts and frozen-player logout alerts |
| `dsusmenu.action.teleport` | Teleport to suspects |
| `dsusmenu.action.spectate` | Spectate invisibly |
| `dsusmenu.action.freeze` | Freeze and unfreeze (also from Discord) |
| `dsusmenu.action.kick` | Kick (also from Discord) |
| `dsusmenu.action.mute` | Mute through AdvancedBan |
| `dsusmenu.action.ban` | Ban through AdvancedBan (also from Discord) |
| `dsusmenu.note` | Staff notes |
| `dsusmenu.case` | Open, review, resolve, assign cases |
| `dsusmenu.case.dismiss` | Dismiss cases as false positives (removes their points) |
| `dsusmenu.export` | Case reports |
| `dsusmenu.see-vanished` | See staff hidden by the vanish fallback |
| `dsusmenu.admin` | `/sus reload`, `/sus health`, `/sus debug` |
| `dsusmenu.view.ip` | See the stored IP hash, only with IP logging on (*false*) |
| `dsusmenu.bypass.clientscan` | Skip client detection on join (*false*) |

Sub-commands only need their own node. For example, `/sus alerts` works with just `dsusmenu.alerts`.

## Discord buttons

A button press from Discord runs only if **both** checks pass:

1. The member has one of the anti-cheat staff roles (Phalanx admin panel).
2. Their linked Minecraft account has the permission: `dsusmenu.action.freeze`, `dsusmenu.action.kick` or `dsusmenu.action.ban`. For staff who are offline, this is checked through LuckPerms.

## AdvancedBan

Mute and ban run AdvancedBan's commands as the staff member, so they also need AdvancedBan's own permissions for those commands (for example `ab.ban.perma`). If AdvancedBan refuses, dSusMenu reports the punishment as *not applied*.
