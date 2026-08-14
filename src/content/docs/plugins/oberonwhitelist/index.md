---
title: "OberonWhitelist"
description: "OberonWhitelist decides which commands each rank may run and which they may even see. It matches commands by identity rather than by spelling, answers everything a player may not run with one identical error, and guarantees that whitelisted commands actually tab-complete."
---

**OberonWhitelist** controls which commands each rank can run, and which ones they can even see exist.

Command whitelists usually force a choice between two bad options. Enforce strictly, and every menu, dialog and clickable message on the server breaks — because those run commands *as the player*, and none of them are on anybody's list. Enforce loosely, and players map your entire plugin roster by typing commands and reading which error comes back.

That choice is a symptom of a missing distinction, not a real trade-off. OberonWhitelist adds it.

## The three tiers

Every command sits in one of three states for a given rank:

| Tier | In tab completion | Runnable | For |
|---|---|---|---|
| **Visible** | yes | yes | ordinary commands a rank is given |
| **Execute-only** | no | yes | menu buttons, dialog callbacks, clickable messages |
| **Blocked** | no | no | everything else |

Execute-only is what makes strict enforcement usable. A dialog button runs its command as the player, so the command must be allowed — but the player should never see it or type it. With only "allowed" and "blocked" to work with, that case is impossible to express, which is why strict modes elsewhere break menus.

→ [The Three Tiers](/plugins/oberonwhitelist/features/three-tiers/)

## Commands are matched by identity

A whitelist entry names a *command*, not a spelling. Granting `/fly` covers `/essentials:fly`, `/f`, and every other alias the server registered — automatically, without anybody maintaining a list.

This cuts both ways. It is also why no namespaced spelling slips past the block list: `/pl`, `/bukkit:pl` and `/minecraft:pl` are one command, and blocking it blocks all of them.

→ [Command Identity](/plugins/oberonwhitelist/features/command-identity/)

## One error for everything

Blocked commands, hidden commands and commands that were never installed all produce the same configured message, action bar and sound. Paper's unknown-command path runs the same actions as a denial, so the two are byte-identical.

A player cannot tell which plugins you run by watching which error comes back, because there is only one error.

→ [One Indistinguishable Error](/plugins/oberonwhitelist/features/one-error/)

## Tab completion is guaranteed, not just filtered

Filtering alone cannot put back a command the server left out of the command tree — one whose plugin registered late, or whose tree was built before a permission applied. That is the usual cause of "the whitelist broke my tab completion".

OberonWhitelist adds granted commands back when the player can actually run them, resends the command tree whenever the set of registered commands changes, and reports at startup any configured command that no plugin provides.

→ [Tab Completion](/plugins/oberonwhitelist/features/tab-completion/)

## Requirements

* **Paper** 1.21 or newer (Folia supported)
* **Java** 21 or newer
* **OberonCore / DzusillCore** 1.11.0 or newer — install this first
* *Optional:* LuckPerms, to resolve ranks from primary groups

→ [Requirements](/plugins/oberonwhitelist/getting-started/requirements/)

## Quick links

* [Installation](/plugins/oberonwhitelist/getting-started/installation/)
* [Quick Start](/plugins/oberonwhitelist/getting-started/quick-start/)
* [Migrating from PerfCommandWhitelist](/plugins/oberonwhitelist/getting-started/migrating/)
* [Menu & Dialog Plugins](/plugins/oberonwhitelist/features/menu-plugins/)
* [Commands & Permissions](/plugins/oberonwhitelist/commands-and-permissions/)
* [config.yml](/plugins/oberonwhitelist/configuration/config/)
