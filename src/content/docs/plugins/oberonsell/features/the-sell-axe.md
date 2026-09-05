---
title: "The Sell Axe"
description: "A timed tool that empties a container straight into the holder's balance."
---

A timed tool that empties a container straight into the holder's balance.

```
/sellaxe give <player> 7d
```

Right-click any container — chest, barrel, shulker, hopper, furnace — and everything sellable inside is
sold. The container does not open.

## Durations

`7d`, `12h`, `30m`, `45s`, or combinations like `1d12h`. A bare number is read as days, so
`/sellaxe give bob 7` is a week.

The axe's lore counts down:

```
ᴅɪᴀᴍᴏɴᴅ ꜱᴇʟʟ ᴀxᴇ
Instantly sells all items in a chest
Self Destruct: 6d 23h 58m
```

It refreshes when the player selects the axe and after each use. Once the time is up the axe is consumed on
the spot — on use, or when they next select it — and they get the `sellaxe.expired` message.

## Where the timer lives

On the **item**, in its persistent data — not in a plugin-side registry keyed by some id. That means:

- it survives restarts,
- it can be traded, dropped, stored in a chest or put in an ender chest,
- it cannot be duplicated into two working copies of one registry entry.

The countdown line is rebuilt from that instant on each refresh rather than edited in place, so no amount
of re-rendering can stack up duplicate lore.

## Two permissions, not one

`oberonsell.sellaxe` is who may **hand out** axes. `oberonsell.sellaxe.use` — off by default — is who
may **swing** one.

Both are needed precisely because of the section above: an axe lives on the item, so it can be traded,
dropped or left in a chest. Gating only the command would leave the axe working for whoever ends up
holding it, and a rank perk that survives being handed to a friend is not a perk.

A player without the second node gets a refusal message (`sellaxe.no_permission`) rather than an axe
that does nothing, which reads as a broken plugin.

## Interaction with the rest of the plugin

- **Worth lore is stripped first**, so a decorated chest sells for exactly the same amount as an
  undecorated one.
- **Multipliers apply** — the holder's permission and category multipliers scale the payout as usual.
- **Blacklisted worlds are respected** — the axe refuses to sell there.
- **Category progress is credited**, so emptying a chest of ores advances the ores ladder.

## Configuration

`sellaxe.yml` — its look, its enchantments and the countdown format. See
[sellaxe.yml](/plugins/oberonsell/configuration/sellaxe/).

Turn the whole feature off with:

```yaml
sellaxe:
  enabled: false
```

The listener is then never registered at all.

## Messages

| Key | When |
|---|---|
| `sellaxe.given` | you gave one out |
| `sellaxe.received` | the recipient gets it |
| `sellaxe.sold` | a successful use — `{price}`, `{amount}` |
| `sellaxe.nothing` | nothing in the container was sellable |
| `sellaxe.expired` | the axe ran out and crumbled |
| `sellaxe.invalid_duration` | the duration argument didn't parse |
| `sellaxe.disabled` | the feature is off |
