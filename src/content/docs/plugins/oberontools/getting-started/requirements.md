---
title: "Requirements"
description: "OberonTools uses no database and no economy. It writes nothing outside its own config folder."
---

| Requirement | Version | Why |
|---|---|---|
| Paper | **26.2+** | `plugin.yml` declares `api-version: '26.2'`; the jar is compiled against `paper-api 26.2` |
| Java | **25+** | Compile target |
| OberonCore (DzusillCore) | **1.12.0+** | The framework OberonTools is built on — a separate jar in `plugins/`, declared as a hard `depend` |
| WorldEdit / WorldGuard | any | Optional `softdepend`. Nothing is called directly; they see the same `BlockBreakEvent` every other listener does |
| Vulcan | any | Optional `softdepend`. When present, its FastPlace, AirPlace and Scaffold flags are suppressed only while a [builder's wand](/plugins/oberontools/features/build-wand/#vulcan) job runs |
| OberonCombat | any | Optional `softdepend`, and the preferred source of the combat tag used by `combat.block-tools`. Its `CombatService` is read through the Bukkit services manager; nothing of it is compiled against |
| PvPManager | any | Optional `softdepend`, the fallback combat-tag source when OberonCombat is absent. With neither installed, every player counts as out of combat and `combat.block-tools` never applies |
| PlaceholderAPI | any | Optional `softdepend`, read **only** as a last resort for the combat tag: when PvPManager is installed but its own API cannot be reached, `%pvpmanager_in_combat%` is asked instead. Nothing else in the plugin uses it, and it provides no placeholders of its own |
| Folia | — | **Not supported.** `folia-supported: false` |

OberonTools uses no database and no economy. It writes nothing outside its own config folder.

## The soft dependencies

`WorldEdit` and `WorldGuard` are listed only so they load first. OberonTools never imports their classes. Region protection works because every secondary block OberonTools touches is announced as a normal `BlockBreakEvent` and the result is honoured — see [The Job Queue](/plugins/oberontools/features/job-queue/#protection-events).

That means any protection plugin that listens to `BlockBreakEvent` works, listed or not. It also means that turning `processing.fire-protection-events` off disables all of them at once.

## A note on Folia

The plugin declares itself Folia-incompatible and will not enable on a Folia server. The job queue is a single global queue with one repeating task, which is not a shape Folia's regionised scheduler permits.
