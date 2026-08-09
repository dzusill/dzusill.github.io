---
title: "FAQ & Troubleshooting"
description: "One of api-base-url, api-key or tenant-slug is empty in config.yml. Fill all three and run /dweblink reload."
---

### Every command says "Website linking isn't configured on this server yet."

One of `api-base-url`, `api-key` or `tenant-slug` is empty in `config.yml`. Fill all three and run `/dweblink reload`.

### "couldn't reach the website"

The plugin could not open a connection at all. Check:

- `api-base-url` is reachable **from the server host** — try `curl` from that machine, not your laptop
- no trailing slash on the URL
- outbound HTTPS is not firewalled
- the API is actually running

### "the website returned an unexpected response"

The connection worked but the API refused the request. Almost always one of:

- `api-key` does not match `MC_PLUGIN_API_KEY`
- `tenant-slug` names a tenant that does not exist
- the API is a different major version than the plugin

### Does the plugin store player data?

No. There is no database and no data file. Everything lives on the Phalanx API; the plugin holds only short-lived in-memory state (a cached Discord code, a pending unlink confirmation), both lost on restart by design.

### Can a player brute-force a code?

No. Attempt counting and lockout are enforced by the API, not the plugin, so restarting the server or hopping between servers on a network does not reset them.

### A player's rank is wrong on the website.

In order:

1. Is LuckPerms installed? Without it only the username is pushed.
2. Is `profile-sync.enabled` true?
3. For live updates, is `on-rank-change` true?
4. If a promotion is several commands, raise `rank-change-settle-ticks` so the plugin reads after the last one.

### Rank updates arrive several times for one promotion.

Raise `rank-change-coalesce-seconds`. LuckPerms emits a burst of recalculation events per change; coalescing collapses them into one push.

### Can I run dWebLink without dPhalanx?

Yes. dWebLink is standalone and gives you website login, email verification and Discord linking. dPhalanx adds chat relay, tickets, reports and the rest — and requires dWebLink.

### Can I run dPhalanx without dWebLink?

No. dPhalanx delegates all account linking to dWebLink.

### Does it work on Folia?

Yes.

### A player cannot unlink their Discord — "admin blocked".

That link was made administratively and is deliberately not player-removable. Remove it from the website admin panel.

### Does `/reload confirm` work?

Do not use it. Use `/dweblink reload` for config, and a real restart for a jar upgrade.

## Next

- [Credits](/plugins/dweblink/credits/)
