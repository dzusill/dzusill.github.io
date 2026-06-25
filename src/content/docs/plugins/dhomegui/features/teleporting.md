---
title: "Teleporting"
description: "Teleport with /home [name] or by left-clicking a home in the menu. Several safety and pacing features sit in between."
---

Teleport with `/home [name]` or by left-clicking a home in the [menu](/plugins/dhomegui/features/homes-menu/). Several safety and pacing features sit in between.

## Default home

`/home` with no name goes to your **default** home. With no default set you get *"You have no default home — specify a name."* Set a default in the [editor](/plugins/dhomegui/features/home-editor/) or rely on `FirstHomeIsDefault`.

## Warmup

```yaml
Settings:
  Teleport:
    WarmupSeconds: 3
    CancelOnMove: true
    CancelOnDamage: true
    Particle: PORTAL
    CheckUnsafe: true
```

| Key | Default | Description |
|---|---|---|
| `WarmupSeconds` | `3` | Countdown before teleporting. `0` = instant. |
| `CancelOnMove` | `true` | Moving cancels the teleport. |
| `CancelOnDamage` | `true` | Taking damage cancels it. |
| `Particle` | `PORTAL` | Particle shown during warmup. |
| `CheckUnsafe` | `true` | Warn and require a re-confirm if the destination looks unsafe (lava, void, …). |

During warmup the player sees a title/action-bar countdown. `dhomegui.bypass.warmup` teleports instantly.

## Cooldown

After teleporting, a per-action cooldown (`Settings.CooldownsInSeconds.Teleport`, default 3s) prevents spam. `dhomegui.bypass.cooldown` skips it.

## Unsafe destinations

If `CheckUnsafe` is on and the spot is dangerous, the teleport is held and the player is asked to *run again to teleport anyway*. This protects against homes set in now-dangerous spots (lava flowed in, block removed, etc.).

## Cost

If [economy](/plugins/dhomegui/features/economy/) charges for `Teleport` and `Confirm.Teleport` is on, the player must confirm before paying. `dhomegui.bypass.cost` skips the charge.

## /back

```
/back
```

Returns the player to their location **before** the last teleport (requires `dhomegui.back`). If there's nowhere to return to: *"There's nowhere to go back to."*

> All teleports use a platform-aware scheduler so they work correctly on **Folia** as well as Paper — see [Folia Support](/plugins/dhomegui/features/folia/).
