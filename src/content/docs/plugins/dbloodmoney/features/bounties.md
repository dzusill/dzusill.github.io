---
title: "Bounties (PRO)"
description: "Players put a price on each other's heads. Whoever kills the target collects the whole pot — on top of the normal steal."
---

> **PRO feature.** Requires `dBloodMoney-PRO.jar`.

Players put a price on each other's heads. Whoever kills the target collects the whole pot — on top of the normal steal.

## Commands

| Command | Permission | Description |
|---|---|---|
| `/bounty add <player> <amount>` | `dbloodmoney.bounty.place` | Place (or add to) a bounty on a player. |
| `/bounty list` | `dbloodmoney.bounty.list` | Show the biggest active bounties. |
| `/bounty` | `dbloodmoney.bounty.list` | Same as `/bounty list`. |
| `/bounty remove <player>` | `dbloodmoney.bounty.others` | Admin: clear a player's bounty. |

## How it works

1. **Place** — `/bounty add Bob 500` charges **you** $500 (taken from your balance) and adds it to Bob's pot.
2. **Stack** — anyone can add more; bounties from many players pool into one total. `/bounty add Bob 250` again → Bob's bounty is now $750.
3. **Collect** — when Bob is killed, the killer is paid the **entire** $750 instantly, with a message:
   > **[dBloodMoney]** You claimed a **$750** bounty for killing **Bob**!
4. **Cleared** — Bob's bounty resets to nothing until someone places a new one.

New bounties are announced server-wide (if `Broadcast: true`):

> **[dBloodMoney]** **Alice** placed a **$500** bounty on **Bob**!

## Configuration

```yaml
Pro:
  Bounty:
    Enabled: true
    Min: 50.0
    Max: 1000000.0
    Allow-Self: false
    Broadcast: true
```

| Key | Description |
|---|---|
| `Enabled` | Toggle the whole bounty system. |
| `Min` | Smallest amount per `/bounty add`. |
| `Max` | Largest amount per `/bounty add`. |
| `Allow-Self` | Allow placing a bounty on yourself. |
| `Broadcast` | Announce new bounties. |

## Storage

Bounties survive restarts. They are saved to `bounties.yml`, or to the `dbloodmoney_bounties` table if you enabled a [database](/plugins/dbloodmoney/configuration/database/).

## Notes

- `/bounty remove` is an **admin** action and does **not** refund contributors — it simply clears the pot. Use it for moderation.
- The bounty payout is funded by the placers' money (already collected at placement), so it doesn't inflate the economy.
- A bounty is only collected on a **valid** kill — the same safezone, anti-farm and economy rules as a normal steal apply.
