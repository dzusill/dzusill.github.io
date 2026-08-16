---
title: "Blanking Empty Rows"
description: "This is the feature the plugin was built for."
---

This is the feature the plugin was built for.

## The problem

ExcellentEconomy rebuilds its leaderboard from **every player it has data for**, ranking them by balance. Everyone who has ever joined and never earned anything is still in that list, sitting at the bottom with `0`.

Ask its own expansion for rank 8 on a small server and you get a real name and a real `0`. Ask for rank 30 and you get whatever `OTHER_NO_TOP_ENTRY` says in the language file — often `Nobody`. In chat that is fine. In a menu it is ten rows of clutter.

## The rule

A value is **nothing** when:

- there is no leaderboard entry at that rank, **or**
- the value is at or below `Blanking.Min-Value` (default `0.0`, compared with a `1e-9` tolerance so floating-point dust counts as zero).

When a row is nothing, **every field of that row is nothing**: `top_name`, `top_value`, `top_uuid` and `top_line` all return `Blanking.Text` together. A menu row can never come out half-drawn — a name next to an empty amount, or a decorated line wrapped around nothing.

The same rule decides a player's rank: somebody sitting on zero is treated as unranked, so `%oberonstats_position_coins%` is blank rather than a proud `47th` for an empty wallet.

## Settings

```yaml
Blanking:
  # What "nothing" renders as. "" makes rows collapse completely.
  Text: ""

  # Values at or below this count as nothing.
  Min-Value: 0.0

  # Turn row blanking off entirely and show what ExcellentEconomy ranked.
  Hide-Zero-Rows: true

  # Whether a player's OWN zero blanks too. Off by default.
  Hide-Zero-Value: false

  # What an unranked player's position renders as.
  Unranked-Position: ""
```

### Why `Hide-Zero-Value` is off by default

On a leaderboard, a zero is noise. On a player's own stats screen, a zero is information — "you have 0 coins" is the answer to the question they asked. Turn it on if you would rather show nothing.

### Raising the floor

`Min-Value` is not only for zeros. Set it to `1000` and the leaderboard shows only players who cleared a thousand:

```yaml
Blanking:
  Min-Value: 1000.0
```

`%oberonstats_top_size_<track>%` counts only the rows that survive, so a menu can size itself to what is actually there.

## Keeping numbers for comparisons

Two placeholders deliberately stay numeric so a menu that does arithmetic or conditionals is not handed an empty string:

- `%oberonstats_position_raw_<track>%` → `0` when unranked
- `%oberonstats_top_size_<track>%` → `0` when the leaderboard is empty
