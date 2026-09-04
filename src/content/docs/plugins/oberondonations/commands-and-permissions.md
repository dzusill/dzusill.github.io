---
title: "Commands & Permissions"
description: "Everything is registered at runtime through OberonCore's command framework — there is no commands: block in plugin.yml, and tab-completion is derived…"
---

Everything is registered at runtime through OberonCore's command framework — there is no `commands:` block in `plugin.yml`, and tab-completion is derived automatically from each subcommand's declared arguments. The root is `/donations`; extra aliases can be added under `commands.aliases` in `config.yml`.

## Everyone (`odonations.use`)

| Command | Does |
|---|---|
| `/donations help` | The full subcommand list |
| `/donations top [metric] [period]` | The leaderboard. `metric`: `spent`, `count`, `hype`. `period`: `today`, `week`, `month`, `alltime` |

## Donor lookups (`odonations.stats`)

| Command | Does |
|---|---|
| `/donations stats [player]` | Spent, purchase count and streak — your own without an argument |
| `/donations currencies` | Totals grouped by the currency they were actually paid in — the tool for spotting mixed-currency history |

## Administration (`odonations.admin`)

**Store & data**

| Command | Does |
|---|---|
| `/donations sync [count]` | Pull recent payments from the store right now, ignoring `ignore-older-than-hours` |
| `/donations reconcile [count]` | Overwrite stored amounts that disagree with what the store reports now |
| `/donations rebuild` | Recompute every donor's statistics from the full purchase history and refresh all boards |
| `/donations setsecret <tebex\|craftingstore\|custom\|tebex-webhook> <key>` | Store an API key or webhook secret without editing `config.yml` by hand |
| `/donations reload` | Reload every configuration file, including rebinding the webhook listener if `webhook.port` changed |
| `/donations doctor` | A full health report — configured stores, webhook bind state, recent sync results, everything a support request would otherwise need asked |
| `/donations packages` | Every package your store has ever sent — id, name, how often it sold, and whether `packages.yml` names it |
| `/donations packages stubs` | Appends the unnamed ones to `packages.yml`, ready to edit. Existing entries are never touched |

**Testing**

| Command | Does |
|---|---|
| `/donations trigger <player\|uuid> [amount] [product]` | Simulates a purchase and runs it through the full announcement pipeline. **Announces only — it never delivers a package.** Accepts a real UUID for a player who has never joined this server, so the donor head can be tested for them too, and a `packages.yml` key as the product, so that package's real display name and announcement fire |
| `/donations seedtest [count] [days] [currencies]` | Generates believable fake donation history for testing leaderboards, goals and boards against real-looking data |
| `/donations cleartest` | Removes every row `seedtest` generated, and nothing else — scoped to `provider = 'test'`, so real imported or live purchases are never touched |

**Goals**

| Command | Does |
|---|---|
| `/donations goal list` | Every configured goal and its target |
| `/donations goal info <id>` | Current progress |
| `/donations goal refresh` | Recompute every goal now |
| `/donations goal reset <id>` | Start a new cycle immediately, ignoring `on-complete` |

**Hype Train**

| Command | Does |
|---|---|
| `/donations hype info` | Current level, total, donor count and time left — or that none is running |
| `/donations hype start` | Force-start one, bypassing `hype.start` thresholds |
| `/donations hype stop` | End the current one early |

**GG Wave**

| Command | Does |
|---|---|
| `/donations gg info` | Entrant count and time left — or that none is running |
| `/donations gg start` | Force-start one, bypassing `ggwave.trigger` thresholds |
| `/donations gg stop` | Close it early |

**Donation Boards**

| Command | Does |
|---|---|
| `/donations board list` | Every configured board, its renderer, metric, period and world |
| `/donations board create <id> [metric] [period] [rank]` | Places a new board where you stand (in game only) |
| `/donations board remove <id>` | Deletes one |
| `/donations board move <id>` | Moves an existing board to where you stand |
| `/donations board tp <id>` | Teleports you to a board |
| `/donations board refresh` | Recomputes and redraws every board now |
| `/donations board cleanup` | Removes orphaned board entities (armour stands, NPCs, text displays) left behind by a config edit or a crash |

## Permission nodes

| Node | Default | Grants |
|---|---|---|
| `odonations.use` | everyone | `/donations top`, being asked to consent to an announcement |
| `odonations.stats` | everyone | `/donations stats`, `/donations currencies` |
| `odonations.admin` | op | every administration command above |
| `odonations.*` | op | all of the above |

`commands.trigger-allow-console: true` in `config.yml` lets `/donations trigger` run from console as well as in game — useful for scripted testing.
