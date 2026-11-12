---
title: "Killstreaks and the shutdown bonus"
description: "A streak is a run of counted kills. It ends:"
---

A streak is a run of counted kills. It ends:

- on death — a kill by a player always; any other death with `rules.streak-reset.on-death`;
- on leaving the arena worlds (`on-leave-arena`);
- on quitting (`on-quit`).

The best streak of each day, week, month and all time is saved and ranked.

## Milestones

`streaks.yml` pays a milestone the first time a streak reaches it. Reaching it again in the same streak
(an admin `setstreak`) pays nothing; dying and climbing back pays again. After the last milestone,
`repeat` pays every `every` kills from `from` (25, 30, 35 …).

Shipped: 3 → 250 stardust · 5 → 500 · 10 → 1,000 + key · 15 → a Sword Tier 1 kit use + 1,500 · 20 →
2,500 + key · every 5 from 25 → 2,500.

A milestone with `broadcast: true` is announced by `broadcasts.milestone` in config.yml: streaks 5–9 to
players in the arena, 10 and up to the whole server.

## Shutdown

Killing a player whose streak was at least `shutdown.min-streak` (5) pays the killer by the victim's
streak: the highest tier at or below it. `%victim_streak%` works in the reward commands.

Shipped: 5–9 → 500 stardust · 10–19 → 1,500 · 20+ → 3,000 + key. Shutdowns of 10+ are broadcast to the
server. It is called "shutdown" so it is never confused with UltraBounty's player-paid bounties.

## Effects

Particles around players with a streak (from 10: flame, from 20: soul flame) and a streak tag for TAB or
a nametag plugin: `%oberonffa_streak_tag%`, from 5 `🔥5`. Never a glow — Shyam-Glow sells glow as a
cosmetic. Both are in `streak-effects` in config.yml.
