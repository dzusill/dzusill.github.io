---
title: "When a kill counts (anti-abuse)"
description: "Every player death is judged once. Only a counted kill moves anything: stats, the killer's streak,"
---

Every player death is judged once. Only a **counted** kill moves anything: stats, the killer's streak,
milestones, the shutdown bonus, daily first kills, passes and leaderboards. The **victim's streak ends on
every kill by a player**, counted or not.

## Who the killer is

In this order:

1. **Combat-log** — OberonCombat kills a player who logged out while combat-tagged; the kill goes to
   their last enemy (`rules.combat-log.count`). Counted exactly once, whether or not a death follows.
2. **The killing blow** — a player, the shooter of a projectile, or the owner of a tamed wolf
   (`rules.pet-kills.count`).
3. **The server's own killer.**
4. **The last hit** — a fall or burn after a hit, within `rules.last-hit.seconds` (15 s, the same window
   as OberonKits' killer XP).

## The rules, in order

The first rule that fails is the reason, and the killer reads `kill.rejected.<reason>` from
messages.yml (when `rules.notify-rejected` is on; an empty text keeps that reason silent).

| Reason | Rule | Config |
|---|---|---|
| `not-in-arena` | Killer and victim are both in an arena world. Always on, never announced. | `arena` |
| `self` | The killer is not the victim. Always on, never announced. | — |
| `killer-mode` | The killer is in an allowed game mode, not vanished (`vanished` metadata) and has no `oberonffa.exempt`. | `rules.killer-mode` |
| `duels` | Neither player is in a Duels-Shyam duel. | `rules.duels` |
| `fresh-victim` | The victim has been in the arena at least `min-seconds` (10) since entering or respawning — no farming a freshly spawned alt. | `rules.fresh-victim` |
| `pair-cooldown` | The last counted kill between these two is older than `cooldown` (10 min). With `both-directions` A killing B also blocks B killing A. | `rules.same-victim` |
| `alt` | The two accounts do not share an address — now, or within `remember` (7 days). | `rules.alt-guard` |

## The alt guard

Addresses are never stored: the database keeps an HMAC of each under a key in `data.yml`. Two
accounts are linked when they are online from the same address (an IPv6 address counts as its /64), or
used one within `rules.alt-guard.remember`. Linked accounts cannot count kills on each other
(`block-kills`), and with `rewards-per-ip` the daily first kills and pass tiers pay one account of the
group — also when the other account is offline, through the addresses stored for it.
`ignore-addresses` lists addresses and ranges that link nobody (shared networks, the proxy).

## Remaining risk

A friend can build a real streak and let a second friend end it for the shutdown bonus. It costs the
first one their streak, the pair cooldown stops a repeat for 10 minutes, and the bonus starts at a streak
of 5.
