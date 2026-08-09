---
title: "dWebLink"
description: "dWebLink connects a Minecraft account to a website account. A player logs in on the site, types a code in game, and the two are the same person from then on…"
---

**dWebLink** connects a Minecraft account to a website account. A player logs in on the site, types a code in game, and the two are the same person from then on — no passwords, no forms, no manual staff work.

It also handles **email verification** and **Discord linking**, and pushes each player's LuckPerms rank to the site so their forum posts and profile carry the rank they actually have in game.

Built on [DzusillCore](https://dzusill.github.io/plugins/dzusillcore/), it runs on Paper, Purpur and Folia.

---

## What it does

- 🔐 **Website login from in game** — the site shows a code, the player runs `/verify <code>`, done. Wrong codes are rate-limited and lock out after a few tries.
- 📧 **Verified email** — the player requests a code from their web profile and confirms it with `/verifyemail <code>`. One email per account, enforced server-side.
- 💬 **Discord linking** — `/linkdiscord` hands the player a code to give the Discord bot; `/discordunlink` removes it again, behind a chat confirmation so nobody unlinks by accident.
- 🎖️ **Rank sync** — a player's LuckPerms primary group and prefix are pushed to the website on join, on `/verify`, and the instant a rank actually changes.
- 🧩 **Thin client** — no player data is stored on the server. Everything lives on the Phalanx API; the plugin only talks to it.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper / Purpur / Folia **1.21.x** |
| Java | **21+** |
| DzusillCore | **required** |
| Phalanx API | **required** — a running website/API instance |
| LuckPerms | optional (rank sync) |

---

## The flow in one picture

```
website: player enters their nickname
   └─ site shows a 6-digit code
        └─ in game: /verify 123456
             ├─ correct → accounts linked, profile pushed
             └─ wrong   → attempts counted, lockout after too many
```

The same shape repeats for email (`/verifyemail`) and, in reverse, for Discord — there the *plugin* generates the code and the *bot* consumes it.

---

## dWebLink and dPhalanx

dWebLink owns **account linking and nothing else**. [dPhalanx](https://dzusill.github.io/plugins/dphalanx/) sits on top of it and adds chat relay, tickets, reports, stats, remote console and rewards.

You can run dWebLink alone if all you want is website login. You cannot run dPhalanx without it.

---

## Quick links

- [Requirements](/plugins/dweblink/getting-started/requirements/)
- [Installation](/plugins/dweblink/getting-started/installation/)
- [Quick Start](/plugins/dweblink/getting-started/quick-start/)
- [Website Login](/plugins/dweblink/features/website-login/)
- [Email Verification](/plugins/dweblink/features/email-verification/)
- [Discord Linking](/plugins/dweblink/features/discord-linking/)
- [Profile & Rank Sync](/plugins/dweblink/features/profile-sync/)
- [Commands & Permissions](/plugins/dweblink/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/dweblink/faq/)
