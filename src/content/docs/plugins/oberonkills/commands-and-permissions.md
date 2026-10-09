---
title: "Commands & Permissions"
description: "One admin command with three subcommands. Death messages need no permission — only seeing who an invisible killer was does."
---

## Commands

`/oberonkills`, aliases `/okills` and `/ok`. Everything needs `oberonkills.admin`.

| Command | Description |
|---|---|
| `/oberonkills` | Show the usage list. |
| `/oberonkills reload` | Reload `config.yml` and `messages.yml`. |
| `/oberonkills status` | What is loaded, and how item names are rendered. |
| `/oberonkills preview <category> <key> [hidden]` | Render a death message with stand-in names. `hidden` shows a PvP line as it goes out for an invisible killer. |

### `preview` is the one to remember

```
/oberonkills preview pvp mace-smash
/oberonkills preview mob creeper
/oberonkills preview environment lava
```

`category` is `pvp`, `mob` or `environment` and tab-completes. `key` is whatever you named in the config.

The alternative to checking your wording is asking somebody to die, repeatedly, once per weapon.

If it reports nothing configured, the key has neither its own entry nor a `default` in that set — which is also worth
knowing, because that death would fall through to the vanilla message.

```
/oberonkills preview pvp sword hidden
```

Shows the line twice: what everybody sees for an [invisible killer](/plugins/oberonkills/features/invisible-killer/),
then what staff see. No potion needed.

### `status`

```
Enabled: yes, 24 message key(s) loaded
» Item names: TRANSLATE, hover on
» Unconfigured deaths: vanilla message kept
```

The key count is the useful number: far lower than expected means entries were skipped.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `oberonkills.admin` | op | `/oberonkills` and all subcommands. |
| `oberonkills.seehidden` | op | See who an [invisible killer](/plugins/oberonkills/features/invisible-killer/) was, beside the stand-in. Configurable as `Invisible-Killer.Staff-Permission`. |
| `oberonkills.*` | op | Both of the above. |

**Death messages need no permission.** Everybody sees them, the same way everybody sees the vanilla ones. There is
nothing to grant to players and nothing to withhold.

## Suggested setup

```
/lp group admin permission set oberonkills.admin true
/lp group mod permission set oberonkills.seehidden true
```

That is the whole configuration.
