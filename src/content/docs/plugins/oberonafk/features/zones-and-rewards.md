---
title: "Zones and rewards"
description: "A zone is a WorldGuard region plus the rules for paying the people in it: how long they have to"
---

## What a zone is

A zone is a WorldGuard region plus the rules for paying the people in it: how long they have to
stand there, how likely the payout is, and which [reward table](/plugins/oberonafk/configuration/rewards/) it draws
from. Zones live in [`zones.yml`](/plugins/oberonafk/configuration/zones/).

Once a second the plugin looks at every online player and works out which zone, if any, they are in.
Polling instead of listening for movement is deliberate: however a player ends up in the region —
walking, a teleport, a respawn, a world change — the next tick sees it, and leaving works the same way.
Entering and leaving are therefore noticed within a second.

When two enabled zones cover the same spot, the one listed **first** in `zones.yml` wins. The region
`__global__` is never matched: it covers the whole world, so a zone pointed at it by mistake would turn
the entire map into an AFK zone.

## The timer

Every player has their own countdown, and it only advances while they are:

- inside a zone,
- in a game mode listed under `game-modes` in [`config.yml`](/plugins/oberonafk/configuration/config/)
  (`SURVIVAL` and `ADVENTURE` by default), and
- not held back because another of their accounts collects already — see
  [One account per player](/plugins/oberonafk/features/alt-guard/).

It starts again from zero when the player **leaves** the zone, **dies**, **logs out** or **changes
game mode**. Nothing about it is persisted — a restart simply restarts everybody's interval.

There is no AFK detection and no activity check. Standing still *is* the point of the zone, so nothing
asks a player to move; keep that in mind for anti-cheat (see
[Troubleshooting](/plugins/oberonafk/reference/troubleshooting/#players-get-kicked-while-afk)).

## The roll

When a player's timer reaches the zone's `interval`:

1. The zone's `chance` decides whether the interval pays at all. `100` always pays; `50` pays half the
   time. When it does not, the timer simply starts over (and the [`nothing`](/plugins/oberonafk/features/notifications/#the-zone-notices)
   notice fires, if you switched it on).
2. One reward is picked from the zone's table, by weight.

A reward with weight 10 comes up twice as often as one with weight 5. Weights are **normalised**, so
they do not have to add up to 100. The console prints every reward's real percentage on startup and
after each reload:

```
Table 'default': cash-25k 35%, cash-100k 15%, ... koth-key 0.5%, envoy-key 0.5%
```

Only rewards that are switched on take part, so one broken entry never changes the table's size —
the others simply share its probability.

### Checking the odds

```
/afk reward test <zone> [rolls]
```

simulates up to a million rolls without giving anything and prints each reward's count, the share it
actually got, and the share the configuration promises (including the zone's `chance`). Use it after
every change to a table.

```
/afk stats server
```

reports the same comparison for what has **really** been given out so far, which is what you want
after a night of players standing in the zone.

## Reward types

| Type | What it does |
|---|---|
| `COMMAND` | Runs console commands — money, currencies, crate keys, permissions, anything. See [Delivery](/plugins/oberonafk/features/delivery-and-storage/) |
| `ITEM` | Hands over a physical item: plain, built from config, captured from your hand, or taken from an item plugin |

Both take an `amount`, which is a number or a range such as `1-3`, rolled each time. There is no
per-player limit on how often a reward can drop: its weight is the only lever.

Rewards are described in full in [rewards.yml](/plugins/oberonafk/configuration/rewards/).

## A reward that cannot be built

A reward with an unknown material, a missing plugin, a missing saved item or a nonsense weight is
**switched off on its own** and the console says why — at startup, after a reload, and in
`/afk reward list`. The rest of the table keeps working, and the percentages of the others adjust.
