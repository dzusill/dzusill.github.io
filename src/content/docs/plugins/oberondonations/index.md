---
title: "OberonDonations"
description: "OberonDonations watches your Tebex (or CraftingStore) store and turns every purchase into engagement: multi-channel announcements with the donor's real face…"
---

**OberonDonations** watches your Tebex (or CraftingStore) store and turns every purchase into engagement: multi-channel announcements with the donor's real face drawn in chat, Hype Trains, GG Waves, community goals, in-world donation boards and Discord embeds — plus donor statistics and leaderboards through PlaceholderAPI.

It is built on [DzusillCore](https://github.com/dzusill/DzusillCore) (shipped as **OberonCore**).

---

## What it does

- 💳 **Read-only purchase tracking** — polls the Tebex Plugin API (and optionally an inbound webhook for instant announcements), records every completed payment, and never once calls a delivery endpoint. Package delivery stays Tebex's own plugin's job, permanently.
- 🖼️ **The donor's face in chat** — `{player_head}` draws the donor's real skin as an 8×8 block of coloured squares beside the announcement, or as Minecraft's native one-character inline head. No resource pack, no image trick — read straight from the skin texture.
- 🏷️ **Your own name for every package** — a store package called `Nebula Rank (Monthly) - OberonSMP` reads as a gold-gradient **⭐ Nebula Rank** in game, in Discord and on the leaderboards, and can bring its own announcement and embed with it. `/donations packages` finds what your store sends and writes the entries for you.
- 📣 **Eight independent presentation channels** per event — chat, action bar, title, boss bar, sound, particles, firework and dispatched commands — each with its own on/off switch and a shared default, overridable per event.
- 🚂 **Hype Train** — a burst of purchases in a rolling window starts a train that climbs a ladder of levels, each with its own console and per-donor rewards, extending its timer as more purchases land.
- 🎉 **GG Wave** — a qualifying purchase opens a short window; anyone who types the trigger word enters, and the wave pays everyone or a random subset when it closes.
- 🎯 **Community Goals** — several running at once, each with its own currency, target and milestones, recomputed from the purchase history (so a refund reduces progress automatically) or read live from a Tebex community goal.
- 🏆 **Donation boards** — in-world leaderboard displays for any metric/period combination, rendered as native floating text, a player head on an armour stand, or a full NPC through FancyNpcs, ZNPCsPlus or Citizens.
- 🌍 **True multi-currency** — a purchase is always shown in the currency it was actually paid in. A €2.09 donation reads €2.09, never converted to a server default.
- 🔔 **Discord webhooks** — a rich embed per event, with the donor's rendered skin and community-goal progress in the footer, using its own `<angle>` placeholder syntax.
- 🧩 **PlaceholderAPI** — `%odonations_…%` for totals, goals, the hype train, GG wave, boards and per-donor stats, all served from a cache so a scoreboard reading them every tick never touches the database.
- 🩺 **A real support toolkit** — `/donations doctor` prints a full health report, `/donations trigger` simulates a purchase without touching the store, `/donations seedtest` generates believable fake history, and `/donations reconcile` corrects figures that have drifted from the store's own records.
- 🗃️ **A safe replacement for PerfDonation** — imports its SQLite database (WAL-aware, so nothing recently written is missed), remaps every purchase and goal cycle, and refuses to redeliver a reward that PerfDonation already handed out.

---

## What it does not do

Documented plainly rather than left to be discovered:

- **It never delivers a package, ever.** Every store adapter is structurally forbidden from calling a queue/command endpoint — enforced by a path allowlist, not just convention — and that is covered by tests. Tebex's own plugin must stay installed.
- **CraftingStore support ships disabled by default and is unverified against live documentation.** The adapter is written and structurally read-only like the Tebex one, but its payload shapes have never been confirmed against a real CraftingStore account. Enable it deliberately, and expect to adjust `store.craftingstore-key` field mappings if something looks wrong.
- **There is no `/donations` GUI.** Every interaction is a command. `/donations help` prints the full list.
- **`{player_head}` is chat only.** Action bars, boss bars and titles cannot embed an image or a native inline component in vanilla Minecraft — those channels always show the plain name.
- **Currencies are never converted.** Leaderboards, goals and lifetime totals sum one number across whatever currencies your history contains; `/donations currencies` shows the split. Only per-purchase figures are guaranteed exact.

The full list, with what to do about each, is on [Known Limitations](/plugins/oberondonations/limitations/).

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper **26.2+** (`api-version: '1.21'`) |
| Java | **25+** |
| OberonCore (DzusillCore) | required, separate jar |
| A Tebex store | Plugin API secret from the Game Servers panel |
| PlaceholderAPI | optional — enables `%odonations_…%` |
| Vault + an economy | optional — pays GG Wave money rewards |
| FancyNpcs / ZNPCsPlus / Citizens | optional — only for `NPC`-renderer donation boards |
| Folia | **supported** — every scheduled or per-player effect goes through the region-aware scheduler |

See [Requirements](/plugins/oberondonations/getting-started/requirements/).

---

## The idea in one picture

```
Tebex webhook (instant)  ─┐
                          ├─→  RawPurchase  ─→  dedupe by transaction id  ─→  stored
Tebex API poll (60s)     ─┘                                                    │
                                                                                ▼
                                                                        PurchaseEvent
                                                                                │
                    ┌───────────────┬───────────────┬───────────────┬─────────┼─────────┐
                    ▼               ▼               ▼               ▼         ▼         ▼
              donor stats     announcements     Discord embed   GG Wave   Hype Train   Goals
                                    │                                                     │
                          resolve the donor's                                   milestones fire once
                          real head, off-thread,                                per cycle; a refund
                          then fan out to all                                   recomputes progress
                          eight presentation                                    automatically
                          channels
```

A replay of imported history runs the exact same fan-out, except it never re-fires a GG Wave, Hype Train or goal reward a second time — only fresh purchases do.

---

## Quick links

- [Requirements](/plugins/oberondonations/getting-started/requirements/)
- [Installation](/plugins/oberondonations/getting-started/installation/)
- [Quick Start](/plugins/oberondonations/getting-started/quick-start/)
- [Announcements](/plugins/oberondonations/features/announcements/)
- [Package Display Names](/plugins/oberondonations/features/package-display-names/)
- [The Donor's Head in Chat](/plugins/oberondonations/features/player-heads/)
- [Hype Train](/plugins/oberondonations/features/hype-train/)
- [GG Wave](/plugins/oberondonations/features/gg-wave/)
- [Community Goals](/plugins/oberondonations/features/community-goals/)
- [Donation Boards](/plugins/oberondonations/features/donation-boards/)
- [Migrating from PerfDonation](/plugins/oberondonations/features/migrating-from-perfdonation/)
- [config.yml reference](/plugins/oberondonations/configuration/config/)
- [Commands & Permissions](/plugins/oberondonations/commands-and-permissions/)
- [Known Limitations](/plugins/oberondonations/limitations/)
- [FAQ & Troubleshooting](/plugins/oberondonations/faq/)
