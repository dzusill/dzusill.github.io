---
title: "PvP toggle"
description: "Lets a player switch their own PvP off. A player with PvP off cannot hurt anyone and cannot be hurt by anyone. Off by"
---

Lets a player switch their own PvP off. A player with PvP off **cannot hurt anyone and cannot be hurt by anyone**. Off by
default.

```yaml
pvp-toggle:
  enabled: false
  default-state: true
  cooldown: 15s
  block-in-combat: true
  worldguard-override: true
```

| Key | Meaning |
|---|---|
| `enabled` | the whole feature. While off, everyone's PvP is on and `/pvp` says the toggle is not enabled |
| `default-state` | what a player who never used `/pvp` has. Changing it changes everyone who never chose |
| `cooldown` | the wait between two changes. `oberoncombat.exempt.pvpcooldown` skips it |
| `block-in-combat` | refuse to switch PvP **off** while tagged. Switching on is always allowed |
| `worldguard-override` | in a region whose `pvp` flag is `allow`, PvP counts as on for everyone there |

## Commands

| Command | Does |
|---|---|
| `/pvp` | flip your own PvP |
| `/pvp on`, `/pvp off` | set it |
| `/pvp <player> [on\|off]` | the same for someone else (`oberoncombat.command.pvp.others`); no cooldown, no combat rule |
| `/pvpstatus` | your own state |
| `/pvpstatus <player>` | someone else's (`oberoncombat.command.pvpstatus.others`) |

Aliases of `/pvp`: `/pvptoggle`, `/togglepvp`.

## What is refused, and what is told

A hit between two players is cancelled when either has PvP off, and it tags nobody. The attacker sees `attack-denied-you`
when it is **their** PvP that is off, and `attack-denied-other` (`%player%`) when it is the victim's. Harmful splash and
lingering potions are refused the same way: they simply have no effect on the protected player. Explosions, anchors and
beds that a player is responsible for count as attacks too, and so does a **fishing rod**: it cannot hook a protected player, who
would otherwise be pulled toward the angler. The refusal is announced to the attacker once a second at most, so holding the
attack button does not play the sound every tick.

## What overrides a player's choice

- **A duel.** Duel fighters are always open to each other ([Duels-Shyam](/plugins/oberoncombat/features/duels/)).
- **A region with `pvp: allow`**, with `worldguard-override` on. The player is told once in a while
  (`pvp-force-enabled-worldguard`). Their own choice is kept and applies again outside.

## Where the choice is kept

In `plugins/OberonCombat/pvp-state.yml`, written the moment a player changes it: only choices are stored, never the
default. It survives restarts. `%oberoncombat_pvp_state%` answers `on` or `off`
([Placeholders](/plugins/oberoncombat/reference/placeholders/)).

## Messages

`pvp-enabled`, `pvp-disabled`, `pvp-cooldown` (`%time%`), `pvp-toggle-in-combat`, `pvp-toggle-disabled`, `attack-denied-you`,
`attack-denied-other` (`%player%`), `pvp-force-enabled-worldguard`, `pvp-status-self` (`%state%`), `pvp-status-other`
(`%player%`, `%state%`), `pvp-set-other`, `pvp-set-by-admin`.
