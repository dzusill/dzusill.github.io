---
title: "Kill Tracking"
description: "Every player has two numbers:"
---

## Two counters, not one

Every player has two numbers:

| | What it is |
|---|---|
| **Counted kills** (`kills`) | Kills that passed the anti-farm rules. Drives milestones, the leaderboard and `%killtracker_kills%`. |
| **Lifetime kills** (`lifetime_kills`) | Every PvP kill, including the ones suppressed as farming. |

The difference is the point. A player showing **900 lifetime / 40 counted** has been killing the same person over and over — you can see it without reading a single log line. `%killtracker_suppressed_kills%` shows the gap directly.

Suppressed kills feeding the lifetime counter is a toggle:

```yaml
Anti-Farm:
  Count-Toward-Lifetime: true
```

Turn it off and suppressed kills leave no trace at all.

## Who gets credited

Resolution runs in this order:

1. **The server's own killer** — `victim.getKiller()`. Covers melee, and arrows/tridents/snowballs, since Bukkit already resolves a projectile back to its shooter.
2. **The combat tag** — if the server says nobody killed them (lava, fall, void, drowning) but somebody hit them in the last few seconds, that attacker gets the kill. See [Combat Tagging](/plugins/dkilltracker/features/combat-tagging/).
3. **Nobody** — the death is recorded as a death and that's it.

### Projectiles

```yaml
Tracking:
  Count-Projectile-Kills: true
```

On by default. This only affects the *combat tag*: a direct projectile kill is already attributed by the server, so turning this off will not stop bow kills from counting — it stops a bow hit from tagging the victim for the environmental-death fallback.

### Pets

```yaml
Tracking:
  Count-Pet-Kills: false
```

Off by default. When on, a kill by a player's tamed wolf or cat is credited to its owner (owner must be online). It is off by default because on most servers a wolf pack killing someone is not the same achievement as winning a fight.

## Where kills count

```yaml
Tracking:
  Worlds:
    Mode: BLACKLIST
    List: []
```

| Mode | Meaning |
|---|---|
| `BLACKLIST` | Kills count everywhere **except** the listed worlds. |
| `WHITELIST` | Kills count **only** in the listed worlds. |

An empty `List` means "everywhere", whichever mode is set. Typical uses:

```yaml
# Spawn and the hub don't count
Worlds:
  Mode: BLACKLIST
  List: [ "spawn", "hub", "creative" ]
```

```yaml
# Only the arena counts
Worlds:
  Mode: WHITELIST
  List: [ "arena" ]
```

A kill in an excluded world is **not recorded at all** — not even as a lifetime kill. That is different from an anti-farm suppression, which is "this kill happened but was abusive". An excluded world means "this kill didn't happen".

## Killer feedback

```yaml
Tracking:
  Notify-Killer: true
```

After a counted kill the killer sees their new total and how far the next milestone is:

```
[KillTracker] Kill counted - 7 total. (3 to 10)
```

The message is skipped when the kill *also* triggered a milestone — the milestone announcement says everything already. Edit both in [messages.yml](/plugins/dkilltracker/configuration/messages/).

## Deaths

Deaths are counted separately (`%killtracker_deaths%`) and are recorded whether or not the kill counted. Being killed by your own alt still counts as a death for you — only the killer's reward is suppressed.

## Master switch

```yaml
Tracking:
  Enabled: false
```

Nothing is recorded at all. Existing data stays untouched and placeholders keep serving it.
