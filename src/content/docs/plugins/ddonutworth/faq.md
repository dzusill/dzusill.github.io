---
title: "FAQ & Troubleshooting"
description: "No, and there never will be. The plugin makes no network calls, so it cannot stop working because a key"
---

## Is there a license key?

No, and there never will be. The plugin makes no network calls, so it cannot stop working because a key
server was down or a key check misfired.

## Everything says "not sellable"

Check, in order:

1. **Is dRotatingShop running?** The startup log says where prices come from. Without it and without
   entries in `prices.yml`, nothing has a price.
2. **Is `pricing.source` right?** `independent` ignores the shop even when it is installed.
3. **Does the shop actually price that item?** `/dshop list` in dRotatingShop.

## Prices didn't change after I edited the shop

The shop's **blanket adjustment** is live — no reload anywhere. Items **added or repriced** in the shop are
cached for 30 seconds; wait, hit the refresh button in `/worth gui`, or run `/ddonutworth reload`.

## A price is wrong for one item

```
/setworth <price>
```

while holding it. An override always beats the derived price. `/delworth` puts it back.

## Sell prices are too high / too low across the board

`pricing.sell-ratio` in `config.yml`. `0.20` means 20% of the buy price. That one number is what most
servers tune.

## Worth lore isn't showing

- `worth-lore.enabled: true`?
- Is that inventory in `worth-lore.inventories`? Add its `InventoryType` name (`CHEST`, `BARREL`, …) or
  part of its title.
- Has the player run `/toggleworth`?
- Does the item have a price at all? Try `/worth` on it.

## Worth lore is stuck on some items in a chest

That happens if the server crashed while the chest was open. Stand near it and run:

```
/ddonutworth cleanup 16
```

## A renamed item lost its price

It shouldn't — renaming does not change an item's key, so a diamond called "Bob" still sells for the
diamond price. If it genuinely has no price, check whether something else on it (custom model data, another
plugin's NBT) is giving it a more specific key that isn't priced. `/worth` will tell you.

## An MMOItems / Oraxen item isn't recognised

Check `custom-items` in `config.yml`. The namespace or tag name may differ in your version — it is a config
edit, not a plugin update. If it still won't resolve, `/setworth` on it anyway: an item no source claims is
stored with a copy of itself and works regardless.

## Selling gives no money

Vault. Without an economy provider the plugin disables itself at startup with an error in the log. If it is
running but nothing arrives, the economy plugin is refusing the deposit — a balance cap is the usual
cause. Nothing is consumed when a deposit is refused, so no items are lost.

## A player's multiplier went down

It can't. Tiers are high-water marks and are never lowered, even if you raise a requirement or change a
category's patterns. If a *payout* dropped, check `pricing.global-multiplier` and whether their permission
node changed.

## The rank-up message fired twice

It can't fire twice for the same tier. Two different **categories** crossing a tier in one sale sends two
messages — that is one per category, which is intended.

## Can I use MySQL?

Not yet. `storage.type` accepts only `yaml`; anything else logs a warning and falls back. Player records
live in `playerdata.yml`.

## Can I import my old DonutWorth prices?

Not automatically. The old numbered format (`item_17: 7000.0`) is not read — see
[Readable Item Keys](/plugins/ddonutworth/features/item-keys/) for why. Either let dRotatingShop supply prices, or re-add the
handful you want to override with `/setworth`.

Your **GUI** files and `sell/<category>.yml` layouts do largely paste in.

## Does it work on Folia?

Yes. The framework's scheduler is region-aware, and worth-lore refreshes are dispatched to the thread that
owns each viewer.

## Which plugins does it need?

DzusillCore and a Vault economy. Everything else — dRotatingShop, PlaceholderAPI, MMOItems, Oraxen, Nexo,
ItemsAdder — is optional, and the custom-item plugins are not even dependencies.
