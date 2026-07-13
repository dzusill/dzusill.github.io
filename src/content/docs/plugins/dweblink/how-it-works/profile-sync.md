---
title: "Rank & author sync"
description: "How dWebLink pushes each player's LuckPerms rank to the website on join and after /verify, so it shows as their public author identity — and why the admin panel requires a link."
---

Once a player is linked, dWebLink keeps their **rank** in sync with the website so it shows up next to their name — as the **author byline** on content they publish and in the admin sidebar for staff.

## What is pushed

When sync runs, dWebLink reads the player's LuckPerms data and sends it to the API:

```
POST /api/v1/link/minecraft/profile
Authorization: Bearer <api-key>
X-Tenant-Slug: <tenant-slug>
{ "uuid": "...", "name": "...", "lpGroup": "admin", "lpPrefix": "[Admin]" }
```

- **`lpGroup`** — the player's LuckPerms **primary group**.
- **`lpPrefix`** — their LuckPerms **prefix**, with color codes stripped (legacy `&`/`§`, `§x` hex, and MiniMessage tags are removed so only the label remains).
- **`name`** — the current username, so a rename is picked up too.

The API stores these on the player's account only if the account exists — an unlinked player who joins is simply a no-op.

:memo: **No LuckPerms?** dWebLink still pushes the username (keeping it fresh); the group and prefix are just omitted.

## When it runs

| Trigger | Behaviour |
|---|---|
| **Player join** | After a short delay (`join-delay-ticks`, default ~2s) so LuckPerms has loaded the user, throttled to at most once per `min-interval-seconds` (default 5 min) per player. |
| **`/verify`** | Pushed immediately after a successful code, bypassing the throttle — so a player who just changed rank refreshes it on demand. |

Because a link is completed on the *website* (invisible to the server), the **first join after linking** is what first populates a rank. Have players relog, or run `/verify`, if a freshly linked account shows no rank yet.

## Where it shows up

- **Author byline** — content published from the admin panel shows the author's Minecraft head, name, and rank chip on the public site.
- **Admin sidebar** — staff see their own Minecraft head + name in the panel.

## The admin gate

The website admin panel **requires a verified Minecraft link**. Staff sign in with Discord, but the panel refuses the session unless that Discord account is linked to a verified Minecraft account — so every author has a real in-game identity (skin, name, rank). There is no owner exemption.

This means: **before enabling the gate, every admin must link** (Minecraft *and* Discord). The API includes a check (`admin:link-check`) that lists any admin who would be locked out — run it until it is clear, then deploy. See the Phalanx deployment guide.

## Tuning

All in `plugins/dWebLink/config.yml`:

```yml
profile-sync:
  enabled: true             # master switch for join + /verify pushes
  join-delay-ticks: 40      # raise if your LuckPerms loads slowly on join
  min-interval-seconds: 300 # lower for fresher ranks, higher to reduce calls
```

Full reference: [config.yml](/plugins/dweblink/configuration/config/).
