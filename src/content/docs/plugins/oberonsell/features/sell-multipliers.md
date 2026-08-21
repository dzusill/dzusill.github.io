---
title: "Sell Multipliers"
description: "Two independent things scale a payout, and they combine by product:"
---

Two independent things scale a payout, and they combine by product:

- a flat multiplier from a **permission** — rank perks,
- the **tier** a player has earned in the item's own category by selling into it.

`pricing.global-multiplier` scales everything on top, for a server-wide double-sell weekend.

## Permission multipliers

```
oberonsell.multiplier.1.5
oberonsell.multiplier.2
```

The highest matching node wins. `multipliers.permission-cap` (default `10.0`) is the ceiling, so a
mistyped node cannot hand out a thousandfold payout. Turn them off with
`multipliers.permission-based: false`.

## Category tiers

Sell 25,000 worth of ores and your **ores** multiplier becomes 1.1×. Keep going and it climbs to 3.0× at
tier 20. Selling crops does nothing for it — each category has its own ladder and its own progress.

```
/sellmultipliers
```

Opens the overview: one icon per category with a progress bar. Click one for its ladder.

Nine categories ship configured — ores, crops, blocks, mob drops, natural items, fish, potions, enchanted
books, armor & tools — each with twenty tiers from 1.1× to 3.0×. Everything about them lives in
`sell/<id>.yml`; see [Sell Categories](/plugins/oberonsell/configuration/sell-categories/) to retune, add or remove one.

## Tiers never go backwards

An unlocked tier is a **high-water mark**. That matters because the ladders are editable:

- Raise a requirement and nobody loses the multiplier they already earned.
- Change a category's patterns so past sales no longer count towards it — same.
- Shorten the ladder and a player above the new top falls back to the best tier that still exists, rather
  than losing their multiplier entirely.

The same guarantee is what stops a rank-up message repeating. A tier is only ever raised, once, so
`notifications.multiplier.rank_up` fires exactly once per level however many sales cross the line.

## The rank-up message

```yaml
notifications:
  multiplier:
    rank_up:
      - "#00F986ʏᴏᴜʀ sᴇʟʟ ᴍᴜʟᴛɪᴘʟɪᴇʀ ʟᴇᴠᴇʟᴇᴅ ᴜᴘ"
      - "&fUnlocked a #00F986{playerMultiplier} &f{category} sell multiplier!"
```

Tokens: `{category}`, `{playerMultiplier}`, `{tier}`. A `rank_up` sound plays alongside it.

One large sale that crosses several tiers announces the **highest** one reached, not each in turn.

## Resetting a player's ladder

```
/oberonsell resetmultiplier <player>            every category they have touched
/oberonsell resetmultiplier <player> ores       just that category
/oberonsell resetmultiplier <player> all        the same as omitting it
```

Requires `oberonsell.admin`, and works on an offline player.

A reset is **not** a punishment. It wipes the money sold and drops the tier back to 0, but it **banks the
multiplier the player had** as a permanent floor on that category — so the payout does not fall, and
climbing the ladder again leaves them strictly higher than before.

```yaml
multipliers:
  reset:
    enabled: true
    keep-fraction: 1.0   # how much of the earned multiplier is banked
    max-bonus: 0.0       # ceiling on the banked bonus; 0 = none
```

| `keep-fraction` | Reset at 1.3× | After re-climbing to tier 3 |
|---|---|---|
| `1.0` (default) | still 1.3× | 1.6× |
| `0.5` | 1.15× | 1.45× |
| `0.0` | 1.0× — a plain wipe | 1.3× |

At the default, a reset can never leave a player worse off; lower the fraction if you want it to cost
something. `max-bonus` caps how far repeated resets can compound.

The banked bonus is **additive** on top of the tier multiplier and is stored per category, so resetting
`ores` never touches `crops`.

## Turning it all off

```yaml
multipliers:
  enabled: false
```

No credit is tracked and no tier scales a payout. Permission multipliers are separate and keep working
unless you also set `permission-based: false`.

## Where a player's progress lives

`playerdata.yml`, per player, per category: money sold and the tier unlocked. Records are held in memory
and flushed every 2½ minutes, on quit, and on shutdown — so a busy sell GUI does not hit the disk on every
transaction.
