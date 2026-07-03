---
title: "FAQ & Troubleshooting"
description: "Common dWebLink problems — /webtoken errors, key mismatches, missing ranks, admins locked out of the panel — and how to fix them."
---

## `/webtoken` says "not configured"

`api-key` is empty in `plugins/dWebLink/config.yml`. Paste the shared key (the same value as the API's `MC_PLUGIN_API_KEY`) and restart.

## `/webtoken` returns an error / "HTTP 401"

The plugin's `api-key` does not match the API's `MC_PLUGIN_API_KEY`, or the API is unreachable. Check:

- both values are **identical** (no stray spaces or quotes),
- `api-base-url` is correct, has **no trailing slash**, and **no `/api/v1`**,
- the API is up: `curl https://api.yourserver.gg/api/v1/health`.

## The website says my password is wrong

Website login checks the **AuthMe** password. Confirm:

- AuthMe uses a **MySQL** backend (not SQLite),
- the API's `AUTHME_DB_*` variables point at that database,
- the password hash is one the API supports (SHA256 or BCRYPT). If AuthMe uses another algorithm, the API needs to be taught it.

## A player linked but has no rank on the site

Rank is pushed on the **first join after linking** (or on `/webtoken`). Ask them to relog or run `/webtoken`. Then check:

- **LuckPerms** is installed (without it, only the name is pushed),
- `profile-sync.enabled: true`,
- the player actually has a primary group / prefix in LuckPerms.

## A rank shows with weird symbols

The prefix contained color codes the stripper did not catch. dWebLink removes `&`/`§` codes, `§x` hex, and MiniMessage tags. If something slips through, simplify the LuckPerms prefix or open an issue with the exact prefix string.

## An admin can't log into the panel

The admin panel **requires a verified Minecraft link**. The admin must:

1. `/webtoken` in game,
2. log into the public website with their Minecraft username + password + the code,
3. **Link Discord** on their profile via the bot,
4. then sign into the panel with Discord.

If you just enabled the gate and several admins are locked out, they each need to complete the above. Run the API's `admin:link-check` to see exactly who is unlinked.

## Does dWebLink open any ports or expose an endpoint?

No. It only makes **outbound** HTTPS calls to your API. There is nothing to firewall on the Minecraft side beyond normal outbound access.

## Can one API serve several Minecraft servers?

Yes — give each server its own `tenant-slug` (and the matching tenant on the website). Each server links players into its own tenant.
