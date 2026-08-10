---
title: "Installation"
description: "Drop DzusillCore.jar and OberonMob.jar into plugins/ and restart. /mob and /phantoms work immediately."
---

## 1. Drop in both jars

`plugins/` needs **two** files:

```
plugins/
├── DzusillCore.jar     # 1.5.0 or newer — the framework
└── OberonMob.jar
```

Restart the server. Reloading with `/reload` is not supported and will not register the commands properly.

## 2. What gets created

On first start:

```
plugins/OberonMob/
├── config.yml      # the toggles, hide-mode tuning, feedback
├── messages.yml    # everything a player sees
├── database.yml    # where toggles are stored
└── data.mv.db      # the embedded database itself
```

Two toggles ship ready to use: `/mob` and `/phantoms`.

## 3. Verify

```
/oberonmob status
```

```
2 toggle(s), stored in database:
» mobs (/mob) | CANCEL_SPAWN | 256 blocks | 74 entities | you: on | 0 off
» phantoms (/phantoms) | CANCEL_SPAWN | 256 blocks | 1 entities | you: on | 0 off
```

**The entity count is the useful number.** It is the quickest way to see that your group tokens and exclusions did what you expected. If `mobs` shows `1 entities`, something in your `Entities` list is misspelled — check the console for `Unknown entity or group`.

Then try it:

```
/mob
```

You should get an action bar saying **Mob Spawns » Disabled** and a confirmation sound.

## 4. Permissions

Both shipped toggles default to `true`, so every player can use them straight away. The admin command does not:

```
/lp group admin permission set oberonmob.admin true
```

Full list on [Commands & Permissions](/plugins/oberonmob/commands-and-permissions/).

## 5. Configure

Edit [`config.yml`](/plugins/oberonmob/configuration/config/), then:

```
/oberonmob reload
```

> **Adding or removing a toggle needs a restart.** Its command is registered with the server at startup. Everything else — radius, mode, entity lists, spawn reasons — applies on reload. The reload message tells you when a restart is needed.

Next: the [Quick Start](/plugins/oberonmob/getting-started/quick-start/).
