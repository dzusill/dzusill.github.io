---
title: "Requirements"
description: "OberonLive targets Paper and Folia 1.21–26.x, requires Java 25 and OberonCore 1.12.0, and stores all runtime state in H2 or MySQL."
---

| Requirement | Version | Notes |
|---|---|---|
| Paper | **1.21–26.x** target range | The current build and automated server test baseline use Paper 26.2 APIs. |
| Folia | **1.21–26.x** target range | `folia-supported: true`; all player work is scheduled per entity. |
| Java | **25+** | The jar is compiled with Java 25 bytecode. |
| OberonCore | **1.12.0+** | Hard dependency, installed as a separate jar. |
| PlaceholderAPI | **2.12+**, optional | Resolves third-party placeholders and exposes `%oberonlive_*%`. |
| Storage | H2 or MySQL | Mandatory. H2 is the zero-configuration default. |

OberonLive compiles against the Maven artifact `me.dzusill:DzusillCore:1.12.0` with `provided` scope. It does not shade that artifact. At runtime, `plugin.yml` requires the white-labelled **OberonCore** build, which exposes the same API packages.

## No other plugin dependencies

OberonLive does not require LuckPerms, Vault, an economy plugin, DiscordSRV, JDA or a Discord bot. LuckPerms is a convenient way to grant the ordinary Bukkit permission nodes used by cooldown tiers, but there is no LuckPerms API dependency.

## Storage is not optional

Player opt-out state, cooldown timestamps, lifetime counts, history and dynamic moderation blocks are durable data. If `database.yml` is disabled, names an unsupported type, or cannot connect, OberonLive refuses to enable rather than running with partial state.

There is no legacy database migration: the plugin is designed for a clean first installation.

