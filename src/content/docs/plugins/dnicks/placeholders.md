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

### Example — TAB nametag above the head (keep the role prefix)

```yml
# TAB groups.yml / users.yml
_DEFAULT_:
  tagprefix: "%luckperms_prefix%"
  customtagname: "%dnicks_name%"     # gradient name; keep unlimited nametags on
  tagsuffix: "%luckperms_suffix%"
```

### Example — TAB tab list

```yml
# TAB groups.yml / users.yml
_DEFAULT_:
  tabprefix: "%luckperms_prefix%"
  customtabname: "%dnicks_name%"
  tabsuffix: "%luckperms_suffix%"
```

### Example — a scoreboard line

```
%dnicks_name%   ·   online
```

Use `%dnicks_name%` anywhere a placeholder is supported and you want the gradient — wrap it with your role placeholders (`%luckperms_prefix%` …) to keep ranks. For dNicks' own built-in surfaces (chat, tab list) you don't need PlaceholderAPI at all; you **do** need it for the nametag-plugin setup. See [Integrations](/plugins/dnicks/integrations/) and [The Nametag Above the Head](/plugins/dnicks/features/nametag/).
