---
title: "Placeholders"
description: "With PlaceholderAPI installed, dNicks registers the dnicks expansion. This is the bridge that lets other plugins (scoreboards, the TAB plugin, chat plugins)…"
---

With [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed, dNicks registers the `dnicks` expansion. This is the bridge that lets *other* plugins (scoreboards, the TAB plugin, chat plugins) render the same nick.

| Placeholder | Returns |
|---|---|
| `%dnicks_name%` | The styled nick as legacy §-hex — per-character color survives for string consumers like TAB. Falls back to the username. |
| `%dnicks_mini%` | The raw MiniMessage string the player set (e.g. `<gradient:#ff0000:#00ffff>Steve</gradient>`). |
| `%dnicks_raw%` / `%dnicks_plain%` | The stripped, plain visible text. |
| `%dnicks_hasnick%` | `true` / `false`. |

### Example — TAB tab list

```yml
# TAB groups.yml / users.yml
customtabname: "%dnicks_name%"
```

### Example — a scoreboard line

```
%dnicks_name%   ·   online
```

Use `%dnicks_name%` anywhere a placeholder is supported and you want the gradient. For dNicks' own built-in surfaces (chat, tab, nametag) you don't need PlaceholderAPI at all. See [Integrations](/plugins/dnicks/integrations/).
