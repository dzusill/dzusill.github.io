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
| `/f entermsg [clear\|text]` | | `factions.cmd.entermsg` |
| `/f leavemsg [clear\|text]` | | `factions.cmd.leavemsg` |
| `/f border` | | `factions.cmd.border` |
| `/f coords` | `/f coord` | — |
| `/f near` | | — |

## Home, warps & storage

| Command | Permission |
|---|---|
| `/f home` / `/f sethome` / `/f unsethome` | `factions.cmd.home` / `.sethome` |
| `/f warp` (GUI) / `warp <name> [pass]` / `warp set` / `warp delete` / `warp list` / `warp password` / `warp icon` / `warp desc` | `factions.cmd.warp` / `.setwarp` / `.warp.password` |
| `/f chest` | `factions.cmd.chest` |

`/f home` and `/f warp <name>` are rate-limited by `factions.<home\|warp>.cooldown-seconds`
(default `5`) and require the player to stand still for `factions.<home\|warp>.warmup-seconds`
(default `10`) before the teleport completes — moving to another block, taking damage, or
attacking cancels it. Bypass with `factions.teleport.cooldown.bypass` and
`factions.teleport.warmup.bypass` respectively (both `op` by default); the two are independent,
so a rank can be granted instant teleports while still being rate-limited. During the warmup a
live per-second countdown title is shown; disable it with `factions.teleport.warmup-title.enabled:
false` to keep only the chat line.

## Economy

| Command | Aliases | Permission |
|---|---|---|
| `/f bank [deposit\|withdraw <amt>\|history]` | `/f money`, `/f balance` | `factions.cmd.bank[.history]` |

## Progression, wars & shields

| Command | Permission |
|---|---|
| `/f level` / `/f prestige` / `/f resources` | member (in-command) |
| `/f war declare <faction>` / `war cancel` | member (in-command) |
| `/f shield [tier]` | member (in-command) |

## Statistics

| Command | Aliases | Permission |
|---|---|---|
| `/fstats [player]` | `/stats`, `/pvpstats` | `factions.cmd.stats` |
| `/f stats [player]` | `/f stat`, `/f profile` | `factions.cmd.stats` |
| `/f stats faction [name]` | | `factions.cmd.stats` |

Viewing another player's profile additionally needs `factions.cmd.stats.other`.

`/fstats` is the primary name with `/stats` as an alias — many plugins claim `stats`, so registering
the distinctive name first means the command works regardless of who wins that race.

See [Statistics & Seasons](/plugins/dfactions/features/statistics/).

## Information & misc

| Command | Permission |
|---|---|
| `/f list` | `factions.cmd.list` |
| `/f top [bank\|land\|kills\|wars\|level]` | `factions.cmd.top` |
| `/f gui` | `factions.cmd.gui` (requires being in a faction) |
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
| `/fa level` / `/fa xp` / `/fa prestige` `<faction> <set\|add\|remove> <n>` | `factions.cmd.level.other` / `.xp.other` / `.prestige.other` |
| `/fa money <faction> <set\|add\|remove> <amount>` | `factions.cmd.money.other` |
| `/fa stats <faction> <field> <set\|add\|remove> <n>` | `factions.cmd.stats.other` |
| `/fa stats debug` | `factions.cmd.stats.debug` |
| `/fa stats reset <player> [field...] confirm` | `factions.cmd.stats.reset` |
| `/fa stats purge [field...] confirm` | `factions.cmd.stats.purge` |
| `/fa season [info\|list\|end confirm]` | `factions.cmd.season` |
| `/fa description` / `/fa motd <faction> <clear\|text>` | `factions.cmd.description.other` / `.motd.other` |
| `/fa rename <faction> <new-name>` | `factions.cmd.rename.other` |

Admins can directly set or adjust (`set`/`add`/`remove`) any faction's level, XP, prestige rank,
bank balance, kills/deaths/wars-won/wars-lost, description, MOTD, or name — bypassing normal
membership/ownership requirements. Every change is written to the audit log. See
[Leveling & Prestige](/plugins/dfactions/features/progression/) and [Economy & Bank](/plugins/dfactions/features/economy/) for the
systems these override.

## Permission defaults

- `default: true` — normal player commands (create, claim, bank, invite, join, leave, …).
- `default: op` — admin nodes (`factions.admin`, `factions.bypass`, `factions.cmd.*.other`,
  `factions.cmd.role.*`, `factions.cmd.predefined.*`, `factions.cmd.safezone/warzone`).

`factions.cmd.stats.purge` is deliberately **not** included in `factions.admin`'s children — an
irreversible all-players operation has to be granted on purpose.

Newer commands (`/f level`, `/f prestige`, `/f resources`, `/f shield`, `/f war`, `/f coords`,
`/f near`, `/f player`, `/f ban`, `/f unban`, `/f unclaimall`) are available to all players and gated
by in-command checks (e.g. leader-only for bans) rather than a dedicated node.

### Example — LuckPerms staff group

```
/lp group moderator permission set factions.admin true
```
