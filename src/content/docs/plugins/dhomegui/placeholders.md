---
title: "Placeholders"
description: "With PlaceholderAPI installed, dHomeGUI registers the dhomegui expansion."
---

With [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed, dHomeGUI registers the `dhomegui` expansion.

| Placeholder | Returns |
|---|---|
| `%dhomegui_count%` | The player's current number of homes. |
| `%dhomegui_max%` | The player's home limit (tier + bought slots, or ∞ when unlimited). |
| `%dhomegui_remaining%` | Homes the player can still set (`max - count`). |
| `%dhomegui_default%` | The player's default home name. |

### Example

```
Homes: %dhomegui_count%/%dhomegui_max%   (default: %dhomegui_default%)
```

might render as `Homes: 2/10   (default: base)`.

Use these anywhere PlaceholderAPI is supported — scoreboards, tab lists, chat formats, holograms. See [Home Limits](/plugins/dhomegui/features/home-limits/) for how `max` is calculated.
