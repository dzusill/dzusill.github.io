---
title: "Custom Items"
description: "Items from MMOItems, Oraxen, Nexo and ItemsAdder get their own readable price keys:"
---

Items from MMOItems, Oraxen, Nexo and ItemsAdder get their own readable price keys:

```yaml
items:
  "mmoitems:SWORD/CUTLASS": 12000.0
  "oraxen:ruby_sword": 9000.0
  "nexo:steel_helmet": 4500.0
  "itemsadder:mypack:magic_wand": 20000.0
```

Price one by holding it:

```
/setworth 12000
```

## No dependency on any of them

This is worth being explicit about: dDonutWorth does **not** depend on MMOItems, Oraxen, Nexo or
ItemsAdder. Nothing to install, no shaded APIs, and nothing that breaks when one of them updates or when
you don't run it at all.

Each of those plugins stamps its item id into the item's `PersistentDataContainer`, which plain Bukkit can
read. The tag names live in `config.yml`, so supporting a further plugin — or following one that renames
its tag — is a config edit rather than waiting on a plugin update.

```yaml
custom-items:
  mmoitems:
    enabled: true
    namespace: mmoitems
    type-key: type
    id-key: id
  oraxen:
    enabled: true
    namespace: oraxen
    id-key: id
  nexo:
    enabled: true
    namespace: nexo
    id-key: id
  itemsadder:
    enabled: true
    namespace: itemsadder
    id-key: namespacedid
```

| Key | Meaning |
|---|---|
| `enabled` | set `false` to ignore this plugin's items |
| `namespace` | the PDC namespace the plugin writes under |
| `type-key` | the tag holding the item's type/category — omit if it has none |
| `id-key` | the tag holding the item's id |

The entry's name is the prefix in the price key. With a `type-key` you get
`<prefix>:<type>/<id>`; without one, `<prefix>:<id>`.

Sources are tried in file order, so if two plugins somehow claim the same item, the one listed first wins.

## Adding another plugin

Find the namespace and tag it writes. Most plugins document this, or you can check an item's NBT in-game.
Then:

```yaml
custom-items:
  myplugin:
    enabled: true
    namespace: myplugin
    id-key: item_id
```

Reload, hold one of its items, and `/setworth 500`. The key will read `myplugin:whatever_the_id_is`.

## Items no plugin claims

A one-off item with hand-written lore, or NBT from something not configured, still gets a price — it is
stored with a copy of the item beside it:

```yaml
items:
  "custom:legendary_axe":
    worth: 15000.0
    item: "H4sIAAAAAAAA..."
```

See [Readable Item Keys](/plugins/ddonutworth/features/item-keys/) for how those are matched, and why durability is deliberately not
part of the comparison.

## Categorising custom items

The shipped `sell/armorandtools.yml` claims every MMOItems item:

```yaml
matches:
  - "mmoitems:*"
```

Narrow it (`"mmoitems:SWORD/*"`) or move it to another category if you would rather split custom gear up.
See [Sell Categories](/plugins/ddonutworth/configuration/sell-categories/).
