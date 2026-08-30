---
title: "messages.yml"
description: "Every user-facing string. Nothing is hard-coded."
---

Every user-facing string. Nothing is hard-coded.

## Colours

```yaml
prefix: "<#00F986>ᴡᴏʀᴛʜ <dark_gray>» <white>"
worth_lore: "<gray>Worth: <#00FC00>${price}"
```

All three dialects work here: MiniMessage (`<gray>`, `<#00FC00>`), legacy codes (`&7`), and bare hex
(`#00FC00`). Mix them freely in the same line — every message, chat and action bar alike, goes through the
same converter as `gui/*.yml` and `sellaxe.yml` before it reaches a player.

Full syntax reference: [docs.advntr.dev/minimessage](https://docs.advntr.dev/minimessage/format.html).

`<prefix>` expands to the `prefix` value.

> `{price}` is already formatted by this plugin and by your economy, and may include a currency symbol.
> Writing your own `$` in front of it is how you end up with `$$10`.

## Chat, action bar and disabling messages

Message text stays here. Its delivery is controlled by the `Presentation` block in
[`config.yml`](/plugins/oberonsell/configuration/config/#presentation). Set a category once, or override any exact key:

```yaml
Presentation:
  Categories:
    SALE:
      Channel: BOTH
  Overrides:
    items.sold:
      Channel: ACTION_BAR
    sellaxe.nothing:
      Channel: NONE
```

Channels are `CHAT`, `ACTION_BAR`, `BOTH` and `NONE`. Sale messages ship as `BOTH`; they include the
payout and item count. Changes are live after `/oberonsell reload`.

## Keys

### Worth lore

This becomes an item tooltip line, not a chat message.

| Key | Tokens |
|---|---|
| `worth_lore` | `{price}` — the item plus anything it carries, whole stack included. `worth-lore.show-stack-total: false` prices one item instead |

There is no separate "total" key. One line carries the sum.

### Items and selling

| Key | Tokens |
|---|---|
| `items.sold` | `{price}`, `{amount}` |
| `items.unsellable` | — |
| `items.worth` | `{item}`, `{price}` |
| `items.self_worth` | `{item}`, `{itemAmount}`, `{price}` |
| `items.gui_worth_lore` | `{price}` — the line added to items inside the prices GUI |
| `sell.summary` | `{price}`, `{amount}`, `{items}` |
| `sell.gui_summary` | `{price}`, `{amount}`, `{items}` |
| `sell.gui_nothing` | — |
| `sell.nothing` / `sell.hand_empty` | — |
| `world_blacklist` | — |
| `gamemode_blocked` | `{gamemode}` |
| `no_economy` | — |

### Multipliers

| Key | Tokens |
|---|---|
| `notifications.multiplier.rank_up` | `{category}`, `{playerMultiplier}`, `{tier}` — a **list**, sent line by line |

### Sell axe

`sellaxe.given` `{player}` `{duration}` · `sellaxe.received` `{duration}` · `sellaxe.sold` `{price}`
`{amount}` · `sellaxe.nothing` · `sellaxe.expired` · `sellaxe.invalid_duration` `{input}` ·
`sellaxe.disabled`

### Search

`search.chat_prompt` · `search.applied` `{search}` · `search.cleared`

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
`admin.reloaded` · `admin.reload_restart_required` `{settings}` · `admin.cleaned` `{containers}`
`{radius}` · `admin.hand_empty` · `admin.invalid_price` `{input}` · `admin.multiplier_reset` `{player}`
`{category}` `{multiplier}` · `admin.multiplier_reset_all` `{player}` `{categories}` ·
`admin.multiplier_reset_nothing` `{player}` · `admin.multiplier_reset_disabled` ·
`admin.multiplier_reset_unknown_category` `{category}`

### Other

`worth_toggle_on` · `worth_toggle_off` · `history.empty` · `top.empty` · `player_not_found` `{name}` ·
`auto-sell.enabled` / `.disabled` `{state}` · `auto-sell.unavailable` · `auto-sell.sold` `{price}`
`{money}` `{amount}`

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
