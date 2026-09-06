---
title: "Troubleshooting"
description: "Start here:"
---

Start here:

```
/dtickets status
```

It reports the database it opened, which optional integrations it found, how many tickets and reports
exist, and any config file that failed to parse.

## The plugin does not enable

```
Unknown dependency DzusillCore
```

DzusillCore is a hard `depend`. Install it in `plugins/` and restart. See
[Requirements](/plugins/dtickets/getting-started/requirements/).

## I renamed a command and nothing changed

Expected. Command labels are applied when Bukkit builds its command map, once, at enable.
`/dtickets reload` cannot change them — **restart the server**. See
[Reloading](/plugins/dtickets/configuration/reloading/).

## `/ticket` opens another plugin

Two plugins registered the same label and load order decided. Rename ours under `Commands:` in
[config.yml](/plugins/dtickets/configuration/config/), or set `Enabled: false` on that one command and keep the
rest of dTickets.

## A section of messages went silent

Almost always YAML rather than the plugin:

- a value starting with `%` or `<` that is not quoted
- a bare `on:` or `off:` used as a key — that parses as a boolean, not a string
- a tab character somewhere in the file

`/dtickets status` reports a file that failed to parse. See
[messages.yml](/plugins/dtickets/configuration/messages/).

## A menu has a hole in it

An invalid `Material` name. The item does not render and the slot stays empty. Check the material
against the Bukkit name list, reload, and re-check `/dtickets status`.

## A punish button does nothing

The `Command:` line runs from the console. Test it by typing it in the console with a real name
substituted for `%target%`. Common causes:

- the punishment plugin is not installed, so the command does not exist
- a typo in the command name
- `Reports.Punishments.Enabled` is still `false`

See [Punishments](/plugins/dtickets/features/punishments/).

## Vanished staff show up in evidence

Check `Vanish.Enabled` is `true`, and that the staffer's vanish level has a matching entry under
`Vanish.Levels`. Anyone not matching a level falls back to `Fallback-Required`, which is `pv.see` by
default. See [Vanish awareness](/plugins/dtickets/features/vanish/).

## Staff get no notifications

In order:

1. `Tickets.Notifications.Enabled` is `true`
2. the staffer's own preferences — `/ticket notifications`; their choices override your defaults, and
   changing the defaults later does not overwrite anyone
3. they actually follow the ticket — see [Ticket chat](/plugins/dtickets/features/ticket-chat/#followers).
   `New-Ticket` and `New-Report` are the only alerts that do not require following

## Tickets vanished after a while

`Tickets.Retention-Days` deletes closed tickets after 90 days, and `Auto-Close-After-Days` closes
untouched ones after 14. Both are in `config.yml`. Retention is a real delete — enable
`Tickets.Transcripts` if you need a file copy kept.

## Placeholders render as themselves

PlaceholderAPI is not installed, or the expansion did not register. `/dtickets status` says which.
See [Placeholders](/plugins/dtickets/reference/placeholders/).

## Still stuck

Send the output of `/dtickets status`, your server version, your Java version, and the relevant config
file. If something fails at startup, the log matters more than the description.

Discord: **DZUSILL#4520**
