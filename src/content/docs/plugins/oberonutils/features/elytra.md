---
title: "Elytra"
description: "Governs what a firework rocket may do mid-glide — refuse it outright, or throttle it with a cooldown — without touching anything else a rocket does."
---

Governs firework boosting while gliding. Nothing else about rockets changes: they still work on the ground,
from a dispenser, and as fireworks.

## Enabling it

```yaml
modules:
  elytra: true

elytra:
  firework-boost: BLOCK      # BLOCK | COOLDOWN | ALLOW
  boost-cooldown: 8s         # COOLDOWN mode only
  bypass-permission: oberonutils.elytra.firework
```

## The three modes

| Mode | What happens mid-glide |
|---|---|
| `BLOCK` | The rocket is refused outright and never consumed. The player is told why. |
| `COOLDOWN` | The boost happens, then rockets go on cooldown for `boost-cooldown`. Elytra travel still works; chaining rockets does not. |
| `ALLOW` | Vanilla. Nothing is enforced and the listener is not even registered. |

`BLOCK` is the shipped default.

Switching is a config edit and `/oberonutils reload` — the mode is read per event, so no restart is needed.

### `COOLDOWN` in detail

Enforcement is **vanilla's own item cooldown**, the same mechanism ender pearls use. That has two
consequences worth knowing:

- The client draws the usual sweep over the rocket stack and refuses the next use itself. There is no
  message, and therefore no chat spam on a player who keeps trying.
- The cooldown applies to the rocket *item*, so during it the player also cannot use rockets for anything
  else. That is the point — it is a boost throttle, not a per-action lockout.

The cooldown is stamped **after** the boost is allowed, at `MONITOR`, so a rocket a region plugin refused is
never charged. It is never re-stamped over a running cooldown either, or a player hammering right-click
would extend their own penalty indefinitely.

A crossbow loaded with a rocket is **ignored** in this mode. A crossbow rocket is a projectile that flies
away from the player and gives no boost at all, so there is nothing to throttle — and stamping the rocket
cooldown would also stop them reloading the crossbow, which is not what a boost cooldown means.

### `BLOCK` in detail

The attempt is stopped at the interact, **before** the rocket is used up, so a blocked attempt costs the
player nothing. Cancelling later would eat the item and still leave a firework entity to clean up.

A crossbow loaded with a rocket **is** refused here, on the same terms. Under a hard block it is the obvious
way around the restriction, so leaving it open would defeat the setting.

## What counts as "mid-glide"

Gliding is the state that matters — that is what turns an elytra from a glide into sustained travel.

Both hands are checked, so moving the rocket to the off hand does not help.

Creative and Spectator are excluded, because a rocket does nothing for flight there.

## The bypass

```
lp group vip permission set oberonutils.elytra.firework true
```

`oberonutils.elytra.firework` exempts a player from whichever mode is set — they boost as in vanilla. It
defaults to **false**, and deliberately not to op: a bypass that fell through to operators would leave every
admin boosting and make the restriction look broken to whoever was testing it.

Setting `bypass-permission` to a blank string disables the bypass entirely.

## The message

`elytra.firework-blocked` in `messages.yml`, sent at most once per attempt. Only `BLOCK` sends it — a
silently refused rocket is indistinguishable from a broken one, whereas a cooldown is already visible on the
item.

## Upgrading from `block-firework-boost`

The old boolean still works and is read **only when `firework-boost` is absent**, so a server updating from
an older build keeps exactly the behaviour it had — a config merge adds keys without changing existing
values. `true` means `BLOCK`, `false` means `ALLOW`.

Set `firework-boost` instead; the boolean will be removed.

A misspelled mode falls back to `BLOCK` and says so in console, rather than silently unenforcing the
restriction.

## Not to be confused with `combat.cooldowns`

`combat.cooldowns` can also carry a `FIREWORK_ROCKET` entry, but it is a different feature: it is a blanket
item cooldown that knows nothing about gliding and, with the shipped `combat.only-when-tagged: true`, applies
only while PvPManager has the player combat-tagged.

Use `elytra.firework-boost: COOLDOWN` to throttle *boosting*. Use `combat.cooldowns` to throttle a rocket
everywhere, in combat. Setting both is safe — neither re-stamps over a cooldown the other started.
