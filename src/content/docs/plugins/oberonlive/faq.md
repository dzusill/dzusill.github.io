---
title: "FAQ & Troubleshooting"
description: "Common OberonLive setup problems: not-ready state, rejected links, cooldown surprises, missing Discord posts, database startup and reload behavior."
---

## Why does `/live` say the plugin is not ready?

The player's stored state or the database blocklist has not loaded. Immediately after join this should be brief. If it persists, inspect the console for the first H2/MySQL connection or schema error and confirm `database.yml` has `enabled: true` with type `H2` or `MYSQL`.

## Why is a real Twitch or YouTube link rejected?

Check all of the following:

- it begins with `https://`,
- the hostname is listed under one platform,
- a subdomain has a matching `*.domain` rule,
- it has no fragment such as `#section`, user-info or non-443 port,
- it is absent from config and database blocklists,
- its length is within `url-security.max-length`.

`https://twitch.tv.attacker.example/name` is not a Twitch hostname and is correctly rejected.

## Can I allow another streaming service?

Yes. Add a new platform section with an id, display name, exact/wildcard domains and webhook color, then run `/olive reload`. Do not add a generic shortener unless you trust every destination it can redirect to.

## Why can a muted player still announce?

That is intentional. `/live toggle` controls receiving only. Publishing is controlled independently by `oberonlive.use`, and the sender always receives their own broadcast.

## Why is the cooldown not the default value?

The player may hold one or more permissions listed under `cooldowns.tiers`. OberonLive selects the shortest granted tier. Operators also receive `oberonlive.cooldown.bypass` by default through its `op` default.

## Why was the link saved but Discord did not post?

Discord is deliberately independent after the database commit. Check that the webhook is enabled, the URL has not been regenerated/deleted, the channel still exists, and the server can reach Discord over HTTPS. HTTP status and retry attempts are logged; the URL itself should remain private.

## Why can I not unblock a config entry?

`/olive unblock` only removes database entries. Delete the matching value from `blocked-domains` or `blocked-urls` in `config.yml`, then run `/olive reload`.

## Does `/olive reload` reconnect MySQL?

No. It reloads runtime presentation and policy. Database file, type, host, credentials and pool settings need a restart.

## Can I import PerfLive SQLite data?

No automatic migration is included. OberonLive uses a new H2/MySQL schema and is intended for a clean installation.

## Does OberonLive collect metrics or check for updates?

No. It includes no bStats, telemetry or update checker.

