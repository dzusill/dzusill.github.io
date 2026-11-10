---
title: "Admin GUI"
description: "/okits gui lets admins without SFTP access change most of OberonKits in game. Every change is saved"
---

`/okits gui` lets admins without SFTP access change most of OberonKits in game. Every change is saved
to `profiles.yml` at once, checked first, applied without a reload, and written to a change log with the
admin's name.

## What it can change

| Menu | Settings | Node |
|---|---|---|
| Profile | enabled, mode, coming back (`on-return`), worlds, the three triggers | `oberonkits.gui.edit.profiles` |
| Kits | add a kit from Essentials, remove one, name in the menu, icon, slot, random weight, kit permission, Stardust price, currency, lives per purchase | `oberonkits.gui.edit.kits` |
| Kit items | overwrite a kit's items with your own inventory, or make a new Essentials kit from it | `oberonkits.gui.edit.contents` |
| Rules | time to pick, timeout and close actions, changing kit, cooldown, no damage while choosing, remember / skip, random picks, item dropping, death drops, killer XP | `oberonkits.gui.edit.rules` |
| Arena regen | on/off, interval, warnings, stay or move, move-to (your position), bring back after, skip when empty, run now | `oberonkits.gui.edit.regen` |
| — | create and delete profiles | `oberonkits.gui.edit.create-delete` |

`oberonkits.gui.view` opens the menus and shows every value, but changes nothing. Without a node, its
buttons say **Locked** and which node is missing. The node is checked again when the change is saved,
not only when the button is drawn.

`oberonkits.gui.*` (and `oberonkits.admin`) grants all of it. All nodes default to op.

## What it never changes

- **Console commands** — the regen `commands`, `after-give.console-commands`, and a kit's
  `console-commands`. They run with full console rights, so anyone who could edit them could give
  themselves every permission. The GUI shows them read-only; change them in `profiles.yml`.
- `conditions`, `reset`, `after-give` effects and messages, trigger delays — file only.
- Texts (`messages.yml`) and the player kit menu layout (`menus.yml`) — file only.

## How a change is saved

1. You click a switch, pick the next value, or type a value in chat (the menu closes while it asks;
   type `cancel` or wait a minute to leave it unchanged).
2. `profiles.yml` is read fresh from disk, so a change someone made over SFTP is not lost.
3. The one key is changed, and the whole file is checked by the same rules as `/okits reload`. A value
   the plugin cannot read, a second profile on the same world, a survival inventory shared with the kit
   world, or regen switched on without a command — the change is refused with the reason and nothing
   is written.
4. The file is saved and the plugin reloads it. The menu opens again with the new value.

Shift-right-click on a setting removes the profile's own value, so the default from `config.yml`
applies again.

Comments above keys stay in `profiles.yml`. Short lists such as `[ffa]` are written back in long form:

```yaml
worlds:
- ffa
```

## Survival inventories are protected

Entering a kit world clears the inventory. The GUI refuses to make a protected world a kit world,
including through wildcards such as `*`:

- the main world, its nether and its end (`world`, `world_nether`, `world_the_end`) — always;
- every world in `admin-gui.protected-worlds` in `config.yml`. List your other survival and lobby worlds
  there:

```yaml
admin-gui:
  protected-worlds: [spawn, grasslands, abyssal, shroomlight, hellscape]
```

A world that shares its Multiverse-Inventories inventory with a world without a profile is refused by
the inventory guard as well. World names typed in the GUI may only hold letters, digits, `_`, `-` and `*`.

## Kit items

**Replace items with my inventory** (in a kit's menu) overwrites that Essentials kit with what you carry,
slot by slot, armor and offhand included. It asks first. It changes the kit in Essentials `kits.yml`, so
`/kit <name>` gives the new items too. The kit's delay and any command or money lines stay.

**New kit from my inventory** (in the kit list) creates a new Essentials kit with that name and adds it
to the profile. Both need `oberonkits.gui.edit.contents`; the second also `oberonkits.gui.edit.kits`.
Only kits listed in a profile can be overwritten from the GUI.

## Change log

`plugins/OberonKits/logs/gui-changes.log`, one line per change, also printed to the console:

```
2026-11-10 14:03:12 | Steve (4f1c…) | profiles.ffa.regen.every | 30m -> 45m
2026-11-10 14:05:40 | Steve (4f1c…) | essentials kit ffa1 contents | 23 items -> 25 items
```
