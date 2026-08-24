---
title: "config.yml"
description: "The whole file, section by section. Everything optional is off by default."
---

The whole file, section by section. Everything optional is off by default.

## database

```yaml
database:
  type: sqlite            # sqlite or mysql
  sqlite:
    file: oberonshop.db
    journal-mode: WAL
    synchronous: NORMAL
  mysql:
    host: 127.0.0.1
    port: 3306
    database: minecraft
    username: root
    password: "change-me"
    pool-size: 10
```

Changing the backend needs a restart; `/adminshop reload` says so rather than pretending.

SQLite runs on a single connection whatever `pool-size` says. SQLite takes a database-wide write lock, so
a second connection can only queue and surface as a timeout under exactly the load a shop sees when a
restock and a burst of purchases land together.

What is stored: stock levels, purchase-limit counters, favourites, recently bought, popularity counters,
dynamic-pricing state, the last purchase, and an error ledger for failed grants. **Balances are never
stored here** — they belong to Vault or ExcellentEconomy.

## Lore lines

```yaml
price-lore: "&7Price: &#00FC00%price%"
lore-line: 1
variant-price-lore: "&7Price: &#00FC00from %price%"
sale-lore: "&7Was: &m%old-price%&r &#FF5555-%discount%%"
stock-lore: "&7Stock: &#00FC00%stock%&7/&f%max-stock%"
limit-lore: "&7Limit: &#00FC00%limit-remaining%&7/&f%limit-max% &8(%limit-reset%)"
```

`lore-line` is where the price block is inserted into the item's own lore. Each extra line only appears
on items that use that feature. Blank hides one.

`variant-price-lore` is separate because an item with variants has no single price — the number shown is
the **cheapest** final choice, so the wording says "from".

## economy

```yaml
economy:
  type: vault
  currencies:
    money:     { type: vault, display-name: "Money", symbol: "$" }
    stardust:  { type: excellenteconomy, currency-id: stardust, symbol: "✦" }
  format:
    mode: compact          # compact (5M) or normal (5,000,000)
    pattern: "#,##0.##"
    compact:
      threshold: 1000
      suffixes: [ K, M, B, T ]
```

See [Currencies](/plugins/oberonshop/features/currencies/).

## access & maintenance

```yaml
access:
  worlds:
    mode: none             # none | whitelist | blacklist
    list: []
  blocked-gamemodes: []

maintenance:
  enabled: false
  broadcast-on-enable: true
```

World names match case-insensitively. A game-mode name that is not one is skipped with a warning rather
than stopping the plugin.

Maintenance is stored here rather than in the database so it survives a restart and so you can see it in
the file when the shop is shut. `/adminshop maintenance on|off` flips it.

## command

```yaml
command:
  shop: "shop"
  shop-aliases: []
  admin: "adminshop"
  admin-aliases:
    - oberonshop
```

Configurable because commands are registered at runtime: if another plugin also claims `shop`, whichever
loads last wins and nothing warns you.

## purchase & navigation

```yaml
purchase:
  keep-open-after-purchase: true
  quick-buy-amount: 1
  stack-buy-enabled: true
  stack-buy-amount: 0        # 0 = a full stack
  max-quantity: 0            # 0 = the product's own stack size
  custom-amount:
    enabled: true
    input: auto

navigation:
  root: main                 # or a category id, to skip the main menu
  skip-buy-gui: false
  skip-single-option-variants: true
  back-from-direct: close
  escape-opens-main-menu: false
```

`navigation.root` naming a category makes `/shop` open it directly and drops the main menu from the flow
— for a server that wants one shop page.

## pricing, discounts, stock, limits

See [Pricing & Sales](/plugins/oberonshop/features/pricing-and-sales/) and
[Stock & Limits](/plugins/oberonshop/features/stock-and-limits/).

## search, favorites, recent, popular

See [Finding Things](/plugins/oberonshop/features/finding-things/).

## custom-items

See [Custom Items](/plugins/oberonshop/features/custom-items/).

## import

```yaml
import:
  product-aliases:
    shards/skeleton: shards/skeleton-spawner
```

For `/adminshop import perfshop`. See [Migrating from PerfShop](/plugins/oberonshop/migrating-from-perfshop/).

## anti-dupe

```yaml
anti-dupe:
  click-cooldown-ms: 50
```

Stops a duplicated click buying twice. 50 ms is below anything a human produces and above what a
duplicated packet does. The cooldown **only starts after a purchase that took money**, so a refused
click never delays your next one.

## Sections that are never merged

Config files gain new keys on upgrade, so a new setting appears with its default and your edits stay. But
some sections are lists you curate, and merging those would resurrect entries you deleted. These are left
alone entirely:

```
economy.currencies
discounts.ranks
limits.modifiers
custom-items
import.product-aliases
```

Plus every `items:` block in `shops/` and `gui/`.
