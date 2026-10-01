---
title: "Delivery and the claim storage"
description: "Run from the console the moment they are rolled. The placeholders %player%, %uuid%, %zone%,"
---

## How a reward is handed over

```
roll -> reward
  COMMAND -> console, each command run `repeat` times
  ITEM    -> delivery.physical-items
               DIRECT  -> inventory; whatever does not fit -> claim storage
               STORAGE -> claim storage
```

### Command rewards

Run from the console the moment they are rolled. The placeholders `%player%`, `%uuid%`, `%zone%`,
`%amount%` and `%reward%` are filled in first. `repeat` runs the whole command list that many times —
useful for a command such as `/crates givekey` that has no amount argument, where "3 keys" means three
runs.

If the server does not know a command, or it throws, the reward is recorded as `FAILED` in the
[history](/plugins/oberonafk/features/statistics/), the console names the reward and the command, and nothing is counted in the
player's totals. It is not retried.

### Item rewards

With `delivery.physical-items: DIRECT` (the default) items go to the inventory first. What `addItem`
could not place goes to the claim storage — exactly that, so nothing is dropped on the ground and
nothing silently disappears. With `STORAGE` every item goes to the storage, and players collect it with
`/afkrewards`.

An amount larger than a stack is split into legal stacks first.

## The claim storage

Opened with `/afkrewards`, `/afkclaim`, `/afk claim` or `/afk rewards`. It is a menu of the items
waiting for the player, saved in the database and therefore kept across restarts and relogs.

- **Click an item** to take that stack. If only part of it fits, the part that fits is handed over and
  the rest stays.
- **Claim All** takes everything that fits.
- **It is take-only.** Nothing can be put into it: clicks, drags, shift-clicks from the player's own
  inventory and double-click collects are all refused, so it cannot be used as an extra ender chest.
- It is **safe against double clicks.** Every claim is decided on the main thread against the player's
  stored list, so two clicks on the same stack can never both succeed; the database is told afterwards,
  in order.
- If a reward lands in storage while the menu is open, the menu redraws by itself.

### The cap

`storage.max-stacks` (54 by default, `0` for unlimited) limits how many stacks one player can have
waiting. A reward that does not fit under the cap is **not given**: the player is told
([`storage-full`](/plugins/oberonafk/features/notifications/#the-zone-notices)), the console logs it, and the history records it
as `STORAGE_FULL` so staff can see it happened and the player's totals still count the roll.

### Staff

```
/afk storage <player> view      what is waiting for them
/afk storage <player> clear     remove all of it
```

Both work for players who are offline.

## Why storage and not the ground

A player standing AFK is, by definition, not looking at their inventory. Dropping an item at their
feet would lose it to a pickup or a despawn; a storage that survives a restart and asks the player to
come and get it does not. Money, currencies and keys never go through any of this — they are commands,
so they arrive instantly.
