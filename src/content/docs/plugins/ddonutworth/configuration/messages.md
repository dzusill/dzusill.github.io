---
title: "messages.yml"
description: "Every user-facing string. Nothing is hard-coded."
---

Every user-facing string. Nothing is hard-coded.

## Colours

Three dialects work everywhere, and you can mix them in one line:

```yaml
worth_lore: "&7Worth: #00FC00${price}"          # legacy + bare hex
prefix: "<gray>[<#00F986>Worth<gray>] "         # MiniMessage
sold: "<gradient:#00F986:#00A3FB>+${price}"     # MiniMessage gradients
```

Bare hex (`#00F986`) and legacy codes (`&f`) are translated to MiniMessage before rendering. Anything
already inside a `<...>` tag is left alone, so a gradient's own hex is not mangled.

`<prefix>` expands to the `prefix` value.

## Keys

### Worth lore

These become item tooltip lines, not chat messages.

| Key | Tokens |
|---|---|
| `worth_lore` | `{price}` — already multiplied by stack size |
| `worth_lore_total` | `{price}` — a shulker box's contents total |

### Items and selling

| Key | Tokens |
|---|---|
| `items.sold` | `{price}` |
| `items.unsellable` | — |
| `items.worth` | `{item}`, `{price}` |
| `items.self_worth` | `{item}`, `{itemAmount}`, `{price}` |
| `items.gui_worth_lore` | `{price}` |
| `sell.summary` | `{price}`, `{amount}`, `{items}` |
| `sell.gui_summary` / `sell.gui_nothing` | `{price}`, `{amount}` |
| `sell.nothing` / `sell.hand_empty` | — |

### Multipliers

| Key | Tokens |
|---|---|
| `notifications.multiplier.rank_up` | `{category}`, `{playerMultiplier}`, `{tier}` — a **list**, sent line by line |

### Sell axe

`sellaxe.given` `{player}` `{duration}` · `sellaxe.received` `{duration}` · `sellaxe.sold` `{price}`
`{amount}` · `sellaxe.nothing` · `sellaxe.expired` · `sellaxe.invalid_duration` `{input}` ·
`sellaxe.disabled`

### GUI labels

```yaml
filters:
  ALL: "All"

sort_worth:
  HIGHEST_PRICE: "Highest Price"
  LOWEST_PRICE: "Lowest Price"
  NAME: "Name"

sort_history:
  RECENT: "Most Recent"
```

The other filter labels are your categories' own `display` values, so there is nothing to add here when
you add a category.

### Admin

`admin.worth_set` `{key}` `{price}` · `admin.worth_deleted` `{key}` · `admin.worth_not_set` `{key}` ·
`admin.reloaded` · `admin.cleaned` `{containers}` `{radius}` · `admin.hand_empty` ·
`admin.invalid_price` `{input}`

### Other

`world_blacklist` · `no_economy` · `worth_toggle_on` · `worth_toggle_off` · `history.empty` ·
`player_not_found` `{name}`

### Framework messages

`no-permission`, `players-only`, `console-only`, `unknown-command`, `invalid-usage` `{usage}`,
`invalid-number` `{input}`, `player-not-found` `{name}`, `reload-success`, `reload-failed`,
`command-error`.

## Lists

A key whose value is a list is sent as several lines. `notifications.multiplier.rank_up` ships that way;
any other key can be turned into a list the same way.

## Missing keys

A key you delete falls back to **the key name itself**, shown in game. That is deliberate — a typo is
visible rather than silently swallowed.
