---
title: "Commands & Permissions"
description: "Reference for the two OberonLive command roots, their player/console behavior, admin history and moderation subcommands, and permission defaults."
---

OberonLive registers exactly two command roots: `/live` and `/olive`.

## Player command

| Command | Permission | Description |
|---|---|---|
| `/live <link>` | `oberonlive.use` | Validate, store and announce a stream. Player only. |
| `/live toggle` | `oberonlive.toggle` | Toggle receiving other live announcements. Player only. |

The command intentionally checks these permissions separately. A server may let everyone opt out while only a media rank can publish.

## Administration

Every `/olive` subcommand requires `oberonlive.admin` and works from a player or the console.

| Command | Description |
|---|---|
| `/olive help` | Show the configured admin help lines. |
| `/olive reload` | Validate and replace runtime-safe config and messages. |
| `/olive stats [player]` | Show receiving state, lifetime count and last stream. |
| `/olive history [player\|*] [page]` | Show one player's history or all players. |
| `/olive block <domain\|url> <value>` | Save a persistent moderation block. |
| `/olive unblock <domain\|url> <value>` | Remove a database block. |
| `/olive blocked [page]` | List config and database blocks. |

For `stats`, an in-game sender with no argument targets themselves. The console must name a player. For `history`, an omitted target or `*` means global history.

## Declared permissions

| Node | Default | Grants |
|---|---|---|
| `oberonlive.use` | false | `/live <link>` |
| `oberonlive.toggle` | true | `/live toggle` |
| `oberonlive.admin` | op | `/olive` and every child |
| `oberonlive.cooldown.bypass` | op | Bypass cooldown and global duplicate protection |
| `oberonlive.*` | op | All four declared permissions |

## Custom cooldown nodes

Each entry under `cooldowns.tiers` names an ordinary permission chosen by the owner:

```yaml
cooldowns:
  tiers:
    partner:
      permission: oberonlive.cooldown.partner
      seconds: 5
```

```text
/lp group partner permission set oberonlive.cooldown.partner true
```

These dynamic nodes are not children of `oberonlive.*` unless the server owner makes them so in the permission manager. A player holding several configured tiers gets the shortest cooldown.

