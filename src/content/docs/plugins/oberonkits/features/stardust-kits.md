---
title: "Stardust kits"
description: "A kit with a price is a paid kit. One purchase buys uses lives with it: every time the kit is given, one"
---

A kit with a `price` is a paid kit. One purchase buys `uses` lives with it: every time the kit is given, one
use is spent, and when none are left the player buys again.

```yaml
kits:
  - kit: ffa6
    display-name: "<gold>FFA Premium"
    icon: NETHERITE_SWORD
    slot: 16
    price: 500
    currency: stardust
    uses: 3
```

Here 500 Stardust buys three lives with `ffa6`.

## Buying

1. The player clicks the kit. With no uses left the menu shows the price; a click opens a confirm screen.
2. **Buy** checks the balance and takes the price through the ExcellentEconomy API. Nothing is run as a
   console command, and a double click charges once.
3. The uses are added and the kit is picked at once, spending the first use.

Not enough Stardust, ExcellentEconomy missing, or a failed withdrawal each have their own message, and
nothing is taken. Every purchase is written to the console log.

## Uses

- Uses are stored per player and kit in the [database](/plugins/oberonkits/configuration/database/), so they survive
  restarts and are the same in every world that offers the kit.
- `/okits uses <player> <kit> [set|add|take] <n>` corrects them; without an action it shows the count.
- `/okits give` never spends a use.
- `%oberonkits_uses_<kit>%` shows the count on a scoreboard.
- Random picks skip paid kits unless `random.include-paid: true`; then a rolled paid kit spends a use.

## Currencies

Currencies are listed under `economy.currencies` in `config.yml`. Stardust is shipped:

```yaml
economy:
  default-currency: stardust
  currencies:
    stardust:
      provider: excellenteconomy
      id: stardust              # the currency id inside ExcellentEconomy
      format: "%amount% Stardust"
```

A kit without `currency` uses `default-currency`. A kit naming a currency that is not listed is skipped,
and the console says so.
