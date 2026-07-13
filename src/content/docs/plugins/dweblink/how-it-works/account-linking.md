---
title: "How linking works"
description: "The end-to-end login flow: the website mints a code for a nickname, the player confirms it in game with /verify, and the browser logs in. The Discord bot ties in Discord."
---

Linking ties three identities together — **Minecraft**, **website**, and **Discord** — behind one verified account. Login is **web-initiated and passwordless**: the site mints a code, the player confirms it in game with `/verify`, and the waiting browser logs in.

## The flow

```
1. enter nickname       (browser)     → API mints a 6-char code, browser starts polling
2. /verify <code>       (Minecraft)   → API confirms ownership → verified account
3. (browser polls)      (browser)     → sees "verified" → session issued, redirected in
4. Link Discord         (game/web)    → /link <code> with the bot → Discord linked + role
```

### 1. Enter your nickname — get a code

On the site the visitor types their Minecraft nickname. The API mints a **6-char code** (valid ~5 minutes) tied to that nickname, shows it in the browser, and hands the browser an httpOnly **poll-secret** so only that browser can complete the login. The browser starts polling `GET /api/v1/player/login/status`.

### 2. `/verify <code>` — confirm in game

The player runs `/verify <code>`. dWebLink calls the API:

```
POST /api/v1/player/verify-code
Authorization: Bearer <api-key>
X-Tenant-Slug: <tenant-slug>
{ "uuid": "<player-uuid>", "name": "<player-name>", "code": "<code>" }
```

Because the server is online-mode, Mojang already authenticated the account and the UUID is trusted — running `/verify` in game **is** the proof of ownership. If the code matches the pending request for that nickname, the API marks it verified and creates (or re-verifies) a **`PlayerAccount`**. Wrong codes are throttled: **3 wrong tries** (or too many code requests) lock the nickname for ~15 minutes.

### 3. The browser logs in

The next poll sees `verified`, the API sets a ~30-day session cookie, and the browser redirects to the profile. **First login registers the account automatically** — no separate signup.

### 4. Link Discord

For Discord (and required for admins, since the panel logs in with Discord). Two ways to start:

- **From the website:** the logged-in player clicks **Link Discord**; the API mints a one-time code.
- **From in game (no website needed):** run `/linkdiscord` — the plugin asks the API for the code and shows it in chat, auto-creating a verified account if the player doesn't have one yet.

Either way, they then send the code to the **Discord bot** with `/link <code>`; the bot calls the API to confirm, which links the Discord ID and grants the verified role. (The Discord step can't move in-game — it's what proves the player owns that Discord account.)

## What gets stored

One `PlayerAccount` per player per tenant, holding:

- `minecraftUuid` + `minecraftName` (trusted from the plugin),
- `mcVerified` once a `/verify` code has been confirmed,
- `discordId` + `discordVerified` once the bot confirms,
- and the LuckPerms `lpGroup` / `lpPrefix` (see [Rank & author sync](/plugins/dweblink/how-it-works/profile-sync/)).

## Security notes

- Every plugin → API call carries the **shared key** as a Bearer token, compared in constant time on the API.
- Codes are **single-use, short-lived, and hashed** at rest — the plaintext is never stored.
- The plugin only ever **sends** requests; it exposes no endpoint of its own.
- The on-screen code goes to the game; the **poll-secret stays in the browser** (httpOnly cookie), so only the browser that started the login gets the session.
- There are no passwords anywhere — ownership is proven by Mojang's online-mode auth plus the in-game `/verify` step, so there is no password DB to breach.
