---
title: "Teleporting"
description: "Left-click a warp (or run /warp <name>) to teleport. Two things gate or delay it: per-warp permissions and the warmup."
---

Left-click a warp (or run `/warp <name>`) to teleport. Two things gate or delay it: per-warp **permissions** and the **warmup**.

## Per-warp permission

A warp can be marked permission-locked (the **Toggle Permission** button, or `/warpadmin setpermission <warp>`). When locked, a player may only teleport if they have:

- `warpgui.teleport.<warpname>` — access to that specific warp, **or**
- `warpgui.teleport.*` — access to every warp, locked ones included.

Otherwise they get *"You do not have permission to teleport to this warp."* Unlocked warps are open to anyone with `warpgui.use`.

## Warmup

By default teleporting runs a short countdown before moving the player:

```yaml
Settings:
  Teleport:
    WarmupSeconds: 3
    CancelOnMove: true
    Particle: PORTAL
```

| Key | Default | Description |
|---|---|---|
| `WarmupSeconds` | `3` | Countdown length. Set `0` for instant teleport. |
| `CancelOnMove` | `true` | Cancel the warmup if the player moves more than ~0.5 blocks. |
| `Particle` | `PORTAL` | Particle shown around the player during warmup. Any [Bukkit Particle](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Particle.html) name. |

During the countdown the player sees a title (`Teleport.WarmupTitle` / `WarmupSubtitle` in [messages.yml](/plugins/warpgui/configuration/messages/)) and the particle effect. Moving cancels it with *"Teleport cancelled."*

The permission `warpgui.warmup.bypass` skips the warmup and teleports instantly.

## Visit tracking

Every successful teleport increments the warp's visit count, which feeds the [Trending](/plugins/warpgui/features/trending/) feed and the `%warpgui_…_visits%` [placeholder](/plugins/warpgui/placeholders/).
