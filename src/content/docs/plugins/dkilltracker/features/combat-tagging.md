---
title: "Combat Tagging"
description: "Alice has Bob at half a heart. Bob jumps into lava. The server reports \"Bob burned to death\" — no killer. Alice gets nothing."
---

## The problem

Alice has Bob at half a heart. Bob jumps into lava. The server reports "Bob burned to death" — no killer. Alice gets nothing.

Left alone, that's a one-click way to deny anyone a kill, and on a server where kills buy ranks it gets used constantly.

## The fix

```yaml
Combat-Tag:
  Enabled: true
  Duration-Seconds: 15
```

When a player damages another player, both are tagged for `Duration-Seconds`. If a tagged player dies and the server can't name a killer, the kill goes to whoever last hit them.

```
Alice hits Bob        → Bob tagged (attacker: Alice), Alice tagged (attacker: Bob)
Bob jumps into lava   → death has no killer
                      → Bob is still tagged → Alice gets the kill
```

The tag is cleared as soon as the player dies, so it can't credit a second kill later.

## What it catches

| Death | Credited? |
|---|---|
| Lava, fire, drowning during a fight | ✅ |
| Fall damage after being knocked back | ✅ |
| Void (knocked off an island / into the End) | ✅ |
| Suffocation, cactus, thorns | ✅ |
| Anything at all, more than 15 s after the last hit | ❌ |
| A player who was never hit | ❌ |

## Tuning the window

| Value | Feel |
|---|---|
| `5` – `10` | Tight. Only credits deaths in the immediate aftermath of a hit. |
| `15` *(default)* | Balanced. Long enough for a fall or a lava swim, short enough to be clearly connected. |
| `30`+ | Generous. Will occasionally credit a kill the attacker didn't really cause. |

## Turning it off

```yaml
Combat-Tag:
  Enabled: false
```

Only direct kills count. Cleaner and more literal — but expect players to work out the lava trick.

## What it does *not* do

dKillTracker's combat tag is **read-only**. It exists purely to answer "who should get this kill?".

It does not:

- Block commands, teleports or logout while tagged.
- Punish combat-logging.
- Show a combat timer.

If you want those, run a dedicated combat-log plugin alongside — the two don't conflict, and a player killed by a combat-log plugin's "punish on quit" is a normal kill as far as dKillTracker is concerned.

## Interaction with anti-farm

A combat-tag kill goes through exactly the same gates as any other. Alice can't dodge the same-victim cooldown by pushing Bob into lava repeatedly — the second one is suppressed just the same.
