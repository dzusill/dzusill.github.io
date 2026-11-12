---
title: "OberonFFA"
description: "Killstreaks, rewards and leaderboards for the FFA arena, built on OberonCore and OberonKits."
---

Killstreaks, rewards and leaderboards for the FFA arena, built on OberonCore and OberonKits.

Every player death in the FFA worlds runs through a set of anti-abuse rules. A kill that counts raises
the killer's streak, pays streak milestones and the shutdown bonus, moves the daily first kills and
the passes forward, and lands on the day's, week's, month's and all-time leaderboards. A kill that does
not count tells the killer why, and still ends the victim's streak.

## What it does

- **The arena is OberonKits' FFA profile.** The worlds are configured once, in OberonKits; OberonFFA
  reads them (`arena.profile: ffa`) and falls back to its own `arena.worlds` list.
- **Kills that count, and kills that do not.** Game mode, vanish, Duels-Shyam duels, freshly spawned
  victims, the same victim within 10 minutes (both ways) and accounts sharing an address are all
  rejected. Each rule is switched on its own. See [anti-abuse](/plugins/oberonffa/features/anti-abuse/).
- **Killstreaks.** Milestones (3, 5, 10, 15, 20, then every 5) pay once per streak, and killing someone
  on a streak of 5 or more pays a **shutdown** bonus by their streak. Broadcasts reach the arena or the
  whole server by streak. Streaks show as particles and a tag placeholder — never as a glow.
- **Daily first kills.** Each of the first 5 kills of the day pays, all of them together a bonus. Every
  victim must be different, and one address group collects once.
- **Passes.** A weekly and a lifetime pass ship enabled (daily and monthly are ready, switched off).
  Tiers unlock with kills or best streak and are claimed in `/ffa`; unclaimed tiers are handed over when
  the period ends.
- **Leaderboards.** Kills and best streak per day, week, month and all time, plus live streaks —
  placeholders in the same shape as OberonStats for DialogMaster dialogs, `/ffa top` in chat, and
  automatic payouts for the top 3 of the week.
- **Rewards** are commands (stardust, money, crate keys), items (into a claim storage, collected outside
  the arena — FFA has its own inventory) or uses of a paid OberonKits kit. Offline players get theirs at
  the next join.

## Requirements

- Paper 1.21 or newer, Java 21
- OberonCore 1.14.6 or newer
- OberonKits 1.2.1 or newer
- Optional: PlaceholderAPI (placeholders), OberonCombat (combat-log kills count), Duels-Shyam (duel
  kills never count), PremiumVanish (vanished staff never count)
