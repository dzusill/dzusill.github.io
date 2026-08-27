---
title: "Selling"
description: "Five ways to sell, all going through the same payout path."
---

Five ways to sell, all going through the same payout path.

## The sell menu

```
/sell
/sellgui        (alias /sellmenu)
```

Opens a menu you drop items into. Close it — or click the **Close and Sell** star — and the sale settles in
**one** payout with one summary message.

This is what the bare `/sell` does, because it is what players reach for and it is far harder to sell
something by accident: you see what you put in before it goes.

Anything unsellable is handed straight back — into the inventory if there is room, dropped at your feet if
not — so a mis-drop never costs an item. Which slots accept items is up to you; see
[GUIs](/plugins/dsell/configuration/guis/).

## From your hand

```
/sell hand
```

Sells the stack you are holding.

## Your whole inventory

```
/sellall
/sell all       (aliases: inventory, everything)
```

Sells everything sellable and leaves everything else alone.

## As you pick things up

```
/sell auto      (alias /sell autosell)
```

Per-player, persisted. See [Auto-Sell](/plugins/dsell/features/auto-sell/).

## A sell axe

Right-click a container. See [The Sell Axe](/plugins/dsell/features/the-sell-axe/).

## What a payout is

```
worth × amount × category tier × permission multiplier × global multiplier
```

Held exactly and rounded once at `pricing.rounding` (two decimals, `HALF_UP` by default), floored at zero.
See [Sell Multipliers](/plugins/dsell/features/sell-multipliers/) for the two multiplier sources and
[Pricing](/plugins/dsell/features/pricing/#money-is-exact) for the arithmetic.

A container item pays for what it carries: selling a packed shulker box hands the contents over too, so the
payout covers them — the same figure the tooltip shows.

## Safety properties

**Money first, items second.** The payout is deposited before anything is removed, and a refused deposit
aborts the whole sale and hands every item back. An economy plugin that rejects a transaction — a balance
cap, a locked account, a misbehaving hook — can never eat a player's inventory.

**One sale is one deposit.** Selling a mixed inventory does not fire dozens of separate transactions,
which keeps economy logs and transaction taxes sane.

**A slot is only cleared if it still holds what was paid for.** A Vault deposit runs third-party listener
code on this thread before it returns, and that code can move, merge or replace the very items that were
just valued. Each slot is re-read after the payout and cleared only when it still matches — so a stack that
was swapped out mid-sale is left alone rather than destroyed.

**Two locks stop a double payout.** One per container, so two players clicking the same chest cannot both
sell from it; and a per-player cooldown on GUI sales, `anti-dupe.click-cooldown-ms` (250 ms by default), so
a player spamming the confirm button cannot start the second sale before the first has removed its items.

**Worth lore is stripped first.** An item that picked up a `Worth: $x` line while sitting in a chest is
valued as its plain self, so a decorated chest sells for exactly the same amount as an undecorated one.

**Nothing unpaid-for disappears.** Whatever the payout would not cover comes back to the caller — the
unpriced items on a normal sale, and every item on a refusal. The sell GUI, which empties its slots before
settling, returns exactly that list.

## Blacklisted worlds

```yaml
blacklisted-worlds:
  - Creative
```

Selling is refused entirely in these. Matching ignores capitalisation, so a typo in a world name's case is
not a loophole.

## Blocked game modes

```yaml
disabled-gamemodes:
  - CREATIVE
  - SPECTATOR
```

In these the plugin does nothing at all: no worth lore, no selling by any route, no sell axe, no auto-sell.

**Leave `CREATIVE` in unless you know exactly why you are taking it out.** A creative player has unlimited
items, so any way for them to sell is unlimited money. This is an exploit guard, not a preference. An empty
list falls back to `CREATIVE` and `SPECTATOR` rather than to nothing.

The check sits on the payout itself as well as on every command, GUI and the sell axe — so a route that
forgot to ask still cannot pay out.

## Messages

Every string is in [messages.yml](/plugins/dsell/configuration/messages/):

| Key | When |
|---|---|
| `items.sold` | after selling one stack — `+$500` |
| `sell.summary` | after a multi-item sale — `{price}`, `{amount}`, `{items}` |
| `sell.nothing` | nothing in the inventory was sellable |
| `sell.hand_empty` | `/sell hand` with an empty hand |
| `items.unsellable` | the held item has no price |
| `sell.gui_summary` / `sell.gui_nothing` | closing the sell GUI |
| `world_blacklist` | selling in a blacklisted world |
| `gamemode_blocked` | selling in a disabled game mode — `{gamemode}` |
| `no_economy` | the economy refused the deposit, or none is available |
