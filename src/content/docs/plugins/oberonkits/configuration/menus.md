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
| `click.left`, `click.right` | `equip`, `preview` or `none` |

## preview

Rows 1–3 show the main inventory, row 4 the hotbar, row 5 armor and offhand, row 6 the buttons.

| Key | Meaning |
|---|---|
| `title` | `%kit_display%` works |
| `filler` | Empty slots |
| `buttons.back` | Back to the kit menu |
| `buttons.equip` | Equip this kit |

## confirm — buying a Stardust kit

| Key | Meaning |
|---|---|
| `title`, `rows`, `filler` | Frame |
| `info` | The item in the middle with the price and uses |
| `buttons.confirm` | Buys; `%price%` works in the name |
| `buttons.cancel` | Back to the kit menu |
