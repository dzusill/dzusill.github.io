---
title: "Commands & Permissions"
description: "Seven player commands and one admin command — every name and permission comes from the config."
---

Every name, alias and permission below is the **default**. All of them live in `config.yml` under `Commands` and can be changed or switched off. Changing them needs a restart.

## Player commands

| Command | Default alias | Default permission |
|---|---|---|
| `/staffchat [message]` | `/sc` | `oberonstaff.staffchat` |
| `/tp <player> [player]` | | `oberonstaff.teleport` |
| `/tpo <player> [player]` | | `oberonstaff.teleport.override` |
| `/tphere <player>` | `/s` | `oberonstaff.teleport` |
| `/tpohere <player>` | | `oberonstaff.teleport.override` |
| `/tptoggle` | | `oberonstaff.tptoggle` |
| `/back` | | `oberonstaff.back` |

`/staffchat` with no arguments toggles the mode. With arguments it sends one line.

The `o` variants reach players who have `/tptoggle` on. So does holding `oberonstaff.teleport.override` on the plain commands.

## Ticket desk — players

Registered only when the ticket desk is on and the database is open. See [Ticket Desk](/plugins/oberonstaff/features/tickets/).

| Command | Default alias | Default permission |
|---|---|---|
| `/ticket` — your tickets | `/t` | `oberonstaff.ticket.use` |
| `/ticket create [category]` | | `oberonstaff.ticket.create` |
| `/ticket view <#>` | | `oberonstaff.ticket.use` |
| `/ticket chat [#]` · `/ticket leave` | | `oberonstaff.ticket.use` |
| `/ticket reply <#> <message>` | | `oberonstaff.ticket.use` |
| `/ticket close <#> [reason]` | | `oberonstaff.ticket.close.own` |
| `/ticket rate <#> <1-5> [comment]` | | `oberonstaff.ticket.use` |
| `/ticket follow <#>` · `unfollow <#>` | | `oberonstaff.ticket.follow` |
| `/ticket thread <#> [page]` | `log`, `history` | `oberonstaff.ticket.use` |
| `/ticket notifications` | `/ticket notify` | `oberonstaff.ticket.use` |
| `/report [player]` | | `oberonstaff.report.use` |

Following somebody else's ticket ships **switched off** (`Tickets.Watchers.Allow-Player-Follow`).

`/report` tab-completes the player name, and works with no name at all — the wizard asks who instead. `/ticket thread` prints the [whole conversation](/plugins/oberonstaff/features/conversation/), newest first, with clickable paging.

## Ticket desk — staff

| Command | Default alias | Granular permission |
|---|---|---|
| `/tickets` — support queue | `/ta` | `oberonstaff.ticket.admin` |
| `/reports` — report queue | `/ra` | `oberonstaff.report.admin` |
| `/tickets claim <#>` · `unclaim <#>` | | `oberonstaff.ticket.claim` / `.unclaim` |
| `/tickets assign <#> <staff>` | | `oberonstaff.ticket.assign` |
| `/tickets priority <#> <low\|normal\|high\|urgent>` | | `oberonstaff.ticket.priority` |
| `/tickets note <#> <text>` | | `oberonstaff.ticket.note` |
| `/tickets reply <#> <message\|!macro>` | | `oberonstaff.ticket.reply` |
| `/tickets category <#> <category>` | | `oberonstaff.ticket.category` |
| `/tickets close <#> [reason]` · `reopen <#>` | | `oberonstaff.ticket.close` / `.reopen` |
| `/tickets tp <#>` | | `oberonstaff.ticket.teleport` |
| `/tickets view <#>` | | `oberonstaff.ticket.admin` |
| `/tickets thread <#> [page]` | `log`, `history` | `oberonstaff.ticket.admin` |
| `/tickets punish <#> [action]` | | `oberonstaff.report.punish` |
| `/tickets stats [player] [window]` | | `oberonstaff.ticket.stats` |

`/tickets stats` opens the [leaderboard](/plugins/oberonstaff/features/statistics/); the window is `today`, `week`, `month` or `all`. Naming a player prints their row in chat instead.

`/tickets reply 43 !rules` expands a macro from `Tickets.Canned-Replies`. A word that is not a macro is sent as typed.

### Two bundle nodes

Give your staff group these and you are done:

```
oberonstaff.ticket.staff
oberonstaff.report.staff
```

### Console only

`/oberonstaff-flag <player> <check> <violations>` is the [anticheat bridge](/plugins/oberonstaff/features/reports/#the-command-bridge). It refuses anything that is not the console — checked on the sender itself, not on a permission — so no node can be misconfigured into letting a player fake anticheat flags against somebody. It is silent to players and never tab-completes.

### Per-category notifications

`oberonstaff.ticket.notify.<category>` is only consulted for staff who turned on "my categories only" in `/ticket notifications`. By default everybody with `oberonstaff.ticket.admin` hears about every category, so most servers never grant these — see [Notifications](/plugins/oberonstaff/features/notifications/#my-categories-only).

Each is a parent of every granular node above. The granular ones exist so that the day you want a trial rank that can claim and reply but not close, it is a permission change rather than a plugin change.

:::note
A player **without** `oberonstaff.ticket.admin` who types `/tickets` is sent to their own hub instead of being refused — the same menu `/ticket` opens.
:::

## Admin command

`/oberonstaff`, aliases `/ostaff` and `/os`. Everything under it needs `oberonstaff.admin`.

| Command | Description |
|---|---|
| `/oberonstaff` | Show the usage list. |
| `/oberonstaff reload` | Reload `config.yml` and `messages.yml`. |
| `/oberonstaff status` | Active integrations and current usage. |
| `/oberonstaff log [player] [page] [filters]` | Staff teleports, ten to a page. See [Paged logs](#paged-logs). |

### `status` is the one to run first

```
Vanish: PremiumVanish (enabled: yes, 6 level(s))
» Preferences stored in database, action log on
» Staff chat on for 2, teleports blocked by 1
```

**`Vanish: none`** on a server that runs a vanish plugin means the integration did not take — and that looks exactly like it working until somebody vanishes.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `oberonstaff.admin` | op | `/oberonstaff` and all subcommands. |
| `oberonstaff.staffchat` | op | Send **and receive** staff chat. |
| `oberonstaff.teleport` | op | `/tp` and `/tphere`. |
| `oberonstaff.teleport.override` | op | `/tpo`, `/tpohere`, and reaching players with `/tptoggle` on. |
| `oberonstaff.tptoggle` | op | `/tptoggle`. |
| `oberonstaff.back` | op | `/back`. |
| `oberonstaff.*` | op | Everything above. |

## Partial names

Any command taking a player accepts the start of a name:

```
/tp elz        →  elz1one
```

An exact name always wins, so somebody called `el` stays reachable while `elz1one` is online. If the fragment
matches more than one player it is refused and the candidates are named:

```
'elz' matches several players: elz1one, elzabeth
```

Guessing would be worse than asking for one more letter — on a teleport it means moving the wrong person, and
nobody would notice.

## A command is red, or will not tab-complete

Two different causes, and they look identical in game.

**They do not hold the permission.** The server sends each player a command list filtered by permission, so a
command they cannot run is red and suggests nothing. It is invisible to an owner: op holds everything, so
everything is white. Check with the player's own account, not yours:

```
/lp user <staff> permission check oberonstaff.teleport
```

The nodes are op-only by default — a staff group needs them granted explicitly. `/tp` and `/tphere` are one node,
`oberonstaff.teleport`; missing it means both go red.

**Another plugin owns the name.** Then the command still runs when typed in full, but the other plugin answers its
tab completion. The console says so at startup, and:

```
/oberonstaff status
```

lists who owns each name right now:

```
/tphere -> Essentials
/tp     -> OberonStaff
```

Fix it by giving ours a different `Name`, or by taking the name — see
[Command names](/plugins/oberonstaff/configuration/config/#command-names).

PremiumVanish's own `pv.see.*` nodes decide who can see whom. That plugin owns them; the ladder that reads them is in [`config.yml`](/plugins/oberonstaff/configuration/config/).

### Suggested setup

```
/lp group mod permission set oberonstaff.staffchat true
/lp group mod permission set oberonstaff.teleport true
/lp group mod permission set oberonstaff.tptoggle true
/lp group mod permission set oberonstaff.back true

/lp group admin permission set oberonstaff.teleport.override true
/lp group admin permission set oberonstaff.admin true
```

> **Keep `oberonstaff.teleport.override` narrow.** It is what lets somebody reach a staff member who has deliberately blocked teleports. Admins, not moderators.

### Keeping your existing nodes

If your staff are already permissioned with `teleport.use` and `staffchat.use` from the old script, keep those instead of re-permissioning everyone:

```yaml
Commands:
  tp:        { Permission: "teleport.use" }
  tphere:    { Permission: "teleport.use" }
  staffchat: { Permission: "staffchat.use" }
Staff-Chat:
  Permission: "staffchat.use"
```

Note `Staff-Chat.Permission` as well as the command's — the first decides who **receives** staff chat, the second who can run the command.

## Overlapping with EssentialsX

Two plugins registering `/tp` means load order decides which wins. Switch ours off:

```yaml
Commands:
  tp:      { Enabled: false }
  tphere:  { Enabled: false }
  back:    { Enabled: false }
```

Or rename ours (`Name: stp`). Either way, restart.

## Tab completion

Every command's player arguments tab-complete — with vanished players stripped out, along with every other command's suggestions on the server. See [Vanish](/plugins/oberonstaff/features/vanish/).

## Paged logs

`/oberonstaff log` prints one page at a time rather than a wall of text. Under the list is a footer you click:

```
  « Prev   Page 2/7   Next »
```

Clicking re-runs the command for that page — so the buttons keep working after a relog, and after a reload. You
can also just type the number:

```
/oberonstaff log 3
/oberonstaff log Steve 2
```

### Narrowing it

Paging through a month of entries to find one is not much better than scrolling. Three flags cut the list down,
and they combine:

| Flag | What it takes | Example |
|---|---|---|
| `--since` | how far back, or a date | `--since 7d`, `--since 2026-08-01` |
| `--until` | the other end of the window | `--until 24h`, `--until 2026-08-05 18:00` |
| `--find` | text to look for | `--find discord.gg` |

```
/oberonstaff log Steve --since 7d --find tphere
```

Times are relative (`30m` `6h` `7d` `2w`) or absolute (`2026-08-01`, `2026-08-01 14:30`, server time). `--find`
is case-insensitive and matches the staff member, the action and the target.

The filters survive a page turn — clicking Next keeps whatever you narrowed to, so page two is page two of the
same list.

A flag it cannot read is refused outright rather than quietly ignored:

```
Could not read that filter: --since yesterday
   try --since 7d, --until 2026-08-01 or --find text
```

That is deliberate. Reading a full log while believing it was filtered is the one outcome worth stopping.

### Page size

`Log-Page-Size` in `config.yml`, ten by default — chat holds about twenty lines. Capped at 50 whatever you put
there. The Prev/Next wording lives under `paging` in `messages.yml` and can be reworded or translated like
everything else.
