---
title: "Kill Rewards"
description: "The core mechanic: kill a player, take their money."
---

The core mechanic: kill a player, take their money.

## How a kill is detected

A reward triggers when a player dies and the killer is another player. dBloodMoney credits the killer as:

1. The player who landed the killing blow — **melee or projectile** (arrows, tridents; the shooter is credited automatically).
2. If there is no direct killer (the victim died to lava, fall or fire **while fighting**), the **last player to damage them** within the combat window is credited. See [Combat Tagging](/plugins/dbloodmoney/features/combat-tagging/).

## How much is stolen

```
stolen = victimBalance × (Percent ÷ 100)
stolen = min(stolen, Max-Per-Kill)   # if a cap is set
```

The steal is skipped entirely if the victim's balance is below `Min-Victim-Balance`.

```yaml
Steal:
  Percent: 50.0
  Min-Victim-Balance: 10.0
  Max-Per-Kill: 0.0      # 0 = no cap
  Server-Tax-Percent: 0.0
```

### Worked examples

Victim has **$1,000**:

| Settings | Victim loses | Killer gains |
|---|---|---|
| `Percent: 50`, no cap, no tax | $500 | $500 |
| `Percent: 50`, `Max-Per-Kill: 200` | $200 | $200 |
| `Percent: 50`, `Server-Tax-Percent: 10` | $500 | $450 (server sinks $50) |
| Victim has $5, `Min-Victim-Balance: 10` | $0 | $0 (skipped) |

## Server tax — a money sink

`Server-Tax-Percent` shaves a cut off the **killer's** reward (not the victim's loss). The victim still loses the full stolen amount; the difference is removed from the economy. Great for fighting inflation on busy servers.

## Where bonuses come from (PRO)

PRO features add to the killer's payout **on top** of the steal:

- **Kill streaks** multiply the reward.
- **Bounties** add a flat payout.

These bonuses are funded by the server (minted), so the victim never loses more than the configured percentage. Example with a ×2 streak and a $250 bounty on a $500 base:

```
killer gains = 500 × 2 + 250 = 1250
victim loses = 500
```

## Killer feedback

```yaml
Effects:
  Killer-Sound: ENTITY_PLAYER_LEVELUP
  Title-Enabled: true
```

The killer hears a sound and sees a `+amount` title. Both are optional — set the sound to `''` or `Title-Enabled: false` to silence them. Message text is in [messages.yml](/plugins/dbloodmoney/configuration/messages/) (`kill-reward`, `kill-lost`).

## When nothing happens

No reward is paid if any of these is true — see the linked pages:

- Victim has the bypass permission `dbloodmoney.bypass.victim`.
- The kill happened in a [safezone](/plugins/dbloodmoney/features/safezones/) world.
- Killer and victim share an IP and same-IP blocking is on ([Anti-Farm](/plugins/dbloodmoney/features/anti-farm/)).
- The pair is on [farm cooldown](/plugins/dbloodmoney/features/anti-farm/).
- Victim's balance is below the minimum.
- No Vault economy is installed.
