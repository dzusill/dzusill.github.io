---
title: "Auto-Sell"
description: "A priced item is sold the moment an opted-in player picks it up, instead of going into their inventory."
---

A priced item is sold the moment an opted-in player picks it up, instead of going into their inventory.

```
/sell auto        (alias /sell autosell)
```

Toggles it for that player. The setting is stored per account in `playerdata.yml`, so it survives relogs
and restarts.

## What it needs

| | |
|---|---|
| Config | `auto-sell.enabled: true` (the default) |
| Permission | `oberonsell.autosell` — granted to everyone by default |
| Player | opted in with `/sell auto` |

All three have to hold. With `auto-sell.enabled: false` the pickup listener is never registered at all, and
`/sell auto` replies that the feature is unavailable.

The usual gates apply on top: a [disabled game mode](/plugins/oberonsell/features/selling/#blocked-game-modes) or a
[blacklisted world](/plugins/oberonsell/features/selling/#blacklisted-worlds) means nothing is sold, and the pickup happens normally.

## Only what was actually picked up

This is the part worth knowing about. Vanilla does not always hand over the whole stack — on a nearly full
inventory a player picks up part of a pile and the rest stays on the ground. Auto-sell pays for **exactly
the quantity that would have been picked up**, and takes only those units off the item entity:

```
A pile of 40 iron. The player has room for 12.
  → paid for 12
  → 28 stay on the ground as a normal item entity
```

Paying for the whole 40 there would be free money: the player keeps 28 on the ground and picks them up
again.

An item with no price is left alone entirely — it is picked up the ordinary way.

## The stack guard

```yaml
auto-sell:
  max-stack-size: 99
```

A pickup larger than this is ignored rather than sold. It is a guard against a malformed item entity, not a
balance knob; the value is clamped to `1`–`99`.

## Order of operations

The payout happens **before** the pickup is cancelled, and a failed deposit never reaches the cancellation
— so an economy that refuses the transaction leaves the item on the ground rather than deleting it.

The listener runs at `HIGHEST` priority and ignores an already-cancelled pickup, so another plugin that
blocks a pickup wins.

Worth lore is stripped from the entity's stack before it is valued, so an item that picked up a `Worth: $x`
line somewhere sells for exactly what a plain one does.

## Multipliers and progress

An auto-sold item goes through the same payout path as everything else: category tier, permission
multiplier and `pricing.global-multiplier` all apply, the sale is recorded in
[sell history](/plugins/oberonsell/features/sell-history/), it counts towards the player's lifetime total, and it advances that
category's [multiplier ladder](/plugins/oberonsell/features/sell-multipliers/).

## Messages

`auto-sell.sold` is sent after each sale, with `{money}` / `{price}` (the payout) and `{amount}` (units
sold). `auto-sell.enabled`, `auto-sell.disabled` and `auto-sell.unavailable` cover the toggle.

All four keys ship in `messages.yml`. Their chat/action-bar channel — or complete suppression — is
configured through [`Presentation`](/plugins/oberonsell/configuration/config/#presentation).
