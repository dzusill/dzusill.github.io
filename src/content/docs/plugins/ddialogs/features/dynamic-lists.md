---
title: "Dynamic lists"
description: "One button per online player, world, or anything a plugin registers — built fresh every time the screen opens."
---

A static file cannot know who is online. `dynamic-list` builds buttons from live data at the moment the dialog opens.

```yaml
type: multi_action
title: "<gold><b>Who is online</b></gold>"
columns: 3

dynamic-list:
  source: online_players
  template:
    - label: "<head:$(player_name)> <white>$(player_name)"
      tooltip: "<gray>In $(player_world)"
      width: 150
      actions:
        - "[player] tpa $(player_name)"
        - "[close]"

exit-button:
  label: "<gray>Close"
  actions: ["[close]"]
```

One button per row, all from a single template. `$(player_name)` is a **field** of the row.

## The sources

| `source` | Rows | Fields available |
|---|---|---|
| `online_players` | everyone online **except you** | `player_name`, `player_uuid`, `player_world` |
| `online_players_all` | including you | the same |
| `worlds` | loaded worlds | `world_name`, `world_environment`, `world_players` |

Rows are capped at 60, and players you cannot see are skipped.

Another plugin can add its own source with `DDialogsApi.registerSource("name", …)`; once it has, you use it here by name like any built-in. A faction's warps, a player's homes, a support category's questions — see [calling other plugins](/plugins/ddialogs/features/external-plugins).

A registered source can also be handed the [parameters](/plugins/ddialogs/features/parameters) the screen was opened with, which is how one file lists *the tickets of the category just pressed* rather than all of them.

An unknown source name logs a warning at open time and renders that section empty, rather than failing quietly.

## How the template fills in

Only the tokens a row actually has are replaced. Anything else survives to be substituted when the button is pressed — which is what lets one template mix row data with what the player selected on the same screen:

```yaml
      actions:
        - "[player] pay $(player_name) $(amount)"
```

`$(player_name)` comes from the row; `$(amount)` comes from a text input elsewhere on the dialog.

## Where the generated buttons go

Static `buttons` first, then the generated rows, then the footer. The footer stays last so it does not move as rows come and go.

## Searching

A dialog **cannot filter while the player types** — a field's contents only reach the server when a button is pressed. So searching is always two steps: store the term, reopen the screen.

```yaml
inputs:
  - key: search
    type: text
    label: "Search"
    max-length: 16

dynamic-list:
  source: online_players
  template:
    - label: "<head:$(player_name)> <white>$(player_name)"
      width: 150
      actions: ["[player] msg $(player_name) hi", "[close]"]

footer-buttons:
  - label: "<item:spyglass> <white>Search"
    actions:
      - "[filter] $(search)"
      - "[dialog] my-player-list"     # this dialog's own id

  - label: "<item:barrier> <white>Show all"
    actions:
      - "[filter] "                   # trailing space clears it
      - "[dialog] my-player-list"
```

`[filter]` stores the term for that player; the reopened screen comes back narrowed.

**What it matches:** any field of a row, case-insensitively, as a substring. A search for `ste` finds Steve by name *and* anyone in a world called `stone_valley`. Usually that is what a player means by search; if you need name-only matching, filter inside a source you register yourself.

## Surviving an empty result

```yaml
footer-buttons:
  - label: "<item:spyglass> <white>Search"
    ...
```

**Put your controls on `footer-buttons`, not in the list.** Footer buttons always render; dynamic rows may not. If the list carried the only buttons, a search with no matches would leave a blank screen with no way out.

Put a count in the title while you are at it — `Friends  0 friends / 0 following` answers "is this loading or genuinely empty?" before the player has to wonder.

## Lists versus leaderboards

`dynamic-list` writes **buttons**. `dynamic-body` writes **text lines**.

A top-10 rendered as ten buttons looks wrong and invites clicks that do nothing, which is exactly why they are separate keys. Ranks are for reading — use [Leaderboards](/plugins/ddialogs/features/leaderboards).

You can have both on one screen, each with its own `source`: a list of players to click, and a table of something else below it.

## No pagination

There is none. Sixty rows is the cap, and a screen that needs more should narrow with `[filter]` instead of splitting into pages.

For a *fixed* set of slots — homes, plots — "page two" is a separate dialog file with its own Back button. Three pages means three files. See [the slots pattern](/plugins/ddialogs/menu-patterns).
