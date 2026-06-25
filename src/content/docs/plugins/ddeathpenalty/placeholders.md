---
title: "Placeholders"
description: "With PlaceholderAPI installed, dDeathPenalty registers the dp expansion."
---

With [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed, dDeathPenalty registers the `dp` expansion.

## Per-player

| Placeholder | Returns |
|---|---|
| `%dp_total_death%` | The player's death count. |
| `%dp_money_lost_player%` | The player's total money lost. |

## Server-wide

| Placeholder | Returns |
|---|---|
| `%dp_total_money_lost_<world>%` | Total money lost across all players in `<world>`. |

## Leaderboards

Replace `<rank>` with a position (1, 2, 3, …):

| Placeholder | Returns |
|---|---|
| `%dp_top_death_<rank>%` | Name of the player ranked `<rank>` by deaths. |
| `%dp_top_death_amount_<rank>%` | That player's death count. |
| `%dp_top_money_lost_<rank>%` | Name of the player ranked `<rank>` by money lost. |
| `%dp_top_money_lost_amount_<rank>%` | That player's total money lost. |

### Example — Hall of Shame

```
#1 %dp_top_death_1% — %dp_top_death_amount_1% deaths
#2 %dp_top_death_2% — %dp_top_death_amount_2% deaths
Biggest loser: %dp_top_money_lost_1% (%dp_top_money_lost_amount_1%)
```

When a rank has no player, name placeholders return `-` and amounts return `0`.
