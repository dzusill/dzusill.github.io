---
title: "Troubleshooting"
description: "The first move for almost everything here:"
---

The first move for almost everything here:

```yaml
general:
  debug: true
```

Then `/supplydrop reload` and `/supplydrop spawn`. Every rejected landing site is logged with the
reason it was discarded, and every phase transition is logged as it happens.

## No drops ever spawn

Work down this list — it is ordered by how often each one is the answer.

| Check | How |
|---|---|
| Is a tier defined? | `/supplydrop preview`. An empty menu means `tiers.yml` has nothing usable — the console said so at startup |
| Is the world enabled? | `worlds` in `config.yml` must contain the world's exact name |
| Are enough players online? | `schedule.min-online-players` defaults to 1, so an empty server gets nothing |
| Is a schedule enabled? | `/supplydrop next`. "No drop is scheduled" means both `interval.enabled` and `fixed.enabled` are off |
| Is the limit already reached? | `/supplydrop active`. `max-active` caps simultaneous crates |
| Can a site be found? | `/supplydrop spawn` with debug on — the log names every rejection |

If `/supplydrop spawn` works but the schedule never fires, it is one of the two gates: player count
or `max-active`.

## Every site is rejected

The debug log names the rule. The common ones:

| Reason | Fix |
|---|---|
| `y … is outside the … band` | Widen `min-y`/`max-y`. A superflat or a heavily terraformed world often sits outside the default 45–200 |
| `surface is WATER` | Expected on an ocean-heavy map — raise `max-attempts`, or use [drop zones](/plugins/oberonsupplydrops/features/scheduling-and-zones/) over land |
| `outside the world border` | `radius` is larger than the border |
| `no sky access` | Nether or a roofed world — set `require-sky-access: false` |
| `blocked by the region rules` | See [WorldGuard regions](/plugins/oberonsupplydrops/features/regions/); check the blacklist is not swallowing the whitelist |
| `within … blocks of an active drop` | `min-distance-between-drops` is large relative to `radius` |

`min-distance` larger than `radius` makes the search band empty and nothing will ever be accepted.

## Drops land where players cannot reach them in time

Three dials, in the order worth trying:

1. Lower `placement.radius`. A 5,000-block radius with a two-minute countdown means nobody arrives.
2. Raise `phases.unlock-seconds`.
3. Switch to [drop zones](/plugins/oberonsupplydrops/features/scheduling-and-zones/) around the areas people actually play
   in.

## Nobody sees the announcements

- The `oberonsupplydrops.notify` permission is what gates every announcement, the title and the boss
  bar. It defaults to everyone, so a permission plugin has usually negated it.
- Check the channel switches under `notifications` in `config.yml`.
- An empty message in `messages.yml` is treated as "hide this".

## The crate has no hologram, beam or falling animation

- Check `effects.*` and `phases.descent.enabled`.
- `effects.view-distance` (96 by default) — nothing is drawn for players further away.
- Look for a warning in the console at the moment the drop spawned. These are guarded: a failure to
  spawn a display leaves the event running without it rather than taking the drop down.

## FancyHolograms is installed but nothing looks different

The console names the backend at startup:

```
[INFO] Crate holograms: FancyHolograms 2.11.0.
[INFO] Crate holograms: built-in text displays.
```

If it says built-in with FancyHolograms installed, the warning above it says why — either
`effects.hologram.provider` is `BUILT_IN`, or FancyHolograms is present but its API could not be used
(this needs **2.4.0 or newer**; the packages moved before that).

## `/hologram list` says there are no holograms

Expected. That command lists only *persistent* holograms, and crate holograms are deliberately not
persistent — a persistent one would be written to FancyHolograms' storage and restored forever, one
per drop. Turn on `general.debug` to watch them instead:

```
[holograms] created osd_a57cad15… for tier 'legendary' (TEXT, billboard CENTER, scale 1.3) at -4, -60, 23
[holograms] removed osd_a57cad15…
```

## The hologram shows no countdown

`effects.hologram.fancy.type` is `ITEM` or `BLOCK`. Only a `TEXT` hologram can carry `{time}`; the
boss bar and the proximity action bar are the countdown for the other two.

## A per-tier hologram override does nothing

- It only applies under FancyHolograms — the built-in renderer ignores the whole `fancy` block.
- `tiers.yml` is never default-merged, so the shipped example never appears in a file you already
  have. Add the `hologram` block by hand.
- Unreadable values are named in the console with the ones that would have worked.

## A crate is stuck in the world

It should not happen — crate positions are written down as they land and swept on the next startup,
and every entity is tagged.

If one does survive:

```
/supplydrop clear
```

removes every crate the plugin currently knows about. For a leftover from an older run, break it: a
crate the plugin has forgotten is no longer protected, so it behaves like an ordinary container.

## Players can open a crate before the countdown ends

The countdown is enforced by a listener at `HIGH` priority. Another plugin cancelling the interact
event at `HIGHEST`, or opening the container by its own means, bypasses it. Chest-protection and
custom-inventory plugins are the usual culprits.

## Loot is missing or wrong

- Unknown materials and enchantments are logged at startup with the tier and key, then skipped.
- Enchantments are matched by their **registry key**, so use modern names — `SHARPNESS`, not
  `DAMAGE_ALL`.
- `loot.rolls` is clamped to the pool size, so asking for 5 rolls from a pool of 2 gives 2.
- Pool entries are drawn **without replacement**, so one entry cannot fill a whole crate.

## The leaderboard is empty

- `stats.enabled` in `config.yml`.
- `enabled` in `database.yml` — with it off, totals reset on restart.
- Only the **first** player to open a crate gets a claim. Items are counted for everyone.

## Placeholders show the placeholder text

PlaceholderAPI has to be installed, and the expansion registers itself at startup — look for
`Registered PlaceholderAPI expansion` in the log. It survives `/papi reload`.

## A config change did nothing

- `/supplydrop reload` re-reads every file.
- Command aliases are the exception: the server's command map is written at startup, so those need a
  restart.
- A drop already in flight keeps the timings it started with. Only the schedule is recomputed.
- If validation failed, the console says which file and key, and the previously working configuration
  stays active — that is by design, and the message is the thing to read.

## Still stuck

Turn on `general.debug`, reproduce it once, and keep the log from server start to the failure. The
startup block lists every module that enabled, every config problem found, and whether region
filtering and PlaceholderAPI are active — which is usually enough on its own.
