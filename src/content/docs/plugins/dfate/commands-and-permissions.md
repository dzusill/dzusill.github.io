---
title: "Commands & Permissions"
description: "One command and its subcommands. Aliases: /dfate."
---

One command and its subcommands. Aliases: `/dfate`.

Commands are registered at runtime through DzusillCore's `CommandRegistry` — there is no `commands:` block in `plugin.yml`, so nothing to clash with another plugin's `plugin.yml` entry.

## Commands

| Command | Permission | What it does |
|---|---|---|
| `/fate` | `dfate.info` | Your own status, as a dialog screen. |
| `/fate info [player]` | `dfate.info` (+ `dfate.info.others`) | Status in chat. Works from console and for offline players. |
| `/fate choose <mode>` | `dfate.choose` | Step up from normal to hardcore or lifesteal. Confirms first. One-way. |
| `/fate confirm` / `/fate decline` | `dfate.choose` | Answers a confirmation drawn in chat. Only used by `Choice.Screen: CHAT`. |
| `/fate set <player> <mode>` | `dfate.admin` | Change anyone's mode. |
| `/fate reset <player>` | `dfate.admin` | Erase their choice so they are asked again. |
| `/fate reload` | `dfate.admin` | Re-read `config.yml` and `messages.yml`. |
| `/fate diag [player]` | `dfate.admin` | Why the plugin is doing what it is doing. |

### `/fate`

Opens your status as a dialog — mode, hardcore deaths, and how long ago you chose. On a client too old for dialogs it arrives as chat, which is what the text would have been anyway.

**Run by a player who has not chosen yet, it reopens the choice screen instead.** There is no status to show them, and this is the command the "you closed the screen" notice tells them to run. It is on the locked player's allow-list for exactly that reason. An already-open screen is left alone, so typing it repeatedly cannot stack dialogs.

### `/fate info [player]`

Chat output rather than a dialog, because this one has to work from the console and for offline targets. Without a player argument it reports on you; with one it needs `dfate.info.others`.

When the mode was set by an admin rather than chosen, an extra line says so. "He says he never picked hardcore" has two possible answers, and this is the one the record can settle.

### `/fate choose <mode>`

Two different situations behind one command.

**A player who has never chosen** may pick any offered mode, `normal` included. This is their first choice, so neither `Allow-Opt-In-Later` nor the one-way rule applies — those exist to stop someone walking a decision back, and there is no decision yet. It is the route that works when the screen does not: a dialog can fail to render, and then the command is the only way in. An irreversible mode still shows its confirmation.

**A player who already chose** is opting in later, and the old rules hold: `hardcore` and `lifesteal` only, never back down to `normal`. Refused with an explanation when `Choice.Allow-Opt-In-Later: false`, when they are already in that mode, or when the mode is not offered on this server.

### `/fate set <player> <mode>`

The single escape hatch from a permanent choice.

```
/fate set Steve normal
```

- Stores the new mode and marks the record as admin-set.
- If the player is online, releases them from the choice lock (they may have been sitting on the screen) and tells them their mode changed.
- **Resizes their health bar** to match: a fresh lifesteal run, or the vanilla ten hearts for anyone moved off it. Without this, a player rescued off lifesteal would keep the two-heart bar that got them banned — the mode changed and the punishment stayed. Note the vanilla ten, not `Starting-Hearts`: a server running five-heart lifesteal still owes a rescued player the twenty health the rest of the game assumes.
- If the new mode is `normal` and `Ban.Unban-On-Set-Normal: true`, dispatches the unban command **and** sweeps the server's own ban list — an earlier fallback ban would otherwise keep a pardoned player locked out.
- Setting the mode someone already has changes nothing and says so, rather than silently restarting their grace period.

Works on offline players. Tab-completes both arguments.

### `/fate reset <player>`

Un-asks the question.

```
/fate reset Steve
```

The difference from `/fate set Steve normal` is the whole reason both exist. Setting someone to normal **answers** for them; reset **erases the answer**, so the choice screen comes back and the next decision is theirs again. That is what you want for a player who misclicked in their first minute, and for a season wipe.

- Erases the record entirely — mode, hardcore death count, lifesteal hearts, the admin-set flag.
- **Clears the ban unconditionally**, unlike `/fate set`, which honours `Ban.Unban-On-Set-Normal`. There is no mode left to justify a ban, and a reset player who stays locked out cannot answer the screen the reset just queued for them.
- If they are online: puts the health bar back to vanilla ten hearts, tells them, re-locks them and shows the screen straight away — without waiting for `Ask-Existing-Players` or `Choice.Enabled`, which are join-time filters and would otherwise quietly refuse the command an admin just typed.
- Resetting someone who never chose says so rather than doing nothing in silence.

The death count going with the record is deliberate. A fresh run that inherited its predecessor's deaths would ban on the first mistake.

Works on offline players.

### `/fate confirm` and `/fate decline`

Only reachable with `Choice.Screen: CHAT`, where they are what the clickable `[ I accept my fate ]` and `[ Take me back ]` answers run. A dialog and a chest menu carry their own buttons and never need these.

Neither takes an argument, and that is the safety property rather than an omission: what is being confirmed lives in the plugin, not in the command, so typing `/fate confirm` with nothing waiting confirms nothing. There is no string a player can send that grants them a mode they were never offered.

### `/fate diag [player]`

The first thing to run when something looks wrong. Takes a player argument so it works from the console, which is where an admin testing with `/kill` already is.

```
attribute resolved: true (route: RegistryAccess)
lifesteal offered: true
enforce every: 40 ticks
loss per death: 1 (flat)
ignored causes: []
grace period: 0s
world filter: BLACKLIST []
player: Steve
became this mode: 53s ago
your mode: LIFESTEAL
stored hearts: 8
bar reports: 8 hearts (base value)
current health: 16.0 / 16 (health / base max, in half-hearts)
max effective: 16.0
modifiers: 0
bypass permission: false
```

Read it as a chain, top to bottom — the first line that disagrees with what you expect is the answer:

- **`attribute resolved: false`** — the mode is not offered at all on this server version. Nothing else matters.
- **`grace period` vs `became this mode`** — a death inside the grace window costs nothing. Note that `/fate set` restarts that clock, which makes it easy to catch yourself out while testing.
- **`bypass permission: true`** — that account is exempt. Check LuckPerms and their op state.
- **`stored hearts` ≠ `bar reports`** — the plugin's count and the server's attribute disagree; something else owns the attribute.
- **`stored hearts` = `bar reports` but the player sees a full bar** — server and plugin agree and the *client* is stale. Rejoining resyncs it; if it happens repeatedly, that is a bug worth reporting.
- **`current health` above `max effective`** — the client draws hearts from health, so it shows a full bar whatever the maximum says.
- **`modifiers` above 0** — something is adding to the maximum on top of the base value.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `dfate.admin` | op | `/fate set`, `/fate reset`, `/fate reload`, `/fate diag` |
| `dfate.info` | everyone | `/fate`, `/fate info` on yourself |
| `dfate.info.others` | op | `/fate info <player>` |
| `dfate.choose` | everyone | `/fate choose`, `/fate confirm`, `/fate decline` |
| `dfate.bypass` | **nobody** | Hardcore deaths never cost the holder their account |

### About `dfate.bypass`

It is deliberately **not** part of the `dfate.*` wildcard. A blanket `dfate.*` grant to your admin group would otherwise quietly exempt the people moderating hardcore from hardcore itself — and nothing in game would show it until someone noticed an admin dying without consequence.

Grant it explicitly, to the accounts that need it:

```
/lp group admin permission set dfate.bypass true
```

It can be ignored entirely with `Death.Filters.Honour-Bypass-Permission: false`.
