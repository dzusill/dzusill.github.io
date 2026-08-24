---
title: "GUIs"
description: "Seven files in gui/. Every menu the plugin draws comes from one of them — titles, rows, slots,"
---

Seven files in `gui/`. Every menu the plugin draws comes from one of them — titles, rows, slots,
materials, model data, glow, lore, sounds.

| File | Menu |
|---|---|
| `maingui.yml` | The front page: one icon per category |
| `buy.yml` | The confirm screen |
| `variant.yml` | Defaults for every variant menu |
| `search.yml` | Search results |
| `favorites.yml` | Favourites |
| `recent.yml` | Recently bought |
| `popular.yml` | Popular items |

## Every icon takes the same fields

Learn it once and it means the same thing everywhere:

```yaml
  some_button:
    material: ARROW
    displayname: '&bNext'
    lore:
      - '&7Click to go to the next page'
    amount: 1
    slot: 26
    custom-model-data: 1001
    glow: false
    item-flags: [ HIDE_ENCHANTS ]
    sound: click
    permission: some.node
```

A block that names no material, or an unknown one, is skipped with a warning naming the key. A barrier
labelled "error" in the middle of your shop is not more helpful than an empty slot.

## Colours

GUI and shop files accept **three dialects at once**, and you can mix them in one line:

- legacy codes — `&7`, `&l`
- hex — `&#C21807`, or bare `#C21807`
- MiniMessage — `<gray>`, `<gradient:#C21807:#F11800>`

An existing MiniMessage tag is passed through untouched, so a gradient stays one working tag.

> `messages.yml` is the exception: it is **MiniMessage only**. See
> [Messages](/plugins/oberonshop/configuration/messages/).

## maingui.yml

```yaml
main-menu:
  title: '&#C21807🛒 &#C21807&lShop'
  rows: 3
  categories:
    blocks:
      displayname: '&#C21807Blocks'
      material: COBBLESTONE
      action: blocks          # the category this opens
      slot: 9
      lore:
        - '&#C21807⏵ &7Click to view the Blocks shop'
```

The **`action`** names the category, not the block key — so renaming the block does nothing and renaming
the action moves the icon to a different shop.

An optional `buttons:` section adds search, favourites, recent and balance icons to the same menu.

`gui.main-menu.hide-categories-without-permission: true` in `config.yml` hides icons a player cannot use
rather than showing them locked.

`/adminshop doctor` reports both halves of the commonest mistake here: a category file with no icon, and
an icon pointing at a category that does not exist.

## buy.yml

Every block is wired by its **`action:`** key:

| `action` | |
|---|---|
| `add1`, `add10`, `add64` | Raise the amount; `add64` goes to the maximum |
| `remove1`, `remove10`, `remove64` | Lower it; `remove64` goes to 1 |
| `custom` | Ask for a number |
| `max` | The most you can afford and carry |
| `confirm`, `cancel` | |

Two blocks are special: `item-purchase` is the item being bought, built from the catalog so it shows real
enchantments and potion data, with only its lore coming from this file. `balance` is optional and also
needs `gui.show-balance: true`.

Anything with an unrecognised action is placed as decoration — a filler pane, an info book — with no code
change.

Placeholders: `%price%`, `%unit-price%`, `%old-price%`, `%discount%`, `%currency%`, `%symbol%`,
`%balance%`, `%amount%`, `%clicked-item%`, `%clicked-name%`, `%clicked-amount%`, `%stock%`,
`%limit-remaining%`.

## variant.yml

Defaults every variant menu starts from, so a four-level potion tree does not need four styled menus. A
node in a shop file that sets its own `title` or `rows` wins; one that says nothing gets these.

`option-lore` is appended to every priced option's icon, which is where the "click to select / price"
half lives once. `%path%` shows the choices made so far.

## The four list files

Search, favourites, recent and popular share the category-file shape: `gui-title`, `rows`,
`icons.previous-page` / `next-page`, `back-button`. Products fill every row except the last, which is
navigation.

Each has an optional `empty:` icon shown when the list has nothing in it — an empty favourites menu
otherwise looks identical to a broken one.

## Filling empty slots

```yaml
fill:
  enabled: false
  material: "BLACK_STAINED_GLASS_PANE"
  display-name: ""
  slots: "0-8,9-17,18-26"
```

Ranges and single numbers, comma separated. One unparseable range costs that range, not the whole
expression.
