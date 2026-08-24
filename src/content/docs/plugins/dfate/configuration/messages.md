---
title: "messages.yml"
description: "Every string a player sees, including the dialog screen. All text is MiniMessage. Named placeholders use %name%. A missing key renders as the key itself, so…"
---

Every string a player sees, including the dialog screen. All text is [MiniMessage](https://docs.advntr.dev/minimessage/format.html). Named placeholders use `%name%`. A missing key renders as the key itself, so a typo is visible in game rather than silently swallowed.

```yaml
prefix: "<dark_gray>[<red>Fate</red>]</dark_gray> "
```

`<prefix>` expands to that value in any chat message.

## Two kinds of key

| Kind | Rules |
|---|---|
| **Chat messages** | Use `<prefix>`. May be a list for multi-line output. |
| **Dialog text** (`choice-*`, `info-dialog-*`) | **No `<prefix>`** — a dialog has no chat line to prefix. Use `<newline>` for line breaks. Must be a single string, never a list. |

`ban-kick` is the third case: it is rendered into a kick screen, which takes one block of text. Single string, `<newline>` for breaks.

## The choice screen

| Key | Placeholders | Shown |
|---|---|---|
| `choice-title` | — | Screen title |
| `choice-body` | `%player%` `%hardcore%` `%normal%` `%duration%` | Screen body |
| `choice-hardcore-label` | `%hardcore%` | Left button |
| `choice-hardcore-tooltip` | `%hardcore%` `%duration%` | Its hover text |
| `choice-normal-label` | `%normal%` | Right button |
| `choice-normal-tooltip` | `%hardcore%` `%normal%` | Its hover text |
| `choice-confirm-title` | — | "Are you certain?" title |
| `choice-confirm-body` | `%hardcore%` `%duration%` | Its body |
| `choice-confirm-yes` | — | Accept button |
| `choice-confirm-no` | — | Back button |

`%hardcore%` and `%normal%` come from `Display.Mode-Names` in `config.yml`, so renaming the modes there updates the screen too.

## Choice outcome

| Key | Placeholders |
|---|---|
| `choice-chosen-hardcore` | `%player%` `%mode%` `%duration%` |
| `choice-chosen-normal` | `%player%` `%mode%` |
| `choice-broadcast-hardcore` | `%player%` `%mode%` |
| `choice-broadcast-normal` | `%player%` `%mode%` |
| `choice-locked` | `%player%` |

## Death

| Key | Placeholders |
|---|---|
| `death-broadcast` | `%player%` `%uuid%` `%world%` `%cause%` `%duration%` `%deaths%` `%reason%` |
| `death-title` | same set |
| `death-subtitle` | same set |
| `ban-kick` | `%player%` `%duration%` `%reason%` |

## Status

| Key | Placeholders | Where |
|---|---|---|
| `info-dialog-title` | — | `/fate` screen |
| `info-dialog-body` | `%player%` `%mode%` `%deaths%` `%chosen%` | `/fate` screen |
| `info-dialog-button` | — | Its close button |
| `info-header` | `%player%` | `/fate info` |
| `info-mode` | `%mode%` | `/fate info` |
| `info-deaths` | `%deaths%` | `/fate info` |
| `info-chosen` | `%chosen%` | `/fate info` — how long ago |
| `info-unchosen` | `%player%` | `/fate info` on a player who never chose |
| `info-set-by-admin` | `%player%` `%mode%` | `/fate info`, only when an admin set the mode |

## Opting in

`opt-in-disabled` · `opt-in-only-hardcore` · `opt-in-not-chosen` · `opt-in-already-hardcore` · `opt-in-cancelled`

All take `%player%` `%mode%` `%duration%`.

## Admin

| Key | Placeholders |
|---|---|
| `admin-set` | `%player%` `%mode%` |
| `admin-set-target` | `%mode%` — sent to the player whose mode changed |
| `admin-set-unchanged` | `%player%` `%mode%` |
| `admin-unbanned` | `%player%` |
| `admin-usage` | list — shown by `/fate` from console |

## Core keys

`no-permission` · `players-only` · `console-only` · `unknown-command` · `invalid-usage` · `invalid-number` · `player-not-found` · `reload-success` · `reload-failed` · `command-error`

These come from DzusillCore's command layer. Keep them present even if you never look at them.

## Example: renaming the modes

```yaml
# config.yml
Display:
  Mode-Names:
    HARDCORE: Ironman
    NORMAL: Adventurer
```

Nothing in `messages.yml` needs touching — `%mode%`, `%hardcore%` and `%normal%` all read from there, and `%dfate_mode%` follows too.
