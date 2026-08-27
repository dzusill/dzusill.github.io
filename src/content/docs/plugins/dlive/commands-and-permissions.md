---
title: "Commands & Permissions"
description: "/live is player only."
---

## Player commands

| Command | Does | Permission |
|---|---|---|
| `/live <link>` | announce an approved stream link | `dlive.use` |
| `/live <platform>` | announce the link saved for that platform | `dlive.use` |
| `/live platform add <platform> <link>` | save a link | `dlive.use` |
| `/live platform edit <platform> <link>` | replace a saved link | `dlive.use` |
| `/live platform remove <platform>` | delete a saved link | `dlive.use` |
| `/live platform list` | show your saved links | `dlive.use` |
| `/live toggle` | opt in and out of receiving announcements | `dlive.toggle` |

`/live` is player only.

## Administration

| Command | Does | Permission |
|---|---|---|
| `/dlive help` | the admin command list | `dlive.admin` |
| `/dlive reload` | reload config and messages | `dlive.admin` |
| `/dlive stats [player]` | receiving state and lifetime statistics | `dlive.admin` |
| `/dlive history [player\|*] [page]` | browse stored announcements | `dlive.admin` |
| `/dlive block <domain\|url> <value>` | add a persistent block | `dlive.admin` |
| `/dlive unblock <domain\|url> <value>` | remove a database block | `dlive.admin` |
| `/dlive blocked [page]` | list config and database blocks | `dlive.admin` |

## Permissions

| Node | Grants | Default |
|---|---|---|
| `dlive.use` | announcing, and managing saved links | **`false`** |
| `dlive.toggle` | opting in and out of receiving | `true` |
| `dlive.admin` | the whole `/dlive` command | `op` |
| `dlive.cooldown.bypass` | skips cooldowns *and* duplicate protection | `op` |
| `dlive.*` | everything above | `op` |

### dlive.use is off by default

Deliberately. `/live` posts to every player on the server, so it is a permission you hand to the ranks
you trust rather than something every new player has. Nothing announces until you grant it:

```
lp group media permission set dlive.use true
```

### Cooldown tiers are your own nodes

Tiers in `config.yml` reference permission nodes you invent:

```yaml
cooldowns:
  tiers:
    media:
      permission: dlive.cooldown.media
      seconds: 15
```

`dlive.cooldown.media` is not predeclared — grant it like any other node. A player matching several
tiers gets the shortest time.

### dlive.cooldown.bypass skips more than the cooldown

It also skips duplicate protection, which means a holder can announce the same link repeatedly. Grant
it to staff accounts and testing ranks, not as part of a broad wildcard.
