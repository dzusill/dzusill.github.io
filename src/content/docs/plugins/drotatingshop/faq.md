---
title: "FAQ & Troubleshooting"
description: "Install DzusillCore first — it's a hard dependency. Check the console for \"unknown/invalid plugin DzusillCore\"."
---

### dRotatingShop won't enable

Install [DzusillCore](https://github.com/dzusill/DzusillCore) first — it's a hard dependency. Check the console for *"unknown/invalid plugin DzusillCore"*.

### It enables, then disables itself

There's no Vault economy. The console logs *"Vault is not installed. dRotatingShop requires a Vault-compatible economy."* Install [Vault](https://www.spigotmc.org/resources/vault.34315/) **and** an economy plugin (EssentialsX, CMI, …). See [Requirements](/plugins/drotatingshop/getting-started/requirements/).

### `/market` says unknown command

Either the command was renamed (`shop.command` in [config.yml](/plugins/drotatingshop/configuration/config/) — check what it's set to), or you renamed it and haven't restarted. The shop command is registered at startup, so a **rename needs a restart**.

### `/market` says "the market is closed"

You've set `shop.open-duration` to a non-zero value, so the market is only open for a window after each rotation. Wait for the countdown, or run `/dshop rotate` to open it now. Set `open-duration: 0` to keep it always open. See [Opening Hours](/plugins/drotatingshop/features/opening-hours/).

### The default 1.21 items didn't load

The catalogue auto-seeds **only on a fresh first start** — when `items.yml` is empty *and* `data.yml` has never been seeded. If you'd already added a few items (so the pool wasn't empty), the seed was skipped. Just run:

```
/dshop seed
```

It loads the [price list](/plugins/drotatingshop/configuration/default-prices/), skipping ids you already have. To start completely fresh instead, stop the server, delete `data.yml` + `items.yml`, and restart.

### The shop is empty

Nothing is in the pool, or nothing has rotated in yet. Run `/dshop seed` (default catalogue) or `/dshop additem` (your own), then `/dshop rotate` to show items immediately.

### I added an item but it isn't in the shop

Items only appear when a [rotation](/plugins/drotatingshop/features/rotations/) picks them. Run `/dshop rotate` to start a new rotation now, or wait for the next one.

### `/dshop additem` says "You must be holding an item"

Your main hand is empty. Hold the item you want to sell, then run the command.

### A player bought more/less than I expected

A single purchase is capped at **one stack** and at `min(stack size, stock, their remaining limit)`. They can buy again to get more. See [The Buy Menu](/plugins/drotatingshop/features/the-buy-menu/) and [Stock & Limits](/plugins/drotatingshop/features/stock-and-limits/).

### An item bought but dropped on the ground

The inventory was full. Purchases still complete — the overflow drops at the player's feet and they're charged. See [Buying Items](/plugins/drotatingshop/features/buying/).

### A custom item disappeared after a version change

`nbt-base64` items are tied to the version they were serialised on. On an incompatible version dRotatingShop skips the unreadable item (with a console warning) and loads the rest. Re-add it with `/dshop additem` on the new version. See [Custom Items](/plugins/drotatingshop/features/custom-items/).

### There's no sound / I want different sounds

Check `sounds.enabled: true` in [config.yml](/plugins/drotatingshop/configuration/config/) and that each event has a valid `sound:` key. Blank keys mute that event. See [Sounds](/plugins/drotatingshop/configuration/sounds/).

### How do I restyle the buy menu / use heads?

Edit [quantity-menu.yml](/plugins/drotatingshop/configuration/quantity-menu/) — every slot, icon, name and lore is configurable, and each button can use a `material:` or a custom `head:` texture. Then `/dshop reload`.

### How do I reset stock or purchase counts?

They reset automatically on every rotation. To wipe everything immediately, `/dshop rotate`. To clear all persisted state, stop the server, delete `data.yml`, and restart. See [data.yml](/plugins/drotatingshop/configuration/data/).

### Does `/dshop reload` wipe the current rotation?

No. Reload re-reads `config.yml` / `items.yml` / `quantity-menu.yml` / `messages.yml` and rebuilds the pool, but **never touches `data.yml`** — the rotation, stock and purchases are preserved. See [Reloading](/plugins/drotatingshop/configuration/reloading/).
