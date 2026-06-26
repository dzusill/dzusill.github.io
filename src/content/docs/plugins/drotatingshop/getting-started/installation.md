---
title: "Installation"
description: "DRotatingShop depends on DzusillCore. Drop DzusillCore-x.y.z.jar into plugins/ first."
---

## 1. Install DzusillCore

DRotatingShop **depends** on [DzusillCore](https://github.com/dzusill/DzusillCore). Drop `DzusillCore-x.y.z.jar` into `plugins/` first.

## 2. Install Vault + an economy

DRotatingShop charges purchases through [Vault](https://www.spigotmc.org/resources/vault.34315/). Install Vault **and** an economy provider (EssentialsX, CMI, …). Without one the plugin disables itself.

## 3. Drop in DRotatingShop

Place `DRotatingShop.jar` into `plugins/` and restart the server. On first start it creates:

```
plugins/DRotatingShop/
├── config.yml      # command alias, rotation interval, GUI title & filler
├── items.yml       # the item pool — ships EMPTY
├── messages.yml    # all player-facing text (MiniMessage)
└── data.yml        # runtime state (rotation, stock, purchases) — do not edit
```

## 4. Add some items

The pool starts **empty**, so the first rotation has nothing to show. Fill it either way:

- **Hold an item** and run `/dshop additem <price> <stock> [limit]` — it's serialised straight into `items.yml`.
- **Edit `items.yml`** by hand to add vanilla items, then `/dshop reload`.

See [Custom Items](/plugins/drotatingshop/features/custom-items/) and [items.yml](/plugins/drotatingshop/configuration/items/).

## 5. Verify

```
/dshop additem 250 -1     # hold e.g. a Diamond
/dshop rotate             # force a rotation so the item shows now
/market                   # open the shop
```

The shop GUI should open with your item and a countdown clock. Tune the command name, interval and GUI in [config.yml](/plugins/drotatingshop/configuration/config/).

Next: the [Quick Start](/plugins/drotatingshop/getting-started/quick-start/).
