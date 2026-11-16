---
title: "Bedrock players"
description: "Bedrock players join through Geyser and Floodgate. With Floodgate on the server, OberonKits shows them the kit"
---

Bedrock players join through Geyser and Floodgate. With Floodgate on the server, OberonKits shows them the kit
menu as a native Bedrock form: one button per kit, plus **Random kit**. A Stardust kit without uses asks
**Buy / Back** first.

## Why not the chest menu

The kit menu opens on its own right after joining, respawning or entering the kit world. At that moment a
Bedrock client is often still loading the world and never shows the chest. Geyser still counts it as open, and
when the server closes it (the kit was picked or the timer ran out) Geyser waits for the client to confirm a
close that never comes. Until the player rejoins, every inventory stays shut, their own included. A form is
not a container, so it can't get stuck that way.

## Settings

```yaml
# config.yml
bedrock:
  forms: true
  menu-delay-ticks: 40
```

| Key | Default | Meaning |
|---|---|---|
| `forms` | `true` | Bedrock players pick kits in a form |
| `menu-delay-ticks` | `40` | With `forms: false`: how long the chest menu waits after joining, respawning or entering, so the client has loaded (20 ticks = 1 s) |

The form's texts are under `bedrock-form` in [menus.yml](/plugins/oberonkits/configuration/menus/). The rules are the
kit menu's: locked kits (`select.locked-kits.show`), the Random button (`select.buttons.random.enabled`),
`choose.timeout` and `choose.close-action` (closing the form with **X** reopens it when that is `reopen`).
A form answered after the time ran out counts as a `/kits` pick, so it never gives a second kit.

Floodgate must be installed on this server (not only on the proxy) for OberonKits to tell Bedrock players
apart; the console says `Floodgate found` at start-up.

## A player is already stuck

They rejoin; that resets Geyser's state.
