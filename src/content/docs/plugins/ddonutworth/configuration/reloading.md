---
title: "Reloading"
description: "Reloads every config file, recompiles the category patterns, re-reads messages.yml, drops the cached shop"
---

```
/ddonutworth reload
```

Reloads every config file, recompiles the category patterns, re-reads `messages.yml`, drops the cached shop
price table, and repaints any prices, history or multiplier GUI that is open at the time.

Needs `ddonutworth.admin`.

## What a reload picks up

| Change | Live after reload |
|---|---|
| `config.yml` — ratios, multipliers, blacklisted worlds, disabled game modes, custom-item sources | ✅ |
| `config.yml` — the eight settings listed below | ❌ needs a restart |
| `prices.yml` — overrides added or removed by hand | ✅ |
| `sell/*.yml` — patterns, tier ladders, icons, layouts | ✅ |
| `gui/*.yml` — titles, icons, slots, filler | ✅ |
| `sounds.yml`, `sellaxe.yml`, `messages.yml` | ✅ |
| Adding a **new** category file | ✅ if it's already in `multipliers.categories` |

## Settings that need a restart

A handful of settings are not read on demand — they decide, once, which listeners are registered, which
player-data store is built and which prompt the search uses. Re-reading the file cannot undo a decision
already made, so the reload **names them** instead of reporting success:

```
[ᴡᴏʀᴛʜ] Reloaded configs and dropped cached prices.
[ᴡᴏʀᴛʜ] These need a server restart to take effect: worth-lore.mode
```

The full list: `worth-lore.enabled`, `worth-lore.mode`, `worth-lore.refresh-ticks`,
`worth-lore.player-inventory`, `sellaxe.enabled`, `search.input`, `storage.type` and
`multipliers.categories`.

Everything else in `config.yml` — including `worth-lore.shulker-totals`, `worth-lore.inventories` and the
excluded list — is read as it is used and takes effect immediately.

## Swapping the jar

`/ddonutworth reload` re-reads YAML. It does **not** load a new `dDonutWorth.jar` — Java has the old classes
in memory and only a full server restart replaces them. Drop the new jar in, then `/stop` and start again;
reloading after a jar swap looks like the update did nothing, because from the running server's point of
view it did.

The same goes for `/reload confirm` and plugin-manager reloads: they are unsupported here, as they are for
most plugins that register listeners and packet handlers.

## Changes elsewhere

**dRotatingShop prices.** The shop's blanket adjustment is read live — no reload needed on either side.
Items added or repriced there are picked up within 30 seconds, or immediately after `/ddonutworth reload`
or the GUI's refresh button.

**`playerdata.yml`.** Written by the plugin, not read back on reload. Editing it by hand while the server
runs will have your changes overwritten at the next flush.

## Deletions stick

These sections are never merged from the jar's defaults, so an entry you delete stays deleted across
reloads and plugin updates:

- `items` in `prices.yml`
- `matches` and `progress.requirements` in each `sell/<id>.yml`
- `custom-items` in `config.yml`
- `items` in each `gui/*.yml`

New keys added by a plugin update **are** merged in, with their comments — but only outside those sections.

That cuts both ways on an update. If a new version ships a new **icon**, it lands inside `items`, so your
existing `gui/*.yml` will not grow it: the plugin falls back to the shipped defaults for wired-up icons, and
you copy the block from the [GUIs page](/plugins/ddonutworth/configuration/guis/) if you want to change it. Likewise a changed **default** for
a key you already have — `fill-material`, say — keeps your value, because a merge only adds what is missing.
Delete the key (or the whole file) to take the new default.

## When a reload isn't enough

Restart for: any setting in [the list above](#settings-that-need-a-restart), a new `dDonutWorth.jar`, or
installing dRotatingShop / Vault / PlaceholderAPI / ProtocolLib for the first time — integrations are wired
at startup.
