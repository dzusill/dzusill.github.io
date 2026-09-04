---
title: "Testing"
description: "Two layers, because they prove different things."
---

Two layers, because they prove different things.

## Unit and integration tests

```bash
mvn test
```

MockBukkit, JUnit 5 and Mockito. 85 tests covering the parts where a bug is invisible until it has
been wrong for a week:

| Suite | Proves |
|---|---|
| `DropScheduleTest` | Fixed times, weekday filters, daylight-saving boundaries, interval jitter |
| `PlacementFinderTest` | Every rejection rule, one at a time, against a hand-drawn world |
| `LootRollerTest` | Guaranteed entries, per-entry chance, weighted draws without replacement, roll counts |
| `TierRollerTest` | Weight bands and the observed distribution over 60,000 rolls |
| `TierParserTest` | That a typo costs one entry, not the whole file |
| `StatsServiceTest` | Claim vs item counting, leaderboard order, ranks |
| `DropLifecycleTest` | The full lifecycle on a mock server, including protection and the open claim race |
| `OberonSupplyDropsEnableTest` | The plugin boots, every shipped config parses, commands register |

Two design decisions exist to make this possible:

- **`DropEffects` is an interface.** Falling displays, particle beams and boss bars are exactly what
  MockBukkit cannot render, and the lifecycle around them is exactly what is worth testing. Splitting
  them lets the state machine run headlessly.
- **`DropService.tick(long now)` takes the clock.** A two-minute countdown and a ten-minute despawn
  are one line each instead of a test nobody runs.

## The live test server

```bash
./testserver.sh setup    # Paper 26.2 + OberonCore + the plugin, on port 25567
./testserver.sh demo     # boot, run a whole lifecycle headlessly, report
./testserver.sh run      # play on it yourself
./testserver.sh log      # the last demo's log
./testserver.sh reset    # wipe the world and plugin data, keep the download
```

`demo` writes fast timings into the deployed `config.yml` (a five-second countdown instead of two
minutes), boots the server, feeds it console commands, and then checks the log for each stage of the
lifecycle plus the absence of any exception.

This is what covers what MockBukkit cannot: that the plugin enables against a real OberonCore, that
the shipped YAML parses on a real server, that a crate block genuinely appears and disappears, and
that no listener throws.

## Adding a test

Lifecycle tests belong in `me.dzusill.oberonsupplydrops.drop` — `tick(long)` is package-private, and
that is where the seam is meant to be used.

Anything that only decides *what* should happen (rolls, schedules, placement rules) should be
testable without a server. If it is not, that is usually a sign the decision and the Bukkit call
belong in different classes.
