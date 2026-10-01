---
title: "gui.yml"
description: "The claim storage menu — what /afkrewards opens. Everything a player sees"
---

The claim storage menu — what [`/afkrewards`](/plugins/oberonafk/reference/commands/) opens. Everything a player sees
in it comes from this file; the code only decides what a click does. Messages the menu sends
(*claimed*, *inventory full*) are in [`messages.yml`](/plugins/oberonafk/configuration/messages/#claim).

## Layout

| Key | Default | Meaning |
|---|---|---|
| `title` | `⌛ AFK Rewards (page/pages)` | MiniMessage. `{page}` `{pages}` `{count}` work |
| `rows` | `6` | 2 to 6 |
| `content-slots` | empty | Which slots show stored items, in order. Empty uses every row above the bottom one |
| `item-lore` | a "Click to claim" hint | Lines added under each stored item's own lore |
| `filler` | black glass, bottom row | The background — see below |
| `items` | the buttons | See below |
| `decorations` | none | Extra items in fixed slots |

A framed window:

```yaml
rows: 6
content-slots: [ "10-16", "19-25", "28-34", "37-43" ]
```

Slots are always written the same way: a number (`49`), a range (`"45-53"`), or a list mixing both. A
slot outside the menu is dropped instead of breaking it, and `-1` hides an item.

## The keys every item takes

| Key | Meaning |
|---|---|
| `material` | The item. Blank switches it off |
| `slot` / `slots` | Where it goes |
| `name`, `lore` | MiniMessage; `{page}` `{pages}` `{count}` work |
| `amount` | Stack size shown (1-64) |
| `custom-model-data` | For resource-pack models. `-1` means none |
| `glow` | `true` adds an enchantment shimmer |
| `flags` | Item flags, e.g. `[ HIDE_ATTRIBUTES ]` |
| `sound` | An alias from [`sounds.yml`](/plugins/oberonafk/configuration/sounds/) played on a click. Blank for none |

## Buttons

| Button | Shown | Does |
|---|---|---|
| `previous`, `next` | When there is a page that way | Changes page |
| `claim-all` | When something is waiting | Takes everything that fits |
| `empty` | While nothing is waiting | Informs |
| `info` | When given a slot (off by default) | Informs |
| `close` | When given a slot (off by default) | Closes the menu |

`previous` and `next` take an `unavailable:` section — its own `material`, `name`, `lore` and optionally
`slot` — shown in the same slot on the first or last page instead of nothing:

```yaml
previous:
  material: ARROW
  slot: 45
  name: "Back"
  unavailable:
    material: GRAY_STAINED_GLASS_PANE
    name: "<#7E7E7E>No previous page"
```

## filler

```yaml
filler:
  item: BLACK_STAINED_GLASS_PANE
  name: " "
  slots: bottom-row     # bottom-row | all | a list such as [ "0-8", "45-53" ]
```

The filler is placed last, so it only covers slots nothing else uses. Blank `item` shows none.

## decorations

As many items as you like, any names, each with the keys above. They are drawn before the buttons, so a
button in the same slot wins.

```yaml
decorations:
  border:
    material: RED_STAINED_GLASS_PANE
    name: " "
    slots: [ "0-8" ]
```

## It cannot be abused

The menu is take-only no matter what the file says: clicking, dragging, shift-clicking from the player's
inventory and double-click collecting are all refused, and the size an open menu was built with is
kept until it closes — a reload to fewer rows cannot leave the lower rows of someone's open menu
clickable. See [Delivery and the claim storage](/plugins/oberonafk/features/delivery-and-storage/#the-claim-storage).
