---
title: "Installation"
description: "Drop DzusillCore.jar and OberonChat.jar into plugins/ and restart. Everything else is optional."
---

## 1. Drop in both jars

`plugins/` needs **two** files:

```
plugins/
├── DzusillCore.jar     # 1.5.0 or newer — the framework
└── OberonChat.jar
```

Restart the server. Reloading with `/reload` is not supported and will not register the commands properly.

## 2. What gets created

On first start:

```
plugins/OberonChat/
├── config.yml      # every switch, threshold, weight and punishment tier
├── filter.yml      # the word list and the whitelist
├── messages.yml    # everything a player or staff member sees
├── database.yml    # where violation history goes
└── data.mv.db      # the embedded database itself
```

`data.mv.db` is created by H2 the first time it connects. Nothing to install, no credentials to set — see [database.yml](/plugins/oberonchat/configuration/database/) if you would rather use MySQL.

## 3. Verify

```
/oberonchat status
```

Wait — there is no `status`. Use this instead, which runs the live filter over a phrase without needing anyone to swear in public chat:

```
/oberonchat check you idiot
```

You should get a hit back naming the rule. If you get "Clean", the word list did not load — check the console for `Skipping unusable filter entry`.

Then look at the startup line in the console:

```
[OberonChat] Loaded 24 filter rule(s).
```

## 4. Give out the permissions

Nothing works by default except for ops. At minimum:

```
/lp group mod permission set oberonchat.alerts true
/lp group admin permission set oberonchat.admin true
```

Full list on [Commands & Permissions](/plugins/oberonchat/commands-and-permissions/).

## 5. Configure

Edit [`filter.yml`](/plugins/oberonchat/configuration/filter/) for the word list and [`config.yml`](/plugins/oberonchat/configuration/config/) for everything else, then:

```
/oberonchat reload
```

> One thing a reload **cannot** do: the `Sources` switches in `config.yml` decide which listeners are registered, and that happens at startup. Turning signs or books on or off needs a restart. Everything else — words, thresholds, messages, punishments — applies immediately.

Next: the [Quick Start](/plugins/oberonchat/getting-started/quick-start/).
