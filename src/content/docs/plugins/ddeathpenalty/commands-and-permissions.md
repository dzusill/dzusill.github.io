---
title: "Commands & Permissions"
description: "Base command /deathpenalty, alias /dp."
---

## Commands

Base command `/deathpenalty`, alias `/dp`.

| Command | Permission | Description |
|---|---|---|
| `/dp` | — | Show usage. |
| `/dp reload` | `deathpenalty.reload` | Reload `config.yml` & `messages.yml`. |
| `/dp check [player]` | `deathpenalty.check` | Show death & money-lost stats (your own, or another player's). |

Commands are registered at runtime by DzusillCore — no `plugin.yml` entries.

## Permissions

| Node | Default | Grants |
|---|---|---|
| `deathpenalty.admin` | op | `reload` and `check` (parent of both). |
| `deathpenalty.reload` | op | Reload the configuration. |
| `deathpenalty.check` | op | View death-penalty stats. |
| `deathpenalty.exempt` | no one | Die with **no penalty** (shows the exempt message). Per-world: `deathpenalty.exempt.<world>`. |
| `deathpenalty.ignore` | no one | The plugin does **nothing** for this player. Per-world: `deathpenalty.ignore.<world>`. |
| `deathpenalty.group.<name>` | — | Match the player to the `groups.<name>` [profile](/plugins/ddeathpenalty/features/penalty-profiles/). |

### Suggested setup

```
# staff: manage + never penalised
/lp group staff permission set deathpenalty.admin true
/lp group staff permission set deathpenalty.ignore true

# VIPs get the lighter "vip" profile
/lp group vip permission set deathpenalty.group.vip true

# safe overworld spawn only
/lp group default permission set deathpenalty.exempt.spawn_world true
```

> `exempt` and `ignore` default to **no one**, so by default every player — **including OPs** — is penalised, unless you set `settings.ignore-ops: true`. See [Exemptions](/plugins/ddeathpenalty/features/exemptions/).
