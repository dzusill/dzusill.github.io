---
title: "messages.yml"
description: "Every user-facing string. Nothing is hard-coded."
---

Every user-facing string. Nothing is hard-coded.

## Colours

**This file is MiniMessage only.**

```yaml
prefix: "<#00F986>ᴡᴏʀᴛʜ <dark_gray>» <white>"
worth_lore: "<gray>Worth: <#00FC00>{price}"
```

Legacy codes (`&7`) and bare hex (`#00F986`) are **not** translated here. They do not colour anything —
they print, and the player sees the markup. Write `<gray>` and `<#00F986>` instead.

That is a real difference from the other files: `gui/*.yml` and `sellaxe.yml` accept all three dialects and
you can mix them freely, because those strings go through this plugin's own converter. Chat goes through
the framework's message service, which hands the string straight to MiniMessage.

Full syntax reference: [docs.advntr.dev/minimessage](https://docs.advntr.dev/minimessage/format.html).

`<prefix>` expands to the `prefix` value.

> `{price}` is already formatted by this plugin and by your economy, and may include a currency symbol.
> Writing your own `$` in front of it is how you end up with `$$10`.

## Keys

### Worth lore

This becomes an item tooltip line, not a chat message.

| Key | Tokens |
|---|---|
| `worth_lore` | `{price}` — the item plus anything it carries; the whole stack in packet mode |

There is no separate "total" key. One line carries the sum.

### Items and selling

| Key | Tokens |
|---|---|
| `items.sold` | `{price}` |
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

`worth_toggle_on` · `worth_toggle_off` · `history.empty` · `player_not_found` `{name}`

### Framework messages

`no-permission`, `players-only`, `console-only`, `unknown-command`, `invalid-usage` `{usage}`,
`invalid-number` `{input}`, `player-not-found` `{name}`, `reload-success`, `reload-failed`,
`command-error`.

## Keys the plugin uses that the shipped file is missing

Five keys are read by the code but are **not present in the shipped `messages.yml`**, so they currently
render as their own key name in game. Add them by hand:

```yaml
auto-sell:
  enabled: "<prefix><white>Auto-sell is now <#00F986>on<white>."
  disabled: "<prefix><white>Auto-sell is now <red>off<white>."
  unavailable: "<prefix><red>Auto-sell is disabled on this server."
  # {money} and {price} are the same payout; {amount} is the units sold
  sold: "<prefix><white>Auto-sold <#00A3FB>{amount}<white> for <#00FB00>{price}<white>."

top:
  empty: "<prefix><white>Nobody has sold anything yet."
```

`auto-sell.*` covers [Auto-Sell](/plugins/oberonsell/features/auto-sell/); `top.empty` is what `/selltop` replies with
when the [leaderboard](/plugins/oberonsell/features/sell-leaderboard/) is empty.

## Lists

A key whose value is a list is sent as several lines. `notifications.multiplier.rank_up` ships that way;
any other key can be turned into a list the same way.

## Missing keys

A key you delete falls back to **the key name itself**, shown in game. That is deliberate — a typo is
visible rather than silently swallowed.
