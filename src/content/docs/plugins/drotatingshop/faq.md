---
title: "FAQ & Troubleshooting"
description: "Install DzusillCore first — it's a hard dependency. Check the console for \"unknown/invalid plugin DzusillCore\"."
---

### DRotatingShop won't enable

Install [DzusillCore](https://github.com/dzusill/DzusillCore) first — it's a hard dependency. Check the console for *"unknown/invalid plugin DzusillCore"*.

### It enables, then disables itself

There's no Vault economy. The console logs *"Vault economy not found — DRotatingShop requires Vault."* Install [Vault](https://www.spigotmc.org/resources/vault.34315/) **and** an economy plugin (EssentialsX, CMI, …). See [Requirements](/plugins/drotatingshop/getting-started/requirements/).

### `/market` says unknown command

Either the command was renamed (`shop.command` in [config.yml](/plugins/drotatingshop/configuration/config/) — check what it's set to), or you renamed it and haven't restarted. The shop command is registered at startup, so a **rename needs a restart**.

### The shop is empty

The pool ships empty. Add items with `/dshop additem` (hold one) or by editing [items.yml](/plugins/drotatingshop/configuration/items/), then `/dshop reload`.

### I added an item but it isn't in the shop

Items only appear when a [rotation](/plugins/drotatingshop/features/rotations/) picks them. Run `/dshop rotate` to start a new rotation now, or wait for the next one.

### `/dshop additem` says "You must be holding an item"

Your main hand is empty. Hold the item you want to sell, then run the command.

### A custom item disappeared after a version change

`nbt-base64` items are tied to the version they were serialised on. On an incompatible version DRotatingShop skips the unreadable item (with a console warning) and loads the rest. Re-add it with `/dshop additem` on the new version. See [Custom Items](/plugins/drotatingshop/features/custom-items/).

### An item bought but dropped on the ground

Your inventory was full. Purchases still complete — the item drops at your feet and you're charged. Clear space and it'll go straight to your inventory. See [Buying Items](/plugins/drotatingshop/features/buying/).

### How do I reset stock or purchase counts?

They reset automatically on every rotation. To wipe everything immediately, `/dshop rotate`. To clear all persisted state, stop the server, delete `data.yml`, and restart. See [data.yml](/plugins/drotatingshop/configuration/data/).

### I changed the rotation interval but nothing happened

The running timer finishes first; the new interval applies at the next reschedule. Run `/dshop reload` then `/dshop rotate` to apply it right away.

### Does `/dshop reload` wipe the current rotation?

No. Reload re-reads `config.yml`/`items.yml`/`messages.yml` and rebuilds the pool, but **never touches `data.yml`** — the rotation, stock and purchases are preserved. See [Reloading](/plugins/drotatingshop/configuration/reloading/).
