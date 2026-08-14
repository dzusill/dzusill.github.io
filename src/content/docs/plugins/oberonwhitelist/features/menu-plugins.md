---
title: "Menu & Dialog Plugins"
description: "Why menus break under strict whitelists, how /obw scan-dialogs generates the execute-only list for you, and the one class of command it deliberately refuses to suggest."
---

If your server runs DialogMaster, DeluxeMenus, ChestCommands, a custom dialog plugin — anything with a clickable button that runs a command — this page is the one that matters.

## Why menus break

A menu button runs its command **as the player**. The server sees no difference between clicking a button that runs `/coinshop` and typing `/coinshop`.

So under strict enforcement, every menu command that no rank grants is denied, and the button silently does nothing. Menus that worked yesterday stop working, with no error to explain it.

The fix is the [execute-only tier](/plugins/oberonwhitelist/features/three-tiers/): runnable by anyone, suggested to nobody. What remains is knowing *which* commands to put there — which is what the scanner is for.

## Scanning

```
/obw scan-dialogs
```

Reads `plugins/DialogMaster` by default; pass a folder name for anything else:

```
/obw scan-dialogs DeluxeMenus
```

It walks every `.yml` file in that folder, collects the commands its buttons run, and sorts the results into three kinds.

## What the output means

### Safe to add

```
No group grants these — add them to execute-only in config.yml:
  - /menu
  - /coinshop
  - /daily
  - /pay*
```

No rank grants these, so allowing them takes nothing away from anybody. Paste them in and reload.

Entries ending in `*` are buttons that build their arguments at click time — `/pay $(target) $(amount)` becomes `/pay*`, which matches whatever values it is called with.

### Do not add — the important one

```
These are granted to a higher rank, so a menu button running them fails for
ordinary players by design. Do NOT add them to execute-only — that would grant
them to everyone:
  ! /back      (hide the button from players who lack the rank instead)
  ! /staffchat (hide the button from players who lack the rank instead)
```

These commands *are* granted — to `mod`, or `helper`, or whichever rank. A staff menu offering them is working correctly: staff can click them, ordinary players cannot.

Putting them in `execute-only` would hand two staff commands to every player on the server, through the menu, silently. Execute-only is not rank-aware.

:::danger[This is the mistake to avoid]
The scanner reports these separately, and never in the list to paste, precisely because the obvious reading of "this fails for ordinary players" is "so let me allow it".

The correct fix is in the menu plugin: hide the button from players who lack the rank. The command stays gated where it belongs.
:::

### Cannot be found statically

```
These build the command name at click time and cannot be listed statically —
enable debug.log-blocked for a week to catch what they actually run:
  • /$(mode)
```

Some menus build the command *name* itself from a placeholder. No static list can cover that, so the scanner says so rather than guessing.

Catch these by running with logging on for a while:

```yaml
debug:
  log-blocked: true
```

```
[OberonWhitelist] Blocked Steve: /hardmode (NOT_IN_GROUP)
```

Then add what turns up.

## Re-run it after editing menus

The scan reflects the menu config at the moment you run it. New button, new command — run it again.

## Menu entry points

Menu plugins usually claim a few command names of their own (`/menu`, `/links`) and often intercept others. Those are picked up by the scan too. `/menu` in particular is the entry point to the whole system and belongs in `execute-only` — otherwise players cannot open any menu at all, which is a confusing way to discover the problem.

## Clickable chat messages

The same reasoning covers `run_command` click events in chat, and Velocity's clickable-message callback.

`/velocity:callback` ships in the default `execute-only` list. Leave it there — removing it breaks every clickable message the proxy sends.

## Checking one button

```
/obw check <player> /coinshop
```

```
Typed /coinshop, identity /coinshop
Group default, mode strict
Runs (EXECUTE_ONLY)
Not suggested in tab (EXECUTE_ONLY)
```

`Runs (EXECUTE_ONLY)` is a working menu button. `Blocked (NOT_IN_GROUP)` is one that needs adding — or, if the command belongs to a rank, a button that needs hiding.
