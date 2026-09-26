---
title: "sounds.yml"
description: "Every sound the plugin plays is referenced by an alias, never by a raw sound key. Retune a sound in"
---

Every sound the plugin plays is referenced by an alias, never by a raw sound key. Retune a sound in
one place and every caller follows.

```yaml
enabled: true

sounds:
  land:
    sound: entity.generic.explode
    volume: 0.9
    pitch: 1.2
```

`sound` is a plain resource key, so anything the server knows works — including sounds from your
resource pack.

## The shipped aliases

| Alias | Played when |
|---|---|
| `announce` | A drop is announced |
| `descent` | Once a second while the crate is falling, to players nearby |
| `land` | Impact |
| `unlock` | The countdown ends |
| `open` | Somebody opens the crate |
| `loot` | Somebody pulls something out of it |
| `close` | The crate is removed |
| `click` | Menu interaction |
| `error` | A refused action, such as opening a locked crate |
| `announce_legendary`, `land_legendary`, `unlock_legendary` | Louder, lower variants the legendary tier points at |

## Per-tier overrides

A tier can point an event at a different alias, which is how a rare crate is made to *sound* rare:

```yaml
# tiers.yml
legendary:
  sounds:
    announce: announce_legendary
    land: land_legendary
    unlock: unlock_legendary
```

An event with no override uses the alias of the same name.

## Silencing

Three levels, all supported:

- `enabled: false` — the whole plugin goes quiet
- a blank `sound:` on one alias — that event only
- `notifications.sound: false` in `config.yml` — the announcement sounds only, leaving the local ones

An unknown alias is silence rather than an error. Muting one event must not need a code change or
produce console spam on every drop.

## Where announcement sounds are played

At each listener's own position rather than at the crate. An announcement everyone is meant to hear
must not fade out with distance from a drop nobody has reached yet. The descent and open sounds are
positional on purpose — those are meant to tell you the crate is *there*.
