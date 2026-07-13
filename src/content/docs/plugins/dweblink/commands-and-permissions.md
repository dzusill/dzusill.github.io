---
title: "Commands & Permissions"
description: "dWebLink's in-game commands — /verify (website login) and /linkdiscord — and their permissions."
---

dWebLink is deliberately tiny in game — two commands. Everything else happens on the website and Discord.

## Commands

| Command | Aliases | Description |
|---|---|---|
| `/verify <code>` | — | Confirms the login code you got by entering your nickname on the website. On success the website logs you in. Also refreshes your rank on the site. |
| `/linkdiscord` | `/discordlink` | Generates a one-time code to link your Discord — run `/link <code>` with the bot in Discord to finish. Works without the website (creates your account if needed). |

- Player-only (they need your account's UUID).
- `/verify` abuse is throttled by the API: **3 wrong codes** (or too many code requests) lock the nickname for ~15 minutes. `/linkdiscord` is subject to the plugin's `cooldown-seconds` (default 30s).

## Permissions

| Permission | Default | Grants |
|---|---|---|
| `dweblink.verify` | `true` | Allows confirming a website login code with `/verify`. |
| `dweblink.linkdiscord` | `true` | Allows generating a Discord-link code with `/linkdiscord`. |

Both default to **true** so any player can link. To restrict (e.g. to a rank), set the permission to `false` for the default group in LuckPerms and grant it where you want:

```
/lp group default permission set dweblink.verify false
/lp group member permission set dweblink.verify true
```
