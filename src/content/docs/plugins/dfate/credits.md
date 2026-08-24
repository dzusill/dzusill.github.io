---
title: "Credits"
description: "dFate is developed by dzusill."
---

**dFate** is developed by **dzusill**.

## Built on

- **[DzusillCore](https://github.com/dzusill/DzusillCore)** — the plugin framework: modules and services, comment-preserving configs, the MiniMessage message layer, the command tree, the scheduler, storage and database abstractions, and the `DialogService` that decides how the choice screen is drawn.
- **[dDialogs](https://github.com/dzusill/DDialogs)** — renders those specs as real Minecraft dialogs. Optional; DzusillCore's chat fallback covers every server without it.
- **[Paper](https://papermc.io/)** — the server platform.
- **[Adventure](https://docs.advntr.dev/)** — MiniMessage text formatting.
- **[bStats](https://bstats.org/)** — anonymous usage metrics.

## Optional integrations

- **[PlaceholderAPI](https://www.spigotmc.org/resources/6245/)** — the `%dfate_*%` expansion.
- **AdvancedBan / LiteBans / CMI** — any of them handles the ban. dFate has no compile-time dependency on any: the ban is a console command you configure.
- **[ViaVersion](https://viaversion.com/)** — lets dDialogs tell which connected clients need the chat fallback.

## Support

Questions, bug reports and feature requests go through the resource page or the Discord where you got the plugin.

When reporting a problem, include:

- `/version dFate` and `/version DzusillCore`
- your server version and whether dDialogs is installed
- the relevant part of `config.yml`
- the console output — with `Debug: true` if it is about a death that did or did not cost the account
