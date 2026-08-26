---
title: "Lifesteal"
description: "The graduated version of hardcore. A lifesteal player starts with ten hearts and loses one every time they die. The ban only arrives once there are none…"
---

The graduated version of hardcore. A lifesteal player starts with ten hearts and loses one every time they die. The ban only arrives once there are none left — same ending, reached over a run of deaths rather than one.

```
death #1  ❤❤❤❤❤❤❤❤❤♡   9 left
death #2  ❤❤❤❤❤❤❤❤♡♡   8 left
   ...
death #10 ♡♡♡♡♡♡♡♡♡♡   banned for 24h, back with a full bar
```

## The bar stays down

This is the part that matters, and the part a naive implementation gets wrong.

Max health is an attribute the server stores in player data, so setting it once looks like enough. It is not. A respawn rebuilds the player, and plenty of things put the bar back to twenty: kit plugins, minigames, world resets, a stray `/attribute`, anything that "normalises" a player. A lifesteal player quietly regaining the hearts they lost is the one failure nobody reports as a bug — it just feels generous.

dFate holds the bar down four ways:

1. **On join, after respawn, and on a world change** — the fast path.
2. **`PlayerPostRespawnEvent`, not `PlayerRespawnEvent`** — the latter fires *before* the player is actually respawned, and the server resets health while building the new entity. Sizing the bar from there is a race, and it is why a shrunken bar could come back full.
3. **A repeating sweep** that re-asserts the stored count for every online lifesteal player.
4. **A forced client resync** on every apply, whether or not the value changed.

That last one is not paranoia. The attribute is only sent to the client when it is marked dirty, and it is only marked dirty when the value actually *changes*. After a respawn the new player entity has already inherited the correct base from the old one, so writing it again changes nothing, marks nothing, and sends nothing — while the client has reset itself to a full bar. Server, storage and sweep all agree they are correct, and the player looks at ten hearts with no mechanism able to disagree. The resync nudges the value through a different number and back, which marks it dirty; the dirty set is flushed once per tick, so only the final value reaches the client and there is no flicker.

`/fate diag <player>` prints both numbers side by side when they ever disagree again.

```yaml
Lifesteal:
  Enforce-Interval-Ticks: 40
```

The sweep only writes when the value has actually drifted, so on a server where nothing fights it, it costs a couple of attribute reads every two seconds. `0` disables it — not recommended.

> The sweep compares the attribute's **base value**, not its total. A Health Boost effect or an item modifier stacks on top of the base and is not the player refilling what lifesteal took; enforcing against the total would fight those effects and grind the base down every time one was active.

**Players cannot top themselves up.** There is no heart item, no craft, no revive. The only things that change the count are dying, an admin's `/fate set`, and the reset that follows a ban.

## What a death costs

```yaml
Lifesteal:
  Starting-Hearts: 10
  Hearts-Lost-Per-Death: 1
  Escalating-Loss: false
  Maximum-Loss-Per-Death: 3
```

**Flat (default).** Every death costs one heart. Ten hearts is ten deaths. This is what Lifesteal means on every other server, which is why it is the default.

**Escalating.** The first death costs `Hearts-Lost-Per-Death`, the second twice that, the third three times, capped at `Maximum-Loss-Per-Death` multiples. Ten hearts then last about four deaths — a very different game, so switch it on deliberately.

```
flat:        1  1  1  1  1  1  1  1  1  1     → 10 deaths
escalating:  1  2  3  3  3                    → 5 deaths (cap 3)
```

Escalation multiplies the configured base rather than replacing it, so "2 per death, escalating" gives 2, 4, 6 — the base is not silently ignored the moment escalation is turned on.

## Running out

At `Ban-At-Hearts` (default `0`) the run ends: broadcast, title, your `Death.Commands`, then the ban — the same path hardcore uses, so the two modes cannot drift into announcing the same event differently.

```yaml
Lifesteal:
  Ban-At-Hearts: 0
  Restore-Hearts-On-Ban: true
```

**The refill happens when the ban lands, not when the player dies.** That ordering is deliberate: refilling on the death itself would hand a full bar to a player whose ban failed to apply — dying on your last heart would cost nothing and give you ten hearts back. If the ban cannot be issued, the hearts stay spent and the console says why.

Turn `Restore-Hearts-On-Ban` off and a banned player returns at zero, so their next death bans them again — permanent elimination in practice.

## Exemptions apply

Every filter in [Exemptions](/plugins/dfate/features/exemptions/) works the same here. A world where death is free costs no heart, `dfate.bypass` spares the holder, and a death inside the grace period is forgiven. A spared death costs nothing and does not move the death counter.

## Turning it off

```yaml
Lifesteal:
  Enabled: false
```

The choice screen goes back to a straight Hardcore / Normal confirmation. Players who already chose lifesteal keep their stored hearts and their bar keeps being enforced — the mode stops being offered, it does not stop existing.

The mode also **hides itself** when the server's max-health attribute cannot be resolved. Offering a mode whose entire mechanic cannot run would take a permanent decision from a player in exchange for nothing. Watch the console on startup if it never appears:

```
[dFate] SEVERE: Could not resolve the max-health attribute on this server version.
```

## Showing hearts

`%dfate_hearts%` and `%dfate_max_hearts%`, plus the badge:

```yaml
Display:
  Tags:
    LIFESTEAL: '<red>[❤ %hearts%]</red> '
```

Tags substitute `%hearts%`, `%max_hearts%`, `%mode%` and `%deaths%`, so the badge can carry the count. See [Placeholders](/plugins/dfate/placeholders/).
