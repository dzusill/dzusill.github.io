---
title: "Worth Lore"
description: "Items show what they are worth in their own tooltip:"
---

Items show what they are worth in their own tooltip:

```
Diamond
Worth: $250
```

No command, no GUI — players see it while they play.

## Where it appears

```yaml
worth-lore:
  enabled: true
  player-inventory: true
  inventories:
    - CHEST
    - BARREL
    - ENDER_CHEST
    - FURNACE
    - "Faction Chest"
```

An entry in `inventories` is matched **two ways**, so either style works:

- an **`InventoryType` name** — `CHEST`, `BARREL`, `FURNACE`, `CRAFTING`, `MERCHANT`… Exact, and the robust
  choice: it needs no access to the inventory's title at all.
- **any part of the title** — for custom GUIs from other plugins, e.g. `"Faction Chest"` also matching
  `Faction Chest: 1`.

`player-inventory: true` also decorates the player's own inventory while a container is open.

## Shulker box totals

```yaml
worth-lore:
  shulker-totals: true
```

A packed shulker box shows the summed worth of everything inside it:

```
Shulker Box
Worth: $1,200
Total worth: $46,800
```

The contents are read from the item itself, so this works for a box in a chest, in a GUI or in the player's
hand — no placed block involved. Nested boxes are counted through, two levels deep.

## Letting players turn it off

```
/toggleworth
```

Per player, persisted, and it takes effect immediately rather than at the next inventory close. Set
`worth-lore.allow-toggle: false` to make the lore mandatory.

## The format

From [messages.yml](/plugins/ddonutworth/configuration/messages/):

```yaml
worth_lore: "&7Worth: #00FC00${price}"
worth_lore_total: "&7Total worth: #00FC00${price}"
```

`{price}` is already multiplied by the stack size, so a stack of 64 shows what the stack is worth.

## How it stays reversible

This is the part that most implementations get wrong, so it is worth explaining.

Only the **number** of injected lines is recorded, in the item's persistent data. The item's own lore is
left exactly as it was, and the extra lines are truncated off the end again on removal. The alternative —
serialising the original lore and writing it back — loses formatting and hover data on every round trip,
and is how lore ends up duplicated and mangled.

Lore is removed:

- when the container is closed,
- after any click or drag, before the item can go anywhere,
- when a hopper or dispenser pulls an item out,
- when an item is dropped,
- when the player disconnects, *before* their inventory is written to disk,
- on join, catching anything a crash left behind,
- on plugin shutdown or reload.

After a click the whole view is stripped and re-stamped a tick later rather than guessing where the clicked
item went. Whatever the click did — swap, shift-click, hotbar swap, a nine-slot drag — the state a tick
later is clean and then freshly stamped.

## The one gap, and the fix for it

If the server **crashes while a container is open**, the items inside keep their worth line and nothing
will reopen that container to clean it. For that case:

```
/ddonutworth cleanup [radius]
```

Strips leftover lore from your inventory, your ender chest, and every container within `radius` blocks
(default 8, max 32).

## Performance

Worth lookups are cached, and a shulker's contents are only summed for boxes that actually contain
something. If you would rather not decorate at all:

```yaml
worth-lore:
  enabled: false
```

The listener is then never registered.
