---
title: "messages.yml and sounds.yml"
description: "Every text a player reads. MiniMessage, legacy & codes and bare hex all work; <prefix> expands to"
---

## messages.yml

Every text a player reads. MiniMessage, legacy `&` codes and bare hex all work; `<prefix>` expands to
`prefix`. Placeholders are `{name}` or `%name%` — the tokens each message understands are listed above
it. An empty text (`""`) sends nothing.

| Section | What |
|---|---|
| framework keys | `no-permission`, `invalid-usage`, `reload-success` … |
| `notice.<event>` | `chat`, `action-bar`, `title`, `subtitle` for each notification in config.yml |
| `kill.rejected.<reason>` | Why a kill did not count, per rule |
| `broadcast.<kind>` | `milestone`, `shutdown`, `daily-complete`, `top` |
| `boards.<board>` | Board names for `/ffa top` and the results broadcast |
| `periods.<period>` | Period names |
| `claim`, `daily`, `pass`, `stats`, `top`, `help`, `admin` | Command and menu replies |

Where a message shows (chat, action bar, both, nowhere) and its sound are set in config.yml's
`Presentation`; a title for any key in config.yml's `titles`.

## sounds.yml

Every sound the plugin plays is an alias: `kill`, `rejected`, `milestone`, `shutdown`, `reward`,
`storage`, `streak-lost`, `broadcast`, `error`, plus any you add for gui.yml. Each has `sound` (any
resource key, resource-pack sounds included), `volume`, `pitch`. A blank `sound` silences the alias;
`enabled: false` silences the plugin.
