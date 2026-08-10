---
title: "Entity Groups"
description: "The #ENEMY, #ANIMAL, #BOSS and other group tokens — what each covers, why they beat a hand-written list, and how exclusions work."
---

`Entities` and `Excluded` take either an entity name or a group token.

```yaml
    Entities:
      - "#ENEMY"
      - IRON_GOLEM
      - BAT
    Excluded:
      - "#BOSS"
      - BREEZE
      - PHANTOM
```

## Why tokens rather than a list

A hand-written mob list goes stale the moment Mojang adds a mob, and it is easy to get wrong. The old script's list missed several hostiles and included iron golems — the tokens exist so you describe what you mean once and it keeps being true.

Tokens are expanded **once, at startup**, into a flat set. Matching at spawn time is a single lookup with no reflection and no `instanceof` chain, which matters because it runs on every mob spawn on the server.

## The tokens

| Token | Covers | Notes |
|---|---|---|
| `#ENEMY` | everything hostile | **The one most servers mean.** Includes slimes, ghasts, magma cubes and hoglins, which are hostile without being Bukkit `Monster`s |
| `#MONSTER` | Bukkit's stricter hostile list | zombies, skeletons, creepers, spiders… but *not* slimes or ghasts |
| `#ANIMAL` | breedable animals | cows, pigs, sheep, horses |
| `#AMBIENT` | bats | |
| `#WATER` | aquatic mobs | squid, fish, dolphins, guardians |
| `#FLYING` | ghasts and phantoms | |
| `#RAIDER` | raid mobs | pillagers, vindicators, ravagers, evokers |
| `#GOLEM` | iron and snow golems | |
| `#BOSS` | ender dragon and wither | |
| `#ALL` | every living entity | |

Case does not matter, and the `#` is optional — `#enemy`, `ENEMY` and `#ENEMY` are the same.

### `#ENEMY` vs `#MONSTER`

This trips people up. Bukkit's `Monster` interface does not include slimes, magma cubes, ghasts or hoglins, even though every player would call all four hostile. `#ENEMY` uses the interface that does.

**Use `#ENEMY` unless you specifically want the narrower list.**

## Entity names

Any Bukkit entity type: `ZOMBIE`, `CREEPER`, `IRON_GOLEM`, `ENDER_DRAGON`. Case does not matter, and the `minecraft:` prefix is accepted:

```yaml
    Entities:
      - zombie
      - minecraft:creeper
      - IRON_GOLEM
```

A name that matches nothing is skipped with a console warning and the rest of the list still works:

```
[OberonMob] Unknown entity or group 'ZOMBI' — skipping it.
```

## Exclusions

`Excluded` is applied **after** groups expand, which is what lets a config say "every hostile mob, except the boss ones":

```yaml
    Entities:
      - "#ENEMY"
    Excluded:
      - "#BOSS"
      - BREEZE
```

Exclusions take the same forms — names or tokens.

## What the shipped `mobs` toggle covers

```yaml
    Entities:
      - "#ENEMY"
      - IRON_GOLEM
      - BAT
      - GLOW_SQUID
    Excluded:
      - "#BOSS"
      - BREEZE
      - PHANTOM
```

This reproduces the old script's list, minus its gaps. Phantoms are excluded because they have their own toggle — leaving them in both would mean `/mob` silently switched off phantoms too.

## Checking your work

```
/oberonmob status
```

The entity count per toggle is the quickest confirmation that a token and its exclusions did what you meant. A number far lower than you expect means a typo; a number far higher means a broader token than you intended.
