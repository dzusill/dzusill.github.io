---
title: "The safe-zone barrier"
description: "A WorldGuard region with the pvp flag set to deny is a safe zone. A tagged player who walks toward one meets a"
---

A WorldGuard region with the `pvp` flag set to `deny` is a safe zone. A **tagged** player who walks toward one meets a
glass wall, is stopped and pushed back at the edge, and their tag starts again. It does nothing, and costs nothing, on a
server without WorldGuard.

```yaml
barrier:
  enabled: true
  material: red_stained_glass
  radius: 5
  mode: fast                  # fast | full
  update-ticks: 3
  renew-tag-on-attempt: true
  push-back:
    enabled: true
    force: 1.2
    vertical: 0.3
    stop-gliding: true
  vulnerable: false
  message-cooldown: 1s
  block-teleports: [ender_pearl, consumable_effect]
  index-refresh: 30s
```

## The wall is a picture, the refusal is the server's

The glass is fake blocks sent to the tagged player only, near the region, and only as the difference from what they
already see. A modified client can ignore it, so the **server** refuses the move itself: a tagged player who steps from
outside a `pvp: deny` region to inside it is put back where they were. A boat or horse carrying a tagged rider is stopped
the same way.

- **`mode: fast`** draws a low wall around the player's body; `full` draws the whole cube.
- **`radius`** is how far from the player the wall is drawn; **`update-ticks`** how often it follows them.
- **A player already inside is never stopped**: they may walk out, and around, normally, and get no wall. That is what the
  client asked for.
- **Teleports.** An ender pearl or chorus fruit that would land inside is refused (`block-teleports`; chorus fruit arrives
  as `consumable_effect` on this server version). Warps and other plugin teleports are never in the way.
- **`renew-tag-on-attempt`**: trying to get in starts the tag again.
- The `barrier-blocked` message is shown at most once per `message-cooldown`.

## Push back

When a tagged player touches the barrier they are thrown back the way they came:

| Key | Meaning |
|---|---|
| `push-back.enabled` | `false` still refuses the move but does not throw the player |
| `push-back.force` | horizontal strength, 0.1 to 4; PvPManager's default was 1.2 |
| `push-back.vertical` | how much goes upward, 0 to 1 |
| `push-back.stop-gliding` | stop a player who is gliding on an elytra when they are pushed |

A value outside its range is clamped and reported in the console. Elytra users are the reason for `stop-gliding`: a
gliding player would otherwise fly through the push.

## Vulnerable inside a safe zone

```yaml
barrier:
  vulnerable: true
```

Off by default. When on, two combat-tagged players who are **fighting each other** can still hurt each other inside a
`pvp: deny` region, even though WorldGuard refuses PvP there. Nobody else can hit them, and a bystander in the region stays
safe. A fighter whose [PvP is off](/plugins/oberoncombat/features/pvp-toggle/) stays safe, and a hit a duel plugin refused stays refused (a guard such as
Duels-Shyam's is asked). **It cannot tell WorldGuard's refusal from any other plugin's**: for two fighters inside a
`pvp: deny` region it lifts every cancellation, so another plugin's protection (god mode, spawn protection) does not hold
there either. WorldGuard may also still print its own "you cannot PvP here" message. Excluded places (`barrier`) switch it off.

## How it finds the regions

WorldGuard is asked for the list of `pvp: deny` regions once per `index-refresh` (30 seconds), never per move, so a changed
region is picked up within that time or at `/oberoncombat reload`. `/oberoncombat status` says whether any are known.
