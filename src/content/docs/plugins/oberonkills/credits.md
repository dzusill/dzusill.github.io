---
title: "Credits"
description: "OberonKills is developed by dzusill for Oberon SMP."
---

**OberonKills** is developed by [dzusill](https://github.com/dzusill), built for **Oberon SMP**.

It is the one plugin in the Oberon suite that replaces no Skript. It exists because AxKills does most of what the
server wanted and misses two details: item names written as `netherite_sword`, and every ranged kill reading the
same.

## Built on

- **[DzusillCore](https://github.com/dzusill/DzusillCore)** — the plugin framework underneath: modules, services,
  config, MiniMessage messaging, runtime command registration and the Folia-aware scheduler.
- **[Paper](https://papermc.io/)** — the server API.
- **[Adventure](https://docs.advntr.dev/)** — MiniMessage text formatting, and the translatable components that let
  each player's client render item names in their own language.

## No integrations

There are none, and none are needed. No database, no PlaceholderAPI, no economy. Death messages need no permission
either.

## Alongside

- **[dKillTracker](/plugins/dkilltracker/)** counts kills and runs milestone rewards. This one describes them. They
  run together fine.

## Licence

See the `LICENSE` file in the repository.

## Support

- **Issues & feature requests** — [github.com/dzusill](https://github.com/dzusill)
- **Documentation** — you're reading it

When reporting a problem, please include:

- Server software and version (`/version`)
- OberonKills and DzusillCore versions
- The output of `/oberonkills status`
- The output of `/oberonkills preview` for the death in question
- Console output with `Debug: true` set
