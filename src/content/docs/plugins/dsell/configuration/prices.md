---
title: "prices.yml"
description: "The whole price list. Three sections, read in this order:"
---

The whole price list. Three sections, read in this order:

```yaml
items: {}                    # yours — overrides and /setworth writes

prices:
  by-serialized:             # 136 shipped potion variants
    "POTION[healing]": 40.0
  by-material:               # 1,480 shipped material prices
    POTATO: 3.0
    DIAMOND: 250.0

enchant-worth:               # 40 migrated enchantment values — NOT read; see below
  enabled: true
  enchants:
    minecraft:fortune:
      base: 120
      per_level: 45
```

`items` is yours to curate. The two `prices.*` tables are **shipped data**, migrated 1:1 from the client's
source list — see [Deletions, and what sticks](#deletions-and-what-sticks).

## The key format

See [Readable Item Keys](/plugins/dsell/features/item-keys/) for the full grammar. In short:

```yaml
items:
  POTATO: 500.0                          # plain item
  "DIAMOND_SWORD[sharpness=5]": 9999.0   # enchantments
  "POTION[strong_strength]": 800.0       # potion type
  "DIAMOND{cmd=7}": 1200.0               # custom model data
  "oraxen:ruby_sword": 9000.0            # a custom-item plugin
```

Quote any key containing `[`, `{` or `:` — YAML needs it. A key never contains a `.`, which the config
layer would read as a path separator.

A book price such as `"ENCHANTED_BOOK[mending=1]"` does double duty: it also stands in as the value of
Mending on a tool, for any enchantment [enchantments.yml](/plugins/dsell/configuration/enchantments/) does not list.

## A price of 0

`0` means **explicitly unsellable** — a value, not an absence. An item with no entry at all is a different
answer, and the plugin keeps the two apart. Three materials ship at `0`: `GOLD_NUGGET`, `IRON_NUGGET` and
`MOSSY_COBBLESTONE_SLAB`.

## Items with no readable key

Written automatically by `/setworth` when a key cannot describe the item:

```yaml
items:
  "custom:legendary_axe":
    worth: 15000.0
    item: "H4sIAAAAAAAA..."
```

The `worth` is still yours to edit. Leave `item` alone — it is how that exact item is recognised.

## Editing by command

```
/setworth <price>           price the item you are holding
/setworth <key> <price>     price a key directly — tab-completes existing keys
/delworth                   remove the price for the held item
/delworth <key>             remove one entry
```

These write the file immediately, comments and all. Editing by hand works equally well; run
`/dsell reload` afterwards.

## Deletions, and what sticks

`items` is an **ignored section** for config merging. An entry you delete there is not brought back by a
plugin update, and neither is one you renamed.

`prices.by-material` and `prices.by-serialized` are the opposite: they are shipped data, so an update
**merges** the jar's copy back in.

### Making a migrated price unsellable

`/delworth` on a migrated key does not work, by design. Deleting it would only take it out of your copy of
the file, and the next upgrade would merge it straight back — so the command declines rather than reporting
a removal that quietly undoes itself:

```
[ᴡᴏʀᴛʜ] DIAMOND has no price of its own to remove.
```

Set it to zero instead:

```
/setworth DIAMOND 0
```

That writes an `items` entry, which is yours, wins over both migrated tables, and survives every upgrade:

```yaml
items:
  DIAMOND: 0.0
```

The same applies to changing a migrated price: `/setworth DIAMOND 30` writes an override rather than
editing the shipped table, and the override is what the plugin reads.

## Migration health

The client's table was written for an older server, and a handful of its keys no longer land on Paper
26.2. They are kept rather than pruned — nothing on the server can ever match one, so they cost nothing,
and deleting them would throw away a price you would have to find again if a name came back.

| Group | Count | What it means |
|---|---|---|
| **Inert keys** | **39** | The key names no material this server has, so nothing can ever match it. |
| **Block-only keys** | **96** | The key names a real material with no item form. It prices fine, but has no item to draw. |

**Inert keys** are renames and typos from the source list: `CHAIN` (now `IRON_CHAIN`), `SCUTE`,
`TURTLE_SHELL`, `DIAMOND_BPPTS`, the whole `POTTERY_SHARD_*` family (now `*_POTTERY_SHERD`), the
`INFUSED_*` sandstones that never existed here, `MANNEQUIN`, `VERDANT` and `EXPLORER_MAP` among others.

**Block-only keys** are materials such as `BAMBOO_SAPLING`, the `POTTED_*` family and `WALL_SIGN`. A block
of that kind is only ever held as something else, so there is no item to build an icon from — the price
resolves normally if something does ask for it, but the entry is **left out of the `/worth` prices GUI**.

Both counts are written to the server log at startup. The summary line is at `INFO`:

```
[DSell] Loaded 1480 material prices, 136 item-variant prices and 0 overrides
```

and the names behind each count are at `FINE`, so a healthy server does not scroll 39 warnings past you.
Turn `FINE` on for the plugin's logger to read them.

> `/dsell doctor` reports the same figures on demand, and separates "explicitly unsellable" (a
> configured `0`) from "no price configured" — they are different answers.
> Today the startup log is the way to see them.

## The enchant-worth block

```yaml
enchant-worth:
  enabled: true
  enchants:
    minecraft:fortune:
      base: 120
      per_level: 45
```

Forty entries, migrated with the rest of the table. **The plugin does not read this section.** Enchantment
values come from [enchantments.yml](/plugins/dsell/configuration/enchantments/), which has its own shape (`per-level` and exact
`levels`) and its own levers. The block is kept so the source table's figures are not lost; change
`enchantments.yml` to change what an enchantment is actually worth.

## Worked example

The migrated table prices a diamond at 250. Too generous:

```
/setworth DIAMOND 30
```

```yaml
items:
  DIAMOND: 30.0
```

Diamonds now sell for exactly 30. Changed your mind:

```
/delworth DIAMOND
```

That removes the `items` entry — the migrated `by-material` price of 250 takes over again.
