---
title: "Control Zones"
description: "A timed world event: a square appears in the wilderness, one faction alone inside holds it and earns rewards, two or more freeze all payouts."
---

A **control zone** is a timed world event. On a schedule, a square area appears at a random spot in
the wilderness. Whichever faction stands inside it **alone** holds the zone and is paid every payout
interval. The moment a second faction steps in, the zone is **contested** and nobody earns anything
until only one side remains — so holding it means winning the fight, not just arriving first.

> **Enabled by default.** Disable with `factions.control-zones.enabled: false`.

## How a zone plays out

1. **Spawn** — every `interval-minutes` a legal location is picked and broadcast with exact
   coordinates, plus a title and a boss bar. The square is outlined with particles and a vertical
   beam so it can be found from a distance.
2. **Capture** — a faction alone inside takes the zone. With the default `capture-seconds: 0` that is
   instant; set it higher for a KOTH-style hold-to-capture timer.
3. **Payout** — while the zone is held, rewards are handed out every
   `rewards.payout-interval-seconds`.
4. **Contest** — as soon as two or more contenders are inside, the state flips to `CONTESTED`: the
   boss bar turns red, the outline turns red, an action-bar warning appears, and **all payouts stop**.
   The owner keeps the zone (unless `contest-resets-owner: true`) but earns nothing.
5. **Loss** — when nobody from the owning faction is inside, a `grace-seconds` timer runs before the
   zone goes neutral, so a death and a run back does not cost the zone. A rival standing in it alone
   takes it immediately, grace or not.
6. **End** — after `duration-minutes` the zone closes, the final owner gets the `end-bonus`, and the
   result is broadcast.

### Who counts as a contender

Contenders are counted **per faction**, not per player. Three members of the same faction inside are
one contender, so teammates never contest each other. A player with no faction counts as their own
contender — they can hold the zone and can contest one — which you can turn off with
`factionless-can-hold: false`. Spectators are ignored by default; creative players are not, but
`ignore-creative: true` changes that. Vanished players (the standard `vanished` metadata flag) are
ignored so staff can watch without freezing the event.

## Where a zone can appear

Placement is deliberately strict. A candidate location is rejected unless **all** of these hold:

| Rule | Setting |
|---|---|
| Every chunk the square touches is wilderness — not claimed, not safezone, not warzone | `wilderness-only` |
| No claim of any faction within N chunks | `min-claim-distance-chunks` |
| No chunk overlaps a WorldGuard region (spawn, market, arenas) | `respect-worldguard` |
| Inside the world border | `respect-world-border` |
| Not in a blocked biome, not on a blocked ground material | `blocked-biomes`, `blocked-ground-materials` |

The engine tries `place-attempts` random locations. If none is legal it **skips the cycle** rather
than forcing a zone somewhere it does not belong. While a zone is live, `/f claim` and `/f create`
refuse its chunks (`block-claiming-in-zone`), so a faction cannot claim the event out from under
everyone contesting it.

## Rewards

Every reward channel is independent and every one degrades to a no-op when its provider is missing —
a server with no economy still runs the event, it just pays no money.

- `mode: PLAYER_BALANCE` (default) pays each member inside through Vault.
- `mode: FACTION_BANK` credits the holding faction's bank instead, logged in `/f bank history` as a
  `CONTROL_ZONE` transaction.
- `mode: BOTH` does both, `NONE` pays no money at all.
- `split-among-members: true` divides one `amount` between the members inside instead of paying each
  the full amount.
- `faction-xp` adds faction XP per payout.
- `commands` runs console commands per payout — crate keys, items, ranks, anything.
- `end-bonus` is a separate one-off payout for whoever owns the zone when it closes.

A factionless holder has no bank, so `FACTION_BANK` skips the credit for them.

## Particles

The outline is drawn per viewer for players within `view-distance`, and the particle **and** colour
are read per state on every redraw — so the square is white while unclaimed, yellow while being
captured, green while held and red while contested. Any `org.bukkit.Particle` name works;
`dust-color` applies when the particle is `DUST`.

### Making the wall visible

The outline is a vertical wall, `height-below` blocks down and `height-above` blocks up from its
anchor — 21 blocks tall by default. What matters more is **where it is anchored**:

| `anchor` | Wall sits at | Trade-off |
|---|---|---|
| `VIEWER` (default) | The watching player's own Y | Always at eye level, whether they are on a hilltop, in a cave under the zone or flying over |
| `GROUND` | The zone's surface height | Fixed in the world, but invisible from anywhere far above or below it |

The anchor is clamped so the wall never runs past the world's build limits.

> **Why `packed-columns` defaults to `true`.** A 21-block solid wall with 12 points per edge is about
> **1,000 individual particle packets per viewer per frame** — enough to hurt with a handful of players
> watching. Packed columns send each vertical column as one spread packet instead, cutting that to
> ~52 while still reading as a wall. Set `packed-columns: false` for a crisp grid at full cost;
> `vertical-step: 2` then halves it again by drawing every other block.

## Configuration

```yaml
factions:
  control-zones:
    enabled: true

    # --- Schedule ---
    interval-minutes: 60          # how often a new zone spawns
    duration-minutes: 15          # how long each zone lives
    start-delay-minutes: 5        # delay before the first zone after start / reload
    warning-seconds: [300, 60, 10]

    # --- Placement ---
    worlds: ['world']
    radius: 2000                  # random pick is taken from the ring between
    min-radius: 300               # min-radius and radius around 0,0
    size: 10                      # square side in blocks (10 = 10x10)
    place-attempts: 40            # tries before the cycle is skipped
    wilderness-only: true
    min-claim-distance-chunks: 3
    respect-worldguard: true
    respect-world-border: true
    blocked-biomes: ['OCEAN', 'DEEP_OCEAN', 'RIVER', 'WARM_OCEAN', 'FROZEN_OCEAN']
    blocked-ground-materials: ['WATER', 'LAVA']
    min-y: 0                      # both 0 = full world height
    max-y: 0

    # --- Control rules ---
    capture-seconds: 0            # 0 = hold instantly, >0 = KOTH-style capture timer
    grace-seconds: 10
    contest-resets-owner: false
    factionless-can-hold: true
    ignore-spectators: true
    ignore-creative: false
    ignore-vanished: true

    # --- Rewards ---
    rewards:
      payout-interval-seconds: 60
      payout-pauses-when-contested: true
      mode: PLAYER_BALANCE        # PLAYER_BALANCE | FACTION_BANK | BOTH | NONE
      amount: 250.0
      split-among-members: false
      max-payouts-per-zone: 0     # 0 = unlimited
      faction-xp: 10
      commands: []                # {player} {uuid} {faction} {world} {x} {y} {z} {amount} {payout}
      end-bonus:
        amount: 1000.0
        faction-xp: 50
        commands: []

    # --- Particles ---
    particles:
      enabled: true
      interval-ticks: 10
      view-distance: 64
      points-per-edge: 12
      height-above: 10      # blocks of wall above the anchor
      height-below: 10      # blocks of wall below the anchor
      anchor: VIEWER        # VIEWER | GROUND
      packed-columns: true  # one packet per column instead of one per block
      vertical-step: 1      # only used when packed-columns is false
      neutral:
        particle: HAPPY_VILLAGER
        dust-color: '#FFFFFF'
      capturing:
        particle: DUST
        dust-color: '#FFFF00'
      held:
        particle: DUST
        dust-color: '#00FF55'
      contested:
        particle: DUST
        dust-color: '#FF3030'
      beam:
        enabled: true
        particle: END_ROD
        height: 40
        points: 40

    # --- Announcements (each individually switchable) ---
    announce:
      spawn: false          # the boss bar already carries the coordinates
      spawn-title: true
      capture: true
      lose: true
      contest: true
      contest-bossbar: true
      contest-interval-seconds: 10
      payout-chat: false
      payout-actionbar: true
      end: true
      cancelled-on-reload: true
      no-valid-location: false
      bossbar: true
      bossbar-style: SOLID
      bossbar-color-neutral: WHITE
      bossbar-color-held: GREEN
      bossbar-color-contested: RED

    # --- Integrations ---
    show-on-map: true
    dynmap-marker: true
    block-claiming-in-zone: true
```

## Commands

| Command | Permission | What it does |
|---|---|---|
| `/f controlzone` (alias `/f cz`) | `factions.cmd.controlzone` (default `true`) | Coordinates, owner, state, time left and your distance |
| `/fa controlzone` | `factions.admin` | Falls through to `info` |
| `/fa controlzone start` | `factions.admin` | Runs one spawn cycle now, placement checks included |
| `/fa controlzone start here` | `factions.admin` | Forces a zone at your location, skipping every placement check |
| `/fa controlzone stop` | `factions.admin` | Ends the live zone with no winner bonus |
| `/fa controlzone info` | `factions.admin` | Full internal state: bounds, timers, payouts |

`/fa controlzone start here` is the one that ignores wilderness, WorldGuard and border checks — it
exists so you can test the event on a claimed test world.

## Placeholders

| Placeholder | Value |
|---|---|
| `%dfactions_controlzone_active%` | `true` / `false` |
| `%dfactions_controlzone_state%` | `NEUTRAL`, `CAPTURING`, `HELD`, `CONTESTED` or `None` |
| `%dfactions_controlzone_owner%` | Holding faction (or player) name, else `None` |
| `%dfactions_controlzone_world%` | Zone world |
| `%dfactions_controlzone_x%` / `_z%` | Zone centre coordinates |
| `%dfactions_controlzone_time_left%` | `m:ss` until the zone closes |
| `%dfactions_controlzone_distance%` | Blocks from the viewing player to the zone centre |

All of them read live in-memory state, so a scoreboard refreshing every tick costs no database work.

## Map and dynmap

A live zone's chunks are marked with a purple ⬟ on `/f map` (`show-on-map`), and the square is drawn
as a purple area on dynmap while the event runs (`dynmap-marker`). Both markers disappear when the
zone closes.

## For developers

Five events are fired on the zone lifecycle:

| Event | Fired when | Notes |
|---|---|---|
| `ControlZoneStartEvent` | A zone opens | |
| `ControlZoneCaptureEvent` | A contender takes the zone | Carries the previous owner |
| `ControlZoneContestEvent` | The zone becomes contested, and again when it resolves | Transitions only |
| `ControlZonePayoutEvent` | Before any reward is handed out | **Cancellable**, and `setAmount` rescales the payout |
| `ControlZoneEndEvent` | A zone closes | `Reason` is `EXPIRED`, `ADMIN` or `SHUTDOWN` |

Owner keys are faction ids, except for a factionless holder where the key is `PLAYER:<uuid>` — check
`ControlZone#isSoloOwner()` before treating a key as a faction id.

A factionless holder who founds or joins a faction mid-event **keeps** the zone: their key changes from
`PLAYER:<uuid>` to the faction id without a re-capture, and the held timer and grace period carry over.
`ControlZoneCaptureEvent` still fires for the change — the key you recorded is no longer the one being
paid — but nothing is broadcast, because the zone did not change hands.

## Notes and limits

- **One zone at a time.** A new cycle is skipped while a zone is live.
- **Not persisted.** A restart or `/fa reload` cancels the live zone (announced by
  `announce.cancelled-on-reload`) rather than restoring it, the same way supply drops behave.
- **`min-y`/`max-y` default to unbounded**, which means a player can hold a zone from a sky platform
  above it. Set both to force a ground fight.
