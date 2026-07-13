---
title: "dWebLink"
description: "dWebLink is the bridge between your Minecraft server and your Phalanx website — it links in-game accounts to the website and Discord, and keeps each player's rank in sync so it shows up online."
---

**dWebLink** is the bridge between your **Minecraft server** and your **Phalanx website**. Players log into the site by typing their nickname there and confirming a code in game with `/verify`; the plugin also links Discord (via the bot) and keeps each player's **LuckPerms rank in sync** so it appears next to their name on the site.

It is built on the [DzusillCore](https://github.com/dzusill/DzusillCore) framework.

---

## What it does

- 🔗 **Passwordless login** — the website mints a short-lived code for the player's nickname; they confirm it in game with `/verify <code>` and the browser logs in. On an online-mode server that proves ownership — no password, no AuthMe — and first login creates the account.
- 🧩 **Web ↔ Minecraft ↔ Discord** — one verified identity ties the in-game account, the website login, and the Discord account together.
- 🎖️ **Rank sync** — pushes each player's LuckPerms **primary group + prefix** to the site on join and after `/verify`, so their rank shows up as their public **author identity** on content they publish.
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
   site mints code ───► player runs /verify <code> ───► Discord bot links Discord
```

- **dWebLink** (this plugin) runs on the Minecraft server and talks *out* to the API.
- **Phalanx API** mints login codes for the website and confirms them from the game, and stores the linked accounts.
- The **website** is where the player types their nickname to get a code and links Discord; the **Discord bot** confirms the Discord side.

See [How linking works](/plugins/dweblink/how-it-works/account-linking/) and [Rank & author sync](/plugins/dweblink/how-it-works/profile-sync/).

---

## Requirements

| Requirement | Version / note |
|---|---|
| Server | Paper **1.21.x** |
| Java | **21** (Paper 1.21 runtime) |
| [DzusillCore](https://github.com/dzusill/DzusillCore) | **1.1.0+** (required, installed separately) |
| A running **Phalanx** website + API | required — dWebLink is a client to it |
| Online-mode (premium) server | required — passwordless login trusts Mojang's authentication |
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
