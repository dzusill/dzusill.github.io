---
title: "Moving from PvPManager"
description: "OberonCombat refuses to start while PvPManager is installed: both would tag, untag and take money for every fight. Do the"
---

OberonCombat refuses to start while PvPManager is installed: both would tag, untag and take money for every fight. Do the
steps in this order, on a quiet server, and keep the old jars and configs until the checks at the end pass.

## 1. Install

| Plugin | Version | What changes |
|---|---|---|
| OberonCore | 1.14.4 or newer | nothing, the same jar |
| **OberonCombat** | 1.0.0 | new |
| OberonKills | **1.6.0** | combat-log death message; nothing else |
| OberonUtils | the build that carries `OberonCombatHook` | teleports, `/suicide` and the elytra rule ask OberonCombat; its own combat module stays off |
| OberonAfk | the build that carries `OberonCombatCheck` | `/afk` is refused while OberonCombat has the player tagged. **Without it `/afk` works in combat once PvPManager is gone** |
| OberonTools | the build that carries `OberonCombatLink` | drill, axe and bucket abilities are withheld in combat when `combat.block-tools` is on. **Without it they work in combat once PvPManager is gone** |
| PvPManager | **remove** | delete `PvPManager.jar` from `plugins/` |

Vault and ExcellentEconomy stay as they are: money steal pays through Vault.

## 2. Duels-Shyam

In `plugins/Duels-Shyam/config.yml` set `hooks.pvpmanager: false`. OberonCombat does what that hook did through Duels' own API:
fighters are tagged only by each other and untagged when the duel ends, with no money and no lightning in a duel. See
[Duels-Shyam](/plugins/oberoncombat/features/duels/).

## 3. Permissions

The mapping is in [Permissions](/plugins/oberoncombat/reference/permissions/#pvpmanager-equivalents). `oberoncombat.exempt` is the parent of every
exemption; the `oberoncombat.*` wildcard does **not** include them, on purpose.

## 4. Configuration

PvPManager's `config.yml` and `messages.properties` are not read. Start from the files OberonCombat writes and carry your values
across:

| PvPManager `config.yml` | OberonCombat `config.yml` |
|---|---|
| `Combat Tag.Time: 20` | `combat.tag-duration: 20s` |
| `Combat Tag.Untag On Kill` | `combat.untag-on-kill: always` |
| `Combat Tag.EnderPearl Renews Tag` | `combat.renew.ender-pearl` |
| `Combat Tag.WindCharge Renews Tag` | `combat.renew.wind-charge` |
| `Combat Tag.WorldGuard Exclusions` (and world exclusions) | `exclusions.profiles` + `exclusions.global` |
| `Player Kills.WorldGuard Exclusions` | `exclusions.features.money-steal` / `kill-effect` |
| `Combat Tag.Display.Action Bar` | `messages.yml › combat-timer` (and `combat.timer.bar-*`) |
| `Actions Blocked.Commands` | `command-blacklist` |
| `Actions Blocked.EnderPearls`, `ChorusFruits`, `Teleport`, `Riptide`, `Eat`, `Totem of Undying`, `Place Blocks`, `Break Blocks`, `Open Inventory`, `Enter Portal` | `restrictions.ender-pearl`, `chorus-fruit`, `teleport`, `riptide`, `eat`, `totem`, `place-blocks`, `break-blocks`, `open-inventory`, `portal` |
| `Player Kills.Money Reward` / `Money Steal` | `money-steal.percent` |
| `Player Kills.Exp Steal` | `exp-steal` |
| `Player Kills.Death Effects.Lightning` | `kill-effects.lightning` |
| `Player Kills.Commands On Kill`, `Commands On Respawn` | `event-commands.on-kill`, `on-respawn` |
| `Other Settings.Auto Soup.Health: 8` | `soup.soups.*.heal-hearts: 4` (a heart is two health) |
| `Item Cooldowns.Combat` | `item-cooldowns.items` with `only-when-tagged: true` |
| `Harmful Potions` | `combat.harmful-effects` |
| `Anti Border Hopping.Barrier` | `barrier.*` |
| `Combat Log Punishments` | `combat-log.*` |
| PvP toggle | `pvp-toggle.*` |
| `Anti Border Hopping.Vulnerable` | `barrier.vulnerable` (on by default) |
| `Anti Kill Abuse` (`Max Kills`, `Time Limit`, `Warn Before`, `Commands on Abuse`) | `kill-abuse.*` (`max-kills`, `time-limit`, `warn-before`, `commands`) |
| Fly / game mode / god mode on tag | `tag-effects.*` |

PvPManager's default `Harmful Potions` list has two faults that are not copied: `MINING_FATIQUE` is a misspelling that matches
nothing (OberonCombat reads it as `mining_fatigue` and says so in the log), and `SLOW_FALLING` is not harmful.

Messages: `Money_Reward` and `Money_Steal` become `kill-money-gained` (killer, at once) and `kill-money-lost` (victim, after
respawn). `Command_Denied_InCombat` is `command-blocked`; `Out_Of_Combat` is `combat-untagged`. Every message now has its own
`chat`, `actionbar`, `title`, `subtitle` and `sound`. See [messages.yml](/plugins/oberoncombat/configuration/messages/).

### OberonUtils

Copy `combat.cooldowns` from OberonUtils' `config.yml` into OberonCombat's `item-cooldowns.items` (the same item names and
durations). While OberonCombat is installed, OberonUtils' whole `combat:` section is ignored.

## 5. Placeholders

Every placeholder on PvPManager's wiki keeps working under `%pvpmanager_…%` while `integrations.papi-alias-pvpmanager` is on (the
default); those for features OberonCombat does not have return `false` or `0`. See [Placeholders](/plugins/oberoncombat/reference/placeholders/). Colour
codes (`&c`, `&#RRGGBB`) in `messages.yml` work as they are, and `/pmr reload` and `/pvpinfo` exist.

**`/pvp` needs a permission, as in PvPManager.** Grant `oberoncombat.command.pvp` to the ranks that may switch PvP off, once
`pvp-toggle.enabled` is on.

## 6. What is not carried over

Not in OberonCombat: newbie, respawn and teleport protection, an NPC left behind on logout, loot protection, extra drops,
`Money Penalty` (a loss on PvP death with no winner), PvPManager's drop modes, nametags, and a separate duel mode (Duels-Shyam is
handled through its own API instead). Of `Actions Blocked`: `Unsafe Teleports` (only teleport *commands* are refused; pearls and
chorus fruit are the barrier's job), the `Interact` list and the `Elytra` rules (OberonUtils keeps its own elytra rule).
`Commands On Kill.Cooldown` has no equivalent: use the [kill-abuse guard](/plugins/oberoncombat/features/kill-abuse/). PvPManager's database
(`pvpmanager.db`) is not read; players' PvP choices start from `pvp-toggle.default-state`.

## 7. Check, then clean up

Run the checks in [Testing](/plugins/oberoncombat/developing/testing/). When they pass, delete PvPManager's folder. To go back: stop the server,
remove `OberonCombat.jar`, restore `PvPManager.jar` and the old OberonUtils, and set `hooks.pvpmanager: true` in Duels-Shyam.
