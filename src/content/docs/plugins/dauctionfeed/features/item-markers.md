---
title: "Item Markers"
description: "How players tell a server listing from a player one."
---

How players tell a server listing from a player one.

```yaml
marker:
  mode: LORE
  lore:
    - ""
    - "<gold>✦ <yellow>Daily Offer</yellow> <gold>✦"
  strip-on-purchase: true
```

## Modes

| Mode | Behaviour |
|---|---|
| `LORE` *(default)* | The lines above are added to the listed item. |
| `NONE` | No marker on the item. The rotating seller names and the restock broadcast already signal it. |

Lines are MiniMessage, and are rendered non-italic — vanilla renders lore italic by default, which makes an added
line look like a mistake rather than a label.

## Stripping

```yaml
strip-on-purchase: true
```

This one matters more than it looks.

Lore makes a stack **distinct**. Sixty-four marked diamonds will not merge with the sixty-four plain ones already
in the buyer's inventory — an irritation on every bulk purchase, forever, and the kind of thing that generates
support tickets months later.

With stripping on, the marker (and the hidden tag behind it) is removed once the item reaches the buyer, so what
they walk away with is an ordinary stack. The auction house stays clearly labelled; the item does not stay
branded.

### When it happens

AxAuctions decides how a bought item reaches its buyer — straight into the inventory, or parked in a claim window
they open days later. So the sweep runs on all three of:

- a few ticks after a purchase,
- when a player closes any inventory,
- when a player joins.

Each sweep walks at most 45 slots and only touches items carrying the plugin's tag, so it is cheap enough to run
on all three.

## The hidden tag

Beyond the lore, every seeded item carries a persistent-data tag naming its batch. That is the useful half: it is
how the plugin recognises its own items later, without comparing lore text that you are free to rewrite mid-season.

The number of lore lines added is recorded **alongside** the tag rather than inferred at strip time. Rewriting
`marker.lore` between a restock and a purchase would otherwise have the wrong number of lines stripped, quietly
eating a line of the item's own lore.

With `mode: NONE` the tag is still applied — the marker is what players see, the tag is what the plugin uses.
