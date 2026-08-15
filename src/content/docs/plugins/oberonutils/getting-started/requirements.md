---
title: "Requirements"
description: "What OberonUtils needs, and what it can optionally talk to."
---

## Required

| | |
|---|---|
| **Server** | Paper **26.2** or newer |
| **Java** | **25** — not a preference. Paper 26.2's own API is compiled for Java 25. |
| **OberonCore** | Must be installed. `depend: [OberonCore]`, so the server refuses to enable OberonUtils without it. |

Folia works too. Everything that schedules a task or moves a player goes through OberonCore's
platform scheduler, so the plugin behaves correctly on both without a different build.

## Optional integrations

None of these are required. Each is detected at startup, and the feature that needs it is simply
skipped when it is absent.

| Plugin | Used for | Without it |
|---|---|---|
| **PlaceholderAPI** | The `%oberon_keyall_timer%` expansion | The placeholder is unavailable; everything else works |
| **PvPManager** | Combat detection, and the exempt tag fix | Nobody reads as combat-tagged, so combat-gated features stay off |
| **WorldGuard** | Region-based teleport bypasses | Region rules are skipped; permission and world rules still apply |
| **PremiumVanish** / **SuperVanish** | Hiding vanished players from `/ping` | Nobody can be vanished, so nobody is hidden |
| **AxKoth** | The "is a KOTH running" requirement on a warp | Any warp with that requirement is **refused** |

## Fail closed, and say so

That last row is the important one. A check that cannot be answered refuses the action rather than
allowing it.

This is deliberate. The Skript setup compared placeholder text — `placeholder "axkoth_Koth_active"
is "false"` — so if AxKoth was missing, or PlaceholderAPI was mid-reload, or the wording ever
changed, the comparison was false and **the warp went through**. Players teleported into an inactive
arena and nothing was logged.

You can see the current state at any time:

```
/oberonutils hooks
```

It prints one line per integration saying whether it connected. The same block is written to console
once at startup, controlled by `hooks.log-status-on-startup` in `config.yml`.

## Command conflicts

Several commands overlap with plugins you may already run:

- **EssentialsX** registers `/spawn`, `/setspawn`, `/kill`, `/suicide`, `/warp`, `/setwarp` and `/delwarp`
- **spark** registers `/ping`

Add the ones you want OberonUtils to own to EssentialsX's `disabled-commands` list before installing.
See [Installation](/plugins/oberonutils/getting-started/installation/).
