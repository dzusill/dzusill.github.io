---
title: "Migrating from PerfCommandWhitelist"
description: "Convert an existing PerfCommandWhitelist config in one command, then fill in the one thing that cannot be converted."
---

`/obw import` reads a PerfCommandWhitelist config and writes it out in this plugin's shape. Ten ranks and several hundred command entries convert in one command.

## 1. Import

Put the old config somewhere under `plugins/` and point the importer at it:

```
/obw import PerfCommandWhitelist/config.yml
```

```
Imported 10 groups and 342 commands.
Written to config.imported.yml. Review it, rename it to config.yml, then /obw reload.
Then run /obw scan-dialogs to fill in execute-only.
```

Nothing is overwritten — the result lands next to your config as `config.imported.yml` for you to read first.

## What carries over

| Old | New | |
|---|---|---|
| `tab:` | `groups:` | same names, `priority` and `extends` preserved |
| `blocked-commands:` | `blocked-commands:` | namespaced entries keep their namespace |
| `blocked_command_default_actions:` | `blocked-actions:` | same prefixes, same `&`-codes |
| `blocked-action-cooldown-millis` | unchanged | |
| `debug.log-blocked-to-console` | `debug.log-blocked` | |
| `debug.notify-permission` | unchanged | |
| `enforcement.mode` | unchanged | **kept as-is, deliberately** |

The mode is *not* upgraded to `strict` during import. A migration that silently tightened enforcement would lock players out of commands on the first restart, which is a poor way to meet a new plugin. You turn it up yourself, after step 3.

## 2. Review and reload

The imported block list is usually much longer than it needs to be. Old-style configs list every namespaced spelling by hand:

```yaml
- /pl
- /bukkit:pl
- /minecraft:pl
- /plugins
- /bukkit:plugins
```

Here, `/pl` alone covers all of them, and every namespaced spelling is stripped from tab completion automatically. You can delete the rest — see [Command Identity](/plugins/oberonwhitelist/features/command-identity/).

Then:

```
mv config.imported.yml config.yml
/obw reload
```

## 3. Fill in execute-only — the part that cannot be imported

This is the step that fixes the reason most people migrate.

The old plugin has no execute-only tier, so its config contains no record of which commands your menus run. That information lives in the *menu plugin's* config, so the importer cannot invent it:

```
/obw scan-dialogs
```

Paste what it prints into `execute-only`, reload, and your menus keep working with `mode: strict` — which is what could not be done before.

→ [Menu & Dialog Plugins](/plugins/oberonwhitelist/features/menu-plugins/)

## 4. Go strict

```yaml
enforcement:
  mode: strict

debug:
  log-blocked: true
```

Leave the logging on for a week to catch anything the scan could not see, then turn it off.

## What is different afterwards

**The error is consistent.** In the old plugin, the custom message fired only for commands on the block list; everything else fell through to the vanilla reply. Here, blocked, hidden and non-existent commands all produce the same message, action bar and sound — see [One Indistinguishable Error](/plugins/oberonwhitelist/features/one-error/).

**Whitelisted commands actually tab-complete.** Granted commands the server left out of the command tree are added back, and the tree is resent whenever a plugin registers or unregisters commands — see [Tab Completion](/plugins/oberonwhitelist/features/tab-completion/).

**Aliases are covered.** One entry per command, not one per spelling.
