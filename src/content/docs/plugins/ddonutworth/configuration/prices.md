---
title: "prices.yml"
description: "Your worth overrides. One line per item, keyed by a name you can read."
---

Your worth **overrides**. One line per item, keyed by a name you can read.

```yaml
items:
  POTATO: 500.0
  DIAMOND: 250.0
  "ENCHANTED_BOOK[mending=1]": 4000.0
  "mmoitems:SWORD/CUTLASS": 12000.0
```

It ships **empty**, and on most servers it stays nearly empty. An override always beats the price derived
from dRotatingShop, so this is where you correct the handful of items whose derived price you don't like —
not a list you have to fill in.

In `independent` mode it is the whole price list instead. See
[Price Sources](/plugins/ddonutworth/features/price-sources/).

## The key format

See [Readable Item Keys](/plugins/ddonutworth/features/item-keys/) for the full grammar. In short:

```yaml
items:
  POTATO: 500.0                          # plain item
  "DIAMOND_SWORD[sharpness=5]": 9999.0   # enchantments
  "POTION[strong_strength]": 800.0       # potion type
  "DIAMOND{cmd=7}": 1200.0               # custom model data
  "oraxen:ruby_sword": 9000.0            # a custom-item plugin
```

Quote any key containing `[`, `{` or `:` — YAML needs it.

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
`/ddonutworth reload` afterwards.

## Deletions stick

`items` is an **ignored section** for config merging. An entry you delete is not brought back by a plugin
update, and neither is one you renamed.

## Worked example

Your shop prices a diamond at 250, so it sells for 50 at the default 20% ratio. Too generous:

```
/setworth 30
```

```yaml
items:
  DIAMOND: 30.0
```

Diamonds now sell for exactly 30 regardless of what the shop does, unless you set
`pricing.adjust-overrides: true`, in which case an active event scales this too. Everything else still
tracks the shop.

Changed your mind:

```
/delworth DIAMOND
```

Back to 20% of the shop price.
