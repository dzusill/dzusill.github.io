---
title: "Placeholders"
description: "Available in tools.<id>.item.name and every line of tools.<id>.item.lore. They are substituted before the MiniMessage is parsed, so a placeholder that…"
---

> **OberonTools registers no PlaceholderAPI expansion.** There is no `%oberontools_…%`. The placeholders on this page are substituted by OberonTools itself, in two places only: item names and lore in `config.yml`, and the message strings in `messages.yml`.

## Item name and lore

Available in `tools.<id>.item.name` and every line of `tools.<id>.item.lore`. They are substituted before the MiniMessage is parsed, so a placeholder that expands to a coloured word (`%expiry%` does) contributes its own tags.

| Placeholder | Returns | Infinite / permanent tool |
|---|---|---|
| `%tool_id%` | The tool's id | — |
| `%uses%` | Uses left on this item | `∞` |
| `%max_uses%` | The definition's `max-uses` | `∞` |
| `%expiry%` | Time left, as `6d 23h 4m 12s`. Only redrawn while an online player holds the item. While the tool is [paused in storage](/plugins/oberontools/features/expiry/#paused-while-stored) it is the time it still has | `expiry.permanent`, or `expiry.expired` once past |
| `%expires_at%` | The stamped deadline, formatted with `expiry.date-format`; `expiry.frozen` ("Paused (… left)") while paused in storage | `expiry.permanent` |
| `%expiry_status%` | One word: `expiry.active` / `expiry.expired` / `expiry.permanent`, or `expiry.paused` while stored | `expiry.permanent` |
| `%size%` | The **holder's** current width: `3x3`, `5x5`, … for `AREA_MINE` and `BUILD_WAND`, `3x3x3`, `5x5x5`, … for `LIQUID_CLEAR`. Blank on a `TIMBER` tool | — |

The three expiry values take their wording from `messages.yml`, not from Java:

```yaml
expiry:
  permanent: "<green>Never</green>"
  expired: "<red>Expired</red>"
  active: "<green>Active</green>"
  date-format: "yyyy-MM-dd HH:mm"
```

Example:

```yaml
      lore:
        - "<gray>Right-click water or lava to clear</gray>"
        - "<gray>a <white>3x3x3</white> cube around it.</gray>"
        - ""
        - "<dark_gray>Uses: <white>%uses%</white>/<white>%max_uses%</white></dark_gray>"
        - "<dark_gray>Expires in: %expiry%</dark_gray>"
        - "<dark_gray>Deadline: %expires_at%</dark_gray>"
```

`%uses%` never renders below `0`, and `%expiry%` renders `0s` for anything under a second.

### `%size%`

`%size%` is the effective radius of whoever carries the item: the ceiling their permissions reach, with any width they picked through `/radius` applied. Two players holding the same drill see different numbers on their own copy.

```yaml
      lore:
        - "<#7e7e7e>Mines a %size% Area"
```

- It is redrawn right after `/radius` or a `/<tool> radius` change, and within one `processing.expiry-refresh-interval-ticks` after a rank or permission change.
- That scan covers the whole inventory and **both hands**, at any `expiry-refresh-scope`, because the item you are looking at is usually the one in your hand.
- The item stores the radius its lore was drawn with and is rewritten only when that differs from the holder's, so an unchanged width writes nothing.
- In a chest, an ender chest or an auction listing it keeps the **last holder's** width, the same way `%expiry%` goes stale there. Use a fixed size in the lore for items that live in shops.

Configs on `config-version: 1` have their untouched shipped lines (`Mines a 3x3 Area`, and the bucket's `a 3x3x3 cube around it.`) rewritten to `%size%` on the next start; lines you reworded are left alone. See [config.yml](/plugins/oberontools/configuration/config/#header).

### When lore is re-rendered

Lore is static text on an item. These placeholders are re-evaluated only when the item is rewritten:

- **On creation** — crafted, or given
- **On use** — after a use is spent
- **By the countdown pass** — every `processing.expiry-refresh-interval-ticks`, within `processing.expiry-refresh-scope`, only for items that carry an expiry stamp, and never while the item is in either held hand
- **By the size pass** — the same interval, but across the whole inventory and both hands, only for lore that uses `%size%`, and only when the holder's width no longer matches the one drawn
- **On `/radius`** — the holder's tools redraw immediately
- **When an inventory opens** — both held hands refresh while their tooltip is visible
- **On `/oberontools refresh`**

A tool with no expiry stamp is skipped by the countdown pass entirely, so `%uses%` on a `PERMANENT` tool only updates when the tool is used — which is exactly when it changes anyway. See [Expiry](/plugins/oberontools/features/expiry/#keeping-the-countdown-ticking).

The width a player gets is available as `%size%`, rendered for the holder. Lore is still one text per item, not per viewer, so a second player looking at someone else's item (a trade window, an item frame) sees the holder's number. `/oberontools inspect` remains the authoritative read.

## Message strings

Each `messages.yml` key accepts a fixed set. Using a placeholder in a key that does not supply it leaves the literal text visible.

Wherever `%tool%` appears it is the tool's display name (`item.name`, colours included); `%tool_id%` is the config id, and is available alongside every `%tool%` except `command.unknown`. `%tier%` is worded by [`command.radius-tier`](/plugins/oberontools/configuration/messages/).

| Key | Placeholders |
|---|---|
| `command.inspect-header` | `%tool%` |
| `command.inspect-line` | `%key%`, `%value%` |
| `command.invalid-duration` | `%input%` |
| `command.list-line` | `%id%`, `%behavior%`, `%state%` |
| `command.given` · `command.received` | `%amount%`, `%tool%`, `%player%` |
| `command.refreshed` | `%tool%` |
| `command.unknown` | `%tool%` |
| `command.reloaded` | `%count%` |
| `command.reload-failed` | `%error%` |
| `tool.no-use-permission` · `tool.no-craft-permission` · `tool.wrong-world` · `tool.expired` · `tool.broken` | `%tool%` |
| `tool.liquid-cleared` | `%blocks%` |
| `tool.area-complete` | `%blocks%` |
| `tool.wand-complete` | `%blocks%` |
| `tool.wand-no-blocks` · `tool.wand-unsupported` | — |
| `command.radius-header` · `command.radius-none` | — |
| `command.radius-line` | `%tool%`, `%tier%`, `%choices%` |
| `command.radius-set` · `command.radius-auto` | `%tool%`, `%size%`, `%tier%` |
| `command.radius-denied` | `%tool%`, `%requested%`, `%choices%` |
| `command.radius-fixed` | `%tool%` |
| `command.radius-cycled` | `%tool%`, `%size%`, `%tier%` |
| `command.radius-only-one` | `%tool%`, `%size%`, `%tier%` |
| `command.radius-tier` | `%size%`, `%blocks%` — the wording of `%tier%` everywhere |
| `command.tool-shortcut-usage` | `%label%` |
| `tool.timber-complete` | `%logs%`, `%leaves%` |

`<prefix>` is available in every message and expands to the `prefix` key. See [messages.yml](/plugins/oberontools/configuration/messages/).
