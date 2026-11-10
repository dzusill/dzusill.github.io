---
title: "Placeholders"
description: "Needs PlaceholderAPI. Identifier: oberonkits."
---

Needs PlaceholderAPI. Identifier: `oberonkits`.

| Placeholder | Shows |
|---|---|
| `%oberonkits_kit%` | Last kit used in the player's current kit world |
| `%oberonkits_kit_display%` | Its display name |
| `%oberonkits_profile%` | The profile of the current world |
| `%oberonkits_next%` | Kit queued for the next respawn |
| `%oberonkits_uses_<kit>%` | Stardust kit uses left, e.g. `%oberonkits_uses_ffa6%` |
| `%oberonkits_regen_in%` | Time to the next arena regen in the current kit world |
| `%oberonkits_regen_in_<profile>%` | Time to the next regen of a named profile, e.g. `%oberonkits_regen_in_ffa%` |

Outside a kit world the world-bound placeholders are empty. `uses_<kit>` and `regen_in_<profile>` work
anywhere. A regen placeholder is empty when that profile has no regen running.
