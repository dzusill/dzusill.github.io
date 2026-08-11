---
title: "Permissions & locks"
description: "Gating a whole dialog, one button, or half an action chain — and how locked slots really work."
---

There are three places a permission can sit, and they do different jobs.

## 1. On the whole dialog

```yaml
open:
  command: staffmenu
  permission: myserver.staff
```

`/staffmenu` tells anyone without the node that they cannot open it. This also covers `/ddialogs open` and `/dopen`.

## 2. On one button

```yaml
  - label: "<yellow>Admin tools"
    permission: myserver.admin
    actions:
      - "[player] adminpanel"
      - "[close]"
    deny-actions:
      - "<red>Admins only."
      - "[sound] block.note_block.bass"
```

The button is **always visible and always pressable**. Players with the node get `actions`; everyone else gets `deny-actions`.

A denied press that explains itself beats one that silently does nothing.

:::caution[deny-actions changes behaviour, not appearance]
The button still looks identical to its neighbours. There is no way in YAML to draw a denied button differently — no if-statements exist. To show a red "Locked", the *label* has to say so, which means a placeholder from a plugin that knows the player's state. See [locked slots](#locked-slots) below.
:::

## 3. Halfway through an action chain

```yaml
    actions:
      - "[message] <gray>This always runs."
      - "[permission] myserver.admin"
      - "[message] <green>This only runs for admins."
      - "[console] say an admin pressed the button"
```

`[permission]` **stops the rest of the list** for anyone without the node, and sends them a refusal.

Use it when a button does something for everybody plus something extra for staff. `permission:` on the button is an either/or; `[permission]` is a checkpoint.

## Locked slots

The screen everyone wants: some slots owned, some empty, some locked behind a rank.

```
[Home 1]  [New Home]  [Locked]  [Locked]  ... [Show More]
 owned      empty      no rank
```

**Two separate problems, and mixing them up is why this is hard.**

**What the slot says** is per player, and a static file cannot know it. "Home 1" versus "New Home" depends on whether slot 1 is used. Only a placeholder can answer that, so the label is a placeholder and the plugin that owns homes decides the text — including its colour.

**Whether the slot is allowed** is a permission, and dialogs handle that natively.

```yaml
type: multi_action
title: ""
columns: 4

buttons:
  - label: "%myplugin_home_1%"
    width: 110
    actions: ["[player] home 1", "[close]"]

  - label: "%myplugin_home_4%"
    tooltip: "<gray>Slot 4 needs VIP."
    width: 110
    permission: "myplugin.homes.4"
    actions: ["[player] home 4", "[close]"]
    deny-actions:
      - "<red>Slot 4 is locked. <gray>Ranks unlock more home slots."
      - "[sound] block.note_block.bass"
```

Placeholder for the text, permission for the behaviour. Neither substitutes for the other.

:::tip[If you own the plugin, skip all of this]
Register a dialog source instead: one row per slot with its own state, and `dynamic-list` draws them. That is what these screens really are on a server that ships them.
:::

## "Show More" is another file

Dialogs have no pagination — nothing on a rendered screen can grow. Page two is its own dialog with slots 7–12 and a Back button of its own. Three pages means three files.

A list from a *source* pages differently: reopen the same dialog with `[filter]` narrowing it, rather than splitting it. The fixed-slot case cannot use that.

## Node naming

dDialogs does not invent nodes for your buttons — you choose them, and your permissions plugin grants them. Use your own prefix (`myserver.menu.staff`) rather than `ddialogs.*`, which belongs to the plugin's own commands.

The plugin's own nodes are on [Commands & permissions](/plugins/ddialogs/commands-and-permissions).

## A worked example

```yaml
type: multi_action
title: "<gray><b>Permissions</b></gray>"
columns: 1

open:
  command: exampleperms
  permission: ddialogs.admin      # without this, /exampleperms says no

buttons:
  - label: "<green>Anyone can press this"
    actions: ["[message] <green>Hello."]

  - label: "<yellow>Admins only"
    permission: ddialogs.admin
    actions: ["[message] <green>You are an admin."]
    deny-actions: ["[message] <red>You are not."]

  - label: "<aqua>Guarded halfway through"
    actions:
      - "[message] <gray>This always runs."
      - "[permission] ddialogs.admin"
      - "[message] <green>This only runs for admins."

exit-button:
  label: "<gray>Close"
  actions: ["[close]"]
```

This ships as example 10 — open it with `/exampleperms`.
