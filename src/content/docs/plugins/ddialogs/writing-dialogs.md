---
title: "Writing dialogs"
description: "The complete YAML reference — every key, every action tag, every input option, in one place."
---

Every `.yml` in `plugins/dDialogs/dialogs/` is one dialog. Its **id** is the filename without the extension, and that id is what `[dialog]`, `/ddialogs open` and the API use.

`/ddialogs reload` re-reads the folder. A file with an error is skipped with a message naming the file, the key and what was expected — the rest keep working.

This page is the reference. For which shape to reach for, see [Menu patterns](/plugins/ddialogs/menu-patterns); for a guided start, [Make your first dialog](/plugins/ddialogs/tutorial).

## The smallest dialog

```yaml
type: notice
title: "<gold>Hello"
ok-button:
  label: "<green>Close"
```

## Types and their buttons

| `type` | Buttons | Where they go |
|---|---|---|
| `notice` | exactly 1 | `ok-button` |
| `confirmation` | exactly 2 | `confirm-button`, `deny-button` |
| `multi_action` | any | `buttons`, plus `exit-button` / `footer-buttons` |
| `server_links` | the server's own list | `exit-button` only |

Arity is enforced at load, not at render: vanilla rejects a wrong-sized dialog outright, and that failure would otherwise be invisible.

`multiAction` and `serverLinks` are accepted as spellings, so files written for other dialog plugins load unchanged.

## Top level

| Key | Default | Meaning |
|---|---|---|
| `type` | `multi_action` | see above |
| `title` | **required** | the heading. May be `""` to hide the header bar |
| `external-title` | — | short name used when referenced from outside, e.g. the pause screen |
| `columns` | 2 | grid width for `multi_action` |
| `can-close-with-escape` | `true` | whether Escape closes it |
| `pause` | `false` | pauses a singleplayer world |
| `after-action` | `close` | `close`, `none`, or `wait_for_response` |
| `body` | — | text and item elements |
| `inputs` | — | fields |
| `buttons` | — | the grid |
| `exit-button` | — | the centred footer |
| `footer-buttons` | — | list; the first becomes the exit button, the rest join the grid |
| `dynamic-list` | — | buttons from live data |
| `dynamic-body` | — | body lines from live data or ranked placeholders |
| `open` | — | how it may be opened |

## Body

```yaml
body:
  - type: text
    text: "<gray>Some words"
    width: 300
  - type: text
    text: ""                 # a deliberate blank line
  - type: item
    material: diamond_sword
    amount: 1
    description: "<gray>The reward"
    width: 32
```

| Key | Applies to | Meaning |
|---|---|---|
| `type` | | `text` (default) or `item` |
| `text` | text | the line. `content` is a synonym |
| `width` | both | pixels, default 200 |
| `material` | item | **required** for an item. `minecraft:` added if missing |
| `amount` | item | stack size, default 1 |
| `description` | item | caption beside it |

An entry with no `text` is a blank spacer. `\n` inside a double-quoted string breaks the line.

More: [Body & text](/plugins/ddialogs/features/body-and-text).

## Inputs

```yaml
inputs:
  - { key: nick,   type: text,          label: "Nick",  max-length: 16 }
  - { key: notes,  type: text,          label: "Notes", height: 80 }
  - { key: gift,   type: boolean,       label: "Gift",  initial: true }
  - { key: amount, type: number_range,  label: "How many", start: 1, end: 64, step: 1 }
  - { key: reason, type: single_option, label: "Reason",
      options: [ { id: spam, display: "<red>Spam", initial: true }, { id: rude } ] }
```

| Key | Applies to | Meaning |
|---|---|---|
| `key` | all | **required.** Letters, digits, underscore. Not starting `dz_` |
| `type` | all | `text`, `boolean`, `single_option`, `number_range` |
| `label` | all | defaults to the key |
| `width` | all | default 200 |
| `initial` | all | starting value |
| `max-length` | text | default 128 |
| `height` | text | presence makes it multiline |
| `options` | single_option | at least one required |
| `start` / `end` | number_range | default 0–100 |
| `step` | number_range | omit for smooth |

More: [Inputs](/plugins/ddialogs/features/inputs).

## Buttons and actions

```yaml
buttons:
  - label: "<item:ender_pearl> <white>Spawn"
    tooltip: "<gray>Teleport to spawn"
    width: 150
    permission: "myserver.spawn"
    actions: ["[player] spawn", "[close]"]
    deny-actions: ["<red>Not yet."]
```

| Key | Meaning |
|---|---|
| `label` | **required** |
| `tooltip` | on hover |
| `width` | 1–1024, default 150 |
| `permission` | who may press it |
| `actions` | run in order |
| `deny-actions` | run instead when `permission` fails |
| `url` | makes it a link button; replaces `actions` |

### Action tags

| Tag | Does |
|---|---|
| `[message] <text>` | to that player |
| `[broadcast] <text>` | to everyone |
| `[actionbar] <text>` | above the hotbar |
| `[title] <big>;<small>` | screen title |
| `[sound] <key> [vol] [pitch]` | plays a sound |
| `[player] <command>` | runs it as the player |
| `[console] <command>` | runs it as the server |
| `[dialog] <id>` | opens another dialog (deferred one tick) |
| `[dialog] <id> key=value` | opens it carrying a [parameter](/plugins/ddialogs/features/parameters) |
| `[back]` | returns to the previous dialog (deferred one tick) |
| `[close]` | shuts the screen |
| `[permission] <node>` | stops the rest of the list without it |
| `[delay] <ticks>` | waits, then continues. 20 = 1 second |
| `[filter] <text>` | stores a search term for the next dynamic list |
| `[call] <handler> [arg]` | hands the form's answers to [another plugin](/plugins/ddialogs/features/external-plugins) |

A string with no tag is treated as `[message]`. An unknown tag is rejected **at load**, naming the file — a typo used to be a button that silently did nothing.

More: [Buttons & actions](/plugins/ddialogs/features/buttons-and-actions).

### Commands the server doesn't have

At startup dDialogs lists every button whose command no plugin provides. Pressing one tells the player and leaves the dialog open, rather than failing silently.

### Using what the player typed

`$(key)` is replaced when the button is pressed. Newlines, semicolons, quotes and backslashes are stripped and the length is capped first — enough to stop a player ending your command and starting their own, not enough to make the value sensible.

## Icons

| Tag | Shows |
|---|---|
| `<item:diamond>` | an item's icon |
| `<sprite:block/dirt>` | any texture by path |
| `<sprite:minecraft:gui:widget/button>` | ...naming the atlas explicitly |
| `<head:Steve>` | a player's face |

A **block** has no item texture — `<item:gold_block>` shows the missing-texture square, `<sprite:block/gold_block>` is right. Animated items (`clock`, `compass`) have no single texture either.

Needs a 1.21.9+ client; older ones render nothing rather than breaking the dialog.

More, with a verified icon table: [Icons](/plugins/ddialogs/features/icons).

## Placeholders

`%player_name%`, `%player_displayname%`, `%player_uuid%`, `%player_world%`, `%player_x/y/z%`, `%player_health%`, `%player_food%`, `%player_level%`, `%player_gamemode%`, `%player_ping%`, `%server_online%`, `%server_max_players%`, `%server_version%` work with nothing installed.

Anything else goes to **PlaceholderAPI** if present. Without it, `%vault_eco_balance%` and friends render literally.

Expansion happens per open, against the player looking at the screen.

More: [Placeholders](/plugins/ddialogs/features/placeholders).

## Dynamic lists

A button per row of live data.

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

Rows are capped at 60, and players you cannot see are skipped. Only tokens the row has are filled at open time; anything else survives to be substituted on press. The footer is appended after the rows.

### Searching

A dialog cannot filter as the player types — a field's contents only reach the server on a press. So a search box is *store the term, reopen the screen*:

```yaml
footer-buttons:
  - label: "Search"
    actions:
      - "[filter] $(name)"
      - "[dialog] this-dialog-id"
```

More: [Dynamic lists](/plugins/ddialogs/features/dynamic-lists).

## Leaderboards

`dynamic-body` writes **body lines**; `dynamic-list` writes **buttons**.

**From a row source** — live data, nothing installed:

```yaml
dynamic-body:
  source: online_players_all
  template: "#$(i) <head:$(player_name)> $(player_name) — $(player_world)"
```

**From ranked placeholders** — a real leaderboard:

```yaml
dynamic-body:
  source: placeholder
  count: 10
  skip-empty: true
  fields:
    name:  "%ajlb_lb_statistic_player_kills_$(i)_alltime_name%"
    value: "%ajlb_lb_statistic_player_kills_$(i)_alltime_value%"
  template: "#$(i) <head:$(name)> $(name) — $(value)"
```

`$(i)` goes into each pattern *first*, so one line produces ten different placeholders.

| Key | Meaning |
|---|---|
| `source` | `placeholder`, or any row source |
| `count` | ranks to try — `placeholder` only |
| `fields` | required by `placeholder`, ignored otherwise |
| `template` | the line to repeat |
| `skip-empty` | drop unfilled ranks; default `true`. Also drops rows that are still unexpanded placeholders |
| `width` | default 300 |

Static `body` lines come first, generated ones after. A dialog may have both sections, each with its own `source`.

More: [Leaderboards](/plugins/ddialogs/features/leaderboards).

## Opening a dialog

```yaml
open:
  command: menu
  permission: myserver.menu
  on-join: true
  first-join-only: true
```

`command:` and `permission:` are also accepted at the root, so files written for other formats load unchanged; the nested form wins.

**Commands register at startup — a reload cannot add one.**

## Nested files

Some dialog formats wrap everything under a single key naming the dialog. Both shapes load: if the root holds exactly one section and no `type` of its own, that section is the dialog.

## What a dialog cannot do

- **React** — nothing updates without reopening.
- **Filter as you type** — values arrive on a press.
- **Paginate** — page two is another file, or another `[filter]`.
- **Branch** — no conditionals.
- **Show another player's placeholders** — they resolve against the viewer.
