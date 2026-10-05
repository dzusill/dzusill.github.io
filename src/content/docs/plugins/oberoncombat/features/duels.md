---
title: "Duels-Shyam"
description: "OberonCombat works with Duels-Shyam 1.0.4 (package com.shyamsai.duelsshyam). It is a different plugin from"
---

OberonCombat works with **Duels-Shyam 1.0.4** (package `com.shyamsai.duelsshyam`). It is a different plugin from
ShyamDuels 2.0, which is not supported.

## What it does

- **Fighters are tagged by each other only.** Nobody outside a duel can tag a fighter, and a fighter cannot tag anyone outside.
  A free-for-all or team duel counts the same as a regular one.
- **No money, no experience, no lightning in a duel**, so a duel never steals from the winner's wager. Set
  `integrations.duels-shyam.steal-and-effects-in-duel: true` to allow them.
- **Untag when a duel ends** (`untag-on-duel-end`).
- **No combat log** for a player in a duel: Duels handles disconnects.
- **PvP is always on** for fighters, whatever their [`/pvp`](/plugins/oberoncombat/features/pvp-toggle/) says.
- A fighter still counts as in a duel for **five seconds** after the session closes, and while standing in an arena world,
  because Duels may close the session before the death event reaches OberonCombat.

## Setting up

In `plugins/Duels-Shyam/config.yml`:

```yaml
hooks:
  pvpmanager: false
```

Duels-Shyam used to ask PvPManager to untag fighters and refuse outside tags; OberonCombat does both through Duels' own API.

```yaml
integrations:
  duels-shyam:
    enabled: true
    tag-in-duel: true
    untag-on-duel-end: true
    steal-and-effects-in-duel: false
    arena-worlds: auto
```

`arena-worlds: auto` reads the `world:` of every `plugins/Duels-Shyam/arenas/*.yml`; or list worlds yourself:
`[abyssal, hellscape]`.

## Startup

Duels may enable before it has registered its API, so the hook tries five times, two seconds apart. If it never works, the
console says so, and duel fights are tagged like any other until it is fixed. `/oberoncombat status` shows whether
Duels-Shyam was found.

## Open question

Whether Duels-Shyam 1.0.4 fires a real death event for a duel death is checked on a live server
([Testing](/plugins/oberoncombat/developing/testing/)). The integration does not depend on the answer.
