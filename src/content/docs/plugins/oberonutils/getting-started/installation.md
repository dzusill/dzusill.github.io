---
title: "Installation"
description: "Drop in two jars, free up the commands, restart."
---

## 1. Install both jars

OberonUtils needs OberonCore. Put both in `plugins/`:

```
plugins/
├── OberonCore.jar
└── OberonUtils.jar
```

OberonCore is a separate plugin, not something bundled inside OberonUtils. If it is missing the
server logs an unknown-dependency error and OberonUtils never enables.

## 2. Free up the commands

This is the step that gets missed.

EssentialsX also registers `/spawn`, `/setspawn`, `/kill`, `/suicide`, `/warp`, `/setwarp` and
`/delwarp`. Two plugins cannot both own a command name — one wins, and which one is not something
you want decided by load order.

In `plugins/Essentials/config.yml`:

```yaml
disabled-commands:
  - spawn
  - setspawn
  - kill
  - suicide
  - warp
  - setwarp
  - delwarp
```

Only list the ones you want OberonUtils to handle. If you would rather keep Essentials' `/warp`,
leave `warp` out and disable the teleport module instead.

**spark** also registers `/ping`. If you run it and want OberonUtils' version, either disable
spark's or turn off the `ping` module here.

## 3. Restart

A restart, not a reload — command registration only happens at startup.

On first start these files are written to `plugins/OberonUtils/`:

| File | Holds |
|---|---|
| `config.yml` | Module switches and every behavioural setting |
| `messages.yml` | Every piece of text, and how each is delivered |
| `warps.yml` | Warps: position, name, cooldown, arrival effects |
| `spawn.yml` | The spawn point |
| `keyall.yml` | The drop timer and the weighted crate table |

## 4. Check what connected

```
/oberonutils hooks
```

One line per optional plugin. Anything showing as not installed means the feature that needs it is
skipped — see [Requirements](/plugins/oberonutils/getting-started/requirements/).

## 5. Set spawn and your warps

```
/setspawn
/setwarp hub
```

Tab completion, the warps list and the coloured names all read from `warps.yml`, so a warp created
this way works everywhere immediately.

Coming from Skript? Do not re-walk them — see
[Migrating from Skript](/plugins/oberonutils/getting-started/migrating-from-skript/).

## Applying changes later

```
/oberonutils reload
```

Rereads every config file and rebuilds module state. No restart needed unless you are turning a
module on or off, since that changes which commands are registered.
