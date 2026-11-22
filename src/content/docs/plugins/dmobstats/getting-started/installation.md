---
title: "Installation"
description: "dMobStats will not enable without DzusillCore."
---

## 1. Drop in both jars

```
plugins/
├── DzusillCore.jar      <- required framework, 1.14.6 or newer
└── dMobStats.jar
```

dMobStats will not enable without DzusillCore.

## 2. Start the server

On first start the plugin creates:

```
plugins/dMobStats/
├── config.yml           main settings
├── gui.yml              admin GUI layouts and texts
├── messages.yml         every chat message
├── mobs/                one file per mob: zombie.yml, creeper.yml, wither_skeleton.yml ...
└── presets/
    └── hard.yml         a moderate "harder mobs" example, never applied on its own
```

Later, as you use the plugin, it also creates `backups/<mob>/` (a copy of a mob file before every GUI save or preset apply) and `logs/changes.log` (an audit line per changed key).

The console shows:

```
[dMobStats]
[dMobStats]   dMobStats v1.0.0
[dMobStats]   Powered by DzusillCore
[dMobStats]
```

## 3. Nothing changes yet

Every generated `mobs/<mob>.yml` has `enabled: false` and every value is `vanilla`, with the real vanilla number written next to it as a comment (read from your server version at run time). Until you enable a mob and set a value, dMobStats touches nothing.

Mob files are named after the mob's key: `zombie.yml`, `zombified_piglin.yml`, `wither_skeleton.yml`. A mob from another namespace is written `<namespace>_<key>.yml`.

## 4. Updating

A new plugin version adds any new keys to your mob files as `vanilla`. **Your values are never changed or removed**, and your comments stay. If a mob file is not valid YAML, that mob simply stays vanilla and the error is logged; fix the file and run `/dms reload`.
