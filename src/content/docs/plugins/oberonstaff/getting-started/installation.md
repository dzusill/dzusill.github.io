---
title: "Installation"
description: "Drop the jars in, check /oberonstaff status for the vanish integration, then decide what to do about overlapping /tp commands."
---

## 1. Drop in both jars

`plugins/` needs **two** files:

```
plugins/
├── DzusillCore.jar     # 1.5.0 or newer — the framework
└── OberonStaff.jar
```

Restart the server. Reloading with `/reload` is not supported and will not register the commands properly.

## 2. What gets created

On first start:

```
plugins/OberonStaff/
├── config.yml      # commands, staff chat format, ranks, vanish ladder, teleports
├── messages.yml    # everything a player sees
├── database.yml    # preferences and the action log
└── data.mv.db      # the embedded database itself
```

## 3. Check the vanish integration — do this first

```
/oberonstaff status
```

```
Vanish: PremiumVanish (enabled: yes, 6 level(s))
» Preferences stored in database, action log on
» Staff chat on for 0, teleports blocked by 0
```

**If the first line says `none`,** no vanish plugin was detected. On a server that runs one, that means the ladder is doing nothing — and it looks exactly like it working until somebody vanishes. See [Vanish](/plugins/oberonstaff/features/vanish/).

## 4. Deal with overlapping commands

If you already run EssentialsX or anything else providing `/tp`, `/tphere` or `/back`, **two plugins registering the same command means load order decides which wins** — and that is not something you want to leave to chance.

Pick one. To let the other plugin keep them:

```yaml
Commands:
  tp:     { Enabled: false }
  tphere: { Enabled: false }
  back:   { Enabled: false }
```

Or rename ours:

```yaml
Commands:
  tp: { Name: stp }
```

Either way, restart afterwards.

## 5. Permissions

Everything defaults to `op`. At minimum:

```
/lp group mod permission set oberonstaff.staffchat true
/lp group mod permission set oberonstaff.teleport true
/lp group mod permission set oberonstaff.tptoggle true
/lp group mod permission set oberonstaff.back true
/lp group admin permission set oberonstaff.teleport.override true
/lp group admin permission set oberonstaff.admin true
```

Full list on [Commands & Permissions](/plugins/oberonstaff/commands-and-permissions/).

## 6. Set up the ranks

The shipped `Ranks` list uses `group.owner`, `group.admin` and so on. If your permission plugin uses different node names, edit them — otherwise everybody shows as **Member** in staff chat.

```
/lp user <you> permission check group.admin
```

See [Ranks](/plugins/oberonstaff/features/ranks/).

## 7. Verify

```
/sc hello
```

You should see the staff chat line with your rank in it, and so should everybody else holding `oberonstaff.staffchat`.

Next: the [Quick Start](/plugins/oberonstaff/getting-started/quick-start/).
