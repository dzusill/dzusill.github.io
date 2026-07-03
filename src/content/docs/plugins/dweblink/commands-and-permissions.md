---
title: "Commands & Permissions"
description: "dWebLink's single command, /webtoken, and its permission dweblink.use."
---

dWebLink is deliberately tiny in game — one command. Everything else happens on the website and Discord.

## Commands

| Command | Aliases | Description |
|---|---|---|
| `/webtoken` | `/weblink` | Generates a one-time code to verify your account on the website. Also refreshes your rank on the site. |

- Player-only (it needs your account's UUID).
- Subject to `cooldown-seconds` (default 30s); a failed request clears the cooldown so you can retry.

## Permissions

| Permission | Default | Grants |
|---|---|---|
| `dweblink.use` | `true` | Allows generating a website verification code with `/webtoken`. |

`dweblink.use` defaults to **true** so any player can link. To restrict linking (e.g. to a rank), set it to `false` for the default group in LuckPerms and grant it where you want:

```
/lp group default permission set dweblink.use false
/lp group member permission set dweblink.use true
```
