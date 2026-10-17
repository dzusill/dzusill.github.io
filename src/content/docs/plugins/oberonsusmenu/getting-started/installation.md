---
title: "Installation"
description: "Set debug.fake-flags: true in config.yml, run /sus reload, then:"
---

1. Put **OberonCore** (1.14.4 or newer) and **OberonSusMenu.jar** into `plugins/`. Add Vulcan, LiteBans, PremiumVanish, ViaVersion and Floodgate if you use them.
2. Restart the server. OberonSusMenu creates `plugins/OberonSusMenu/` with:
   - `config.yml`, `score.yml`, `clients.yml`, `reasons.yml`, `messages.yml`, `database.yml`
   - `gui/` with one file per menu
3. Check the console. You should see `Listening to Vulcan flags.` If Vulcan is missing you get a warning instead, and only client detections are recorded.
4. Give staff their permissions (see [Permissions](/plugins/oberonsusmenu/reference/permissions/)). Every node defaults to op. Punishments run as the staff member, so LiteBans checks its own permissions too.
5. Type `/sus`.

## Trying it without a cheater

Set `debug.fake-flags: true` in `config.yml`, run `/sus reload`, then:

```
/sus debug <player> Reach combat 10
/sus debug <player> Aim combat 10
```

Repeat these a few times. The player appears in `/sus`, their score rises, and from MEDIUM a case opens and staff with `oberonsusmenu.alerts` get a silent alert. Turn `fake-flags` off again afterwards.

## Updating

Replace the jar and restart. New config keys are added to your files automatically; your own values, comments and order are kept. Entries you deleted from shipped lists, such as a click binding or a Discord event, come back on restart. To switch one off, set a click to `NONE` or an event to `enabled: false` instead. Client rules are the exception: a deleted rule stays deleted.

## Discord

Discord is off until you paste a webhook URL into `config.yml`. It takes about a minute; see [Discord](/plugins/oberonsusmenu/features/discord/).
