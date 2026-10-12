---
title: "Score, levels and cases"
description: "The score is an investigation aid, never proof. It decides what staff see first and when they are told, and it never punishes anyone."
---

The score is an **investigation aid, never proof**. It decides what staff see first and when they are told, and it never punishes anyone.

## Points per flag

```
points = category weight × check multiplier × (0.5 if the check is experimental) × (1 + vl / max vl)
```

- **Category weights:** combat counts double by default.
- **Check multipliers:** Reach, Hitbox and Kill Aura weigh more; Auto Clicker weighs less. All of it is set in [`score.yml`](/plugins/dsusmenu/configuration/score/).
- **Burst cap:** only the first 5 flags of one check per minute count. A single check spamming hundreds of flags cannot open a case on its own. The extra flags still show up in the flag count.
- **Half-life:** points halve every 30 minutes and stop counting after 4 hours.
- **Diversity bonus:** each additional category flagged within those 4 hours adds 25%. Combat and movement together is a stronger signal than one check firing twice as often.

## Levels

| Level | Default score | Notes |
| --- | --- | --- |
| LOW | 5 | |
| MEDIUM | 20 | Opens a case, silent staff alert, evidence timeline |
| HIGH | 50 | Discord alert |
| CRITICAL | 100 | Also needs a check at 80% of its punishment threshold, or a punishment by Vulcan |

The reactions per level are set in `score.yml` under `reactions`.

## Cases

A player has at most **one active case**. It opens automatically at MEDIUM. Staff can also open one by hand from the actions menu (`/sus status <player> open`); a case opened that way starts at LOW.

| Status | Meaning |
| --- | --- |
| Open | New, nobody has looked at it yet |
| Under review | Someone is on it (assign yourself from the actions menu) |
| Resolved | Done. A reason is required |
| Dismissed | False positive. A reason is required, and **the case's points are removed from the score at once** |

A case keeps the **highest level it reached**, which is the level that was announced. Each level is announced only once per case:

- **Silent alert** in game for staff with `dsusmenu.alerts`. The line has the risk, score, check and case number, plus `[PROFILE]` and `[ACTIONS]` buttons. The suspect sees nothing. Staff turn alerts on or off with `/sus alerts`. Two alerts about the same player are at least `alerts.min-interval` apart, unless the second one is for a higher level.
- **Discord alert** from HIGH (see [Discord](/plugins/dsusmenu/features/discord/)).
- **Evidence timeline** from MEDIUM. Movement speed, rotation changes, air time, distance to the attacked entity and ping are recorded from 10 s before to 5 s after the flag, and stored with the case.

A punishment by Vulcan counts as CRITICAL evidence. It is announced like a level change, and it is remembered across restarts.

## Profile

`/sus <player>`, or shift-click on a head, opens the profile:

- The score with the checks that make it up
- The case, the client and version, and AdvancedBan history (active punishments marked)
- The last notes and audit entries
- First and last join, and playtime

The IP is never stored. If you turn on `privacy.ip-logging`, a salted hash is stored instead, and only staff with `dsusmenu.view.ip` can see it.

## Export

**Export** in the actions menu (or `/sus export <player>`) writes a markdown report of the current or latest case to `plugins/dSusMenu/exports/`. It covers the case, the score breakdown, every flag from the window that opened it, the evidence summaries, notes and the audit log. With Discord, the report is also posted to the staff channel as a file.
