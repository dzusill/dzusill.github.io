---
title: "Requirements"
description: "Vault is not optional. With no economy provider there is nothing to pay players with, so the plugin"
---

| Requirement | Version | Notes |
|---|---|---|
| Server | Paper **1.21+** | Purpur and Folia work too |
| Java | **21** | |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | **1.3.0** | Hard dependency — deployed as its own jar |
| Vault + an economy plugin | any | **Required.** Payouts go through it |
| [dRotatingShop](/plugins/drotatingshop/) | 1.1.0+ | Optional, but the default price source |
| PlaceholderAPI | 2.11+ | Optional — for the [placeholders](/plugins/ddonutworth/placeholders/) |

## About Vault

Vault is **not** optional. With no economy provider there is nothing to pay players with, so the plugin
logs an error and disables itself rather than pretending to work:

```
[dDonutWorth] Vault economy not found — dDonutWorth needs one to pay players. Disabling.
```

Install any Vault-compatible economy (EssentialsX Economy, CMI, and so on) and restart.

## About dRotatingShop

dRotatingShop is a **soft** dependency. Without it the plugin still runs — it just takes every price from
[prices.yml](/plugins/ddonutworth/configuration/prices/) instead of deriving them. See
[Price Sources](/plugins/ddonutworth/features/price-sources/) for the two modes.

If you run it, load order takes care of itself: dDonutWorth declares it as a soft dependency, so the shop is
always up first.

## About custom-item plugins

MMOItems, Oraxen, Nexo and ItemsAdder need **nothing installed on our side** and are not dependencies. Each
writes its item id into the item's persistent data, which plain Bukkit can read. See
[Custom Items](/plugins/ddonutworth/features/custom-items/).
