---
title: "The Picker GUI"
description: "/nick picker (aliases /nick gui, /nick menu) opens an in-game menu so players can style their name without typing MiniMessage tags."
---

`/nick picker` (aliases `/nick gui`, `/nick menu`) opens an in-game menu so players can style their name without typing MiniMessage tags.

## What's inside

- **Named-color swatches** — red, gold, yellow, green, aqua, blue, pink, white. Each wraps your current visible name in that color.
- **Gradient presets** — Fire, Ocean, Sunset, Mint, Candy, Sun, plus **Rainbow**.
- **Custom** — closes the menu and prompts you to type a full MiniMessage nick in chat (type `cancel` to abort).
- **Reset** — clears your nick.

Clicking a swatch applies it instantly and closes the menu.

## Permission-aware

Each swatch is gated by the same permission as typing it: gradient presets need `dnicks.gradient`, color swatches need `dnicks.color.<name>`. Swatches a player can't use are **hidden**, so the picker doubles as a view of what that player is allowed to do.

Opening the picker needs `dnicks.picker` (on by default).

## Chat input, not anvils

The Custom option captures your next chat line instead of using an anvil GUI, so it works on all modern Paper versions with no version-specific breakage.
