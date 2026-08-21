---
title: "Elytra"
description: "Stops a firework rocket powering elytra flight, without touching anything else a rocket does."
---

Blocks firework boosting while gliding. Nothing else about rockets changes: they still work on the ground,
from a dispenser, and as fireworks.

## Enabling it

```yaml
modules:
  elytra: true

elytra:
  block-firework-boost: true
  bypass-permission: oberonutils.elytra.firework
```

## What is blocked

A rocket used **while gliding** — that is the state that turns an elytra from a glide into sustained
travel, and it is the only thing refused.

A crossbow loaded with a rocket is refused on the same terms. It is the same boost by another route, and
leaving it open would make it the obvious way around the restriction.

Both hands are checked, so moving the rocket to the off hand does not help either.

Creative and Spectator are excluded, because a rocket does nothing for flight there.

## The rocket is not consumed

The attempt is stopped at the interact, **before** the rocket is used up, so a blocked attempt costs the
player nothing. Cancelling later would eat the item and still leave a firework entity to clean up.

## The bypass

```
lp group vip permission set oberonutils.elytra.firework true
```

`oberonutils.elytra.firework` defaults to **false**, and deliberately not to op. A bypass that fell through
to operators would leave every admin boosting and make the restriction look broken to whoever was testing
it.

Setting `bypass-permission` to a blank string disables the bypass entirely.

## The message

`elytra.firework-blocked` in `messages.yml`, sent at most once per attempt. A silently refused rocket is
indistinguishable from a broken one.
