---
title: "FAQ & Troubleshooting"
description: "No, and there never will be. The plugin makes no network calls, so it cannot stop working because a key"
---

### Is there a license key?

No, and there never will be. The plugin makes no network calls, so it cannot stop working because a key
server was down or a key check misfired.

### Where do prices come from?

`prices.yml`, and nowhere else. It ships with 1,480 material prices, 136 potion variants and your own
(initially empty) `items` section. Nothing derives from another plugin. See
[Pricing](/plugins/oberonsell/features/pricing/).

### Everything says "not sellable"

Check the startup log first:

```
[OberonSell] Loaded 1480 material prices, 136 item-variant prices and 0 overrides
```

If those numbers are `0`, `prices.yml` did not load — look above the line for a YAML error, usually an
unquoted key containing `[` or `:`.

If they look right, run `/worth hand` on the item. An item with no entry in any of the three sections is
genuinely unsellable; price it with `/setworth`.

### An item shows a price of nothing

That is `0`, and it means **explicitly unsellable** — someone set it that way. `GOLD_NUGGET`,
`IRON_NUGGET` and `MOSSY_COBBLESTONE_SLAB` ship like that. `/setworth <key> <price>` gives it a real price.

### `/delworth` says an item "has no price of its own to remove"

Because that price comes from the shipped `prices.by-material` or `prices.by-serialized` table, not from
your `items` section. Deleting it there would only take it out of your copy of the file, and the next
upgrade would merge it straight back — so the command declines rather than lying to you.

Set it to zero instead:

```
/setworth DIAMOND 0
```

See [prices.yml](/plugins/oberonsell/configuration/prices/#making-a-migrated-price-unsellable).

### Some items in the price list are missing from the `/worth` GUI

96 of the shipped `by-material` keys name a **block with no item form** — `BAMBOO_SAPLING`, the `POTTED_*`
family, `WALL_SIGN` and so on. They price fine, but there is no item to draw an icon from, so the GUI
leaves them out.

A further 39 keys name a material this server does not have at all: renames such as `CHAIN` (now
`IRON_CHAIN`), `SCUTE` and `TURTLE_SHELL`, the `POTTERY_SHARD_*` family (now `*_POTTERY_SHERD`), the
`INFUSED_*` sandstones, plus outright typos like `DIAMOND_BPPTS`. Those are inert — nothing can match them
— and are kept rather than deleted so a price is not thrown away if a name ever comes back.

Both counts are logged at startup; the names behind them are at `FINE` level. See
[Migration health](/plugins/oberonsell/configuration/prices/#migration-health).

### My weekend markup does nothing

`pricing.temporary-adjustment` is only applied when `pricing.source` is `independent`. The shipped value is
`rotating-shop`, which is a leftover from the version that derived prices from a shop and tells the plugin
to defer to that shop's adjustment — and there is no shop. Set:

```yaml
pricing:
  source: independent
  temporary-adjustment:
    enabled: true
    percent: 20
```

Or use `pricing.global-multiplier`, which scales what players are **paid** and works regardless of
`source`.

### What do `sell-ratio` and `adjust-overrides` do?

Nothing. Both are leftovers from the shop-derived pricing that has been removed. Leave them alone.

### Sell prices are too high / too low across the board

Edit the prices, or scale everything at once with `pricing.global-multiplier` (payouts) or
`pricing.temporary-adjustment` with `source: independent` (prices). For enchantments specifically, move
`scale` in [enchantments.yml](/plugins/oberonsell/configuration/enchantments/).

### Prices show too many / too few decimals

Two different settings, and it is worth knowing which is which:

- `pricing.rounding.decimals` — how many decimals money is actually **held** to. Changing it changes what
  is paid.
- `price-format.decimals` — how many are **shown**. Display only.

See [`price-format`](/plugins/oberonsell/configuration/config/#price-format).

### Big numbers show as `1.5M` and I want the full figure

```yaml
price-format:
  compact-thousands: false
```

Or disable individual tiers by setting their `compact-*-min-abs` to `0`.

### Worth lore isn't showing

- `worth-lore.enabled: true`?
- Is that inventory in `worth-lore.inventories`? Add its `InventoryType` name (`CHEST`, `BARREL`, …) or
  part of its title.
- Is it in `worth-lore.excluded-inventories`, which wins over the list above?
- Has the player run `/toggleworth`?
- Does the item have a price at all? Try `/worth hand` on it.

### Worth lore is stuck on some items in a chest

That happens in **item mode** if the server crashed while the chest was open. Stand near it and run:

```
/oberonsell cleanup 16
```

It cannot happen in packet mode, because the item on the server is never modified. Install ProtocolLib.

### A renamed item lost its price

It shouldn't — renaming does not change an item's key, so a diamond called "Bob" still sells for the
diamond price. If it genuinely has no price, check whether something else on it (custom model data, another
plugin's NBT) is giving it a more specific key that isn't priced. `/worth hand` will tell you.

### An MMOItems / Oraxen item isn't recognised

Check `custom-items` in `config.yml`. The namespace or tag name may differ in your version — it is a config
edit, not a plugin update. If it still won't resolve, `/setworth` on it anyway: an item no source claims is
stored with a copy of itself and works regardless.

### Selling gives no money

Vault. Without an economy provider the plugin disables itself at startup with an error in the log. If it is
running but nothing arrives, the economy plugin is refusing the deposit — a balance cap is the usual cause.
Nothing is consumed when a deposit is refused, so no items are lost.

### A player says they were paid twice / lost a stack

They shouldn't be able to be. The payout lands before anything is removed, each slot is re-read after the
deposit and only cleared if it still holds exactly what was paid for, a container is locked for the
duration of a sale, and `anti-dupe.click-cooldown-ms` (250 ms) rate-limits GUI sales per player. If your
economy plugin is slow, raise that number.

### `/sell auto` shows an odd message

The four `auto-sell.*` keys, and `top.empty` for `/selltop`, are **missing from the shipped
`messages.yml`**. A missing key falls back to the key name in game. Add them yourself:

```yaml
auto-sell:
  enabled: "<prefix><white>Auto-sell is now <#00F986>on<white>."
  disabled: "<prefix><white>Auto-sell is now <red>off<white>."
  unavailable: "<prefix><red>Auto-sell is disabled on this server."
  # {money} {price} {amount}
  sold: "<prefix><white>Auto-sold <#00A3FB>{amount}<white> for <#00FB00>{price}<white>."

top:
  empty: "<prefix><white>Nobody has sold anything yet."
```

### A player's multiplier went down

It can't. Tiers are high-water marks and are never lowered, even if you raise a requirement or change a
category's patterns. If a *payout* dropped, check `pricing.global-multiplier` and whether their permission
node changed.

### The rank-up message fired twice

It can't fire twice for the same tier. Two different **categories** crossing a tier in one sale sends two
messages — that is one per category, which is intended.

### Which storage backends are there?

`storage.type` takes `sqlite` (the default) or `yaml`. SQLite keeps one database file in the plugin folder
and needs nothing installed — the driver ships with the server. Reads and writes happen off the server
thread.

A `playerdata.yml` found while SQLite is selected is imported once, logged, and renamed to
`playerdata.imported.yml`, so a second start cannot import it twice. `/oberonsell migrate playerdata` moves
records in either direction if you change your mind.

MySQL is not implemented. Records live on this server only.

### Are there leaderboard placeholders?

Yes — `%oberonsell_top_*%` and the paging forms. They follow the same grammar as OberonStats, so the track
comes last: `%oberonsell_top_name_1_money%`, `%oberonsell_top_value_short_3_items%`,
`%oberonsell_top_list_1_10_money%`. See [Placeholders](/plugins/oberonsell/placeholders/).

Every one reads a single in-memory snapshot rather than querying, because a hundred-row dialogue resolves a
couple of hundred placeholders in one render. The snapshot refreshes on a TTL and after a sale, so the
board can trail a sale by a second or two — that is deliberate, and cheaper than rebuilding per sale.

### Is there an `/oberonsell doctor`?

Yes. It reports config settings whose effective value differs from what you wrote, which hooks answered,
the storage backend with a live connectivity probe, leaderboard state, and the price-table audit — table
sizes, explicitly unsellable items, keys this Minecraft version does not know, and keys naming blocks with
no item form. "Explicitly unsellable" and "no price configured" are reported separately, because they are
different answers.

### I renamed the plugin folder and lost everything

The data folder is `plugins/OberonSell`. If you upgraded from **dDonutWorth** or **OberonWorth**, rename the
old folder before the first start; otherwise a fresh config set is written and the old records are simply
not read. Permissions (`oberonsell.*`) and placeholders (`oberonsell_*`) changed with the name too.

### Does it work on Folia?

Yes. The framework's scheduler is region-aware, and worth-lore refreshes are dispatched to the thread that
owns each viewer.

### Which plugins does it need?

OberonCore and a Vault economy. Everything else — PlaceholderAPI, ProtocolLib, MMOItems, Oraxen, Nexo,
ItemsAdder — is optional, and the custom-item plugins are not even dependencies.
