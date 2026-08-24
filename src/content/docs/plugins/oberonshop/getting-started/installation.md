---
title: "Installation"
description: "That third step is the one worth not skipping. It reports storage, every category and product count,"
---

1. Drop **OberonCore.jar** and **OberonShop.jar** into `plugins/`.
2. Start the server.
3. Run `/adminshop doctor`.

That third step is the one worth not skipping. It reports storage, every category and product count,
every currency and whether its plugin is actually installed, and anything in your config that could not
be read.

## What a good start looks like

Four lines from `[OberonShop]`:

```
Storage ready (sqlite).
Loaded 11 categories, 82 products.
Registered the %oshop_...% placeholders.
Enabled successfully.
```

The category and product count is the number to check. Lower than you expect means a file failed to
parse, and the line above says which one and why.

## What gets written out

On first run, into `plugins/OberonShop/`:

```
config.yml
messages.yml
gui/     maingui.yml, buy.yml, variant.yml, search.yml,
         favorites.yml, recent.yml, popular.yml
shops/   eleven category files, two _example templates,
         EXAMPLES_README.txt
```

**`shops/` is seeded once and then belongs to you.** A category you delete stays deleted — the shipped
copies are a starting point, not a set of defaults that get restored. `config.yml` and the GUI files do
gain new keys on upgrade, except for the sections you curate; see
[config.yml](/plugins/oberonshop/configuration/config/#sections-that-are-never-merged).

## Upgrading

Replace the jar and restart. Config files are merged, so new settings appear with their defaults and your
edits stay.

**Keep OberonCore in step.** It is a separate jar, so running an older core against a newer OberonShop is
a `NoSuchMethodError` waiting for whichever call moved. Update both together.

## Two plugins want `/shop`

If another plugin on your server also registers `/shop`, whichever loads last wins — Bukkit does not warn
about it. Change one of them:

```yaml
command:
  shop: "shop"          # what players type to open the shop
  admin: "adminshop"
```

`/adminshop doctor` prints the names actually in use.
