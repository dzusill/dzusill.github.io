---
title: "FAQ & Troubleshooting"
description: "The gradient shows as a few basic colors, not a smooth gradient."
---

**The gradient shows as a few basic colors, not a smooth gradient.**
That's hex being downsampled to the 16 legacy colors somewhere. dNicks renders its own surfaces with true hex, so check that the message you're looking at is dNicks' — a *different* chat/scoreboard plugin reading `%dnicks_name%` will get faithful §-hex, but a plugin that strips hex will flatten it. For dNicks' built-in chat/tab/nametag this is already correct.

**The nick doesn't show in the tab list.**
You have `surfaces.tablist: false` but no TAB plugin to render it. Set `tablist: true` (the default) and `/dnicks reload`. If you *do* run TAB, keep `false` and use `customtabname: "%dnicks_name%"`. See [Integrations](/plugins/dnicks/integrations/).

**Chat shows the plain name / another plugin's format.**
Another chat plugin is winning. dNicks runs at `HIGHEST`; if something also sits at `HIGHEST` and loads after dNicks, set `surfaces.chat: false` and feed that plugin `%dnicks_name%` instead.

**The floating nametag isn't a gradient (or there are two names).**
If the TAB plugin is installed, disable its nametag feature — both plugins can't own the scoreboard team. See [The Floating Nametag](/plugins/dnicks/features/nametag/).

**A player can't use a color or gradient.**
Colors are permission-gated. Grant `dnicks.gradient`, `dnicks.color.*`, `dnicks.color.hex`, `dnicks.format` as needed. See [Commands & Permissions](/plugins/dnicks/commands-and-permissions/).

**`<click>` / `<hover>` in a nick is rejected.**
By design — those tags are blocked so a player can't make their name run commands or show fake tooltips. See [Gradient & Color Nicks](/plugins/dnicks/features/gradient-nicks/#safety).

**Do players need a mod or resource pack?**
No. Everything uses vanilla hex colors and a vanilla `TextDisplay`. Any 1.21 client works.

**`/nick &7Name` doesn't color.**
dNicks uses MiniMessage, not legacy `&` codes. Use `/nick <gray>Name` instead.

**Does it work on Spigot?**
No — dNicks needs Paper (the chat renderer and `TextDisplay` are Paper APIs).
