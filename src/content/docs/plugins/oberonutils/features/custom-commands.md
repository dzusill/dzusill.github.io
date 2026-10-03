---
title: "Custom Commands"
description: "Your own simple commands — /discord, /rules, a custom /ping — from one yml file, with placeholders, chat or action bar, and no extra plugin."
---

Add a command to `commands.yml`, run `/oberonutils reload`, and it is live. No restart, no code.

```yaml
commands:
  discord:
    aliases: [dc]
    reply: "<blue>Join our Discord: <white>discord.gg/example"
```

The file ships empty, with the examples below commented out. A mistake in one command never breaks
the others: that command is skipped and the console says exactly what is wrong.

## What a command can do

```yaml
commands:
  ping:
    override: true                 # take the name even if it is already used
    aliases: [latency]
    description: "Show a ping"     # shown in /help
    permission: ""                 # blank = everyone
    permission-others: ""          # needed for /ping <player>
    players-only: false            # true = console cannot use it
    reply:
      message: "<gray>Your ping: <green>%player_ping%ms"
      channel: ACTION_BAR
    player-reply:
      message: "<gray>%target%'s ping: <green>%target_player_ping%ms"
      channel: CHAT
    subcommands:
      server:
        reply: "<gray>Players online: <white>%server_online%"
```

Only `reply` is required.

## Replies

```yaml
reply: "<green>Short form: chat only, no sound"

reply:
  message:
    - "<gold>Server rules"
    - "<gray>Be respectful"
  channel: BOTH
  sound: entity.experience_orb.pickup
```

| Key | Values |
|---|---|
| `message` | One line, or a list of lines |
| `channel` | `CHAT` (default), `ACTION_BAR`, `BOTH`, `NONE` |
| `sound` | A sound name, or `{name: block.note_block.pling, volume: 1.0, pitch: 1.5}` |

The delivery sits next to the text, so one file is enough to add a whole command. `NONE` with a
`sound` plays only the sound.

The action bar holds one line, so a list is shown side by side there. From console, an action bar
reply is printed to the console instead of being lost.

Colours use MiniMessage, and `&` colour codes work too.

## Players and subcommands

The first word after the command is read as a subcommand, then as a player:

| Typed | Runs |
|---|---|
| `/ping` | `reply` |
| `/ping server` | the `server` subcommand |
| `/ping Steve` | `player-reply`, with `%target%` set to Steve |
| `/ping asdfgh` | `reply` — an unknown word is ignored, as if it was never typed |

An offline or vanished player behaves like an unknown word, so `/ping` for a player who is not there
answers exactly like plain `/ping`. A subcommand wins over a player with the same name.

A player is only matched when the command has a `player-reply`. Matching ignores case.

### Vanished players

By default a vanished player counts as not online — for the lookup and for tab completion — unless
the sender has `pv.see`. It is the same rule as [`/ping`](/plugins/oberonutils/features/ping/): if the
vanish state cannot be read, the player stays hidden.

```yaml
settings:
  hide-vanished: true
  see-vanished-permission: pv.see
```

## Placeholders

| Placeholder | Gives |
|---|---|
| `%player%` | Who ran the command |
| `%target%` | The player named in `/name <player>` |
| `%command%` | The command as typed, name or alias |
| `%args%` | Everything typed after the command |
| `%arg1%`, `%arg2%`… | The first, second… word typed after the command |

With **PlaceholderAPI** installed, any placeholder works for the player running the command:
`%player_ping%`, `%server_online%`, `%vault_eco_balance_formatted%`.

Put `target_` in front to read the same placeholder for the **target**:
`%target_player_ping%`, `%target_vault_eco_balance_formatted%`. It is empty when there is no target.

Without PlaceholderAPI only the built-in ones work. A placeholder PlaceholderAPI cannot answer stays
visible as written, so a missing expansion is easy to spot.

From console there is no player, so player placeholders are empty there. Server-wide ones such as
`%server_online%` still work.

### Typed words are plain text

`%arg1%` and `%args%` show what a player typed with colour codes and MiniMessage tags removed, and a
typed `%player_ip%` is never expanded. Otherwise `/rules <click:run_command:...>` could build a
clickable message out of your own reply.

## Permissions

All optional. Blank means everyone.

| Key | Gates |
|---|---|
| `permission` | The whole command, including every subcommand and the player form |
| `permission-others` | `/name <player>` only. A real player without it gets the no-permission message; an unknown name still falls back to `reply` |
| `subcommands.<name>.permission` | One subcommand |

Tab completion offers only the subcommands the player may use, and the online players they are
allowed to see, and nothing at all for a command they may not use. No permission shows
`general.no-permission` from `messages.yml`.

Every node you use is registered op-only by default, so LuckPerms and similar can list and
autocomplete it. A command with no `permission:` stays open to everyone.

## Name clashes

If a name is already taken — by OberonUtils, EssentialsX or any other plugin — the custom command is
**skipped** and the console warns who owns it:

```
Custom command /rules skipped: the name already belongs to Essentials (/rules). Add 'override: true' to replace it.
```

Add `override: true` to take the name. Whatever it replaced is put back when you remove the command
and reload, so undoing an override needs no restart. Aliases follow the same rule.

Every command is also reachable as `/oberonutils:name`.

## Console

Custom commands work from console. Set `players-only: true` to refuse console, which then gets
`general.players-only` from `messages.yml`.

## Not included

Running other commands, offline players, cooldowns and menus. This module sends messages and sounds
only.

## Turning it off

```yaml
modules:
  commands: true
```

`false` registers nothing. Switching the module on or off needs a restart; editing `commands.yml`
only needs `/oberonutils reload`.
