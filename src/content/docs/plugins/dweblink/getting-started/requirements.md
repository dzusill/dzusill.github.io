---
title: "Requirements"
description: "What you need before installing dWebLink — a Paper server, DzusillCore, a running Phalanx website + API, and optionally LuckPerms. Login is passwordless (no AuthMe / password DB)."
---

dWebLink is a **client** to your Phalanx website. It does nothing on its own — it needs the website and API running, and it shares a secret with them.

## On the Minecraft server

| Requirement | Version / note |
|---|---|
| Paper | **1.21.x** |
| Java | **21** |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | **1.1.0+**, installed as a separate plugin |
| Online-mode (premium) server | required — login trusts Mojang's authentication, so confirming a code in game with `/verify` proves ownership |
| [LuckPerms](https://luckperms.net/) | optional — enables rank sync (primary group + prefix) |

:memo: Login is **passwordless** — no AuthMe, no MySQL, no password database. A player types their nickname on the website, gets a code, and confirms it in game with `/verify <code>`.

## The website side (Phalanx)

You need the Phalanx stack deployed and reachable:

| Component | Purpose |
|---|---|
| **API** (`api.yourserver.gg`) | dWebLink calls this; mints/consumes login codes; stores linked accounts |
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
