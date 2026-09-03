---
title: "Quick Start"
description: "Ten minutes from a fresh install to a working announcement."
---

Ten minutes from a fresh install to a working announcement.

## 1. Connect the store

```
/donations setsecret tebex <your Tebex Plugin API secret>
```

Get this from the Tebex creator panel → **Game Servers** (not Developers → Webhooks — that is a different secret for a different, optional feature).

## 2. Confirm the connection

```
/donations doctor
```

Look for the store showing as configured and reachable. If it is not, double-check the secret and that `store.timeout-seconds` is not being hit by a slow network path.

## 3. See a real announcement

```
/donations trigger <your name> 4.99 Test Package
```

You should see a chat announcement with your name (and, if `player-head-hover: true`, your actual face drawn as coloured squares beside it), the product line, and a clickable store link. The reply reminds you: this announces only, it never delivers a package.

If the head is missing, see [The Donor's Head in Chat](/plugins/oberondonations/features/player-heads/#troubleshooting) — the short version is that testing with your own name only shows a real head if you are online right now, or if your server is online-mode; a name it has never seen on an offline-mode backend needs a real UUID instead of a name.

## 4. Pull real history (optional)

```
/donations sync 25
```

Pulls the 25 most recent payments right now, ignoring the age cutoff that automatic polling respects — useful once, right after connecting the store, so you are not staring at an empty leaderboard until the next scheduled poll.

## 5. Set up one thing that makes it feel alive

Pick one:

- **A community goal** — edit `goals.yml`, set a `target` and `currency` matching `store.default-currency`, then `/donations goal refresh`.
- **A donation board** — stand where you want it and run `/donations board create top1 spent alltime 1`.
- **The Hype Train** — set `hype.enabled: true` in `hype.yml`, adjust `start.min-amount` for your server's scale, and the next real burst of purchases will start one on its own. `/donations hype start` tests it immediately.
- **GG Wave** — set `enabled: true` in `ggwave.yml`; the next qualifying purchase opens a window on its own, or force one with `/donations gg start`.

## 6. Generate believable test data (optional, before going live)

```
/donations seedtest 120 45 USD,EUR
```

Generates 120 fake donations spread over the last 45 days across two currencies — enough to see leaderboards, goal progress and boards with realistic-looking data before a single real purchase arrives. Remove it cleanly whenever you like:

```
/donations cleartest
```

This only ever removes rows `seedtest` itself generated; real and imported purchases are never touched by it.

## Where to go next

- [Announcements](/plugins/oberondonations/features/announcements/) — the eight channels and how to customise them per event
- [Community Goals](/plugins/oberondonations/features/community-goals/)
- [Donation Boards](/plugins/oberondonations/features/donation-boards/)
- [config.yml reference](/plugins/oberondonations/configuration/config/)
