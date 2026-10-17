---
title: "Troubleshooting"
description: "The list is empty."
---

**The list is empty.**
- Check the console for `Listening to Vulcan flags.` Without Vulcan, only client detections and `/sus debug` flags exist.
- Make sure the window covers the flags; use the clock button.
- The default status filter hides dismissed players.

**`/sus` says I don't have permission, but `/sus alerts` works.**
That is intended: the list needs `oberonsusmenu.open`, and every sub-command only needs its own node.

**A ban was "not applied".**
LiteBans refused it. You may lack its permission (the command runs as you), or the player is exempt or already punished. Check the console and LiteBans' own message.

**A punishment was announced to everyone.**
`punishments.silent` is off, or LiteBans is not installed: `-s` is only added for LiteBans.

**Teleport or spectate doesn't vanish me.**
Look for `Vanish for spectate/teleport:` in the console. `none` means PremiumVanish is not installed (or `vanish.premiumvanish` is `false`) and neither `vanish.enable-command` nor `vanish.fallback-hide` is set.

**Discord shows nothing.**
1. `discord.enabled: true` and a `webhook-url` in `config.yml`, then `/sus reload`. The console says `Discord webhook is on.`
2. Look for `Discord webhook failed: …` in the console. A 401, 403 or 404 means the webhook was deleted or the URL is wrong: create a new one.
3. Make sure the event is not `enabled: false` under `discord.events`, and that the case reached `reactions.discord` in `score.yml` (HIGH by default).
4. Run `/sus health` to see whether messages are sent or dropped.

**The role isn't pinged on CRITICAL.**
`discord.role-ping.role-id` must be the role's numeric ID (Developer Mode → Copy Role ID), not its name. Only events with `ping-role: true` ping it.

**A Bedrock player is in the list.**
That is intended: Bedrock players are marked, not excluded. Vulcan checks Bedrock clients differently, so read their flags with that in mind.

**A frozen player was kicked or banned, and nothing happened.**
That is intended: only a real logout counts as "logged out while frozen". A confirmed ban ends the freeze.

**The server stopped while I was spectating.**
Your position, game mode and vanish state are put back before the server saves your player data.

**`database.yml`: "type is not supported".**
Only H2 is supported. Set `type: H2`.

**`/sus health`**
Shows:
- flags per minute,
- dropped flags (a full queue means the database is too slow),
- database queue and errors,
- Discord webhook state, sent, dropped and last success,
- average processing time per flag and per menu.

Repeated errors are logged at most once a minute with a count.
