---
title: "Credits"
description: "OberonMSG is developed by dzusill for Oberon SMP."
---

**OberonMSG** is developed by [dzusill](https://github.com/dzusill), built for **Oberon SMP**.

It replaces `Messages.sk`, with the five bugs that script shipped with fixed — seven drifting copies of one command,
colour-parsed player text, `/ignore` behaving as a toggle, reply targets wiped on join, and name-keyed ignore lists.

## Built on

- **[DzusillCore](https://github.com/dzusill/DzusillCore)** — the plugin framework underneath.
- **[Paper](https://papermc.io/)** — the server API.
- **[Adventure](https://docs.advntr.dev/)** — MiniMessage text formatting, including the unparsed placeholders that
  keep player text out of the parser.
- **[H2](https://h2database.com/)** — the embedded database, shipped inside DzusillCore.

## Optional integrations

- **[PremiumVanish](https://www.spigotmc.org/resources/41881/)** and
  **[SuperVanish](https://www.spigotmc.org/resources/1331/)** by LeonMangler.
- **[EssentialsX](https://essentialsx.net/)** — the AFK state.
- **[PlaceholderAPI](https://www.spigotmc.org/resources/6245/)** by extendedclip.

## Licence

See the `LICENSE` file in the repository.

## Support

- **Issues & feature requests** — [github.com/dzusill](https://github.com/dzusill)
- **Documentation** — you're reading it

When reporting a problem, please include:

- Server software and version (`/version`)
- OberonMSG and DzusillCore versions
- The full output of `/oberonmsg status`
- The relevant part of `config.yml`
- Console output with `Debug: true` set
