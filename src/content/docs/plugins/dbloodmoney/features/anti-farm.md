---
title: "Anti-Farm Protection"
description: "Killing for money is the most farm-prone mechanic in Minecraft — players will use alts, friends and re-kills to print money. dBloodMoney ships with four…"
---

Killing for money is the most farm-prone mechanic in Minecraft — players will use alts, friends and re-kills to print money. dBloodMoney ships with four protections, all in the **free** edition.

## 1. Farm cooldown (same pair)

After Alice kills Bob, Alice can't be **rewarded** for killing Bob again until the cooldown expires. They can still fight — there's just no payout for re-kills.

```yaml
Anti-Farm:
  Enabled: true
  Cooldown-Seconds: 600     # 10 minutes
```

- The cooldown is **per killer+victim pair**, so Alice killing Carol is unaffected.
- Players with `dbloodmoney.bypass.cooldown` ignore it (handy for admins/testing).

> `Cooldown-Seconds` is applied at startup — change it and **restart**.

## 2. Same-IP blocking

Blocks the most common alt-farm: killing your own second account on the same connection.

```yaml
Same-IP:
  Block: true
```

When the killer and victim share an IP address, no reward is paid. This toggle reloads live with `/dbm reload`.

> Players legitimately sharing a connection (siblings, LAN cafés) are also blocked. Disable globally with `Block: false`, or grant the affected players `dbloodmoney.bypass.sameip` to pay them despite the shared IP.

## 3. Combat-log punishment

Stops players disconnecting to dodge a steal — covered fully in [Combat Tagging](/plugins/dbloodmoney/features/combat-tagging/).

## 4. Safezones

Stops farming in safe areas like spawn — covered in [Safezones](/plugins/dbloodmoney/features/safezones/).

## Bypass permissions

| Permission | Effect |
|---|---|
| `dbloodmoney.bypass.victim` | Player never loses money when killed. **Not** part of `dbloodmoney.*`. |
| `dbloodmoney.bypass.cooldown` | Killer ignores the farm cooldown. |
| `dbloodmoney.bypass.sameip` | Killer is still rewarded when sharing an IP with the victim. |

`bypass.cooldown` defaults to op; the other two default to **no one**. Grant `dbloodmoney.bypass.victim` to staff so they aren't farmed — note that **OPs are not auto-exempt**, because `bypass.victim` is intentionally left out of `dbloodmoney.*`.

## Recommended starting point

For a public PvP server:

```yaml
Anti-Farm:
  Enabled: true
  Cooldown-Seconds: 900      # 15 min between paid re-kills
Same-IP:
  Block: true
```

Loosen the cooldown for arena/hardcore servers where fast repeated PvP is the point.
