---
title: "Wars, Shields & Stats"
description: "A full PvP-competition layer: declared wars with a prep window and beacon objective,"
---

A full PvP-competition layer: **declared wars** with a prep window and beacon objective,
**purchasable shields** for defense, and **combat statistics** for leaderboards.

## Combat stats

**Enabled by default.**

```yaml
factions:
  stats: { enabled: true }
```

Every faction tracks **kills**, **deaths**, **wars won** and **wars lost**. Stats surface in
`/f info`, the [Statistics GUI](/plugins/dfactions/features/gui/), `/f top kills|wars|level`, and placeholders
(`%dfactions_faction_kills%`, `%dfactions_faction_kd%`, …).

## Shields

**Disabled by default.** A shield grants **timed protection** from war declaration, bought from
the faction bank.

```yaml
factions:
  shield:
    enabled: false
    prestige-discount-per-rank: 0.0   # 0.05 = 5% cheaper per prestige rank
    tiers:                            # duration(hours): cost
      "6": 10000.0
      "12": 18000.0
      "24": 32000.0
      "48": 56000.0
```

```
/f shield          # show tiers and your status
/f shield 24       # buy the 24-hour shield
```

- Cost is paid from the **faction bank** (needs [economy](/plugins/dfactions/features/economy/)).
- Prestige can discount the price.
- A shielded faction **cannot be war-declared** while active, **does not stack**, and generally
  cannot itself declare war while protected.

### Admin daily war-shield

Admins can grant a faction a daily time-of-day protection window (UTC hours):

```yaml
factions:
  war:
    shield: { enabled: false, max-duration-hours: 8 }
```

```
/fa shield <faction> <startHour> <durationHours>
```

## Wars

**Disabled by default.** Structured, fair-fight wars with a prep window and a clear victory
condition.

```yaml
factions:
  war:
    enabled: false
    prep-hours: 24          # preparation window before fighting begins
    level-range: 10         # both factions must be within this many levels
    min-members: 2
    cooldown-hours: 48      # cooldown before re-declaring on the same faction
    steal-per-kill: 0.005   # fraction of defender's bank stolen per kill (0.5%)
    xp-steal-per-kill: 0.02 # fraction of the victim faction's XP transferred per kill (2%)
```

### Declaring

```
/f war declare <faction>
```

Rejected if: wars are disabled, you target your own faction, the target doesn't exist, either side
is already at war, either faction is below `min-members`, the factions are outside `level-range`, the
defender is shielded, or you're within `cooldown-hours` of a prior war.

### Prep window

```
/f war cancel
```

After declaration the war enters a **prep phase** (`prep-hours`); either side may cancel. When prep
ends, the war becomes **active** automatically.

### Fighting & victory

- **Per-kill bank steal** — each enemy kill transfers `steal-per-kill` of the defender's bank to the
  attacker.
- **Per-kill XP steal** — each enemy kill also transfers `xp-steal-per-kill` of the **victim
  faction's** XP into the killer's faction (set to `0` to disable). Only applies while both factions
  are in an active war.
- **Beacon objective** — with the [Beacon HQ](/plugins/dfactions/features/beacon/) system on, destroying the enemy beacon ends
  the war instantly; the winner takes the loser's bank + XP and all of the loser's chest contents drop,
  and the winner's own beacon is healed to full health immediately.
- On war end, `wars_won` / `wars_lost` update for each side.

> For the fairest experience, enable **both** `war` and `beacon` so wars have a concrete objective
> rather than only attrition.

### War boss bar

While a war is declared, everyone involved — **both** the attackers and the defenders — sees a boss
bar tracking it:

- **Preparation:** `War: A vs B — starts in 2m 5s`, counting down every second as the bar depletes.
- **Active:** `At war: A vs B`.
- **Cooldown:** after the war ends, a bar counts down the re-declare cooldown.

Colours and bar style are configurable in `notifications.yml`:

```yaml
bossbar:
  enabled: true
  war:
    prep-color: YELLOW       # preparation countdown
    active-color: RED        # active war
    cooldown-color: WHITE    # post-war cooldown
    style: SOLID             # SOLID | SEGMENTED_6 | SEGMENTED_10 | SEGMENTED_12 | SEGMENTED_20
```

The bar is removed immediately when a war ends **or when a belligerent disbands mid-war**, so it never
lingers on "At war".
