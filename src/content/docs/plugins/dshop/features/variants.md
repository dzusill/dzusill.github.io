---
title: "Variants"
description: "A product can ask questions before it is bought. One level:"
---

A product can ask questions before it is bought. One level:

> Firework → Flight I / II / III → buy screen

or four:

> Potion → Strength → Level II → 8 minutes → buy screen

This is one generic engine. Nothing in it knows what a firework or a potion is — those are just field
names in an `apply:` block, so the same tree works for tiers, colours, models, enchantment levels or
anything else you can describe.

## How it is written

```yaml
items:
  firework:
    displayname: '&bFirework'
    material: FIREWORK_ROCKET
    slot: 10
    variants:
      id: flight
      title: '&bChoose flight duration'
      rows: 3
      options:
        flight1:
          displayname: '&fFlight &bI'
          material: FIREWORK_ROCKET
          slot: 11
          price: 50
          apply:
            firework-power: 1
        flight2:
          displayname: '&fFlight &bII'
          slot: 13
          price: 90
          apply:
            firework-power: 2
```

An option is either a **final choice**, with a price, or a **branch**, with more `variants:` below it and
no price. Never both, never neither — both mistakes are refused at load with a message naming the file
and the key, because a priced branch would mean two prices could describe one purchase and an unpriced
final choice would mean a player reaching the buy screen with nothing to charge.

**A product with variants has no price of its own.** Its menu icon shows the cheapest final choice,
worded "from", using `variant-price-lore` in `config.yml`.

## Stacking choices

Each level sets only its own field, and a deeper choice overrides a shallower one. That is what lets
three independent levels describe one potion:

```yaml
  potion:
    material: POTION
    slot: 12
    variants:
      id: effect
      options:
        strength:
          displayname: '&cStrength'
          slot: 11
          apply:
            potion-effect: strength
          variants:
            id: level
            options:
              level1:
                displayname: '&fLevel &bI'
                slot: 12
                apply:
                  potion-amplifier: 0
                variants:
                  id: duration
                  generate: potion-durations
                  durations: [ 180, 480 ]
                  prices: [ 200, 350 ]
```

Nesting goes five deep before the loop guard stops it. Potions reach four.

## What `apply:` can change

| Key | Effect |
|---|---|
| `material` | Swaps the item |
| `potion-form` | `normal`, `splash` or `lingering` — swaps the material for you |
| `potion-effect`, `potion-amplifier`, `potion-duration` | Potion data. Amplifier 0 is level I; duration is in seconds |
| `firework-power` | Flight duration |
| `enchant` | Adds enchantments, as a list or a map |
| `displayname`, `lore`, `amount` | Overrides the product's |
| `custom-model-data`, `glow` | Cosmetic |
| `custom-item` | Swaps in a third-party plugin's item — see [Custom Items](/plugins/dshop/features/custom-items/) |
| `commands` | For a perk: what this choice runs. Commands accumulate down the whole path |

## Shorthands

Three levels are common enough to have a one-line form:

```yaml
    variants:
      id: flight
      generate: firework-flights
      flights: [ 1, 2, 3 ]
      prices: [ 50, 90, 140 ]
```

| `generate:` | takes | sets |
|---|---|---|
| `firework-flights` | `flights: [...]` | `firework-power` |
| `potion-durations` | `durations: [...]` | `potion-duration`, in seconds |
| `potion-levels` | `levels: [...]` | `potion-amplifier` — a level of 1 is amplifier 0 |

All three also need a `prices:` list of the same length; a mismatch is refused at load. Slots centre
themselves unless you give them.

The expansion happens when the file loads, so nothing at runtime knows the shorthand existed — a
generated tree and a hand-written one are the same tree.

## Naming options

Option ids end up in stored rows — a favourite, a recent purchase, a stock count — so they have to be
stable. The loader refuses:

- `/` or `.` in an id
- a purely numeric id such as `1` — write `flight1`
- `on`, `off`, `yes`, `no`, `true`, `false` — YAML reads those as booleans, so the option could never be
  looked up by name

**Generated ids are named after the value, not the position**: `duration180`, not `duration1`. That way
inserting a fourth duration in the middle of the list later does not repoint the stored rows of the three
that were already there.

## Skipping a pointless menu

A level with exactly one option is skipped — a menu with one button asks the player nothing. Turn it off
with `navigation.skip-single-option-variants: false`.

## Where it is counted

Stock, purchase limits, favourites and recently-bought are all counted **per final choice**. Writing
`max: 512` on a firework means 512 of each flight level; one running out does not empty the others.

Popularity is the exception and is counted per product — "which firework sells" is a question about the
firework.
