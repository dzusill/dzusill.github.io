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

- The beacon **cannot be broken** by non-members under normal conditions.
- Building is blocked inside a **no-build box** around the beacon so it can't be walled in
  (e.g. boxed with obsidian). The box is `protection-radius` wide horizontally and spans
  `protection-height-below`/`protection-height-above` blocks vertically. With the defaults
  it covers the beacon, its 3×3 ring, one block below and three above — outside that box
  building is allowed, so players can still terraform nearby.
- The beacon is **vulnerable only during an active war** against the owning faction.
- **Right-clicking the beacon opens the faction GUI** — a physical entry point to
  [the menu](/plugins/dfactions/features/gui/).

## Beacon & war victory

During a [declared war](/plugins/dfactions/features/wars-and-shields/), the defender's beacon becomes attackable. Destroying
it wins the war instantly:

- The war ends with the attacker as victor.
- The loser's **bank balance and XP** transfer to the winner.
- The loser's team-chest contents **drop** at the beacon.

This makes the beacon the central risk/reward object of the war system.

## Hologram

Rendered with an ArmorStand-based holder (no external hologram plugin required) and refreshed on a
schedule via the Folia-safe scheduler. It shows live faction stats and is removed when the beacon or
faction is gone.
