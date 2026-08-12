---
title: "config.yml"
description: "The whole file — dDialogs has exactly one setting group, and it is the pause-menu button."
---

dDialogs has almost no configuration. Your dialogs are the configuration; `config.yml` holds two things.

```yaml
defaults:
  escape-closes: true

pause-menu:
  enabled: false
  button-name: "Menu"
  dialog: "menu"
  quick-actions: false
  direct-open: false
```

## defaults

House rules every dialog inherits unless its own file says otherwise.

| Key | Default | Meaning |
|---|---|---|
| `escape-closes` | `true` | whether Escape closes a dialog that does not specify |

Per dialog, write it as a word rather than a bare boolean:

```yaml
escape: close      # or the old spelling, can-close-with-escape: true
escape: none       # or can-close-with-escape: false
```

**A tree policy worth copying:** set `escape-closes: false` so no sub-screen can be dismissed by accident, then put `escape: close` on the root menu alone. Escape then works exactly once, at the top, and every screen below it is left through its own Back button.

:::caution[There is no `escape: back`]
Escape is handled by the client. The flag travels with the dialog and the client acts on it locally, without telling the server — Paper's dialog API has no close event of any kind, so nothing can run when a screen is dismissed.

Escape can only be on or off. Writing `escape: back` is a load error with that explanation, rather than being silently ignored. Use `escape: none` plus a `[back]` button.
:::

| Key | Default | Meaning |
|---|---|---|
| `enabled` | `false` | put a button on the pause (Escape) screen |
| `button-name` | `"Menu"` | the words on it |
| `dialog` | `"menu"` | which dialog it opens, by id |
| `quick-actions` | `false` | also add it to the quick-actions bar (G) |
| `direct-open` | `false` | show the menu immediately instead of a one-button intro screen |

:::caution[Every change here needs a full restart]
The pause button is written as a datapack, and datapacks are read when the world loads. `/ddialogs reload` cannot move it.

Worse, a change usually needs **two** restarts: the world reads the pack at load, but the plugin writes the new one afterwards during enable. So an edit written on one start is only served on the next.
:::

Full detail, including what `direct-open: true` costs: [Pause menu button](/plugins/ddialogs/features/pause-menu).

## messages.yml

Created empty. dDialogs sends almost no messages of its own — the text your players read comes from your dialogs.

## The dialogs folder

```
plugins/dDialogs/
├── config.yml
├── messages.yml
├── dialogs/            ← every .yml here is one dialog
└── .example-configs/   reference copies, never loaded
```

**`dialogs/` is where the work happens.** The filename without `.yml` is the dialog's id.

**`.example-configs/` is rewritten on every start**, so upgrading always brings you the current examples. Never edit inside it — copy out.

On the run that *creates* `dialogs/`, the examples are also seeded there as live dialogs so you can press them. That happens once; delete what you do not want and it stays gone.

## Reloading

```
/ddialogs reload
```

Re-reads every file. A broken file is skipped with a message naming the file, the key and what was expected; the rest keep working.

**Needs a full restart instead:**

- a new or changed `open: command:`
- anything under `pause-menu`
