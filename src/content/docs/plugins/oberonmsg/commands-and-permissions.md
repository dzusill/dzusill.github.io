---
title: "Commands & Permissions"
description: "Six player commands and one admin command — every name and permission comes from the config."
---

Every name, alias and permission below is the **default**. All of them live in `config.yml` under `Commands` and can
be changed or switched off. Changing them needs a restart.

## Player commands

| Command | Default aliases | Default permission | Default |
|---|---|---|---|
| `/msg <player> <message>` | `message` `tell` `whisper` `w` `t` `dm` `pm` | `oberonmsg.message` | everyone |
| `/reply <message>` | `r` | `oberonmsg.message` | everyone |
| `/ignore [player]` | `block` | `oberonmsg.ignore` | everyone |
| `/unignore <player>` | `unblock` | `oberonmsg.ignore` | everyone |
| `/msgtoggle` | | `oberonmsg.msgtoggle` | everyone |
| `/socialspy` | `spy` | `oberonmsg.socialspy` | op |

`/ignore` with no argument lists who you are ignoring.

## Admin command

`/oberonmsg`, aliases `/omsg` and `/om`. Everything under it needs `oberonmsg.admin`.

| Command | Description |
|---|---|
| `/oberonmsg` | Show the usage list. |
| `/oberonmsg reload` | Reload `config.yml` and `messages.yml`. |
| `/oberonmsg status` | Active integrations and current usage. |
| `/oberonmsg log [count]` | Recent private messages, when logging is on. Default 10, max 100. |

### `status` is the one to run first

```
Vanish: PremiumVanish (enabled: yes), AFK: EssentialsX
» Stored in database, message log off
» Messages off for 2, social spy on for 1
```

**`none` for either integration** means it is doing nothing — and that looks exactly like it working until somebody
vanishes or goes away.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `oberonmsg.message` | everyone | `/msg` and `/reply`. |
| `oberonmsg.ignore` | everyone | `/ignore` and `/unignore`. |
| `oberonmsg.msgtoggle` | everyone | `/msgtoggle`. |
| `oberonmsg.socialspy` | op | See other players' private messages. |
| `oberonmsg.admin` | op | `/oberonmsg` and all subcommands. |
| `oberonmsg.ignore.bypass` | false | Cannot be ignored; public chat never hidden. |
| `oberonmsg.message.bypass` | false | Reach players who have `/msgtoggle` on. |
| `oberonmsg.*` | op | Everything above. |

### The two bypasses

Both are for staff, and both are `false` by default including for ops.

```
/lp group mod permission set oberonmsg.ignore.bypass true
/lp group mod permission set oberonmsg.message.bypass true
```

> `oberonmsg.ignore.bypass` matters more than it looks. Without it, a player under investigation can silence the
> staff member handling their report with one `/ignore`.

Neither overrides *your own* ignore list — see [Ignore lists](/plugins/oberonmsg/features/ignore/).

## Overlapping with EssentialsX

Two plugins registering `/msg` means load order decides which wins. Switch ours off:

```yaml
Commands:
  msg:      { Enabled: false }
  reply:    { Enabled: false }
  ignore:   { Enabled: false }
  unignore: { Enabled: false }
```

Or rename ours. Either way, restart.

## Keeping your existing nodes

A server already permissioned with its own nodes keeps working:

```yaml
Commands:
  socialspy: { Permission: "socialspy.use" }
```

## Tab completion

Player arguments tab-complete, with vanished players stripped out — along with every other command's suggestions on
the server. See [Vanish & AFK](/plugins/oberonmsg/features/vanish-and-afk/).
