---
title: "messages.yml"
description: "Every text a player or staff member reads. MiniMessage, with legacy codes (&7) and bare hex"
---

Every text a player or staff member reads. MiniMessage, with legacy codes (`&7`) and bare hex
(`#C21807`) accepted too. Placeholders work as `%name%` or `{name}`. An empty line (`""`) sends nothing.

Where a message appears — chat, action bar, both — and its sound are **not** set here but in
[`Presentation`](/plugins/oberonafk/configuration/config/#presentation) in `config.yml`; a title for it is set under
[`titles`](/plugins/oberonafk/configuration/config/#titles). The zone notices have their own switches under
[`notifications`](/plugins/oberonafk/configuration/config/#notifications). Nothing in this file decides routing, so every key listed
below can be moved, voiced and given a title.

## prefix

```yaml
prefix: ""
```

`<prefix>` expands to this in chat and to nothing on the action bar. Empty by default; put it in front of
a line only if you want it.

## Framework keys

`no-permission`, `players-only`, `console-only`, `unknown-command`, `invalid-usage` (`%usage%`),
`invalid-number` (`%input%`), `player-not-found` (`%name%`), `player-ambiguous` (`%name%` `%players%`),
`reload-success`, `reload-failed`, `command-error`. Used by the command layer for every plugin built on
OberonCore; they are filed under the `ERROR` category.

## notice

Four texts per [zone event](/plugins/oberonafk/features/notifications/#the-zone-notices): `chat`, `action-bar`,
`title`, `subtitle`.

| Event | Tokens |
|---|---|
| `enter` | `{zone}` `{interval}` |
| `leave` | `{zone}` |
| `reward` | `{reward}` `{amount}` `{zone}` |
| `storage` | `{reward}` `{count}` — stacks now waiting in total |
| `storage-full` | `{reward}` |
| `nothing` | `{zone}` `{interval}` |
| `teleport` | `{zone}` |

## countdown

The live action-bar line. `{time}` (written by [`time-format.countdown`](/plugins/oberonafk/configuration/config/#time-format)),
`{seconds}`, `{zone}`.

## delivery

Labels for how a reward ended up, shown in `/afk history` and `/afk reward give`: `command`, `direct`,
`storage`, `storage-full`, `failed`.

## teleport

| Key | Sent when | Tokens |
|---|---|---|
| `warmup` | Every second of the warm-up | `{seconds}` `{zone}` |
| `cancelled-move`, `cancelled-damage` | The warm-up was cancelled | |
| `in-combat` | Refused because of a combat tag | |
| `already-there`, `already-pending` | Refused | |
| `no-point` | The zone has no landing point | `{zone}` |
| `no-zone`, `unknown-zone` | No zone to go to | `{zone}` |
| `disabled`, `failed` | Teleporting is off / the teleport failed | |

## claim

`loading`, `claimed` (`{item}` `{amount}`), `partial`, `inventory-full`, `claimed-all` (`{count}`
`{remaining}`), `nothing`, `gone`, `database-off`.

## help

`header`, and one line per command — `teleport`, `tp`, `claim`, `stats`, `stats-server`, `history`,
`zone`, `reward`, `storage`, `reload`. `{main}` and `{claim}` are the configured command names, so the help
always names commands the server really has. Each line is shown only to players who may use that command;
an empty line hides it.

## stats and history

`stats.summary` (a list; `{player}` `{drops}` `{time}` `{last}`), `stats.last-ago` (`{time}`),
`stats.never`, `stats.expected-unknown`, `stats.rewards-header`, `stats.reward-line` (`{reward}`
`{count}`), `stats.server-header` (`{total}`), `stats.server-line` (`{reward}` `{count}` `{share}`
`{expected}`), `stats.server-empty`, `stats.loading`, `stats.database-off`; `history.header` (`{player}`
`{page}` `{pages}` `{total}`), `history.line` (`{when}` `{zone}` `{reward}` `{amount}` `{delivery}`),
`history.empty`.

## zone, reward, storage

The staff screens. `zone.line` and `zone.info` take `{zone}` `{world}` `{region}` `{interval}`
`{status}` `{inside}` (and `{chance}` `{table}` `{points}` `{default}` for `info`); the statuses are
`zone.status-on`, `status-off`, `status-no-region` and `status-no-table`, and `zone.default-yes` /
`default-no` fill `{default}`. `reward.line` takes `{reward}` `{type}` `{weight}` `{percent}` `{display}`
`{status}`, with `reward.status-off` receiving `{reason}`. `reward.test-*` are the simulation output and
`reward.captured` the capture confirmation. `storage.*` is the staff view of someone's claim storage.

## Upgrading

New keys arrive with their defaults on the next start; keys you changed are kept. A key that is missing
from your file falls back to the key's own name in game, which is why every constant the plugin uses is
checked against the shipped file by the test suite.
