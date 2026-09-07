---
title: "Drill test plan — vertical placement"
description: "Ten minutes in-game. Needs a player; the geometry is already covered by tests, this proves it in the world."
---

Ten minutes in-game. Needs a player; the geometry is already covered by tests, this proves it in the world.

## Setup

```
/op <you>
lp user <you> permission set oberontools.radius.pickaxe.2 true
lp user <you> permission set oberontools.radius.pickaxe.3 true
/oberontools give <you> pickaxe
/oberontools inspect          -> confirms the tier you resolved to
```

Dig into a flat stone wall, standing on solid ground. Note your Y (F10 or the debug screen).

## The four cases

| # | Radius | Aim | Expected |
|---|---|---|---|
| 1 | 3×3 | level, straight ahead | floor holds, tunnel 3 tall, Y never changes |
| 2 | 5×5 | level, straight ahead | floor holds, **2 blocks at your height + 3 above** |
| 3 | 7×7 | level, straight ahead | floor holds, 2 at your height + 5 above |
| 4 | 9×9 | level, straight ahead | floor holds, 2 at your height + 7 above |

**Pass:** walk forward after each swing without jumping, and your Y is unchanged. That is the whole fix — before, 5×5 dropped you one and 7×7 two.

Revoke tiers between runs to step back down:

```
lp user <you> permission unset oberontools.radius.pickaxe.3
```

## Aiming off level — deliberate, must still work

| # | Aim | Expected |
|---|---|---|
| 5 | at the block by your feet | digs one below you — a staircase down |
| 6 | above head height | whole square lifts, floor untouched |

If 5 refuses to dig down, that is a regression.

## Flat faces — anchor must not apply

| # | Action | Expected |
|---|---|---|
| 7 | mine straight down | flat square under you, no vertical spread |
| 8 | mine straight up | flat square overhead |

## Regression sweep

| # | Check |
|---|---|
| 9 | shovel behaves identically on dirt/gravel |
| 10 | pickaxe does not break adjacent dirt; shovel does not break adjacent stone |
| 11 | one swing = one use (`/oberontools inspect`) |
| 12 | inside a WorldGuard region you cannot build in, nothing breaks |
| 13 | `%expires_at%` lore shows a date, not a countdown |
| 14 | `/oberontools reload` mid-session, repeat case 2 |

## Falsifying the fix

Set `vertical-anchor: CENTERED` on the pickaxe, reload, repeat case 2. It **should** drop you one block. If it does not, the setting is not being read and case 2 passing means nothing.
