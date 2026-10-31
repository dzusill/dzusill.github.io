---
title: "Fight guard"
description: "Vulcan sometimes flags legitimate players in fights, usually when their connection stutters. The fight guard reduces the damage without changing Vulcan's…"
---

Vulcan sometimes flags legitimate players in fights, usually when their connection stutters. The fight guard reduces the damage without changing Vulcan's checks. It has two parts, and both work only on the `combat` category by default.

## Modes

| `fight-guard.mode` | What happens |
| --- | --- |
| `DISABLED` | Vulcan works alone |
| `OBSERVE` | The guard decides and counts, but stops nothing. This is the default |
| `ENFORCE` | The guard really stops flags and punishments |

Start with `OBSERVE` for a few days, read `/sus accuracy`, then switch to `ENFORCE` and run `/sus reload`.

## Flag filter

A flag is ignored when the player's ping is at or above `max-ping`, when their ping jumps `ping-jump` above their recent average, or when the server's TPS is below `min-tps`.

An ignored flag does not raise Vulcan's violation level, does not count towards the score and does not appear in `/sus`.

A cheater could fake lag to hide behind this, so a player can use up only `abuse-limit` ignored flags per `abuse-window`. Further flags count as usual. Checks in `never-filter` are never ignored.

## Punish gate

When Vulcan wants to punish someone, the guard looks at the player's score. The punishment goes through when one of these is true:

- The player is at `min-risk` or above, with flags from at least `min-checks` different checks. `Reach (A)` and `Reach (B)` count as one check.
- The player is at `solo-risk` or above.

Otherwise the punishment is held:

- A case is opened, whatever the score says.
- Staff get an alert, at most once per `notify-every`.
- A `punish-held` entry goes to the audit log and to the Discord staff channel.

Vulcan keeps the violation level of a held punishment and tries again after its `punishment-delay` for as long as the player keeps flagging. A cheater who keeps going therefore reaches `solo-risk` and is punished without staff. A legitimate player with a few false flags is not.

Checks in `always-punish`, and every category not listed in `punish-gate.categories`, are never held.

## Tuning with /sus accuracy

`/sus accuracy [window]` lists the checks staff dismiss most, with how many flags the filter ignored and how many punishments the gate held. The default window is 7 days.

| What you see | What to do in Vulcan's `config.yml` |
| --- | --- |
| A check has a high dismissed percentage | Raise its `buffer.max` or `max-violations` |
| A statistical check (Aim, Auto Clicker) is often dismissed | Set `punishable: false`, so it only feeds the score |
| Flags are ignored mostly at high ping | Set the check's `maximum-ping` |

The list only knows about false positives once staff dismiss cases, so close cases with **Dismiss** when a flag was wrong.

## Limits

- The guard cannot make a check smarter. A false flag at good ping and good TPS still counts, and only the punish gate protects that player.
- `min-tps` adds little on default settings, because most Vulcan checks already skip below 19 TPS.
- A cheater who is flagged by one check and stops before `solo-risk` is not auto-punished. The open case is there for staff.
