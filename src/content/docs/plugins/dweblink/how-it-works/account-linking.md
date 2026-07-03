---
title: "How linking works"
description: "The end-to-end account-linking flow: a /webtoken code proves Minecraft ownership, the AuthMe password proves it again on the web, and the Discord bot ties in Discord."
---

Linking ties three identities together — **Minecraft**, **website**, and **Discord** — behind one verified account. dWebLink owns the Minecraft end; the website and Discord bot own the rest.

## The flow

```
1. /webtoken            (Minecraft)   → API mints a one-time code
2. website login        (browser)     → AuthMe password + the code → verified web account
3. Link Discord         (browser)     → API mints a second code
4. enter code to bot    (Discord)     → bot confirms → Discord linked + role granted
```

### 1. `/webtoken` — prove you own the Minecraft account

The player runs `/webtoken`. dWebLink calls the API:

```
POST /api/v1/link/minecraft/init
Authorization: Bearer <api-key>
X-Tenant-Slug: <tenant-slug>
{ "uuid": "<player-uuid>", "name": "<player-name>" }
```

The API mints a **one-time code** (valid ~5 minutes) tied to that UUID and returns it. The plugin shows it in chat. Because the server is online-mode, the UUID is trusted — this is what proves the code belongs to a real account.

### 2. Website login — prove the password

On the site, the player enters their **Minecraft username + AuthMe password** and the code. The API:

- verifies the password against the **AuthMe MySQL** database (read-only), and
- consumes the code, creating a **verified `PlayerAccount`**.

From now on the player logs in with just username + password — the code was a one-time proof.

### 3 & 4. Link Discord

For Discord (and required for admins, since the panel logs in with Discord):

- The logged-in player clicks **Link Discord**; the API mints a second one-time code.
- They send the code to the **Discord bot**; the bot calls the API to confirm, which links the Discord ID and grants the verified role.

## What gets stored

One `PlayerAccount` per player per tenant, holding:

- `minecraftUuid` + `minecraftName` (trusted from the plugin),
- `mcVerified` once the password + code check out,
- `discordId` + `discordVerified` once the bot confirms,
- and the LuckPerms `lpGroup` / `lpPrefix` (see [Rank & author sync](/plugins/dweblink/how-it-works/profile-sync/)).

## Security notes

- Every plugin → API call carries the **shared key** as a Bearer token, compared in constant time on the API.
- Codes are **single-use, short-lived, and hashed** at rest — the plaintext is never stored.
- The plugin only ever **sends** requests; it exposes no endpoint of its own.
- The website never sees the player's password — it is checked against AuthMe and discarded.
