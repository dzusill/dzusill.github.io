---
title: "Client detection"
description: "A short moment after a player joins (client-scan.delay-ticks, 2 s), OberonSentry looks at what their client reported:"
---

A short moment after a player joins (`client-scan.delay-ticks`, 2 s), OberonSentry looks at what their client reported:

- the **client brand** (`vanilla`, `fabric`, `lunarclient`, `meteor-client`, …),
- the **plugin channels** its mods registered,
- the **protocol version** (the real one through ViaVersion).

These are matched against the rules in [`clients.yml`](/plugins/oberonsentry/configuration/clients-and-reasons/). Each rule has a **confidence** (CONFIRMED, SUSPICIOUS or INCONCLUSIVE) and an **action**:

| Action | Effect |
| --- | --- |
| LOG | Stored in the player's profile only |
| FLAG | Also a "Client" flag that adds to the score (category `client`) |
| KICK | The player is kicked with the rule's reason |

Out of the box:

- Meteor, Wurst and LiquidBounce are **kicked** (CONFIRMED).
- A Freecam mod channel is **flagged** (SUSPICIOUS).
- Forge is **logged**.
- Common clients (vanilla, Fabric, Quilt, Lunar, Feather, Badlion, LabyMod, OptiFine) are not recorded at all.
- An unknown brand, or no brand at all, is only logged.

Notable detections (confirmed or suspicious, or a FLAG or KICK rule) are posted to Discord as `client-detection`. Staff with `oberonsentry.bypass.clientscan` are skipped.

## What it can't do

All of this is what the client **says about itself**. A hacked client can send `vanilla` and register no channels. So:

- A match is evidence with a confidence, never proof.
- Nothing INCONCLUSIVE kicks or bans by default.
- A full list of installed mods is not possible without a client-side mod.

## Bedrock players

Players joining through Geyser and Floodgate are scanned like everyone else, and also marked "Bedrock" in the list, the profile and on Discord, so a rule that matches one reads in context. See [The /sus list](/plugins/oberonsentry/features/the-list/#bedrock-players).
