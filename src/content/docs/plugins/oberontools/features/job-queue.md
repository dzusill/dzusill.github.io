---
title: "The Job Queue"
description: "Every ability on every tool goes through one queue. There is no per-player queue and no per-tool queue, and that is the whole performance story."
---

Every ability on every tool goes through **one** queue. There is no per-player queue and no per-tool queue, and that is the whole performance story.

```yaml
processing:
  max-block-attempts-per-tick: 96
  max-active-jobs-per-player: 1
  fire-protection-events: true
```

| Key | Default | |
|---|---|---|
| `max-block-attempts-per-tick` | `96` | Total block operations attempted per tick, across the whole server. Range 1–4096. |
| `max-active-jobs-per-player` | `1` | How many jobs one player may have queued at once. Range 1–8. |
| `fire-protection-events` | `true` | Whether each secondary block announces itself as a `BlockBreakEvent`. |

## How a tick is spent

The queue task runs every tick. It spends its budget round-robin:

```
budget = 96
while budget > 0 and the queue is not empty:
    take the job at the front
    do exactly ONE block operation from it
    put it at the back if it has work left, otherwise finish it
    budget -= 1
```

One operation per job per turn is what makes it fair. Three players felling trees at once each get roughly a third of the budget; nobody's 900-block giant makes the other two wait.

Two consequences worth internalising:

- **A bigger job takes more ticks, never a bigger tick.** 343 blocks is not a bigger spike than 27; it is the same spike for longer.
- **The worst tick is bounded by the config value alone.** Not by radius, not by tree size, not by how many players are online. `96` is the number to reason about, and it is the only one.

At 96 attempts per tick the queue drains roughly 1 920 blocks per second. A 5 120-block jungle giant finishes in under three seconds.

### Should I raise it?

Only with a profiler open. Raising it makes large jobs finish sooner *and* makes the worst tick proportionally worse — that is the trade, and there is no setting that avoids it. `96` is a conservative default that survives several simultaneous fells on a busy server.

Lower it if your server is already tight on tick time and players are willing to wait.

## Jobs whose owner leaves

Before each turn the queue checks the owner is still online. An offline owner's job is released immediately: its block claims are dropped, its tool is unfrozen, and no completion message is sent. Death, quit and world change also cancel a player's jobs outright — see [Anti-Duplication](/plugins/oberontools/features/anti-duplication/#what-cancels-a-job-outright).

## Protection events

With `fire-protection-events: true` (the default), **every secondary block** — every extra log, every leaf, every liquid — fires a real `BlockBreakEvent` attributed to the player, before anything is mutated. Three parts of the result are honoured:

| Event result | Effect |
|---|---|
| Cancelled | The block is left alone and is not counted in the summary |
| `setDropItems(false)` | The block is removed without drops |
| `setExpToDrop(n)` | An experience orb of `n` is spawned at the block |

That is what makes WorldGuard, GriefPrevention, Towny, land-claim plugins and logging plugins work without OberonTools knowing anything about them. It is also what lets CoreProtect record a fell.

The plugin marks its own synthetic events so its `TIMBER` listener ignores them — one felled log does not recursively start another fell.

### Turning it off

```yaml
processing:
  fire-protection-events: false
```

This skips the event entirely: every block is allowed, every block drops normally, and no experience is granted from the event path.

> **This disables every protection plugin for secondary blocks at once**, including logging. The block the player broke themselves is still protected — that is a normal vanilla event OberonTools never sees. Only the *extra* blocks become unprotected. On any server with claims, leave it `true`.

The setting is worth having because the event is the expensive part of a block operation. If your server has no protection plugins at all, turning it off is free performance. If it has any, it is a griefing hole.

## Chunk loading

Neither ability loads chunks. Both the liquid planner and the tree scanner check `isChunkLoaded` and skip anything outside loaded chunks:

- A pool that continues into an unloaded chunk is drained up to the boundary.
- A tree whose trunk crosses into an unloaded chunk is felled up to the boundary.
- The leaf-ownership check treats unloaded neighbours as absent, so a leaf near an unloaded chunk is more likely to be taken than left.

In practice a player is standing next to whatever they are working on, so the surrounding chunks are loaded and this is invisible. It matters at render-distance edges and on servers with aggressive chunk unloading.

## Physics and updates

Liquid blocks are set to air **without** a physics update, so a large drain does not cascade neighbour updates through the whole body of water as it goes. Logs and leaves are broken with `breakNaturally`, which produces normal drops and normal updates.

## What is not queued

The block the player broke or clicked themselves is handled by vanilla, in that tick, as normal. Only the *secondary* work — the rest of the tree, the rest of the cube — goes through the queue. That is why a `TIMBER` completion message reads one log higher than the number of blocks the job actually processed.
