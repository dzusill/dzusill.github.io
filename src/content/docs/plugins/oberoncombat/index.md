---
title: "OberonCombat"
description: "The combat tag, PvP kills, money steal, soup PvP, safe-zone barrier and combat log for Paper, built on OberonCore."
---

The combat tag, PvP kills, money steal, soup PvP, safe-zone barrier and combat log for Paper, built on OberonCore.
It replaces PvPManager and takes over the PvPManager-related parts of OberonUtils.

A player who hurts another is *tagged* for a configurable time. While tagged they cannot run blocked commands, use
item-cooldown items freely, walk into a safe zone, or log out without dying. Killing a player pays the killer a share of
the victim's balance. Everything else on this page is built around that one state.

## What it does

- **One combat tag, every kind of PvP.** Melee, arrows, tridents, TNT, end crystals, respawn anchors and beds,
  harmful splash and lingering potions, wind charges, and the damage-free throws: eggs, snowballs, fishing rods. Both
  sides are tagged, the countdown runs on the action bar (and optionally a boss bar), and a pearl or a wind charge
  starts a running tag again. See [The combat tag](/plugins/oberoncombat/features/combat-tag/).
- **Exclusions in one place.** Worlds by glob and WorldGuard regions by exact id, for the whole plugin or for a single
  feature. See [Exclusions](/plugins/oberoncombat/features/exclusions/).
- **Kills that pay.** Untag on kill, a lightning strike, a percentage of the victim's balance paid through Vault,
  optionally a share of their experience. The killer is told at once; the victim is told after they respawn. See
  [PvP kills](/plugins/oberoncombat/features/kills/).
- **Combat log.** Leaving in combat kills the player where they stand; restarts and kicks are not punished unless
  you say so; an optional fine can be taken from the balance. See [Combat log](/plugins/oberoncombat/features/combat-log/).
- **Command blacklist and item cooldowns**, moved here from OberonUtils. See [Command blacklist](/plugins/oberoncombat/features/command-blacklist/)
  and [Item cooldowns](/plugins/oberoncombat/features/item-cooldowns/).
- **Soup PvP.** Every soup heals, feeds and applies its own effects on a click, with no eating animation to slow the
  player down; `/soup` refills empty bowls. See [Soup PvP](/plugins/oberoncombat/features/soup/).
- **A safe-zone barrier.** Tagged players see a glass wall at `pvp: deny` regions, are pushed back from it, and cannot
  pearl through it. See [The safe-zone barrier](/plugins/oberoncombat/features/barrier/).
- **A PvP toggle**, off by default: `/pvp` lets a player switch their own PvP off. See [PvP toggle](/plugins/oberoncombat/features/pvp-toggle/).
- **Restrictions on a tagged player, tag effects, PvE tagging and a boss bar**, all off by default. See
  [Restrictions and tag effects](/plugins/oberoncombat/features/restrictions/).
- **Commands on events**, so a tag, a kill or a combat log can run your own commands. See
  [Commands on events](/plugins/oberoncombat/features/event-commands/) and the [kill-abuse guard](/plugins/oberoncombat/features/kill-abuse/).
- **Duels-Shyam.** Duel fighters are tagged only by each other, with no money and no lightning. See
  [Duels-Shyam](/plugins/oberoncombat/features/duels/).
- **PlaceholderAPI**, with the PvPManager names kept as an alias so TAB and scoreboards need no edit.
- **A small API** for other plugins: a service, four events, and one metadata key. See [Developer API](/plugins/oberoncombat/reference/api/).

## Where to start

New install: [Installation](/plugins/oberoncombat/getting-started/installation/), then [Quick start](/plugins/oberoncombat/getting-started/quick-start/).
Coming from PvPManager: [Moving from PvPManager](/plugins/oberoncombat/getting-started/migrating-from-pvpmanager/).
