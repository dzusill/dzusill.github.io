---
title: "Bundles & Perks"
description: "Beyond a plain item, a product can be a bundle — several items for one price — or a perk, which"
---

Beyond a plain item, a product can be a **bundle** — several items for one price — or a **perk**, which
hands over nothing and runs commands instead.

Both use the same categories, pricing, permissions, stock and limit rules as anything else, and both can
carry [variants](/plugins/oberonshop/features/variants/).

## Bundles

```yaml
  starter_kit:
    type: bundle
    displayname: '&bStarter Kit'
    material: CHEST
    price: 25000
    slot: 14
    contents:
      - material: DIAMOND_PICKAXE
        amount: 1
        enchant:
          - efficiency:4
          - unbreaking:3
      - material: GOLDEN_APPLE
        amount: 8
      - material: COOKED_BEEF
        amount: 64
```

`material` is the menu icon; `contents` is what the player receives. Each entry takes the same fields as
an ordinary item — enchantments, potion data, model data, glow.

**A bundle is measured as a whole.** If the player has room for two of its three items, the purchase is
refused *before* payment rather than delivered in pieces. There is no state in which a bundle is
half-bought.

Buying two of a bundle gives two of everything in it.

## Perks

```yaml
  night_vision:
    type: perk
    displayname: '&bNight Vision'
    material: GOLDEN_CARROT
    slot: 13
    run-as: console
    variants:
      id: duration
      title: '&bChoose a duration'
      options:
        half_hour:
          displayname: '&f30 minutes'
          material: CLOCK
          slot: 12
          price: 500
          apply:
            commands:
              - 'effect give %player% night_vision 1800 0 true'
        two_hours:
          displayname: '&f2 hours'
          material: CLOCK
          slot: 14
          price: 1600
          apply:
            commands:
              - 'effect give %player% night_vision 7200 0 true'
```

A perk with no choices puts its `commands:` straight on the product instead.

### The commands

Placeholders: `%player%`, `%player_name%`, `%uuid%`, `%amount%`, `%price%`. No leading `/`.

They run **once per purchase, not once per unit**. Quantity reaches them as `%amount%`, which is how a
shop expresses "two hours" without the shop having to know what an hour is.

`run-as` is `console` (the default) or `player`. As the player the command is subject to their own
permissions, which is the point when a perk is meant to be something they could have done themselves.

### If a command fails

The commands run in order and the first failure stops the rest — a perk written as "grant the permission,
then tell the player" must not announce something it did not do. The purchase is then refunded and
recorded in `/adminshop failures`.

**What already ran cannot be undone.** There is no inverse of an arbitrary console command, so a perk
that fails halfway leaves whatever it managed. Write commands that are safe to run twice.

## Perks skip the inventory check

A perk delivers no item, so it can be bought with a completely full inventory. A bundle that mixes items
and commands has its items measured as normal.
