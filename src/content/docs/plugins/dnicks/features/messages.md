---
title: "Join, Quit & Death Messages"
description: "dNicks can rewrite the server's join, quit and death broadcasts so they carry the gradient nick too. Each is an independent toggle under surfaces:."
---

dNicks can rewrite the server's join, quit and death broadcasts so they carry the gradient nick too. Each is an independent toggle under `surfaces:`.

```yml
surfaces:
  join-message: true
  quit-message: true
  death-message: true
```

## Join & quit

Rebuilt from the format strings, with `%name%` = the rendered nick and `%player%` = the real username:

```yml
formats:
  join: "<dark_gray>[<green>+</green>]</dark_gray> %name%"
  quit: "<dark_gray>[<red>-</red>]</dark_gray> %name%"
```

## Death

The death message keeps the vanilla wording (cause, killer) and just swaps the victim's plain username for the gradient nick. Nothing to format — turning `death-message` on is enough.

## Turning them off

Set any toggle to `false` to leave that broadcast to the server (or another plugin). For example, if a custom join plugin owns the welcome message, set `join-message: false`.
