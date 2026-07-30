---
title: "Placeholders"
description: "Registered only when PlaceholderAPI is installed, and the expansion survives /papi reload."
---

Registered only when PlaceholderAPI is installed, and the expansion survives `/papi reload`.

| Placeholder | Value |
|---|---|
| `%ddonutworth_worth_hand%` | Worth of one of the held item |
| `%ddonutworth_worth_hand_total%` | Worth of the whole held stack |
| `%ddonutworth_worth_inventory%` | Worth of everything in the player's inventory |
| `%ddonutworth_sold_total%` | Lifetime earnings from selling |
| `%ddonutworth_toggle%` | `true` / `false` — whether worth lore is shown |
| `%ddonutworth_multiplier_<category>%` | Multiplier earned in that category |
| `%ddonutworth_tier_<category>%` | Tier reached in that category |
| `%ddonutworth_progress_<category>%` | Progress to the next tier, e.g. `42%` |
| `%ddonutworth_progress_bar_<category>%` | The progress bar |

`<category>` is a category id — one of the values under `multipliers.categories` in
[config.yml](/plugins/ddonutworth/configuration/config/).

## Examples

```
%ddonutworth_worth_hand%               -> $250.00
%ddonutworth_worth_inventory%          -> $18,430.00
%ddonutworth_multiplier_ores%          -> 1.3
%ddonutworth_tier_ores%                -> 3
%ddonutworth_progress_crops%           -> 42%
%ddonutworth_progress_bar_crops%       -> ▮▮▮▮▮▮▮▮▯▯▯▯▯▯▯▯▯▯▯▯
```

Money values are formatted by your economy plugin, so they match the rest of your server.

## Offline players

`sold_total` and `toggle` work for offline players. The rest need a held item, an inventory or a permission
check, so they return nothing when the player is offline.

## Unknown categories

An unknown category returns nothing, so a typo shows as an unresolved placeholder rather than a wrong
number.

## Scoreboard example

```yaml
lines:
  - "&7Holding: &f%ddonutworth_worth_hand_total%"
  - "&7Inventory: &f%ddonutworth_worth_inventory%"
  - ""
  - "&7Ores &f%ddonutworth_multiplier_ores%x"
  - "&f%ddonutworth_progress_bar_ores%"
```
