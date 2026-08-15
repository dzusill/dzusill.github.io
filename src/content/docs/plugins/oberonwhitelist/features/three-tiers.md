---
title: "The Three Tiers"
description: "Visible, execute-only and blocked — why splitting 'runnable' from 'suggestable' is what makes strict enforcement usable alongside menu plugins."
---

Most command whitelists know two states: allowed, and blocked. That is one state too few, and every awkward thing about using them follows from it.

OberonWhitelist uses three.

| Tier | In tab | Runnable | Typical use |
|---|---|---|---|
| **Visible** | yes | yes | the commands a rank is given |
| **Execute-only** | no | yes | menu buttons, dialog callbacks, clickable messages |
| **Blocked** | no | no | everything else |

## Why two tiers is not enough

A menu plugin's button runs its command **as the player**. To the server there is no difference between a player typing `/coinshop` and a player clicking a button that runs `/coinshop`.

So with two states you must pick one:

* **Block it** — the button silently does nothing. Every menu on the server is broken.
* **Allow it** — the command appears in tab completion, players type it directly, and menus you built to be reached one way are reachable another.

Neither is what you want. What you want is *runnable but not suggestable*, and that is a state two-tier plugins cannot express. This is the entire reason strict modes elsewhere have a reputation for breaking servers.

## Visible

Commands listed in a rank's `commands:` block, plus everything it inherits through `extends`.

```yaml
groups:
  default:
    commands:
      - /home
      - /spawn
```

Suggested in tab completion, and runnable. The ordinary case.

## Execute-only

Listed once, globally — not per rank:

```yaml
execute-only:
  - /menu
  - /coinshop
  - /velocity:callback
```

Runnable by everyone, suggested to nobody. A button that runs `/coinshop` works; a player who types `/coinshop` gets the standard *this command does not exist* reply, and it does not appear while they type.

A trailing `*` matches by prefix, for buttons that build arguments at click time:

```yaml
  - /pay*      # covers /pay Steve 100, /payconfirm, …
```

`/obw scan-dialogs` generates this list from your menu plugin's config, rather than you writing it by hand — see [Menu & Dialog Plugins](/plugins/oberonwhitelist/features/menu-plugins/).

:::caution[Execute-only is not rank-aware]
It grants to **everyone**. Never put a command there that a rank is supposed to gate.

If your staff menu has a `/vanish` button, `/vanish` belongs in the `mod` rank, not in `execute-only` — otherwise every player on the server can run it by clicking. For ordinary players the button correctly does nothing; hide it from them in the menu plugin instead.

`/obw scan-dialogs` refuses to suggest such commands for exactly this reason, and warns about them separately.
:::

## Blocked

Two ways in:

**Listed explicitly** in `blocked-commands`. This outranks everything — a command stays blocked even if a rank grants it.

```yaml
blocked-commands:
  - /pl
  - /version
```

**Everything else**, when `enforcement.mode` is `strict`. Anything not granted by the rank and not in `execute-only` is denied.

Under `tab-only`, an unlisted command a player types anyway still runs, and only the explicit list stops execution. Tab completion is filtered identically in both modes — loosening execution never leaks the command list.

## The order of decisions

When a player runs a command, in this order:

1. **Bypass permission, or an operator** → allowed, nothing else is checked
2. **Explicitly blocked** → denied, even if a rank grants it
3. **No such command exists** → handed to the unknown-command path, which produces the same reply
4. **Execute-only** → allowed
5. **The rank grants it** → allowed
6. **The player holds the command's own permission** → allowed, when [per-player perks](/plugins/oberonwhitelist/features/permission-grants/) are enabled
7. **Otherwise** → denied under `strict`, allowed under `tab-only`

Explicit blocks sit above every allowance so an operator who lists a command means it. Execute-only sits above the rank check so menu callbacks survive strict enforcement. Both placements are what make the tiers behave the way the table above describes.

## Checking a tier

```
/obw check <player> /coinshop
```

```
Typed /coinshop, identity /coinshop
Group default, mode strict
Runs (EXECUTE_ONLY)
Not suggested in tab (EXECUTE_ONLY)
```
