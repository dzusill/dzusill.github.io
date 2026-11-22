---
title: "FAQ & Troubleshooting"
description: "I changed a value but the mobs I already have did not change."
---

## The big one

**I changed a value but the mobs I already have did not change.**
That is by design. Changes apply **only to mobs that spawn after the change**. An existing mob keeps the values it spawned with, stored on the mob, also across restarts and `/dms reload`. There is no re-roll command. Let the old mobs die or despawn, or kill them.

**I just installed the plugin and the mobs around me are vanilla.**
Mobs that existed before the install stay vanilla until they die or despawn. Only new spawns are modified.

**Does a restart or reload re-roll or reset anything?**
No. Neither re-rolls existing mobs, and neither resets them.

**I changed the XP / drops / damage multiplier but an old mob still uses the old number.**
Those are rolled at spawn and stored on the mob. The death and damage handlers read the stored number, never the current config.

## Setup

**The plugin won't enable: `Unknown/missing dependency: DzusillCore`.**
`DzusillCore.jar` (1.14.6 or newer) is missing from `plugins/`. It is a separate download and it is required.

**Does it work on Spigot?**
No. Paper 1.21.x to 26.x.

**Nothing happens at all.**
Work down this list:
1. `enabled: true` in `config.yml`?
2. The mob's `mobs/<mob>.yml` has `enabled: true`? Generated files ship `enabled: false`.
3. Is the world allowed by `worlds.mode` / `worlds.list`?
4. Is the spawn reason in `spawn-reasons`?
5. Set `debug: true` and `debug-skipped: true` (or run `/dms debug`) and watch the console: each skipped spawn says why.
6. Look at a mob and run `/dms inspect`.

## Which spawns are modified

**Mobs from spawners, spawn eggs, `/summon` or other plugins are not modified.**
Correct. They have the reasons `SPAWNER` / `TRIAL_SPAWNER`, `SPAWNER_EGG`, `COMMAND` and `CUSTOM`, which are not in the default `spawn-reasons`. Add the ones you want. `CUSTOM` is deliberately left out because plugins like MythicMobs spawn their own configured mobs that way.

**Mobs in my existing world (villages, monuments, animals) are vanilla.**
Worldgen mobs are modified only when generated in a **brand-new chunk** while `CHUNK_GEN` is in `spawn-reasons`. Chunks that already exist are never touched. See [New Spawns Only](/plugins/dmobstats/features/new-spawns-only/#worldgen-mobs-chunk_gen).

**A zombie turned into a drowned (or a villager into a zombie villager) and lost its stats.**
A conversion creates a new entity. It is rolled from the new type's file if its reason (`DROWNED`, `INFECTION`, `FROZEN`, `PIGLIN_ZOMBIFIED`) is in `spawn-reasons`, otherwise it is vanilla. Values are not carried over.

## Values

**`damage.taken-multiplier` does nothing against fall damage, fire or lava.**
It applies only to damage from entities (melee and projectiles), not to environmental damage.

**Can I change how long a zombie takes to convert to a drowned or husk?**
No. The Paper API call starts a conversion instead of changing the timer, so dMobStats does not offer it.

**`vanilla-drops: MULTIPLY` or `CLEAR` did not remove or multiply the gear.**
By design. They only change loot-table drops and never touch what the mob carries: worn and held equipment, a horse's saddle and armour, a donkey/mule/llama chest and its contents, a piglin's inventory. Use equipment `drop-chance` for gear.

**`xp: { mode: SET }` gave no XP.**
`SET` only pays when vanilla would: vanilla XP above zero, or a player killed the mob, and `doMobLoot` on. It never creates XP where vanilla pays none.

**My value was clamped / ignored.**
Every value has hard limits and unknown keys are ignored. Run `/dms validate`: it lists each problem with the file, line and key.

**A key under `special` says the mob does not have it.**
Properties are offered per mob and per server version. For example some newer variants only exist on versions whose Paper API has them.

**Where is the zombie's `effects` list?**
It is not generated; add `effects:` yourself (see [Equipment & Effects](/plugins/dmobstats/features/equipment-and-effects/#effects)) or use the GUI.

## Other plugins

**Mobs have different values inside one stack (stacking plugin).**
Stacking plugins such as RoseStacker or WildStacker may merge mobs that carry different rolled values, so a stack can show the values of one of them. Exclude modified mobs from stacking in that plugin, or keep the ranges narrow.

**Another plugin's custom mobs look vanilla.**
See the spawn reasons above (`CUSTOM`).

## The GUI

**It says "changed by someone else".**
The mob file changed on disk after you opened the mob (another admin, a preset, or a hand edit). Reopen the mob from the list to see the new values; nothing was overwritten.

**My click on an item slot did nothing.**
Hold the item on your cursor and click the empty **Add** slot, or shift-click it in your own inventory. The GUI stores a copy; your item stays with you.

**Middle-click does nothing.**
It is not used: it only fires in creative mode. Use **Q** (drop key) to type an exact value and **Ctrl+Q** to remove.

**I can open the GUI but not change anything.**
You have `dmobstats.gui` but not `dmobstats.edit`.

## Files

**I broke a mob file.**
Copy the newest file from `backups/<mob>/` over `mobs/<mob>.yml`, then `/dms reload`. A mob file with invalid YAML keeps that mob vanilla until it is fixed.

**Who changed what?**
`logs/changes.log` lists every change made in the game (GUI and presets).
