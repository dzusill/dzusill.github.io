---
title: "FAQ & Troubleshooting"
description: "Unknown dependency DzusillCore — the core jar is missing from plugins/. It is a separate plugin, not shaded into dFate."
---

## The plugin will not enable

**`Unknown dependency DzusillCore`** — the core jar is missing from `plugins/`. It is a separate plugin, not shaded into dFate.

**`NoClassDefFoundError: me/dzusill/core/dialog/DialogService`** — your DzusillCore is too old. The dialog package arrived in 1.12.0; a server still on 1.3.x has none of it. Check with `/version DzusillCore` and update.

**`Could not load player modes — refusing to start with an empty cache`** — the storage backend failed. Deliberate: starting with an empty cache would treat every hardcore player on the server as unchosen. Fix the database connection (or the `modes.yml` permissions) and restart.

## The choice screen

**Nobody is asked anything.** Check `Choice.Enabled: true`. Then check whether they already have a record — `/fate info <player>` will say. A player is only ever asked once.

**Existing players are not asked.** `Choice.Ask-Existing-Players: false` files them as normal silently. Set it to `true`.

**The screen looks like chat, not a dialog.** Either dDialogs is not installed, or the client is older than 1.21.6 (protocol 771). Both are handled — the chat fallback stores the mode identically. See [Dialogs & Fallback](/plugins/dfate/features/dialogs-and-fallback/).

**A player is frozen with no screen.** Should self-heal within `Reask-Seconds` (default 10) — the sweep puts the screen back for any locked player whose dialog is gone. If it does not, `/fate set <player> normal` releases them immediately.

**They can walk away without answering.** `Choice.Lock.Enabled` is `false`, or `Freeze-Movement` is.

## Bans

**A hardcore player died and was not banned.** Turn on `Debug: true` and reproduce. The log names the exact reason:

```
[dFate] [debug] Steve died as hardcore but was spared: CAUSE_EXEMPT
```

Then check that filter in [Exemptions](/plugins/dfate/features/exemptions/). The usual culprits are `dfate.bypass` arriving through a `dfate.*` wildcard, and `Ignored-Causes` containing the cause they died to.

**`No plugin on this server provides /tempban`** — `Ban.Command` names a command nothing registers. Either install your ban plugin or point the setting at the right syntax. With `Fallback-To-Vanilla: true` the ban still lands, on the server's own ban list.

**`Ban.Duration '24hh' is not a duration I understand`** — fix the typo. Valid: `24h`, `1d12h`, `90m`, `1w`, `3600`. dFate refuses to guess, because banning someone for a length nobody configured is worse than not banning them.

**They were banned but stayed connected.** Only possible if the ban plugin did not kick them and dFate's own kick was skipped. Check the console for a `SEVERE` line from the ban attempt.

**The death title and broadcast never appear.** `Ban.Delay-Ticks: 0` bans instantly, disconnecting the client before either is drawn. Set it back to `40`.

## Modes

**A player says they never chose hardcore.** `/fate info <player>` — if an admin set it, an extra line says so.

**Someone is out of their ban and still hardcore.** Working as intended. Surviving a ban does not buy the mode back; that is what makes the choice permanent. Use `/fate set <player> normal` if you mean to release them.

**A player wants to switch back to normal.** Only an admin can do that. There is deliberately no player-facing route out of hardcore.

**`/fate choose normal` does nothing.** Correct — only `hardcore` is accepted.

**A mode disappeared.** An unreadable `Mode:` value in `modes.yml` drops that record, and the player is asked again on their next join. That is the safe failure: an unreadable mode is never silently read as normal, because that would quietly pardon a hardcore player. Never edit `modes.yml` with the server running.

## Networks

**The mode is different on each server.** Each server has its own `modes.yml`. Turn on `database.yml` and point every server at the same database. See [database.yml](/plugins/dfate/configuration/database/).

**They are banned on one server only.** That is your ban plugin's scope, not dFate's — dFate dispatches a command, and where that ban applies is up to whatever handles it. AdvancedBan and LiteBans both have network-wide modes.

## Placeholders

**`%dfate_mode%` shows the raw text.** PlaceholderAPI is not installed, or the expansion did not register. The console logs `Registered PlaceholderAPI expansion 'dfate'` on startup when it did.

**An unchosen player reads as `Unchosen`, not `Normal`.** Intended. Compare against `%dfate_mode_raw%` and handle all three values.
