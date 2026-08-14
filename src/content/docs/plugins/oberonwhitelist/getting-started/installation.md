---
title: "Installation"
description: "Drop in both jars, start the server, and check the startup warnings before you let players in."
---

## 1. Drop in both jars

```
plugins/
  OberonCore.jar          ← 1.11.0 or newer, and it goes in first
  OberonWhitelist.jar
```

If you already run OberonCore, **replace it** rather than leaving the old one. OberonWhitelist needs `CommandRegistry.owns`, added in 1.11.0; an older core throws `NoSuchMethodError` the first time somebody types a command.

## 2. Start the server

`plugins/OberonWhitelist/config.yml` is created on first start with three example ranks (`default`, `mod`, `admin`), a plugin-hiding block list, and the standard error actions.

The startup log tells you where you stand:

```
[OberonWhitelist] Enforcement: strict, 3 groups, 0 configuration warning(s).
```

## 3. Read the warnings

A warning here is not noise — it names something that will not work:

```
[OberonWhitelist] Group command '/homes' is not registered by any plugin on this
server; it can never be suggested or run.
```

That means `/homes` is listed in a rank but nothing provides it. Either it is a typo, or the plugin that provides it failed to load. Until one of those is fixed, that entry does nothing at all.

This check can be turned off with `debug.warn-on-missing-commands: false`, but the default is on because a silently inert whitelist entry is very hard to notice any other way.

## 4. Set up your ranks

The shipped groups are examples. Replace them with your own — see [Groups & Ranks](/plugins/oberonwhitelist/features/groups/) — then:

```
/obw reload
```

Coming from another whitelist plugin? [Migrating from PerfCommandWhitelist](/plugins/oberonwhitelist/getting-started/migrating/) converts your existing config in one command.

## 5. If you run menus, dialogs or GUIs

Before you let players in, run:

```
/obw scan-dialogs
```

It reads your menu plugin's config and tells you which of its commands need to be in `execute-only`. Skipping this step is what makes menu buttons stop working under strict enforcement.

→ [Menu & Dialog Plugins](/plugins/oberonwhitelist/features/menu-plugins/)

## 6. Give yourself the bypass

```
/lp group admin permission set oberonwhitelist.bypass true
```

Staff with `oberonwhitelist.bypass` skip the whitelist entirely and keep unfiltered tab completion. It is also how you avoid locking yourself out while you are still setting the ranks up.

→ [Quick Start](/plugins/oberonwhitelist/getting-started/quick-start/)
