---
title: "dWebLink"
description: "dWebLink is the bridge between your Minecraft server and your Phalanx website — it links in-game accounts to the website and Discord, and keeps each player's rank in sync so it shows up online."
---

**dWebLink** is the bridge between your **Minecraft server** and your **Phalanx website**. It lets a player prove they own their in-game account with a one-time `/webtoken` code, links that account to the website and (via the Discord bot) to Discord, and keeps each player's **LuckPerms rank in sync** so it appears next to their name on the site.

It is built on the [DzusillCore](https://github.com/dzusill/DzusillCore) framework.

---

## What it does

- 🔗 **Account linking** — `/webtoken` mints a short-lived code the player enters on the website to prove they own their Minecraft account (verified against your AuthMe password database).
- 🧩 **Web ↔ Minecraft ↔ Discord** — one verified identity ties the in-game account, the website login, and the Discord account together.
- 🎖️ **Rank sync** — pushes each player's LuckPerms **primary group + prefix** to the site on join and after `/webtoken`, so their rank shows up as their public **author identity** on content they publish.
- 🛡️ **Admin gate** — the website admin panel requires a verified Minecraft link, so every author has a real in-game identity (skin, name, rank).
- 🔒 **Trusted channel** — every call to the website is authenticated with a shared API key and constant-time comparison; the plugin only ever *sends*, it never exposes an endpoint.
- 🪶 **Zero extra dependencies** — uses the JDK HTTP client, soft-depends on LuckPerms (rank sync degrades gracefully to name-only when it is absent).

---

## How the pieces fit

```
Minecraft (dWebLink)  ──►  Phalanx API  ◄──  Website (login + profiles)
        │                       ▲
        │ LuckPerms rank        │ Discord OAuth + bot
        ▼                       │
   /webtoken code ───► player enters it on the site ───► Discord bot links Discord
```

- **dWebLink** (this plugin) runs on the Minecraft server and talks *out* to the API.
- **Phalanx API** stores the linked accounts and verifies AuthMe passwords.
- The **website** is where the player logs in and links Discord; the **Discord bot** confirms the Discord side.

See [How linking works](/plugins/dweblink/how-it-works/account-linking/) and [Rank & author sync](/plugins/dweblink/how-it-works/profile-sync/).

---

## Requirements

| Requirement | Version / note |
|---|---|
| Server | Paper **1.21.x** |
| Java | **21** (Paper 1.21 runtime) |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | **1.1.0+** (required, installed separately) |
| A running **Phalanx** website + API | required — dWebLink is a client to it |
| **AuthMe** (MySQL backend) | required for website login — the API verifies passwords against it |
| **LuckPerms** | optional — enables rank sync; without it only the username is pushed |

See [Requirements](/plugins/dweblink/getting-started/requirements/).

---

## Quick links

- [Requirements](/plugins/dweblink/getting-started/requirements/)
- [Installation & setup (step by step)](/plugins/dweblink/getting-started/installation/)
- [How linking works](/plugins/dweblink/how-it-works/account-linking/)
- [Rank & author sync](/plugins/dweblink/how-it-works/profile-sync/)
- [config.yml reference](/plugins/dweblink/configuration/config/)
- [Commands & Permissions](/plugins/dweblink/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/dweblink/faq/)
