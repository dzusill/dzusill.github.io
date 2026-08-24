---
title: "Shop Files"
description: "Every file in shops/ is one category. The file name is the category id — shops/blocks.yml is the"
---

Every file in `shops/` is one category. **The file name is the category id** — `shops/blocks.yml` is the
category `blocks`, which is what `/shop blocks` opens and what an icon in `gui/maingui.yml` points at
with `action: blocks`.

Rename the file to rename the category.

## The shape

```yaml
gui-title: '&#C21807🛒 &#C21807&lBlocks Shop'
# Optional, all of them:
# required-permission: shop.category.blocks
# currency: money
# stock:  { enabled, max, restock: { mode, interval-minutes, amount, cap } }
# limit:  { enabled, amount, reset }
# sale:   { percent, from, to, label }

rows: 3
pages: 1

back-button:
  displayname: '&#C21807Back'
  material: RED_STAINED_GLASS_PANE
  slot: 18
  lore:
    - '&#C21807⏵ &7Click to return to main menu'

icons:
  previous-page-slot: 18
  previous-page:
    material: ARROW
    displayname: "&#C21807Back"
  next-page-slot: 26
  next-page:
    material: ARROW
    displayname: "&#C21807Next"

items:
  dirt:
    displayname: '&#C21807Dirt'
    material: DIRT
    price: 50
    page: 1
    slot: 9
    amount: 1
```

> **The back button and the previous-page arrow may share a slot** — every shipped file puts both at 18.
> That is not a conflict: on page 1 there is no previous page, so the slot means "back to the main menu";
> from page 2 onwards the same slot becomes "previous page", which is the only thing it could sensibly
> mean there.

## Item fields

| Field | |
|---|---|
| `material` | Bukkit material name. Required, even with `give-command` or `custom-item`. |
| `amount` | How many items one purchase unit hands over. Default 1. |
| `price` | A number, in this product's currency. |
| `page`, `slot` | Where it sits. Slots count from 0. |
| `displayname` | Leave it as `''` to keep the vanilla name, translated by each player's own client. |
| `lore` | A list of lines. |
| `enchant` | A list of `id:level` strings, or a map. On an `ENCHANTED_BOOK` these become stored enchants, which is where the game looks. |
| `effect`, `duration`, `amplifier` | Potion data. Duration in seconds; amplifier 0 is level I. |
| `firework-power` | Flight duration. |
| `glow` | The enchanted shimmer, without an enchantment. |
| `custom-model-data`, `item-flags`, `unbreakable` | Cosmetic. |
| `type` | `item` (default), `bundle` or `perk`. |
| `currency` | Overrides the category's. |
| `required-permission` | Gates this one product. |
| `quick-buy-amount`, `max-quantity` | Override the global settings. |
| `stock`, `limit`, `sale`, `dynamic` | See [Stock & Limits](/plugins/oberonshop/features/stock-and-limits/) and [Pricing & Sales](/plugins/oberonshop/features/pricing-and-sales/). |
| `custom-item` | See [Custom Items](/plugins/oberonshop/features/custom-items/). |
| `contents` | A bundle's outputs. |
| `commands`, `run-as` | A perk's commands. |
| `variants` | See [Variants](/plugins/oberonshop/features/variants/). |
| `give-command` | Runs instead of giving `material`. |
| `take-command` | Takes payment by command — read the warning below. |

### `give-command`

```yaml
    give-command: 'crates givekey %player% plasma-crate 1'
```

The material becomes display-only and the command runs as console on success. Placeholders: `%player%`,
`%player_name%`, `%uuid%`, `%amount%`, `%price%`. It runs **once per purchase**, with the quantity in
`%amount%` — running it 64 times for a purchase of 64 would hand out 64 separate crate keys.

A command that fails refunds the purchase. One that succeeds cannot be undone.

### `take-command`

> Payment by console command, for a currency with no API. **The balance cannot be checked and nothing can
> be refunded.** See [Currencies](/plugins/oberonshop/features/currencies/#command-currencies) before using it.

## Naming a category

Two rules, both checked at load with a message naming the file:

- **No underscore.** The placeholder form is `%oshop_price_<shop>_<product>%`, split on the first
  underscore, and product ids routinely contain one (`oak_log`). Use `-` for a two-word id.
- **Not `search`, `favorites`, `recent`, `popular` or `repeat`** — those are `/shop` subcommands, so such
  a category could never be opened.

## Templates

A file whose name starts with `_example` is written out but **not loaded**. Two ship:

- `_example_potions_enchants.yml` — potions, splash and lingering forms, enchanted books, cosmetic fields
- `_example_variants.yml` — every variant shape, the `generate:` shorthands, a bundle and a perk

Copy either to `shops/<id>.yml` to make it live.

## One bad item costs that item

A shop config is long and hand-edited. A mistyped material in one item out of a hundred and fifty costs
that item, not the category — every failure becomes a message naming the file and the key, and
`/adminshop doctor` lists them all.

## Deleting a category

Delete the file. It stays deleted — the shipped copies seed the folder on first run only, so nothing
comes back on the next reload.
