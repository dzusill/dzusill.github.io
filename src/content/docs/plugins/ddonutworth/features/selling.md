---
title: "Selling"
description: "Four ways to sell, all going through the same payout path."
---

Four ways to sell, all going through the same payout path.

## The sell menu

```
/sell
/sellgui
```

Opens a menu you drop items into. Close it and the sale settles in **one** payout with one summary
message.

This is what the bare `/sell` does, because it is what players reach for and it is far harder to sell
something by accident: you see what you put in before it goes.

## From your hand

```
/sell hand
```

Sells the stack you are holding.

## Your whole inventory

```
/sellall
/sell all
```

Sells everything sellable and leaves everything else alone.

## The sell GUI in detail

Anything unsellable is handed straight back — into the inventory if there is room, dropped at your feet if
not — so a mis-drop never costs an item. Which slots accept items is up to you; see
[GUIs](/plugins/ddonutworth/configuration/guis/).

## A sell axe

Right-click a container. See [The Sell Axe](/plugins/ddonutworth/features/the-sell-axe/).

## Selling a full container

```yaml
selling:
  return-emptied-containers: true
```

Selling a shulker box that has something in it sells the **contents** and hands the box itself back,
emptied. Empty twenty boxes into the sell GUI and you get the money and your twenty boxes.

An **empty** container has nothing to unpack, so it is sold as the item it is, for its own price. That is
the whole rule: full box → contents sold, box back; empty box → box sold.

- Each item inside is priced and credited **on its own** — the diamonds in a box earn your ores multiplier,
  not whatever the box is filed under.
- Contents nothing will pay for stay inside the box that comes back, so a shulker of ores and rubbish
  returns with the rubbish still in it.
- A box inside a box is unpacked in turn and left, empty, in its parent.
- The box goes back where its full self came from: the same inventory slot, the same hand. If it truly
  cannot fit anywhere it is dropped at your feet rather than deleted.
- This applies to every route — the sell GUI, `/sell hand`, `/sellall` and the sell axe.

Set it to `false` for the old behaviour: the box and everything in it are sold together and the box is
gone. It also needs `worth-lore.shulker-totals`, since with contents left out of an item's worth there is
nothing to sell them for.

## What a payout is

```
worth × amount × category tier × permission multiplier × global multiplier
```

Rounded to two decimals, floored at zero. See [Sell Multipliers](/plugins/ddonutworth/features/sell-multipliers/) for the two
multiplier sources.

## Safety properties

**Money first, items second.** The payout is deposited before anything is removed, and a refused deposit
aborts the whole sale. An economy plugin that rejects a transaction — a full balance cap, a locked account,
a misbehaving hook — can never eat a player's inventory.

**One sale is one deposit.** Selling a mixed inventory does not fire dozens of separate transactions,
which keeps economy logs and transaction taxes sane.

**Worth lore is stripped first.** An item that picked up a `Worth: $x` line while sitting in a chest is
valued as its plain self, so a decorated chest sells for exactly the same amount as an undecorated one.

## Blacklisted worlds

```yaml
blacklisted-worlds:
  - Creative
```

Selling is refused entirely in these. Matching ignores capitalisation, so a typo in a world name is not a
loophole.

## Blocked game modes

```yaml
disabled-gamemodes:
  - CREATIVE
  - SPECTATOR
```

In these the plugin does nothing at all: no worth lore, no selling by any route, no sell axe.

**Leave `CREATIVE` in unless you know exactly why you are taking it out.** A creative player has unlimited
items, so any way for them to sell is unlimited money. This is an exploit guard, not a preference.

The check sits on the payout itself as well as on every command, GUI and the sell axe — so a route that
forgot to ask still cannot pay out.

## Messages

Every string is in [messages.yml](/plugins/ddonutworth/configuration/messages/):

| Key | When |
|---|---|
| `items.sold` | after selling one stack — `+$500` |
| `sell.summary` | after a multi-item sale |
| `sell.nothing` | nothing in the inventory was sellable |
| `sell.hand_empty` | `/sell` with an empty hand |
| `items.unsellable` | the held item has no price |
| `sell.gui_summary` / `sell.gui_nothing` | closing the sell GUI |
| `world_blacklist` | selling in a blacklisted world |
