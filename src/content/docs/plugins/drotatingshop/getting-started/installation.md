---
title: "Installation"
description: "dRotatingShop depends on DzusillCore. Drop DzusillCore-x.y.z.jar into plugins/ first."
---

## 1. Install DzusillCore

dRotatingShop **depends** on [DzusillCore](https://github.com/dzusill/DzusillCore). Drop `DzusillCore-x.y.z.jar` into `plugins/` first.

## 2. Install Vault + an economy

dRotatingShop charges purchases through [Vault](https://www.spigotmc.org/resources/vault.34315/). Install Vault **and** an economy provider (EssentialsX, CMI, …). Without one the plugin disables itself.

## 3. Drop in dRotatingShop

Place `dRotatingShop.jar` into `plugins/` and restart the server. On first start it creates:

```
plugins/dRotatingShop/
├── config.yml          # command alias, rotation interval, opening hours, GUI, seed defaults, sounds
├── items.yml           # the item pool (seeded on first start — see below)
├── prices_1_21.yml     # bundled default 1.21 price list used to seed items.yml
├── quantity-menu.yml   # layout & icons of the buy / quantity picker
├── messages.yml        # all player-facing text (MiniMessage)
└── data.yml            # runtime state (rotation, stock, purchases) — do not edit
```

## 4. The pool is seeded for you

On the **very first start** — while `items.yml` has no items — dRotatingShop migrates the bundled [prices_1_21.yml](/plugins/drotatingshop/configuration/default-prices/) into `items.yml`: ~1,200 vanilla items, priced, with default stock and per-player limits. So the shop works out of the box.

Want to load (or re-load) the catalogue later? Run:

```
/dshop seed
```

See [Default Prices](/plugins/drotatingshop/configuration/default-prices/).

## 5. Verify

```
/dshop rotate     # force a rotation so items show now
/market           # open the shop
```

The shop GUI opens with the seeded items and a countdown clock. Click an item to open the [buy menu](/plugins/drotatingshop/features/the-buy-menu/).

Next: the [Quick Start](/plugins/drotatingshop/getting-started/quick-start/).
