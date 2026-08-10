---
title: "Installation"
description: "Drop the jars in, remove whatever else was writing death messages, and preview your wording."
---

## 1. Drop in both jars

```
plugins/
├── DzusillCore.jar     # 1.5.0 or newer — the framework
└── OberonKills.jar
```

Restart the server. `/reload` is not supported and will not register the command properly.

## 2. Remove the other one

**If you are running AxKills, DeathMessages or anything similar, remove it.** Two plugins rewriting the death message
means whichever runs last wins, and which that is depends on load order — so the result changes between restarts.

## 3. What gets created

```
plugins/OberonKills/
├── config.yml      # the death messages, item name mode, ranks
└── messages.yml    # the admin command's own output
```

No database, no data file. Nothing here needs to survive a restart.

## 4. Verify

```
/oberonkills status
```

```
Enabled: yes, 24 message key(s) loaded
» Item names: TRANSLATE, hover on
» Unconfigured deaths: vanilla message kept
```

Then check the wording without asking anyone to die:

```
/oberonkills preview pvp bow
/oberonkills preview pvp mace-smash
/oberonkills preview environment lava
```

## 5. Permissions

Death messages need none — everybody sees them. Only the admin command:

```
/lp group admin permission set oberonkills.admin true
```

## 6. Write your messages

Everything is in [`config.yml`](/plugins/oberonkills/configuration/config/) under `Messages`. Then:

```
/oberonkills reload
```

Everything applies immediately — there is nothing here that needs a restart.

Next: the [Quick Start](/plugins/oberonkills/getting-started/quick-start/).
