---
title: "Installation"
description: "Set debug.fake-flags: true in config.yml, run /sus reload, then:"
---

1. Put **DzusillCore** (1.14.4 or newer) and **dSusMenu.jar** into `plugins/`. Add Vulcan, AdvancedBan, SimpleVanish, PlaceholderAPI, ViaVersion and dPhalanx if you use them.
2. Restart the server. dSusMenu creates `plugins/dSusMenu/` with:
   - `config.yml`, `score.yml`, `clients.yml`, `reasons.yml`, `messages.yml`, `database.yml`
   - `gui/` with one file per menu
3. Check the console. You should see `Listening to Vulcan flags.` If Vulcan is missing you get a warning instead, and only client detections are recorded.
4. Give staff their permissions (see [Permissions](/plugins/dsusmenu/reference/permissions/)). Every node defaults to op.
5. Type `/sus`.

## Trying it without a cheater

Set `debug.fake-flags: true` in `config.yml`, run `/sus reload`, then:

```
/sus debug <player> Reach combat 10
/sus debug <player> Aim combat 10
```

Repeat these a few times. The player appears in `/sus`, their score rises, and from MEDIUM a case opens and staff with `dsusmenu.alerts` get a silent alert. Turn `fake-flags` off again afterwards.

## Updating

Replace the jar and restart. New config keys are added to your files automatically; your own values, comments and order are kept. Entries you deleted from shipped lists, such as a click binding or a menu template, come back on restart. To switch one off, set it to `NONE` or edit it instead. Client rules are the exception: a deleted rule stays deleted.

## Discord

Discord needs [dPhalanx](/plugins/dphalanx/) 1.3.0+ on the server **and** the anti-cheat integration switched on in the Phalanx admin panel. See [Discord](/plugins/dsusmenu/features/discord/).
