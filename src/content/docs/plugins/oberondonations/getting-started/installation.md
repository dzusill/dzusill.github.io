---
title: "Installation"
description: "or edit plugins/OberonDonations/config.yml → store.tebex-secret directly, then /donations reload. This is the Plugin API secret, not the webhook secret —…"
---

1. Install **OberonCore** (the DzusillCore framework jar) into `plugins/`. It is a hard dependency — OberonDonations will not enable without it.
2. Keep **Tebex's own plugin** installed. OberonDonations only observes purchases; Tebex's plugin remains the only thing that delivers a package.
3. Optionally install PlaceholderAPI, Vault (with an economy), and whichever of FancyNpcs / ZNPCsPlus / Citizens you want for `NPC`-style donation boards.
4. Drop `OberonDonations.jar` into `plugins/` and restart the server.
5. Check the console:

```
  OberonDonations vX.Y.Z
  Powered by OberonCore
```

6. Set your Tebex secret, either way round:

```
/donations setsecret tebex <your Plugin API secret from the Game Servers panel>
```

or edit `plugins/OberonDonations/config.yml` → `store.tebex-secret` directly, then `/donations reload`. This is the **Plugin API** secret, not the webhook secret — they live in different places in the Tebex creator panel and are not interchangeable.

7. Verify:

```
/donations doctor
```

This prints a full health report — configured store, webhook bind state if enabled, and anything else needed to confirm the connection is live — in one place, without needing console access.

8. Confirm a real announcement end to end:

```
/donations trigger <your name>
```

This runs a fake purchase through the exact same pipeline a real one uses (announcements, the donor's head, Hype Train, GG Wave, goals) without touching the store or your leaderboard's real figures more than any other test purchase would. The reply reminds you it announces only — no package is delivered.

## Files it creates

```
plugins/OberonDonations/
├── config.yml           # store connection, currency formatting, webhook, purchase consent
├── announcements.yml    # the eight presentation channels, per event
├── packages.yml         # what each store package is called in game
├── webhooks.yml         # Discord embeds
├── goals.yml            # community goals
├── hype.yml             # the Hype Train ladder
├── ggwave.yml           # the GG Wave
├── boards.yml           # in-world donation board rendering
├── messages.yml         # this plugin's own command output
└── database.yml         # storage backend (H2 by default, or MySQL/PostgreSQL)
```

The database itself (an H2 file by default) holds every purchase, donor statistics, goal state, Hype Train history and board positions.

## Migrating an existing PerfDonation install

If `plugins/PerfDonation/perfdonation.db` exists when OberonDonations first enables, it is imported automatically, once, on the async pool — the server keeps starting while it works. A console line confirms it either way:

```
[OberonDonations] Found a PerfDonation database; importing its history once.
[OberonDonations] PerfDonation import: imported 30, skipped 0, 3 milestones
```

This is gated by a row in the plugin's own database, not a marker file, so it survives a data-folder cleanup and cannot accidentally re-run just because a file went missing — every purchase is also keyed by `(provider, transaction id)`, so even a deliberate re-run only ever reports rows as skipped rather than duplicating anything. See [Migrating from PerfDonation](/plugins/oberondonations/features/migrating-from-perfdonation/) for the WAL caveat that matters if the import looks like it is missing recent donations.

## Updating the jar

Stop the server, replace the jar, start it again. `events:` inside `announcements.yml` is an ignored section — an operator's own events are never touched by a version's new defaults, and a purchase-line migration this plugin runs itself (see the [FAQ](/plugins/oberondonations/faq/#i-upgraded-and-the-purchase-chat-line-still-says-player-not-player_head)) is the one deliberate exception to that rule.
