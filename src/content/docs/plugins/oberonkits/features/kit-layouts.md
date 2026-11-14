---
title: "Arranging kits"
description: "Players can put each kit's items where they want them once: sword on 1, pearls on 2, gapples on 9, and so on."
---

Players can put each kit's items where they want them once: sword on 1, pearls on 2, gapples on 9, and so on.
Every later time they get that kit, it comes in their order.

## How players use it

- **Shift-click** a kit in the kit menu, or click **Arrange this kit** in its preview, or run
  `/kits layout <kit>` from any world.
- The arranger looks like the preview: rows 1–3 are the inventory, row 4 is the hotbar. Click an item to pick
  it up, click a slot to put it down (or swap with the item there).
- Row 5 shows armor and offhand. They are worn, so they never move.
- **Save** keeps the order. **Reset** puts everything back in the kit's own order (save to keep that).
  **Back** leaves without saving.

The order is per player and per kit. A Stardust kit can be arranged before it is bought.

## What is saved

Only which slot each item goes to, never the items. The items in the arranger are copies that only exist there:

- only whole stacks move, and only inside rows 1–4 (no shift-click, number keys, offhand key, half stacks,
  dragging, dropping or double-click collecting);
- a copy left on the cursor disappears when the arranger closes;
- a copy found anywhere else is deleted on the spot.

The kit itself still comes from Essentials `kits.yml`, so a layout can never add, remove or split an item.

## When the kit changes

Each saved order is tied to the kit's contents. When an admin changes the kit (`/createkit`, or **Replace items**
in the [admin GUI](/plugins/oberonkits/features/admin-gui/)), the old order no longer matches. The kit is then given in its own order until
the player arranges it again. Items without a `slot:` in `kits.yml` keep landing in the first free slot.

A kit with two items on the same `slot:`, or an item line Essentials cannot read, cannot be arranged; players
are told to ask staff. Re-save it with `/createkit` (or **Replace items** in the admin GUI). A line with more
than a full stack (32 pearls) is shown as one stack in the arranger; the kit still gives all of them.

## Settings

```yaml
# config.yml
kit-layouts:
  enabled: true
```

`false` hides the button and the shift-click, and gives every kit in its own order (saved orders are kept for
when it is switched back on). The node is `oberonkits.layout` (everyone by default). The arranger's title,
buttons and filler are under `layout:` in [menus.yml](/plugins/oberonkits/configuration/menus/), its texts under `layout.*` in
[messages.yml](/plugins/oberonkits/configuration/messages/). The shift-click action is `select.click.shift`.
