---
title: "Permissions"
description: "A kit's own permission in profiles.yml is any node you choose, for example oberonkits.kit.vip. Without"
---

| Node | Default | Grants |
|---|---|---|
| `oberonkits.use` | everyone | `/kits` |
| `oberonkits.admin` | op | `/okits` and all its subcommands |
| `oberonkits.bypass` | nobody | Never reset or given a kit (staff walking through the arena) |
| `oberonkits.drop.bypass` | op | May drop items where `kit-items.prevent-drop` is on |

A kit's own `permission` in `profiles.yml` is any node you choose, for example `oberonkits.kit.vip`. Without
it the kit shows as locked (or hidden, with `locked-kits.show: false`).

`oberonkits.bypass` is not given to operators by default on purpose: an op testing the arena gets kits like
everybody else. The node name can be changed with `ignore.bypass-permission`.
