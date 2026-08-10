---
title: "Credits"
description: "OberonChat is developed by dzusill for Oberon SMP."
---

**OberonChat** is developed by [dzusill](https://github.com/dzusill), built for **Oberon SMP**.

It replaces `ChatFilter.sk` and adds the anti-bypass word filter that script never had.

## Built on

- **[DzusillCore](https://github.com/dzusill/DzusillCore)** — the plugin framework underneath: modules, services, config, MiniMessage messaging, runtime command registration, the Folia-aware scheduler and the SQL layer.
- **[Paper](https://papermc.io/)** — the server API.
- **[Adventure](https://docs.advntr.dev/)** — MiniMessage text formatting.
- **[H2](https://h2database.com/)** — the embedded database, shipped inside DzusillCore.

## Optional integrations

- **[PlaceholderAPI](https://www.spigotmc.org/resources/6245/)** by extendedclip.

## Licence

See the `LICENSE` file in the repository.

## Support

- **Issues & feature requests** — [github.com/dzusill](https://github.com/dzusill)
- **Documentation** — you're reading it

When reporting a problem, please include:

- Server software and version (`/version`)
- OberonChat and DzusillCore versions
- The output of `/oberonchat check <the phrase>` if it's about something being caught or missed
- The relevant part of `filter.yml` and `config.yml`
- Console output with `Debug: true` set
