---
title: "Commands & Permissions"
description: "One command, four subcommands. Aliases: /dfate."
---

One command, four subcommands. Aliases: `/dfate`.

Commands are registered at runtime through DzusillCore's `CommandRegistry` — there is no `commands:` block in `plugin.yml`, so nothing to clash with another plugin's `plugin.yml` entry.

## Commands

| Command | Permission | What it does |
|---|---|---|
| `/fate` | `dfate.info` | Your own status, as a dialog screen. |
| `/fate info [player]` | `dfate.info` (+ `dfate.info.others`) | Status in chat. Works from console and for offline players. |
| `/fate choose hardcore` | `dfate.choose` | Step up from normal to hardcore. Confirms first. One-way. |
| `/fate set <player> <mode>` | `dfate.admin` | Change anyone's mode. |
| `/fate reload` | `dfate.admin` | Re-read `config.yml` and `messages.yml`. |

### `/fate`

Opens your status as a dialog — mode, hardcore deaths, and how long ago you chose. On a client too old for dialogs it arrives as chat, which is what the text would have been anyway.

Run by a player who has not chosen yet, it replies in chat instead. `/fate` is on the locked player's allow-list, so opening a status screen there would replace the choice screen they are supposed to be answering.

### `/fate info [player]`

Chat output rather than a dialog, because this one has to work from the console and for offline targets. Without a player argument it reports on you; with one it needs `dfate.info.others`.

When the mode was set by an admin rather than chosen, an extra line says so. "He says he never picked hardcore" has two possible answers, and this is the one the record can settle.

### `/fate choose <mode>`

Only `hardcore` is accepted. `/fate choose normal` is refused — nothing a player can run ever takes them out of hardcore.

Refused with an explanation when:

- `Choice.Allow-Opt-In-Later: false`,
- they are already hardcore,
- or they have not answered the join screen yet (a second screen would fight with it).

### `/fate set <player> <mode>`

The single escape hatch from a permanent choice.

```
/fate set Steve normal
```

- Stores the new mode and marks the record as admin-set.
- If the player is online, releases them from the choice lock (they may have been sitting on the screen) and tells them their mode changed.
- If the new mode is `normal` and `Ban.Unban-On-Set-Normal: true`, dispatches the unban command **and** sweeps the server's own ban list — an earlier fallback ban would otherwise keep a pardoned player locked out.
- Setting the mode someone already has changes nothing and says so, rather than silently restarting their grace period.

Works on offline players. Tab-completes both arguments.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `dfate.admin` | op | `/fate set`, `/fate reload` |
| `dfate.info` | everyone | `/fate`, `/fate info` on yourself |
| `dfate.info.others` | op | `/fate info <player>` |
| `dfate.choose` | everyone | `/fate choose hardcore` |
| `dfate.bypass` | **nobody** | Hardcore deaths never cost the holder their account |

### About `dfate.bypass`

It is deliberately **not** part of the `dfate.*` wildcard. A blanket `dfate.*` grant to your admin group would otherwise quietly exempt the people moderating hardcore from hardcore itself — and nothing in game would show it until someone noticed an admin dying without consequence.

Grant it explicitly, to the accounts that need it:

```
/lp group admin permission set dfate.bypass true
```

It can be ignored entirely with `Death.Filters.Honour-Bypass-Permission: false`.
