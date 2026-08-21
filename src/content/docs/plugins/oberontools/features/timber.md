---
title: "Timber"
description: "behavior: TIMBER makes an axe fell whole trees. Break one natural log and the connected trunk comes down, with its crown, over the following ticks."
---

`behavior: TIMBER` makes an axe fell whole trees. Break one natural log and the connected trunk comes down, with its crown, over the following ticks.

```yaml
    timber:
      minimum-logs: 2
      max-logs: 256
      max-leaves: 1024
      log-search-radius: 16
      leaf-search-radius: 6
      include-leaves: false
      natural-leaves-only: true
      require-natural-leaves: true
      abort-when-log-limit-reached: true
      sound: entity.zombie.break_wooden_door
      volume: 0.45
      pitch: 1.25
```

| Key | Default | |
|---|---|---|
| `minimum-logs` | `2` | A connected group smaller than this is not treated as a tree. Must be ≥ 1. |
| `max-logs` | `256` | Ceiling on logs in one fell. Must be ≥ `minimum-logs` and ≤ 4096. |
| `max-leaves` | `1024` | Ceiling on leaves. `0` means no leaves at all. Range 0–8192. |
| `log-search-radius` | `16` | How far from the broken log the trunk search may reach, per axis. Range 1–64. |
| `leaf-search-radius` | `6` | How far a leaf may sit from the nearest felled log and still count. Range 1–8. |
| `include-leaves` | `false` | Leaves are left to vanilla decay. `true` removes them as part of the same job. |
| `natural-leaves-only` | `true` | Skip player-placed (persistent) leaves. |
| `require-natural-leaves` | `true` | Refuse to fell a trunk that has no natural leaves near it. |
| `abort-when-log-limit-reached` | `true` | See [The log limit](#the-log-limit). |
| `sound` | `entity.zombie.break_wooden_door` | Played to the user when the fell starts. Empty plays nothing. |
| `volume` | `0.45` | Must not be negative. |
| `pitch` | `1.25` | Must be between 0.5 and 2.0. |

> **`sound` is a resource key, not a Bukkit constant.** `entity.zombie.break_wooden_door`, not `ENTITY_ZOMBIE_BREAK_WOODEN_DOOR`. An unrecognised name plays nothing, silently.

## What counts as a log

A block is a log if its material name ends in `_LOG`, `_WOOD`, `_STEM` or `_HYPHAE`, or is one of `MANGROVE_ROOTS`, `MUDDY_MANGROVE_ROOTS`, `BAMBOO_BLOCK`, `STRIPPED_BAMBOO_BLOCK`.

Every log belongs to a **family**, derived by dropping any `stripped_` prefix and the suffix: `OAK_LOG`, `STRIPPED_OAK_WOOD` and `OAK_WOOD` are all family `oak`; `CRIMSON_STEM` is `crimson`; `MANGROVE_ROOTS` is `mangrove`.

The trunk search only follows blocks of the **same family as the block you broke**. That is what stops an oak crown from dragging a neighbouring birch into the same job.

## What counts as a leaf of that tree

A leaf must clear four tests:

1. Its material is `<family>_LEAVES`. `AZALEA_LEAVES` and `FLOWERING_AZALEA_LEAVES` count as family `oak`, because vanilla azalea trees grow oak logs.
2. It is not persistent, when `natural-leaves-only: true`. Player-placed leaves are left alone.
3. It sits within `leaf-search-radius` (Chebyshev distance) of one of the logs about to be felled.
4. **No same-family log outside this tree sits at the same distance or closer.** If another trunk has an equal claim on the leaf, it is skipped.

Rule 4 is what keeps a fell from stripping the neighbour's crown in a dense forest. Ties are skipped rather than split, which is deliberately conservative where two canopies touch — you will sometimes leave a few leaves behind, and you will never eat somebody else's tree.

## The sequence

1. A `BlockBreakEvent` fires on a log while the player holds a `TIMBER` tool in the **main hand**.
2. Access is checked. See [When the break itself is cancelled](#when-the-break-itself-is-cancelled).
3. The connected trunk is scanned, breadth-first through all 26 neighbours, bounded by `log-search-radius` per axis and stopping at chunk boundaries that are not loaded.
4. The result is validated against `minimum-logs`, `max-logs` and `require-natural-leaves`.
5. Leaves are collected, if enabled.
6. Logs and leaves are each ordered **top down**, so a tree falls from the crown rather than from under itself.
7. One tick later the origin block is re-checked. If it is still the same log — meaning some other plugin cancelled the player's break — nothing further happens.
8. Otherwise the job is submitted, one use is spent, and the sound plays.

The block the player broke is not part of the job; they broke it themselves. It is counted in the summary, which is why the completion message reads one higher than the queued log count:

```
Felled 41 logs and cleared 180 leaves.
```

## The log limit

When the trunk scan reaches `max-logs`, `abort-when-log-limit-reached` decides what happens:

| Value | Behaviour |
|---|---|
| `true` (default) | Nothing extra is broken at all. The player is told `tool.timber-limit` and only the block they hit comes down. |
| `false` | The first `max-logs` blocks found are felled and the rest of the structure is left standing. |

`true` is the safe setting for a survival server. A player who builds a 3 000-block wooden wall and taps it with the axe gets a refusal, not a partially demolished wall.

## When the break itself is cancelled

Access failures are not all treated the same way, and the difference is worth knowing before you hand a `TIMBER` tool out:

| Situation | The log you hit | The fell |
|---|---|---|
| Everything fine | breaks | runs |
| Tool **expired** | breaks | refused, with `tool.expired` |
| Missing `use-permission` | **cancelled** | refused, with `tool.no-use-permission` |
| World not allowed | **cancelled** | refused, with `tool.wrong-world` |
| Definition `enabled: false` | **cancelled** | refused, with `tool.no-use-permission` |
| Not a natural tree | breaks | not attempted, with `tool.timber-not-natural` |
| Over `max-logs`, aborting | breaks | refused, with `tool.timber-limit` |

So a player holding a `TIMBER` axe they are not allowed to use, or standing in a blacklisted world, cannot break logs **at all** while it is in their main hand. This is worth stating in your own server rules, because it looks like a bug from the player's side. Two ways to avoid it:

- Leave `use-permission` as the default `oberontools.use`, which is `default: true`, so nobody who can hold the axe is missing it.
- Prefer `enabled: false` on a definition you are retiring only when nobody still has the item, or accept that holders can no longer chop wood with it.

## Chatty refusals

`tool.timber-not-natural` fires on **every** log break that does not qualify — a single placed log, a wooden wall, a 1-block stump. With a `TIMBER` axe as somebody's everyday tool that is a lot of chat.

`messages.yml` is the answer. Either reword it, blank it (`timber-not-natural: ""`), or move it off the chat channel with a `Presentation` override:

```yaml
Presentation:
  Overrides:
    tool.timber-not-natural:
      Channel: ACTION_BAR
```

## Sizing it

**Survival, everyday axe:**

```yaml
    timber:
      minimum-logs: 2
      max-logs: 256
      max-leaves: 1024
      log-search-radius: 16
      leaf-search-radius: 6
      require-natural-leaves: true
      abort-when-log-limit-reached: true
```

**Trunk only, no leaf clearing, for a server that wants the crown to decay naturally:**

```yaml
    timber:
      include-leaves: false
      max-leaves: 0
```

**Jungle-safe, for very large trees:**

```yaml
    timber:
      max-logs: 1024
      max-leaves: 4096
      log-search-radius: 32
```

A 1 024-log jungle giant with 4 096 leaves is 5 120 block attempts. At the shipped budget of 96 per tick that is roughly 53 ticks — under three seconds, spread evenly, with no spike. Sizing the tool up costs time, not headroom.
