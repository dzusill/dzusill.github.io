---
title: "FAQ & Troubleshooting"
description: "Common dWebLink problems — /verify errors, key mismatches, lockouts, missing ranks, admins locked out of the panel — and how to fix them."
---

## `/verify` says "not configured"

`api-key` is empty in `plugins/dWebLink/config.yml`. Paste the shared key (the same value as the API's `MC_PLUGIN_API_KEY`) and restart.

## `/verify` returns an error / "HTTP 401"

The plugin's `api-key` does not match the API's `MC_PLUGIN_API_KEY`, or the API is unreachable. Check:

- both values are **identical** (no stray spaces or quotes),
- `api-base-url` is correct, has **no trailing slash**, and **no `/api/v1`**,
- the API is up: `curl https://api.yourserver.gg/api/v1/health`.

## `/verify` says the code is wrong or I'm locked out

- The code you type must match the one shown on the website **for your nickname** — get it by entering your nickname on the login page.
- Codes last **~5 minutes** and are single-use; if it expired, request a new one on the site.
- After **3 wrong tries** (or too many code requests) a nickname is locked for **~15 minutes** — wait it out.

## A player linked but has no rank on the site

Rank is pushed on the **first join after linking** (or on `/verify`). Ask them to relog or run `/verify`. Then check:

- **LuckPerms** is installed (without it, only the name is pushed),
- `profile-sync.enabled: true`,
- the player actually has a primary group / prefix in LuckPerms.

## A rank shows with weird symbols

The prefix contained color codes the stripper did not catch. dWebLink removes `&`/`§` codes, `§x` hex, and MiniMessage tags. If something slips through, simplify the LuckPerms prefix or open an issue with the exact prefix string.

## An admin can't log into the panel

The admin panel **requires a verified Minecraft link**. The admin must:

1. on the website, enter their nickname to get a code,
2. run `/verify <code>` in game to log in,
3. **Link Discord** on their profile via the bot,
4. then sign into the panel with Discord.

If you just enabled the gate and several admins are locked out, they each need to complete the above. Run the API's `admin:link-check` to see exactly who is unlinked.

## Does dWebLink open any ports or expose an endpoint?

No. It only makes **outbound** HTTPS calls to your API. There is nothing to firewall on the Minecraft side beyond normal outbound access.

## Can one API serve several Minecraft servers?

Yes — give each server its own `tenant-slug` (and the matching tenant on the website). Each server links players into its own tenant.
