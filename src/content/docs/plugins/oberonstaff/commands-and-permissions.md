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
