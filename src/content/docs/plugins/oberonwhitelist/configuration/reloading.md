---
title: "Reloading"
description: "What /obw reload rebuilds, what it reports, and what needs a restart instead."
---

```
/obw reload
```

Rebuilds everything from the config on disk. No restart, no kicked players.

## What it rebuilds

* the config file, re-read from disk
* the group model, with `extends` resolved again
* the policy snapshot — modes, execute-only, block list
* the blocked-action list and its cooldown
* the command index, re-read from the server
* every online player's cached rank
* every online player's command tree, resent

The last two are what make a config change visible immediately, rather than on next login.

## What it reports

```
Reloaded. Mode strict, groups 10
No configuration warnings.
```

Or, when something does not add up:

```
Reloaded. Mode strict, groups 10
3 warning(s):
• Group command '/homes' is not registered by any plugin on this server; it can
  never be suggested or run.
• Group 'mod' extends 'moderator', which is not defined; ignored.
• Ignoring action 'mesage: typo': it has no recognised prefix.
```

The first ten are shown in chat; the full list goes to the console.

A warning is never fatal. A group with a broken `extends` keeps whatever resolved cleanly, an unparseable action line is skipped and the rest still run — because a whitelist that refuses to load leaves the server with no whitelist at all.

## Changes that apply immediately

Everything in `config.yml`: ranks, command lists, mode, execute-only, block list, actions, debug switches.

## Changes that need a restart

* installing or removing the plugin itself
* updating the OberonCore jar

Installing an unrelated plugin does **not** need a reload — a plugin enabling rebuilds the command index and resends the tree on its own.

## Reloading after a rank change

Promote somebody and their new rank applies on their next login. To apply it now, `/obw reload` clears every cached rank.

## A note on /reload

Bukkit's own `/reload` is not supported, by this plugin or by any other worth running. It ships blocked in the default `blocked-commands` list.
