---
title: "FAQ"
description: "Command conflicts, missing integrations, and the things that surprise people."
---

## `/spawn` still runs EssentialsX's version

Two plugins cannot both own a command name. Add the ones OberonUtils should handle to EssentialsX's
`disabled-commands` and restart:

```yaml
disabled-commands:
  - spawn
  - setspawn
  - kill
  - suicide
  - warp
  - setwarp
  - delwarp
```

`/ping` is the same story with **spark**.

## The plugin will not enable

Check console for an unknown-dependency error. OberonUtils has a hard dependency on **OberonCore** —
both jars go in `plugins/`.

If it is a Java or API error instead, confirm the server is Paper **26.2** or newer on Java **25**.
Paper 26.2's own API is compiled for Java 25, so an older JVM cannot load it.

## Something is not working and there is nothing in the log

```
/oberonutils hooks
```

Anything listed as not installed means the feature that needs it is skipped. The most common:
`only-when-tagged` is on but PvPManager is absent, so no cooldown ever applies because nobody ever
reads as combat-tagged.

## A warp says it cannot be checked right now

The warp has `requires.koth-active: true` and AxKoth could not be reached, so the warp is refused.

That is deliberate. Allowing it would mean players teleporting into an inactive arena whenever
AxKoth or PlaceholderAPI hiccups — silently. Remove the requirement from the warp if you would
rather it always be open.

## Night vision keeps turning itself back on

That is the feature. The toggle is stored per player, so anything that clears the effect — `/heal`,
`/effect clear`, another plugin on world change — gets it reapplied a tick later.

To actually turn it off, the player runs `/nightvision` again, or staff run `/nv <player>`.

## A deleted warp came back after a restart

`warps` must be listed under `advanced.ignored-sections` in `config.yml`. Without it, the shipped
defaults are merged back in on load and anything you removed reappears. The same applies to
`keyall.tiers` and `combat.cooldowns`.

## The first key-all after installing came at the wrong time

Once, yes. The timer now runs on wall-clock time rather than counting ticks, so it starts fresh
rather than inheriting the old counter. `/keyall reset` puts it where you want it.

## Two crate keys from one drop

Not possible here — the next deadline is written before any reward is dispatched, and the dispatcher
cannot re-enter. If two arrived, one was `/keyall force`.

## `%oberon_keyall_timer%` shows the raw placeholder

Either PlaceholderAPI is missing, or the **Key All** module is off — the expansion is registered by
that module.

## Can I run only some of it?

Yes. Every module is independent; see [Modules](/plugins/oberonutils/features/modules/). Turning one
on or off needs a restart, since that changes which commands are registered.

## A player killed themselves without clicking Confirm

Not with this plugin. The menu only reacts to clicks that land inside it, and every other click
while it is open is cancelled — including clicks in the player's own inventory that happen to share
a slot number with Confirm.

If it still happens, another plugin is handling the click. `/oberonutils reload` will not help;
check for a second plugin listening on inventory clicks.

## `/warp` opens a menu, I want a usage error

```yaml
teleport:
  no-args-action: USAGE
```

`MENU` is the default because that is what the setup this replaced did. `USAGE` prints
`usage.warp`, `LIST` prints the warps the player can reach. The same setting covers a warp name that
does not exist. See [Teleports & Warps](/plugins/oberonutils/features/teleport/).

## Can each command have its own usage message?

Yes — `usage.warp`, `usage.setwarp`, `usage.keyall` and so on, ten in total. Each is an ordinary
message, so each can be worded differently and routed to chat or the action bar with its own sound.
Delete one and that command falls back to the shared `general.usage`.

## Are the messages configurable?

All of them, including where each one appears and what it sounds like — chat, the action bar, both,
or sound only. That is per message, not per group: there are 67 of them and any single one can be
pinned on its own. Categories exist so you do not have to edit 67 entries to make a sweeping change.
See [Messages & Sounds](/plugins/oberonutils/configuration/messages/).

## Does it work on Folia?

Yes. Everything that schedules a task or moves a player goes through OberonCore's platform
scheduler, so the same jar is correct on Paper and Folia.
