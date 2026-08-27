---
title: "messages.yml"
description: "Only the command's own output lives here. Nothing a player sees as an announcement comes from this file — that is config.yml."
---

Only the command's own output lives here. Nothing a player sees as an announcement comes from this file — that is `config.yml`.

All values are [MiniMessage](https://docs.advntr.dev/minimessage/format.html). `<prefix>` expands to the `prefix` key and is available in every message.

```yaml
prefix: "<#7e7e7e>[<b><gradient:#C21807:#F11800>YourServer</gradient></b><#7e7e7e>] "
```

## The command block

```yaml
command:
  usage:
    - "<prefix><#9e9e9e>/announcements <#C21807>[sound]<#9e9e9e> — toggle your announcements"
    - "<prefix><#9e9e9e>/announcements list"
    - "<prefix><#9e9e9e>/announcements next [id]"
    - "<prefix><#9e9e9e>/announcements preview <id> [variant]"
    - "<prefix><#9e9e9e>/announcements send <id> [player]"
    - "<prefix><#9e9e9e>/announcements reload"
  reloaded: "<prefix><#9e9e9e>Reloaded <#C21807>%count%<#9e9e9e> announcements."
  reload-failed: "<prefix><#F11800>Reload refused; the active configuration was kept: <#9e9e9e>%error%"
  unknown: "<prefix><#F11800>Unknown announcement: <#9e9e9e>%id%"
  unknown-variant: "<prefix><#F11800>Unknown variant <#9e9e9e>%variant%<#F11800> for <#9e9e9e>%id%<#F11800>."
  sent: "<prefix><#9e9e9e>Sent <#C21807>%id%<#9e9e9e> using <#C21807>%variant%<#9e9e9e> to <#C21807>%players%<#9e9e9e> players."
  sent-player: "<prefix><#9e9e9e>Sent <#C21807>%id%<#9e9e9e> using <#C21807>%variant%<#9e9e9e> to <#C21807>%player%<#9e9e9e>."
  previewed: "<prefix><#9e9e9e>Previewed <#C21807>%id%<#9e9e9e>/<#C21807>%variant%<#9e9e9e>."
  none: "<prefix><#8e8e8e>No enabled announcement has a future scheduled time."
  next: "<prefix><#9e9e9e>Next: <#C21807>%id%<#9e9e9e> at <#C21807>%time%<#9e9e9e> (<#C21807>%relative%<#9e9e9e>)."
  list-header: "<prefix><b><gradient:#C21807:#F11800>Announcements</gradient></b> <#7e7e7e>(%timezone%)"
  list-line: "<#7e7e7e> ⏵ <#F13131>%id% <#8e8e8e>[%mode%] — %state%"
  list-entry: "<#7e7e7e>    · <#9e9e9e>%id%"
  toggled-on: "<prefix><#9e9e9e>Announcements enabled."
  toggled-off: "<prefix><#8e8e8e>Announcements disabled."
  sound-toggled-on: "<prefix><#9e9e9e>Announcement sounds enabled."
  sound-toggled-off: "<prefix><#8e8e8e>Announcement sounds disabled."
```

`command.usage` is a list; every line is sent. Any of these keys may be written as a list instead of a string.

### Placeholders per key

Using a placeholder in a key that does not supply it leaves the literal text visible.

| Key | Available |
|---|---|
| `command.reloaded` | `%count%` — announcements loaded, meaning channels and `announcements:` entries, not the entries inside a channel |
| `command.reload-failed` | `%error%` |
| `command.unknown` | `%id%` |
| `command.unknown-variant` | `%id%`, `%variant%` |
| `command.sent` | `%id%`, `%variant%`, `%players%` |
| `command.sent-player` | `%id%`, `%variant%`, `%player%` |
| `command.previewed` | `%id%`, `%variant%` |
| `command.next` | `%id%`, `%time%`, `%relative%` |
| `command.list-header` | `%timezone%` |
| `command.list-line` | `%id%`, `%mode%`, `%state%` |
| `command.list-entry` | `%id%` |
| `command.usage` · `command.none` · the four toggle keys | none |

`%id%` in `command.sent`, `command.sent-player` and `command.previewed` is the **channel** id, even when you named an entry — the reply says which announcement was addressed and `%variant%` says which entry of it was used.

`%time%` is formatted `uuuu-MM-dd HH:mm:ss z` in the configured `timezone`. `%relative%` is a coarse countdown — `3d 4h`, `2h 15m`, `12m 4s` or `41s`.

## The state block

```yaml
state:
  enabled: "<#C21807>enabled"
  disabled: "<#7e7e7e>disabled"
  complete: "<#7e7e7e>complete"
  unscheduled: "<#7e7e7e>not scheduled"
```

Substituted into `%state%` in `command.list-line`.

| Value | Means |
|---|---|
| `enabled` | Enabled, with a future occurrence |
| `disabled` | `enabled: false`, or a channel that was switched off |
| `complete` | A `ONCE` announcement that has already fired |
| `unscheduled` | Enabled, but its schedule has no occurrence left |

`%mode%` is the schedule kind, lower-cased: `interval`, `one_time`, `daily`, `weekly`.

## DzusillCore built-ins

```yaml
invalid-usage: "<prefix><#F11800>Usage: <#9e9e9e>%usage%"
no-permission: "<prefix><#F11800>You do not have permission to do that."
players-only: "<prefix><#F11800>Only a player can use this command."
player-not-found: "<prefix><#F11800>Player not found: <#9e9e9e>%name%"
invalid-number: "<prefix><#F11800>Not a number: <#9e9e9e>%input%"
command-error: "<prefix><#F11800>The command could not be completed."
```

The framework's shared messages. DzusillCore ships plain defaults for all of them; overriding them here is what keeps a mistyped command looking like the rest of the plugin. They are safe to reword, and deleting one brings the framework default back on the next load.

`invalid-usage` takes `%usage%`, `player-not-found` takes `%name%`, `invalid-number` takes `%input%`.

> The file also carries an `error.players-only` key. Nothing reads it — the framework key is the top-level `players-only` above. Editing `error.players-only` changes nothing.

## Presentation

How each message is delivered is configured in `config.yml`, not here:

```yaml
Presentation:
  Categories:
    TOGGLE:
      Channel: ACTION_BAR
    ERROR:
      Channel: BOTH
  Overrides: {}
```

DAnnounce categorises its messages like this:

| Category | Keys |
|---|---|
| `TOGGLE` | `command.toggled-on`, `command.toggled-off`, `command.sound-toggled-on`, `command.sound-toggled-off` |
| `ERROR` | `command.reload-failed`, `command.unknown`, `command.unknown-variant` |
| `INFO` | everything else — plain chat |

Each category routes to `CHAT`, `ACTION_BAR`, `BOTH` or `NONE`. With the shipped block, a toggle confirmation lands on the action bar and a refusal is shown in both places.

One key can be treated differently:

```yaml
Presentation:
  Overrides:
    command.previewed:
      Channel: ACTION_BAR
```

Resolution order is override, then category, then plain chat. A category or override may also carry a `Sound` block:

```yaml
Presentation:
  Categories:
    ERROR:
      Channel: BOTH
      Sound:
        Enabled: true
        Name: BLOCK_NOTE_BLOCK_BASS
        Volume: 1.0
        Pitch: 0.8
```

That is a sound for the **command reply**, and is unrelated to the announcement `sound:` block.

## Reloading

`/announcements reload` re-reads this file and the `Presentation` block together with `config.yml`. See [Reloading](/plugins/dannounce/configuration/reloading/).
