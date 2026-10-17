---
title: "score.yml"
description: "How flags turn into a score and a level. See Score, levels and cases for the idea. Changes apply with /sus reload, and every player is rescored straight away."
---

How flags turn into a score and a level. See [Score, levels and cases](/plugins/oberonsentry/features/score-and-cases/) for the idea. Changes apply with `/sus reload`, and every player is rescored straight away.

```
points per flag = category weight × check multiplier
                  × experimental-factor (experimental checks only)
                  × (1 + vl / max vl)
score = sum of points, halved every half-life,
        × (1 + diversity-bonus per extra category)
```

| Key | Default | What it does |
| --- | --- | --- |
| `categories.combat` / `movement` / `player` / `client` / `other` | 2.0 / 1.0 / 1.0 / 1.5 / 1.0 | Weight per category |
| `checks.<name>` | Reach 1.5, Hitbox 1.5, Kill Aura 1.5, Auto Clicker 0.6, Timer 1.2, Bad Packets 0.8 | Extra multiplier per check. Use the name (`Reach`) or the name with type (`Auto Clicker (T)`) |
| `experimental-factor` | `0.5` | Multiplier for checks Vulcan marks experimental |
| `half-life` | `30m` | Points halve this often |
| `lookback` | `4h` | Older flags no longer count at all |
| `burst-cap` | `5` | Flags of one check per minute that count. More are only tallied |
| `diversity-bonus` | `0.25` | Extra fraction per additional category flagged within the lookback |
| `levels.low` / `medium` / `high` / `critical` | 5 / 20 / 50 / 100 | Minimum score per level |
| `levels.critical-vl-ratio` | `0.8` | CRITICAL also needs a check at this fraction of its punishment threshold, or a Vulcan punishment |

## reactions

From which level each reaction happens: `LOW`, `MEDIUM`, `HIGH` or `CRITICAL`.

| Key | Default |
| --- | --- |
| `reactions.open-case` | `MEDIUM` |
| `reactions.staff-alert` | `MEDIUM` |
| `reactions.discord` | `HIGH` |
| `reactions.evidence` | `MEDIUM` |
| `reactions.discord-contributors` | `5`. Top checks listed in `{top_checks}` in a Discord embed (1 to 20) |
