---
title: "Configuration"
description: "The OberonAntiXray settings that matter: global threads and F5 support, per-world hiding, and the culling addons."
---

The full reference is [Imanity's documentation](https://docs.imanity.dev/antixray/configurations) and the comments in
each generated file. This page covers the keys OberonSMP uses. Restart after changing anything marked *(restart)*.

## `plugins/OberonAntiXray/config.yml` (global)

| Key | Meaning | OSMP value |
| --- | --- | --- |
| `threads` | Ray-trace worker threads, shared with the culling addons *(restart)* | `4` |
| `obfuscateThreads` | Chunk obfuscation threads; `0` = pick from CPU cores *(restart)* | `0` |
| `supportThirdPerson` / `thirdPersonMaxZoom` | Also trace from the F5 camera, so F5 views are not blank | `true` / `4.2` |
| `occludePartialBlocks` / `partialOccludingBlocks` | Treat stairs, slabs, chests… as solid for line of sight | `false` |
| `enableWorldEditTracking` | Re-hide blocks changed by WorldEdit/FAWE | `true` |

## `plugins/OberonAntiXray/config/<world>.yml` (one per world)

Picked by world name. `default-overworld.yml`, `default-nether.yml` and `default-the-end.yml` cover worlds without
their own file.

| Key | Meaning |
| --- | --- |
| `enabled` | Anti-xray on or off for this world |
| `minBlockHeight` / `maxBlockHeight` | Y range that is hidden |
| `maxRaytraceDistance`, `updateRadius`, `raytraceDelay`, `raytraceRate`, `trustedRange` | How far, how often and how close blocks are traced and revealed |
| `hideUnderLava`, `lavaRevealDistance` | Hide blocks under lava, and how close you must be to see them |
| `obfuscateBlocks` | Blocks to hide (ores, chests, spawners…) |
| `replacementBlocks`, `fakeConfig.ores` | What is shown instead: stone/deepslate plus fake ore veins |
| `stripHiddenBlockEntities`, `scrubPaletteEntries`, `preciseOcclusion`, `blockGrouping` | Leak hardening; leave on |

## Culling addons

`plugins/raytraced-entity-culling/` and `plugins/raytraced-tile-culling/` follow the same pattern: a global
`config.yml` plus `config/<world>.yml`.

| Key (entity culling) | Meaning |
| --- | --- |
| `playerOnlySneaking` | Only hide players while they sneak (OSMP: `true`) |
| `boundingBoxExpansion` | Extra margin around each entity before it is hidden. Since `oberon3` a larger value no longer leaks entities around corners |
