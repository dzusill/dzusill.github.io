---
title: "Tab Completion"
description: "Filtering removes what a rank may not see; a second pass adds back what it may. Why both halves are needed, and why whitelisted commands stop failing to appear."
---

Tab completion here is handled in two passes: one that removes, and one that adds back.

The second pass is the unusual one, and it exists because filtering alone cannot fix the most common complaint about command whitelists — *the command is whitelisted but it still doesn't tab-complete*.

## The removing pass

When the server sends a player their command tree, three kinds of entry are dropped:

* commands the rank does not have
* commands in `execute-only` — runnable, never suggested
* **every namespaced spelling**, regardless of rank, since `/essentials:fly` in a popup names a plugin you run

What remains is exactly what that rank is meant to see.

## The adding pass

Filtering can only ever remove. If the server never put a command in the tree, no amount of filtering brings it back — and there are ordinary reasons for a command to be missing:

* its plugin registered it after the player already received their tree
* the tree was built before a permission applied
* another plugin removed it

The result is a command a rank is granted, that the player can run, that never appears while typing. It looks exactly like a broken whitelist.

So after filtering, the plugin walks the rank's granted commands and adds back any that are missing — **but only when all of the following hold**:

1. the command actually exists on this server
2. the player passes the command's own permission check
3. the whitelist would let them run it

Condition 2 matters: suggesting a command that then refuses to run is a worse bug than the one being fixed. Condition 3 matters because a command can be granted by a rank *and* explicitly blocked — without it, the removing pass would drop it and this pass would put it straight back.

## The tree is resent when it changes

A tree already delivered is a snapshot. The plugin resends it after:

* a plugin enables or disables
* the server finishes loading
* a player joins (one tick later, once every plugin has registered)
* datapacks reload
* `/obw reload`

This is what makes a late-registering plugin's commands appear without a rejoin.

## Argument completions are left alone

Only the command name itself is filtered. Once a player types a space, the suggestions belong to the command they are running — player names, warp names, numbers — and those are that plugin's business.

## Commands that do not exist are reported

Once the server has finished loading, every configured command is checked against what it actually registers:

```
[OberonWhitelist] Group command '/homes' is not registered by any plugin on this
server; it can never be suggested or run. Check the spelling, or the plugin that
provides it.
...
[OberonWhitelist] 3 configured command(s) are not registered by any plugin here.
Each one is inert: it grants nothing and blocks nothing.
```

An entry like this grants nothing and blocks nothing. Saying so turns a mystery into a one-line fix.

The timing is deliberate. The check waits for the server to finish enabling plugins rather than running while this one starts, because at that earlier point no plugin loading later has registered anything — and neither has this plugin's own `/oberonwhitelist`. Asked too soon it reports working commands as missing, and a list that cries wolf is worse than no list.

Turn it off with `debug.warn-on-missing-commands: false` if you keep entries for plugins you have not installed yet.

## Diagnosing one report

```
/obw check <player> /home
```

The trace ends with the tab verdict:

```
Typed /home, identity /home
Group default, mode strict
Runs (GROUP_GRANTS)
Suggested in tab
```

If it says `Not suggested in tab` while the rank clearly grants it, the reason is on the line above — usually the identity line reading `not registered on this server`, or an extra note that the player lacks the command's own permission.

For a live view of what filtering does, turn on:

```yaml
debug:
  log-tab-filter: true
```

```
[OberonWhitelist] Tab for Steve [default]: 214 -> 41, restored [home, sethome]
```

It is noisy — meant for diagnosing one report, not for leaving on.
