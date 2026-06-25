---
title: "Kill Streaks (PRO)"
description: "Reward your best PvPers: consecutive kills without dying multiply the steal."
---

> **PRO feature.** Requires `dBloodMoney-PRO.jar`.

Reward your best PvPers: consecutive kills without dying multiply the steal.

## How it works

- Each kill raises the killer's streak by 1.
- The reward is multiplied by the **highest tier reached**.
- The streak **resets to zero** when the player dies — to anything (PvP, mobs, fall, lava).

## Configuration

```yaml
Pro:
  Streak:
    Enabled: true
    Tiers:
      '3': 1.25
      '5': 1.5
      '10': 2.0
    Title-Enabled: true
    Broadcast: true
```

`Tiers` maps `consecutive-kills → multiplier`. With the defaults:

| Streak | Multiplier |
|---|---|
| 1–2 | ×1.0 (none) |
| 3–4 | ×1.25 |
| 5–9 | ×1.5 |
| 10+ | ×2.0 |

> **Quote the number keys** (`'3'`, `'5'`, `'10'`) so YAML reads them correctly.

## Worked example

Base steal of **$400**, killer on a **5-kill streak** (×1.5):

```
killer gains = 400 × 1.5 = 600
victim loses = 400
```

The extra $200 is funded by the server (minted), so the victim never loses more because of someone else's streak.

## Milestones

When a player hits an **exact** tier (3, 5, 10…):

- A title flashes on their screen — `5 KILL STREAK` (`streak-title`, toggle with `Title-Enabled`).
- The server is notified (`streak-broadcast`, toggle with `Broadcast`):
  > **[dBloodMoney]** **Alice** is on a **5** kill streak!

## Settings summary

| Key | Description |
|---|---|
| `Enabled` | Toggle kill streaks. |
| `Tiers` | Streak thresholds → multiplier (highest reached applies). |
| `Title-Enabled` | Show the milestone title. |
| `Broadcast` | Announce milestones to the server. |

## Showing the live streak

With PlaceholderAPI, `%dbloodmoney_streak%` shows a player's current streak and `%dbloodmoney_best_streak%` their record — see [Placeholders](/plugins/dbloodmoney/placeholders/).
