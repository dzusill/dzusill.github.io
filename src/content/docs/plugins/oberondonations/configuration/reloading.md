---
title: "Reloading"
description: "Use this, not a generic server /reload — it does several things specific to this plugin that a bare Bukkit reload cannot:"
---

```
/donations reload
```

Use this, not a generic server `/reload` — it does several things specific to this plugin that a bare Bukkit reload cannot:

1. **Every configuration file is re-read** — `config.yml`, `announcements.yml`, `packages.yml`, `webhooks.yml`, `goals.yml`, `hype.yml`, `ggwave.yml`, `boards.yml`, `messages.yml`.
2. **`announcements.yml`'s one-time purchase-line migration runs again if needed** — the exact legacy `{player}` purchase line is rewritten to `{player_head}` automatically; see the [FAQ](/plugins/oberondonations/faq/#i-upgraded-and-the-purchase-chat-line-still-says-player-not-player_head). This is the one deliberate exception to `events:` otherwise never being touched by an update.
3. **The live Tebex API client is re-pointed** at whatever `store.tebex-secret` now is — a changed credential does not need a restart.
4. **The webhook listener is rebound.** It only ever binds once at server start with whatever port and secret were true then; without an explicit rebind on reload, turning `webhook.port` on (or changing `webhook.tebex-secret`) and reloading would report success while no listener is actually running — a Tebex "Send Test" or a real delivery would then go nowhere with no error on either side. `/donations reload` calls the same start routine reload uses at boot, which safely stops any previous listener first, so this is exactly a clean rebind, not a leak.
5. **The reply tells you the webhook's real state**, not just what the config says: off (port 0), listening, failed to bind (check console — likely the port is already in use), or configured but not bound because no webhook secret is set.
6. **Every configured store is verified** — the same check `/donations doctor` does, printed as part of the reload's own reply, so a reload immediately tells you whether the connection it just re-read is actually good.

## What is not touched by a reload

`events:` inside `announcements.yml` is never merged with a version's new defaults, regardless of reload or restart — an operator's own events are never overwritten. New top-level keys outside `events:` do merge in on load. See [announcements.yml](/plugins/oberondonations/configuration/announcements-yml/#upgrading-an-existing-file).

## For anything else

A code change needs a restart, as with any plugin — replace the jar, stop the server, start it again. See [Installation → Updating the jar](/plugins/oberondonations/getting-started/installation/#updating-the-jar).

## See also

- [`/donations doctor`](/plugins/oberondonations/commands-and-permissions/) — the same connection check, on demand, with more detail
- [config.yml](/plugins/oberondonations/configuration/config/)
