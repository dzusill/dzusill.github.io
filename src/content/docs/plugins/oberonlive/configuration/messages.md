---
title: "messages.yml"
description: "Every OberonLive command, toggle, validation, statistics, history and moderation reply is a reloadable MiniMessage value."
---

Every OberonLive reply is configurable in `messages.yml`. Values use [MiniMessage](https://docs.advntr.dev/minimessage/format.html) and may be a string or, where shipped as a list, multiple lines.

The live broadcast itself is in `config.yml` under `broadcast`, not in this file.

## Core command messages

The file overrides OberonCore's shared command keys so parser errors keep the same visual style:

```yaml
prefix: ""
not-ready: "<#FF5555>Plugin is not fully loaded. Try again later."
no-permission: "<#FF5555>You don't have permission to use this."
players-only: "<#FF5555>This command is only for players."
invalid-usage: "<#FF5555>Usage: %usage%"
invalid-number: "<#FF5555>'%input%' is not a valid number."
player-not-found: "<#FF5555>Player '%name%' was not found."
reload-success: "<#10B981>OberonLive reloaded."
reload-failed: "<#FF5555>Reload failed: %reason%"
command-error: "<#FF5555>An unexpected error occurred. Check the console."
```

An unknown MiniMessage-looking argument such as `<link>` must be escaped. The shipped YAML uses `\\<link>`, which reaches MiniMessage as `\<link>` and displays the brackets literally.

## Player announcement keys

| Key | Placeholders |
|---|---|
| `usage` | none |
| `toggle-on`, `toggle-off` | none |
| `invalid-url`, `invalid-domain`, `blocked-link` | none |
| `cooldown` | `%seconds%` |
| `duplicate-link` | `%seconds%` |
| `operation-pending`, `announcement-failed`, `announcement-sent` | none |

The two toggle messages retain the original red OberonLive gradient style and can be replaced independently.

## Admin help and stats

`help` is a list of command lines. `stats.*` uses:

| Key | Placeholders |
|---|---|
| `stats.header` | `%player%` |
| `stats.receiving` | `%receiving%` |
| `stats.count` | `%count%` |
| `stats.last` | `%platform%`, `%when%` |
| `stats.link` | `%link%` |
| `stats.never` | none |

The shipped last-link line contains a MiniMessage click and hover event.

## Paginated views

`history.*` and `block.*` each define `header`, `row`, `empty`, `footer`, enabled/disabled previous and next labels, plus `page-hint`. OberonCore's paged view supplies `%page%`, `%pages%`, `%total%`, `%prev%`, `%next%` and the configured row placeholders.

History rows additionally receive `%number%`, `%when%`, `%player%`, `%platform%` and `%link%`. Block rows receive `%kind%`, `%value%` and `%source%`.

Moderation result keys are:

- `block.added`, `block.removed`, `block.already`, `block.missing`, `block.static`
- `block.invalid-kind`, `block.invalid-value`, `block.failed`

The `values.*` section localizes short values inserted into larger messages: `yes`, `no`, `domain`, `url`, `config` and `database`. `history.scope-all` controls the global history label. These values may contain MiniMessage because the outer message parses after substitution.

## Presentation categories

`config.yml` maps plugin messages to OberonCore categories:

| Category | Typical keys |
|---|---|
| `TOGGLE` | `toggle-on`, `toggle-off` |
| `ERROR` | usage, permission/parser errors, validation, cooldown, pending and failed operations |
| `INFO` | successful announcement, reload and block changes |

Every single command response can use `CHAT`, `ACTION_BAR`, `BOTH` or `NONE` and an optional sound through its category or an exact `Presentation.Overrides.<key>` rule. For example:

```yaml
Presentation:
  Overrides:
    invalid-url:
      Channel: ACTION_BAR
      Sound:
        Enabled: true
        Name: "BLOCK_NOTE_BLOCK_BASS"
        Volume: 1.0
        Pitch: 0.8
```

Enum-style sound names and namespaced registry keys are accepted. Lists always remain chat output so their lines are not immediately overwritten in the action bar; a configured list sound still plays once.

`/olive reload` re-reads this file after the candidate `config.yml` has passed validation.
