---
title: "Pearl Catch"
description: "Makes the mace instant pearl catch consistent: an ender pearl meeting its thrower's own wind charge is caught by one rule, whichever of the two was thrown first."
---

A **pearl catch** is the mace move where you throw an ender pearl and then a wind charge along the
same line. When the pearl meets the wind charge in the air, it counts as having hit something, and you
are teleported to it — straight up, with your momentum kept. Thrown on the same tick it is the
"instant pearl catch": about seven blocks of height in a quarter of a second.

In vanilla it is a coin-flip. This module makes it one rule.

## Enabling it

```yaml
modules:
  pearlcatch: true

pearlcatch:
  hitbox: 0.6
  min-age-ticks: 5
  count-overlap: false
  disabled-worlds: []
```

It ships **off**, like every improvement in this plugin. The module switch needs a restart; the four
settings below it apply with `/oberonutils reload`.

## Why vanilla misses

**The order you threw them in decides it.** The server moves entities in the order they were thrown.
Press pearl then wind charge on the same tick and the pearl, moving first, runs straight into the wind
charge still sitting at your eyes: you are teleported one and a half blocks. Press them the other way
round and the wind charge moves first, pulls ahead, and — never slowing down while the pearl does —
is never caught at all.

| Same tick, straight up | Result |
|---|---|
| pearl pressed first | caught on tick 1, **+1.5 blocks** |
| wind charge pressed first | **never** caught |

The same two clicks give a useless hop or nothing, depending on something no player can feel.

**The tolerance starts at zero.** A projectile's hit tolerance is nothing for its first two ticks, then
grows by 0.05 blocks a tick until it reaches 0.3 on tick 8. Quick catches happen exactly when it is
smallest.

**Already inside does not count.** A pearl only catches a wind charge it *enters* during a tick. One that
starts a tick already inside the wind charge's box is not caught that tick.

**Throws are not exact.** Every pearl and every wind charge leaves the hand with a little random spread,
so two throws along the same line drift apart.

**The pearl's size is not what decides it.** The pearl is 0.25 blocks wide, but a catch is tested
along the line the pearl travels, against the wind charge's box grown by the tolerance above. That
tolerance is what this module lets you set.

## What the module changes

Your pearl is tested against where **your own** wind charge stood **at the start of each tick** — as if
pearls always moved first. The throw order stops mattering:

| Throw | Vanilla | With the module |
|---|---|---|
| same tick, straight up | tick 1 (+1.5) or never | **tick 5, +7.1 blocks** |
| same tick, aimed 60° up | tick 1 or never | **tick 5, +6.3** |
| same tick, aimed 45° up | tick 1 or never | **tick 5, +5.4** |
| pearl, then wind charge a tick later | tick 10, +13.1 | **tick 10, +13.1** |
| wind charge, then pearl a tick later | never | never — the charge is faster |

Measured on a simulation of the server's own physics constants, with throws perfectly aimed.

Two more rules sit on top:

- **Nothing is caught before `min-age-ticks`** (5). That is what turns the face-catch into a catch on
  tick 5. It is the same guard the InstantPearlCatch server mod uses, so catches land at the heights
  players know from servers running it.
- **The tolerance is `hitbox`**, or vanilla's own if that is ever wider. A catch vanilla would make is
  never refused.

The catch itself is vanilla's. OberonUtils only decides *that* the pearl hit the wind charge; the pearl
then runs its normal hit, so the teleport, the ender pearl damage, the endermite chance, the momentum
you keep and every event other plugins listen to are exactly what they always were.

## The settings

### `hitbox`

How wide your pearl counts, in blocks, when it meets one of your wind charges.

`0.6` is vanilla's own tolerance once a pearl is 8 ticks old, applied from the first tick a catch is
allowed. It is never looser than vanilla for an older pearl, which makes it the honest default.

Same-tick throws with the real random spread, share caught on tick 5 — the first column is the
InstantPearlCatch mod, which fixes the order but keeps vanilla's tolerance:

| Aim | InstantPearlCatch | `0.6` | `0.8` | `1.0` |
|---|---|---|---|---|
| straight up … 60° up | 97–100% | 100% | 100% | 100% |
| 45° up | 51% | 100% | 100% | 100% |
| 35° up | 13% | 99% | 100% | 100% |
| 30° up | 4% | 93% | 100% | 100% |
| 20° up | under 1% | 54% | 98% | 100% |

**Keep it between 0.6 and 0.8.** From 1.0 up, a pearl followed by its wind charge a tick later starts
getting caught early — on tick 5 instead of around tick 10, several blocks lower — which changes how
that combo plays.

`0` means vanilla's tolerance only.

### `min-age-ticks`

No catch while the pearl is younger than this many ticks (20 ticks = 1 second). `5` stops the
face-catch and catches a same-tick throw on tick 5 instead. `0` turns the guard off and brings the
face-catch back.

### `count-overlap`

Whether a pearl that begins a tick already inside the catch box counts.

`false` keeps the vanilla rule, so catch heights match other servers — the one exception is the first
tick a catch is allowed, which always counts, so that a wider `hitbox` cannot swallow a pearl while the
guard is still refusing and then never let it be caught.

`true` counts any overlap. A pearl followed by its wind charge a tick later is then caught on tick 7
instead of tick 10, three blocks lower.

### `disabled-worlds`

Worlds where pearls are left entirely to vanilla:

```yaml
pearlcatch:
  disabled-worlds: [world_nether, arena]
```

## What stays vanilla

- **Other players' wind charges.** Your pearl meeting someone else's wind charge behaves exactly as it
  always did. Which wind charges are yours is decided by vanilla's own ownership, not by the plugin.
- Pearls hitting players, mobs and blocks.
- Everything after the hit: where you land, damage, momentum.
- Pearls thrown by dispensers, and pearls whose thrower is offline.

A pearl that brushes one of your own wind charges without being caught flies on as if the wind charge
were not there. It is never carried through a block, and if a player was standing just behind the wind
charge, the pearl hits that player as it would have.

## Tuning it in game

```
/oberonutils pearlcatch debug
```

Toggles a report of **your own** attempts, in chat, for as long as you are online:

```
✔ Caught at tick 5 (tolerance 0.30)
✖ No catch · closest 0.41 at tick 6, tolerance there 0.30 · hitbox 0.82 would have caught it
Refused a catch at tick 1 — nothing is caught before tick 5
```

The second line is the useful one: it names the `hitbox` that would have caught that throw. Throw the
same way ten times, and you know what to set.

```
/oberonutils pearlcatch status
```

Shows the settings in force and how many pearls and wind charges are being tracked.

Both need `oberonutils.admin`. The report lines live in `messages.yml` under `pearlcatch:` and go to
chat without a sound by default — they can be restyled like any other message.

## Works with

| Plugin | What happens |
|---|---|
| **WorldGuard** | A region that denies ender pearls refuses the catch like any other pearl. |
| **PvPManager** | Its pearl rules apply unchanged — the teleport is a normal ender pearl teleport. |
| **OberonUtils Combat** | An `ENDER_PEARL` entry in `combat.cooldowns` still throttles throwing. |

Any plugin that cancels a pearl's hit cancels the catch too; the pearl then flies on.

## Limits

- **Paper only.** The module needs the server's single tick; on Folia it stays off and says so in
  console.
- A wind charge that bursts on something in the very tick it is caught is still caught, but its burst
  does not reach you.
- Two key presses split across two server ticks by network lag are still two ticks apart. The module
  makes the result depend only on your timing — it cannot see the timing your client meant.
