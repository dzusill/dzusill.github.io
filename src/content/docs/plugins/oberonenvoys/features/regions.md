---
title: "WorldGuard regions"
description: "Optional. Filters landing sites by the protected regions covering them, so drops land where you want"
---

Optional. Filters landing sites by the protected regions covering them, so drops land where you want
them and nowhere else.

Needs WorldGuard installed. With the plugin absent, enabling this logs one warning and everything
behaves as if the feature were off — nothing breaks and no class from WorldGuard is ever loaded.

## The two lists

```yaml
placement:
  regions:
    enabled: true
    whitelist: [ "pvpzone" ]
    blacklist: [ "spawn" ]
```

| List | Effect |
|---|---|
| `whitelist` | A site must be inside at least one of these, **and the search samples inside them**. Empty means anywhere is allowed. |
| `blacklist` | A site inside any of these is rejected. |

## A whitelist drives the search, not just filters it

With a whitelist set, every candidate site is drawn from **inside** the whitelisted regions'
footprints. It is not sampled from the ring around spawn and then checked.

That distinction is the difference between working and not. The default ring (500–2000 blocks
around spawn) covers about 11.8 million columns. A PvP arena 200 blocks a side is 40,000 of them —
0.34%. Throwing 24 darts at the ring and keeping only the ones that land in the arena finds a legal
site in under 8% of cycles, so almost every drop is skipped with *no usable landing site*, and the
config reads as perfectly sensible the whole time. Sampling inside the arena finds one on the first
try.

Two consequences:

- **`placement.min-distance` and `placement.radius` do not apply** while a whitelist is set. A
  whitelist is you saying "here"; making "here" also be 500 blocks from spawn would silently rule
  out an arena next to spawn. Use the blacklist for spawn protection — it still applies.
- **Several whitelisted regions are chosen in proportion to their area**, so one large and one tiny
  region do not each get half the drops.

A polygon region is sampled from its bounding box; a candidate that falls in a corner outside the
actual polygon is rejected as before and costs one attempt, never a wrong site.

This only applies in `RANDOM` mode. In `ZONES` mode the zone already says where to look, and a
whitelist there is a filter on top of it.

## The blacklist wins

This is the reason both lists exist rather than one mode. Regions overlap: a PvP arena that should
get drops very often sits inside a spawn region that must not.

A site covered by **both** lists is **rejected**.

| Where the candidate lands | Result |
|---|---|
| Inside `pvpzone` only | Allowed |
| Inside `pvpzone` **and** `spawn` | Rejected |
| Inside `spawn` only | Rejected |
| Inside neither, with a whitelist set | Rejected |
| Inside neither, with an empty whitelist | Allowed |

That ordering makes the safe answer the default one. Carving an exception out of a protected area is
deliberate work; forgetting to carve it never drops a crate on top of spawn.

## Common setups

**Drops only in the arena, which overlaps spawn**

```yaml
regions:
  enabled: true
  whitelist: [ "pvpzone" ]
  blacklist: [ "spawn" ]
```

**Drops anywhere except protected builds**

```yaml
regions:
  enabled: true
  whitelist: [ ]
  blacklist: [ "spawn", "shops", "warzone-lobby" ]
```

**Drops only inside several arenas**

```yaml
regions:
  enabled: true
  whitelist: [ "pvpzone", "desert-arena", "north-arena" ]
  blacklist: [ "spawn" ]
```

## Details worth knowing

- Names are region ids as WorldGuard knows them, matched **case-insensitively**.
- `__global__` is ignored. It covers every block in the world, so listing it would either change
  nothing or block everything.
- The check runs **last** among the cheap placement rules, so a candidate that fails on height or
  surface never reaches WorldGuard's region index.
- Rules are read once per spawn attempt, so `/envoy reload` takes effect on the next drop with
  nothing to restart.
- If every whitelisted region is also blacklisted, no site can ever be accepted. That is detected and
  logged as a warning on load rather than silently producing a server where drops never appear.
- `/envoy spawn ... here` bypasses this, like every other placement rule. Somebody standing
  where they want the crate has already made the decision.

## Zones versus regions

They solve different halves of the same problem and work together:

| | Does |
|---|---|
| [Drop zones](/plugins/oberonenvoys/features/scheduling-and-zones/) | Chooses **where to look** — the search area a candidate is sampled from |
| Region rules | Decides **whether a candidate is acceptable** once found |

Zones need no other plugin and are created in game. Region rules reuse the areas you have already
drawn in WorldGuard. Using only region rules with a large `radius` works, but the search wastes
attempts on candidates far from any allowed region — pair a zone around the arena with a whitelist on
it and every attempt lands somewhere usable.

## Diagnosing

Turn on `general.debug` and force a drop:

```
/envoy spawn
```

Every rejected candidate is logged with its reason, `blocked by the region rules` among them.
