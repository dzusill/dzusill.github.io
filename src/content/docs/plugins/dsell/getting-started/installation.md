---
title: "Installation"
description: "Into plugins/:"
---

## 1. Drop in the jars

Into `plugins/`:

- `DzusillCore.jar` — the framework, deployed as its own jar
- `Vault.jar` and a Vault-compatible economy
- `DSell.jar`
- `ProtocolLib.jar` — **required for [worth lore](/plugins/dsell/features/worth-lore/)**, no fallback. Also
  optionally upgrades the prices-GUI search prompt to a sign, but only worth lore actually needs it

## 2. Start the server

On first start the plugin writes its configs and reports what it loaded:

```
[DSell] Loaded 1480 material prices, 136 item-variant prices and 0 overrides
[DSell] Worth lore is sent per player through ProtocolLib; items are never modified.
[DSell] Item searches are typed into a sign.
```

Those counts come straight out of `prices.yml`. If they read `0`, the file did not load — check the console
above them for a YAML error.

## 3. Check it works

```
/worth hand
```

Hold something and run it. You should get a price immediately: the shipped `prices.yml` covers 1,480
materials and 136 potion variants, so most vanilla items are priced before you touch a file.

## What gets created

```
plugins/DSell/
├── config.yml            main settings
├── prices.yml            the whole price list — ships filled in
├── enchantments.yml      what each enchantment adds to the item carrying it
├── messages.yml          every user-facing string
├── sounds.yml            named sounds the GUIs reference
├── sellaxe.yml           the sell axe's look and timer format
├── playerdata.yml        player records (written by the plugin)
├── gui/
│   ├── worth.yml         item prices GUI
│   ├── sell.yml          drop-in sell GUI
│   ├── history.yml       sell history GUI
│   ├── multipliers.yml   multiplier overview + tier icon styling
│   └── sell-top.yml      sell leaderboard
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
`items` in `prices.yml`, `values` in `enchantments.yml`, each category's `matches` and
`progress.requirements`, `custom-items`, and each GUI's `items` — are **never** merged, so an entry you
deleted stays deleted.

The two migrated price tables (`prices.by-material` and `prices.by-serialized`) are the deliberate
exception: they are shipped data and **are** merged, so a deleted entry there comes back. Use
`/setworth <key> 0` to retire one permanently — see
[prices.yml](/plugins/dsell/configuration/prices/#making-a-migrated-price-unsellable).

## Coming from an older name

The plugin has been called **dDonutWorth** and **dDonutWorth**. It is now **DSell** throughout:
package `me.dzusill.dsell`, permissions `dsell.*`, PlaceholderAPI identifier `dsell`, admin
command `/dsell`, jar `DSell.jar`, data folder `plugins/DSell`.

Rename the data folder to `DSell` before the first start if you want to keep your existing configs and
`playerdata.yml`; otherwise a fresh set is written. Then update:

- every permission node in your permissions plugin (`ddonutworth.*` → `dsell.*`),
- every placeholder (`%ddonutworth_…%` → `%dsell_…%`),
- any command blocks or scripts calling the old admin command.

## Coming from the reference SellWorth plugin

Your existing GUI files largely paste in: the icon keys (`name`, `lore`, `material`, `slot`,
`customModelData`, `sound`), the cycling-button styling (`selected_color`, `unselected_color`,
`bullet_icon`), `collect_slots` and the `sell/<category>.yml` progress layout all use the same names. In
**those** files both colour dialects work too — legacy `&f` codes and bare `#00F986` hex, alongside
MiniMessage.

Three things do **not** carry over:

- **`messages.yml` colours.** Chat is MiniMessage only, so `&7` and a bare `#00F986` would print as text
  rather than colour it. Write `<gray>` and `<#00F986>`. See [messages.yml](/plugins/dsell/configuration/messages/).
- **`prices.yml`** — the old numbered format (`item_17: 7000.0`) is not read. That is deliberate; see
  [Readable Item Keys](/plugins/dsell/features/item-keys/). The shipped table replaces it.
- **`storage.db`** — player progress starts fresh in `playerdata.yml`.
