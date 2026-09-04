---
title: "messages.yml"
description: "Every line of player-facing text. Nothing the plugin says is written in code."
---

Every line of player-facing text. Nothing the plugin says is written in code.

## Format

MiniMessage: `<gray>`, `<#C21807>`, `<bold>`, `<gradient:#C21807:#F11800>`. Legacy `&` codes and bare
hex also work, and can be mixed in one line.

`<prefix>` expands to the prefix at the top of the file. Placeholders work as either `%name%` or
`{name}`; the tokens each message understands are listed in a comment above it.

## Sections

| Section | Covers |
|---|---|
| top-level keys | The framework's own replies: no permission, invalid usage, reload results |
| `drop.*` | The event itself — inbound, landed, unlocked, first open, emptied, expired, locked, protected |
| `title.*` | On-screen titles and subtitles for the three announcements |
| `action-bar.*` | Action-bar lines, when `notifications.action-bar` is on |
| `bossbar.locked` | The countdown bar's text |
| `hologram.locked` / `hologram.open` | The floating text above the crate, as a list of lines |
| `command.*` | Every command reply |

## The `-located` variants

Three messages have a pair:

```yaml
drop:
  inbound: "..."
  inbound-located: "... at {x}, {z} in {world} ..."
```

The `-located` version is used when `notifications.reveal-coordinates` is on. Turning coordinates off
switches to the plain one — so a server running a hidden hunt does not need to rewrite the text, and
cannot accidentally leak the position through a message it forgot to edit.

## Common tokens

| Token | Where |
|---|---|
| `{tier}` | Everywhere — the tier's `display-name`, already coloured |
| `{time}` | Formatted countdown, e.g. `2m 30s` |
| `{seconds}` | The same as a bare number |
| `{world}`, `{x}`, `{y}`, `{z}` | The crate's position |
| `{player}` | The first player to open the crate |

## Hologram lines

`hologram.locked` and `hologram.open` are **lists**. Each entry is one line of the floating label, and
the plugin swaps between the two lists when the crate unlocks.

Keep them short. A hologram is read at a glance from thirty blocks away, usually while running.

## Silencing something

Set a message to an empty string to hide it. An empty title and subtitle together skip the title
entirely rather than flashing a blank one.
