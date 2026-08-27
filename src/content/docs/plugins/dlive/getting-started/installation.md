---
title: "Installation"
description: "database.yml and its H2 database file."
---

1. Stop the server.
2. Drop **`dLive.jar`** and **`DzusillCore.jar`** into `plugins/`.
3. Start the server. dLive creates `plugins/dLive/` with `config.yml`, `messages.yml`,
   `database.yml` and its H2 database file.
4. Grant `dlive.use` to the ranks allowed to announce. **It is off for everyone by default** —
   see below.
5. Edit `plugins/dLive/config.yml`, then run `/dlive reload`.

## The permission everybody forgets

`dlive.use` defaults to `false`. That is deliberate: `/live` posts to every player on the server, so
it is opt in rather than something every new player gets. Until you grant it, `/live` answers with a
no permission message and nothing else happens.

With LuckPerms:

```
lp group media permission set dlive.use true
```

`dlive.toggle` defaults to `true`, so everyone can already opt out of receiving announcements without
you granting anything.

## Upgrading

Replace the jar and restart. New configuration keys are merged into your existing `config.yml`
automatically, comments intact — your edits are never overwritten and nothing is reordered.

## Verifying

```
/dlive help
```

If that prints the admin command list, the plugin is loaded and your permissions are working. The
startup log should show `Enabled successfully` with no warnings above it.
