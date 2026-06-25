---
title: "Folia Support"
description: "dHomeGUI runs natively on Folia, the regionised multithreaded fork of Paper."
---

dHomeGUI runs natively on [Folia](https://papermc.io/software/folia), the regionised multithreaded fork of Paper.

## How it works

The plugin abstracts scheduling behind an internal `PlatformScheduler`:

- On **Folia**, it uses the region/entity schedulers, so teleports and tasks run on the correct thread for each region and entity.
- On regular **Paper/Spigot**, it falls back to the standard Bukkit scheduler.

Detection is automatic at startup — there's **nothing to configure**. The same jar works on both.

## What this means

- Cross-region and cross-world teleports are dispatched safely (the teleport uses an async-aware path).
- No Folia-specific build or flag is needed.

> If you're not on Folia, none of this is visible — the plugin behaves exactly as a normal Paper plugin.
