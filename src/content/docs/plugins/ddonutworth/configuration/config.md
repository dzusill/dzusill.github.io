---
title: "config.yml"
description: "The main settings file. Comments survive reloads, so you can annotate it freely."
---

The main settings file. Comments survive reloads, so you can annotate it freely.

> There is no `license-key` field, and there never will be. The plugin makes no network calls.

## pricing

```yaml
pricing:
  source: rotating-shop
  sell-ratio: 0.20
  temporary-adjustment:
    enabled: false
    percent: 20
  adjust-overrides: false
  global-multiplier: 1.0
```

| Key | Default | What it does |
|---|---|---|
| `source` | `rotating-shop` | `rotating-shop` derives worth from dRotatingShop; `independent` uses `prices.yml` alone. An unrecognised value falls back to `rotating-shop` |
| `sell-ratio` | `0.20` | Fraction of the shop's buy price an item sells for. Clamped to `0..1` — a sell price above the buy price is a money printer |
| `temporary-adjustment.enabled` | `false` | Independent mode only; in shop mode the *shop's* adjustment is the one that matters |
| `temporary-adjustment.percent` | `20` | Signed: `20` = +20%, `-15` = 15% off |
| `adjust-overrides` | `false` | Whether a hand-set `prices.yml` price also rides the blanket adjustment. Off = the number you typed is the number you get |
| `global-multiplier` | `1.0` | Applied to every payout on top of everything else. `2.0` = double-sell weekend |

See [Price Sources](/plugins/ddonutworth/features/price-sources/).

## worth-lore

```yaml
worth-lore:
  enabled: true
  shulker-totals: true
  player-inventory: true
  allow-toggle: true
  inventories:
    - CHEST
    - BARREL
    - "Faction Chest"
```

| Key | Default | What it does |
|---|---|---|
| `enabled` | `true` | Master switch. Off = the listener is never registered |
| `shulker-totals` | `true` | Show a shulker box's contents total on the box |
| `player-inventory` | `true` | Also decorate the player's own inventory while a container is open |
| `allow-toggle` | `true` | Let players use `/toggleworth` |
| `inventories` | (a long list) | Which inventories get lore — an `InventoryType` name, or any part of a title |

See [Worth Lore](/plugins/ddonutworth/features/worth-lore/).

## multipliers

```yaml
multipliers:
  enabled: true
  categories:
    - ores
    - crops
    # ...
  permission-based: true
  permission-cap: 10.0
  progress-bar:
    filled: "▮"
    empty: "▯"
    length: 20
```

| Key | Default | What it does |
|---|---|---|
| `enabled` | `true` | The per-category tier system |
| `categories` | nine ids | Which `sell/<id>.yml` files to load. **Order sets category precedence** and sidebar/filter order |
| `permission-based` | `true` | Honour `ddonutworth.multiplier.<value>` nodes |
| `permission-cap` | `10.0` | Ceiling on the above, against typos |
| `progress-bar.filled` / `.empty` | `▮` / `▯` | Characters for `{progressBar}` |
| `progress-bar.length` | `20` | Bar width in characters |

See [Sell Multipliers](/plugins/ddonutworth/features/sell-multipliers/).

## sellaxe

```yaml
sellaxe:
  enabled: true
```

Off = the listener is never registered and `/sellaxe` refuses. Everything else about the axe is in
[sellaxe.yml](/plugins/ddonutworth/configuration/sellaxe/).

## history

```yaml
history:
  size: 100
```

Entries retained per player. Repeat sales of the same item merge, so this is 100 distinct items rather
than 100 transactions.

## storage

```yaml
storage:
  type: yaml
```

Only `yaml` is implemented — player records live in `playerdata.yml`. Any other value logs a warning and
falls back to YAML rather than failing silently.

## blacklisted-worlds

```yaml
blacklisted-worlds:
  - Creative
```

Selling is refused entirely in these. Matching ignores capitalisation.

## custom-items

Which custom-item plugins to recognise, and where each writes its item id. See
[Custom Items](/plugins/ddonutworth/features/custom-items/) for the full explanation of why this is config rather than
compiled in.
