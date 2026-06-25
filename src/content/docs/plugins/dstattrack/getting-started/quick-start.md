---
title: "Quick Start"
description: "Five minutes from install to a working stattracked sword."
---

Five minutes from install to a working stattracked sword.

## 1. Hold a trackable item

Grab a **sword** (or bow, crossbow, trident, mace). Swords belong to the **kills** group, so they track *Players killed* and *Mobs killed*. See [Tracked Stats](/plugins/dstattrack/features/tracked-stats/) for the full list.

## 2. Apply a stattrack

Two ways:

**Command** — hold the item and run:

```
/dstattrack add
```

**GUI** — run `/dstattrack` (or `/dstat`), drop the item onto the arrow slot, and click **Add**:

```
/dstattrack
```

Either way the killer is charged the configured **price** (default `10,000`) through Vault, and a lore block is appended to the item:

```
dStattrack:
» Players killed: 0
» Mobs killed: 0
```

## 3. Play

Kill a mob — the *Mobs killed* line ticks up to `1`. Counters update live in the lore as you play, as long as you're **holding the item** when the kill/break/catch happens.

## 4. Admin tweaks

```
/dstattrack info                 # list the stat categories
/dstattrack set Mobkills 500     # set a counter to an exact value
/dstattrack check                # show the raw tags on the held item
/dstattrack remove               # strip the stattrack off the held item
```

That's it. Tune the [price, items, lore and sounds](/plugins/dstattrack/configuration/config/) to taste.
