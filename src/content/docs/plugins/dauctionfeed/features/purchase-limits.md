---
title: "Purchase Limits"
description: "Caps how many seeded listings a single player may buy out of one restock."
---

Caps how many seeded listings a single player may buy out of one restock.

```yaml
purchase-limit:
  enabled: true
  per-restock: 3
  permission-bypass: true
```

## Why

Without a cap the restock is a race rather than an event. Whoever is online and rich at 4am takes all fourteen
listings in a few seconds, and everyone else sees an empty auction house all day. The cap is what turns a daily
drop into something the whole server gets a share of.

## What it applies to

**Only this plugin's own listings.** A player who has used up their allowance can still buy freely from other
players — the cap exists to share out the daily drop, not to throttle the auction house.

Recognition is by seller UUID, so it cannot be confused by a player naming themselves after one of your traders.

## The counter

- Counted **per restock**, not per day and not per lifetime. Every restock resets every player to zero.
- Survives a restart: the counters are written to [`data.yml`](/plugins/dauctionfeed/configuration/data/), so a restart mid-day
  does not hand everyone a fresh cap.

## What the player sees

An attempted purchase over the cap is cancelled and they get:

```
[Auctions] You have already bought 3 of this restock's listings. Wait for the next restock.
```

Editable as `purchase-limit-reached` in [messages.yml](/plugins/dauctionfeed/configuration/messages/).

## Bypass

```yaml
permission-bypass: true
```

Players with `dauctionfeed.limit.bypass` ignore the cap. Off by default for everyone, including operators — give
it to staff accounts deliberately, or set `permission-bypass: false` to make the cap absolute.

## Turning it off

```yaml
purchase-limit:
  enabled: false
```

or `per-restock: -1`. Both mean unlimited.

## Placeholders

```
%dauctionfeed_purchase_limit%    3
%dauctionfeed_purchases%         1
%dauctionfeed_purchases_left%    2
```

Useful on a scoreboard during a drop. See [Placeholders](/plugins/dauctionfeed/placeholders/).
