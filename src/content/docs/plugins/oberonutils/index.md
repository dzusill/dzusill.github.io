---
title: "OberonUtils"
description: "Six server utilities in one plugin — teleports, warps, a crate key-all, a kill confirmation menu, night vision and /ping — with every message routed to chat, the action bar, both, or neither."
---

**OberonUtils** is the plugin that replaced seven Skript files.

Those scripts worked, but they were held together by shared global variables and by comparing
placeholder *text*. Two of them wrote the player's position into the same variable, so starting a
`/spawn` countdown and then running `/warp` left both believing they owned the teleport — and the
console filled with errors measuring a distance against a value that no longer existed. Three
separate safety checks compared a placeholder to a literal string, so whenever PlaceholderAPI was
reloading, they quietly passed: players could warp into an inactive KOTH, and `/ping` reported
vanished staff as online.

Everything here does what those scripts did, and does it once instead of twice.

## Six modules, each switchable

| Module | What it does |
|---|---|
| **Teleport** | `/spawn` and `/warp`, one warmup engine, per-warp cooldowns and arrival effects |
| **Key All** | A recurring weighted crate drop with a countdown placeholder |
| **Kill** | `/kill` and `/suicide` behind a confirmation menu |
| **Night Vision** | A permanent toggle that actually stays on |
| **Ping** | `/ping`, with vanished players properly hidden |
| **Combat** | Crystal and anchor cooldowns, plus a PvPManager tag fix |

Turn any of them off in `config.yml` and it registers nothing at all — no commands, no listeners,
no tasks.

## Every message, wherever you want it

Each message has three parts you control separately: the text, where it goes, and what it sounds
like. Delivery is `CHAT`, `ACTION_BAR`, `BOTH` or `NONE`, set per **category** and overridable per
individual message.

So moving every error onto the action bar is one line. Pinning one of them back to chat is one more.
Sounds work the same way — a category sound, overridable per message, with volume and pitch.

[How messages are delivered →](/plugins/oberonutils/configuration/messages/)

## Built to be told when something is missing

PvPManager, PremiumVanish, WorldGuard, AxKoth and PlaceholderAPI are all optional. When one is
absent the feature that needs it is skipped and a single line is written to console at startup —
and any check that cannot be answered **refuses** rather than allows.

`/oberonutils hooks` prints exactly what connected.

## Requirements

Paper **26.2**, Java **25**, and [OberonCore](/plugins/dzusillcore/) installed alongside it.

[Requirements →](/plugins/oberonutils/getting-started/requirements/) ·
[Installation →](/plugins/oberonutils/getting-started/installation/) ·
[Migrating from Skript →](/plugins/oberonutils/getting-started/migrating-from-skript/)
