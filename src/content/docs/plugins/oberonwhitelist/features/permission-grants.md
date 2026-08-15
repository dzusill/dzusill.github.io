---
title: "Per-Player Perks"
description: "Let a command a player was given individually — a bought /fly, a temporary /hat — run and tab-complete, without inventing a rank for every purchasable perk."
---

Ranks cover what a whole group can do. Perks are the other half: a player buys `/fly`, wins `/hat` from a crate, or is given `/nick` for a week. The permission goes on **that player** in LuckPerms, and no rank mentions the command at all.

By default the whitelist would deny it — no rank grants it, so strict mode refuses. Worse, it would never be suggested either, so the player has no way to discover something they paid for.

`permission-grants` fixes both.

```yaml
permission-grants:
  enabled: true
  commands:
    - /fly
    - /hat
    - /nick
```

Now a player holding `essentials.fly` can run `/fly` and sees it in tab completion, whatever their rank. A player without it is exactly as restricted as before.

## How it decides

A command is granted this way when **all** of these hold:

1. `permission-grants.enabled` is `true`
2. the command is on `permission-grants.commands`, or that list is empty
3. the command **declares a permission of its own**
4. the player holds that permission

Point 3 is the one worth understanding. Bukkit treats a command with no permission as runnable by anyone, so if "has permission" counted for those, every unprotected command on the server would pass the whitelist the moment you turned this on. Commands without a permission are therefore never granted this way — only ranks and `execute-only` can allow them.

## Narrowing the list

Leaving `commands` empty allows **any** command whose permission the player holds:

```yaml
permission-grants:
  enabled: true
  commands: []
```

That is the loose setting, and it changes what the whitelist means: it stops being "these ranks may run these commands" and becomes "whatever your permissions allow, minus the block list". Fine if your permissions are already exactly what you want players to run — but then the ranks are doing little work.

Listing the perks you actually sell is the recommended shape:

```yaml
permission-grants:
  enabled: true
  commands:
    - /fly
    - /hat
```

A player who somehow holds `minecraft.command.gamemode` still cannot use `/gamemode`, because it is not a perk you sell. The whitelist keeps meaning something for everything outside that list.

## What still wins

**`blocked-commands` outranks it, always.** A command on the block list stays blocked even for a player holding its permission — the block list is the one place where an operator's word is final.

**A rank grant is still reported as a rank grant.** If the rank already grants the command, that is the reason `/obw check` gives, not the permission. The trace stays honest about *why* something ran, which matters when you are working out whether a perk is actually being used.

## Checking it

```
/obw check Steve /fly
```

```
Typed /fly, identity /fly
Group default, mode strict
Runs (PERMISSION_GRANTS)
Granted by the player's own permission essentials.fly, not by their rank.
Suggested in tab
```

`PERMISSION_GRANTS` tells you the perk is doing the work. If it says `NOT_IN_GROUP` instead, check in order: is the feature enabled, is the command on the list (or is the list empty), and does the command declare a permission at all.

:::note[Temporary perks work unchanged]
LuckPerms' temporary permissions need nothing special here. The check asks the server whether the player holds the permission *now*, so it stops granting the moment the permission expires — and because rank changes and permission edits both invalidate the cached answer immediately, the player does not have to rejoin for either to take effect.
:::

## When not to use it

If every command your players run is already covered by a rank, leave this off. It is a loosening, and an unused loosening is just a wider surface.

It also does not replace `execute-only`. A menu command has to run for players who hold no permission for it at all — see [Menu & Dialog Plugins](/plugins/oberonwhitelist/features/menu-plugins/).
