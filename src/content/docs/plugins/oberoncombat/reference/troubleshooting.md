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

## Nothing is stolen, and nobody is punished for combat logging

Check the console at startup for the Duels-Shyam line: `Hooked into Duels-Shyam … (N arena world(s): […])`. A fighter standing in an
**arena world** counts as in a duel: no money, no lightning, no combat-log punishment. Duels-Shyam ships an `example.yml` arena whose
world is the **main world**; read as an arena world it made every player on the server count as dueling. OberonCombat now leaves the main
world out of the automatic list (and says so in the console). If you list worlds by hand in `integrations.duels-shyam.arena-worlds`, keep the
main world out of the list unless duels really are fought in it.

## Money steal moves the wrong money

`/oberoncombat status` shows what is paid (`Money steal pays through:`). With ExcellentEconomy installed, `money-steal.economy: auto` pays
its currency directly. If it says `Vault: EssentialsX Economy`, Vault is not answering with the economy your players use: set
`money-steal.economy: excellenteconomy` and `money-steal.currency` to the currency id.

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

## Soups seem to multiply in the inventory

Mushroom stew, rabbit stew, beetroot soup and suspicious stew **stack to one**. EssentialsX's `/give <player> mushroom_stew` with no amount
gives a full stack of 64 in a single slot, which vanilla does not allow. The moment such a stack is dropped (a death) and picked up
again, the game spreads it into one stew per free slot: it looks like duplication but is the same number of soups. OberonCombat takes
exactly one soup per use and never adds any; this is covered by a test that spams every kind of click. Give soups with an amount
(`/give <player> mushroom_stew 1`) or the vanilla `/minecraft:give`.

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
