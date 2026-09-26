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
[GUIs](/plugins/oberonsell/configuration/guis/).

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

Sells everything sellable in the hotbar and the main inventory, and leaves everything else alone — **after
asking**.

### The confirmation

A sell-all is the one sale that takes things you never pointed at, so by default it opens a small menu
first:

- a **summary** — what the sale pays (your multipliers included), how many items, how many kinds, and the
  five most valuable kinds with what each fetches
- **Confirm** — sells exactly that, in one payout, and closes the menu
- **Cancel** — closes the menu and sells nothing. Pressing Escape does the same

Nothing is sold, taken or rewritten until Confirm is clicked, so cancelling leaves every item exactly as it
was. While the menu is open your own inventory is frozen: clicks, shift-clicks, drops and drags in it are
refused, because it is the very thing being priced.

**If the inventory changes anyway** — you pick something up, or another plugin takes something — the next
click on Confirm does not sell. It redraws the summary with the new figures and tells you so
(`sellall.changed`); the click after that sells at the figures now on screen. You are never paid a sum you
were not shown. A double click, or a burst of clicks, is one confirmation: the menu sells once and the
[`anti-dupe`](/plugins/oberonsell/configuration/config/#anti-dupe) cooldown applies to its button as it does to the sell
menu's.

Turn it off for everyone with [`sell-all.confirm.enabled: false`](/plugins/oberonsell/configuration/config/#sell-all), or
for one rank with `oberonsell.sellall.noconfirm` — see
[Skipping the confirmation](/plugins/oberonsell/commands-and-permissions/#skipping-the-sell-all-confirmation). The menu's
look, slots and sounds are [`gui/sellall-confirm.yml`](/plugins/oberonsell/configuration/guis/#guisellall-confirmyml--sell-all-confirmation).

With nothing sellable in the inventory there is nothing to confirm: you get `sell.nothing` instead of a
menu.

### Which slots

**Worn armour and the offhand are not sold** — they are gear in use, not loot, and a sell-all used to take a
priced chestplate or a totem along with the cobblestone. Which parts of the inventory count is
[`sell-all.slots`](/plugins/oberonsell/configuration/config/#sell-all); switch `armor` or `offhand` on to include them. The
confirmation's summary covers the same slots the sale takes, so what it shows is what goes.

### Permission

Both forms need `oberonsell.sellall`, which is **off by default** — it is the node servers hand to a
rank. The node describes the feature, not the spelling: `/sell all` is the same thing typed differently
and would otherwise be a free bypass of the perk. See
[Rank perks](/plugins/oberonsell/commands-and-permissions/#rank-perks).

## As you pick things up

```
/sell auto      (alias /sell autosell)
```

Per-player, persisted. See [Auto-Sell](/plugins/oberonsell/features/auto-sell/).

## A sell axe

Right-click a container. See [The Sell Axe](/plugins/oberonsell/features/the-sell-axe/).

## What a payout is

```
worth × amount × category tier × permission multiplier × global multiplier
```

Held exactly and rounded once at `pricing.rounding` (two decimals, `HALF_UP` by default), floored at zero.
See [Sell Multipliers](/plugins/oberonsell/features/sell-multipliers/) for the two multiplier sources and
[Pricing](/plugins/oberonsell/features/pricing/#money-is-exact) for the arithmetic.

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
sell from it — a sell-all holds the same lock on the player's own inventory; and a per-player cooldown on
GUI sales, `anti-dupe.click-cooldown-ms` (250 ms by default), so a player spamming the confirm button cannot
start the second sale before the first has removed its items.

**Worth lore is stripped first.** An item that picked up a `Worth: $x` line while sitting in a chest is
valued as its plain self, so a decorated chest sells for exactly the same amount as an undecorated one. A
sell-all strips only the slots it is about to sell, immediately before selling them; the rest of the
inventory is not rewritten.

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

Every string is in [messages.yml](/plugins/oberonsell/configuration/messages/):

| Key | When |
|---|---|
| `items.sold` | after selling one stack — `+$500` |
| `sell.summary` | after a multi-item sale — `{price}`, `{amount}`, `{items}` |
| `sell.nothing` | nothing in the inventory was sellable |
| `sell.hand_empty` | `/sell hand` with an empty hand |
| `items.unsellable` | the held item has no price |
| `sell.gui_summary` / `sell.gui_nothing` | closing the sell GUI |
| `sellall.changed` | Confirm clicked after the inventory changed; nothing sold — `{price}`, `{amount}`, `{items}` |
| `sellall.cancelled` | the sell-all confirmation cancelled or closed. `""` says nothing |
| `world_blacklist` | selling in a blacklisted world |
| `gamemode_blocked` | selling in a disabled game mode — `{gamemode}` |
| `no_economy` | the economy refused the deposit, or none is available |
