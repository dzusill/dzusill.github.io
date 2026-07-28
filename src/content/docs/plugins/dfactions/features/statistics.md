---
title: "Statistics & Seasons"
description: "A full statistics platform: every fight, claim and bank movement is recorded as a permanent"
---

A full statistics platform: every fight, claim and bank movement is recorded as a permanent
**event log**, grouped into **seasons**, and turned into a **skill ranking** that is not worth
farming.

**Enabled by default.**

```yaml
factions:
  stats:
    enabled: true
```

## How it works

The plugin records what happened. It does not decide what anything is worth.

```
Minecraft (dFactions)                         Phalanx API + website
─────────────────────                         ─────────────────────
kill / claim / deposit
        │
        ▼  ~2-5 µs, no database work
  in-memory queue
        │
        ▼  every 10 s, batched, off the server tick
  stat_events  (append-only, never overwritten)
        │
        ▼  every 30 s, batched HTTP push
                                    ──────►   skill rating, diminishing returns,
                                              fake-fight rejection, anomaly review
                                                        │
  ranked position  ◄─────────────────────────────────────┘
```

Two things follow from that split, and they are the whole design:

- **Nothing heavy happens on the server tick.** A kill costs a queue insert and returns. The
  previous behaviour did three synchronous database round-trips inside the death event.
- **A past season can be re-scored.** Because the log is never overwritten, discovering a new
  exploit next month means replaying the same observations through better rules — not losing the
  season.

## What is tracked

**Per player, per season:** kills, deaths, K/D, kill streak and best streak, playtime, sessions,
skill rating and leaderboard position.

**Per faction, per season** — the ten metrics on a public profile:

| # | Metric | |
|---|---|---|
| 1 | Value / net worth | bank + tracked assets |
| 2 | Raids made / suffered | |
| 3 | Successful defences | |
| 4 | Faction K/D | combined member kills and deaths |
| 5 | Chunks claimed | current + season peak |
| 6 | Power | current + season peak |
| 7 | Overclaims | **not measurable — see below** |
| 8 | Money in / out | |
| 9 | Nemesis faction + wars | |
| 10 | Members | count + 7-day activity |

**Leader-only**, recorded but deliberately kept off the public profile: TNT detonated, blocks
destroyed, time under raid, members joined/left.

> **Metric 7 is always zero.** Claiming an already-claimed chunk is rejected outright by the claim
> flow, so there is no overclaim to observe. Surfaces render it as `n/a` rather than a misleading
> `0`, and the event types are reserved so the metric works the day an overclaim mechanic exists.

## How the ranking stays honest

The goal is not to catch cheaters — it is to make cheating pointless, so that catching is mostly
unnecessary.

**1. The ranking is a skill rating, not a kill count.** Beating a much weaker opponent moves it by
almost nothing. Two friends trading kills back and forth gain essentially zero; no detection is
involved, it simply does not work.

**2. Repetition stops paying.** Killing the same player again is worth less every time. The tenth
kill of one victim is worth a quarter of the first, and five hundred kills total barely more than
twenty kills' worth of value.

**3. A fight that was never a fight scores nothing.** If the opponent had no armour, never fought
back, or is brand new, the kill carries no ranking value at all.

**4. Real fights look different from staged ones.** Genuine PvP is messy and scattered. Boosting is
the same person, in the same place, at the same interval — which is measurable, and is measured.

**5. Nobody is told.** A discounted result still increases the player's own numbers exactly as
before. Their kill count climbs; their leaderboard position does not move. There is no message, no
config toggle, no permission node and no placeholder anywhere in the plugin that reveals weighting.

> If the system visibly blocked something, people would tune until it stopped blocking. That is why
> the split exists — and why nothing on this page's in-game side can tell anyone they were noticed.

**Nobody is banned by software.** Suspicious patterns are raised for your staff to review on the
website. The decision is always a human one; a wrong accusation against two siblings on one
connection costs a server far more than a farmer ever gains.

### Local anti kill-farming

Separately from the ranking, a short cooldown stops repeat kills of the same victim from inflating
the in-game K/D counters:

```yaml
factions:
  stats:
    kill-cooldown-seconds: 60   # 0 disables
```

The kill is **still recorded** either way — the website cannot recognise farming if the plugin
hides the evidence. Only the displayed counter is held back.

## Seasons

A season is a **statistics boundary only**. Power, claims, bank, levels, prestige, relations and
warps all survive a rollover untouched; what resets is that `/stats` starts reading a fresh season
row. Previous seasons are preserved as history and stay readable on the website.

```yaml
factions:
  seasons:
    enabled: true
    mode: PERIODIC          # MANUAL | FIXED | PERIODIC
    fixed-end: '2027-01-01T00:00:00'
    period: '90d'
    settle-minutes: 5
    check-interval-minutes: 5
    label-template: 'Season {number}'
```

| Mode | Behaviour |
|---|---|
| `MANUAL` | Never ends on its own — only `/fa season end`. |
| `FIXED` | Ends at the exact date in `fixed-end` (server-local time, ISO-8601). |
| `PERIODIC` | Ends every `period` after the season started, repeating indefinitely. |

`period` accepts `12h`, `90d`, `2w`, `6mo` (30 days) and `1y` / `2y` (365 days). A bare number
means days. "Every year" is `1y`; "every two years" is `2y`.

**Changing the schedule mid-season is safe.** Edit `config.yml`, run `/fa reload`, and the running
season's end is rewritten in place — a single column update, with no data movement. Shortening a
period so that the end has already passed simply ends the season on the next check.

`settle-minutes` delays the rollover slightly past the scheduled end so the statistics API has time
to ingest the season's final events.

```
/fa season          # current season, rule, time remaining
/fa season list     # recent seasons
/fa season end confirm
```

## Commands

```
/stats              # your profile (alias of /fstats)
/stats <player>     # scout an opponent
/f stats            # same, inside the faction menu
/f stats faction    # your faction's profile
```

`/fstats` is the primary command name with `/stats` and `/pvpstats` as aliases — many plugins claim
`stats`, and registering the distinctive name first means the command always works even when it
loses that race.

See [Commands & Permissions](/plugins/dfactions/commands-and-permissions/#statistics) for the full list including
the admin commands.

## Resetting a player's statistics

```
/fa stats reset <player> [field...] confirm
/fa stats purge [field...] confirm
```

Fields: `kills`, `deaths`, `streak`, `rating`, `playtime`, `money`, `networth`, or `all` (default).
Both commands are two-step — without the trailing `confirm` you get a summary and a 30-second
window, and confirming with different arguments than you previewed is rejected.

> **The event log is never deleted.** A reset zeroes the displayed counters for the current season
> and writes a tombstone into the log describing what was zeroed. The website can honour the reset
> in its own totals — and undo it if the reset was a mistake, which would be impossible if the
> underlying records had been destroyed.

A purge touches the **current season only**. All-time faction counters (`/f top kills`,
`%dfactions_faction_kills%`) are not affected.

`factions.cmd.stats.purge` is deliberately **not** granted by `factions.admin`. An irreversible
all-players operation has to be handed out on purpose.

## Faction net worth

Value is tracked incrementally, from the events that move it — spawners placed and broken, and
container contents diffed when a chest is closed — against a price list you control.

```yaml
factions:
  stats:
    networth:
      enabled: true
      prices:
        'SPAWNER:ZOMBIE': 250000.0
        'SPAWNER:BLAZE': 750000.0
        'NETHERITE_INGOT': 15000.0
        'ANCIENT_DEBRIS': 12000.0
        'DIAMOND_BLOCK': 9000.0
      track-containers: true
```

Keys are `SPAWNER:<EntityType>` for spawners and a Bukkit material name otherwise. Anything not
listed is worth zero and is not tracked at all, which is what keeps this cheap.

Each change is recorded with its item key. That is what makes the economy hard to inflate: a
spawner handed to an ally produces a matching negative and positive entry with the same key
moments apart, so the website nets them to zero instead of counting the value twice.

> **This is a directional signal, not an audit.** Hoppers, droppers, dispensers, item frames, ender
> chests, `/give`, WorldEdit and other plugins move items without firing the events above, so the
> number drifts. Being exact would require periodically scanning every claimed chunk, which is far
> too heavy to run on a live server, so it is deliberately not done.

## Raids and defences

Raids are derived from signals the plugin already produces rather than from a new mechanic:

- A **beacon destroyed during a war** is a successful raid for the attacker and a failed defence
  for the owner.
- A **war that ends with the defender's beacon intact** is a successful defence.

> Consequently, raids that end without destroying a beacon are invisible to these metrics, and on a
> server running with `factions.beacon.enabled: false` they stay at zero. See
> [Beacon HQ](/plugins/dfactions/features/beacon/).

## Performance

Designed so that neither the Minecraft server nor the API carries meaningful load.

```yaml
factions:
  stats:
    server-id: 'default'
    event-log:
      enabled: true
      flush-interval-ticks: 200   # 10 seconds
      max-batch-size: 500
      queue-capacity: 20000
      categories:
        combat: true
        sessions: true
        lifecycle: true
        war: true
        territory: true
        economy: true
        destruction: true
      retention-days: 0
    sample-interval-minutes: 30
    damage-rollup-seconds: 60
```

| Setting | What it does |
|---|---|
| `flush-interval-ticks` | Ticks between batched writes. `200` = 10 s, minimum `20`. |
| `max-batch-size` | Rows per insert. Keep at or below `500` on H2, whose pool is single-writer. |
| `queue-capacity` | If the queue fills, events are **dropped rather than stalling the tick**, and a warning naming this key is logged at most once a minute. |
| `categories.*` | Per-category kill switches. Season boundaries and admin resets are always recorded. |
| `retention-days` | Days of already-pushed events to keep locally. `0` keeps everything. |
| `sample-interval-minutes` | How often power, claims and value are sampled for the season curve. Only factions whose numbers moved are recorded. |
| `damage-rollup-seconds` | Raid damage is aggregated into one summary per window rather than one event per block — a single TNT wall is thousands of block breaks. |

**Cost per kill on the main thread:** roughly 2-5 µs and zero database work.

**Volume:** expect about 850,000 rows and 250 MB per 90-day season at 100 players. Above roughly
50 concurrent players, use MySQL rather than H2 — see [database.yml](/plugins/dfactions/configuration/database/).

`retention-days: 0` is the default because full retroactive recalculation depends on the log
surviving. Setting it above zero prunes only events the API has already acknowledged.

### How fresh is the data?

| What | Updates |
|---|---|
| Anti-farm cooldown decision | instant |
| `/f info` inactivity | instant, on join and quit |
| `/stats`, `/f stats`, GUI, placeholders, `/f top` | every **10 s** |
| Push to the website | every **30 s** |
| Leaderboard position from the website | on the next push after it recomputes |
| Raid damage totals | 60 s window, then the next flush |
| Power, claim peaks, value curve | every **30 min** |

Nothing player-visible is instant: worst case a kill takes ten seconds to appear. That is the
trade that turns three blocking database calls per death into one batched insert per ten seconds.
Lower `flush-interval-ticks` to `20` for one-second updates if you are on MySQL.

## Website

Sending statistics to the website is **opt-in and off by default** — the local log fills either
way, and starts pushing from wherever it left off once enabled, so nothing from the meantime is
lost.

```yaml
integrations:
  phalanx:
    enabled: true
    api-url: 'https://your-phalanx-host'
    api-key: 'your-bot-api-key'
    tenant-slug: 'default'
    stats:
      enabled: false
      event-path: '/api/v1/factions/stat-events'
      push-interval-seconds: 30
      batch-size: 500
      max-backoff-seconds: 900
      request-timeout-seconds: 15
      accept-leaderboard-mirror: true
      stale-after-minutes: 60
```

Credentials are shared with the [Discord bridge](/plugins/dfactions/integrations/#phalanx-discord-bridge), so if
that is already configured there is nothing new to set up beyond `stats.enabled: true`.

If the API is unreachable, events simply accumulate locally and are pushed once it returns. Nothing
is lost and nothing else on the server is affected.

See [Integrations](/plugins/dfactions/integrations/#statistics-event-stream) for the wire format, and
[The Website](/plugins/dfactions/website-statistics/) for what players and staff actually see.

## Health check

```
/fa stats debug
```

Reports queue size and capacity, events enqueued and dropped, rows written, failed batches, the
retry buffer, the current sequence number, how far the website has acknowledged, and the current
season. If `Dropped` is climbing, raise `queue-capacity`.
