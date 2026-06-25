---
title: "The GUI"
description: "Running /dstattrack (or /dstat, /stattrack) with no arguments opens a drag-and-drop menu — the friendliest way to apply or remove a stattrack."
---

Running `/dstattrack` (or `/dstat`, `/stattrack`) with no arguments opens a drag-and-drop menu — the friendliest way to apply or remove a stattrack.

## Layout

A 45-slot (5-row) inventory:

| Slot | Item | Purpose |
|---|---|---|
| 4 | Book (**info**) | Shows the price and a how-to. |
| 19 | Arrow head | Points at the input slot. |
| 20 | *(empty)* | **Input slot** — drop the item to stattrack here. |
| 23 | Green head (**Add**) | Click to apply. Hidden without `dstattrack.add`. |
| 24 | Red head (**Remove**) | **Double-click** to remove. Hidden without `dstattrack.remove`. |

Every other slot is filled with decorative glass.

## Using it

1. Run `/dstattrack`.
2. Drop the item you want to track into the **input slot** (slot 20).
3. Click **Add** to apply (you're charged the price), or **double-click Remove** to strip a stattrack.

The **Add** and **Remove** buttons are permission-aware: a player who lacks `dstattrack.add` simply won't see the Add head — the same way the command tree hides subcommands a player can't run.

## Closing the menu

If you close the GUI with an item still in the input slot, it is returned to your inventory automatically (and dropped at your feet if your inventory is full). Nothing is ever lost.

## Customising

The title and every button's name/lore come from the `gui` section of [config.yml](/plugins/dstattrack/configuration/config/). All strings are [MiniMessage](/plugins/dstattrack/configuration/messages/). The slot positions and head textures are fixed in code.
