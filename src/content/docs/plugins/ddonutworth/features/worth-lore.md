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

Titles are matched leniently, because the title on screen is rarely the string you would type. Colours are
ignored — a gradient title carries a colour code *between every letter*, so `"Faction"` appears nowhere in
its raw form — and small-capital and lookalike letters fold to ordinary ones. Write `"Bounties"` and it
matches a GUI titled `ʙᴏᴜɴᴛɪᴇꜱ`, whichever of the several lookalike letters that
server happened to use.

`player-inventory: true` also decorates the player's own inventory while a container is open.

## Keeping it out of other plugins' GUIs

Other plugins build their menus as chest inventories. So the `CHEST` entry above — which every server
wants — would let their crate previews, kit selectors, bounty boards and auction houses in too, and worth
lines would appear on their buttons.

**That is handled for you, and on by default:**

```yaml
worth-lore:
  menus-need-title-match: true
```

A chest-shaped window with no block, entity or player behind it is another plugin's menu, and one of those
is only decorated when an `inventories` entry matches its **title**. Real chests, barrels, anvils and
crafting tables are untouched by the rule, and so is any GUI whose plugin gives its inventory a holder.

This is why `"Faction Chest"` is in the list above: a holder-less GUI that *does* hold real items — a
backpack, a player vault, a faction chest — earns its worth lines by being named.

**Name a GUI to exclude it.** Still there for the cases the rule above cannot see: a menu that does have a
holder, or a real container you would rather not price.

```yaml
worth-lore:
  excluded-inventories:
    - "Auction House"
    - "Crate Preview"
    - "Kit Selector"
```

A fragment is enough — `"Auction"` also catches `Auction House (Page 1/4)`. The two lists are weighed
against each other, **most specific entry winning**: a title beats a type name, and a longer title beats a
shorter one. So excluding `"Faction"` hides every faction menu while an allowed `"Faction Chest"` keeps its
worth lines. A tie goes to the exclusion.

**Or rule them all out at once:**

```yaml
worth-lore:
  only-real-containers: true
```

Decorates only inventories backed by a real container, entity or player, with no title escape hatch at all.
Off by default, because it also rules out the backpacks and player vaults `menus-need-title-match` lets you
keep by name.

This plugin's **own** menus need none of this: they are skipped automatically, so the prices GUI's arrows,
cauldron and hopper never pick up a worth line. The sell GUI is the one exception, and only for the slots
you drop items into.

## Containers count what they carry

```yaml
worth-lore:
  shulker-totals: true
```

A packed shulker box shows **one** figure covering everything the sale would hand over.

```
Shulker Box
Diamond ×3
Worth: $4,200          ← the diamonds; the box itself comes back
```

One number rather than two, because two lines left the player doing the addition themselves.

The figure follows [`selling.return-emptied-containers`](/plugins/ddonutworth/features/selling/#selling-a-full-container), which is on
by default: a container with something in it is sold for its contents and handed back, so its own price is
not part of the deal. Turn that off and the same box reads `$6,700` — `$2,500` for the box and `$4,200` of
diamonds — because then the box goes with them.

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

From [messages.yml](/plugins/ddonutworth/configuration/messages/):

```yaml
worth_lore: "<gray>Worth: <#00FC00>{price}"
worth_lore_total: "<gray>Total worth: <#00FC00>{price}"
```

What `{price}` shows depends on the delivery mode below.

## Two delivery modes

```yaml
worth-lore:
  mode: auto     # auto | packet | item
```

### Packet mode — recommended, needs ProtocolLib

Worth lines are added to the **copy of the item sent to the client**. The item on the server is never
touched. Because the tooltip is per viewer rather than part of the item, one line can show what the whole
stack is worth:

```
Diamond ×12          Diamond ×8
Worth: $120          Worth: $80
```

…and those two stacks still merge, because on the server they are identical plain diamonds.

The open window is re-sent after every click, drag, pickup and drop. Since 1.17 the client predicts the
result of an inventory action itself and the server only corrects it when the two disagree — and the
server's own items carry no lore for it to disagree about, so without that resync a moved or merged stack
would render with the wrong tooltip, or none.

Everything else that follows from not modifying items comes free: nothing to strip on close, on quit or at
shutdown, nothing left behind by a crash, no `/ddonutworth cleanup`, and hoppers, other plugins and your
save files all see items exactly as if this plugin were not installed.

Install [ProtocolLib](https://www.spigotmc.org/resources/1997/) and `auto` picks this by itself.

### Item mode — the fallback

Without ProtocolLib the line has to be written into the item, and lore is part of an item's identity. So it
can only show a **per-item** price: a line carrying the stack total would give a stack of 32 different lore
from a stack of 16, and Minecraft refuses to merge two stacks whose lore differs — split a stack of
diamonds and the pieces would not go back together.

`/worth hand` reports the stack total in this mode. If you would rather have the line itself show the whole
stack:

```yaml
worth-lore:
  show-stack-total: true
```

That reintroduces exactly the stacking problem described above, which is why it is off by default. In
packet mode the setting does nothing — the total is always shown, and stacks still merge.

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

### The anvil

An anvil builds its result by copying the left-hand item, **lore included**. In item mode that means the
result preview arrives carrying the *input's* worth line: combine a $1,000 pickaxe with a Fortune III book
and the preview would read $1,000 until something else touched it, then jump once you took it out. The
preview is therefore re-priced as it is prepared — the inherited line is replaced, not added to. In packet
mode the question never arises, because the item never carries the line in the first place.

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
