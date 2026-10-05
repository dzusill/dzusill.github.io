---
title: "Soup PvP and /soup"
description: "A click with a soup in hand heals, feeds and applies the soup's effects at once, with no eating animation. This is"
---

A click with a soup in hand heals, feeds and applies the soup's effects **at once**, with no eating animation. This is
the behaviour the client asked for: every soup works, on a right or a left click, and holding the click does not slow the
player down.

```yaml
soup:
  enabled: true
  when: always                      # always | in-combat | out-of-combat
  triggers: [right-click, left-click]
  require-permission: false
  bowl: remove                      # remove | keep
  eat-state-fix: reset              # reset | off
  refill:
    enabled: true
    material: mushroom_stew
    cooldown: 0s
    in-combat: true
  soups:
    mushroom_stew:
      heal-hearts: 4
      food: 6
      saturation: 7.2
      effects: [{type: regeneration, duration: 3s, amplifier: 1}]
    suspicious_stew:
      heal-hearts: 2
      food: 6
      saturation: 7.2
      vanilla-effects: true
      bowl: keep
      effects: []
```

## The soups

Each entry under `soup.soups` is an item name and what it does:

| Key | Meaning |
|---|---|
| `heal-hearts` | hearts healed (a heart is two health points); capped at the player's maximum |
| `food` | hunger points added, capped at 20 |
| `saturation` | saturation added, capped at the food level |
| `effects` | potion effects: `{type, duration, amplifier}`. Durations are `3s`, `1m`; amplifier 0 is level I |
| `vanilla-effects` | for suspicious stew: keep the effects the stew already carries and add yours on top |
| `bowl` | per-soup override of the global `bowl` setting |

An effect with a name that is not a potion effect is reported in the console and skipped. The shipped soups are mushroom
stew, rabbit stew, beetroot soup and suspicious stew. Add any other item the same way.

## Clicking

- **Right-click** and **left-click** (in the air or on a block) can each be switched off in `triggers`. Minecraft reports a
  swing at a player as a left-click in the air, so with left-click on, hitting someone with a soup in hand uses the soup.
- A right-click on something that opens (a chest, a door, a button) belongs to the block, unless the player sneaks.
- **One soup per player per tick**, so the off-hand event of the same click cannot eat a second one.
- `when: in-combat` or `out-of-combat` limits the effect to tagged or untagged players.
- `require-permission: true` asks for `oberoncombat.soup` (granted to everyone by default).
- Excluded places (`soup`) switch it off.

## No slowdown

The client starts "using" an item the moment you click, and keeps doing so until the server tells it otherwise.
OberonCombat cancels the click so the server never starts a vanilla use, uses the soup up in the same tick, and with
`eat-state-fix: reset` clears the client's eating state now and one tick later. A flicker for a tick or two before the
server's slot update arrives is unavoidable; a *lasting* slowdown is a bug worth reporting, with the server and client
versions. See [Testing](/plugins/oberoncombat/developing/testing/).

## /soup: refill empty bowls

`/soup` (alias `/refillsoup`) turns the empty bowls in your inventory into soup of the type in `soup.refill.material`.

- A lone bowl becomes a soup where it lies, even with a full inventory.
- A stack of bowls becomes one soup per free slot (soup does not stack); the rest stay bowls. Nothing is ever lost: a bowl
  is only taken for a soup that was really placed.
- `refill.cooldown` is the wait between two refills; `0s` is none.
- `refill.in-combat: false` refuses a tagged player.
- Needs `oberoncombat.command.soup` (everyone by default). Messages: `soup-refilled` (`%count%`), `soup-refill-nothing`,
  `soup-refill-full`, `soup-refill-cooldown` (`%time%`), `soup-refill-in-combat`, `soup-refill-disabled` (the refill is off, or the
  player stands in an excluded place).
