---
title: "Writing dialogs"
description: "Every .yml in plugins/DDialogs/dialogs/ is one dialog. Its id is the filename without the extension, and that id is what [dialog], /ddialogs open and the…"
---

Every `.yml` in `plugins/DDialogs/dialogs/` is one dialog. Its **id** is the filename without the extension, and that id is what `[dialog]`, `/ddialogs open` and the API use.

`/ddialogs reload` re-reads the folder. A file with an error is skipped with a message naming the file, the key and what was expected — the rest keep working.

## The smallest dialog

```yaml
type: notice
title: "<gold>Hello"
ok-button:
  label: "<green>Close"
```

## Types and their buttons

| `type` | Buttons it takes |
|---|---|
| `notice` | `ok-button` — exactly one |
| `confirmation` | `confirm-button` + `deny-button` — both required |
| `multi_action` | `buttons:` — a grid, at least one |
| `server_links` | `exit-button` — the server's own links fill the screen |

Any type may also declare `exit-button`, which becomes the footer rather than another grid cell.

Buttons have **names, not positions**, so `deny-button` may be written before `confirm-button` and still be the deny button. A plain `buttons:` list is accepted for `notice` and `confirmation` too, taken in order.

## Top level

```yaml
type: multi_action              # default multi_action
title: "<gradient:#5BE585:#2C99F8>Menu"   # required; may be "" to hide the header bar
external-title: "Main Menu"     # name used when this dialog is linked from elsewhere
columns: 2                      # grid width, default 2
can-close-with-escape: true     # default true
after-action: close             # close | none | wait_for_response
pause: false                    # pauses a single-player game; ignored with after-action: none

open:
  command: menu                 # registers /menu. May also be written at the root as `command:`
  permission: phalanx.menu      # who may open it
  on-join: true                 # show it when a player joins
  first-join-only: true         # ...only their first time
```

> `after-action: wait_for_response` plus `can-close-with-escape: false` makes a screen the player **must** answer. It is a modal on someone else's game — use it for a rules gate, not for a shop.

Command aliases are registered once, at startup. Adding a `command:` to a file and reloading will not register it until the server restarts; everything *inside* the dialog reloads normally. Two dialogs asking for the same command is reported at startup, naming which one kept it.

## Body

```yaml
body:
  - type: text
    text: "<gray>Some words.\nA second line."
    width: 320                  # 1-1024, default 200

  - type: item
    material: diamond
    amount: 1
    description: "<aqua>Shiny"

  - type: text                  # no text at all = a blank spacer line
```

## Inputs

Every input has a `key`, which is how you refer to its value later. **Keys must be letters, digits or underscore** — Minecraft rejects anything else outright, so `player-name` is refused when the file loads rather than when someone opens it.

```yaml
inputs:
  - key: nick
    type: text
    label: "Nickname"
    max-length: 16              # default 128; the vanilla default of 32 is often too short
    initial: "Steve"
    width: 200

  - key: notes
    type: text
    label: "Notes"
    max-length: 500
    height: 90                  # any height makes it a multiline box

  - key: gift
    type: boolean
    label: "Send as a gift"
    initial: true

  - key: reason
    type: single_option
    label: "Reason"
    options:
      - { id: spam, display: "<red>Spam", initial: true }
      - { id: rude, display: "<yellow>Rudeness" }

  - key: amount
    type: number_range
    label: "Amount"
    start: 1
    end: 64
    step: 1
    initial: 8
```

## Buttons and actions

```yaml
buttons:
  - label: "<green>Buy"
    tooltip: "<gray>Shown on hover"
    width: 150                  # 1-1024, default 150
    permission: shop.buy        # without it, deny-actions run instead
    actions:
      - "[message] <green>Done!"
      - "[sound] entity.player.levelup"
    deny-actions:
      - "[message] <red>You cannot do that."

  - label: "<aqua>Website"
    url: "https://example.com"  # a real link button; the client opens it directly
```

### Action tags

| Tag | Does |
|---|---|
| `[message] <text>` | sends the player a message (the default if no tag is given) |
| `[broadcast] <text>` | sends it to everyone |
| `[actionbar] <text>` | above the hotbar |
| `[title] <title>;<subtitle>` | on screen |
| `[sound] <key> [volume] [pitch]` | e.g. `[sound] entity.player.levelup` |
| `[player] <command>` | runs it **as the player**, with their permissions |
| `[console] <command>` | runs it **as the console** |
| `[dialog] <id>` | opens another dialog |
| `[back]` | returns to the previous dialog |
| `[close]` | closes the screen |
| `[permission] <node>` | stops everything after it unless the player has the node |
| `[delay] <ticks>` | waits, then continues |
| `[filter] <text>` | stores a search term for the next dynamic list |

Actions run in order and a failed `[permission]` guard stops the rest. A mistyped tag is refused when the file loads, listing the valid ones — it used to be a button that silently did nothing.

### Using what the player typed

`$(key)` in any action is replaced with that input's value.

```yaml
inputs:
  - { key: amount, type: number_range, label: "Amount", start: 1, end: 64, initial: 1 }
  - { key: who,    type: text,         label: "To" }
buttons:
  - label: "Send"
    actions: ["[player] pay $(who) $(amount)"]
```

Sliders read as whole numbers where they are whole (`5`, not `5.0`), and checkboxes as `true`/`false`.

> **These values come from the player.** Newlines, semicolons, quotes and backslashes are stripped and the value is length-capped before substitution, so a text field cannot end one command and begin another. That is a backstop, not permission to be careless: interpolating a player's text into a `[console]` command hands them influence over something running with full server authority. Prefer `[player]`, and where you must use `[console]`, make the value the *subject* of the command rather than part of its syntax.

## Icons

| Tag | Shows |
|---|---|
| `<item:diamond>` | an item's icon |
| `<sprite:block/dirt>` | any texture by path |
| `<sprite:minecraft:gui:widget/button>` | ...naming the atlas explicitly |
| `<head:Steve>` | a player's face |

A **block** has no item texture — its inventory icon is a rendered model, not a stitched sprite — so `<item:gold_block>` shows the missing-texture square and `<sprite:block/gold_block>` is the right form.

These need a 1.21.9+ client. On anything older the tag renders as nothing rather than breaking the dialog.

## Placeholders

`%player_name%`, `%player_displayname%`, `%player_uuid%`, `%player_world%`, `%player_x/y/z%`, `%player_health%`, `%player_food%`, `%player_level%`, `%player_gamemode%`, `%player_ping%`, `%server_online%`, `%server_max_players%`, `%server_version%` work with nothing installed.

Anything else is passed to **PlaceholderAPI** if it is present. Without it, `%vault_eco_balance%` and friends render literally.

Expansion happens per open, against the player looking at the screen.

## Dynamic lists

A button per row of live data — what a static file cannot know when it is written.

```yaml
dynamic-list:
  source: online_players
  template:
    - label: "<head:$(player_name)> $(player_name)"
      actions: ["[player] tpa $(player_name)"]
```

| `source` | Rows | Fields |
|---|---|---|
| `online_players` | everyone online except you | `player_name`, `player_uuid`, `player_world` |
| `online_players_all` | including you | same |
| `worlds` | loaded worlds | `world_name`, `world_environment`, `world_players` |

Rows are capped at 60, and players you cannot see are skipped.

Only tokens the row has are filled in at open time. Anything else — `$(mode)` naming an input on the same screen — survives to be substituted when the button is pressed, which is what lets one template mix both.

The footer is appended after the rows, so it does not move as rows come and go.

### Searching

A dialog cannot filter as the player types: a field's contents only reach the server when a button is pressed. So a search box is *store the term, reopen the screen*:

```yaml
inputs:
  - { key: name, type: text, label: "Search" }
footer-buttons:
  - label: "Search"
    actions:
      - "[filter] $(name)"
      - "[dialog] this-dialog-id"
```

## What a dialog cannot do

Worth knowing before designing a screen around it:

- **It cannot read current state.** The server sends a screen and the client sends back what the player left it at. A checkbox for "PvP enabled" starts at whatever the file says, not at the real value, and saving writes all of them. Where that matters, use buttons that run a toggle command and let the owning plugin report the truth.
- **It cannot update while open.** No live totals, no filtering as you type. Every change is a reopen.
- **Older clients cannot render it at all.** Plugins calling core's `DialogService` fall back to chat automatically; dialogs defined here simply do not open for those players.
