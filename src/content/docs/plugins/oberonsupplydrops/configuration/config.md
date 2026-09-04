---
title: "config.yml"
description: "The main settings file. Every key has a working default, so the plugin runs on first start and is"
---

The main settings file. Every key has a working default, so the plugin runs on first start and is
tuned from there rather than assembled from nothing.

## general

| Key | Default | Meaning |
|---|---|---|
| `timezone` | `Europe/Bratislava` | IANA zone used by the fixed schedule |
| `debug` | `false` | Logs every phase transition and every rejected landing site |

Turn `debug` on while tuning placement — it is the only way to see *why* a candidate site was
discarded.

## worlds

A list. A world that is not on it is never used, and `/supplydrop spawn` in it is refused.

## placement

| Key | Default | Meaning |
|---|---|---|
| `mode` | `RANDOM` | `RANDOM` (ring around spawn) or `ZONES` (`zones.yml`) |
| `radius` | `2000` | Outer edge of the ring |
| `min-distance` | `500` | Inner edge — keep this above spawn protection |
| `min-y` / `max-y` | `45` / `200` | Landing height band |
| `max-attempts` | `24` | Candidate sites tried before the cycle is skipped |
| `min-distance-between-drops` | `250` | Spacing between simultaneous crates |
| `avoid-surface-materials` | lava, water, magma, … | Surfaces a crate will not land on |
| `require-sky-access` | `true` | Off allows caves and overhangs — much harder to reach |
| `regions.enabled` | `false` | Filter sites by WorldGuard region |
| `regions.whitelist` | `[]` | A site must be in one of these; empty allows anywhere |
| `regions.blacklist` | `[]` | A site in any of these is rejected — **wins over the whitelist** |

See [WorldGuard regions](/plugins/oberonsupplydrops/features/regions/) for the overlap rules.

## schedule

| Key | Default | Meaning |
|---|---|---|
| `interval.enabled` | `true` | Rolling interval |
| `interval.minutes` | `30` | Base interval |
| `interval.jitter-seconds` | `300` | Random spread, only ever later |
| `fixed.enabled` | `false` | Calendar times |
| `fixed.times` | `18:00`, `21:00` | 24-hour local times |
| `fixed.days` | `[]` | Empty means every day |
| `min-online-players` | `1` | Below this, a scheduled drop is skipped |
| `max-active` | `2` | Simultaneous crates across all worlds |

## phases

| Key | Default | Meaning |
|---|---|---|
| `announce-lead-seconds` | `8` | Warning before the crate appears |
| `descent.enabled` | `true` | The visible fall |
| `descent.height` | `45` | Blocks above the site the crate starts from |
| `descent.blocks-per-second` | `14` | Descent speed |
| `unlock-seconds` | `120` | Countdown; `0` opens the crate on landing |
| `despawn-seconds` | `600` | How long an unclaimed crate survives |
| `despawn-when-empty` | `true` | Remove the crate when the last item leaves it |

## crate

| Key | Default | Meaning |
|---|---|---|
| `default-material` | `CHEST` | Fallback for a tier that names none |
| `protect` | `true` | Break, explosion, piston, burn, liquid and hopper protection |

Leave `protect` on. Off, a hopper under an open crate drains it into a private chest while the people
who ran for it are still arriving.

## effects

| Key | Default | Meaning |
|---|---|---|
| `view-distance` | `96` | Effects are only sent to players inside this radius |
| `trail.*` | on, `CAMPFIRE_COSY_SMOKE`, 4 | Particle trail behind the falling crate |
| `beam.*` | on, height 40, step 1.0, every 10 ticks | Vertical marker beam, coloured per tier |
| `impact.*` | on, `EXPLOSION`, 1 | Landing burst |
| `hologram.enabled` / `offset` | `true` / `1.8` | Floating text above the crate |

Beam text and hologram lines live in `messages.yml`; only their geometry is here.

## bossbar

| Key | Default |
|---|---|
| `enabled` | `true` |
| `color` | `RED` |
| `style` | `SEGMENTED_10` |

## notifications

| Key | Default | Meaning |
|---|---|---|
| `chat` | `true` | Chat announcements |
| `title` | `true` | On-screen titles |
| `action-bar` | `true` | Action-bar line for the three announcements |
| `sound` | `true` | Announcement sounds |
| `reveal-coordinates` | `true` | Off leaves only the beam, the boss bar and `/supplydrop locate` |
| `proximity-bar.enabled` | `true` | Live action-bar countdown for players near a crate |
| `proximity-bar.radius` | `150` | How close a player must be to see it |
| `routing.<event>` | follows the switches | Send one event to `CHAT`, `ACTION_BAR`, `BOTH` or `NONE` |

Routable events: `inbound`, `landed`, `unlocked`, `first-open`, `emptied`, `expired`. See
[Notifications](/plugins/oberonsupplydrops/features/notifications/#routing-one-event-somewhere-else).

## stats

| Key | Default | Meaning |
|---|---|---|
| `enabled` | `true` | Record claims |
| `top-size` | `10` | Rows in the leaderboard and in `top_*` placeholders |

## commands

| Key | Default | Meaning |
|---|---|---|
| `locate-enabled` | `true` | Allow `/supplydrop locate` |
| `aliases` | `[ drops ]` | Extra names for the root command |

Changing aliases takes a restart: the server's command map is written at startup. A reload says so
rather than pretending otherwise.
