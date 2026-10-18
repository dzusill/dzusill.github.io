---
title: "Staff actions"
description: "The actions menu opens with a right-click on a head or /sus actions <player>. Freeze, spectate, notes, case status, assign and export are also sub-commands,…"
---

The **actions menu** opens with a right-click on a head or `/sus actions <player>`. Freeze, spectate, notes, case status, assign and export are also sub-commands, so staff can work from chat and the console too. Kick, mute and ban are buttons in the actions menu.

Every action:

- needs its own permission (a button you lack is hidden, and the action checks again anyway),
- can ask for confirmation (`punishments.confirm`),
- is written to the **audit log** with staff, target, reason and result, and can be posted to Discord (switchable per event).

## Teleport

You are teleported next to the player. With `teleport.vanish-first: true` you are vanished **before** you arrive. Offline players can't be reached unless `teleport.allow-offline` is on; in that case you go to where their last flag fired.

## Spectate

Switches you to spectator mode next to the player, vanished. With `spectate.first-person` you look through their eyes instead, whatever game mode you were in; the view switches as soon as their character has loaded for you. `/sus spectate stop` (or clicking again) takes you back to where you were, in your old game mode and vanish state.

The session survives a crash. If you log out while spectating, or the server stops, your position and game mode are put back first.

## Vanish

Teleport and spectate vanish you through **PremiumVanish's API** when it is installed. Without it:

1. `vanish.enable-command` / `disable-command` run another vanish plugin's commands as you, or
2. `vanish.fallback-hide: true` hides you from everyone without `oberonsentry.see-vanished`, or
3. nothing, and you are visible.

The console says at startup which one is used (`Vanish for spectate/teleport: PremiumVanish.`).

## Freeze

A frozen player:

- can't move, interact or attack,
- takes no damage (`freeze.invulnerable`),
- can only use the commands in `freeze.allowed-commands`,
- sees a "frozen" title every `freeze.remind-every`.

The freeze **survives relogging and restarts**.

If a frozen player **logs out**, staff with `oberonsentry.alerts` are told, it goes to the audit log and Discord (`frozen-logout`), and `freeze.quit-commands` run, for example:

```yaml
freeze:
  quit-commands: ['tempban -s {player} 7d Logged out while frozen']
```

Being kicked or banned is not a logout. A confirmed ban ends the freeze.

## Kick, mute, ban

1. Pick a duration (mute/ban): `1h, 6h, 1d, 3d, 7d, 30d, permanent`, or type your own (`1d12h`, `2w`).
2. Pick a reason from [`reasons.yml`](/plugins/oberonsentry/configuration/clients-and-reasons/#reasonsyml) or type your own.
3. Confirm.

Kick, mute and ban run **LiteBans'** commands (`punishments.commands`). They run as you (`punishments.run-as-staff`), so LiteBans records you as the executor and checks your LiteBans rights. With `run-as-staff: false` the console runs them and your name goes into the reason (`punishments.console-reason`). Durations are sent as one number and unit: `1d12h` becomes `36h`.

With `punishments.silent: true` (the default) every command gets LiteBans' **`-s`**, so only staff see the punishment broadcast. The flag is only added while LiteBans is installed; vanilla `/ban` would read `-s` as a player name.

LiteBans can still refuse a command, for example when you lack its permission or the player is exempt or already punished. OberonSentry checks LiteBans two seconds later. Only a punishment LiteBans really applied is reported as done, and posted to Discord; a refused one is reported as *not applied*.

Without LiteBans, kick is a plain kick, and mute and ban run the configured commands without `-s`, trusted as given.

## Notes

**Note** asks for a line in chat. It is stored with the player's active case (or just the player) and shown in the profile and the export.

## Case status

From the actions menu, or `/sus status <player> <open|review|resolve|dismiss> [reason]`:

- **Open / Review** a player without a case opens one.
- **Resolve** and **Dismiss** need a reason.
- **Dismiss** needs `oberonsentry.case.dismiss` and removes the case's points from the score.
- **Assign / Unassign** marks the case as yours. The list can filter unassigned cases.
