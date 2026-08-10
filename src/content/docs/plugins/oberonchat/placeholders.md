---
title: "Placeholders"
description: "Two PlaceholderAPI placeholders for showing a player's violation total and how far they are from the next punishment."
---

Requires [PlaceholderAPI](https://www.spigotmc.org/resources/6245/). Without it the plugin works fine — the placeholders just aren't registered.

The expansion is registered by OberonChat itself, so there is nothing to download from `/papi ecloud` and it survives `/papi reload`.

## Available

| Placeholder | Returns |
|---|---|
| `%oberonchat_violations%` | The player's running violation total. |
| `%oberonchat_threshold%` | Points still needed for the next punishment, or `0` when they are past the last one. |

Both are per-viewing-player.

## Examples

In a staff scoreboard:

```yaml
- "Warnings: &c%oberonchat_violations%"
```

In a tab list, only for players who have any:

```yaml
suffix: "%oberonchat_violations%"
```

Note that `%oberonchat_violations%` returns `0`, not an empty string, for a clean player — wrap it in your scoreboard plugin's own conditional if you only want it shown for offenders.

## Reading the numbers

Both come from the same decaying window the punishments use. A total goes down on its own as offences age past `Violations.Decay-Seconds`, so a scoreboard showing it will tick back to `0` without anybody doing anything.

`%oberonchat_threshold%` counts down towards the next configured tier. With tiers at 3 and 6 and a player on 4 points, it returns `2`.

## Verifying

```
/papi parse me %oberonchat_violations%
```

If that returns the literal text rather than a number, the expansion did not register — check the console at startup for:

```
[OberonChat] Registered PlaceholderAPI expansion.
```

No such line means PlaceholderAPI was not installed when OberonChat started. Install it and restart; the check happens once, at enable.
