---
title: "Installation"
description: "Into plugins/:"
---

## 1. Drop in the jars

Into `plugins/`:

- `DzusillCore.jar` — the framework, deployed as its own jar
- a Vault-compatible economy
- `dDonutWorth.jar`
- optionally `dRotatingShop.jar` — the default price source

## 2. Start the server

On first start the plugin writes its configs and tells you where prices are coming from:

```
[dDonutWorth] Reading buy prices from dRotatingShop; sell worth is 20% of them.
```

Without the shop you get this instead, and worth comes from `prices.yml` alone:

```
[dDonutWorth] Pricing source is 'dRotatingShop' but that plugin is not enabled.
              Falling back to prices.yml only — install it, or set pricing.source
              to 'independent' to silence this.
```

That is a supported setup, not an error. Set `pricing.source: independent` in
[config.yml](/plugins/ddonutworth/configuration/config/) if you meant it.

## 3. Check it works

```
/worth
```

Hold something and run it. With dRotatingShop installed you should already get a price without configuring
anything, because the shop seeds its pool from its own bundled 1.21 price list — most vanilla items are
priced before you touch a file.

## What gets created

```
plugins/dDonutWorth/
├── config.yml            main settings
├── prices.yml            your worth overrides (starts empty)
├── messages.yml          every user-facing string
├── sounds.yml            named sounds the GUIs reference
├── sellaxe.yml           the sell axe's look and timer format
├── playerdata.yml        player records (written by the plugin)
├── gui/
│   ├── worth.yml         item prices GUI
│   ├── sell.yml          drop-in sell GUI
│   ├── history.yml       sell history GUI
│   └── multipliers.yml   multiplier overview + tier icon styling
└── sell/
    ├── ores.yml          one file per sell category:
    ├── crops.yml         its icon, its item patterns, its tier ladder
    ├── blocks.yml
    ├── mobdrops.yml
    ├── naturalitems.yml
    ├── fish.yml
    ├── potions.yml
    ├── enchantedbooks.yml
    └── armorandtools.yml
```

## Updating

Replace the jar and restart. New config keys are merged in with their comments; the sections you curate —
`items` in `prices.yml`, each category's `matches` and `progress.requirements`, `custom-items`, and each
GUI's `items` — are **never** merged, so an entry you deleted stays deleted.

## Coming from DonutWorth / SellWorth

Your existing GUI files largely paste in: the icon keys (`name`, `lore`, `material`, `slot`,
`customModelData`, `sound`), the cycling-button styling (`selected_color`, `unselected_color`,
`bullet_icon`), `collect_slots` and the `sell/<category>.yml` progress layout all use the same names. In
**those** files both colour dialects work too — legacy `&f` codes and bare `#00F986` hex, alongside
MiniMessage.

Three things do **not** carry over:

- **`messages.yml` colours.** Chat is MiniMessage only, so `&7` and a bare `#00F986` would print as text
  rather than colour it. Write `<gray>` and `<#00F986>`. See [messages.yml](/plugins/ddonutworth/configuration/messages/).

- **`prices.yml`** — the old numbered format (`item_17: 7000.0`) is not read. That is deliberate; see
  [Readable Item Keys](/plugins/ddonutworth/features/item-keys/). Either let dRotatingShop supply prices, or re-add the
  handful you want to override with `/setworth`.
- **`storage.db`** — player progress starts fresh in `playerdata.yml`.
