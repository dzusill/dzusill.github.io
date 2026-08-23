---
title: "messages.yml"
description: "Every string OberonTools sends, plus the wording of the three expiry lore placeholders. Item names and lore are not here — those live in config.yml, per tool."
---

Every string OberonTools sends, plus the wording of the three expiry lore placeholders. Item names and lore are **not** here — those live in `config.yml`, per tool.

All values are [MiniMessage](https://docs.advntr.dev/minimessage/format.html). `<prefix>` expands to the `prefix` key.

```yaml
prefix: "<dark_gray>[<gold>OberonTools</gold>]</dark_gray> "
```

## Command output

```yaml
command:
  usage:
    - "<prefix><gray>/oberontools list</gray>"
    - "<prefix><gray>/oberontools give <player> <tool> [amount] [duration]</gray>"
    - "<prefix><gray>/oberontools inspect</gray>"
    - "<prefix><gray>/oberontools refresh</gray>"
    - "<prefix><gray>/oberontools reload</gray>"
  inspect-header: "<prefix><gold><bold>%tool%</bold></gold>"
  inspect-line: "<dark_gray> • </dark_gray><gray>%key%:</gray> <white>%value%</white>"
  invalid-duration: "…"
  list-header: "…"
  list-line: "…"
  given: "…"
  received: "…"
  refreshed: "…"
  not-holding: "…"
  unknown: "…"
  reloaded: "…"
  reload-failed: "…"
```

| Key | Placeholders |
|---|---|
| `command.usage` | — (a list; each entry is one line) |
| `command.inspect-header` | `%tool%` |
| `command.inspect-line` | `%key%`, `%value%` |
| `command.invalid-duration` | `%input%` |
| `command.list-header` | — |
| `command.list-line` | `%id%`, `%behavior%`, `%state%` |
| `command.given` | `%amount%`, `%tool%`, `%player%` |
| `command.received` | `%amount%`, `%tool%`, `%player%` |
| `command.refreshed` | `%tool%` |
| `command.not-holding` | — |
| `command.unknown` | `%tool%` |
| `command.reloaded` | `%count%` |
| `command.reload-failed` | `%error%` |

`command.given` goes to the sender, `command.received` to the recipient.

## Tool feedback

```yaml
tool:
  no-use-permission: "<prefix><red>You cannot use <white>%tool%</white>.</red>"
  no-craft-permission: "…"
  wrong-world: "…"
  busy: "…"
  broken: "…"
  liquid-none: "…"
  liquid-cleared: "…"
  area-complete: "…"
  timber-not-natural: "…"
  timber-limit: "…"
  timber-complete: "…"
  expired: "…"
  locked: "<red>That tool is still working; wait for it to finish.</red>"
```

| Key | Placeholders | Sent when |
|---|---|---|
| `tool.no-use-permission` | `%tool%` | Missing `use-permission`, or the definition is `enabled: false` |
| `tool.no-craft-permission` | `%tool%` | A craft was attempted without `craft-permission` |
| `tool.wrong-world` | `%tool%` | The world is blacklisted, or not on a non-empty whitelist |
| `tool.busy` | — | `max-active-jobs-per-player` reached |
| `tool.broken` | `%tool%` | The last use was spent and the item was destroyed |
| `tool.liquid-none` | — | Nothing matching was found in range |
| `tool.liquid-cleared` | `%blocks%` | A liquid job finished |
| `tool.area-complete` | `%blocks%` | An area-mining job finished; includes the centre block |
| `tool.timber-not-natural` | — | The block was not part of a recognised natural tree |
| `tool.timber-limit` | — | The connected structure exceeded `max-logs` while aborting |
| `tool.timber-complete` | `%logs%`, `%leaves%` | A fell finished. `%logs%` includes the block the player broke |
| `tool.expired` | `%tool%` | The item's stamped deadline has passed |
| `tool.locked` | — | An inventory action was blocked by the [job lock](/plugins/oberontools/features/anti-duplication/) |

`tool.locked` ships without a `<prefix>` on purpose — it is routed to the action bar by the shipped `Presentation` block, where a prefix wastes room.

Blanking a key (`liquid-none: ""`) silences its text. To disable delivery explicitly, set that tool's `messages.overrides` key to `NONE`.

## Tool states

```yaml
state:
  enabled: "<green>enabled</green>"
  disabled: "<red>disabled</red>"
```

Substituted into `%state%` in `command.list-line`.

## Expiry wording

```yaml
expiry:
  permanent: "<green>Never</green>"
  expired: "<red>Expired</red>"
  active: "<green>Active</green>"
  date-format: "yyyy-MM-dd HH:mm"
```

These are what the `%expiry%`, `%expires_at%` and `%expiry_status%` lore placeholders render for the permanent and expired cases, and what `/oberontools inspect` prints. `date-format` is a `java.time` pattern applied in the server's own time zone; an empty value falls back to `yyyy-MM-dd HH:mm`.

Because these are item lore, a change here only becomes visible when the item is next rewritten — by the countdown pass, by `/oberontools refresh`, or by using the tool. See [Expiry](/plugins/oberontools/features/expiry/).

## DzusillCore built-ins

The top of the file holds the framework's shared messages — `no-permission`, `players-only`, `invalid-usage`, `invalid-number`, `player-not-found`, `player-ambiguous`, `command-error`. They are safe to reword; deleting them brings the defaults back on the next load.
