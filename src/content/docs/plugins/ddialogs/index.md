---
title: "DDialogs"
description: "Native Minecraft dialogs for the DzusillCore ecosystem."
---

Native Minecraft dialogs for the DzusillCore ecosystem.

Minecraft 1.21.6 added server-driven dialogs — real client-rendered screens with text fields, checkboxes, sliders and option pickers, instead of items arranged in a chest. DDialogs is what draws them.

## What it does

It renders. It does not add commands, configuration, or an API of its own.

Every DzusillCore plugin already calls `DialogService`. Without DDialogs those calls fall back to chat prompts and chest menus; installing DDialogs upgrades the same call sites to real dialogs. Removing it downgrades them again. **No plugin needs to change, and nothing references DDialogs directly.**

| Without DDialogs | With DDialogs |
|---|---|
| "Delete that warp?" as a clickable yes/no in chat | a proper confirmation screen |
| pick an amount with +1 / +half / +stack buttons | a slider |
| one ticket question per chat message | the whole form on one screen |

## Requirements

- **Paper 1.21.7 or newer.** Dialogs reached the client in 1.21.6, but the server API for them arrived in 1.21.7.
- **DzusillCore 1.4.0 or newer**, installed as a separate jar.

On an older server the plugin loads, logs that dialogs are unavailable, and stays out of the way — plugins using `DialogService` keep working through its fallbacks.

## Installation

Drop `DDialogs.jar` into `plugins/` alongside `DzusillCore.jar` and restart. You should see:

```
[DDialogs] Native dialog rendering enabled: paper-typed (1.21.11, client-gate=none)
```

`client-gate` reports how per-player client versions are detected. With ViaVersion installed it reads `viaversion`, and players on clients older than 1.21.6 are routed to the fallback rather than being sent a screen they cannot draw. Without it, `none` — every client is assumed to speak the server's protocol, which is true when no translating proxy is involved.

## Verifying it

DzusillCore ships `/coredialog` for exactly this:

| | |
|---|---|
| `/coredialog status` | whether native rendering is active for *you* |
| `/coredialog confirm` | a confirmation |
| `/coredialog input` | a single text field |
| `/coredialog full` | every input type at once, echoing each value back |

`full` is the useful one: a mistranslated field shows up as a wrong value in chat rather than as a screen that silently looks fine.

## A caveat worth knowing

A plugin that **shades DzusillCore** into its own jar, rather than depending on a separate core jar, carries its own copy of the dialog interfaces. Bukkit's service lookup matches on class identity, so DDialogs' registration cannot be found from such a plugin and it will always use the fallback.

Nothing breaks — it just never upgrades. Switching that plugin to `provided` scope and installing DzusillCore separately is what enables native rendering there.

## Pages

* [How it works](/plugins/ddialogs/how-it-works/)
