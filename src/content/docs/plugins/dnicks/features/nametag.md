---
title: "The Floating Nametag"
description: "The hardest surface. Vanilla Minecraft cannot put a per-character gradient on the name floating above a player's head — scoreboard teams allow a single…"
---

The hardest surface. Vanilla Minecraft **cannot** put a per-character gradient on the name floating above a player's head — scoreboard teams allow a single color only (the TAB plugin has the same limit). dNicks solves it without any packet library.

## How it works

When a player has a nick and `surfaces.nametag` is enabled, dNicks:

1. spawns a vanilla **`TextDisplay`** entity above the player, carrying the rendered (gradient) nick, and
2. hides the vanilla white username via a scoreboard team with name-tag visibility set to `NEVER`.

One shared display per player (the nick is identical for everyone), so there are no per-viewer packets.

## Settings

```yml
nametag-display:
  y-offset: 0.30          # blocks above the head
  billboard: CENTER       # CENTER | VERTICAL | HORIZONTAL | FIXED (CENTER always faces the viewer)
  see-through: false      # render through blocks
  shadowed: true          # text shadow
  view-range: 1.0         # vanilla view-range multiplier (keep <= 1.0)
  hide-on-sneak: true     # dim while sneaking
  sneak-opacity: 64       # 0-255 text opacity while sneaking
  background: false       # show the dark text-display background plate
  spawn-only-when-nicked: true   # players without a nick keep their normal vanilla name
```

## Lifecycle

The display follows the player and is re-created on respawn and world change; it is removed on quit, and any leftover displays from a crash are swept on the next start.

## One owner per surface

If the **TAB plugin** is installed, disable TAB's own nametag feature so dNicks' `TextDisplay` is the sole owner — otherwise the two fight over the scoreboard team. dNicks logs this reminder at startup. See [Integrations](/plugins/dnicks/integrations/).
