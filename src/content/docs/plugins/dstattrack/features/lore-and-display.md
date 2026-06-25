---
title: "Lore & Display"
description: "The running totals are shown as a block of lore lines appended to the item. dStattrack owns those lines and rebuilds them on every change."
---

The running totals are shown as a block of lore lines appended to the item. dStattrack owns those lines and rebuilds them on every change.

## How the lore block works

Each group has its own lore template in [config.yml](/plugins/dstattrack/configuration/config/) under `lore`:

```yaml
lore:
  kills:
    - ''
    - '<dark_purple><bold>dStattrack:</bold></dark_purple>'
    - '<white><bold>»</bold></white> <gray>Players killed: <yellow>%playerkills%'
    - '<white><bold>»</bold></white> <gray>Mobs killed: <yellow>%mobkills%'
  block:
    - ''
    - '<dark_purple><bold>dStattrack:</bold></dark_purple>'
    - '<white><bold>»</bold></white> <gray>Blocks broken: <yellow>%block%'
  fishing:
    - ''
    - '<dark_purple><bold>dStattrack:</bold></dark_purple>'
    - '<white><bold>»</bold></white> <gray>Fish caught: <yellow>%fishing%'
```

- Lines are [MiniMessage](/plugins/dstattrack/configuration/messages/) — use any tags, gradients and colours.
- Placeholders are replaced with the **comma-formatted** counter value: `%playerkills%`, `%mobkills%`, `%block%`, `%fishing%`.
- The first empty `''` line is a spacer between the item's own lore and the stattrack block.

## Why it never duplicates

dStattrack records **how many lore lines it added** in a hidden NBT tag (`bStatLoreLines`). On every update it removes exactly that many trailing lines before re-appending the freshly rendered block. So:

- Editing the template and re-applying never stacks two blocks.
- The item's own existing lore (enchant descriptions, etc.) above the block is left untouched.
- `/dstattrack remove` deletes exactly the lines it owns.

> If you change a `lore` template in config, **already-stattracked items keep their old lore** until their counter next changes (a kill, a `set`, etc.) triggers a rebuild.

## Number formatting

Counts are formatted with thousands separators (US locale), so `1234567` displays as `1,234,567`.
