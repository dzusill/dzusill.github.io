---
title: "messages.yml"
description: "All player-facing text lives in plugins/DRotatingShop/messages.yml, in MiniMessage format. The <prefix> token is replaced by the configured prefix. Named…"
---

All player-facing text lives in `plugins/DRotatingShop/messages.yml`, in [MiniMessage](https://docs.advntr.dev/minimessage/format.html) format. The `<prefix>` token is replaced by the configured `prefix`. Named placeholders use `{name}` (e.g. `{price}`).

```yaml
prefix: "<dark_gray>[<gold>Market</gold>]</dark_gray> "
purchase-success: "<prefix><green>You purchased <white>{item}</white> for <gold>{price}</gold>."
```

## Shop keys

| Key | Placeholders | Used for |
|---|---|---|
| `rotation-broadcast` | `{command}` | Broadcast when the shop rotates. |
| `purchase-success` | `{item}`, `{price}` | Successful purchase. |
| `purchase-fail-money` | `{price}` | Not enough currency. |
| `purchase-fail-stock` | — | Item sold out. |
| `purchase-fail-limit` | — | Per-player limit reached. |
| `purchase-inventory-full` | `{item}` | Bought, but dropped at feet (inventory full). |
| `economy-unavailable` | — | Vault economy missing. |
| `item-added` | `{name}`, `{price}`, `{stock}` | `/dshop additem` confirmation. |
| `item-removed` | `{id}` | `/dshop removeitem` confirmation. |
| `item-not-found` | `{id}` | `/dshop removeitem` on an unknown id. |
| `no-item-hand` | — | `/dshop additem` with an empty hand. |
| `rotated` | — | `/dshop rotate` confirmation. |
| `list-header` | `{count}` | Header of `/dshop list`. |
| `list-entry` | `{id}`, `{price}`, `{stock}`, `{limit}` | One line of `/dshop list`. |
| `list-empty` | — | `/dshop list` when the pool is empty. |

## Framework keys

These are emitted by the DzusillCore command layer — keep them defined:

`no-permission`, `players-only`, `console-only`, `unknown-command`, `invalid-usage` (`{usage}`), `invalid-number` (`{input}`), `player-not-found` (`{name}`), `reload-success`, `reload-failed`, `command-error`.

> A missing key falls back to the **key name** in-game, so problems are visible rather than silent. Run `/dshop reload` after editing this file.
