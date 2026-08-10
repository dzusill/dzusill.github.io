---
title: "Credits"
description: "OberonStaff is developed by dzusill for Oberon SMP."
---

**OberonStaff** is developed by [dzusill](https://github.com/dzusill), built for **Oberon SMP**.

It replaces `Staff.sk`, with the four bugs that script shipped with fixed — the staff chat injection, name-keyed settings, override commands that overrode nothing, and a tab-completion filter that filtered nothing.

## Built on

- **[DzusillCore](https://github.com/dzusill/DzusillCore)** — the plugin framework underneath: modules, services, config, MiniMessage messaging, runtime command registration, the Folia-aware scheduler and the SQL layer.
- **[Paper](https://papermc.io/)** — the server API.
- **[Adventure](https://docs.advntr.dev/)** — MiniMessage text formatting, including the unparsed placeholder that makes staff chat injection-proof.
- **[H2](https://h2database.com/)** — the embedded database, shipped inside DzusillCore.

## Optional integrations

- **[PremiumVanish](https://www.spigotmc.org/resources/41881/)** and **[SuperVanish](https://www.spigotmc.org/resources/1331/)** by LeonMangler — reached through their shared API.
- **[PlaceholderAPI](https://www.spigotmc.org/resources/6245/)** by extendedclip.

## Licence

See the `LICENSE` file in the repository.

## Support

- **Issues & feature requests** — [github.com/dzusill](https://github.com/dzusill)
- **Documentation** — you're reading it

When reporting a problem, please include:

- Server software and version (`/version`)
- OberonStaff and DzusillCore versions
- The full output of `/oberonstaff status` — especially the vanish line
- The relevant part of `config.yml`
- Console output with `Debug: true` set
