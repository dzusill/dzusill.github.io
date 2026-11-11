---
title: "Troubleshooting"
description: "Start with /okits reload: it replies with the number of warnings, and each warning in the console names the"
---

Start with `/okits reload`: it replies with the number of warnings, and each warning in the console names the
exact key (`profiles.ffa.choose.timeout: ...`). Set `debug: true` to log why each player got a kit or not.

**Nobody gets a kit; `/okits list` shows [disabled].**
The inventory guard found the kit world sharing a Multiverse-Inventories group with a survival world. Move
the kit world out of that group (or into its own), then `/okits reload`. See
[Inventory guard](/plugins/oberonkits/features/kit-worlds/#inventory-guard).

**"No kit named 'ffa3'" in the console.**
The name in `profiles.yml` does not exist in Essentials `kits.yml`. Kit names are not case-sensitive.

**A player walks in and gets no menu.**
With `on-return: keep`, a player who still has items keeps them — that is intended. Check also the game
mode (`conditions.gamemodes`, `ignore.gamemodes`) and that they do not have `oberonkits.bypass`. `debug:
true` prints the reason.

**`/kits` opens the Essentials list.**
`commands.select.take-over` is `false`, or the server was not restarted after changing it.

**Kits fail with "Newer version! Server downgrades are not supported".**
The kits in `kits.yml` were saved on a newer Minecraft version than the server runs. Re-save them on this
server with Essentials (`/createkit`).

**Stardust kits say they are unavailable.**
ExcellentEconomy is not installed, or the currency `id` in `config.yml` does not match the one in
ExcellentEconomy.

**The admin GUI says "Not saved".**
The reason follows it: the value could not be read, or the change would break a rule a reload checks
(a survival world, a shared inventory, regen on without a command). Nothing was written. Who changed what
is in `plugins/OberonKits/logs/gui-changes.log`.

**The regen commands are greyed out in the GUI.**
On purpose: console commands can only be changed in `profiles.yml`. See
[Admin GUI](/plugins/oberonkits/features/admin-gui/#what-it-never-changes).

**Players in the kit world cannot place blocks, throw things or hit each other.**
OberonKits never blocks building, and blocks damage only while a player is choosing a kit (at most
`choose.timeout`). Look for another plugin that protects that world. With Duels-Shyam, an arena whose
bounds cover the kit world (created for the [arena regen](/plugins/oberonkits/features/arena-regen/)) stops players
outside a duel from building and fighting while `protect-arena-bounds: true` in its `config.yml`. Set it to `false`, or make
sure the arena's bounds do not cover the area players fight in. Also check the WorldGuard `pvp`,
`block-place` and `block-break` flags and Multiverse's `pvp` for the world.

**The arena regen does nothing.**
Check `regen.enabled: true`, that `commands` is not empty, and run `/okits regen <profile>`. The console logs
every regen and each command's own output. Test the command by hand from the console first.
