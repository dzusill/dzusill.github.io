---
title: "Commands & Permissions"
description: "Use any permission plugin (LuckPerms, etc.):"
---

## Commands

| Command | Alias | Permission | Edition | Description |
|---|---|---|---|---|
| `/dbloodmoney reload` | `/dbm reload` | `dbloodmoney.admin` | Free | Reload `config.yml` and `messages.yml`. |
| `/dbloodmoney info` | `/dbm info` | `dbloodmoney.admin` | Free | Show version and edition. |
| `/bounty add <player> <amount>` | — | `dbloodmoney.bounty.place` | PRO | Place/add a bounty on a player. |
| `/bounty list` | `/bounty` | `dbloodmoney.bounty.list` | PRO | Show the top bounties. |
| `/bounty remove <player>` | — | `dbloodmoney.bounty.others` | PRO | Clear a player's bounty (admin). |
| `/killtop` | `/dbmtop` | `dbloodmoney.killtop` | PRO | Kill leaderboard. |

> Commands are registered at runtime by DzusillCore — there are no command entries in any `plugin.yml`, and nothing to clash with other plugins unless they use the exact same name.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `dbloodmoney.*` | op | Everything below **except** `bypass.victim`. |
| `dbloodmoney.admin` | op | `/dbm reload` and `/dbm info`. |
| `dbloodmoney.bypass.victim` | *no one* | Never lose money when killed. **Not** included in `dbloodmoney.*` — grant it explicitly. |
| `dbloodmoney.bypass.cooldown` | op | Ignore the anti-farm pair cooldown. |
| `dbloodmoney.bypass.combatlog` | *no one* | Don't get slain for logging out while combat-tagged. |
| `dbloodmoney.bypass.sameip` | *no one* | Still get rewarded for a kill when sharing an IP with the victim. |
| `dbloodmoney.bounty.place` | everyone | Place bounties with `/bounty add` *(PRO)*. |
| `dbloodmoney.bounty.list` | everyone | View bounties with `/bounty` and `/bounty list` *(PRO)*. |
| `dbloodmoney.bounty.others` | op | Remove other players' bounties *(PRO)*. |
| `dbloodmoney.killtop` | everyone | View the leaderboard *(PRO)*. |

> **OPs lose money too.** `bypass.victim` is deliberately **not** part of `dbloodmoney.*`, so server operators and admins are farmable by default. Protect someone only by granting them `dbloodmoney.bypass.victim` directly.

### Suggested setup

- **Players** — already have `bounty.place`, `bounty.list` and `killtop` by default. Nothing to grant.
- **Staff you want protected** — grant `dbloodmoney.bypass.victim` (so they can't be farmed), and usually `dbloodmoney.bypass.combatlog` (so disconnecting in a fight doesn't kill them). Add `dbloodmoney.admin` for reloads.
- **Shared-connection players** (siblings, LAN café) — grant `dbloodmoney.bypass.sameip` so their kills still pay despite the same IP.

Use any permission plugin (LuckPerms, etc.):

```
/lp group staff permission set dbloodmoney.bypass.victim true
/lp group staff permission set dbloodmoney.bypass.combatlog true
/lp group admin permission set dbloodmoney.admin true
```
