---
title: "Nearby & Everyone"
description: "Two broadcast mentions with very different blast radii — and correspondingly different permission advice."
---

Two broadcast mentions with very different blast radii — and correspondingly different permission advice.

---

## @nearby

```yaml
nearby:
  enabled: true
  permission: "dmentions.mention.nearby"
  sound: "entity.chicken.egg"
  color: "#ea79b8"
  keyword: "@nearby"
  display: "@nearby"
  cooldown: 10
  radius: 20
```

Pings every player within `radius` blocks **in the same world**. Default 20 — roughly a build site, not a region.

Safe to leave on for everyone: the audience is bounded by geography, so it cannot reach players who are not already near the sender.

Useful radii:

| Radius | Reaches |
|---|---|
| 10 | the same room |
| 20 | a build site (default) |
| 50 | a town square |
| 100+ | effectively a region broadcast — reconsider |

## @everyone

```yaml
everyone:
  enabled: true
  permission: "dmentions.mention.everyone"
  sound: "entity.chicken.egg"
  color: "#8fb56c"
  keyword: "@everyone"
  display: "@everyone"
  cooldown: 10
```

Pings the entire server.

> ⚠️ **Restrict this one.** Left open, it is a one-word spam tool that every player will find within a day.

```
lp group default permission set dmentions.mention.everyone false
lp group mod permission set dmentions.mention.everyone true
```

A longer cooldown helps too — 60 seconds is reasonable even for staff.

## Changing the keywords

Both `keyword` values are configurable:

```yaml
everyone:
  keyword: "@all"
  display: "@all"
```

Change `keyword` and `display` together, or players type one thing and see another.

## Turning one off

```yaml
nearby:
  enabled: false
```

The keyword becomes ordinary text. Nobody is pinged and nothing is highlighted.

## Next

- [Group Mentions](/plugins/dmentions/features/group-mentions/)
