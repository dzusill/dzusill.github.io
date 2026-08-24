---
title: "Custom Items"
description: "A product can sell an item that belongs to ItemsAdder, Oraxen, Nexo or MMOItems."
---

A product can sell an item that belongs to **ItemsAdder**, **Oraxen**, **Nexo** or **MMOItems**.

```yaml
  ruby_sword:
    displayname: '&cRuby Sword'
    material: DIAMOND_SWORD
    price: 25000
    slot: 4
    custom-item:
      provider: itemsadder
      id: ruby:ruby_sword
```

`material` is still required, and still meaningful — it is what the shop shows and delivers if that
plugin is not installed. A custom sword falls back to a real sword rather than to nothing.

MMOItems identifies an item by a **type and an id**, so write them together:

```yaml
    custom-item:
      provider: mmoitems
      id: SWORD:CUTLASS
```

## What the shop adds on top

Name, lore, amount, glow, item flags and enchantments from your config are applied **on top of** the
plugin's item — the item it defines, wearing what the shop says. Anything you do not mention is left
exactly as that plugin made it.

`custom-model-data` is deliberately **not** applied. It is how these plugins point at their own texture,
and overwriting it turns the item back into a plain one wearing the wrong model.

## In variants

A variant level can swap the whole item, which is how tiers work:

```yaml
    variants:
      id: tier
      options:
        tier1:
          price: 25000
          apply:
            custom-item:
              provider: oraxen
              id: ruby_sword
        tier2:
          price: 60000
          apply:
            custom-item:
              provider: oraxen
              id: emerald_sword
```

## Turning one off

```yaml
custom-items:
  itemsadder:
    enabled: true
    pdc-key: "itemsadder:id"
```

`pdc-key` is the tag the plugin writes into an item, used to recognise one the shop did not create. A
renamed tag is a config edit rather than a release.

## When it does not work

There are three different reasons an ItemsAdder sword might arrive as a plain diamond sword, and they
look identical in game:

1. the plugin is not installed,
2. it is switched off in `custom-items`,
3. its API is not the shape this plugin expects.

`/adminshop doctor` tells them apart. In all three cases the product falls back to its `give-command`, or
to its configured material, and the reason is logged once — never a stack trace per icon.

> ### One caveat worth knowing
>
> **Only the Oraxen integration was written against the real plugin.** ItemsAdder, Nexo and MMOItems were
> written from their published API descriptions and have not been run against those plugins.
>
> Each degrades safely — one log line at startup, then the fallback — but "falls back safely" is not
> "works". If you use one of those three, check it on a test server before your players do.
