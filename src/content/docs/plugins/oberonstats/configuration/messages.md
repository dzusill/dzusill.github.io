---
title: "messages.yml"
description: "Only the command's own output lives here. Nothing a placeholder returns comes from this file — that is config.yml."
---

Only the command's own output lives here. Nothing a placeholder returns comes from this file — that is `config.yml`.

All values are [MiniMessage](https://docs.advntr.dev/minimessage/format.html); `<prefix>` expands to the `prefix` key.

```yaml
prefix: "<#39B54A><bold>Stats</bold></#39B54A> <dark_gray>» </dark_gray>"

command:
  usage: [ … ]
  reloaded: "<prefix><green>Reloaded. <gray>Lookup cache cleared."
  status: [ … ]
  no-tracks: "<prefix><red>No stat tracks are available …"
  unknown-track: "<prefix><red>Unknown track <gray>%track%</gray>. …"
  dump:
    header: "<prefix><gray>Placeholders for <#39B54A>%player%</#39B54A> …"
    line: "<dark_gray>» <gray>%placeholder% <dark_gray>= <white>%value%"
  target:
    set: "<prefix><green>Target set to <white>%player%</white><green>."
    cleared: "<prefix><green>Target cleared."
  page:
    moved: "<prefix><gray>Page <#39B54A>%page%</#39B54A> of <#39B54A>%track%</#39B54A><gray>."
    expanded: "<prefix><gray>Showing all <#39B54A>%rows%</#39B54A> rows …"
    reset: "<prefix><gray>Back to page one of <#39B54A>%track%</#39B54A><gray>."
```

## Placeholders per key

| Key | Available |
|---|---|
| `command.status` | `%providers%`, `%tracks%`, `%blank%`, `%min_value%`, `%hide_rows%`, `%hide_value%`, `%page_size%`, `%max_position%`, `%cache%` |
| `command.unknown-track` | `%track%` |
| `command.dump.header` | `%player%`, `%track%` |
| `command.dump.line` | `%placeholder%`, `%value%` |
| `command.target.set` | `%player%` |
| `command.page.moved` | `%page%`, `%track%` |
| `command.page.expanded` | `%rows%`, `%track%` |
| `command.page.reset` | `%track%` |

## DzusillCore built-ins

The bottom of the file holds the framework's shared messages — `no-permission`, `players-only`, `invalid-usage`, `player-not-found`, `command-error` and friends. They are safe to reword; deleting them brings the defaults back on the next load.
