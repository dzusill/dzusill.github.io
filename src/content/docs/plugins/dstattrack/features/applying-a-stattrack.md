---
title: "Applying a Stattrack"
description: "Applying initialises the counters for an item's group at 0 and appends the lore block. It costs money."
---

Applying initialises the counters for an item's group at `0` and appends the lore block. It costs money.

## The apply flow

When a player runs `/dstattrack add` (or clicks **Add** in the [GUI](/plugins/dstattrack/features/the-gui/)) while holding an item, dStattrack checks, in order:

1. **Holding an item?** — empty hand → *"You must be holding an item to use stattrack!"*
2. **Is it trackable?** — the material must match `stattrackItems`, otherwise *"Stattrack cannot be applied to `<item>`!"*
3. **Does it already have one?** — *"This item already has a Stattrack!"*
4. **Is economy available?** — Vault + an economy plugin must be present, otherwise *"Economy (Vault) is not available."*
5. **Can they afford it?** — needs at least the `price` (default `10,000`), otherwise *"You do not have enough money … missing `<amount>`."*

If every check passes, the `price` is **withdrawn** via Vault, the group's counters are created at `0`, and the [lore block](/plugins/dstattrack/features/lore-and-display/) is added. The player hears the `success` sound.

## Removing

`/dstattrack remove` (or double-click **Remove** in the GUI) strips the plugin's lore block and deletes all of its NBT tags from the held item. Removing does **not** refund the price.

## Setting an exact value

`/dstattrack set <category> <amount>` overwrites a single counter — handy for migrating values or rewarding players:

```
/dstattrack set Playerkills 1000
```

The category must belong to the held item's group, otherwise *"This category does not exist for this item."* Run `/dstattrack info` to list valid categories.

## Inspecting

`/dstattrack check` prints the raw counters on the held item, e.g.:

```
This item has the following tags: Playerkills=12, Mobkills=240
```

## Permissions

| Action | Permission |
|---|---|
| Apply | `dstattrack.add` |
| Remove | `dstattrack.remove` |
| Set a value | `dstattrack.set` |
| Inspect tags | `dstattrack.check` |
| List categories | `dstattrack.info` |

See [Commands & Permissions](/plugins/dstattrack/commands-and-permissions/) for defaults.
