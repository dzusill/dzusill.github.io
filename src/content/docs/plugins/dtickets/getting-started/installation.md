---
title: "Installation"
description: "Drop DzusillCore.jar into plugins/. dTickets declares it as a hard depend, so a server without"
---

## 1. Install DzusillCore first

Drop `DzusillCore.jar` into `plugins/`. dTickets declares it as a hard `depend`, so a server without
it logs `Unknown dependency DzusillCore` and never enables the plugin.

## 2. Drop the jar in

Put `dTickets.jar` into `plugins/` and restart the server. A reload is not enough on first install —
Bukkit builds its command map once at enable, so the command labels need a real start.

## 3. Check it came up

The console prints a banner on enable:

```
  DTickets v1.0.0
  Powered by DzusillCore
```

Then run:

```
/dtickets status
```

It reports what loaded: the database it opened, which optional integrations it found, and how many
tickets and reports exist. If something is wrong, this is the first place it shows.

## 4. Give your staff the permissions

Nothing is staff-visible until somebody holds the staff nodes. The two that matter most:

```
dtickets.ticket.staff    # the /tickets queue
dtickets.report.admin    # the /reports queue and the punish menu
```

`dtickets.*` grants every node, including the admin ones. The full list is in
[Commands and permissions](/plugins/dtickets/reference/commands-and-permissions/).

Players need nothing: `dtickets.ticket.use`, `dtickets.ticket.create`, `dtickets.ticket.close.own`,
`dtickets.ticket.follow` and `dtickets.report.use` all default to `true`.

## 5. Check for command clashes

`/ticket`, `/tickets`, `/report` and `/reports` are common labels, and another plugin may already own
one. Every label is configurable — see `Commands:` in [config.yml](/plugins/dtickets/configuration/config/) — and
each command can be switched off entirely with `Enabled: false` if you would rather keep the other
plugin's version.

## Files created

On first enable, `plugins/dTickets/` fills with:

| File | What it holds |
|---|---|
| `config.yml` | categories, priorities, wizard questions, notification defaults, report and punishment settings |
| `menus.yml` | the layout of all eight menus |
| `messages.yml` | every line the plugin sends |
| `sounds.yml` | the sound played on each event |
| `database.yml` | storage type and connection details |
| `license.yml` | only touched if support sends you a key directly |
