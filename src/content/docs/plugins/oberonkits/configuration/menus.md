---
title: "menus.yml"
description: "The frame, lore and buttons of the three menus. Kit names, icons and slots come from"
---

The frame, lore and buttons of the three menus. Kit names, icons and slots come from
[profiles.yml](/plugins/oberonkits/configuration/profiles/). All text is MiniMessage.

Placeholders in kit lore: `%kit%`, `%kit_display%`, `%uses%`, `%price%`, `%uses_per_buy%`.

## select — the kit menu

| Key | Meaning |
|---|---|
| `title`, `rows` | Menu title and height (1–6) |
| `filler` | Item in empty slots; `material: AIR` for none |
| `kit-button.name` | Name of each kit item |
| `kit-button.lore-free` | Lore of a free kit |
| `kit-button.lore-paid-owned` | Lore of a Stardust kit the player has uses for |
| `kit-button.lore-paid-buy` | Lore of a Stardust kit with no uses left |
| `kit-button.lore-locked` | Lore of a kit the player has no permission for |
| `kit-button.selected-glow` | The last kit glows |
| `locked-kits.show` | `false` hides kits without permission; otherwise they show as `locked-kits.material` |
| `buttons.random` | Random kit button (`enabled`, `slot`, `material`, `name`, `lore`) |
| `buttons.close` | Close button, off by default |
| `click.left`, `click.right`, `click.shift` | `equip`, `preview`, `layout` ([arrange the kit](/plugins/oberonkits/features/kit-layouts/)) or `none`. Shift-click (left or right) defaults to `layout` |

## preview

Rows 1–3 show the main inventory, row 4 the hotbar, row 5 armor and offhand, row 6 the buttons.

| Key | Meaning |
|---|---|
| `title` | `%kit_display%` works |
| `filler` | Empty slots |
| `buttons.back` | Back to the kit menu |
| `buttons.equip` | Equip this kit |
| `buttons.layout` | Opens the kit arranger; hidden when `kit-layouts.enabled` is `false` |

## layout — the kit arranger

Same rows as the preview; rows 1–4 can be rearranged. See [Arranging kits](/plugins/oberonkits/features/kit-layouts/).

| Key | Meaning |
|---|---|
| `title` | `%kit_display%` works |
| `filler` | Empty slots in rows 5–6 |
| `buttons.back` | Leaves without saving (back to the preview, or closes) |
| `buttons.reset` | Puts the kit's own order back in the arranger |
| `buttons.save` | Saves the order |
| `buttons.help` | An info item |

Servers updated from an older version keep their lore lines; add
`"<yellow>Shift-click</yellow> <gray>to arrange your hotbar"` to the `select.kit-button.lore-*` lists to show
the hint.

## confirm — buying a Stardust kit

| Key | Meaning |
|---|---|
| `title`, `rows`, `filler` | Frame |
| `info` | The item in the middle with the price and uses |
| `buttons.confirm` | Buys; `%price%` works in the name |
| `buttons.cancel` | Back to the kit menu |
