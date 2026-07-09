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
  only-if-no-money: false
```

| Key | Default | Description |
|---|---|---|
| `enabled` | `true` | Toggle the XP penalty. |
| `keep` | `false` | `true` = keep **all** levels and XP (nothing is lost). |
| `lose-levels` | `-1` | Used when `keep: false` — how XP is lost (see below). |
| `only-if-no-money` | `false` | Fallback mode — reset XP **only if the money penalty took nothing**. See [Money-first fallback](#money-first-fallback). |

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

## Money-first fallback

Set `only-if-no-money: true` to make XP loss a **fallback for the [money penalty](/plugins/ddeathpenalty/features/money-penalty/)**: a player only loses XP when the money penalty could take **nothing** — i.e. they were broke (balance `0` or insufficient). If any money was taken, their XP is fully protected. Money becomes the penalty *instead of* XP, not on top of it.

| On death | Money | XP |
|---|---|---|
| Player has money | taken — `penalty-money` shown | **kept in full** |
| Player is broke | nothing taken | **reset** per `lose-levels` — `penalty-exp` shown |

```yaml
money: { enabled: true, mode: PERCENT, amount: 10.0 }
exp:   { enabled: true, keep: false, lose-levels: 0, only-if-no-money: true }
```

> Requires a **reset mode** — `lose-levels: 0` (wipe) or `N` (drop N levels). It has **no effect** with `lose-levels: -1`, since a vanilla orb drop isn't a reset. Any money taken (even a partial amount) protects XP.

> **Messages:** the `penalty-exp` message in [messages.yml](/plugins/ddeathpenalty/configuration/messages/) is shown **whenever the XP penalty resets a player's XP** — in fallback mode or not. Money and XP announce themselves independently, so a player who loses both sees both lines.
