---
title: "Known Limitations"
description: "Everything on this page is real, current and deliberate to document. It is written here rather than left to be discovered on a live server."
---

Everything on this page is real, current and deliberate to document. It is written here rather than left to be discovered on a live server.

## Boss bar output is not implemented

The `bossbar-announcements` section is **parsed and ignored**. Its keys are read so an existing file still loads and round-trips unchanged, but nothing under it is ever turned into an announcement and no boss bar is ever shown.

```yaml
bossbar-announcements:
  interval-seconds: 180
  mode: rotate
  min-players: 1
```

That section loads without complaint, appears nowhere in `/announcements list`, and produces nothing. The shipped file carries a comment saying so, and a block of commented-out boss-bar presets at the bottom of the file are equally inert.

**What to do about it:** put the announcement in `chat-announcements`, or use an `action-bar` on an announcement in the `announcements:` section for something that needs to sit above the hotbar. Do not delete the section — keeping it means your file is ready if boss bars are implemented later.

## An unquoted `at:` timestamp is rejected

```yaml
    schedule:
      at: 2030-01-01T09:00:00     # ❌ refused
      at: "2030-01-01T09:00:00"   # ✅
```

YAML resolves an unquoted timestamp into a date value of its own, and assumes **UTC** when no offset is written. Read back, that is silently a different instant than your configured `timezone` implies — and once it has become a date object there is no way to tell an owner who meant UTC from one who meant local time.

Rather than guess, the plugin refuses the config and says what to type:

```
announcements.reset: schedule.at must be quoted, e.g. at: "2030-01-01T09:00:00"
```

**What to do about it:** quote it. See [Schedules](/plugins/dannounce/features/schedules/#once).

## `update-checker` does nothing

```yaml
update-checker:
  enabled: true
```

Parsed, exposed, and never acted on. This build never contacts a remote service — there is no version check, no download, no telemetry, and no network call of any kind. The key is kept so an existing file round-trips and so a future build has somewhere to put the setting.

**What to do about it:** nothing. Leave it as it is; setting it to `false` changes nothing either.

## Command aliases need a restart

```yaml
commands:
  aliases:
    - announce
    - broadcast
```

Bukkit builds its command map once, when a plugin enables. Labels are read at that moment and never re-read, so an alias added to this list does not exist until the next server start. `/announcements reload` deliberately does not pretend otherwise — it will report success, and `/broadcast` will still be an unknown command.

**What to do about it:** restart after changing the list. `/announcements`, `/dannounce` and `/da` always work regardless.

Related: an **empty** list is not "no aliases". `aliases: []` falls back to the default and still registers `announce`.

## Screen titles are only in the `announcements:` form

An on-screen title — header, subtitle, fade timings — can only be configured on a variant in the `announcements:` section:

```yaml
announcements:
  restart:
    variants:
      main:
        title:
          header: "<red><bold>RESTART"
          subtitle: "<gray>in 5 minutes"
```

A channel entry has no `title` block of that kind. `title:` inside a channel entry is a **chat line** — the first line of the message — and is not shown on screen.

**What to do about it:** move anything that needs a real title out of the channel and into its own announcement. Action bars, by contrast, work in both forms.

## The MOTD respects the announcement mute

A player who has run `/announcements` to switch announcements off does not receive the MOTD either.

This is a judgement call, not a specified behaviour. "Announcements off" was read as covering everything this plugin puts in a player's chat, on the grounds that a player who opted out should not be greeted on every login by the plugin they opted out of. Somebody could reasonably have decided the other way.

**What to do about it:** if the greeting must reach everybody, use a dedicated join-message plugin for it. `dannounce.bypass-toggle` exempts an account from the mute, including for the MOTD.

## An unknown sound name plays nothing, silently

`sound.type` is a registry key. A name the server's sound registry does not recognise is passed through to the client unchanged, and the client plays nothing. There is no error and no console warning.

That is not laziness: an unrecognised key is also how a resource-pack sound is played, and warning about those would be noise on every server that uses one. But it does mean a typo in `BLOCK_NOTE_BLOCK_CHIME` costs you the announcement chime with no diagnostic at all — which has already happened once on a live server.

**What to do about it:** read [Sound](/plugins/dannounce/features/sound/#type-is-a-registry-key), and prefer the `block.note_block.chime` key form, which is easier to check against the vanilla sound list.

## `send <id> <player>` reports success it cannot promise

```
/announcements send store Steve
```

```
Sent chat-announcements using store to Steve.
```

That reply means the command was understood and dispatched. It does **not** mean Steve saw anything: `send` to a named player still applies the audience rules, the mute and the `receive` node, so a filtered player is silently skipped and the message is unchanged.

**What to do about it:** use `/announcements preview <id>` when you need to be sure something rendered, since preview bypasses every filter.

## A per-entry sound cannot be a partial override

The global `sound:` block is a fallback, not a base. An entry with its own enabled `sound:` block keeps every value from it; an entry without one gets the global block whole. There is no merge, so you cannot override only the pitch, and you cannot switch the sound off for a single entry — an entry with `sound.enabled: false` falls back to the global sound.

**What to do about it:** switch the global block off and give a sound to each entry that should have one.

## An entry named after a channel setting is silently skipped

`enabled`, `interval-seconds`, `initial-delay-seconds`, `mode`, `selection`, `min-players`, `min-online`, `permission`, `gamemodes`, `color`, `style`, `overlay`, `progress` and `duration-ticks` are read as channel settings. An announcement entry with one of those ids is treated as a setting and never becomes an announcement — with no error, because the two cases are indistinguishable in the file.

**What to do about it:** rename the entry. `/announcements list` shows what actually loaded.

## The join announcement advances the rotation

Pointing `join.announcement` at a rotating channel means every player who joins consumes a slot in that rotation, so the channel's own scheduled fires appear to skip around.

**What to do about it:** give the join message its own announcement in the `announcements:` section with a single variant.

## `debug` does nothing

`debug: true` in `config.yml` is parsed into a getter that no code path consults. It enables no extra logging.

**What to do about it:** nothing to do — it is inert. Announcement delivery failures are logged at `SEVERE` regardless, and `/announcements list`, `next` and `preview` are the diagnostic tools.

## Folia is not supported

`plugin.yml` declares `folia-supported: false`, so the plugin will not enable on a Folia server. Delivery already schedules per player, but the announcement engine owns a single global repeating task.

**What to do about it:** run Paper.

## `/reload` is not supported

The Bukkit `/reload` is not supported, as with any plugin that claims commands at enable and owns a repeating task. Restart instead. `/announcements reload` re-reads the configuration and is the supported way to apply a change — see [Reloading](/plugins/dannounce/configuration/reloading/).
