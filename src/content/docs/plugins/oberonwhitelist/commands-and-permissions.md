---
title: "Commands & Permissions"
description: "Every subcommand of /obw and every permission node, with what each one is actually for."
---

## Commands

`/oberonwhitelist`, aliased `/obw` and `/ow`. Every subcommand needs `oberonwhitelist.admin`.

| Command | What it does |
|---|---|
| `/obw` | usage summary |
| `/obw reload` | reload the config, rebuild the index, resend command trees |
| `/obw check <player> <command>` | why a command is allowed or blocked for that player |
| `/obw simulate <group> <command>` | the same trace, without the player being online |
| `/obw groups [player]` | list groups, or show one player's group |
| `/obw scan-dialogs [folder]` | find a menu plugin's commands for `execute-only` |
| `/obw import <file>` | migrate a PerfCommandWhitelist config |

### /obw check

The one you will use most.

```
/obw check Steve /home
```

```
Typed /home, identity /home
Group default, mode strict
Runs (GROUP_GRANTS)
Suggested in tab
```

Line by line: what was typed and which command it resolved to; the player's rank and the enforcement mode; whether it runs and why; and whether it appears in tab completion.

When the identity line reads `not registered on this server`, nothing on the server provides that command — a typo, or a plugin that failed to load. When a command is granted but not suggested, an extra line names the reason.

The verdict in brackets is one of:

| | |
|---|---|
| `BYPASS` | holds `oberonwhitelist.bypass` |
| `GROUP_GRANTS` | the rank grants it |
| `PERMISSION_GRANTS` | no rank grants it, but the player holds the command's own permission — a [per-player perk](/plugins/oberonwhitelist/features/permission-grants/) |
| `EXECUTE_ONLY` | runnable, never suggested |
| `EXPLICITLY_BLOCKED` | on the block list, which outranks rank grants |
| `NOT_IN_GROUP` | not granted, and the mode is strict |
| `TAB_ONLY_MODE` | not granted, but the mode only filters tab |
| `UNKNOWN_COMMAND` | no such command exists |

### /obw simulate

Same trace against a group name instead of a player:

```
/obw simulate mod /ban
```

Useful for checking a rank nobody is currently online to test.

### /obw scan-dialogs

```
/obw scan-dialogs
/obw scan-dialogs DeluxeMenus
```

Defaults to `plugins/DialogMaster`. Separates commands that are safe to put in `execute-only` from ones granted to a higher rank, which must not be — see [Menu & Dialog Plugins](/plugins/oberonwhitelist/features/menu-plugins/).

### /obw import

```
/obw import PerfCommandWhitelist/config.yml
```

Writes `config.imported.yml` next to your config. Nothing is overwritten — see [Migrating](/plugins/oberonwhitelist/getting-started/migrating/).

## Permissions

| Node | Default | Effect |
|---|---|---|
| `oberonwhitelist.*` | op | everything below |
| `oberonwhitelist.admin` | op | use `/obw` and its subcommands |
| `oberonwhitelist.bypass` | false | skip the whitelist entirely; unfiltered tab completion |
| `oberonwhitelist.notify` | false | be told in chat when someone's command is blocked |
| `oberonwhitelist.group.<name>` | — | put the player in that group |

**Server operators bypass the whitelist without holding any of these**, unless you set `bypass.operators: false` — see [config.yml](/plugins/oberonwhitelist/configuration/config/#bypassoperators).

### oberonwhitelist.bypass

A total exemption: every command runs, tab completion is untouched, and the normal server error replies come back.

Give it to staff, and give it to yourself before you start tightening ranks. It is the difference between a misconfigured whitelist being an inconvenience and being a lockout.

:::caution
Do not rely on the `oberonwhitelist.*` wildcard to hand this to your operators. It does in plain Bukkit terms, but when LuckPerms is installed it calculates permissions itself and the wildcard does not necessarily reach them — an operator can end up filtered while `/plugins` suggests they should not be.

That is why operators are covered by an explicit setting instead. For staff who are not operators, grant `oberonwhitelist.bypass` directly rather than through the wildcard.
:::

### oberonwhitelist.notify

With `debug.notify-permission: 'oberonwhitelist.notify'` set, holders see blocked attempts as they happen:

```
[OW] Steve tried /coinshop (NOT_IN_GROUP)
```

Valuable for the first week after going strict — a menu command the scan missed shows up here immediately, usually before the player reports it.

### oberonwhitelist.group.&lt;name&gt;

Puts a player in that group. When several match, the highest `priority` wins.

```
/lp group mod permission set oberonwhitelist.group.mod true
```

Not needed if your LuckPerms group names already match your group names — see [Groups & Ranks](/plugins/oberonwhitelist/features/groups/).

## Who is never filtered

The console, command blocks and RCON never pass through the whitelist. It applies to players only.
