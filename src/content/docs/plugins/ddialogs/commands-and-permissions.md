---
title: "Commands & permissions"
description: "The plugin's own commands, plus the commands your dialogs register themselves."
---

## The plugin's commands

| Command | Does |
|---|---|
| `/ddialogs list` | every dialog that loaded. If yours is missing, it did not parse |
| `/ddialogs open <id>` | opens one for yourself |
| `/ddialogs reload` | re-reads the `dialogs/` folder |
| `/dopen <player> <id>` | opens a dialog for someone else |

`/dopen` is the one to use from command blocks, NPC plugins and other plugins' reward actions.

## Your own commands

A dialog registers its own command with `open:`:

```yaml
open:
  command: menu
  permission: myserver.menu
```

That creates `/menu`. The startup log lists everything registered this way:

```
[dDialogs] Dialog commands: /menu, /leaderboards, /togglerows, ...
```

:::caution[Commands register at startup]
`/ddialogs reload` re-reads the file but cannot add a command to the running server. A new `open: command:` needs a full restart.
:::

## Permission nodes

| Node | Grants |
|---|---|
| `ddialogs.admin` | `/ddialogs reload`, `/dopen`, and the admin buttons in the shipped examples |

That is the plugin's whole set. **Everything else is yours to name.**

A dialog's own `open: permission:` and a button's `permission:` accept any node you like — your permissions plugin grants it. Use your own prefix:

```yaml
open:
  command: staffmenu
  permission: myserver.staff.menu
```

Do not reuse `ddialogs.*` for your menus; that namespace belongs to the plugin's own commands and could collide with a future release.

## Where a permission can sit

Three places, doing three different jobs:

**On the dialog** — who may open it at all.

```yaml
open:
  command: staffmenu
  permission: myserver.staff
```

**On a button** — who gets `actions` versus `deny-actions`. The button stays visible and pressable either way.

```yaml
  - label: "<yellow>Admin tools"
    permission: myserver.admin
    actions: ["[player] adminpanel"]
    deny-actions: ["<red>Admins only."]
```

**Inside an action chain** — a checkpoint that stops the rest of the list.

```yaml
    actions:
      - "[message] <gray>Everyone sees this."
      - "[permission] myserver.admin"
      - "[message] <green>Only admins see this."
```

Full detail: [Permissions & locks](/plugins/ddialogs/features/permissions).

## What the commands inside dialogs run as

| Tag | Runs as | Permissions used |
|---|---|---|
| `[player] <cmd>` | the player | theirs |
| `[console] <cmd>` | the server | full |

:::danger[Prefer `[player]`]
`[console]` bypasses the player's own permissions entirely. Use it only when you specifically need that, and never build a `[console]` command out of text a player typed.
:::

## Missing commands are reported

At startup dDialogs lists every button whose command no plugin on the server provides:

```
[dDialogs] These dialog buttons run commands no plugin on this server provides.
[dDialogs]   /ah  <-  13-menu-grid
[dDialogs]   /friends  <-  20-search-and-filter
```

Pressing one of those tells the player and **leaves the dialog open**, instead of doing nothing. Install the plugin that owns the command, or edit the dialog to drop the button.
