---
title: "Buttons & actions"
description: "Every key a button takes, and all fourteen action tags with what each one does."
---

## A button

```yaml
  - label: "<item:ender_pearl> <white>Spawn"
    tooltip: "<gray>Teleport to spawn"
    width: 150
    permission: "myserver.spawn"
    actions:
      - "[player] spawn"
      - "[close]"
    deny-actions:
      - "<red>You cannot use that yet."
```

| Key | Meaning |
|---|---|
| `label` | the words on the button. **Required.** MiniMessage and icons work here |
| `tooltip` | shown on hover. Optional |
| `width` | in pixels, 1–1024. Default 150 |
| `permission` | who may press it. Without it, everyone |
| `actions` | what happens, **in order** |
| `deny-actions` | what happens instead for players failing `permission` |
| `url` | makes it a real link button — the client opens it directly |

:::tip[Give every button in a grid the same width]
Vanilla sizes each button to its own label otherwise, and a grid of slightly different widths reads as broken rather than as varied.
:::

## Actions run top to bottom

```yaml
    actions:
      - "[message] <gray>Teleporting..."
      - "[sound] entity.enderman.teleport"
      - "[player] spawn"
      - "[close]"
```

Four things, in that order. Most run instantly; two are deliberately deferred (see `[dialog]` and `[back]` below).

**A tag-less line is a message.** `- "<green>Hello"` is the same as `- "[message] <green>Hello"`.

## The fourteen tags

### Talking to the player

| Tag | What it does |
|---|---|
| `[message] <text>` | chat message, to that player only |
| `[broadcast] <text>` | chat message to **everyone on the server** |
| `[actionbar] <text>` | the thin line above the hotbar |
| `[title] <big>;<small>` | big screen text. The `;` splits title from subtitle |
| `[sound] <key> [vol] [pitch]` | e.g. `[sound] entity.player.levelup 1.0 1.2` |

### Running commands

| Tag | What it does |
|---|---|
| `[player] <command>` | runs it **as the player**, with their permissions |
| `[console] <command>` | runs it **as the server**, with full permissions |

Write the command without a leading slash: `[player] spawn`, not `[player] /spawn`.

:::danger[`[console]` is the dangerous one]
It runs with the server's authority. Never build a `[console]` command out of something a player typed — `$(field)` values are cleaned of characters that could end one command and start another, but that is defence in depth, not permission to be careless.

Use `[player]` unless you specifically need to bypass the player's own permissions.
:::

:::note[A missing command is caught for you]
At startup dDialogs lists every button whose command no plugin provides. Pressing one of those tells the player and **leaves the dialog open**, instead of silently doing nothing.
:::

### Moving between screens

| Tag | What it does |
|---|---|
| `[dialog] <id>` | opens another dialog by id (the filename without `.yml`) |
| `[dialog] <id> key=value` | opens it and tells it what was picked — see [parameters](/plugins/ddialogs/features/parameters) |
| `[back]` | returns to the previous dialog |
| `[close]` | shuts the screen |

`[dialog]` and `[back]` are **deferred by one tick** on purpose: the current screen has to close before the next opens, or the client stays on the old one.

That one-tick delay is also what makes the toggle pattern work — see [the toggle recipe](/plugins/ddialogs/menu-patterns#toggle-rows).

If there is nowhere to go back to, `[back]` does nothing and the dialog simply closes. That is a sensible fallback for a screen reachable both from a menu and from its own command.

### Control flow

| Tag | What it does |
|---|---|
| `[permission] <node>` | **stops the rest of the list** unless the player has it |
| `[delay] <ticks>` | waits, then continues. 20 ticks = 1 second |
| `[filter] <text>` | stores a search term for the next dynamic list |
| `[call] <handler> [arg]` | hands the form's answers to another plugin — see [calling other plugins](/plugins/ddialogs/features/external-plugins) |

`[permission]` guards halfway through a chain:

```yaml
    actions:
      - "[message] <gray>This always runs."
      - "[permission] myserver.admin"
      - "[message] <green>This only runs for admins."
```

That differs from `permission:` on the button, which decides between `actions` and `deny-actions` before anything runs.

`[filter]` with nothing after it clears the filter — note the **trailing space**, which is what gives the tag an empty argument rather than no argument:

```yaml
      - "[filter] "
```

## permission and deny-actions

```yaml
  - label: "%myplugin_home_4%"
    permission: "myplugin.homes.4"
    actions: ["[player] home 4", "[close]"]
    deny-actions:
      - "<red>Slot 4 is locked. <gray>Ranks unlock more slots."
      - "[sound] block.note_block.bass"
```

A button with `permission:` runs its normal actions for players who have it, and `deny-actions` for everyone else. A locked button that explains itself beats one that does nothing.

:::caution[deny-actions changes behaviour, not appearance]
The button still *looks* identical. To draw it differently — a red "Locked" — the label itself has to say so, which means a placeholder from the plugin that owns the state. See [Permissions & locks](/plugins/ddialogs/features/permissions).
:::

## Using what the player typed

`$(key)` is replaced with the value of the input with that key, **at the moment the button is pressed**:

```yaml
inputs:
  - key: amount
    type: text
    label: "Amount"
    max-length: 10

buttons:
  - label: "<green>Pay"
    actions:
      - "[player] pay Steve $(amount)"
```

Submitted values have newlines, semicolons, quotes and backslashes stripped, and are length-capped, before substitution. That stops a player ending your command and starting their own.

It does **not** make the value sensible — `abc` and `-5` survive, because only the command you are running can know they are wrong. Let it reject them.

## Link buttons

```yaml
  - label: "<item:nether_star> <aqua>Website"
    width: 100
    url: "https://example.com/"
```

`url:` replaces `actions:`. The client opens the link itself, with no round trip, and shows its usual "are you sure you want to open a link" prompt.

## The compact form

Other dialog config formats describe one action declaratively. Those are accepted so their files load unchanged:

```yaml
  - label: "Spawn"
    action: run-command
    command: spawn
```

Understood: `run-command` / `static-run-command`, `command-template` / `dynamic-run-command`, `open-menu` / `show-dialog`, `open-url` / `static-open-url`, `back`, `close`, `none`.

Prefer the `actions:` list in new files — it is the only form that chains.
