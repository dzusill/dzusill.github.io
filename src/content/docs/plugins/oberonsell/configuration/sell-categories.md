---
title: "Sell Categories"
description: "One file per category, in sell/. Each owns everything about itself: how it looks on the multiplier"
---

One file per category, in `sell/`. Each owns **everything** about itself: how it looks on the multiplier
page, which items belong to it, and its tier ladder.

Nine ship configured: `ores`, `crops`, `blocks`, `mobdrops`, `naturalitems`, `fish`, `potions`,
`enchantedbooks`, `armorandtools`.

## The file

```yaml
display: '#00F986ᴏʀᴇs'
material: DIAMOND
slot: 12

lore:
  - '&7Sell ores and mining materials to'
  - '&7upgrade your sell multiplier!'
  - ''
  - '&7Multiplier: #00F986{playerMultiplier}'
  - '&7Progress to &f{nextProgress}'
  - '&f{progressBar}{progressBarCompletedPercentage}'

matches:
  - "*_ORE"
  - RAW_IRON
  - DIAMOND

progress:
  title: ᴏʀᴇs ᴘʀᴏɢʀᴇss
  layout:
    - '-c-----(20)-'
    - '-(1)-(9)(10)(11)-(19)-'
    - '-(2)-(8)-(12)-(18)-'
    - '-(3)-(7)-(13)-(17)-'
    - '-(4)(5)(6)-(14)(15)(16)-'
    - 'b--------'
  requirements:
    '1': { multiplier: 1.1, price: 25000 }
    '2': { multiplier: 1.2, price: 150000 }
```

| Key | What it does |
|---|---|
| `display` | Name on the overview page and on the prices-GUI filter |
| `material` | Icon material |
| `slot` | Where it sits on the overview page (`-1` hides it) |
| `lore` | Icon lore, with the tokens below |
| `matches` | Which items belong here |
| `progress.title` | Title of this category's own page |
| `progress.layout` | The tier grid |
| `progress.requirements` | The ladder |

## matches

Item keys with `*` as a wildcard, matched case-insensitively:

```yaml
matches:
  - "*_ORE"              # every ore
  - "*_SWORD"            # every sword
  - "mmoitems:SWORD/*"   # every MMOItems sword
  - DIAMOND              # exactly this
```

Patterns are matched against the item's [keys](/plugins/oberonsell/features/item-keys/), so
`"ENCHANTED_BOOK*"` catches `ENCHANTED_BOOK[mending=1]` too.

**This same list drives the category filter in the item-prices GUI**, so there is one set of categories
rather than two unrelated taxonomies to keep in sync.

### Precedence

When two categories could claim an item, the one listed **earlier in `config.yml`'s
`multipliers.categories`** wins. That is why the shipped order puts `ores` before `blocks` — an iron block
counts as an ore, not a building block.

A more *specific* key always beats category order, though: an MMOItems sword lands in whichever category
claims `mmoitems:*`, even if an earlier category claims `*_SWORD`.

## The progress layout

Each row is **nine tokens**, one per inventory slot:

| Token | Slot shows |
|---|---|
| `(n)` | tier `n` |
| `c` | this category's summary icon |
| `b` | a back button |
| `-` | filler |

`(20)` is one token, not four characters. The inventory's height comes from the number of rows, so a
shorter ladder needs no other change — three rows gives a 27-slot menu.

Tier icons render as unlocked / in progress / locked, styled in [gui/multipliers.yml](/plugins/oberonsell/configuration/guis/).

## The ladder

```yaml
requirements:
  '1': { multiplier: 1.1, price: 25000 }
  '2': { multiplier: 1.2, price: 150000 }
```

`price` is the cumulative money the player must have sold **into this category**. Levels are sorted
numerically, so tier 10 comes after tier 2 rather than before it. A tier missing `price` is skipped with
the rest of the ladder intact.

Tiers are high-water marks — see [Sell Multipliers](/plugins/oberonsell/features/sell-multipliers/) for what that
guarantees when you edit a ladder.

## Tokens

| Token | Value |
|---|---|
| `{category}` | display name |
| `{tier}` / `{maxTier}` | current and highest tier |
| `{multiplier}` / `{playerMultiplier}` | current multiplier, bare and with an `x` |
| `{money}` | money sold into this category |
| `{progressBar}` | the bar, per `multipliers.progress-bar` |
| `{progressBarCompletedPercentage}` | e.g. `42%` |
| `{nextProgress}` | money needed for the next tier, or `Max` |
| `{nextTier}` / `{nextMultiplier}` | the next rung, or `Max` |
| `{required}` | that tier's requirement — tier icons only |

Progress is measured **across the current rung**, not from zero, so a bar fills at a useful rate instead of
crawling for the first nineteen tiers.

## Adding a category

1. Create `sell/mycategory.yml` — copy an existing one.
2. Add `mycategory` to `multipliers.categories` in `config.yml`, in the position you want its precedence.
3. Give it a free `slot` on the overview page.
4. `/oberonsell reload`.

Removing one is the same in reverse. `matches` and `progress.requirements` are ignored sections, so
entries you delete stay deleted.
