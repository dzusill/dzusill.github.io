---
title: "tiers.yml"
description: "Rarity tiers and their loot tables. See Tiers and loot for how the"
---

Rarity tiers and their loot tables. See [Tiers and loot](/plugins/oberonsupplydrops/features/tiers-and-loot/) for how the
rolls work; this page is the key reference.

`tiers` is never default-merged. A tier you delete stays deleted, and the shipped examples are not
written back on the next start.

## Tier keys

```yaml
tiers:
  <id>:
    weight: 30
    display-name: "<#00A3FB><bold>Rare"
    colour: "#00A3FB"
    crate-material: BARREL
    unlock-seconds: -1
    sounds:
      land: land_legendary
    commands:
      - "eco give {player} 500"
    loot:
      guaranteed: [ ]
      rolls: "2-3"
      pool: [ ]
```

| Key | Default | Meaning |
|---|---|---|
| `weight` | `1` | Relative chance of being picked; `0` rejects the tier |
| `display-name` | the id | MiniMessage name in chat, title, hologram and boss bar |
| `colour` | `#FFFFFF` | `#RRGGBB` for the beam, the particles and `{tier_colour}` |
| `crate-material` | `crate.default-material` | Must be a block **with real storage** — see below |
| `unlock-seconds` | `-1` | `-1` keeps the global countdown |
| `sounds` | none | Event name → alias from `sounds.yml` |
| `commands` | none | Run as console for the first opener; `{player}` is their name |
| `hologram` | none | Per-tier overrides of `effects.hologram.fancy` — see below |

Overridable sound events: `announce`, `descent`, `land`, `unlock`, `open`, `loot`, `close`. An event
with no override uses the alias of the same name.

## Loot entry keys

| Key | Default | Meaning |
|---|---|---|
| `material` | required | The item |
| `amount` | `1` | A number, or a `"4-12"` range |
| `name` | none | MiniMessage display name |
| `lore` | none | MiniMessage lore lines |
| `enchantments` | none | `ENCHANT_NAME: level`, applied unsafely |
| `chance` | `1.0` | Guaranteed entries only — an independent 0–1 gate |
| `weight` | `1` | Pool entries only — relative draw chance |

## Rolls

`loot.rolls` is how many pool entries a crate gets: a number, or a `"2-3"` range. It is clamped to the
pool size at load, so the preview menu's arithmetic stays honest.

## Per-tier holograms

Applies only when FancyHolograms is the hologram backend. Any key from `effects.hologram.fancy` can
be restated here, and the merge is **key by key** — a tier that sets only `scale` keeps every other
global value, including nested ones.

```yaml
  legendary:
    hologram:
      scale: 1.3
      brightness:
        enabled: true
        block: 15
        sky: 15
```

The full key reference is in [Holograms](/plugins/oberonsupplydrops/features/holograms/).

## Choosing the crate block

`crate-material` has to be a block that actually holds items, **and holds enough of them**.

### Use one of these

| Block | Slots |
|---|---|
| `CHEST`, `TRAPPED_CHEST` | 27 |
| `BARREL` | 27 |
| Any shulker box (all 17 colours) | 27 |

These are the only blocks big enough for a tier that rolls more than a handful of entries, and they
are what the shipped tiers use.

### Containers that are too small

Real storage, but they will silently swallow anything that does not fit:

| Block | Slots |
|---|---|
| `DISPENSER`, `DROPPER`, `CRAFTER` | 9 |
| `BREWING_STAND` | 5 |
| `FURNACE`, `BLAST_FURNACE`, `SMOKER` | 3 |

Usable for a tier with few entries. If the roll overflows, the loss is reported in the console with
the exact count — `9 item(s) did not fit in a FURNACE (3 slots) and were lost` — rather than players
just finding the drops stingy.

`HOPPER` is rejected outright: it has 5 slots and then pushes its contents into whatever sits below,
so the crate drains itself while people are still running for it.

### Blocks with no storage at all

**`ENDER_CHEST` is the trap.** It looks exactly like a supply crate and it is a tile entity, but it
holds nothing of its own — it shows each player their own ender inventory. A crate made of one lands
empty, never registers as emptied, and expires as unclaimed. Crafting, enchanting, smithing,
cartography and fletching tables, beacons, anvils, looms, grindstones and stonecutters are the same.

Those are rejected at load with a warning. Anything else that turns out to have no inventory —
lecterns, decorated pots, chiselled bookshelves, campfires, jukeboxes — is caught when the crate
lands: the block is replaced with `crate.default-material` and a warning names the tier. Whether a
material has an inventory cannot be asked of the material, only of a placed block, so that check is
the guarantee and the reject list is just the early warning.

An odd choice of block costs the decoration, never the loot.

## Validation

Every problem is reported to the console with the tier and key, and then skipped:

- an unknown material → that entry is dropped
- a `colour` that is not `#RRGGBB` → falls back to white, warning logged (it has to be valid: the
  beam parses it as RGB and `{tier_colour}` pastes it into messages as a tag)
- a `crate-material` that is not a block → falls back, warning logged
- a `crate-material` with no storage → falls back, warning logged
- a tier with no usable loot → that tier is dropped
- `weight: 0` → dropped, since it could never be rolled

The rest of the file still loads.
