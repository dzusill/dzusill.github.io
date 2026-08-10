---
title: "Commands & Permissions"
description: "Seven player commands and one admin command — every name and permission comes from the config."
---

Every name, alias and permission below is the **default**. All of them live in `config.yml` under `Commands` and can be changed or switched off. Changing them needs a restart.

## Player commands

| Command | Default alias | Default permission |
|---|---|---|
| `/staffchat [message]` | `/sc` | `oberonstaff.staffchat` |
| `/tp <player> [player]` | | `oberonstaff.teleport` |
| `/tpo <player> [player]` | | `oberonstaff.teleport.override` |
| `/tphere <player>` | `/s` | `oberonstaff.teleport` |
| `/tpohere <player>` | | `oberonstaff.teleport.override` |
| `/tptoggle` | | `oberonstaff.tptoggle` |
| `/back` | | `oberonstaff.back` |

`/staffchat` with no arguments toggles the mode. With arguments it sends one line.

The `o` variants reach players who have `/tptoggle` on. So does holding `oberonstaff.teleport.override` on the plain commands.

## Admin command

`/oberonstaff`, aliases `/ostaff` and `/os`. Everything under it needs `oberonstaff.admin`.

| Command | Description |
|---|---|
| `/oberonstaff` | Show the usage list. |
| `/oberonstaff reload` | Reload `config.yml` and `messages.yml`. |
| `/oberonstaff status` | Active integrations and current usage. |
| `/oberonstaff log [count]` | Recent staff teleports. Default 10, max 100. |

### `status` is the one to run first

```
Vanish: PremiumVanish (enabled: yes, 6 level(s))
» Preferences stored in database, action log on
» Staff chat on for 2, teleports blocked by 1
```

**`Vanish: none`** on a server that runs a vanish plugin means the integration did not take — and that looks exactly like it working until somebody vanishes.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `oberonstaff.admin` | op | `/oberonstaff` and all subcommands. |
| `oberonstaff.staffchat` | op | Send **and receive** staff chat. |
| `oberonstaff.teleport` | op | `/tp` and `/tphere`. |
| `oberonstaff.teleport.override` | op | `/tpo`, `/tpohere`, and reaching players with `/tptoggle` on. |
| `oberonstaff.tptoggle` | op | `/tptoggle`. |
| `oberonstaff.back` | op | `/back`. |
| `oberonstaff.*` | op | Everything above. |

PremiumVanish's own `pv.see.*` nodes decide who can see whom. That plugin owns them; the ladder that reads them is in [`config.yml`](/plugins/oberonstaff/configuration/config/).

### Suggested setup

```
/lp group mod permission set oberonstaff.staffchat true
/lp group mod permission set oberonstaff.teleport true
/lp group mod permission set oberonstaff.tptoggle true
/lp group mod permission set oberonstaff.back true

/lp group admin permission set oberonstaff.teleport.override true
/lp group admin permission set oberonstaff.admin true
```

> **Keep `oberonstaff.teleport.override` narrow.** It is what lets somebody reach a staff member who has deliberately blocked teleports. Admins, not moderators.

### Keeping your existing nodes

If your staff are already permissioned with `teleport.use` and `staffchat.use` from the old script, keep those instead of re-permissioning everyone:

```yaml
Commands:
  tp:        { Permission: "teleport.use" }
  tphere:    { Permission: "teleport.use" }
  staffchat: { Permission: "staffchat.use" }
Staff-Chat:
  Permission: "staffchat.use"
```

Note `Staff-Chat.Permission` as well as the command's — the first decides who **receives** staff chat, the second who can run the command.

## Overlapping with EssentialsX

Two plugins registering `/tp` means load order decides which wins. Switch ours off:

```yaml
Commands:
  tp:      { Enabled: false }
  tphere:  { Enabled: false }
  back:    { Enabled: false }
```

Or rename ours (`Name: stp`). Either way, restart.

## Tab completion

Every command's player arguments tab-complete — with vanished players stripped out, along with every other command's suggestions on the server. See [Vanish](/plugins/oberonstaff/features/vanish/).
