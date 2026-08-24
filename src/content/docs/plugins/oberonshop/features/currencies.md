---
title: "Currencies"
description: "A shop can price different categories in different money. Blocks in Vault money, Potions and Perks in"
---

A shop can price different categories in different money. Blocks in Vault money, Potions and Perks in
Stardust, from the same menu.

## Declaring them

```yaml
# config.yml
economy:
  type: vault          # the default for anything that names no currency
  currencies:
    money:
      type: vault
      display-name: "Money"
      symbol: "$"
    stardust:
      type: excellenteconomy
      currency-id: stardust
      display-name: "Stardust"
      symbol: "✦"
```

`type` picks the provider:

| `type` | Backed by | Balance readable |
|---|---|---|
| `vault` | Vault and whatever economy plugin is registered | yes |
| `excellenteconomy` | ExcellentEconomy, by `currency-id` | yes |
| `command` | A console command — see below | **no** |

## Using them

Per category, at the top of a shop file:

```yaml
currency: stardust
```

or per item:

```yaml
  cool_thing:
    material: NETHER_STAR
    price: 250
    slot: 4
    currency: stardust
```

Item beats category beats the `economy.type` default.

**Every variant of one product shares that product's currency.** Each final choice sets its own price,
not its own money — a firework whose Flight I cost money and whose Flight III cost Stardust would be a
menu nobody can read. This is enforced when the file loads.

## What players see

The number is formatted by `economy.format` — `compact` shortens 5,000,000 to `5M`, `normal` prints it in
full through a pattern. Below the threshold nothing is shortened, so a 200 shard price reads `200` and
not `0.2K`.

> **The formatted price already includes the symbol.** Writing `$%price%` in a lore line gives you
> `$$5M`. This is the single most common config mistake here.

Two different wordings exist for "you can't afford this": the server's default currency uses
`shop.not-enough-money`, anything else uses `shop.not-enough-currency` with a `{currency}` token. Both
are in [messages.yml](/plugins/oberonshop/configuration/messages/).

## Command currencies

Some economy plugins expose no API. For those there is a last resort:

```yaml
    legacy-shards:
      type: command
      display-name: "Shards"
      symbol: "✧"
      take-command: "gems take %player% %price%"
```

**This is strictly worse than a real currency, and the shop cannot protect the player on it:**

- The balance cannot be read, so a purchase cannot be refused up front. The command decides, after the
  fact.
- Nothing can be refunded — there is no matching "give it back" command to run. A failure after payment
  lands in `/adminshop failures` for an admin to settle by hand.

`shops/shards.yml` ships on this path because it is what PerfShop did there. Pointing `currency:` at a
real `excellenteconomy` entry removes both problems, and `/adminshop doctor` flags every currency that
has no readable balance so you can see which categories are exposed.

## When the plugin is missing

A currency whose provider is not installed reports itself unavailable, and a purchase in it fails with
"no economy is available" rather than silently succeeding for free. `/adminshop doctor` lists every
currency and whether its plugin was found.
