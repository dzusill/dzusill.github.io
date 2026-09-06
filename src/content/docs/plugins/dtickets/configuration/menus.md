---
title: "menus.yml"
description: "Every screen the plugin opens is defined here. Eight menus plus one shared block:"
---

Every screen the plugin opens is defined here. Eight menus plus one shared block:

| Key | Screen |
|---|---|
| `Action-Icons` | shared iconography the other menus reference |
| `Ticket-Hub` | what a player sees on `/ticket` |
| `Category-Picker` | the first screen of the creation wizard |
| `Ticket-Detail` | one ticket: its thread, its actions |
| `Admin-Queue` | the staff queue on `/tickets` and `/reports` |
| `Punish` | the punishment action list |
| `Confirm` | the "are you sure" step |
| `Notifications` | per-staffer alert preferences |
| `Stats` | the statistics screen |

## Action-Icons first

`Action-Icons` is not a menu. It is the shared definition of the buttons that appear across several
screens — claim, reply, close, priority, teleport and the rest — so a change to the close button's
material or name happens once instead of in four menus.

Read it before editing any individual menu, or you will spend time hunting for a button that is not
defined where you expect.

## Structure

Each menu follows the DzusillCore GUI schema: a title, a size, and items placed by slot, each with a
material, a name, lore, and the action it performs. It is the same schema every dzusill plugin's GUI
files use.

Slots are zero-indexed from the top-left. A single-chest menu is 0–53.

## What you can safely change

- titles, item names and lore — free rein, MiniMessage throughout
- materials — any valid `Material` name
- slot positions and menu size
- removing a button, if you do not want that action available at all

## What to be careful with

- **Removing a button does not remove the permission.** The action may still be reachable by command.
  Gate it with the permission node instead if you want it actually gone.
- **An invalid material stops the item rendering**, and the menu opens with a hole in it. `/dtickets
  status` reports config problems after a reload.
- **Placeholders in lore** are resolved per ticket. A placeholder that does not exist renders as
  itself, which looks like a bug to your players.

## Live reloading

```
/dtickets reload
```

Menus are rebuilt from the file. A player with a menu already open keeps the old one until they close
and reopen it — the reload does not reach into an open inventory.

## Icons per category

Category icons are not here; they live on the category in `config.yml`:

```yaml
Categories:
  general_support:
    Icon: PAPER
```

That is deliberate — a new category should need one edit, not two.
