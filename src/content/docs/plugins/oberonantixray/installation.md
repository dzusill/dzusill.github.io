---
title: "Installation"
description: "Installing OberonAntiXray, or switching to it from the original raytraced-antixray jars."
---

## Requirements

- Paper 26.3.
- All four jars from the release: `OberonAntiXray.jar`, `raytraced-entity-culling.jar`, `raytraced-tile-culling.jar`,
  `fairy-lib-plugin.jar`.
- Vulcan works without any change. `ignore-ids-over-0` can stay `false`.

## Updating to a new Oberon build

1. Stop the server.
2. Replace the four jars in `plugins/`. Keep the old ones somewhere outside `plugins/` in case you need to roll back.
3. Start the server. A full restart is required; do not load it with PlugMan.

Configs stay as they are; no new keys are needed.

## Switching from the original jars

1. Stop the server.
2. Remove `raytraced-antixray.jar` and put in the four Oberon jars.
3. Rename the folder `plugins/raytraced-antixray/` to `plugins/OberonAntiXray/`. The culling folders keep their names.
4. Check `plugins/OberonAntiXray/config/<world>.yml` has `enabled: true` for every world you want protected.
5. Start the server.

## Checking it loaded

The console should show:

```
[OberonAntiXray] Enabling OberonAntiXray v0.24.0beta-oberon3
Configuration 'plugins/OberonAntiXray/config/<world>.yml' was loaded for world '<world>'
```

and no `[Vulcan] ... was kicked for sending an invalid confirmation packet` when players join.

## Rollback

Stop the server, put the previous jars back, start it again. The config folder works with both.
