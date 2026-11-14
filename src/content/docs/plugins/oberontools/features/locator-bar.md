---
title: "Locator Bar"
description: "The locator bar is the strip of player dots above the hotbar, added in Minecraft 1.21.6. By default a player disappears from it the moment they hold shift.…"
---

The locator bar is the strip of player dots above the hotbar, added in Minecraft 1.21.6. By default a player disappears from it the moment they hold shift. `locator-bar` overrides that, so everyone stays visible to everyone else.

This is the one part of OberonTools that is not a tool. It needs no item, no permission and no command.

```yaml
locator-bar:
  always-transmit: true
  transmit-range: 60000000
  sweep-interval-ticks: 20
```

| Key | Default | |
|---|---|---|
| `always-transmit` | `true` shipped, off when the section is absent | Keep every player on the bar at all times, crouching included. |
| `transmit-range` | `60000000` | The floor for the transmit range, in blocks. |
| `sweep-interval-ticks` | `20` | How often every online player is re-checked. |

Changes take effect on `/oberontools reload` — no restart needed.

## Two different ways vanilla hides you

Only one of them is distance, which is why raising the range alone does not keep a crouching player visible.

**Distance** is the attribute `minecraft:waypoint_transmit_range`. A player beyond it is simply not broadcast. Setting the base value high fixes that, and `transmit-range: 60000000` is past any world border, so range stops being a factor at all.

**Crouching** is a *modifier*, `minecraft:waypoint_transmit_range_crouch`. The server adds it while a player is crouched, it has the value `-1.0` with the operation `add_multiplied_total`, and that multiplies the final range by zero. No base value survives it however large, and no second modifier can out-add it — zero times anything is zero. The only way past it is to take the modifier back off, which is what this does.

## What it actually does

With `always-transmit: true`, for each player:

1. The base value of `waypoint_transmit_range` is raised to `transmit-range` if it is lower. A base that is already higher is left alone.
2. Every modifier on that attribute with a **negative** amount is removed. A positive one — something granting extra range — is left where it is.

It is matched by being negative rather than by its name on purpose: the crouch modifier has already been renamed once between versions, and a hide on this attribute is always negative, so the shape outlives the name.

That runs at four moments, plus the sweep:

| When | Why |
|---|---|
| Sneak toggle | The real case. Deliberately a tick late: the event fires before the server has changed the player's pose, so the modifier this removes does not exist yet while the event is being handled. |
| Join | A player arrives with whatever the server last stored, and one who logged out crouched is still crouched. Applied immediately and again a tick later. |
| Respawn | Same reason, a tick later. |
| World change | A dimension is what the locator bar is scoped to. |
| Every `sweep-interval-ticks` | The net under all of it, for a hide applied some other way. |

The sweep costs one attribute read per online player per interval, which at the shipped 20 ticks is once per player per second. Lower it if something on your server re-applies a hide more aggressively than vanilla does.

## What it does not change

Crouching is not the only thing that takes a player off the bar, and the others are neither range nor a modifier, so none of them is touched:

- **Invisibility** — the potion effect
- **Spectator mode**
- **A worn mob head or carved pumpkin**

The `minecraft:locator_bar` gamerule is also left alone. Turn the bar off server-wide with the gamerule, not with this section.

## Turning it off

```yaml
locator-bar:
  always-transmit: false
```

Vanilla takes over again from the next reload: the server adds its crouch modifier as usual and shift hides a player again.

A base value this plugin raised is left where it is rather than guessed back down — and it does not need lowering, because the crouch modifier is applied on top of whatever base there is and still zeroes it.
