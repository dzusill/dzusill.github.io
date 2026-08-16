---
title: "dDialogs"
description: "Build real Minecraft menus in YAML — no Java, no chest GUIs. Native client-rendered screens with buttons, text fields, sliders and checkboxes."
---

**dDialogs turns a YAML file into a real Minecraft menu.** Not items in a chest pretending to be buttons — an actual screen the client draws, with proper buttons, text fields, checkboxes and sliders.

Minecraft 1.21.6 added server-driven dialogs. dDialogs is what lets you write them without touching Java.

## What you can build

Everything below is one `.yml` file each, and every one of them ships as a working example you can open in-game:

| | |
|---|---|
| A server menu | a grid of buttons that run commands |
| A rules page | scrolling text with an OK button |
| "Are you sure?" | a two-button confirmation |
| A form | text fields, a checkbox, a dropdown, a slider — all on one screen |
| A player list | one button per online player, built the moment it opens |
| A top-10 | one row per rank, each with that player's head |
| A settings screen | rows that show their value and flip when pressed |

## Two jobs in one plugin

**1. You write menus.** Drop a `.yml` in `plugins/dDialogs/dialogs/`, run `/ddialogs reload`, and it exists. This is what most of this documentation is about, and it needs no programming at all.

**2. It upgrades other plugins.** Every DzusillCore plugin already asks for a dialog when it needs one. Without dDialogs those requests fall back to chat prompts and chest menus; with it, the same call sites become real screens. **No other plugin has to change, and none of them reference dDialogs directly.**

| Without dDialogs | With dDialogs |
|---|---|
| "Delete that warp?" as a clickable yes/no in chat | a proper confirmation screen |
| pick an amount with +1 / +half / +stack buttons | a slider |
| one ticket question per chat message | the whole form on one screen |

## Where to start

**Never written one before?** [Make your first dialog](/plugins/ddialogs/tutorial) — ten minutes, no Java, and you press your own button at the end.

**Want to see everything working first?** A fresh install ships all 28 [examples](/plugins/ddialogs/examples) as live dialogs, each with its own command. Type `/examplemenu` and click around.

**Designing a whole menu tree?** [Menu patterns](/plugins/ddialogs/menu-patterns) covers the screens published servers actually ship, and why they look the way they do.

**Looking up one key?** [Writing dialogs](/plugins/ddialogs/writing-dialogs) is the complete reference.

## The one rule to understand early

> **A dialog is drawn once, when it opens, and nothing in it can change afterwards.**

Almost every question people ask comes back to this sentence. A setting that appears to toggle is a screen thrown away and rebuilt. A list that appears to filter is the same screen reopened with a stored search term. There is no live updating, no pagination, no if-statements.

That sounds limiting. In practice it makes menus *simpler* to write, because there is only ever one thing on screen and you always know exactly what it is.

## Requirements at a glance

- **Paper 1.21.7 or newer** — dialogs reached the client in 1.21.6, but the server API arrived in 1.21.7
- **DzusillCore 1.4.0 or newer**, as a separate jar
- Optional: **PlaceholderAPI** for `%placeholders%`, **ViaVersion** so old clients get the fallback instead of a blank screen

Full detail on the [Requirements](/plugins/ddialogs/getting-started/requirements) page.
