---
title: "Permissions"
description: "A pass with a permission in passes.yml is shown and claimable only for holders of that node."
---

| Permission | Default | What |
|---|---|---|
| `oberonffa.use` | everyone | `/ffa`, passes, the claim storage |
| `oberonffa.stats` | everyone | Own statistics |
| `oberonffa.stats.others` | op | Another player's statistics |
| `oberonffa.top` | everyone | `/ffa top` |
| `oberonffa.exempt` | nobody (not even ops) | Kills by this player never count (staff testing) |
| `oberonffa.leaderboard.exempt` | nobody (not even ops) | Left out of every leaderboard and top payout |
| `oberonffa.admin` | op | `/ffa admin …`; includes `oberonffa.stats.others` |

A pass with a `permission` in passes.yml is shown and claimable only for holders of that node.
