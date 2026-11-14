---
title: "Permissions"
description: "No node lets the GUI change console commands; see Admin GUI."
---

| Node | Default | Grants |
|---|---|---|
| `oberonkits.use` | everyone | `/kits` |
| `oberonkits.layout` | everyone | [Arrange kits](/plugins/oberonkits/features/kit-layouts/) (`/kits layout`, shift-click, the preview button) |
| `oberonkits.admin` | op | `/okits` and all its subcommands, and the whole admin GUI |
| `oberonkits.bypass` | nobody | Never reset or given a kit (staff walking through the arena) |
| `oberonkits.warmup.bypass` | op | Teleport commands run at once in a kit world (no `teleport-warmup`) |
| `oberonkits.drop.bypass` | op | May drop items where `kit-items.prevent-drop` is on |

## Admin GUI

| Node | Default | Grants |
|---|---|---|
| `oberonkits.gui.view` | op | `/okits gui`: see every setting, change nothing |
| `oberonkits.gui.edit.profiles` | op | Worlds, enabled, mode, coming back, triggers |
| `oberonkits.gui.edit.kits` | op | Kit list, names, icons, slots, weights, kit permissions, Stardust prices and uses |
| `oberonkits.gui.edit.rules` | op | Kit menu rules, random picks, item drops, death rules, killer XP |
| `oberonkits.gui.edit.regen` | op | Regen timing, warnings, moving players, run now |
| `oberonkits.gui.edit.contents` | op | Overwrite or create Essentials kit items from your own inventory |
| `oberonkits.gui.edit.create-delete` | op | Create and delete profiles |
| `oberonkits.gui.edit.*` | op | Every edit node above, plus view |
| `oberonkits.gui.*` | op | The whole GUI |

No node lets the GUI change console commands; see [Admin GUI](/plugins/oberonkits/features/admin-gui/#what-it-never-changes).

A typical split for a helper without SFTP: `oberonkits.gui.view` plus `oberonkits.gui.edit.rules` and
`oberonkits.gui.edit.regen`, with prices (`.kits`) and kit items (`.contents`) kept for senior staff.

## Kit permissions

A kit's own `permission` in `profiles.yml` is any node you choose, for example `oberonkits.kit.vip`. Without
it the kit shows as locked (or hidden, with `locked-kits.show: false`).

`oberonkits.bypass` is not given to operators by default on purpose: an op testing the arena gets kits like
everybody else. The node name can be changed with `ignore.bypass-permission`.
