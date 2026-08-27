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

`inventories` is a **whitelist**: only what it matches gets worth lore. An inventory matching nothing on it
gets none, and an empty list means no worth lore anywhere. It is not a list of exceptions — it is the whole
set.

An entry is matched **two ways**, so either style works:

- an **`InventoryType` name** — `CHEST`, `BARREL`, `FURNACE`, `CRAFTING`, `MERCHANT`… Exact, and the robust
  choice: it needs no access to the inventory's title at all.
- **any part of the title** — for custom GUIs from other plugins, e.g. `"Faction Chest"` also matching
  `Faction Chest: 1`.

`player-inventory: true` also decorates the player's own inventory while a container is open.

## Keeping it out of other plugins' GUIs

Other plugins build their menus as chest inventories. So the `CHEST` entry above — which every server
wants — necessarily lets their crate previews, kit selectors and auction houses in too, and worth lines
appear on their buttons.

Two ways to stop that.

**Name the GUI.** Checked before the allow list and wins over it, matched the same two ways (an
`InventoryType` name, or any fragment of the title):

```yaml
worth-lore:
  excluded-inventories:
    - "Auction"
    - "Crate"
    - "Kit"
    - "Shop"
    - "Vault"
    - "Backpack"
```

A fragment is enough — `"Auction"` also catches `Auction House (Page 1/4)`.

Those six ship as the default because they are the GUI names most servers turn out to have. They are a
**starting point, not a detected list** — check them against your own server. Two things to watch, because
both bite quietly:

- A fragment matches anywhere in the title, so a short one is blunt. `"Shop"` also matches `Workshop`;
  `"Kit"` also matches `Kitchen`. If you have a real container named that way, lengthen the fragment or
  drop the line.
- An entry here hides worth with **no message and no error**. If worth lore is missing somewhere you
  expected it, this list is the first place to look.

To add your own: open the GUI, read its title off the screen, add a distinctive part of it,
`/dsell reload`.

**Or rule them all out at once:**

```yaml
worth-lore:
  only-real-containers: true
```

Decorates only inventories backed by a real container, entity or player. Another plugin's menu normally
has no holder at all, so this catches every one of them with nothing to maintain. Off by default because
a few storage plugins — player vaults, backpacks — also build holder-less inventories, and those hold
real items whose worth is worth showing.

This plugin's **own** menus need neither: they are skipped automatically, so the prices GUI's arrows,
cauldron and hopper never pick up a worth line. The sell GUI is the one exception, and only for the slots
you drop items into.

## Containers count what they carry

```yaml
worth-lore:
  shulker-totals: true
```

A packed shulker box shows **one** figure: the box plus everything inside it.

```
Shulker Box
Diamond ×3
Worth: $6,700          ← $2,500 for the box, $4,200 of diamonds
```

One number rather than two, because two lines left the player doing the addition themselves. There is no
separate "total" line and no second message key — the single `worth_lore` line already carries the sum.

The setting governs the **tooltip and the payout together**, deliberately. Letting them disagree is how a
shulker box came to advertise its contents and then sell for the price of an empty box.

This is not limited to shulkers. Any container stored as an item counts its contents the same way — a
chest, barrel, hopper or dispenser given with items in it — and so do bundles. Contents are read from the
item itself, so it works for one in a chest, in a GUI or in the player's hand, with no placed block
involved. Nesting is followed a few levels deep, so a box of boxes adds up.

Set it to `false` to show only what the item itself is worth, ignoring anything inside.

## Letting players turn it off

```
/toggleworth
```

Per player, persisted, and it takes effect immediately rather than at the next inventory close. Set
`worth-lore.allow-toggle: false` to make the lore mandatory.

## The format

One key, in [messages.yml](/plugins/dsell/configuration/messages/):

```yaml
worth_lore: "<gray>Worth: <#00FC00>${price}"
```

`{price}` is everything the item is worth — the item itself plus anything it carries — and it always covers
the **whole stack**: 12 diamonds read one figure, 8 read another.

## Needs ProtocolLib

Worth lore has exactly one way of working, and it needs [ProtocolLib](https://www.spigotmc.org/resources/1997/):
the line is added to the **copy of the item sent to the client**. The item on the server is never touched.

```
Diamond ×12          Diamond ×8
Worth: $120          Worth: $80
```

Those two stacks still merge, because on the server they are identical plain diamonds — nothing about them
differs, only what one particular viewer is shown. That is also why nothing needs stripping on close, on
quit or at shutdown, nothing is left behind by a crash, and hoppers, other plugins and your save files all
see items exactly as if this plugin were absent.

The open window is re-sent after every click, drag, pickup and drop. Since 1.17 the client predicts the
result of an inventory action itself and the server only corrects it when the two disagree — and the
server's own items carry no lore for it to disagree about, so without that resync a moved or merged stack
would render with the wrong tooltip, or none.

**Without ProtocolLib installed, this is the one feature that does not work.** Nothing else does — selling,
pricing, every menu and command run exactly the same. The plugin logs why once at startup, and
`/dsell doctor` reports it too. There is no fallback mode to fall back to: install ProtocolLib, or
turn the feature off explicitly with `worth-lore.enabled: false` to stop asking for it.

## Why nothing needs reversing

Most implementations of this feature get it wrong by writing the line into the real item and then having
to clean it up again afterwards. This one does not, because the line is never written into a real item in
the first place — only into the copy of the item a packet carries to one viewing client. The server's own
copy is untouched from the moment the item is created to the moment it is destroyed, so there is nothing to
strip on close, on quit, at shutdown, or after a crash, and no truncated-lore or duplicated-lore failure
mode for a hand-typed template to trigger.

### The one place a real item can still pick up a line

A creative client is authoritative over its own inventory: when it moves an item, it hands the server back
its **own copy** — lore included, since the client rendered that lore itself from the packet it was sent.
Left alone, the server would store that copy for real, and the next packet would decorate it a second time.
This is caught and stripped as the item comes back, on every version, so it is not something you need to
watch for — but if a build ever slips past it (or an item survived from before this fix), a marker on the
line itself, not the item's own data, is what lets it be found and removed regardless: `/dsell cleanup`
strips it from your inventory, your ender chest, and every container within `radius` blocks (default 8, max
32) even when nothing else about the item says it is ours.

```
/dsell cleanup [radius]
```

### The anvil

An anvil builds its result by copying the left-hand item, lore included — including from a real item that
picked up a line the way described above. The anvil-result path is re-priced the same way anything else
carrying a stray line would be, rather than trusting whatever the copy inherited.

## Performance

An item already carrying the right line is recognised by a stamped fingerprint and returned untouched, so
the steady state allocates nothing, and a shulker's contents are only summed for boxes that actually
contain something. There is nothing running on a timer — the packet hook only ever does work on the
packets a player's own client actually triggers.

If you would rather not decorate at all:

```yaml
worth-lore:
  enabled: false
```

The hook is then never registered.
