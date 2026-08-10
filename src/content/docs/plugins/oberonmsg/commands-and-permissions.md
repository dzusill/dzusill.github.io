---
title: "Commands & Permissions"
description: "Six player commands and one admin command — every name and permission comes from the config."
---

Every name, alias and permission below is the **default**. All of them live in `config.yml` under `Commands` and can
be changed or switched off. Changing them needs a restart.

## Player commands

| Command | Default aliases | Default permission | Default |
|---|---|---|---|
| `/msg <player> <message>` | `message` `tell` `whisper` `w` `t` `dm` `pm` | `oberonmsg.message` | everyone |
| `/reply <message>` | `r` | `oberonmsg.message` | everyone |
| `/ignore [player]` | `block` | `oberonmsg.ignore` | everyone |
| `/unignore <player>` | `unblock` | `oberonmsg.ignore` | everyone |
| `/msgtoggle` | | `oberonmsg.msgtoggle` | everyone |
| `/socialspy` | `spy` | `oberonmsg.socialspy` | op |

`/ignore` with no argument lists who you are ignoring.

## Admin command

`/oberonmsg`, aliases `/omsg` and `/om`. Everything under it needs `oberonmsg.admin`.

| Command | Description |
|---|---|
| `/oberonmsg` | Show the usage list. |
| `/oberonmsg reload` | Reload `config.yml` and `messages.yml`. |
| `/oberonmsg status` | Active integrations and current usage. |
| `/oberonmsg log [player] [page] [filters]` | Private messages, ten to a page. See [Paged logs](#paged-logs). |

### `status` is the one to run first

```
Vanish: PremiumVanish (enabled: yes), AFK: EssentialsX
» Stored in database, message log off
» Messages off for 2, social spy on for 1
```

**`none` for either integration** means it is doing nothing — and that looks exactly like it working until somebody
vanishes or goes away.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `oberonmsg.message` | everyone | `/msg` and `/reply`. |
| `oberonmsg.ignore` | everyone | `/ignore` and `/unignore`. |
| `oberonmsg.msgtoggle` | everyone | `/msgtoggle`. |
| `oberonmsg.socialspy` | op | See other players' private messages. |
| `oberonmsg.admin` | op | `/oberonmsg` and all subcommands. |
| `oberonmsg.ignore.bypass` | false | Cannot be ignored; public chat never hidden. |
| `oberonmsg.message.bypass` | false | Reach players who have `/msgtoggle` on. |
| `oberonmsg.*` | op | Everything above. |

### The two bypasses

Both are for staff, and both are `false` by default including for ops.

```
/lp group mod permission set oberonmsg.ignore.bypass true
/lp group mod permission set oberonmsg.message.bypass true
```

> `oberonmsg.ignore.bypass` matters more than it looks. Without it, a player under investigation can silence the
> staff member handling their report with one `/ignore`.

Neither overrides *your own* ignore list — see [Ignore lists](/plugins/oberonmsg/features/ignore/).

## Overlapping with EssentialsX

Two plugins registering `/msg` means load order decides which wins. Switch ours off:

```yaml
Commands:
  msg:      { Enabled: false }
  reply:    { Enabled: false }
  ignore:   { Enabled: false }
  unignore: { Enabled: false }
```

Or rename ours. Either way, restart.

## Keeping your existing nodes

A server already permissioned with its own nodes keeps working:

```yaml
Commands:
  socialspy: { Permission: "socialspy.use" }
```

## Tab completion

Player arguments tab-complete, with vanished players stripped out — along with every other command's suggestions on
the server. See [Vanish & AFK](/plugins/oberonmsg/features/vanish-and-afk/).

## Paged logs

`/oberonmsg log` prints one page at a time rather than a wall of text. Under the list is a footer you click:

```
  « Prev   Page 2/7   Next »
```

Clicking re-runs the command for that page — so the buttons keep working after a relog, and after a reload. You
can also just type the number:

```
/oberonmsg log 3
/oberonmsg log Steve 2
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
/oberonmsg log Steve --since 7d --find discord
```

Times are relative (`30m` `6h` `7d` `2w`) or absolute (`2026-08-01`, `2026-08-01 14:30`, server time). `--find`
is case-insensitive and matches both names and the message itself.

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
