---
title: "The drop lifecycle"
description: "Every drop passes through the same four phases. Each one is a stage you control, not a hardcoded"
---

Every drop passes through the same four phases. Each one is a stage you control, not a hardcoded
behaviour — set a duration to zero and that phase is skipped, which is how the same plugin runs both
a slow telegraphed weekly event and an instant smash-and-grab.

## 1. Inbound

The drop is announced and, if the descent is enabled, a crate becomes visible falling from the sky on
a particle trail.

```yaml
phases:
  announce-lead-seconds: 8
  descent:
    enabled: true
    height: 45
    blocks-per-second: 14
```

Time from announcement to impact is `announce-lead-seconds` plus `height / blocks-per-second`. With
the defaults that is about eleven seconds — enough for players to look up, not enough for anyone to
already be standing on the landing site.

There is no crate block yet. Nothing can be broken, opened or camped in this phase.

## 2. Locked

The crate lands. A real container is placed and filled with the rolled loot, an impact effect fires,
the beam and hologram appear, and a boss bar counts the crate down for everyone online.

```yaml
phases:
  unlock-seconds: 120
```

The crate cannot be opened. A player who tries is told how long is left.

A tier can override this — a legendary crate is worth making the whole server converge on:

```yaml
# tiers.yml
legendary:
  unlock-seconds: 180
```

Setting `unlock-seconds: 0` skips this phase entirely: the crate is lootable the moment it lands, and
whoever was nearest wins.

## 3. Open

The countdown ends and the crate becomes an ordinary container.

**There is no owner.** Anyone can open it, anyone can take from it, and nobody is refused. The first
player to open it is recorded and announced — that is a line in chat and a row on the leaderboard, not
a lock. If a tier defines `commands`, they run for that first opener.

This is the deliberate difference from a crate plugin. Locking a crate to whoever touched it first
turns a server-wide event into a footrace that is over before it can be contested; leaving it open
keeps the fight going for as long as there is loot inside, which is where the value of the feature
is.

## 4. Closed

The drop ends in one of three ways:

| Ending | Trigger |
|---|---|
| Emptied | The last item is taken, and `phases.despawn-when-empty` is on |
| Expired | `phases.despawn-seconds` passes with loot still inside |
| Cleared | Staff ran `/supplydrop clear`, or the plugin shut down |

Everything the drop created is removed: the crate block, its remaining contents, the hologram, the
beam and the boss bar.

## What cannot happen to an active crate

While a drop is live, `crate.protect` (on by default) blocks every route to its contents that is not
the front door:

- Breaking it
- Blowing it up, block or entity explosion
- Pushing it with a piston
- Burning it, or washing it away with liquid
- Draining it into a hopper
- Placing a chest against it to form a double chest and looting through your own block

A crate that would have landed next to an existing chest is placed as a barrel instead, since a
barrel cannot merge with anything.

## After a crash

Crate positions are written to `active-drops.yml` as they land, and every entity and container the
plugin creates is tagged with its own persistent-data key. On the next startup both lists are swept:
tagged leftovers are removed, and anything untagged is left alone. A player's chest that happens to
stand where a crate once did is never touched.
