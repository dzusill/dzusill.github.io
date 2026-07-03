---
title: "Requirements"
description: "What you need before installing dWebLink — a Paper server, DzusillCore, a running Phalanx website + API, an AuthMe MySQL database, and optionally LuckPerms."
---

dWebLink is a **client** to your Phalanx website. It does nothing on its own — it needs the website and API running, and it shares a secret with them.

## On the Minecraft server

| Requirement | Version / note |
|---|---|
| Paper | **1.21.x** |
| Java | **21** |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | **1.1.0+**, installed as a separate plugin |
| [AuthMe](https://www.spigotmc.org/resources/authme-reloaded.6269/) | required — players log into the website with their AuthMe password |
| [LuckPerms](https://luckperms.net/) | optional — enables rank sync (primary group + prefix) |

:memo: AuthMe must use a **MySQL** backend (not the default SQLite), because the website API reads that same database (read-only) to verify passwords. See the Phalanx deployment guide for the read-only user setup.

## The website side (Phalanx)

You need the Phalanx stack deployed and reachable:

| Component | Purpose |
|---|---|
| **API** (`api.yourserver.gg`) | dWebLink calls this; verifies AuthMe passwords; stores linked accounts |
| **Website** (`yourserver.gg`) | where players log in and link Discord |
| **Admin panel** (`admin.yourserver.gg`) | where staff manage content — requires a verified Minecraft link |
| **Discord bot** | confirms the Discord side of a link and syncs roles |

## Shared secret

dWebLink authenticates to the API with a **service key**. The value you put in the plugin's `api-key` must equal the API's `MC_PLUGIN_API_KEY` environment variable. Generate it once:

```bash
openssl rand -base64 32
```

Keep it private — anyone with this key can mint link codes and push profiles for any UUID.

Next: [Installation & setup](/plugins/dweblink/getting-started/installation/).
