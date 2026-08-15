---
title: "Migrating from Skript"
description: "Import your existing warps, spawn point and night vision toggles straight out of Skript's variables.csv."
---

Your warps, your spawn point and every player's night vision toggle live inside
`plugins/Skript/variables.csv`. There is no need to walk to each warp and re-set it by hand.

```
/oberonutils migrate
```

## What it reads

| Skript variable | Becomes |
|---|---|
| `spawn` | `spawn.yml` — position **and** the direction the player faces |
| `warp_<name>` | An entry in `warps.yml`, named `<name>` in lowercase |
| `nightvision::<uuid>` | A pending toggle, applied as that player next joins |

Skript stores locations in its own binary format, hex-encoded in the CSV. The importer decodes the
world, coordinates, yaw and pitch out of that directly, so warps land exactly where they already are
and players arrive facing the same way.

Anything it cannot decode is named in console and skipped — the rest of the import still runs.

## Running it

By default it reads `plugins/Skript/variables.csv`. Point it somewhere else if your file has moved:

```
/oberonutils migrate plugins/Skript/backup/variables.csv
```

It reports what it took:

> Imported 7 warps, 63 night vision toggles.

Configs are reloaded automatically afterwards, so the warps are live immediately.

## What it does not touch

- **Cooldowns.** Short-lived per-player cooldowns are not worth importing; they expire on their own.
- **The key-all countdown.** The timer now runs on wall-clock time rather than counting ticks, so it
  starts fresh. The first drop after the switch may land sooner or later than the old counter
  implied — once.
- **Anything from other scripts.** Only the four variable shapes above are read. Nothing else in the
  file is modified; the importer never writes to `variables.csv`.

## Suggested order

1. Stop the server.
2. Install both jars, disable the overlapping EssentialsX commands.
3. Start. Run `/oberonutils migrate`.
4. Check `/warp` tab completion lists everything you expect, and walk one or two of them.
5. Confirm night vision came back for a player who had it on.
6. Remove the Skript files, or Skript itself.
7. Restart.

Leaving Skript installed for step 4 to 5 is deliberate — if something did not come across, the
originals are still there to compare against. Nothing breaks by having both present except the
command overlap, which step 2 already settled.

## Names change case

Warp names are stored lowercase. In Skript, `{warp_KOTH}` and `{warp_koth}` were different
variables, so a capitalised `/warp KOTH` silently fell through to the warps menu. Here they are the
same warp, and `/warp KOTH` works.

If you genuinely had two warps whose names differed only by case, only one survives the import —
console names the collision.
