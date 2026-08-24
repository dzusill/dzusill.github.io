---
title: "Reloading"
description: "Reloads every config file, recompiles every category, re-reads messages.yml and Presentation, reloads"
---

```
/oberonsell reload
```

Reloads every config file, recompiles every category, re-reads `messages.yml` and `Presentation`, reloads
the price formatter and price lookup, and repaints any prices, history or multiplier GUI open at the time.

Needs `oberonsell.admin`.

An open **sell** menu is deliberately left alone: it holds items a player has put in, and a repaint that
rebuilt its slots would be a repaint that ate them.

## What a reload picks up

| Change | Live after reload |
|---|---|
| `config.yml` — pricing, rounding, price format, message Presentation, multipliers, blacklisted worlds, disabled game modes, custom-item sources, anti-dupe, auto-sell limits | ✅ |
| `config.yml` — the five settings listed below | ❌ needs a restart |
| `prices.yml` — entries added or removed by hand | ✅ |
| `enchantments.yml` — enchantment values and their levers | ✅ |
| `sell/*.yml` — patterns, tier ladders, icons, layouts | ✅ |
| `gui/*.yml` — titles, icons, slots, filler, including `gui/multipliers.yml` | ✅ |
| `sounds.yml`, `sellaxe.yml`, `messages.yml` | ✅ |
| Adding a **new** category file | ✅ if it's already in `multipliers.categories` |

## Settings that need a restart

A handful of settings are not read on demand — they decide, once, which listeners are registered, which
player-data store is built and which prompt the search uses. Re-reading the file cannot undo a decision
already made, so the reload **names them** instead of reporting success:

```
[ᴡᴏʀᴛʜ] Reloaded configs and dropped cached prices.
[ᴡᴏʀᴛʜ] These need a server restart to take effect: sellaxe.enabled
```

The full list: `worth-lore.enabled`, `sellaxe.enabled`, `search.input`, `storage.type` and
`multipliers.categories`.

Everything else in `config.yml` — including `worth-lore.shulker-totals`, `worth-lore.player-inventory`,
`worth-lore.inventories` and the excluded list — is read as it is used and takes effect immediately.
`worth-lore.player-inventory` used to be on the restart list too, back when it also decided whether a
now-removed sweep task got scheduled; the packet hook re-reads it on every packet, so it no longer needs
one.

> `auto-sell.enabled` is not on that list, but it does gate whether the pickup listener is registered at
> startup. Turning it **off** at runtime stops auto-sales, because the listener checks it on every pickup;
> turning it **on** at runtime does nothing until a restart registers the listener.

## Swapping the jar

`/oberonsell reload` re-reads YAML. It does **not** load a new `OberonSell.jar` — Java has the old classes
in memory and only a full server restart replaces them. Drop the new jar in, then `/stop` and start again;
reloading after a jar swap looks like the update did nothing, because from the running server's point of
view it did.

The same goes for `/reload confirm` and plugin-manager reloads: they are unsupported here, as they are for
most plugins that register listeners and packet handlers.

## playerdata.yml

Written by the plugin, not read back on reload. Records are held in memory and flushed every 2½ minutes, on
quit and on shutdown — so editing the file by hand while the server runs will have your changes overwritten
at the next flush. Stop the server first.

## Deletions stick

These sections are never merged from the jar's defaults, so an entry you delete stays deleted across
reloads and plugin updates:

- `items` in `prices.yml`
- `values` in `enchantments.yml`
- `matches` and `progress.requirements` in each `sell/<id>.yml`
- `custom-items` in `config.yml`
- `items` in each `gui/*.yml`
- `players` in `playerdata.yml`
- `sell-axe.enchants` in `sellaxe.yml`

**`prices.by-material` and `prices.by-serialized` are the exception.** They are shipped data and **are**
merged, so an entry deleted there returns on the next start. Use `/setworth <key> 0` instead — see
[prices.yml](/plugins/oberonsell/configuration/prices/#making-a-migrated-price-unsellable).

New keys added by a plugin update **are** merged in, with their comments — but only outside the ignored
sections.

That cuts both ways on an update. If a new version ships a new **icon**, it lands inside `items`, so your
existing `gui/*.yml` will not grow it: the plugin falls back to the shipped defaults for wired-up icons, and
you copy the block from the [GUIs page](/plugins/oberonsell/configuration/guis/) if you want to change it. Likewise a changed **default** for
a key you already have — `fill-material`, say — keeps your value, because a merge only adds what is missing.
Delete the key (or the whole file) to take the new default.

## When a reload isn't enough

Restart for: any setting in [the list above](#settings-that-need-a-restart), a new `OberonSell.jar`, or
installing Vault / PlaceholderAPI / ProtocolLib for the first time — integrations are wired at startup.
