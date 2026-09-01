---
title: "gui.yml"
description: "The chest-menu rendering of the choice screen. Only read when Choice.Screen: GUI — on every other setting the file sits there unused."
---

The chest-menu rendering of the choice screen. **Only read when `Choice.Screen: GUI`** — on every other setting the file sits there unused.

It ships regardless, so switching the setting on does not mean restarting twice to get a file to edit.

## The file

```yaml
Title: "<dark_red><bold>Choose your fate</bold></dark_red>"
Size: 27

Modes:
  HARDCORE:
    Slot: 11
    Material: NETHER_STAR
    Name: "<dark_red><bold>%hardcore%</bold></dark_red>"
    Lore:
      - "<gray>One life."
      - "<gray>Die and you are locked out for <white>%duration%</white>."
      - ""
      - "<yellow>Click to choose</yellow>"
  LIFESTEAL:
    Slot: 13
    Material: REDSTONE
    Name: "<red><bold>%lifesteal%</bold></red>"
    Lore: [...]
  NORMAL:
    Slot: 15
    Material: GRASS_BLOCK
    Name: "<green><bold>%normal%</bold></green>"
    Lore: [...]

Filler:
  Material: GRAY_STAINED_GLASS_PANE
  Name: " "

Confirm:
  Title: "<dark_red><bold>Are you certain?</bold></dark_red>"
  Size: 27
  Yes: { Slot: 11, Material: LIME_CONCRETE, Name: "<green><bold>I accept my fate</bold></green>" }
  No:  { Slot: 15, Material: RED_CONCRETE,  Name: "<gray>Take me back</gray>" }
  Filler:
    Material: BLACK_STAINED_GLASS_PANE
    Name: " "
```

| Key | Meaning |
|---|---|
| `Title` | MiniMessage. Hex colours survive — the menu is opened with the RGB-capable legacy form, not flattened to the old sixteen. |
| `Size` | Rows × 9. Must be a multiple of 9 between 9 and 54; anything else falls back to 27. |
| `Modes.<MODE>.Slot` | 0-indexed. A slot outside the inventory is ignored rather than throwing. |
| `Modes.<MODE>.Material` | Any Bukkit material name. One that does not exist on this server version falls back to the built-in default instead of leaving a hole. |
| `Filler` | Fills every slot the modes do not use. `Material: AIR` for a bare chest. |
| `Confirm.*` | The second screen. Never opened when `Choice.Confirm-Hardcore` / `Confirm-Lifesteal` are off. |

## Placeholders

The same set the dialog text uses, in names and lore alike:

`%player%` `%hardcore%` `%lifesteal%` `%normal%` `%duration%` `%starting_hearts%`

The confirmation screen additionally has `%mode%` — the mode about to be committed.

## Modes that are not offered

**Nothing to configure.** A mode the server does not offer — lifesteal switched off, or its max-health attribute unavailable on this server version — has its slot left empty. It is never drawn and never refuses a click.

That means a three-mode layout stays correct on a two-mode server; the middle slot is simply filler.

## Closing it

A player who still owes an answer and closes the menu gets it back **on the next tick**.

A chest inventory has no equivalent of the dialog's `can_close_with_escape=false`, and escape is the first thing a player does with a menu they did not expect. The reopen counts against `Choice.Max-Reask-Attempts` like any other, so someone who genuinely cannot use it is not trapped in a loop.

The reopen is deliberately one tick later, not inside the close event — Bukkit ignores an inventory opened from inside `InventoryCloseEvent`, which would leave the player with nothing at all.

## The lock exemption

[The lock](/plugins/dfate/features/the-lock/) cancels inventory opens for unchosen players, and an unchosen player is exactly who this menu is for.

dFate exempts its own two menus by inventory holder. Every other container — chests, furnaces, shulkers, other plugins' menus — is still refused while a player owes an answer. There is no setting for this and there should not be: a switch that turned it off would be a switch that stops the GUI opening.

## Related

- [The Choice](/plugins/dfate/features/the-choice/#where-it-is-drawn) — all three surfaces side by side
- [config.yml → Choice.Screen](/plugins/dfate/configuration/config/#choicescreen) — the key that selects this one
