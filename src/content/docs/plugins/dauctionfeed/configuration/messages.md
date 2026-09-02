---
title: "messages.yml"
description: "Every message players and admins see, in MiniMessage format."
---

Every message players and admins see, in [MiniMessage](https://docs.advntr.dev/minimessage/format.html) format.

`<prefix>` is replaced by the `prefix` value at the top of the file. Placeholders use `{name}`.

```yaml
prefix: "<dark_gray>[<gold>Auctions</gold>]</dark_gray> "
```

## Player-facing

| Key | When it is shown | Placeholders |
|---|---|---|
| `restock-broadcast` | A restock happened | `{count}` `{total}` `{sale}` |
| `restock-title` | Restock title, if titles are on | `{count}` |
| `restock-subtitle` | Restock subtitle | `{count}` |
| `purchase-limit-reached` | A player hits the per-restock cap | `{limit}` |

## Admin

| Key | When it is shown | Placeholders |
|---|---|---|
| `restock-done` | `/auctionfeed restock` succeeded | `{count}` `{total}` |
| `restock-none` | A restock produced nothing | `{reason}` |
| `restock-cleared` | Seeded listings were removed | `{count}` |
| `restock-next` | Countdown to the next restock | `{time}` |
| `preview-header` | `/auctionfeed preview` | `{count}` |
| `preview-entry` | One preview line | `{amount}` `{item}` `{tier}` `{price}` `{note}` |
| `preview-note-floor` | Appended when the floor raised a price | — |
| `preview-note-market` | Appended when the market moved a price | — |
| `item-added` | `/auctionfeed additem` | `{name}` `{tier}` `{price}` |
| `item-removed` | `/auctionfeed removeitem` | `{id}` |
| `item-not-found` | No pool item with that id | `{id}` |
| `no-item-hand` | `additem` with an empty hand | — |
| `tier-not-found` | A command named a tier that does not exist | `{tier}` `{tiers}` |
| `seed-done` | `/auctionfeed seed` wrote entries | `{count}` `{skipped}` |
| `seed-empty` | Nothing left to seed | — |
| `list-header` / `list-entry` / `list-empty` | `/auctionfeed list` | see file |
| `status-header` / `status-line` | `/auctionfeed status` | `{label}` `{value}` |

## Failure states

| Key | When it is shown |
|---|---|
| `bridge-unavailable` | A command needed AxAuctions and it is not attached |
| `economy-unavailable` | No Vault economy |
| `pool-empty` | The item pool has nothing in it |

## Framework keys

`no-permission`, `players-only`, `console-only`, `unknown-command`, `invalid-usage`, `invalid-number`,
`player-not-found`, `reload-success`, `reload-failed`, `command-error` — resolved by DzusillCore's command layer.

## Notes

- A missing key falls back to the key name itself, so it is visible in-game rather than silently blank.
- Editing this file needs a [`/auctionfeed reload`](/plugins/dauctionfeed/configuration/reloading/).
- Item lore and titles are rendered by the server's own MiniMessage, so the same tags work everywhere.
