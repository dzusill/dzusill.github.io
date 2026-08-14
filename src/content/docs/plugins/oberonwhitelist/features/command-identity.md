---
title: "Command Identity"
description: "Why one whitelist entry covers every alias and every namespaced spelling of a command — and why that is also what closes the namespace loophole."
---

A whitelist entry names a **command**, not a way of spelling it.

Grant `/fly`, and the server accepts every spelling that reaches the same command:

```
/fly              ✓  the command itself
/f                ✓  its registered alias
/essentials:fly   ✓  its namespaced form
/essentials:f     ✓  namespaced alias
/anything:fly     ✓  an invented namespace still resolves
```

You write one line. You never maintain a list of namespaces.

## Why matching strings does not work

Whitelists that compare command text treat `/msg`, `/tell`, `/w` and `/essentials:msg` as four unrelated things. Two consequences follow, and both are bad.

**The whitelist is only as complete as somebody's memory.** Grant `/msg` and forget `/tell`, and players hit a wall on a command you meant to give them. Multiply that by every aliased command on the server.

**The block list leaks.** This is the serious one. Block `/pl` and a player types `/bukkit:pl`. Block that too and they try `/minecraft:pl`, `/paper:pl`, `/essentials:pl`. Every namespace is a separate string, so an enumerated block list can always be walked around — and the whole point of that list is usually to hide which plugins you run.

Resolving to identity first removes the enumeration entirely. `/pl` and every namespaced spelling of it are one command, so blocking the command blocks all of them.

## Bare and namespaced entries mean different things

The distinction is deliberate and occasionally useful.

**A bare entry names the command.** It covers every spelling:

```yaml
blocked-commands:
  - /pl        # blocks /pl, /plugins, /bukkit:pl, /minecraft:pl, …
```

**A namespaced entry names one spelling.** It covers only that one:

```yaml
blocked-commands:
  - /bukkit:help    # blocks exactly this; /help still works
```

That is how you block one plugin's version of a command while keeping another's — a `/help` you want, and a `/bukkit:help` that prints the server's real command list, which you do not.

## Namespaced spellings never appear in tab

Independently of the lists, every suggestion containing `:` is stripped from tab completion.

A completion popup offering `/essentials:fly` names a plugin you run. Since the block list often exists precisely to hide that, showing it in the tab list would undo the work — so the plugin removes them all, whatever the rank.

## Commands registered after startup

The index of what exists is rebuilt when a plugin enables or disables, when the server finishes loading, when datapacks reload, and on `/obw reload`.

For the narrow window where a command was registered a moment ago and the index has not caught up, the plugin asks the framework's command registry directly. That way a freshly-registered command is recognised as a real command rather than being mistaken for one that does not exist — which would skip the rank check.

:::note
Asking the framework only *identifies* the command. It never grants it. Commands registered by other DzusillCore plugins face exactly the same rank check as everything else.
:::

## Seeing what a spelling resolves to

```
/obw check <player> /essentials:f
```

```
Typed /essentials:f, identity /fly
Group mod, mode strict
Runs (GROUP_GRANTS)
Suggested in tab
```

The second line is the resolution. When it reads `not registered on this server`, nothing provides that command — usually a typo, or a plugin that failed to load.
