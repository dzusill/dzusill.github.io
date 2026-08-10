---
title: "Installation"
description: "Drop the jars in, check /oberonmsg status for the integrations, then decide what to do about EssentialsX's /msg."
---

## 1. Drop in both jars

```
plugins/
├── DzusillCore.jar     # 1.5.0 or newer — the framework
└── OberonMSG.jar
```

Restart the server. `/reload` is not supported and will not register the commands properly.

## 2. What gets created

```
plugins/OberonMSG/
├── config.yml      # commands, the three message formats, reply timeout, sounds, vanish, logging
├── messages.yml    # every other string a player sees
├── database.yml    # ignore lists, preferences and the log
└── data.mv.db      # the embedded database itself
```

## 3. Check the integrations — do this first

```
/oberonmsg status
```

```
Vanish: PremiumVanish (enabled: yes), AFK: EssentialsX
» Stored in database, message log off
» Messages off for 0, social spy on for 0
```

**`none` for either integration** means it is doing nothing. On a server that runs PremiumVanish, that means vanished
players are reachable and appear in tab completion — and it looks exactly like it working until somebody vanishes.

## 4. Deal with overlapping commands

EssentialsX provides `/msg`, `/r`, `/ignore` and friends. **Two plugins registering the same command means load
order decides which wins**, which is not something to leave to chance.

To let Essentials keep them:

```yaml
Commands:
  msg:      { Enabled: false }
  reply:    { Enabled: false }
  ignore:   { Enabled: false }
  unignore: { Enabled: false }
```

Or rename ours. Either way, restart afterwards.

## 5. Permissions

Messaging and ignoring default to everyone; social spy and the admin command do not:

```
/lp group mod permission set oberonmsg.socialspy true
/lp group mod permission set oberonmsg.ignore.bypass true
/lp group admin permission set oberonmsg.admin true
```

Full list on [Commands & Permissions](/plugins/oberonmsg/commands-and-permissions/).

## 6. Verify

With two accounts, or with a friend:

```
/msg Steve hello
```

Both sides should see the line, the recipient should hear the sound, and `/r` should work from either end.

Next: the [Quick Start](/plugins/oberonmsg/getting-started/quick-start/).
