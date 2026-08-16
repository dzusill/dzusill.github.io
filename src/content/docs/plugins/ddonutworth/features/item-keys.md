---
title: "Readable Item Keys"
description: "Every item has a key — the name it goes by in prices.yml, in"
---

Every item has a **key** — the name it goes by in [prices.yml](/plugins/ddonutworth/configuration/prices/), in
`/setworth`, in tab completion and in the sell history.

```yaml
items:
  POTATO: 500.0
  DIAMOND: 250.0
  "ENCHANTED_BOOK[mending=1]": 4000.0
  "DIAMOND_SWORD[sharpness=5]": 9999.0
  "POTION[strong_strength]": 800.0
  "DIAMOND{cmd=7}": 1200.0
  "mmoitems:SWORD/CUTLASS": 12000.0
  "oraxen:ruby_sword": 9000.0
```

A potato is `POTATO`. You can read the file, search it, and delete a line.

> This is a deliberate departure from the plugin dDonutWorth replaces, which stored prices as
> `item_17: 7000.0` against a separate list of item definitions. You could set a price with a command, but
> you could not tell what any line was, and removing one item meant hunting through numbered entries.

## The key forms

| Form | Example | Means |
|---|---|---|
| `MATERIAL` | `POTATO` | a plain item |
| `MATERIAL[name=level,…]` | `DIAMOND_SWORD[sharpness=5,unbreaking=3]` | enchantments, sorted alphabetically so the key is stable |
| `MATERIAL[potion_type]` | `POTION[strong_strength]` | a potion, by its type |
| `MATERIAL{cmd=N}` | `DIAMOND{cmd=7}` | a specific custom model data value |
| `<plugin>:<id>` | `oraxen:ruby_sword` | a custom-item plugin's item |
| `<plugin>:<type>/<id>` | `mmoitems:SWORD/CUTLASS` | …one that also has a type |
| `custom:<slug>` | `custom:legendary_axe` | an item identified only by a stored copy of itself |

A key never contains a `.` — the YAML layer would read it as a path separator and split the entry in two, so
a dot in a plugin's id becomes `_`.

## Specific beats general, with a fallback

A lookup builds the item's keys from **most to least specific** and takes the first that has a price. For a
Sharpness V diamond sword that is:

```
DIAMOND_SWORD[sharpness=5]      →   DIAMOND_SWORD
```

So you can price Sharpness V swords specially without touching plain ones, and an enchantment you never
priced still falls back to the base sword price — plus whatever that enchantment is worth, see
[Enchantment Worth](/plugins/ddonutworth/features/enchantment-worth/).

The same is true for custom model data (`DIAMOND{cmd=7}` → `DIAMOND`) and for both together
(`DIAMOND[…]{cmd=7}` → `DIAMOND[…]` → `DIAMOND{cmd=7}` → `DIAMOND`).

**Renaming does not change a key.** A diamond called "Bob" is still `DIAMOND` and still sells for the
diamond price. Players cannot rename their way out of, or into, a price.

## Items with no readable key

Some items cannot be described by a key at all — a one-off with hand-written lore, or NBT from a plugin
that isn't configured. Hold one and run `/setworth 15000` and you get:

```yaml
items:
  "custom:legendary_axe":
    worth: 15000.0
    item: "H4sIAAAAAAAA..."
```

The price stays readable, with the item data beside it rather than replacing it. The slug comes from the
item's display name, so the entry is still recognisable at a glance.

This only affects how the price is **stored**. Ordinary items never get a blob — an item earns one only if
its meta carries something a key cannot express: a custom name, hand-written lore, or another plugin's
persistent data.

### How a stored item is matched

Material, display name, lore, custom model data and enchantments — but **not durability**. A custom sword
priced at full health keeps its price once its owner has swung it a few times, which is not what a plain
`isSimilar` comparison would give you.

## Where keys show up

- `prices.yml` — as the entry key
- `/setworth <key> <price>` and `/delworth <key>` — with tab completion over the keys that exist
- the sell history GUI — turned back into a readable name (`DIAMOND_SWORD` → "Diamond Sword")
- the prices GUI — same
