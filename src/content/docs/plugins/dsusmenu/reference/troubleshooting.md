---
title: "Troubleshooting"
description: "The list is empty."
---

**The list is empty.**
- Check the console for `Listening to Vulcan flags.` Without Vulcan, only client detections and `/sus debug` flags exist.
- Make sure the window covers the flags; use the clock button.
- The default status filter hides dismissed players.

**`/sus` says I don't have permission, but `/sus alerts` works.**
That is intended: the list needs `dsusmenu.open`, and every sub-command only needs its own node.

**A ban was "not applied".**
AdvancedBan refused it. You may lack its permission (in game, the command runs as you), or the player is exempt or already banned. Check the console and AdvancedBan's own message.

**Discord shows nothing.**
1. dPhalanx 1.3.0+ must be installed and connected (`/dphalanx status`).
2. The anti-cheat integration must be **on** in the Phalanx admin panel, with its channels set.
3. Run `/sus health` to see whether events are sent or dropped.

Events from a website outage are delivered once it is back.

**Discord buttons answer "not allowed".**
The member needs one of the configured staff roles **and** a linked Minecraft account with the action's permission. With no staff roles configured, nobody can use the buttons.

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
- Discord sent, dropped and last success,
- average processing time per flag and per menu.

Repeated errors are logged at most once a minute with a count.
