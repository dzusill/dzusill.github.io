---
title: "Teleports"
description: "The full suite, what the override variants actually do, /tptoggle, /back, and the two checks every teleport goes through."
---

## The commands

| Command | Does | Overrides `/tptoggle` |
|---|---|---|
| `/tp <player>` | you go to them | only with the override permission |
| `/tp <a> <b>` | moves `a` to `b` | same |
| `/tpo <player>` `/tpo <a> <b>` | same, but always | **yes** |
| `/tphere <player>` (`/s`) | brings them to you | only with the override permission |
| `/tpohere <player>` | same, but always | **yes** |
| `/tptoggle` | refuse incoming teleports | — |
| `/back` | return to where you were | — |

## What the override variants are for

In the old script `/tpo` and `/tpohere` were **byte-identical copies** of `/tp` and `/tphere`. The "o" meant nothing, so a staff member with `/tptoggle` on was unreachable by anybody, including an owner.

Here, override is a flag on one implementation. Two ways to get it:

1. Use `/tpo` or `/tpohere`.
2. Hold `Teleport.Override-Permission` (default `oberonstaff.teleport.override`), which grants the same effect on the plain commands.

`/s` is now an **alias** of `/tphere` rather than a third copy of the same code — the old script had three identical copies, so a fix to one silently missed the others.

## Every teleport is checked twice

**1. Can you see them?**

If the target is vanished above your level, the teleport is refused with **"This player is not online"** — the same message a genuinely offline player gets. A distinct "you cannot see them" would confirm that somebody invisible is on the server, which is the one thing vanish exists to prevent.

**2. Do they accept teleports?**

If they have `/tptoggle` on and you are not overriding, the teleport is refused with "Teleport denied."

### Both players, not just one

`/tp <a> <b>` checks **both**. The old script only checked `a`, which meant the destination's vanish was ignored — and that is a way to probe whether a hidden staff member is online, by watching whether the teleport succeeds.

## `/tptoggle`

Refuses incoming teleports. Anyone with the override permission, and anyone using `/tpo`, gets through anyway — this stops a colleague dropping in mid-build, not an admin who needs to reach somebody.

The setting is keyed by UUID and stored, so it survives a rename and a restart. The old script kept it in memory keyed by name and lost both.

## `/back`

Returns you to where you were before your last teleport.

```yaml
Teleport:
  Back:
    Enabled: true
    Record-Deaths: true
```

`Record-Deaths` also records where you died, so `/back` returns you to your body. The death location is captured at `MONITOR` priority — after every other plugin has had its say about the death — so it is the location you actually died at.

> `/back` locations live in memory and are dropped when you disconnect. There is no cross-restart history: a coordinate from a previous server session is more likely to be wrong than useful.

## Sounds

```yaml
  Sound:
    Enabled: true
    Name: "entity.enderman.teleport"
    Volume: 1.0
    Pitch: 1.0
    Silent-When-Vanished: true
```

Played **at the destination**, not to the moved player alone — so everybody standing there hears it. That is on purpose: `/tphere` moves somebody *else*, and anchored to the moved player the only person who heard anything would be the one who had just been yanked across the map, while the staff member who ran the command — standing right there, watching them appear — heard nothing. It reads exactly like a sound that does not work.

`Name` is any namespaced sound key; one this server does not have is silent rather than an error.

### Silent-When-Vanished

The same property that makes the sound useful makes it a problem when the teleport is meant to be hidden. A vanished staff member arriving beside a player sets off an enderman noise next to somebody who can see nobody — which gives away more than presence: it says *where*, and *when*.

With this on (the default), the sound is skipped when **either** player is vanished:

| | |
|---|---|
| `/tp <player>` — vanished staff goes to a player | silent |
| `/tphere <player>` — vanished staff pulls a player to them | silent |
| `/back` while vanished | silent |
| any teleport between two visible players | **unchanged** |

Both ends are checked, not only the player who moved. `/tphere` is the case that is easy to miss: the player who moved is perfectly visible, but the sound lands where the *vanished* staff member is standing.

Set it to `false` only if your staff never teleport while vanished — it restores the old behaviour exactly.

## Folia

Teleports go through DzusillCore's Folia-aware scheduler. On a regionised server a plain `setLocation` would fail; here it is dispatched correctly whichever platform you run.

## Renaming or disabling

Every command's name, aliases and permission are in `config.yml` under `Commands`, and any of them can be switched off:

```yaml
Commands:
  tp:   { Enabled: false }
  back: { Enabled: false }
```

That matters when EssentialsX already provides them — two plugins registering the same command means load order decides which wins.

Changing any of this needs a **restart**; commands are written into the server's command map at startup.
