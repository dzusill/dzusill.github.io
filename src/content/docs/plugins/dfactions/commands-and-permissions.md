---
title: "Commands & Permissions"
description: "Player commands use /f (aliases /faction, /factions). Admin commands use /fa (alias"
---

Player commands use **`/f`** (aliases `/faction`, `/factions`). Admin commands use **`/fa`** (alias
`/factionadmin`, requires `factions.admin`). Arguments in `<angle brackets>` are required,
`[square brackets]` optional.

## Faction lifecycle

| Command | Aliases | Permission |
|---|---|---|
| `/f create <name>` | | `factions.cmd.create` |
| `/f disband` | | `factions.cmd.disband` |
| `/f rename <name>` | `/f tag` | `factions.cmd.rename` |
| `/f desc <text>` | | `factions.cmd.desc` |
| `/f motd [text]` | | `factions.cmd.motd` |
| `/f info [faction]` | `/f i`, `/f show`, `/f status` | — |

## Membership & roles

| Command | Aliases | Permission |
|---|---|---|
| `/f invite <player>` / `invite list` / `invite revoke <player>` | | `factions.cmd.invite[.list/.revoke]` |
| `/f join <faction>` | | `factions.cmd.join` |
| `/f leave` | | `factions.cmd.leave` |
| `/f kick <player>` | | `factions.cmd.kick` |
| `/f promote <player>` / `/f demote <player>` | | `factions.cmd.promote` / `.demote` |
| `/f leader <player>` | | `factions.cmd.leader` |
| `/f role …` | | `factions.cmd.role` |
| `/f ban <player>` / `/f unban <player>` | | leader-only (in-command) |
| `/f player [name]` | `/f who` | — |

## Relations & merges

| Command | Permission |
|---|---|
| `/f relation <ally\|truce\|enemy\|neutral> <faction>` | `factions.cmd.relation` |
| `/f merge send <faction>` / `merge accept <faction>` | `factions.cmd.merge` |

## Chat channels

| Command | Aliases | Permission |
|---|---|---|
| `/f chat [public\|faction\|ally]` | | — |

Switches which audience your normal chat messages go to. `/f chat` with no argument shows your
current channel. Faction and ally chat are only offered while you're in a faction.

Every line the plugin sends or relays in chat carries the configurable **global prefix**, and
faction/ally chat also get a distinct `[Faction]` / `[Ally]` tag so it's always obvious which
channel a message is in — see [Messages & Languages](/plugins/dfactions/configuration/messages/#chat-prefix--channel-formats).

## Territory

| Command | Aliases | Permission |
|---|---|---|
| `/f claim [radius\|auto]` | | `factions.cmd.claim` |
| `/f unclaim` | | `factions.cmd.unclaim` |
| `/f unclaimall` | | leader-only (in-command) |
| `/f map` | | `factions.cmd.map` |
| `/f coords` | `/f coord` | — |
| `/f near` | | — |

## Home, warps & storage

| Command | Permission |
|---|---|
| `/f home` / `/f sethome` / `/f unsethome` | `factions.cmd.home` / `.sethome` |
| `/f warp <name>` / `warp set <name> [pass]` / `warp list` / `warp delete <name>` | `factions.cmd.warp` / `.setwarp` |
| `/f chest` | `factions.cmd.chest` |

## Economy

| Command | Aliases | Permission |
|---|---|---|
| `/f bank [deposit\|withdraw <amt>\|history]` | `/f money`, `/f balance` | `factions.cmd.bank[.history]` |
| `/f power [player]` / `power history` | | `factions.cmd.power.history` |

## Progression, wars & shields

| Command | Permission |
|---|---|
| `/f level` / `/f prestige` / `/f resources` | member (in-command) |
| `/f war declare <faction>` / `war cancel` | member (in-command) |
| `/f shield [tier]` | member (in-command) |

## Information & misc

| Command | Permission |
|---|---|
| `/f list` | `factions.cmd.list` |
| `/f top [power\|bank\|land\|kills\|wars\|level]` | `factions.cmd.top` |
| `/f gui` | `factions.cmd.gui` |
| `/f flag [set <flag> <value>]` | `factions.cmd.flag[.set]` |
| `/f audit` | `factions.cmd.audit` |
| `/f fly` | `factions.cmd.fly` |
| `/f notify` | `factions.cmd.notify` |
| `/f help` | — |

## Admin (`/fa`)

All require `factions.admin` (or the specific child node).

| Command | Permission |
|---|---|
| `/fa info [faction]` | `factions.admin` |
| `/fa bypass` | `factions.bypass` |
| `/fa claim` / `/fa unclaim` | `factions.cmd.claim.other` |
| `/fa disband <faction>` | `factions.cmd.disband.other` |
| `/fa reload` | `factions.admin` |
| `/fa safezone` / `/fa warzone` | `factions.cmd.safezone` / `.warzone` |
| `/fa shield <faction> <startHour> <hours>` | `factions.cmd.shield` |
| `/fa flag <faction> <flag> <value>` | `factions.cmd.flag.set` |
| `/fa audit [faction]` | `factions.cmd.audit` |
| `/fa power <view\|set\|add\|remove\|reset\|freeze\|history> <player> [amount]` | `factions.cmd.admin.power.*` |

## Permission defaults

- `default: true` — normal player commands (create, claim, bank, invite, join, leave, …).
- `default: op` — admin nodes (`factions.admin`, `factions.bypass`, `factions.cmd.*.other`,
  `factions.cmd.role.*`, `factions.cmd.predefined.*`, `factions.cmd.safezone/warzone`, admin power).

Newer commands (`/f level`, `/f prestige`, `/f resources`, `/f shield`, `/f war`, `/f coords`,
`/f near`, `/f player`, `/f ban`, `/f unban`, `/f unclaimall`) are available to all players and gated
by in-command checks (e.g. leader-only for bans) rather than a dedicated node.

### Example — LuckPerms staff group

```
/lp group moderator permission set factions.admin true
```
