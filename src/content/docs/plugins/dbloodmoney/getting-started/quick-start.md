---
title: "Quick Start"
description: "Get dBloodMoney running in five minutes."
---

Get dBloodMoney running in five minutes.

## 1. Install

Make sure **DzusillCore**, **Vault** and an **economy plugin** are in `plugins/`, then add `dBloodMoney-PRO.jar` (or `dBloodMoney.jar`). See [Installation](/plugins/dbloodmoney/getting-started/installation/).

## 2. Start the server

Watch for the startup banner showing `(FREE)` or `(PRO)`.

## 3. Try a kill

With the default config (50% steal):

1. Give two players money — e.g. `/eco give Alice 1000` and `/eco give Bob 1000`.
2. Have **Alice** kill **Bob** in a PvP-enabled world.
3. Alice sees:
   > **[dBloodMoney]** You killed **Bob** and looted **$500**!
4. Bob sees:
   > **[dBloodMoney]** **Alice** killed you and looted **$500**.

Bob's balance drops by 500; Alice's rises by 500.

## 4. Tune the steal rate

Open `plugins/dBloodMoney/config.yml`:

```yaml
Steal:
  Percent: 50.0          # take 50% of the victim's balance
  Min-Victim-Balance: 10.0
  Max-Per-Kill: 0.0      # 0 = no cap
  Server-Tax-Percent: 0.0
```

Change `Percent`, then apply without a restart:

```
/dbm reload
```

## 5. Protect spawn

Stop stealing in your hub/spawn world:

```yaml
Safezone:
  Mode: BLACKLIST
  Worlds:
    - spawn
    - lobby
```

`/dbm reload` to apply (safezone changes need a restart — see [Reloading](/plugins/dbloodmoney/configuration/reloading/)).

## Where to go next

| You want to… | Page |
|---|---|
| Understand the steal math | [Kill Rewards](/plugins/dbloodmoney/features/kill-rewards/) |
| Stop alt/friend farming | [Anti-Farm](/plugins/dbloodmoney/features/anti-farm/) |
| Punish combat loggers | [Combat Tagging](/plugins/dbloodmoney/features/combat-tagging/) |
| Let players post bounties (PRO) | [Bounties](/plugins/dbloodmoney/features/bounties/) |
| Add a leaderboard (PRO) | [Leaderboards](/plugins/dbloodmoney/features/leaderboards/) |
| See every setting | [config.yml](/plugins/dbloodmoney/configuration/config/) |
