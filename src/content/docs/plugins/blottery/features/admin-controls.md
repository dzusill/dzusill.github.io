---
title: "Admin Controls"
description: "Two commands, both for when a round needs intervention."
---

Two commands, both for when a round needs intervention.

---

## Force a draw

```
/lot shuffle
```

Requires `blottery.shuffle`.

Draws immediately instead of waiting for the timer. `minPlayers` still applies — forcing a draw on a round with one participant produces a `TOO_FEW_PLAYERS` result, not a winner.

Use it for:

- an event where the draw should land at a specific moment
- ending a round before a scheduled restart
- testing on a staging server

## Reset and refund

```
/lot reset
```

Requires `blottery.reset`.

Cancels the current round and **refunds every ticket**. Nobody loses money and no winner is picked.

Use it for:

- a misconfigured `ticketPrice` discovered mid-round
- an economy plugin failure that charged people incorrectly
- any round you would rather did not have happened

This is the safe escape hatch. Reaching for `/lot shuffle` to "get it over with" pays somebody out; `reset` does not.

## Admin help

```
/lot admin
```

Requires `blottery.admin`. Lists the admin commands. Holding `blottery.admin` alone does **not** grant shuffle or reset — those are separate permissions, so a helper can see the commands without being able to move money.

```
lp group mod   permission set blottery.admin true
lp group admin permission set blottery.shuffle true
lp group admin permission set blottery.reset true
```

## What is not exposed

There is no command to set the pot, pick a winner, or hand a payout to a specific player. That is deliberate: a lottery whose operators can choose the outcome is not a lottery, and the absence of the command is what lets you say so honestly.

## Next

- [settings.yml](/plugins/blottery/configuration/settings/)
