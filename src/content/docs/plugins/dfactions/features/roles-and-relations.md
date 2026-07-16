---
title: "Roles & Relations"
description: "Factions have a rank hierarchy. Leaders and officers manage members:"
---

## Membership & ranks

Factions have a rank hierarchy. Leaders and officers manage members:

```
/f invite <player>      # invite (or /f join <faction> for open factions)
/f kick <player>
/f promote <player>     # raise one rank
/f demote <player>      # lower one rank
/f leader <player>      # transfer leadership
/f ban <player>         # ban from the faction (leader) — see below
/f unban <player>
```

Member cap is `factions.max-members` (default 50).

### Faction bans

`/f ban <player>` is **name-based and persistent**. Banning a current member kicks them; a banned
player cannot join (open **or** via invite) until `/f unban <player>` lifts it.

## Custom roles

Beyond the built-in ranks, factions can define custom roles with names, priorities and prefixes:

```
/f role list
/f role create <name>
/f role edit <name> ...
/f role delete <name>
/f role assign <player> <role>
```

Role defaults live in `roles.yml`. Role commands default to operator permission — grant
`factions.cmd.role.*` to open them up.

## Relations

Factions set a stance toward one another:

```
/f relation <ally|truce|enemy|neutral> <faction>
```

- **Ally** / **truce** are mutual — both sides must agree — and capped by `factions.max-allies` /
  `factions.max-truces`.
- **Enemy** enables hostile mechanics (e.g. declaring war).
- **Neutral** is the default.

Which relations show in `/f info` is configurable:

```yaml
factions:
  info:
    relations:
      show-allies: true
      show-truces: false
      show-neutrals: false
      show-enemies: false
```

## Merges

```yaml
factions:
  merge: { enabled: false }
```

```
/f merge send <faction>
/f merge accept <faction>
```

When enabled, two factions can combine into one by mutual request.
