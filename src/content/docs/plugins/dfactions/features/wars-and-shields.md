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
(`%pvpindex_faction_kills%`, `%pvpindex_faction_kd%`, …).

## Shields

**Disabled by default.** A shield grants **timed protection** from overclaiming/raiding, bought from
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
- A shielded faction **cannot be overclaimed** while active, **does not stack**, and generally
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
ends, the war becomes **active** automatically. A **boss bar** shows the war state (prep, active, or
post-war cooldown) to both factions immediately — it updates the moment a war is declared, starts, or
ends, not on a delay.

### Fighting & victory

Once a war is **active**:

- **Open borders** — the two belligerent factions can **build, break and use TNT inside each other's
  claimed territory** for the duration of the active war. Normal claim protection resumes when the war
  ends; during prep and cooldown, claims stay fully protected.
- **Per-kill bank steal** — each enemy kill transfers `steal-per-kill` of the defender's bank to the
  attacker.
- **Beacon objective** — with the [Beacon HQ](/plugins/dfactions/features/beacon/) system on, draining
  the enemy beacon's HP to zero wins the war. The winner takes the loser's bank + XP and the loser's
  chests drop, **and the losing faction is disbanded** — its members are removed and its land freed for
  anyone to claim (`factions.beacon.destroy-disbands-faction`, on by default).
- **War overview** — when a war ends, a **`WAR OVERVIEW`** summary is broadcast in chat: kills, deaths,
  duration, and money stolen.
- `wars_won` / `wars_lost` update for each side.

> For the fairest experience, enable **both** `war` and `beacon` so wars have a concrete objective
> rather than only attrition.
