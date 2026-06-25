---
title: "Placeholders"
description: "With PlaceholderAPI installed, ToolsNotifier registers the toolsnotifier expansion. Available in both editions."
---

With [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed, ToolsNotifier registers the `toolsnotifier` expansion. Available in both editions.

## Held-item durability

| Placeholder | Returns |
|---|---|
| `%toolsnotifier_mainhand_durability%` | Remaining durability of the main-hand item (`N/A` if none/undamageable). |
| `%toolsnotifier_mainhand_max%` | Max durability of the main-hand item. |
| `%toolsnotifier_mainhand_percent%` | Durability percentage of the main-hand item. |
| `%toolsnotifier_mainhand_level%` | The item's level: `none`, `warn` or `critical`. |
| `%toolsnotifier_offhand_durability%` | Remaining durability of the off-hand item. |
| `%toolsnotifier_offhand_max%` | Max durability of the off-hand item. |
| `%toolsnotifier_offhand_percent%` | Durability percentage of the off-hand item. |
| `%toolsnotifier_offhand_level%` | Off-hand item's level. |

## Player state

| Placeholder | Returns |
|---|---|
| `%toolsnotifier_notifications_enabled%` | `true` if the player has notifications on, `false` if they've toggled them off. |

### Example

```
Tool: %toolsnotifier_mainhand_percent%%   (%toolsnotifier_mainhand_level%)
```

might render as `Tool: 26.4%   (warn)`. Great for scoreboards and action-bar HUDs.
