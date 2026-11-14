---
title: "The kit menu"
description: "In mode: choose a menu opens on the triggers listed in choose.open-on (enter, respawn and join by"
---

In `mode: choose` a menu opens on the triggers listed in `choose.open-on` (enter, respawn and join by
default), and any time with `/kits`.

## Using it

| Action | Does |
|---|---|
| Left-click a kit | Equips it (or opens the purchase screen for a Stardust kit with no uses) |
| Right-click a kit | Opens the preview |
| Shift-click a kit | Opens the [kit arranger](/plugins/oberonkits/features/kit-layouts/) to put its items where the player wants them |
| Random button | Gives one of the free kits at random |
| `/kits <kit>` | Picks a kit by name without the menu |

What each click does is set in `menus.yml` (`click.left`, `click.right`, `click.shift`: `equip`, `preview`,
`layout` or `none`).

The kit used last is remembered per profile and glows in the menu.

## Preview

The preview shows the kit laid out like a player inventory: rows 1–3 the main inventory, row 4 the hotbar,
row 5 armor and offhand, and **Back** / **Equip** / **Arrange this kit** buttons at the bottom.

A kit timer keeps running in the arranger. Arranging is easiest before entering the kit world, with
`/kits layout <kit>`.

## Time limit

`choose.timeout` (15 s by default) is how long the player has to pick. An action bar counts down. When time
runs out, `choose.timeout-action` decides:

| Value | Gives |
|---|---|
| `last` | The last kit used here, or a random one if there is none |
| `random` | A random free kit |
| `first` | The first kit in the list the player may use |
| `none` | Nothing; the player is told to use `/kits` |

`timeout: 0s` means no limit. The timer counts server ticks, so lag only stretches it.

Closing the menu without picking does what `choose.close-action` says: `reopen` (default), `timeout-action`
(apply the timeout action now) or `none`.

## Changing kit

A player who already has a kit and picks another with `/kits` gets what `choose.allow-change` allows:

| Value | Effect |
|---|---|
| `on-respawn` (default) | The new kit is queued and given on the next respawn |
| `anytime` | The player is reset and gets the new kit now, at most once per `change-cooldown` |
| `never` | Locked until death |

A player with an empty inventory always gets the kit at once.

## Skipping the menu

`choose.skip-if-remembered: true` gives the remembered kit straight away and opens the menu only with
`/kits` — for players who always take the same kit.
