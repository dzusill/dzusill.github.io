---
title: "Testing"
description: "Two layers, because they prove different things."
---

Two layers, because they prove different things.

## Unit and integration tests

```bash
mvn test
```

MockBukkit, JUnit 5 and Mockito — 71 tests, covering the parts where a bug is invisible until it has
been wrong for a week:

| Suite | Tests | Proves |
|---|---|---|
| `RollEngineTest` | 7 | A million seeded rolls land within half a percent of every weight, weights normalise, the zone `chance` gates a payout, switched-off rewards are never rolled, ranges stay in range |
| `ZoneTimerTest` | 14 | The timer pays at the interval, restarts on leaving, death and a game-mode change, ignores creative, and delivers to inventory, storage, the cap and the console |
| `ClaimStorageTest` | 9 | A stack is claimed once and only once, partial and full inventories, stored items survive a relog, the menu cannot be used as a chest, a reload to fewer rows cannot open an open menu's lower rows, a clear during a join is not undone |
| `TeleportTest` | 9 | The warm-up completes, is cancelled by moving and by damage, is refused in combat, and nobody is ever teleported without asking |
| `StatsPersistenceTest` | 2 | Totals and history reach the database and a relog adds to the stored totals instead of replacing them |
| `RewardsConfigTest` | 4 | A broken reward switches off only itself, a captured item switches its reward on, a reward you deleted stays deleted |
| `ConfigurabilityTest` | 5 | Message categories and sounds, titles for any message, help from `messages.yml`, slot syntax, the menu layout following `gui.yml` |
| `TimeFormatTest` | 4 | The default countdown and duration formats, templates, units set to `never`, partial configuration |
| `DurationsTest` | 2 | Every interval shape, and that a huge number is refused instead of throwing or wrapping around |
| `MessagesResolveTest` | 4 | Every message key the code sends resolves through Bukkit's own YAML parser |
| `OberonAfkEnableTest` | 10 | The plugin boots, every shipped file parses into what was agreed, commands and aliases register |
| `ItemCodecTest` | 1 | A stored item survives the round trip with its amount and name |

Three design decisions exist to make this possible:

- **`RegionLookup` is an interface.** The one class that names a WorldGuard type is built only after a
  plugin-manager check, and the tests drive the timer with a fake region — a box in a mock world — so the
  whole timer is exercised without WorldGuard.
- **`ZoneService.tick()` is public and takes no clock.** It counts in ticks of its own task, so a test
  advances thirty minutes by calling it 1,800 times instead of waiting.
- **Console commands go through `Deliverer.CommandRunner`.** Tests record what would have been run, with
  placeholders already filled in, instead of dispatching `eco give` into a server that has no economy.

`MessagesResolveTest` reads the shipped `messages.yml` through Bukkit's loader rather than as text. A bare
`on:` or `off:` key is parsed as a boolean, so the text sits right there in the file and the key still
never resolves — only the parser catches that.

## A real server

MockBukkit proves the logic. It cannot prove that the plugin enables against the real OberonCore, that
WorldGuard answers for a real region, or that the shipped YAML survives a merge into an older file. The
project's `testserver.sh` boots a Paper server with OberonCore, WorldEdit, WorldGuard and the plugin,
feeds it console commands, stops it again and keeps the log:

```bash
./testserver.sh <logname> "afk zone list" "afk reward test afk 20000" "afk reload"
```

Run it once against a **fresh** data folder and once against the previous version's — an upgrade is the
case a fresh install never exercises.
