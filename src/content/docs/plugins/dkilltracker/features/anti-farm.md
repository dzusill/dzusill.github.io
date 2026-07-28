---
title: "Anti-Farm Protection"
description: "Kill counting is the most farm-prone mechanic there is. Give players a rank at 25 kills and within an hour someone will have two accounts open, killing one…"
---

Kill counting is the most farm-prone mechanic there is. Give players a rank at 25 kills and within an hour someone will have two accounts open, killing one with the other in a loop. dKillTracker ships four protections, all on by default.

## 1. Same-victim cooldown

The main one. After Alice kills Bob, killing Bob **again** doesn't count until the cooldown expires. They can keep fighting — it just doesn't move Alice's total.

```yaml
Anti-Farm:
  Enabled: true
  Cooldown-Seconds: 600     # 10 minutes
```

- The window is **per killer → victim pair**. Alice killing Carol is unaffected, and Bob killing Alice back is a separate pair too — getting revenge is not farming.
- `Cooldown-Seconds: 0` disables the window entirely.
- Changes apply **immediately** on `/killtracker reload` — the cooldown length is read fresh on every kill.

The killer is told why it didn't count:

```
[KillTracker] You already killed Bob recently, so this kill did not count. (7m 12s left)
```

Turn that off with `Notify-On-Suppress: false` if you'd rather not advertise the mechanic.

### Memory

```yaml
Anti-Farm:
  Max-Tracked-Pairs: 50000
```

Remembered pairs are capped and self-evicting — expired entries are swept periodically and the oldest quarter is dropped whenever the cap is exceeded. 50 000 is far more than a busy server produces inside any realistic window; there is no reason to raise it, and no leak if you don't.

## 2. Same-IP alt detection

Blocks the classic two-accounts-one-connection farm.

```yaml
Same-IP:
  Block: true
```

When killer and victim connect from the same IP address, the kill doesn't count.

> Players legitimately sharing a connection — siblings, flatmates, a LAN café — are caught too. Either turn it off globally, or grant those specific players `killtracker.bypass.sameip`.

On a network behind a proxy (BungeeCord, Velocity) every player may appear to share the proxy's IP. If you see *every* kill suppressed, that's why — enable IP forwarding on the proxy, or set `Block: false`.

## 3. World safezones

Kills in excluded worlds never count — see [Kill Tracking](/plugins/dkilltracker/features/kill-tracking/#where-kills-count).

```yaml
Tracking:
  Worlds:
    Mode: BLACKLIST
    List: [ "spawn", "hub" ]
```

## 4. Exempt victims

Give a player `killtracker.bypass.victim` and killing them never counts for anyone. Useful for staff who get hunted, or for NPC-like accounts.

## What "suppressed" actually means

A suppressed kill is not ignored — it is recorded as a **lifetime** kill:

```yaml
Anti-Farm:
  Count-Toward-Lifetime: true
```

So a farmer's `%killtracker_lifetime_kills%` climbs while `%killtracker_kills%` stays flat. That gap is your evidence. Set it to `false` if you'd rather suppressed kills leave no trace.

The victim's death **always** counts, farmed or not.

## Bypass permissions

| Permission | Effect | Default |
|---|---|---|
| `killtracker.bypass.antifarm` | Killer skips every anti-farm gate — kills always count. | op |
| `killtracker.bypass.sameip` | Kills count even when sharing an IP with the victim. | nobody |
| `killtracker.bypass.victim` | Killing this player never counts. **Not** part of `killtracker.*`. | nobody |

`bypass.victim` is deliberately left out of the `killtracker.*` umbrella — otherwise every op would silently become un-killable for tracking purposes, which is not what anyone expects. Grant it explicitly.

> `killtracker.bypass.antifarm` defaults to **op**. On a server where admins play normally, take it away — it makes their kills unfarmable-checked, which is fine for testing and misleading in a leaderboard.

## Recommended settings

**Public PvP / factions server:**

```yaml
Anti-Farm:
  Enabled: true
  Cooldown-Seconds: 900        # 15 min
  Count-Toward-Lifetime: true
Same-IP:
  Block: true
```

**Arena / KitPvP where fast repeat fights are the point:**

```yaml
Anti-Farm:
  Enabled: true
  Cooldown-Seconds: 120        # 2 min — still stops a loop, allows real rematches
Same-IP:
  Block: true
```

**Small private server where everyone knows everyone:**

```yaml
Anti-Farm:
  Enabled: false
Same-IP:
  Block: false
```
