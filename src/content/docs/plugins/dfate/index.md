---
title: "dFate"
description: "dFate asks every player one question the first time they join — hardcore, lifesteal or normal — and then holds them to the answer. A hardcore player who…"
---

**dFate** asks every player one question the first time they join — hardcore, lifesteal or normal — and then holds them to the answer. A hardcore player who dies loses the account for 24 hours; a lifesteal player loses a heart, and the account only once there are none left. The choice is permanent; only an admin can undo it.

It is built on [DzusillCore](https://github.com/dzusill/DzusillCore) and renders the choice through [dDialogs](https://github.com/dzusill/DDialogs) as a real Minecraft dialog screen — with a working chat fallback for every client too old to draw one.

---

## What it does

- 🔮 **One choice, on the first join** — a native dialog screen. No chest GUI, no chat command to remember.
- ❤️ **Lifesteal** — start with ten hearts, lose one per death, banned at zero. The bar is held down against respawns, kits and anything else that would quietly hand the hearts back.
- 🔒 **Nobody skips it** — the escape key is disabled, the player is frozen and made invulnerable until they answer. Lose the screen and you are told in chat to run `/fate`; a timed sweep puts it back regardless.
- ⚰️ **Hardcore death costs the account** — a configurable ban command (AdvancedBan syntax by default) plus a broadcast, a title, a sound, and any console commands you want.
- ♾️ **Permanent by design** — surviving the ban does not clear the mode. Die again, banned again. Nothing a player can run ever walks them back to normal.
- 🛡️ **Full exemption set** — bypass permission, world blacklist or whitelist, damage-cause list, and a grace period after choosing.
- 🧩 **PlaceholderAPI** — 10 placeholders for TAB, scoreboards and chat formats, including a badge whose text you set per mode (and leave empty for players who have not chosen).
- 🗄️ **Flat file or SQL** — `modes.yml` by default, MySQL/PostgreSQL when the mode has to follow the account across a network.
- 🌍 **Every string configurable** — the dialog's title, body, button labels and tooltips all live in `messages.yml` alongside the chat messages.

---

## Requirements

| Requirement | Version |
|---|---|
| Server | Paper / Purpur / Folia **1.21.x** |
| Java | **21+** |
| DzusillCore | **1.12.0+** (required — this is where `DialogService` lives) |
| dDialogs | optional, strongly recommended (renders the native screen) |
| A ban plugin | optional (AdvancedBan, LiteBans, CMI — the server's own ban list is the fallback) |
| PlaceholderAPI | optional (placeholders) |
| MySQL / PostgreSQL | optional (cross-server storage) |

---

## The idea in one picture

```
first join
  └─ has a stored mode?
     ├─ yes → nothing happens, ever
     └─ no  → freeze · invulnerable · show the choice screen
              ├─ NORMAL    → stored, released, done
              ├─ HARDCORE  → "are you certain?" → death → filters → ban
              └─ LIFESTEAL → "are you certain?" → death → filters → −1 heart
                                                          └─ at zero → ban
                             └─ ban expires → STILL in the same mode
```

The one thing worth understanding: **"has not chosen" is not a third mode.** It is the absence of a record. That is what makes the lock necessary — an unchosen player is outside every rule the plugin enforces, so they are not allowed to walk away from the question.

---

## Quick links

- [Requirements](/plugins/dfate/getting-started/requirements/)
- [Installation](/plugins/dfate/getting-started/installation/)
- [Quick Start](/plugins/dfate/getting-started/quick-start/)
- [The Choice](/plugins/dfate/features/the-choice/)
- [Hardcore Death](/plugins/dfate/features/hardcore-death/)
- [Lifesteal](/plugins/dfate/features/lifesteal/)
- [Exemptions](/plugins/dfate/features/exemptions/)
- [Commands & Permissions](/plugins/dfate/commands-and-permissions/)
- [Placeholders](/plugins/dfate/placeholders/)
- [FAQ & Troubleshooting](/plugins/dfate/faq/)
