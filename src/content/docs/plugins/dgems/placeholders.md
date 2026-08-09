---
title: "Placeholders"
description: "Requires PlaceholderAPI. Without it the placeholders simply do not resolve; nothing else changes."
---

Requires [PlaceholderAPI](https://www.spigotmc.org/resources/6245/). Without it the placeholders simply do not resolve; nothing else changes.

---

## Available placeholders

| Placeholder | Returns |
|---|---|
| `%dgems_balance%` | the raw number, e.g. `12345` |
| `%dgems_balance_formatted%` | rendered through `currency.format`, e.g. **12,345 Gems** with its gradient |

## Which one to use

**`balance`** when you are doing your own formatting, feeding a comparison, or the surface cannot render MiniMessage.

**`balance_formatted`** when you want the currency to look the same everywhere. Rebrand it in `config.yml` and every one of these updates at once.

## Examples

**TAB:**

```yaml
header:
  - "%player%  ·  %dgems_balance_formatted%"
```

**Scoreboard:**

```yaml
lines:
  - "&7Gems: &d%dgems_balance%"
```

**Chat format:**

```
[%dgems_balance% 💎] %player%: %message%
```

**Conditional with a placeholder-condition plugin:**

```
%dgems_balance% >= 500
```

Use the raw `balance` for comparisons — `balance_formatted` contains thousands separators and formatting tags and will not parse as a number.

## Caching

Placeholders are served through the display cache, up to `balance-cache-ttl-seconds` old (default 3). That keeps a scoreboard refreshing every tick from hammering the database.

Purchases and transfers never use the cache — they re-read inside their transaction. A player can briefly see a stale number on a scoreboard; they can never spend against one.

Set `balance-cache-ttl-seconds: 0` if you want every placeholder read to hit the database.

## Offline players

Both placeholders work for offline players where the surface supports it — balances are accounts in the database, not player state.

## Next

- [FAQ & Troubleshooting](/plugins/dgems/faq/)
