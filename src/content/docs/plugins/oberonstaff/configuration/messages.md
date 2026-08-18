---
title: "messages.yml"
description: "Every string a player sees, and the one pair you should keep identical."
---

`plugins/OberonStaff/messages.yml`. MiniMessage format. Reload with `/oberonstaff reload`.

`<prefix>` anywhere is replaced by the `prefix` key at the top.

> The staff chat line itself is **not** here — it is `Staff-Chat.Format` in `config.yml`, because it is built from the rank formats rather than being a plain string.

## Values are `%name%`, not `<name>`

The single rule worth reading before editing this file:

| Syntax | What it is |
|---|---|
| `%id%`, `%player%`, `%body%` | **a value** the plugin fills in |
| `<red>`, `<bold>`, `<click:…>` | **MiniMessage** — colour and formatting |
| `<prefix>` | the one exception: resolved by the plugin, but written as a tag |

Angle brackets go to MiniMessage. Write a value as `<id>` and MiniMessage looks for a tag called `id`, finds none, and prints it at the player verbatim:

```yaml
# Wrong — the player sees "Ticket #<id> created."
created: "<prefix><green>Ticket <white>#<id><green> created."

# Right
created: "<prefix><green>Ticket <white>#%id%<green> created."
```

Nothing throws when you get this wrong. There is no console warning and no fallback — the raw text simply appears in chat, which is why it is worth knowing before you edit rather than after somebody reports it.

The same applies to argument hints you write yourself. `<player>` in a usage line reads as a broken tag; use `[player]`. `<#>` and `<1-5>` are fine — they start with a symbol or a digit, so MiniMessage never mistakes them for a tag name.

:::note[Both halves are tested]
A test walks every key in the shipped file through Bukkit's own YAML parser and fails on any value written in angle brackets, and a second one renders each action's message with the placeholders its code actually passes and fails on any left unfilled. Those two catch opposite halves of the same mistake: a message naming a value nobody supplies, and a value supplied to a message that spells it differently.
:::

## Teleports

`%player%` — the target. `%target%` — the destination player, for the two-argument form.

```yaml
teleport:
  not-online: "<prefix><red>This player is not online."
  denied: "<prefix><red>Teleport denied."
  self: "<prefix><red>You can't teleport someone to themselves."
  to: "<prefix><gray>You teleported to <#C21807>%player%</#C21807>."
  other: "<prefix><gray>You teleported <#C21807>%player%</#C21807> to <#C21807>%target%</#C21807>."
  here: "<prefix><gray>You teleported <#C21807>%player%</#C21807> to you."
```

### Keep these two identical

```yaml
teleport:
  not-online: "<prefix><red>This player is not online."
# …
player-not-found: "<prefix><red>This player is not online."
```

`teleport.not-online` is sent when a player is vanished above your level. `player-not-found` is DzusillCore's own message when a name doesn't resolve at all.

**If they differ, the difference tells the sender that somebody invisible is online** — which defeats the point of vanish. Restyle both, together, and keep the wording the same.

## `/back`

```yaml
back:
  ok: "<prefix><gray>Returned to your previous location."
  none: "<prefix><red>You have nowhere to go back to."
```

## Toggles

```yaml
tptoggle:
  blocked: "…<bold>Teleport Access</bold>… <bold>Disabled</bold>…"
  allowed: "…<bold>Teleport Access</bold>… <bold>Enabled</bold>…"

staffchat:
  enabled: "…<bold>Staff Chat</bold>… <bold>Enabled</bold>…"
  disabled: "…<bold>Staff Chat</bold>… <bold>Disabled</bold>…"
```

`tptoggle.blocked` is shown when incoming teleports are now **refused**.

## Command output

```yaml
command:
  usage: [ … ]                    # a list — each entry is one line
  reloaded: "…%ranks%…"
  status:                         # also a list
    - "…%vanish% %vanish_enabled% %levels%…"
    - "…%storage% %log%…"
    - "…%staffchat% %tptoggle%…"
  log:
    header: "…%count%…"
    line: "…%when% %actor% %action% %target% %world% %x% %y% %z%"
    empty: "…"
    unavailable: "…"
```

Any message key can be a list, and renders as several lines.

## Gradients

The shipped messages use `<gradient:#a:#b>` rather than a hex code per letter. Same look, far easier to restyle:

```yaml
  blocked: "<gradient:#C21807:#F11800><bold>Teleport Access</bold></gradient> <dark_gray>»</dark_gray> <gradient:#FF5555:#E64D4D><bold>Disabled</bold></gradient>"
```

## Usage messages

Each command explains itself rather than falling back to `/oberonstaff`'s own list:

| Key | Shown when |
|---|---|
| `command.usage` | `/oberonstaff` with nothing after it |
| `ticket.usage` | `/ticket` followed by a word it does not know |
| `tickets.usage` | `/tickets` likewise |
| `report.usage` | `/report` with no player named |
| `ticket.rate-usage` | any bad `/ticket rate` — missing arguments, a rating that is not a number, or one outside 1–5 |
| `invalid-usage` | a real subcommand with the wrong arguments. `%usage%` is filled with that subcommand's syntax |

A single subcommand getting its arguments wrong reuses the framework's `invalid-usage` rather than having a message of its own, so `/tickets note 4` answers **`Usage: /tickets note <#> [text]`**. The syntax is built from the command's configured name, so renaming `/tickets` in `config.yml` renames it in the hint too.

## The conversation

`thread.action.*` is what an action reads as in a ticket's history, and `thread.view.*` is how a line is drawn when somebody reads it. See [Conversation](/plugins/oberonstaff/features/conversation/) for the whole block.

```yaml
thread:
  action:
    claimed: "<#5DADE2>%staff%<gray> claimed this ticket"
    rated: "<gold>%player% rated this <white>%stars%"
  view:
    player: "<dark_gray>[<gray>%time%<dark_gray>] %prefix%<white>%author%<dark_gray>: <gray>%body%"
```

:::caution[Action wording is written, not read]
A `thread.action.*` line is rendered **when the action happens** and stored as finished text. Editing one changes new lines and leaves old ones as they were — on purpose: an audit line that silently rewrites itself is worse than one that is dated.

`thread.view.*` is the opposite — applied every time the thread is read, so those take effect on the next `/ticket thread`.
:::

## DzusillCore built-ins

The bottom of the file holds the framework's own messages: `no-permission`, `players-only`, `invalid-usage` and friends. Restyle them freely; don't rename the keys — and mind `player-not-found`, noted above.

### `invalid-usage` names the command

`%usage%` now includes the command itself, so the shipped message reads **`Usage: /tp <player>`** rather than
`Usage: <player>`. Nothing to change: the same key, a fuller value.

`%cmd%` is available separately if you want it somewhere else in the sentence — it is the command as the sender typed
it, subcommand path included (`/oberonstaff status`).

### `player-ambiguous`

```yaml
player-ambiguous: "<prefix><red>More than one player matches '%name%': <white>%players%</white>"
```

Sent when a name fragment matches two or more players online. Both are named rather than one being picked — guessing
is how somebody ends up teleported to the wrong person.

This key was missing from earlier builds, so the raw key was what players saw. It is added to your file automatically
on the next start.

## If a message shows as its key

Seeing `teleport.denied` in-game means the key is missing. That is deliberate — a missing message is visible rather than silent. Add it back, or delete the file and restart to regenerate it.
