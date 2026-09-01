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
| `choice-welcome` | `%player%` `%command%` `%hardcore%` `%lifesteal%` `%normal%` `%duration%` `%starting_hearts%` | The chat greeting. **A list** — one chat line per entry, empty string for a blank line. Does not adapt to disabled modes. |
| `choice-title` | — | Screen title |
| `choice-body` | `%player%` `%hardcore%` `%normal%` `%duration%` | Screen body |
| `choice-hardcore-label` | `%hardcore%` | Hardcore button |
| `choice-hardcore-tooltip` | `%hardcore%` `%duration%` | Its hover text |
| `choice-lifesteal-label` | `%lifesteal%` | Lifesteal button |
| `choice-lifesteal-tooltip` | `%lifesteal%` `%starting_hearts%` `%duration%` | Its hover text |
| `choice-normal-label` | `%normal%` | Normal button |
| `choice-normal-tooltip` | `%hardcore%` `%lifesteal%` `%normal%` | Its hover text |
| `choice-confirm-title` | — | "Are you certain?" title |
| `choice-confirm-body` | `%hardcore%` `%duration%` | Its body, for hardcore |
| `choice-confirm-lifesteal-body` | `%lifesteal%` `%starting_hearts%` `%duration%` | Its body, for lifesteal |
| `choice-confirm-yes` | — | Accept button |
| `choice-confirm-no` | — | Back button |

`%hardcore%`, `%lifesteal%` and `%normal%` come from `Display.Mode-Names` in `config.yml`, so renaming the modes there updates the screen too.

## The chat screen

Only used by `Choice.Screen: CHAT`, and by `AUTO` when a dialog cannot be drawn. All take the same placeholder set as `choice-welcome`, plus `%command%`.

| Key | | |
|---|---|---|
| `chat-choice-header` | **list** | The block above the buttons |
| `chat-choice-hardcore` | string | One clickable button line |
| `chat-choice-lifesteal` | string | " |
| `chat-choice-normal` | string | " |
| `chat-choice-footer` | **list** | The block below them |
| `chat-confirm` | **list** | "Are you certain?", for hardcore |
| `chat-confirm-lifesteal` | **list** | The same, for lifesteal. Adds `%mode%`. |
| `chat-confirm-buttons` | **list** | The clickable yes/no |
| `chat-confirm-expired` | string | `/fate confirm` with nothing waiting |

Each mode's button is a separate key on purpose: **only the modes actually on offer are sent.** With lifesteal switched off, `chat-choice-lifesteal` is never printed. Moving the buttons into the header block would undo that and print a button that refuses to work.

The buttons are `run_command` clicks on `/%command% choose <mode>`. Keep the command in the click event if you rewrite them — the text around it is yours, but that is what makes the button a button.

## Choice outcome

| Key | Placeholders |
|---|---|
| `choice-chosen-hardcore` | `%player%` `%mode%` `%duration%` |
| `choice-chosen-lifesteal` | `%player%` `%mode%` `%hearts%` |
| `choice-chosen-normal` | `%player%` `%mode%` |
| `choice-broadcast-hardcore` | `%player%` `%mode%` |
| `choice-broadcast-lifesteal` | `%player%` `%mode%` `%hearts%` |
| `choice-broadcast-normal` | `%player%` `%mode%` |
| `choice-locked` | `%player%` |
| `choice-closed` | `%player%` `%command%` — the command that reopens the screen |
| `choice-reminder` | `%player%` `%command%` `%attempt%` `%max%` — chat |
| `choice-reminder-actionbar` | same set — one short line, no room for a sentence |
| `choice-reminder-title` | same set — the title line |
| `choice-reminder-subtitle` | same set — carries the command, since a title has no room for it |

## Death

| Key | Placeholders |
|---|---|
| `death-broadcast` | `%player%` `%uuid%` `%world%` `%cause%` `%duration%` `%deaths%` `%reason%` |
| `death-title` | same set |
| `death-subtitle` | same set |
| `ban-kick` | `%player%` `%duration%` `%reason%` |

## Lifesteal

| Key | Placeholders |
|---|---|
| `lifesteal-lost` | `%player%` `%lost%` `%hearts%` `%max_hearts%` `%cause%` |
| `lifesteal-broadcast-lost` | same set — off by default, see `Broadcast-Loss` |
| `lifesteal-eliminated` | same set, sent when the last heart goes |
| `steal-gained` | `%player%` `%victim%` `%gained%` `%hearts%` `%max_hearts%` |
| `steal-broadcast` | same set — off by default, see `Steal.Broadcast` |
| `steal-at-maximum` | `%max_hearts%` |
| `steal-pair-cooldown` | `%victim%` `%time%` |
| `steal-daily-cap` | `%cap%` |
| `steal-same-ip` | `%victim%` |

## Status

| Key | Placeholders | Where |
|---|---|---|
| `info-dialog-title` | — | `/fate` screen |
| `info-dialog-body` | `%player%` `%mode%` `%deaths%` `%chosen%` | `/fate` screen |
| `info-dialog-button` | — | Its close button |
| `info-header` | `%player%` | `/fate info` |
| `info-mode` | `%mode%` | `/fate info` |
| `info-hearts` | `%hearts%` `%max_hearts%` | `/fate info`, lifesteal players only |
| `info-deaths` | `%deaths%` | `/fate info` |
| `info-chosen` | `%chosen%` | `/fate info` — how long ago |
| `info-unchosen` | `%player%` | `/fate info` on a player who never chose |
| `info-set-by-admin` | `%player%` `%mode%` | `/fate info`, only when an admin set the mode |

## Opting in

`opt-in-disabled` · `opt-in-unavailable` · `opt-in-only-hardcore` · `opt-in-not-chosen` · `opt-in-already-hardcore` · `opt-in-cancelled`

All take `%player%` `%mode%` `%duration%`.

## Admin

| Key | Placeholders |
|---|---|
| `admin-set` | `%player%` `%mode%` |
| `admin-set-target` | `%mode%` — sent to the player whose mode changed |
| `admin-set-unchanged` | `%player%` `%mode%` |
| `admin-unbanned` | `%player%` |
| `admin-reset` | `%player%` — confirmation to the admin |
| `admin-reset-target` | — sent to the player whose fate was erased |
| `admin-reset-unchosen` | `%player%` — there was nothing to reset |
| `admin-usage` | list — shown by `/fate` from console |

## Core keys

`no-permission` · `players-only` · `console-only` · `unknown-command` · `invalid-usage` · `invalid-number` · `player-not-found` · `player-ambiguous` · `reload-success` · `reload-failed` · `command-error`

These come from DzusillCore's command layer. Keep them present even if you never look at them — a missing key renders as its own name, so `player-ambiguous` printed literally in chat means it was deleted rather than translated.

**`%usage%` already contains the whole command, slash and all** — `/fate set <player> <mode>`. Writing `/%label% %usage%` prints the command twice and leaves `%label%` unresolved, because there is no such placeholder. `%cmd%` is available if you want the command on its own.

## Example: renaming the modes

```yaml
# config.yml
Display:
  Mode-Names:
    HARDCORE: Ironman
    NORMAL: Adventurer
```

Nothing in `messages.yml` needs touching — `%mode%`, `%hardcore%` and `%normal%` all read from there, and `%dfate_mode%` follows too.
