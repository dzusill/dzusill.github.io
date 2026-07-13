---
title: "Installation & setup"
description: "Step-by-step: install dWebLink, point it at your Phalanx API with a shared key, wire up LuckPerms rank sync, and run a player and an admin through the linking flow."
---

This walks you end to end: from dropping the jar in to a player (and an admin) fully linked with their rank showing on the website.

## Before you start

- The **Phalanx API** is deployed and reachable (e.g. `https://api.yourserver.gg`).
- Your server is **online-mode (premium)** — login is passwordless and relies on Mojang authentication.
- You have generated the shared key: `openssl rand -base64 32`.

---

## 1. Install the plugins

1. Download **DzusillCore** and drop it in `plugins/`. dWebLink will not load without it.
2. Download **dWebLink** and drop it in `plugins/`.
3. (Optional) Make sure **LuckPerms** is installed if you want rank sync.
4. Start the server once so dWebLink generates `plugins/dWebLink/config.yml`, then stop it.

---

## 2. Configure dWebLink

Open `plugins/dWebLink/config.yml`:

```yml
# Base URL of the website API (no trailing slash, no /api/v1).
api-base-url: "https://api.yourserver.gg"

# Shared secret. MUST equal MC_PLUGIN_API_KEY on the API. Keep it private.
api-key: "PASTE-THE-GENERATED-KEY-HERE"

# Which website tenant this server maps to (sent as the X-Tenant-Slug header).
tenant-slug: "default"

# Seconds a player must wait between /linkdiscord requests.
cooldown-seconds: 30

# Push each player's LuckPerms rank to the website so it shows as their author identity.
profile-sync:
  enabled: true
  join-delay-ticks: 40        # wait ~2s after join so LuckPerms has loaded the user
  min-interval-seconds: 300   # throttle: at most one automatic push per player per 5 min
```

- **`api-base-url`** — just the host, no path. The plugin adds `/api/v1/...` itself.
- **`tenant-slug`** — leave `default` for a single server; change it only if you run multiple sites off one API.

---

## 3. Match the key on the API

On the API host, the environment variable **`MC_PLUGIN_API_KEY`** must equal the plugin's `api-key`. If they differ, every call is rejected with `401` and `/verify` reports an error.

```bash
# on the API (e.g. Railway / your server env)
MC_PLUGIN_API_KEY=PASTE-THE-SAME-KEY-HERE
```

Redeploy / restart the API after setting it.

---

## 4. Start and smoke-test

1. Start the Minecraft server. The console banner shows dWebLink enabling after DzusillCore.
2. Join the server and run `/verify TESTCODE` (any code). You should see *"Wrong code"* — which proves the plugin reached the API. If instead you see *"not configured"* or an error, jump to the [FAQ](/plugins/dweblink/faq/).

---

## 5. Log a player in (the full flow)

Login is passwordless and **web-initiated** — the site mints a code, the player confirms it in game.

1. **On the website** (`yourserver.gg`): open the login page, type the Minecraft **nickname**, and get a **6-char code**. Leave the page open — it's polling.
2. **In game:** run `/verify <code>`. The chat confirms "you're logged in", and the website page **auto-redirects** to the profile. First login creates their account; the session lasts ~30 days.
3. **Link Discord (optional but needed for admins):** either click **Link Discord** on their profile, **or** run `/linkdiscord` in game — both give a code they redeem with the **Discord bot** (`/link <code>`). The bot confirms and grants the verified role. `/linkdiscord` needs no website visit.

See [How linking works](/plugins/dweblink/how-it-works/account-linking/) for what happens under the hood.

---

## 6. Link your admins

The website **admin panel requires a verified Minecraft link** — an admin cannot sign in until they have one (their Minecraft identity becomes their public author byline). So each staff member must complete step 5 (including **Link Discord**, since the panel login is Discord OAuth).

:warning: If you are enabling the admin gate on an existing site, make sure every admin links **before** you deploy the gate, or they will be locked out. The API ships a check script for this — see the Phalanx deployment guide (`admin:link-check`).

---

## 7. Verify rank sync

1. Give a player a LuckPerms rank with a prefix.
2. Have them rejoin (or run `/verify` to log in again).
3. Their **group + prefix** now appears next to their name on the website — as the author byline on content they publish, and in the admin sidebar for staff.

If ranks do not appear, confirm LuckPerms is installed and `profile-sync.enabled: true`, then see [Rank & author sync](/plugins/dweblink/how-it-works/profile-sync/).

---

## Done

You now have: a shared key on both sides, players able to log in with nickname + `/verify`, admins gated behind a verified link, and LuckPerms ranks flowing to the site. Reference: [config.yml](/plugins/dweblink/configuration/config/) · [Commands & Permissions](/plugins/dweblink/commands-and-permissions/).
