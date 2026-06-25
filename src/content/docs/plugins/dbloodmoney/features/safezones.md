---
title: "Safezones"
description: "Control where stealing is allowed, so players can't be robbed at spawn, in a hub, or in protected worlds."
---

Control **where** stealing is allowed, so players can't be robbed at spawn, in a hub, or in protected worlds.

```yaml
Safezone:
  Mode: BLACKLIST
  Worlds: []
```

## Modes

| Mode | Meaning |
|---|---|
| `BLACKLIST` | Stealing works everywhere **except** the listed worlds. |
| `WHITELIST` | Stealing works **only** in the listed worlds. |

## Examples

**Disable stealing in spawn and lobby** (everywhere else is fair game):

```yaml
Safezone:
  Mode: BLACKLIST
  Worlds:
    - spawn
    - lobby
```

**Only allow stealing in a dedicated PvP world:**

```yaml
Safezone:
  Mode: WHITELIST
  Worlds:
    - kitpvp_arena
```

World names must match the folder name of the world (what you see in `/mv list` or your `bukkit.yml`), case-insensitive.

> Safezone rules are read once on enable — change them and **restart**.

## What "blocked" means

In a safezone, a kill simply pays **nothing** — the fight still happens, the victim keeps their money. No message is shown by default (so it's silent for players who don't expect a reward there).

## WorldGuard regions

> **Not yet supported.** Safezones are currently **per-world**. Region-level control (e.g. a WorldGuard PvP-deny flag inside a survival world) is on the roadmap. For now, separate your safe areas into their own worlds, or pair dBloodMoney with a region plugin that cancels PvP — a cancelled hit deals no damage, so no kill (and no steal) occurs.
