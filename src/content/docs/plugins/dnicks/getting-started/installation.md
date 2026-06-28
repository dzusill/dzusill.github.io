---
title: "Installation"
description: "dNicks depends on DzusillCore 1.1.0+. Put DzusillCore-x.y.z.jar in plugins/ first."
---

## 1. Install DzusillCore

dNicks **depends** on [DzusillCore](https://github.com/dzusill/DzusillCore) **1.1.0+**. Put `DzusillCore-x.y.z.jar` in `plugins/` first.

## 2. Drop in dNicks

Place `dNicks-x.y.z.jar` into `plugins/` and restart. On first start it creates:

```
plugins/dNicks/
├── config.yml        # surfaces, nick rules, formats, nametag, integrations
├── messages.yml      # generated from the language file (do not edit directly)
├── lang/en-US.yml    # every player-facing string
└── players/          # one <uuid>.yml per player with a nick
```

## 3. (Optional) install integrations

- **PlaceholderAPI** — drop the jar in `plugins/`; dNicks auto-registers `%dnicks_name%` and friends.
- **EssentialsX / TAB** — already on your server? See [Integrations](/plugins/dnicks/integrations/) for the one or two settings that make dNicks the single source of truth.

## 4. Grant color permissions

Plain nicks work for everyone out of the box (`dnicks.nick.self` is on by default). Colors and gradients are **gated** so you can sell them as a perk. To let a rank use them:

```
/lp group vip permission set dnicks.gradient true
/lp group vip permission set dnicks.color.* true
/lp group vip permission set dnicks.color.hex true
/lp group vip permission set dnicks.format true
```

See [Commands & Permissions](/plugins/dnicks/commands-and-permissions/).

## 5. Verify

```
/nick <gradient:#ff5fa2:#a18fff>YourName</gradient>
```

The gradient should appear in chat, in the tab list and on the floating nametag above your head. Edit `config.yml` / `lang/en-US.yml`, then apply with:

```
/dnicks reload
```

Next: the [Quick Start](/plugins/dnicks/getting-started/quick-start/).
