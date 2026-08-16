---
title: "Installation"
description: "Drop in two jars, restart, and check one line in the console."
---

## 1. Drop in the jars

Put both into `plugins/`:

```
plugins/
├── DzusillCore.jar
└── dDialogs.jar
```

Order does not matter — Bukkit works it out from the dependency.

## 2. Restart

**A full restart, not `/reload`.** Commands are registered while the server starts.

## 3. Check the console

You are looking for this line:

```
[dDialogs] Native dialog rendering enabled: paper-typed (1.21.11, client-gate=none)
```

If instead you see a message saying dialogs are unavailable, your server is older than Paper 1.21.7 — see [Requirements](/plugins/ddialogs/getting-started/requirements).

A few lines further down:

```
[dDialogs] Dialog commands: /examplemenu, /examplehub, /bigmenu, /togglerows, ...
[dDialogs] Loaded 25 dialog(s).
```

## 4. What appeared on disk

```
plugins/dDialogs/
├── config.yml              the pause-menu button, and nothing else
├── messages.yml
├── dialogs/                ← YOUR dialogs live here. Every .yml is one screen.
│   ├── welcome.yml
│   ├── rules.yml
│   ├── feedback.yml
│   ├── menu.yml
│   ├── 01-notice.yml       ← the 28 examples, seeded on first run
│   ├── 02-confirmation.yml
│   └── ...
└── .example-configs/       pristine copies of the examples, never loaded
```

**`dialogs/` is the only folder that matters.** Every `.yml` in it is one dialog, and the filename without `.yml` is its **id** — that id is what `[dialog]`, `/ddialogs open` and everything else refers to.

**`.example-configs/` is reference material.** It is a dot-folder, it is never loaded, and it is rewritten on every start so an upgrade always brings you the current examples. Copy out of it; do not edit inside it.

:::tip[The examples are live on a fresh install]
On the run that *creates* `dialogs/`, all 28 examples are copied in as real, working dialogs — each with its own command. That is so you can press them, not just read them.

They are never re-added. Delete the ones you do not want and they stay gone; the pristine copies remain in `.example-configs/`.

On an existing server nothing is seeded, so upgrading never dumps 21 dialogs on you.
:::

## 5. Try it

```
/examplemenu
```

That is example 3, a small two-button grid. `/examplehub` is example 6, which opens other dialogs. See [Examples](/plugins/ddialogs/examples) for the full list and what each one teaches.

## Reloading after an edit

```
/ddialogs reload
```

Re-reads every file in `dialogs/`. A file with a mistake is skipped with a message naming the file, the key and what was expected; the others keep working.

**Two things need a full restart instead:**

- **A new `open: command:`** — commands register at startup only.
- **The pause-menu button** — it is written as a datapack, and datapacks are read when the world loads. See [Pause menu](/plugins/ddialogs/features/pause-menu).

## Checking what loaded

```
/ddialogs list
```

Lists every dialog that parsed. If yours is missing, it did not load — the console says why.
