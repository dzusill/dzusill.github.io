---
title: "config.yml"
description: "Every option in config.yml, what it does, and what happens when you change it."
---

The only config file. Lives at `plugins/OberonWhitelist/config.yml`.

## enforcement.mode

```yaml
enforcement:
  mode: strict
```

| Value | Effect |
|---|---|
| `strict` | Only commands the rank grants, or `execute-only` allows, may run. |
| `tab-only` | Tab is still filtered, but an unlisted command typed anyway runs. Only `blocked-commands` stops execution. |

Tab completion is filtered identically in both modes. Loosening execution never leaks the command list.

`strict` is the default, and it is safe here as long as your menu commands are in `execute-only` — see [Menu & Dialog Plugins](/plugins/oberonwhitelist/features/menu-plugins/). Use `tab-only` while setting things up.

## groups

```yaml
groups:
  default:
    priority: 0
    commands:
      - /home
      - /spawn

  mod:
    priority: 10
    extends: default
    commands:
      - /kick
```

Full behaviour in [Groups & Ranks](/plugins/oberonwhitelist/features/groups/).

The leading `/` is optional and namespaces are ignored — an entry names the command, so it covers every alias and spelling.

## groups-from-luckperms

```yaml
groups-from-luckperms: true
```

Whether a player's LuckPerms primary group may decide their rank when no `oberonwhitelist.group.<name>` permission matches. Ignored when LuckPerms is not installed.

With LuckPerms present, a rank change also applies **immediately**: the plugin listens for it and drops that player's cached rank, so neither `/obw reload` nor a rejoin is needed. Without LuckPerms, a rank comes from permission nodes and a change applies on the player's next login or on reload.

## bypass.operators

```yaml
bypass:
  operators: true
```

Whether server operators skip the whitelist entirely — every command runs, and tab completion is unfiltered.

On by default, for two reasons. An operator being told *This command does not exist.* on their own server reads as a broken plugin rather than a working whitelist. And it is the safety net that stops a half-finished rank list locking you out of your own server.

Set it to `false` if you want operators filtered like everybody else — for testing what players actually see, or on a server where op is handed out more freely than trust is. The console is never filtered either way, so you can always get back in.

:::note
`oberonwhitelist.bypass` works alongside this and is the better fit for staff who should not be operators.

The permission alone is not enough to cover operators in practice: `plugin.yml` grants it to them through the `oberonwhitelist.*` wildcard, but when LuckPerms is installed it calculates permissions itself and that wildcard does not necessarily reach them. Hence the explicit setting.
:::

## execute-only

```yaml
execute-only:
  - /menu
  - /coinshop
  - /pay*
  - /velocity:callback
```

Commands that run but never appear in tab completion — menu buttons, dialog callbacks, clickable messages.

A trailing `*` matches by prefix, for buttons that build arguments at click time.

Generate this list with `/obw scan-dialogs` rather than writing it by hand.

:::caution
Not rank-aware — it grants to everyone. Never list a command a rank is supposed to gate.
:::

## permission-grants

```yaml
permission-grants:
  enabled: false
  commands: []
```

Allows a command whose **own permission the player holds** even when no rank grants it — for perks given per player rather than per rank: a bought `/fly`, a temporary `/hat`.

| | |
|---|---|
| `enabled` | off by default; turning it on loosens what the whitelist covers |
| `commands` | narrows it to these commands. Empty means any command whose permission the player holds. |

A command that declares no permission is never granted this way, because Bukkit treats those as runnable by anyone — counting them would open every unprotected command on the server.

`blocked-commands` still outranks it.

Full behaviour in [Per-Player Perks](/plugins/oberonwhitelist/features/permission-grants/).

## blocked-commands

```yaml
blocked-commands:
  - /pl
  - /version
  - /bukkit:help
```

Never run, never suggested. Outranks every rank grant.

* **A bare entry** (`/pl`) names the command and covers every spelling of it, namespaces included.
* **A namespaced entry** (`/bukkit:help`) blocks only that exact spelling, leaving `/help` working.

The shipped list hides which plugins the server runs. It is much shorter than the equivalent list in string-matching plugins, because one entry covers every spelling — see [Command Identity](/plugins/oberonwhitelist/features/command-identity/).

## blocked-actions

```yaml
blocked-actions:
  - 'message: &cThis command does not exist.'
  - 'actionbar: &cThis command does not exist.'
  - 'playsound: entity.villager.no;1.0;1.0'
```

What a player gets when a command is denied — and, identically, when they type a command that does not exist.

Prefixes: `message:`, `actionbar:`, `title:` (`title;subtitle`), `playsound:` (`key;volume;pitch`), `give_potion_effect:` (`type;seconds;amplifier`), `console_command:`.
Placeholders: `%player%`, `%command%`. Both `&`-codes and MiniMessage tags work.

Full details in [One Indistinguishable Error](/plugins/oberonwhitelist/features/one-error/).

## blocked-action-cooldown-millis

```yaml
blocked-action-cooldown-millis: 0
```

Minimum gap between two replies to the same player, in milliseconds. `0` disables it. Worth setting to a few hundred if you use a sound.

## debug

```yaml
debug:
  log-blocked: false
  log-tab-filter: false
  notify-permission: ''
  warn-on-missing-commands: true
```

| Option | Effect |
|---|---|
| `log-blocked` | Log every blocked command to the console. Turn on for the first week after going strict — it is how you find menu commands the scan missed. |
| `log-tab-filter` | Log what tab filtering removed and restored. Very noisy; for diagnosing one report only. |
| `notify-permission` | Players holding this permission are told in chat when someone's command is blocked. `oberonwhitelist.notify` is the conventional value; empty disables it. |
| `warn-on-missing-commands` | Warn when a configured command is not registered on this server. Runs once the server has finished enabling plugins — asked any earlier it would report every later-loading plugin's commands as missing. |

## update-checker

```yaml
update-checker:
  enabled: true
```

## config-version

```yaml
config-version: 1
```

Set by the plugin. Do not edit.

## What is not merged on update

New keys added by a plugin update are merged into your file, **except** `groups`, `execute-only`, `blocked-commands` and `blocked-actions`.

Those are yours. Merging them would resurrect a command you deliberately deleted from a rank on the next restart — the failure mode that makes config-merging plugins impossible to actually configure.
