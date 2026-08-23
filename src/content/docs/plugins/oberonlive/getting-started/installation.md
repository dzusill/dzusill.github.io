---
title: "Installation"
description: "Install OberonCore and OberonLive, choose the default H2 database or configure MySQL, then grant the streamer permission."
---

1. Install **OberonCore 1.12.0 or newer** into the server's `plugins/` directory.
2. Optionally install **PlaceholderAPI 2.12+**.
3. Put `OberonLive.jar` in `plugins/`.
4. Start the server once.
5. Keep the default H2 database, or stop the server and configure MySQL in `plugins/OberonLive/database.yml`.
6. Grant `oberonlive.use` to the player or media group that may announce streams.

```text
/lp group media permission set oberonlive.use true
```

The console banner confirms the hard dependency loaded:

```text
OberonLive v1.1.0
Powered by OberonCore
```

## Generated files

```text
plugins/OberonLive/
├── config.yml       # platforms, cooldowns, broadcast, history and Discord
├── database.yml     # H2 or MySQL connection
├── messages.yml     # every command and status message
└── data.mv.db       # default H2 database
```

The SQL tables are created automatically from the dialect-specific schema bundled in the jar.

## Verify the installation

As an operator:

```text
/olive help
/olive stats YourName
```

As a player with `oberonlive.use`:

```text
/live twitch.tv/your_channel
```

Bare links and `http://` links are automatically upgraded to `https://` before they are stored and published. Unknown shorteners, unsupported schemes and hostnames merely ending in `twitch.tv` are intentionally rejected.

## Updating

Stop the server, replace `OberonLive.jar`, and start it again. Keep a backup of the plugin directory before updating. Runtime-safe presentation changes use `/olive reload`; jar, database connection and dependency changes need a restart.
