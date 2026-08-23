---
title: "OberonTools"
description: "OberonTools is a data-driven custom-tool framework. A tool is a block in config.yml — its item, its recipe, its permissions, its limits and its ability —…"
---

**OberonTools** is a data-driven custom-tool framework. A tool is a block in `config.yml` — its item, its recipe, its permissions, its limits and its ability — and the plugin turns that block into a craftable, giveable, expiring item without a line of Java.

Three abilities ship: **AREA_MINE**, a face-relative square pickaxe or shovel; **LIQUID_CLEAR**, a bounded sponge-style bucket; and **TIMBER**, a tree feller. All secondary work runs through one server-wide, tick-budgeted queue.

It is built on [DzusillCore](https://github.com/dzusill/DzusillCore) (shipped as **OberonCore**).

---

## What it does

- 🧱 **Tools are config, not code** — add an entry under `tools:` and you have a new item with its own name, lore, model, recipe, permissions and limits.
- 🔒 **Identified by persistent data** — the ability is bound to a hidden `tool_id` tag written into the item, never to its display name or lore. A renamed vanilla bucket is a bucket.
- ⏳ **Expiring tools** — `expires-after: 7d` stamps a deadline onto each item *as it is created*, so a rental crate handed out today is not silently extended when you edit the config next week.
- ⛏️ **Face-relative area mining** — the shipped Andromeda Drill and Excavator mine a 3×3 plane while following vanilla pickaxe/shovel mineable tags.
- 📈 **Permission radius tiers** — `oberontools.radius.<tool>.<n>` widens one player's bucket *or* pickaxe without giving them a different item. Nodes are registered at runtime, so LuckPerms tab-completes them.
- 🧯 **Anti-duplication** — the exact tool instance paying for a job is frozen in place until the job drains. It cannot be dropped, stashed, dragged or swapped mid-run.
- ⏱️ **One tick budget for the whole server** — every job shares a single queue with a fixed per-tick allowance, so three players felling redwoods costs the same per tick as one.
- 🛡️ **Protection-plugin aware** — every secondary block fires a real `BlockBreakEvent`, so WorldGuard, GriefPrevention and friends get the final say on each block.
- 🚫 **Never loads chunks** — planning and felling both skip blocks in unloaded chunks instead of pulling them in.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper **26.2+** (`api-version: '26.2'`) |
| Java | **25+** |
| OberonCore (DzusillCore) | **1.12.0+** (required, separate jar) |
| Folia | **not supported** — `folia-supported: false` |

See [Requirements](/plugins/oberontools/getting-started/requirements/).

---

## The idea in one picture

```
right-click / break a block
  └─ is the held item tagged as a tool?     PersistentDataContainer, not the name
     └─ may this player use it here?        enabled · use-permission · world · expired
        └─ plan the work                    face plane · cube of blocks · connected tree
           └─ submit to the one queue       claim blocks, freeze the tool instance
              └─ N block attempts per tick, shared by every job on the server
                 └─ each one fires BlockBreakEvent, so protections still decide
                    └─ queue empty → charge one use, unfreeze the tool, report
```

Nothing is done in the tick that started it. A 343-block drain takes more ticks than a 27-block one; it never takes a bigger bite out of a single tick.

---

## Quick links

- [Requirements](/plugins/oberontools/getting-started/requirements/)
- [Installation](/plugins/oberontools/getting-started/installation/)
- [Quick Start](/plugins/oberontools/getting-started/quick-start/)
- [Defining a Tool](/plugins/oberontools/features/defining-a-tool/)
- [Expiry](/plugins/oberontools/features/expiry/)
- [Area Mine](/plugins/oberontools/features/area-mine/)
- [Radius Tiers](/plugins/oberontools/features/radius-tiers/)
- [config.yml reference](/plugins/oberontools/configuration/config/)
- [Commands & Permissions](/plugins/oberontools/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/oberontools/faq/)
