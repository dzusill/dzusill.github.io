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

**The screen looks like chat, not a dialog.** Either the server is older than 1.21.6, or the client is (protocol 771) — including a client behind a translating proxy. Both are handled; the chat fallback stores the mode identically. The startup log names the renderer that answered. See [Dialogs & Fallback](/plugins/dfate/features/dialogs-and-fallback/).

**Do I need dDialogs?** No. dFate renders the native screen itself. If dDialogs happens to be installed it takes over, because it registers at a higher service priority and is the dedicated implementation.

**The screen stopped reappearing.** After `Choice.Max-Reask-Attempts` retries (default 3) dFate stops pushing it, because a screen that never draws would otherwise be retried forever. The reminders keep coming and `/fate` always works. Raise the setting, or check why the dialog is not rendering.

**A player is frozen with no screen.** They are told in chat to run `/fate`, and the sweep puts it back within `Reask-Seconds` (default 10) anyway. If neither happens, `/fate set <player> normal` releases them immediately.

**The "you closed the screen" message never appears.** Check `Choice.Notify-On-Close: true`, and that `choice-closed` in `messages.yml` is not empty. It is deliberately silent when the player has already been given a mode — an admin running `/fate set` also closes the screen, and that is not the player closing it.

**They can walk away without answering.** `Choice.Lock.Enabled` is `false`, or `Freeze-Movement` is.

## Bans

**A hardcore player died and was not banned.** Run `/fate diag <player>` — it prints every filter and the player's state in one screen. If you would rather see it happen, set `Death.Log-Outcomes: true` and reproduce; each at-risk death then logs one line naming the filter responsible and its current value:

```
[dFate] Steve died as HARDCORE but was spared: CAUSE_EXEMPT
        (Death.Filters.Ignored-Causes=[VOID, KILL])
```

Turn it back off afterwards — on a busy PvP world it is a line per death. The usual culprits are `dfate.bypass` arriving through a `dfate.*` wildcard, `Ignored-Causes` containing the cause they died to, and a grace period that `/fate set` silently restarted while you were testing.

**`No plugin on this server provides /tempban`** — `Ban.Command` names a command nothing registers. Either install your ban plugin or point the setting at the right syntax. With `Fallback-To-Vanilla: true` the ban still lands, on the server's own ban list.

**`Ban.Duration '24hh' is not a duration I understand`** — fix the typo. Valid: `24h`, `1d12h`, `90m`, `1w`, `3600`. dFate refuses to guess, because banning someone for a length nobody configured is worse than not banning them.

**They were banned but stayed connected.** Only possible if the ban plugin did not kick them and dFate's own kick was skipped. Check the console for a `SEVERE` line from the ban attempt.

**The death title and broadcast never appear.** `Ban.Delay-Ticks: 0` bans instantly, disconnecting the client before either is drawn. Set it back to `40`.

## Lifesteal

**The bar goes back to full after respawning.** That was a real bug, fixed by hooking Paper's `PlayerPostRespawnEvent` instead of `PlayerRespawnEvent` — the latter fires *before* the player is actually respawned, so setting the attribute there races with the server's own health reset. If you still see it, check `Lifesteal.Enforce-Interval-Ticks` is not `0`; that sweep is what re-asserts the bar against anything else resizing it.

**Hearts come back on their own.** Something is resetting the max-health attribute — a kit plugin, a minigame, a world-reset plugin, or an `/attribute` command. The enforcement sweep corrects it within `Enforce-Interval-Ticks` (default 40 = 2 seconds). Set `Debug: true` to see the corrections logged.

**The count drops but the player still sees a full bar.** Run `/fate diag <player>`. If `stored hearts` and `bar reports` agree, the server is right and the *client* is stale — dFate forces a resync on every apply for exactly this reason, so rejoining will fix it and a repeat is worth reporting. If they disagree, something else owns the attribute; the `max effective` and `modifiers` lines say what.

**Lifesteal never appears on the choice screen.** Either `Lifesteal.Enabled: false`, or the max-health attribute could not be resolved on this server version — look for `Could not resolve the max-health attribute` in the startup log. The mode hides itself in that case rather than offering a permanent decision for a mechanic that cannot run.

**A player died on their last heart and was not banned, and kept the empty bar.** Working as intended for a failed ban. The refill is tied to the ban actually landing, not to the death — refilling on the death itself would hand a full bar to a player whose ban failed, so dying on your last heart would cost nothing. Fix `Ban.Command`; the console has a `SEVERE` line.

**Can players craft or earn hearts back?** No. There is no heart item, no revive, no top-up. The only things that change the count are dying, `/fate set`, and the reset after a ban.

**Does the killer steal a heart?** No — despite the name, only the victim loses one. There is no transfer, which also means no alt-farming.

**Upgrading an existing MySQL install.** Add the column by hand once: `ALTER TABLE dfate_modes ADD COLUMN hearts INT NOT NULL DEFAULT 0;`. PostgreSQL does it itself.

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
