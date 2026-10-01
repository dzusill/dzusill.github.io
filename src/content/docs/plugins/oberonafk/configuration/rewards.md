---
title: "rewards.yml"
description: "Reward tables. A zone's table picks one; each roll draws exactly one reward from it by weight."
---

Reward tables. A zone's `table` picks one; each roll draws exactly **one** reward from it by weight.
The file is never saved by the plugin.

```yaml
tables:
  default:
    cash-25k:
      weight: 35
      type: COMMAND
      display: "<#00FC00>$25,000"
      commands:
        - "eco give %player% 25000"
    diamonds:
      weight: 15
      type: ITEM
      display: "<aqua>16 Diamonds"
      item:
        material: DIAMOND
        amount: 16
```

## Every reward

| Key | Meaning |
|---|---|
| `weight` | Relative likelihood, above zero. Fractions are fine: `0.5` |
| `type` | `COMMAND` or `ITEM` |
| `display` | What the player reads: `+<display>`. `{amount}` is replaced with the rolled amount. Optional for items |
| `amount` | A number or a range like `1-3`, rolled every time. `1` when left out |

The id (the key, e.g. `cash-25k`) is what the history, statistics and `%oberonafk_drops_<id>%` use, so
keep it stable. Ids longer than 64 characters are refused.

When `display` is left out for an item, it reads `16x Diamond` — or the item's own name.

## Command rewards

```yaml
plasma-keys:
  weight: 1
  type: COMMAND
  display: "<aqua>3 Plasma Keys"
  repeat: 3
  commands:
    - "crates givekey %player% plasma-crate"
```

| Key | Meaning |
|---|---|
| `commands` | Run from the console, top to bottom. A leading `/` is ignored |
| `repeat` | Run the whole list this many times (1-64). For commands without an amount argument |

Placeholders in a command: `%player%`, `%uuid%`, `%zone%`, `%amount%`, `%reward%`.

## Item rewards

`item` is one of four forms.

**Plain**

```yaml
item: { material: DIAMOND, amount: 16 }
item: { material: ARROW, amount: 8-16 }
```

**Built from config**

```yaml
item:
  material: DIAMOND_SWORD
  name: "<gradient:#C21807:#F11800>Reward Blade</gradient>"
  lore: [ "<gray>Won by standing still" ]
  enchantments: { sharpness: 3, looting: 2 }
  custom-model-data: 5
  unbreakable: true
  flags: [ HIDE_ENCHANTS ]
```

An unknown material, enchantment or flag switches the reward off and says which.

**Saved from your hand**

```
/afk reward capture koth-helmet
```

stores the held item in [`data.yml`](/plugins/oberonafk/configuration/database/#datayml) and prints the snippet; use it as

```yaml
item: { saved: koth-helmet }
```

This keeps any NBT or components exactly, which a config entry cannot.

**From an item plugin**

```yaml
item: { hook: "mmoitems:SWORD:BLOOD_BLADE" }
item: { hook: "itemsadder:namespace:id" }
item: { hook: "oraxen:id" }
item: { hook: "executableitems:id" }
```

The item plugins are reached through their public APIs by reflection, so none of them is a build
dependency and a server without them loads nothing of theirs. If a plugin's API has changed under us, only
rewards that use it fail — the console names the reward once, and the rest of the table is unaffected. A
`COMMAND` reward using the plugin's own give command is always an alternative.

## Validation

A broken reward is switched off by itself, with the reason in the console and in `/afk reward list`; the
rest of the table keeps working. Checked: unknown `type`, a weight of zero or less, a `COMMAND` with no
commands, an unusable amount, an unknown material, enchantment or flag, a missing `item` section, a
saved item not in `data.yml`, an item plugin that is not installed, and an id that is too long.

## Upgrading

`tables` and the shipped `tables.default` are owner-curated: the core's key merge never puts back a
reward or a table you removed.
