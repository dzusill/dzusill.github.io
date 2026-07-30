---
title: "Reloading"
description: "Reloads every config file, recompiles the category patterns, re-reads messages.yml, and drops the cached"
---

```
/ddonutworth reload
```

Reloads every config file, recompiles the category patterns, re-reads `messages.yml`, and drops the cached
shop price table.

Needs `ddonutworth.admin`.

## What a reload picks up

| Change | Live after reload |
|---|---|
| `config.yml` — ratios, worth-lore settings, blacklisted worlds, custom-item sources | ✅ |
| `prices.yml` — overrides added or removed by hand | ✅ |
| `sell/*.yml` — patterns, tier ladders, icons, layouts | ✅ |
| `gui/*.yml` — titles, icons, slots | ✅ (reopen the menu) |
| `sounds.yml`, `sellaxe.yml`, `messages.yml` | ✅ |
| Adding a **new** category file | ✅ if it's already in `multipliers.categories` |
| `multipliers.categories` itself | ❌ needs a restart |

The category list is read once at startup because each file becomes a registered config; adding to the list
needs a restart.

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

New keys added by a plugin update **are** merged in, with their comments.

## When a reload isn't enough

Restart for: a new entry in `multipliers.categories`, a change to `storage.type`, or installing
dRotatingShop / Vault / PlaceholderAPI for the first time — integrations are wired at startup.
