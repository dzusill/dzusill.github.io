---
title: "rewards.yml"
description: "Named rewards. Milestones, the shutdown bonus, daily first kills, pass tiers and top payouts list them"
---

Named rewards. Milestones, the shutdown bonus, daily first kills, pass tiers and top payouts list them
by name: `rewards: [ stardust-500, ffa-key ]`. A reward that cannot be used is switched off on its own
and the console says why.

```yaml
rewards:
  stardust-500:
    type: COMMAND
    display: "<light_purple>500 Stardust"
    commands:
      - "stardust give %player% 500"
  ffa-keys-2:
    type: COMMAND
    display: "<gold>2 Koth Keys"
    repeat: 2
    commands:
      - "crates givekey %player% koth-crate"
  mace-t1-use:
    type: KIT_USES
    display: "<aqua>1x Mace Tier 1 kit"
    kit: pmace1
    amount: 1
  golden-apples:
    type: ITEM
    display: "<gold>8 Golden Apples"
    item:
      material: GOLDEN_APPLE
      amount: 8
```

| Key | Meaning |
|---|---|
| `type` | `COMMAND`, `ITEM` or `KIT_USES` |
| `display` | What the player reads: `+ {display}`. `{amount}` works |
| `commands` | COMMAND: console commands. `%player%` `%uuid%` `%streak%` `%victim%` `%victim_streak%` `%reward%` `%source%` (and `%position%`, `%board%`, `%value%` for payouts, `%pass%`, `%tier%` for passes) |
| `repeat` | COMMAND: run the whole list this many times (DonutCrates' `givekey` takes no amount) |
| `item` | ITEM: `{ material, amount, name, lore }` or `{ saved: <name> }` (captured with `/ffa admin reward capture <name>`, kept in data.yml) |
| `kit`, `amount` | KIT_USES: the OberonKits kit and how many uses |

- **ITEM** rewards always go to the claim storage — FFA has its own inventory — collected with
  `/ffa claim` outside the arena.
- **KIT_USES** need OberonKits; if it is not enabled the reward is logged and not given. If the player's
  kit data is not loaded yet, the reward waits for the next join.
- A reward earned while offline (a pass auto-claim, a top payout) is given at the next join.

The shipped key rewards open `koth-crate` — a placeholder until the server decides which crate FFA keys
open.
