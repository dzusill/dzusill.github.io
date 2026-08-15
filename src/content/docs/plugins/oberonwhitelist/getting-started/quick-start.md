---
title: "Quick Start"
description: "A working whitelist in ten minutes: one rank, then the rest, then the menus, then strict enforcement."
---

The safe order is: get one rank right, add the others, fix the menus, and only then turn enforcement up. Each step below leaves the server in a working state.

## 1. Start loose, so nobody is locked out

```yaml
enforcement:
  mode: tab-only
```

In `tab-only`, tab completion is already filtered by rank, but a command typed anyway still runs. Players see the tidied list; nothing breaks while you work.

## 2. Define your lowest rank

Everything else inherits from it, so this is the list that matters most:

```yaml
groups:
  default:
    priority: 0
    commands:
      - /help
      - /spawn
      - /home
      - /sethome
      - /msg
      - /r
      - /tpa
      - /tpaccept
      - /shop
      - /rules
```

You do not need to list aliases. Granting `/msg` covers `/tell`, `/w` and `/essentials:msg`, because they are all the same command — see [Command Identity](/plugins/oberonwhitelist/features/command-identity/).

## 3. Build the ranks on top

Each rank lists only what it *adds*:

```yaml
  mod:
    priority: 10
    extends: default
    commands:
      - /kick
      - /mute
      - /vanish
      - /invsee

  admin:
    priority: 20
    extends: mod
    commands:
      - /ban
      - /give
      - /speed
```

Then assign them. Either grant `oberonwhitelist.group.mod`, or — with LuckPerms installed — name your groups the same as your LuckPerms groups and they resolve on their own.

```
/obw reload
/obw groups
```

## 4. Check it from a player's seat

```
/obw check <player> /ban
```

The trace shows the typed label, the command it resolved to, the player's rank, the tier, and the verdict. It is the fastest way to answer "why can't they use this" without reading the config.

## 5. Fix the menus *before* going strict

If you run DialogMaster, DeluxeMenus, ChestCommands or anything with clickable buttons:

```
/obw scan-dialogs
```

It reads the menu plugin's config and prints exactly what to paste into `execute-only`:

```yaml
execute-only:
  - /menu
  - /coinshop
  - /daily
  - /pay*
  - /velocity:callback
```

Read the output carefully — it separates commands that are safe to add from commands that belong to a higher rank and must **not** be added. See [Menu & Dialog Plugins](/plugins/oberonwhitelist/features/menu-plugins/).

## 6. Turn enforcement up

```yaml
enforcement:
  mode: strict

debug:
  log-blocked: true
```

```
/obw reload
```

Leave `log-blocked` on for the first week. Every command a player tries and cannot run is logged, so anything the scan missed shows up as a console line instead of a support ticket.

Give your staff `oberonwhitelist.notify` and they will see blocked attempts in chat as they happen.

:::note[You are not about to lock yourself out]
Operators bypass the whitelist by default, and the console is never filtered at all. If a rank list turns out wrong, you can still fix it from either.

Staff who are not operators should get `oberonwhitelist.bypass` — grant it directly rather than relying on the `oberonwhitelist.*` wildcard, which LuckPerms does not necessarily pass on.
:::

## 7. Turn the noise back off

Once the log stays quiet:

```yaml
debug:
  log-blocked: false
```

Done. Players see only the commands their rank has, everything else answers `This command does not exist.`, and your menus work.
