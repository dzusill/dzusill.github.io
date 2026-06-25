---
title: "Installation"
description: "dHomeGUI depends on DzusillCore 1.1.0+. Put DzusillCore-x.y.z.jar in plugins/ first."
---

## 1. Install DzusillCore

dHomeGUI **depends** on [DzusillCore](https://github.com/dzusill/DzusillCore) **1.1.0+**. Put `DzusillCore-x.y.z.jar` in `plugins/` first.

## 2. Drop in dHomeGUI

Place `dHomeGUI-x.y.z.jar` into `plugins/` and restart. On first start it creates:

```
plugins/dHomeGUI/
├── config.yml        # materials, GUI, sethome rules, teleport, worlds, economy, types
├── messages.yml      # every player-facing string + sounds (light-blue theme)
├── database.yml      # optional MySQL/PostgreSQL
├── homes.yml         # flat-file home storage
└── playerdata.yml    # flat-file player data (bought slots, etc.)
```

## 3. (Optional) install integrations

Vault + an economy plugin, PlaceholderAPI, WorldGuard, LuckPerms, EssentialsX — each unlocks the matching feature.

## 4. Set home limits

By default everyone can set **1** home (`Settings.SetHome.DefaultLimit`). Raise it per rank with `dhomegui.homes.<n>` permissions:

```
/lp group default permission set dhomegui.homes.3 true
/lp group vip     permission set dhomegui.homes.10 true
```

See [Home Limits](/plugins/dhomegui/features/home-limits/).

## 5. Verify

```
/sethome base
/homes
```

`/sethome base` creates a home; `/homes` opens the GUI. Edit `config.yml` / `messages.yml`, then apply with:

```
/dhomeadmin reload
```

Migrating from EssentialsX? Run `/dhomeadmin import essentials`.

Next: the [Quick Start](/plugins/dhomegui/getting-started/quick-start/).
