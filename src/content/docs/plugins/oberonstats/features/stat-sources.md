---
title: "Stat Sources"
description: "A track is one rankable number — coins, kills, playtime. Every track behaves identically once it exists: the same placeholders, the same blanking, the same…"
---

A **track** is one rankable number — `coins`, `kills`, `playtime`. Every track behaves identically once it exists: the same placeholders, the same blanking, the same paging. What differs is where the numbers come from.

OberonStats reads three sources, and every one of them is optional.

| Source | Tracks it provides | Needs |
|---|---|---|
| **ExcellentEconomy** | one per currency (`coins`, `stardust`, …) | ExcellentEconomy |
| **Vanilla statistics** | whatever you configure — kills, deaths, playtime, blocks | nothing at all |
| **Vault** | one, `money` | Vault + an economy plugin (EssentialsX, …) |

`/oberonstats status` lists what is actually loaded:

```
Stats » Sources: economy(1), statistic(6), vault(1)
 » Tracks: coins, kills, mobs-killed, deaths, playtime, blocks-broken, blocks-placed, money
 » Players ranked from vanilla/Vault data: 218
```

---

## ExcellentEconomy

Every currency becomes a track named after its currency id. Ranking, the rebuild timer and number formatting stay ExcellentEconomy's job — see [ExcellentEconomy](/plugins/oberonstats/integrations/excellenteconomy/).

## Vanilla statistics

Minecraft counts a great deal per player, keeps it for players who are offline, and never exposes a leaderboard. OberonStats builds the leaderboard.

Shipped tracks:

| Track | Statistic |
|---|---|
| `kills` | `PLAYER_KILLS` |
| `mobs-killed` | `MOB_KILLS` |
| `deaths` | `DEATHS` |
| `playtime` | `PLAY_ONE_MINUTE`, rendered as a duration |
| `blocks-broken` | every block mined, added up |
| `blocks-placed` | every item used, added up — see the warning below |

Add your own with any name from Bukkit's `Statistic` enum:

```yaml
Sources:
  Statistics:
    Tracks:
      jumps:
        Statistic: JUMP
        Name: Jumps
      fish:
        Statistic: FISH_CAUGHT
        Name: Fish Caught
      damage-dealt:
        Statistic: DAMAGE_DEALT
        Name: Damage Dealt
```

### ⚠️ blocks-placed is an approximation

Minecraft has **no** "blocks placed" counter. What it has is "items used", which counts placing a block, eating food and using a tool alike. `blocks-placed` is that total. It is the honest best available from vanilla data; an exact count would need a plugin that starts counting from the day it is installed, with no history.

### How the leaderboard is built

Statistics live in one JSON file per player. Once per `Sources.Refresh-Seconds`, OberonStats takes the candidate list, reads each file **once**, and sorts the result per track. That work is pure file I/O and runs off the server thread.

An online player's own value does not come from that snapshot — it is read live from the server, so their own screen is never stale.

## Vault

The `money` track is the balance every other plugin sees through Vault, which on most servers is EssentialsX. It is separate from ExcellentEconomy: run both and you get both.

```yaml
Sources:
  Vault:
    Enabled: true
    Track-Id: money
    Name: Money
```

Vault implementations are not required to be thread safe, so this leaderboard is rebuilt on the server thread, a hundred players per tick, rather than in one sweep. Values come from Vault's own formatter, so `%oberonstats_balance_money%` reads exactly like every other money display on the server.

A player who is outside the candidate list has no `money` value at all — unlike the other sources, Vault cannot be asked about them safely in the background.

### Reading never writes

Every player is checked with `hasAccount` before their balance is read, and skipped when they have none. That is not politeness: EssentialsX's Vault provider **creates an account at the starting balance** when asked for a balance it does not have. A leaderboard sweep over a few thousand players would otherwise quietly mint accounts across your economy.

The consequence is that a player your economy does not know is absent from the `money` board rather than sitting at the bottom on the starting balance. `/oberonstats why <player> money` says so explicitly.

### Beware the name clash

If an ExcellentEconomy currency is also called `money`, two sources claim the same track id. The first registered wins — ExcellentEconomy, since it is hooked first — and the Vault balance becomes unreachable. OberonStats warns about this at startup and `/oberonstats why` reports it; give one of them a different id:

```yaml
Sources:
  Vault:
    Track-Id: vault-money
```

---

## Who gets ranked

Vanilla statistics and Vault have no player list of their own, so OberonStats builds one:

```yaml
Sources:
  Refresh-Seconds: 300     # how often both leaderboards are rebuilt
  Active-Within-Days: 90   # skip players who have not logged in for this long (0 = everybody)
  Max-Players: 2000        # hard cap, most recently seen first
  Live-Cache-Seconds: 3    # memo for an online player's aggregated statistics
```

On a server with years of player files, `Active-Within-Days` is the setting that matters: it is the difference between reading two hundred files every five minutes and reading fifty thousand.

⚠️ It is also the setting that quietly *removes* people from your leaderboards. A player who stopped logging in three months ago still has their money and their kills, but with the default 90 days they are not read, so they cannot appear. If your boards are meant to be all-time, set:

```yaml
Sources:
  Active-Within-Days: 0    # everybody the server remembers
  Max-Players: 20000       # and do not cut the list short
```

OberonStats logs a warning whenever the cap actually truncates the list, naming both numbers.

`Live-Cache-Seconds` exists because `blocks-broken` is a sum over every block type. Without it, a menu with ten rows would recompute that sum ten times per redraw.
