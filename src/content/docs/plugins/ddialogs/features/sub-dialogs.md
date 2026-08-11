---
title: "Sub-dialogs & navigation"
description: "Linking screens together, how [back] knows where to go, and how to build a menu tree that never traps anyone."
---

Any dialog can open any other. That is the whole mechanism, and a menu tree is just files pointing at each other.

## Opening another dialog

```yaml
  - label: "<yellow>Rules"
    actions: ["[dialog] rules"]
```

`rules` is the **id** — the filename without `.yml`. So this opens `plugins/dDialogs/dialogs/rules.yml`.

There is no depth limit. A menu can open a category, which opens a sub-category, which opens a confirmation.

:::note[Why it takes a tick]
`[dialog]` is deliberately deferred by one tick: the current screen must close before the next opens, or the client stays on the old one. You will never notice, but it is the reason the toggle pattern works.
:::

## Going back

```yaml
exit-button:
  label: "<gray>Back"
  actions: ["[back]"]
```

**`[back]` means "wherever I came from", not a fixed destination.** dDialogs remembers the trail of screens each player walked, so the same Rules page returns correctly whether it was opened from the main menu, from Information, or from a command.

This is what makes shared screens possible. Without it, a page reachable from two places would need two copies, or a Back button that sends half your players somewhere they never were.

### When there is nowhere to go

If the player opened the dialog directly with a command, the trail is empty and `[back]` simply closes the screen. That is a sensible fallback, and it means a screen reachable both ways needs no special handling.

The stack is capped at 32 entries, so a dialog that loops into itself cannot grow it forever. Reopening the screen already on top does not stack it again — a refresh should not make "back" mean "here".

## A worked tree

Four files, and every screen has a way out.

**`menu.yml`** — the root:

```yaml
type: multi_action
title: "<gold><b>Menu</b></gold>"
columns: 2

open:
  command: menu

buttons:
  - label: "<item:book> <white>Rules"
    width: 150
    actions: ["[dialog] rules"]

  - label: "<item:emerald> <white>Shop"
    width: 150
    actions: ["[dialog] shop"]

exit-button:
  label: "<gray>Close"
  width: 100
  actions: ["[close]"]
```

**`rules.yml`** — a leaf:

```yaml
type: notice
title: "<gold><b>Rules</b></gold>"

body:
  - type: text
    text: "<gray>Be decent. Do not cheat."
    width: 320

ok-button:
  label: "<gray>Back"
  actions: ["[back]"]
```

**`shop.yml`** — a branch that goes deeper:

```yaml
type: multi_action
title: "<green><b>Shop</b></green>"
columns: 2

buttons:
  - label: "<white>Buy"
    width: 150
    actions: ["[player] shop buy", "[close]"]

  - label: "<red>Sell everything"
    width: 150
    actions: ["[dialog] shop-confirm"]

exit-button:
  label: "<gray>Back"
  width: 100
  actions: ["[back]"]
```

**`shop-confirm.yml`** — the leaf at the bottom:

```yaml
type: confirmation
title: ""

body:
  - type: text
    text: "<white>Sell every sellable item in your inventory?"
    width: 320

confirm-button:
  label: "<green>Yes"
  actions: ["[player] sell all", "[close]"]

deny-button:
  label: "<red>No"
  actions: ["[back]"]
```

Press Back from the confirmation and you are in the Shop. Press it again and you are in the Menu. Nobody gets stranded.

## Rules of thumb

**The root closes; everything else goes back.** A screen opened by a command is the top of the tree — its exit should be `[close]`, labelled "Close". A screen opened from a menu should be `[back]`, labelled "Back". Getting this backwards is the most common navigation mistake: a "Close" that drops the player into the world when they expected to return to the menu.

**Deny goes back, not close.** In a confirmation reached from a menu, "No" should return the player to where they were. `[close]` is right only when the confirmation was the entire interaction.

**Do not hardcode the destination.** `[dialog] menu` as a Back button works until the day a second menu opens that screen. Use `[back]`.

## Chaining before you leave

Actions run in order, so a button can do several things and then move:

```yaml
    actions:
      - "[message] <gray>Teleporting..."
      - "[sound] entity.enderman.teleport"
      - "[player] spawn"
      - "[close]"
```

Or run a command and come straight back to the same screen, which is how a settings toggle refreshes itself:

```yaml
    actions:
      - "[player] settings toggle chat"
      - "[dialog] my-settings"      # this dialog's own id
```

See [Menu patterns](/plugins/ddialogs/menu-patterns) for the full toggle recipe.

## Opening a dialog from elsewhere

Not everything has to start with a button:

```yaml
open:
  command: menu                 # registers /menu
  permission: myserver.menu     # optional
  on-join: true                 # show it when a player joins
  first-join-only: true         # ...only their very first time
```

`on-join` plus `first-join-only` is the usual welcome screen.

From the console or another plugin:

```
/ddialogs open <id>
/dopen <player> <id>
```

And there is a pause-screen button — see [Pause menu](/plugins/ddialogs/features/pause-menu).

:::caution[New commands need a restart]
`open: command:` registers at startup. `/ddialogs reload` re-reads the file but cannot add a command to the server.
:::

## Checking the tree is sound

At startup dDialogs reports every button whose command no plugin provides. There is no equivalent warning for a `[dialog]` pointing at a file that does not exist — that one just does nothing when pressed.

`/ddialogs list` prints every dialog that loaded. Compare it against the ids your buttons reference; a typo shows up immediately.
