---
title: "messages.yml"
description: "Every player-facing string, in MiniMessage format."
---

Every player-facing string, in [MiniMessage](https://docs.advntr.dev/minimessage/format.html) format.
Reloads with `/dlive reload`.

## Format

MiniMessage, not legacy `&` codes. Gradients, hex colours, hover and click all work:

```yaml
announcement-sent: "<#10B981>Your live announcement was sent."
toggle-on: "<b><gradient:#C21807:#F11800>Live</gradient></b> <#555555>» <#55FF55>Enabled"
```

`prefix` is prepended to single messages. It ships empty.

## The keys that matter most

| Key | Shown when |
|---|---|
| `usage` | `/live` with no argument |
| `invalid-url` | the input is not a usable URL |
| `invalid-domain` | a valid URL, but not on an allowed platform |
| `blocked-link` | the link is on the blocklist |
| `cooldown` | `%seconds%` remaining on their cooldown |
| `duplicate-link` | this link was announced too recently |
| `no-saved-link` | `/live twitch` with nothing saved for that platform |
| `announcement-sent` | success |
| `toggle-on` / `toggle-off` | after `/live toggle` |
| `not-ready` | their data is still loading, or storage is down |

## Saved link messages

The whole `platform:` section covers [saved links](/plugins/dlive/features/saved-links/):

| Key | Shown when |
|---|---|
| `platform.saved` | a link was added |
| `platform.updated` | a link was replaced |
| `platform.removed` | a link was deleted |
| `platform.exists` | `add` against a platform that already holds one |
| `platform.missing` | `edit` or `remove` against a platform that holds nothing |
| `platform.mismatch` | the link belongs to `%actual%`, not `%platform%` |
| `platform.unknown` | not a configured platform; `%platforms%` lists the valid ones |
| `platform.list-header` / `list-row` / `list-empty` | `/live platform list` |

`platform.list-row` carries a click-to-run on `/live %platform%` and a hover, so the list doubles as a
launcher.

## Paged views

`history.*` and `block.*` follow the standard paged view shape: header, row, empty, footer, prev,
next, prev-disabled, next-disabled and page-hint. Editing `row` changes every row of that list.

## A note on quoting

`on`, `off`, `yes` and `no` are booleans in YAML when unquoted. If you ever add a key with one of
those names, quote it — an unquoted `on:` key will not resolve.
