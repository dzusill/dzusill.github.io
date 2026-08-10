---
title: "Requirements"
description: "Paper 1.21.x and Java 21. DzusillCore is required; PremiumVanish or SuperVanish is optional but is what the level ladder needs."
---

## Server

| | |
|---|---|
| Software | Paper, Purpur or Folia **1.21.x** |
| Java | **21** or newer |

Spigot and CraftBukkit are not supported. OberonStaff uses Paper's runtime command registration and Adventure text, neither of which exists on plain Spigot.

Folia is supported (`folia-supported: true`). Teleports go through DzusillCore's Folia-aware scheduler; a plain `setLocation` would fail on a regionised server.

## DzusillCore

**Required.** OberonStaff is a plugin *on* the framework, not a copy of it — `DzusillCore.jar` must sit in `plugins/` next to it.

| | |
|---|---|
| Minimum version | **1.5.0** |
| Download | [github.com/dzusill/DzusillCore](https://github.com/dzusill/DzusillCore) |

1.5.0 is the version that added the embedded H2 backend OberonStaff stores preferences and the action log in.

## Vanish — optional, but read this

OberonStaff works with **PremiumVanish** and **SuperVanish**, which share an API. It reaches that API by reflection, so there is no dependency to install beyond the vanish plugin itself.

**With neither installed, every player is visible to everyone.** That is correct rather than a degraded mode — but if you *do* run a vanish plugin and it is not detected, the ladder silently does nothing and looks identical to it working, right up until somebody vanishes.

Check with:

```
/oberonstaff status
```

The first line names the integration. `none` means no vanish plugin was found.

Other vanish plugins (Essentials vanish, CMI) are not detected. If you use one, tell us and we will look at adding it.

## Optional

| | What it adds |
|---|---|
| **PlaceholderAPI** | The `%oberonstaff_*%` [placeholders](/plugins/oberonstaff/placeholders/). |
| **MySQL / PostgreSQL** | Shared preferences and action log across a network. Without it, both live in an H2 file inside the plugin folder. |
| **A permissions plugin** | Effectively required — every command defaults to `op`, and the rank display is driven by permission nodes. |

## What it does *not* need

- **EssentialsX.** OberonStaff provides its own `/tp` family and `/back`. If you already run Essentials, switch off the overlapping commands in `config.yml` rather than letting load order decide which wins — see [Commands & Permissions](/plugins/oberonstaff/commands-and-permissions/).
- **A chat plugin.** Staff chat is delivered directly, not through your chat formatter.
