---
title: "Requirements"
description: "Any Vault-compatible economy works (EssentialsX, CMI, etc.) — DRotatingShop talks to Vault, not to a specific economy plugin."
---

## Server

| Requirement | Version | Notes |
|---|---|---|
| Server software | Paper **1.21** | Spigot works; Paper recommended. |
| Java | **21** | Required by 1.21. |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | latest | **Hard dependency** — DRotatingShop won't enable without it. |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) + an economy plugin | latest | **Required** — purchases are charged through Vault. With no economy provider the plugin disables itself. |

Any Vault-compatible economy works (EssentialsX, CMI, etc.) — DRotatingShop talks to Vault, not to a specific economy plugin.

## Optional integrations

Soft dependencies — DRotatingShop loads without them and simply skips the related feature.

| Plugin | Enables |
|---|---|
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | The `%drotatingshop_next_rotation%` [placeholder](/plugins/drotatingshop/placeholders/). |

> **Install DzusillCore first.** Put `DzusillCore-x.y.z.jar` in `plugins/` before DRotatingShop. If it's missing, the server logs an *"unknown/invalid plugin DzusillCore"* error and DRotatingShop stays disabled.

> **No Vault, no shop.** If Vault (or its economy provider) isn't present, the console logs *"Vault economy not found — DRotatingShop requires Vault"* and the plugin disables on the next tick.
