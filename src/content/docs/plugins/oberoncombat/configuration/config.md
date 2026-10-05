---
title: "config.yml"
description: "Every key, its default and what it does. Durations are written 20s, 3m, 1m30s, 500ms or 10t (ticks); a bare number is"
---

Every key, its default and what it does. Durations are written `20s`, `3m`, `1m30s`, `500ms` or `10t` (ticks); a bare number is
seconds. Lists are written on one line (`[a, b]`) on purpose: the core's config upgrade can mangle a list that ends a section.

`/oberoncombat reload` re-reads this file and `messages.yml`. A value that cannot be understood is reported in the console by
key name and replaced by its default; it never throws and is never silently ignored.

## debug

| Key | Default | |
|---|---|---|
| `debug` | `false` | Extra console output. `/oberoncombat debug` toggles the event trace at runtime |

## combat

| Key | Default | |
|---|---|---|
| `combat.tag-duration` | `20s` | How long a tag lasts |
| `combat.announce-renewals` | `false` | Send the tagged message on every renewal |
| `combat.untag-on-kill` | `always` | `always`, `all-enemies`, `killed-only` |
| `combat.tagged-deaths-count-pvp` | `true` | A death while tagged counts as PvP even after a fall, lava or the void |
| `combat.attribution-window` | `10s` | How long after a hit a fall, fire or void death is credited to the attacker |
| `combat.exempt-both-sides` | `true` | Nobody is tagged by a player with `oberoncombat.exempt.tag` |
| `combat.renew.ender-pearl` | `true` | A pearl renews a running tag |
| `combat.renew.wind-charge` | `true` | A wind charge renews a running tag |
| `combat.tag-sources.melee` | `true` | |
| `combat.tag-sources.projectiles` | `true` | |
| `combat.tag-sources.zero-damage-hits` | `true` | Eggs, snowballs, fishing rods |
| `combat.tag-sources.harmful-potions` | `true` | |
| `combat.tag-sources.explosions` | `true` | TNT, crystals, anchors, beds |
| `combat.harmful-effects` | poison, instant_damage, wither, blindness, weakness, slowness, nausea, mining_fatigue | Effects that make a potion an attack |
| `combat.untag-notice` | `[expired, command, duel-end]` | Reasons that send the untagged message |
| `combat.pve-tag.enabled` | `false` | Mobs tag the player they hurt |
| `combat.pve-tag.only-hostile` | `true` | `false`: any mob or animal |
| `combat.pve-tag.any-damage` | `false` | `true`: fall, fire, lava and the like tag too |
| `combat.timer.bar-symbol` | `▊` | Character of `%bar%` |
| `combat.timer.bar-length` | `20` | Characters in `%bar%` |
| `combat.timer.bar-full` / `bar-empty` | `<red>` / `<dark_gray>` | Colours of the two parts |
| `combat.timer.boss-bar.enabled` | `false` | The countdown as a boss bar |
| `combat.timer.boss-bar.color` | `red` | `pink`, `blue`, `red`, `green`, `yellow`, `purple`, `white` |
| `combat.timer.boss-bar.style` | `solid` | `solid`, `segmented_6`, `segmented_10`, `segmented_12`, `segmented_20` |

See [The combat tag](/plugins/oberoncombat/features/combat-tag/).

## exclusions

`exclusions.profiles`, `exclusions.global`, `exclusions.features`. See [Exclusions](/plugins/oberoncombat/features/exclusions/). The shipped file
defines profiles `tournament` (region `tourny`, global) and `spawn` (region `spawn`; excludes `money-steal` and `kill-effect`).

## command-blacklist

| Key | Default | |
|---|---|---|
| `command-blacklist.enabled` | `true` | |
| `command-blacklist.mode` | `blacklist` | `blacklist` or `whitelist` |
| `command-blacklist.block-aliases` | `true` | Aliases and `namespace:` forms too |
| `command-blacklist.commands` | a long default list | Names without the slash |
| `command-blacklist.message-cooldown` | `1s` | How often the same player is told |

See [Command blacklist](/plugins/oberoncombat/features/command-blacklist/).

## kill-effects, money-steal, exp-steal

| Key | Default | |
|---|---|---|
| `kill-effects.lightning` | `true` | A harmless lightning strike at the victim |
| `money-steal.enabled` | `true` | |
| `money-steal.percent` | `5.0` | Percent of the victim's balance, on every kill |
| `money-steal.decimals` | `2` | |
| `money-steal.rounding` | `floor` | `floor`, `half-up`, `ceiling` |
| `money-steal.format.style` | `full` | `full` (`$1,234.56`) or `short` (`$1.2K`) |
| `money-steal.format.pattern` | `#,##0.00` | |
| `money-steal.format.prefix` / `suffix` | `$` / empty | |
| `money-steal.anti-farm.enabled` | `false` | Withhold money for the same killer-victim pair |
| `money-steal.anti-farm.per-pair-cooldown` | `10m` | |
| `exp-steal.enabled` | `false` | |
| `exp-steal.percent` | `0` | Percent of the victim's experience points |

See [PvP kills](/plugins/oberoncombat/features/kills/).

## soup

| Key | Default | |
|---|---|---|
| `soup.enabled` | `true` | |
| `soup.when` | `always` | `always`, `in-combat`, `out-of-combat` |
| `soup.triggers` | `[right-click, left-click]` | Left click is a click in the air |
| `soup.left-click-on-block` | `false` | `true`: a left click on a block uses the soup too (the block still breaks) |
| `soup.require-permission` | `false` | Ask for `oberoncombat.soup` |
| `soup.use-at-full-health` | `false` | `false`: a player at full health cannot use a soup. A soup can override it |
| `soup.bowl` | `remove` | `remove` or `keep` |
| `soup.eat-state-fix` | `reset` | `reset` or `off` |
| `soup.refill.enabled` | `true` | `/soup` |
| `soup.refill.material` | `mushroom_stew` | What bowls become |
| `soup.refill.cooldown` | `0s` | |
| `soup.refill.in-combat` | `true` | `false`: refused while tagged |
| `soup.soups.<item>` | four shipped | `heal-hearts`, `food`, `saturation`, `effects`, `vanilla-effects`, `bowl` |

See [Soup PvP](/plugins/oberoncombat/features/soup/).

## barrier

| Key | Default | |
|---|---|---|
| `barrier.enabled` | `true` | |
| `barrier.material` | `red_stained_glass` | The fake blocks |
| `barrier.radius` | `5` | |
| `barrier.mode` | `fast` | `fast` or `full` |
| `barrier.update-ticks` | `3` | |
| `barrier.renew-tag-on-attempt` | `true` | |
| `barrier.push-back.enabled` | `true` | |
| `barrier.push-back.force` | `1.2` | 0.1 to 4 |
| `barrier.push-back.vertical` | `0.3` | 0 to 1 |
| `barrier.push-back.stop-gliding` | `true` | |
| `barrier.vulnerable` | `true` | Fighters can hit each other inside a `pvp: deny` region |
| `barrier.message-cooldown` | `1s` | |
| `barrier.block-teleports` | `[ender_pearl, consumable_effect]` | Teleport causes refused into a region |
| `barrier.index-refresh` | `30s` | How often the region list is read |

See [The barrier](/plugins/oberoncombat/features/barrier/).

## combat-log

| Key | Default | |
|---|---|---|
| `combat-log.enabled` | `true` | |
| `combat-log.mode` | `kill` | `kill` or `none` |
| `combat-log.drops.inventory` / `experience` | `true` / `true` | |
| `combat-log.punish-on-shutdown` | `false` | |
| `combat-log.punish-on-kick` | `false` | |
| `combat-log.kick-reasons` | `[]` | Only kicks whose reason contains one of these (empty: every kick) |
| `combat-log.release-enemies` | `true` | |
| `combat-log.money-penalty` | `0` | Percent of the leaver's balance, paid to nobody |

See [Combat log](/plugins/oberoncombat/features/combat-log/).

## item-cooldowns

`item-cooldowns.only-when-tagged` (`true`), `item-cooldowns.items` (`ender_pearl: 3s`, `wind_charge: 1s`),
`item-cooldowns.trident.on-throw` and `.on-riptide` (`true`). See [Item cooldowns](/plugins/oberoncombat/features/item-cooldowns/).

## pvp-toggle

`enabled` (`false`), `default-state` (`true`), `cooldown` (`15s`), `block-in-combat` (`true`), `worldguard-override` (`true`).
See [PvP toggle](/plugins/oberoncombat/features/pvp-toggle/).

## event-commands

`on-tag`, `on-untag`, `on-kill`, `on-respawn`, `on-combat-log`, each a one-line list, all empty. See
[Commands on events](/plugins/oberoncombat/features/event-commands/).

## restrictions, tag-effects

`restrictions.<name>` for `ender-pearl`, `chorus-fruit`, `teleport`, `eat`, `totem`, `place-blocks`, `break-blocks`,
`open-inventory`, `portal`, `riptide` (all `false`), and `restrictions.message-cooldown` (`1s`).
`tag-effects.disable-fly` (`false`), `restore-fly` (`true`), `force-survival`, `disable-godmode`, `remove-invisibility`
(`false`). See [Restrictions and tag effects](/plugins/oberoncombat/features/restrictions/).

## kill-abuse

`enabled` (`false`), `max-kills` (`5`), `time-limit` (`5m`), `warn-before` (`true`), `commands` (`[]`). See
[Kill-abuse guard](/plugins/oberoncombat/features/kill-abuse/).

## placeholders

| Key | Default | |
|---|---|---|
| `placeholders.combat-prefix` | empty | `%..._combat_prefix%` while tagged |
| `placeholders.pvp-status-prefix-on` / `-off` | `&4PvP On ` / `&2PvP Off ` | `%..._pvp_status_prefix%` |
| `placeholders.heart-symbol` | `❤` | `%..._current_enemy_hearts%` |

See [Placeholders](/plugins/oberoncombat/reference/placeholders/).

## integrations

| Key | Default | |
|---|---|---|
| `integrations.duels-shyam.enabled` | `true` | |
| `integrations.duels-shyam.tag-in-duel` | `true` | |
| `integrations.duels-shyam.untag-on-duel-end` | `true` | |
| `integrations.duels-shyam.steal-and-effects-in-duel` | `false` | |
| `integrations.duels-shyam.arena-worlds` | `auto` | `auto` or a list of worlds |
| `integrations.papi-alias-pvpmanager` | `true` | Also answer `%pvpmanager_*%` |
| `integrations.boolean-format.true` / `false` | `true` / `false` | The text `%oberoncombat_in_combat%` returns |

See [Duels-Shyam](/plugins/oberoncombat/features/duels/) and [Placeholders](/plugins/oberoncombat/reference/placeholders/).

## Upgrades

New keys a release adds are merged into your file; a section you delete comes back with its defaults; a value you changed is
never overwritten. `exclusions`, `soup.soups` and `item-cooldowns.items` are *yours*: an entry you delete there stays deleted.
