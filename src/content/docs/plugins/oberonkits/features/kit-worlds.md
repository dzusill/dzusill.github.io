---
title: "Kit worlds and when a kit is given"
description: "A profile in profiles.yml turns one or more worlds into kit worlds. Everything a profile does not set"
---

A **profile** in `profiles.yml` turns one or more worlds into kit worlds. Everything a profile does not set
comes from `defaults` in `config.yml`, so a profile usually lists only its worlds, its kits and what it
wants different.

## Worlds

```yaml
worlds: [ffa]           # one world
worlds: [ffa, ffa2]     # several
worlds: ["ffa_*"]       # every world whose name starts with ffa_
```

A world belongs to one profile. If two profiles cover the same world, the console warns and the first
one wins.

## Triggers

| Trigger | When | Default delay |
|---|---|---|
| `enter` | Teleported or walked into the world | 2 ticks |
| `respawn` | Respawned inside the world | 1 tick |
| `join` | Logged in while standing in the world | 20 ticks |

Each trigger can be switched off and has its own `delay-ticks`, which gives other plugins (Multiverse-Inventories
above all) time to swap the inventory first. Only the latest pending trigger counts: a player who enters and
leaves again within the delay gets nothing, and leaving the world closes an open kit menu.

## What happens on a trigger

1. **Is the player left alone?** Players in `ignore.gamemodes` (creative, spectator), players with
   `oberonkits.bypass` and NPCs are never touched. A profile can also require a game mode, a permission, or
   that the player came from (or not from) certain worlds — see `conditions` in
   [profiles.yml](/plugins/oberonkits/configuration/profiles/#conditions).
2. **Do they keep what they have?** With `on-return: keep`, a player who enters or logs in with items keeps
   them; a kit is given only when the inventory is empty. A respawn always gives a kit. With
   `on-return: new-kit` every entry gives a fresh kit.
3. **Which kit?**
   - A kit queued with `/kits <kit>` (see [allow-change](/plugins/oberonkits/features/kit-menu/#changing-kit)) is given first.
   - `mode: random` gives a weighted random kit.
   - `mode: choose` opens the [kit menu](/plugins/oberonkits/features/kit-menu/) if the trigger is in `choose.open-on`; otherwise the
     timeout action decides (the last kit by default).
4. **Reset**, then the kit. The `reset` block clears the inventory, potion effects, fire and fall distance,
   and fills health and food; XP and the game mode are left alone unless you say otherwise.
5. **After the kit**: optional potion effects, console and player commands, and the `kit-received` message.

## Kits come from Essentials

The `kit:` name is the kit's name in EssentialsX `kits.yml`. Items are expanded by Essentials itself, so
`slot:N` placement and anything Essentials can serialize works. Kit lines that start with `/` (commands)
or `$` (money) are skipped unless `essentials.run-kit-commands` / `essentials.give-kit-money` are on, so
nobody earns money by dying.

Essentials' own kit cooldowns and `essentials.kits.*` permissions do not apply here; use the kit's
`permission` in `profiles.yml` instead.

## Inventory guard

Clearing an inventory in a kit world is only safe when that world has its own Multiverse-Inventories
inventory. On every start and reload OberonKits reads `Multiverse-Inventories/groups.yml`. If a kit world
shares its inventory with a world that has no kit profile — say `ffa` sits in the `default` group with
`world` — clearing it would also clear survival inventories, so:

- `inventory-guard.action: disable-profile` (default) switches that profile off and logs which group and
  worlds are the problem;
- `warn-only` only logs it.

A world in no group at all has its own inventory, which is safe. `/okits list` marks a switched-off
profile **[disabled]**.

## Item protection

`kit-items.prevent-drop: true` stops players dropping items in the world (Q, or dragging items out of the
inventory). `oberonkits.drop.bypass` is exempt. While the kit menu is open the player cannot be hurt
(`choose.invulnerable-while-choosing`).
