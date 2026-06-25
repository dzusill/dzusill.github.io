---
title: "config.yml"
description: "The full settings file, at plugins/dStattrack/config.yml."
---

The full settings file, at `plugins/dStattrack/config.yml`.

---

## Price

```yaml
# Cost (Vault economy) to apply a stattrack.
price: 10000
```

| Key | Default | Description |
|---|---|---|
| `price` | `10000` | Amount withdrawn through Vault when a player applies a stattrack. See [Applying a Stattrack](/plugins/dstattrack/features/applying-a-stattrack/). |

---

## Trackable items

```yaml
stattrackItems:
  - sword
  - axe
  - shovel
  - pickaxe
  - hoe
  - shears
  - bow
  - crossbow
  - trident
  - mace
  - fishing_rod
```

Materials eligible to receive a stattrack at all. Matching is a **substring** of the material name, so `sword` covers `WOODEN_SWORD` through `NETHERITE_SWORD`. An item must also belong to a group (below) to actually track anything.

---

## Item groups

```yaml
items:
  kills:
    - sword
    - bow
    - crossbow
    - trident
    - mace
  breakBlocks:
    - axe
    - shovel
    - pickaxe
    - hoe
    - shears
  fishing:
    - fishing_rod
```

Maps each group to the materials that belong to it. The group decides which [categories](/plugins/dstattrack/features/tracked-stats/) an item tracks: `kills` → Playerkills + Mobkills, `breakBlocks` → Block, `fishing` → Fishing.

> Keep `stattrackItems` and `items` consistent: an item in `stattrackItems` but in no group can be *applied* to but won't count anything.

---

## Lore

```yaml
lore:
  kills:
    - ''
    - '<dark_purple><bold>dStattrack:</bold></dark_purple>'
    - '<white><bold>»</bold></white> <gray>Players killed: <yellow>%playerkills%'
    - '<white><bold>»</bold></white> <gray>Mobs killed: <yellow>%mobkills%'
  block:
    - ['... Blocks broken: <yellow>%block%']
  fishing:
    - ['... Fish caught: <yellow>%fishing%']
```

The lore block appended to each group's items, rebuilt on every change. MiniMessage strings. Placeholders: `%playerkills%`, `%mobkills%`, `%block%`, `%fishing%` (comma-formatted). Full detail in [Lore & Display](/plugins/dstattrack/features/lore-and-display/).

> Note the key is `block` here (not `breakBlocks`) — the lore key and the items key differ.

---

## Sounds

```yaml
sounds:
  error: BLOCK_ANVIL_PLACE/0.5/1.0
  success: ENTITY_PLAYER_LEVELUP/1.0/1.0
  removed: BLOCK_ANVIL_USE/0.5/1.0
  alreadyHas: BLOCK_NOTE_BLOCK_HAT/1.0/2.0
```

Feedback sounds in `SOUND_NAME/volume/pitch` format. See [Sounds](/plugins/dstattrack/features/sounds/).

---

## GUI

```yaml
gui:
  title: '<dark_purple><bold>dStattrack:</bold></dark_purple> <red>Apply'
  info:
    name: '<dark_purple><bold>dStattrack:</bold></dark_purple>'
    lore:
      - '<white><bold>»</bold></white> <gray>Price: <yellow>10,000$'
      - ''
      - '<white># <gray>To activate, drop an item next to the arrow'
      - '<gray>   then click add/remove'
  arrow:
    name: '<white><bold>Drop item here'
    lore: ['']
  add:
    name: '<white><bold>Add'
    lore: ['', '<white># <gray>Click <yellow>Add']
  remove:
    name: '<white><bold>Remove'
    lore: ['', '<white># <gray>Double Click <yellow>Remove']
```

Title and button names/lore for the `/dstattrack` menu. All MiniMessage. The price shown in the info lore is **display text only** — change the real cost with `price` at the top of the file. See [The GUI](/plugins/dstattrack/features/the-gui/).
