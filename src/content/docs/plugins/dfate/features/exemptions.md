---
title: "Exemptions"
description: "Five ways a death costs nothing. They are checked in this order, and the first one that matches wins."
---

Five ways a death costs nothing. They are checked in this order, and the first one that matches wins.

| # | Check | Verdict |
|---|---|---|
| 1 | The player never chose, or chose normal | `MODE_EXEMPT` |
| 2 | They hold `dfate.bypass` | `BYPASS_PERMISSION` |
| 3 | They died in an excluded world | `WORLD_EXEMPT` |
| 4 | They died to an excluded damage cause | `CAUSE_EXEMPT` |
| 5 | They are inside the grace period | `GRACE_PERIOD` |
| — | none of the above | `COSTS` |

**The same rules cover hardcore and [lifesteal](/plugins/dfate/features/lifesteal/).** An exemption spares a lifesteal player a heart exactly as it spares a hardcore player a ban — a world where death is free has to be free in both, or the filters would mean two different things depending on which mode read them.

A spared death is **completely** spared: no ban, no heart, no broadcast, no `Death.Commands`, and the death counter does not move. A death that did not cost anything must not inflate the number the player is judged by.

## 1. The bypass permission

```yaml
Death:
  Filters:
    Honour-Bypass-Permission: true
```

Grant `dfate.bypass` to whoever needs to die in survival without consequence.

> This node sits **outside** the `dfate.*` wildcard on purpose. A blanket `dfate.*` grant to your admin group would otherwise quietly exempt the people moderating hardcore from hardcore.

Set `Honour-Bypass-Permission: false` to ignore the node entirely — even admins die properly.

## 2. Worlds

```yaml
Death:
  Filters:
    Worlds:
      Mode: BLACKLIST
      List:
        - lobby
        - creative
        - minigames
```

| Mode | Meaning |
|---|---|
| `BLACKLIST` (default) | Deaths count **everywhere except** the listed worlds. |
| `WHITELIST` | Deaths count **only** in the listed worlds. |

An empty list always means "everywhere", whichever mode is set. World names are matched case-insensitively.

`WHITELIST` is the one to use if hardcore applies to a single survival world and nothing else.

## 3. Damage causes

```yaml
Death:
  Filters:
    Ignored-Causes:
      - VOID
      - SUICIDE
      - KILL
```

Names come from Bukkit's `EntityDamageEvent.DamageCause`. Matched case-insensitively, so `void` works too. Commonly used: `VOID`, `SUICIDE`, `KILL`, `FALL`, `CUSTOM`, `SUFFOCATION`.

A death the server cannot attribute at all (no last damage cause) is treated as a **real death** — an unattributable death is still a death.

## 4. Grace period

```yaml
Death:
  Filters:
    Grace-Period-Seconds: 300
```

Five minutes after choosing hardcore in which a death is forgiven. `0` disables it.

Measured from the moment the mode was chosen, **not** from first join — so a mode an admin assigns with `/fate set` gets the same runway rather than dropping someone straight into the deep end.

> A record with no choice timestamp (hand-edited, or from a much older file) skips the grace check rather than being treated as freshly chosen. Otherwise a bad row would become permanently immune.

## Finding out why nothing happened

```yaml
Debug: true
```

Every spared death in an at-risk mode is then logged with its reason:

```
[dFate] [debug] Steve died as LIFESTEAL but was spared: WORLD_EXEMPT
```

This is the only way to answer "he died and nothing happened", which is why the verdict is kept rather than collapsed into a yes/no.
