---
title: "OberonMob"
description: "Per-player mob and phantom spawn toggles with two strategies you choose between, a fully configurable entity list, and spawn handling that costs nothing when nobody is using it."
---

**OberonMob** lets each player switch off the mobs they don't want to deal with — `/mob` for hostiles, `/phantoms` for phantoms — without emptying anyone else's farm.

Bukkit cannot cancel a spawn for one player and allow it for another, so "per player" has two honest implementations. OberonMob ships both and lets you pick per toggle.

---

## What it does

- 🔀 **Two strategies** — cancel the spawn, or let it spawn and hide it from that player alone.
- 🧩 **Toggles are config, not code** — add `/creepers` by editing a file.
- 🏷️ **Group tokens** — `#ENEMY`, `#ANIMAL`, `#BOSS` and friends, so a list doesn't go stale when Mojang adds a mob.
- 🛡️ **Nothing deliberate is touched** — spawners, eggs, breeding, cured villagers and player-built golems are left alone.
- 💾 **Toggles persist** — stored in an embedded database, no setup required.
- ⚡ **Free when unused** — the common case is one `isEmpty()` per spawn.

---

## The two strategies

| | `CANCEL_SPAWN` | `HIDE_ENTITY` |
|---|---|---|
| The mob | never spawns | spawns, and is hidden from that player |
| Affects others | only when everyone nearby has it off | never |
| Runtime cost | none once running | a periodic sweep while in use |
| Catch | it is a shared decision | the mob is still physically there |

**Neither ever removes a mob that already exists.** Walking past somebody's zombie villager farm with mobs off leaves it exactly as you found it.

See [How it works](/plugins/oberonmob/features/how-it-works/).

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper, Purpur or Folia **1.21.x** |
| Java | **21** |
| DzusillCore | **1.5.0** or newer — required |
| PlaceholderAPI | optional |

See [Requirements](/plugins/oberonmob/getting-started/requirements/).

---

## Quick links

- [Installation](/plugins/oberonmob/getting-started/installation/)
- [Quick Start](/plugins/oberonmob/getting-started/quick-start/)
- [How it works](/plugins/oberonmob/features/how-it-works/)
- [Entity groups](/plugins/oberonmob/features/entity-groups/)
- [Adding your own toggle](/plugins/oberonmob/features/custom-toggles/)
- [Commands & Permissions](/plugins/oberonmob/commands-and-permissions/)
- [FAQ & Troubleshooting](/plugins/oberonmob/faq/)
