---
title: "Troubleshooting"
description: "OberonCombat replaces PvPManager and refuses to run beside it. Remove PvPManager.jar from plugins/ and set"
---

## The plugin does not start: "PvPManager is installed"

OberonCombat replaces PvPManager and refuses to run beside it. Remove `PvPManager.jar` from `plugins/` and set
`hooks.pvpmanager: false` in Duels-Shyam's `config.yml`, then restart.

## "The core this plugin runs on is too old"

Install OberonCore 1.14.4 or newer. If an older OberonCore or DzusillCore jar is also in `plugins/`, remove it: two cores side by
side can serve this plugin classes from the older one.

## Nothing is stolen on a kill

`/oberoncombat status` shows whether Vault is found. Money needs Vault **and** an economy plugin registered with it
(ExcellentEconomy needs the Vault jar even with its own Vault integration switched off). Also check the victim has money,
that neither player stands in a place excluded for `money-steal`, that the kill was not in a [duel](/plugins/oberoncombat/features/duels/), and that
the [kill-abuse guard](/plugins/oberoncombat/features/kill-abuse/) did not withhold it.

## There is no barrier

It needs WorldGuard, `barrier.enabled: true`, a region whose `pvp` flag is `deny`, and a **tagged** player. `/oberoncombat status`
shows "Barrier regions known". A newly flagged region is picked up within `barrier.index-refresh` or at
`/oberoncombat reload`. A player already inside a region gets no wall by design.

## `/pvp` says the toggle is not enabled

Set `pvp-toggle.enabled: true` and reload.

## A player was tagged by nobody

A mob hit them with `combat.pve-tag` on, or damage another player was responsible for: a fall, fire or the void within
`combat.attribution-window` of a hit. `/oberoncombat debug` turns on the event trace; `/oberoncombat debug <player>` shows who their
enemies are.

## Soup slows the player down

A flicker for a tick is expected; a lasting slowdown is not. Check `soup.eat-state-fix: reset` and report the server and client
versions. See [Soup PvP](/plugins/oberoncombat/features/soup/#no-slowdown).

## OberonUtils, OberonAfk or OberonTools ignore combat

They need the builds that know about OberonCombat ([Installation](/plugins/oberoncombat/getting-started/installation/#plugins-that-talk-to-oberoncombat)).
Without them `/afk`, teleports and tool abilities work in combat once PvPManager is gone.

## Duels-Shyam is not hooked

`/oberoncombat status` shows whether it was found. The hook retries five times at startup. Check
`integrations.duels-shyam.enabled` and that the installed version is **1.0.4**; ShyamDuels 2.0 is a different plugin.

## A config value was ignored

The console names the key at load: `config.yml: …`. Fix the key, then `/oberoncombat reload`.
