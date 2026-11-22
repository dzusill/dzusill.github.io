---
title: "Equipment & Effects"
description: "A Base64 item that cannot be read (corrupt, or made on a newer Minecraft version than the server) is skipped with a warning, never an error."
---

## Equipment

```yaml
equipment:
  mode: FILL_EMPTY                  # VANILLA | REPLACE | FILL_EMPTY
  main-hand:
    chance: 0.25                    # chance that this slot gets an item at all (default 1.0)
    items:                          # weighted list
      - { item: IRON_SWORD, weight: 3, enchants: { sharpness: { min: 1, max: 2 } } }
      - { base64: "H4sIAAAA...", weight: 1 }
    drop-chance: 0.085              # chance the item drops on death (optional)
```

| Key | |
|---|---|
| `mode` | `VANILLA`: gear untouched (configured slots are ignored with a warning). `REPLACE`: all vanilla gear is removed, then each configured slot is rolled. `FILL_EMPTY`: vanilla gear stays; a configured slot is rolled only if the mob has nothing there. |
| Slots | `main-hand`, `off-hand`, `helmet`, `chestplate`, `leggings`, `boots`, `body` (wolf and horse armour). |
| `chance` | `0.0`-`1.0`, default `1.0`. |
| `items` | Weighted list (weight default `1`, must be positive). One item is picked per rolled slot. A slot with no valid item is ignored with a warning. |
| `drop-chance` | `0.0`-`1.0`. Set whenever the slot is rolled, even if its `chance` gave no item. |

### Item syntax

| Key | |
|---|---|
| `item` | Material name, for example `IRON_SWORD`. |
| `base64` | Serialized item from the GUI, keeps every component of a custom item. If both `item` and `base64` are present, `base64` wins. |
| `amount` | Whole number, clamped to the item's stack size, default 1. |
| `enchants` | `{ sharpness: 3 }` or `{ sharpness: { min: 1, max: 2 } }`. Keys are enchantment registry keys. |
| `name`, `lore` | MiniMessage name and a list of lore lines. |

A Base64 item that cannot be read (corrupt, or made on a newer Minecraft version than the server) is **skipped with a warning**, never an error.

## Effects

Effects are a top-level list. They are not generated in new files; add the key yourself.

```yaml
effects:
  - { effect: speed, chance: 0.2, amplifier: 0, duration: infinite }
  - { effect: minecraft:resistance, amplifier: { min: 0, max: 1 }, duration: { min: 30, max: 60 }, particles: false }
```

| Key | Default | |
|---|---|---|
| `effect` | required | Registry key, with or without `minecraft:`. Unknown effects are skipped with a warning. |
| `chance` | `1.0` | Rolled once per effect. |
| `amplifier` | `0` | Level minus one: `0` = level I. Number or range, `0`-`255`. |
| `duration` | `infinite` | Seconds (number or range, `0.05`-`1000000`) or `infinite`. |
| `ambient` | `false` | |
| `particles` | `true` | |

Vanilla effects already on the mob (for example a spider's random effect on hard difficulty) are never removed.

## In the GUI

**Equipment** shows the mode (click = next, right-click = previous) and one button per slot. A slot opens a list of its items: hold an item on your cursor and click an empty slot, or shift-click the item in your own inventory. The GUI stores a **copy**; your own item stays with you. Ctrl+Q on an item removes it; Ctrl+Q on the drop chance sets it back to vanilla. Weight, chance and drop chance are number controls.

**Effects** lists the effects and has an effect picker. Each effect has chance, amplifier range, duration (infinite or a seconds range) and a particles toggle, plus a remove button. `ambient` is file-only.

Both are saved with the Save button and apply to new spawns only. Overrides replace the whole `effects` list; equipment is merged key by key (see [World & Biome Overrides](/plugins/dmobstats/features/overrides/)).
