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
| `%expiry%` | Time left, as `6d 23h 4m 12s`. Only redrawn while an online player holds the item, so it goes stale in chests and auction listings — see [Expiry](/plugins/oberontools/features/expiry/#lore-placeholders) | `expiry.permanent`, or `expiry.expired` once past |
| `%expires_at%` | The stamped deadline, formatted with `expiry.date-format` | `expiry.permanent` |
| `%expiry_status%` | One word: `expiry.active` / `expiry.expired` / `expiry.permanent` | `expiry.permanent` |

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

### When lore is re-rendered

Lore is static text on an item. These placeholders are re-evaluated only when the item is rewritten:

- **On creation** — crafted, or given
- **On use** — after a use is spent
- **By the countdown pass** — every `processing.expiry-refresh-interval-ticks`, within `processing.expiry-refresh-scope`, only for items that carry an expiry stamp, and never while the item is in either held hand
- **When an inventory opens** — both held hands refresh while their tooltip is visible
- **On `/oberontools refresh`**

A tool with no expiry stamp is skipped by the countdown pass entirely, so `%uses%` on a `PERMANENT` tool only updates when the tool is used — which is exactly when it changes anyway. See [Expiry](/plugins/oberontools/features/expiry/#keeping-the-countdown-ticking).

Note that the radius a player's permissions grant is **not** available as a lore placeholder. Lore is rendered per item, not per viewer, and one item can be held by players on different tiers. Use `/oberontools inspect` to read the effective radius, or write the numbers into the lore by hand per tool.

## Message strings

Each `messages.yml` key accepts a fixed set. Using a placeholder in a key that does not supply it leaves the literal text visible.

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
| `tool.timber-complete` | `%logs%`, `%leaves%` |

`<prefix>` is available in every message and expands to the `prefix` key. See [messages.yml](/plugins/oberontools/configuration/messages/).
