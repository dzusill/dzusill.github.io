---
title: "Finding Things"
description: "Four ways into the shop besides the menu, plus a shortcut for buying the same thing again."
---

Four ways into the shop besides the menu, plus a shortcut for buying the same thing again.

All four are one paginated list menu with a different source behind it, so they look and behave the same
and each has its own file in `gui/`.

## Search

```
/shop search <query>
/shop search            (asks you to type it)
```

Matches the item's display name, its material name, its own id and its category id. That last pair
matters: an item with a blank display name keeps its vanilla, client-translated name, and the material is
then the only thing a player could search for — which is every item in `shops/gear.yml`.

A product with variants appears **once**, not once per final choice. Searching "night vision" should not
fill the screen with eight durations.

Results only include products you could actually open. That filtering happens per query, so granting
someone a rank works on their next search rather than after a reload.

```yaml
search:
  enabled: true
  input: auto      # auto | dialog | sign | chat
  min-length: 2
  max-results: 54
  match-material: true
```

`input` picks how you are asked to type:

- **dialog** — the client-side text box on 1.21.6+. Better than the alternatives: it does not close the
  world, it validates length, and cancelling is unambiguous.
- **chat** — type a line. Works everywhere.
- **auto** — a dialog where the client supports one, chat otherwise.
- **sign** — *not implemented*; falls back to chat and logs one line saying so. On 1.21.6+ a dialog is
  better than a sign editor anyway.

Closing or cancelling the input drops the pending search immediately rather than firing it later against
a menu that has moved on.

## Favourites

```
/shop favorites
```

Press **Q** on anything in the shop to add or remove it. The key is `favorites.toggle-click`; middle
click is refused however it is configured, because it only fires in creative.

A favourite of a variant is its own entry — Flight I and Flight III are two favourites.

Capped by `favorites.max`, 45 by default.

## Recently bought

```
/shop recent
```

**One entry per product, not per purchase.** Buying dirt every day leaves one row, not three hundred.
Kept up to `recent.size`.

## Popular items

```
/shop popular
```

Ranked on how many separate purchases a product has had, not how many units — so one player buying a
stack of dirt does not outrank forty players each buying a totem.

`popular.window-days` limits it to products still being bought.

> This is a discovery list, not analytics. The plugin keeps counters, never a transaction log — there is
> no per-purchase history to query, by design.

## Repeat

```
/shop repeat
```

**Reopens** your last purchase — same product, same variant, same amount — with every check running again
when you confirm: current price, current stock, current limits, current balance.

It is a shortcut to the buy screen, never a replay of the old quote. A one-click purchase at a price the
player has not seen is a different feature and a worse one.

## Entries that stop existing

A favourite or a recent entry is a *reference*, not a copy. If you delete the item it points at, it
quietly stops appearing — the page stays full rather than showing a hole or an error icon — and the row
is cleared away at the next startup.
