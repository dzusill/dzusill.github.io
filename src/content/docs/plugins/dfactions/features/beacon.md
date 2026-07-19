---
title: "Beacon HQ"
description: "The Beacon HQ turns a faction's headquarters into a physical, protected block in the world — its"
---

The **Beacon HQ** turns a faction's headquarters into a physical, protected block in the world — its
heart, and during wars the objective enemies must destroy to win.

> **Disabled by default.** Enable with `factions.beacon.enabled: true`, then restart or `/fa reload`.

## What the beacon is

When enabled, founding a faction places a **beacon block** at the creator's location:

- The beacon's chunk is **auto-claimed** for the new faction.
- A **new-beacon shield** protects it for a configurable number of hours, so fresh factions aren't
  instantly raided.
- A floating **hologram** above it shows the faction name, health, level/prestige and bank.

## Configuration

```yaml
factions:
  beacon:
    enabled: false
    material: BEACON
    protection-radius: 1        # horizontal no-build radius (1 = 3×3 footprint)
    protection-height-below: 1  # protected blocks below the beacon
    protection-height-above: 3  # protected blocks above the beacon
    max-health: 100
    new-beacon-shield-hours: 24
```

## Protection rules

- The beacon block is **fully locked — nobody can break it.** Not members, not neutral players, not
  OP or anyone with `factions.bypass`. Breaking it is always cancelled; the only ways it leaves the
  world are losing a war (below) or the faction disbanding.
- The beacon is **damageable only during an active war** against the owning faction, and only by the
  enemy belligerent. It behaves like a mob: **hitting it (left-click) or trying to mine it removes a
  chunk of health per hit** (subject to a short per-hit cooldown), and the block itself never breaks —
  destruction is modelled purely through health reaching 0.
- Every hit **refreshes the hologram** so defenders see health drop live; the hologram also refreshes
  on a schedule.
- Building is blocked inside a **no-build box** around the beacon so it can't be walled in
  (e.g. boxed with obsidian). The box is `protection-radius` wide horizontally and spans
  `protection-height-below`/`protection-height-above` blocks vertically. With the defaults
  it covers the beacon, its 3×3 ring, one block below and three above — outside that box
  building is allowed, so players can still terraform nearby.
- **Right-clicking the beacon opens the faction GUI** — a physical entry point to
  [the menu](/plugins/dfactions/features/gui/).

## Beacon & war victory

During a [declared war](/plugins/dfactions/features/wars-and-shields/), the defender's beacon becomes attackable. Destroying
it wins the war instantly:

- The war ends with the attacker as victor.
- The loser's **bank balance and XP** transfer to the winner.
- **All** of the loser's team-chest contents **drop** at the beacon (nothing is kept).
- The winner's own beacon **instantly heals to full health** the moment the war ends — no waiting
  on the normal regen timer. This applies to every path that ends a war with a winner, including a
  forfeit when the enemy faction disbands mid-war.

This makes the beacon the central risk/reward object of the war system.

## Hologram

Rendered with a single billboarding `TextDisplay` per faction (no external hologram plugin
required), reused in place — never re-spawned — so it can't duplicate or stack. It shows the
faction's **name, health, level, prestige, XP and bank**, and refreshes on a short interval so the
lines track live faction data — including damage during a war and XP / bank changes from any source.
The cadence is configurable:

```yaml
factions:
  beacon:
    hologram-refresh-ticks: 20   # 20 = 1s; lower is more responsive, higher is cheaper
```

The hologram is removed when the beacon or faction is gone.
