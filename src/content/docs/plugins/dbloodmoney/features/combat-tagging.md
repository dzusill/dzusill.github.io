---
title: "Combat Tagging"
description: "Combat tagging marks players as \"in combat\" while they fight, which powers two things: crediting environmental deaths to the last attacker, and punishing…"
---

Combat tagging marks players as "in combat" while they fight, which powers two things: crediting environmental deaths to the last attacker, and punishing players who log out to escape a steal.

```yaml
Combat-Tag:
  Enabled: true
  Duration-Seconds: 15
  Punish-Combat-Log: true
```

## How tagging works

When one player damages another (melee **or** projectile), **both** players are tagged for `Duration-Seconds`. Each new hit refreshes the timer. The first time a player enters combat they're warned:

> **[dBloodMoney]** You are now in combat — do not log out!

(Message keys: `combat-tag-enter`, `combat-tag-leave`.)

## Environmental-death credit

If a tagged player dies to something **other** than the killer — lava, fall damage, fire — the **last player who hit them** is still paid. So knocking someone into a lava pit during a fight counts as your kill.

## Combat-log punishment

With `Punish-Combat-Log: true`, a player who disconnects **while tagged** is slain on the way out. This:

1. Drops their items where they logged off.
2. Fires a normal death, so their attacker collects the steal (and any bounty/streak).
3. Broadcasts:
   > **[dBloodMoney]** **Player** combat-logged and was slain.

When they log back in, they respawn as if they'd died — because they did.

> Disconnects that are **not** in combat are untouched. Only tagged players are punished.

> Players with `dbloodmoney.bypass.combatlog` are exempt — they can log out mid-fight without being slain (handy for staff).

## Tuning

| Goal | Setting |
|---|---|
| Longer "can't escape" window | raise `Duration-Seconds` (e.g. `20`–`30`). |
| Disable the slay-on-logout, keep tagging | `Punish-Combat-Log: false`. |
| Turn the whole system off | `Enabled: false`. |

> All `Combat-Tag` settings are applied at startup — change them and **restart**.

## Notes

- Combat tagging is independent of the economy; it works even with stealing disabled.
- It does not block commands or movement by itself — it only drives kill credit and the log-out penalty. Pair it with a dedicated combat-log/elytra plugin if you want command blocking too.
