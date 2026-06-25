---
title: "XP Penalty"
description: "Control what happens to a player's experience on death."
---

Control what happens to a player's experience on death.

```yaml
exp:
  enabled: true
  keep: false
  lose-levels: -1
```

| Key | Default | Description |
|---|---|---|
| `enabled` | `true` | Toggle the XP penalty. |
| `keep` | `false` | `true` = keep **all** levels and XP (nothing is lost). |
| `lose-levels` | `-1` | Used when `keep: false` — how XP is lost (see below). |

## `lose-levels` values

| Value | Effect |
|---|---|
| `-1` | **Vanilla** — XP drops on the ground as orbs, as normal. |
| `0` | **Wipe** — all levels and XP are removed on respawn. |
| `N` | Remove **N levels** on respawn. |

### Examples

```yaml
# keep everything
exp: { enabled: true, keep: true }

# brutal: lose it all
exp: { enabled: true, keep: false, lose-levels: 0 }

# lose 5 levels
exp: { enabled: true, keep: false, lose-levels: 5 }
```

> `keep: true` overrides `lose-levels`. With `keep: false` and `lose-levels: -1`, behaviour matches vanilla Minecraft (orbs drop and part is recoverable).
