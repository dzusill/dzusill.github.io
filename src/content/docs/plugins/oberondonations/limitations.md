---
title: "Known Limitations"
description: "Documented plainly rather than left to be discovered."
---

Documented plainly rather than left to be discovered.

## By design — will not change

- **No package delivery, ever.** Every store adapter's HTTP client is built against a path allowlist that structurally cannot reach a queue or command endpoint — this is tested, not just a promise in a paragraph. Tebex's own plugin remains the only thing that runs a package command. Uninstalling it means purchases still get announced, but nobody receives anything.
- **Currencies are never converted.** A purchase is always shown in the currency it was actually paid in. Aggregates (leaderboards, goal progress, lifetime totals) are a plain sum, so a history with several currencies mixes units in those figures — run `/donations currencies` to see the split. This will not become an exchange-rate feature.
- **No in-game GUI.** Every interaction is a command; `/donations help` lists them all.

## Real gaps, being honest about them

- **CraftingStore support is unverified against live documentation and ships disabled** (`store.craftingstore-key: ''`). The adapter is written and is just as structurally read-only as the Tebex one, but its exact JSON field names have never been confirmed against a real CraftingStore account. If you enable it and a value comes through wrong or missing, that is the reason — check the actual payload against what the adapter expects before reporting it as a bug elsewhere.
- **`update-checker.enabled` in `config.yml` does nothing.** It is parsed and kept so an existing file round-trips; this build never contacts a remote service to check for a newer version.
- **The `NPC` renderer spawns a body on Citizens only.** FancyNpcs and ZNPCsPlus are detected, but there is no adapter for either — their APIs have no reflective entry point stable enough across versions to bind against blind. A board asking for `NPC` on a server running only those logs one line and renders native text instead:

  ```
  [OberonDonations] FancyNpcs is installed but OberonDonations has no verified adapter for it yet;
  boards render with native text displays.
  ```

  If you want a body, install Citizens and set `npc.skin-backend: citizens`. If you want a **face** without any NPC plugin, use the `HEAD` renderer — a player skull wearing the donor's real skin on an invisible armour stand — which needs nothing installed and always works.
- **`/donations trigger <name>` cannot show a head for a name your server has never seen**, on an `online-mode: false` backend behind a proxy. Bukkit synthesises an offline UUID for an unknown name without ever asking Mojang — there genuinely is no skin to fetch. Pass the player's real UUID instead of their name to test the head for someone who is not currently online; a player who has actually joined through the proxy is cached with their real UUID and works by name. See [The Donor's Head in Chat](/plugins/oberondonations/features/player-heads/).
- **`{player_head}` cannot appear outside chat.** Action bars, boss bars and titles have no way to embed an image or a native object component in vanilla Minecraft; those channels always fall back to the plain name, even with the head style enabled.

## Operational choices, not bugs

- **The inbound webhook needs an open port and, for anything public, a reverse proxy with TLS.** Polling (`store.poll`, on by default) needs none of that and is the supported way to receive purchases — Tebex allows 500 requests per 5 minutes, and the default 60-second interval uses about five. Enable the webhook only for lower announcement latency, and put it behind a reverse proxy the moment it is reachable from the internet.
- **A fresh install ignores purchases older than `store.poll.ignore-older-than-hours`** (24 by default) so the very first poll does not announce a year of back-catalogue at once. Use `/donations rebuild` to recompute donor statistics from full history without re-announcing it, or `/donations sync <count>` for a manual pull that ignores the age cutoff.
- **A goal's currency must match `store.default-currency`,** or it refuses to start. This is deliberate: a goal quietly measuring purchases in the wrong currency would misreport its own progress with no visible error.
