---
title: "Staff actions"
description: "The actions menu opens with a right-click on a head or /sus actions <player>. Every action is also a sub-command, so staff can work from chat and the…"
---

The **actions menu** opens with a right-click on a head or `/sus actions <player>`. Every action is also a sub-command, so staff can work from chat and the console too.

Every action:

- needs its own permission (a button you lack is hidden, and the action checks again anyway),
- can ask for confirmation (`punishments.confirm`),
- is written to the **audit log** with staff, target, reason and result, and optionally sent to Discord.

## Teleport

You are teleported next to the player. With `teleport.vanish-first: true` you are vanished through SimpleVanish **before** you arrive. Offline players can't be reached unless `teleport.allow-offline` is on; in that case you go to their last known position.

## Spectate

Switches you to spectator mode next to the player, invisible. With `spectate.first-person` you look through their eyes instead. `/sus spectate stop` (or clicking again) takes you back to where you were, in your old game mode and vanish state.

The session survives a crash. If you log out while spectating, or the server stops, your position and game mode are put back first.

## Freeze

A frozen player:

- can't move, interact or attack,
- takes no damage (`freeze.invulnerable`),
- can only use the commands in `freeze.allowed-commands`,
- sees a "frozen" title every `freeze.remind-every`.

The freeze **survives relogging and restarts**.

If a frozen player **logs out**, staff with `dsusmenu.alerts` are told, it goes to the audit log and Discord, and `freeze.quit-commands` run (for example a ban). Being kicked or banned is not a logout. A confirmed ban ends the freeze.

## Kick, mute, ban

1. Pick a duration (mute/ban): `1h, 6h, 1d, 3d, 7d, 30d, permanent`, or type your own (`1d12h`, `2w`).
2. Pick a reason from [`reasons.yml`](/plugins/dsusmenu/configuration/clients-and-reasons/#reasonsyml) or type your own.
3. Confirm.

Mute and ban run **AdvancedBan's** commands (`punishments.commands`). In game they run as you, so AdvancedBan records you as the operator and checks your AdvancedBan rights. From Discord, the console runs them and your name goes into the reason. Durations are sent in a form AdvancedBan reads: `1d12h` becomes `36h`.

AdvancedBan can still refuse a command, for example when you lack its permission or the player is exempt or already banned. dSusMenu checks two seconds later. Only a punishment AdvancedBan really applied is reported as done; a refused one is reported as *not applied*.

Kick is done by dSusMenu itself, unless you set a command for it.

## Notes

**Note** asks for a line in chat. It is stored with the player's active case (or just the player) and shown in the profile and the export.

## Case status

From the actions menu, or `/sus status <player> <open|review|resolve|dismiss> [reason]`:

- **Open / Review** a player without a case opens one.
- **Resolve** and **Dismiss** need a reason.
- **Dismiss** needs `dsusmenu.case.dismiss` and removes the case's points from the score.
- **Assign / Unassign** marks the case as yours. The list can filter unassigned cases.
