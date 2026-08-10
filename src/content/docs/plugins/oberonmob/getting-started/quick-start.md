---
title: "Quick Start"
description: "Choose a strategy, tune the radius, decide whether one player can affect another, and know which setting to change when it does too much or too little."
---

## 1. Decide which strategy you want

This is the only decision that really matters.

**`CANCEL_SPAWN`** — the mob never spawns. Free at runtime. But a spawn either happens or it doesn't, so the effect is shared: by default the spawn is only stopped when **nobody in range still wants mobs**.

**`HIDE_ENTITY`** — the mob spawns and is hidden from that player alone. Genuinely per player, affects nobody else. The mob is still physically there: it can be walked into, and it only stops hunting the player because `Prevent-Targeting` is on.

The shipped default is `CANCEL_SPAWN`, matching what the old script did.

## 2. Try the other one

```yaml
Toggles:
  mobs:
    Mode: HIDE_ENTITY
```

`/oberonmob reload`, then `/mob`. Everything nearby that the toggle covers vanishes from your screen. Switch it back on and it all returns.

Worth trying before you decide — the "the mob is still there" caveat sounds worse on paper than it feels in play, and it is the only mode where one player genuinely cannot affect another.

## 3. Decide whether one player can affect another

`CANCEL_SPAWN` only. Default:

```yaml
    Cancel-When-Others-Nearby: false
```

A spawn is stopped only when nobody in range still wants mobs. Somebody standing next to a player with mobs off keeps their spawns.

```yaml
    Cancel-When-Others-Nearby: true
```

Restores the old script's behaviour: cancel as soon as *any* nearby player has mobs off. That is how one player could turn a shared area into a dead zone for everybody standing in it.

## 4. Tune the radius

```yaml
    Radius: 256
```

256 matches the old script. **128 is plenty on most servers** — mobs only spawn near players anyway, and a smaller radius makes the nearby-player lookup cheaper. It ships at 256 so nothing changes under you on day one.

## 5. Check what a toggle actually covers

```
/oberonmob status
```

The entity count tells you at a glance whether `#ENEMY` and your exclusions did what you meant. See [Entity groups](/plugins/oberonmob/features/entity-groups/).

## 6. When it does too much or too little

| Symptom | Change |
|---|---|
| Mob farms stopped working | A spawn reason got added to `Spawn-Reasons` that shouldn't be there — the default list is natural spawning only |
| Iron golems stopped appearing in villages | Same — `VILLAGE_DEFENSE` and `BUILD_IRONGOLEM` must stay out of the list |
| One player empties the area for everyone | `Cancel-When-Others-Nearby: false`, or switch to `HIDE_ENTITY` |
| Phantoms still spawn | Phantoms have their own toggle; `/phantoms`, not `/mob` |
| A mob type isn't covered | Add it to `Entities`, or use a broader group token |
| Hidden mobs still hit the player | Expected in `HIDE_ENTITY` — the mob is physically there. Use `CANCEL_SPAWN` if that matters |

## 7. Add your own toggle

Editing one file is the whole job — see [Adding your own toggle](/plugins/oberonmob/features/custom-toggles/).
