---
title: "Reloading"
description: "Needs dtickets.admin. Re-reads the configuration files and applies them immediately."
---

```
/dtickets reload
```

Needs `dtickets.admin`. Re-reads the configuration files and applies them immediately.

## What reloads

| File | Reloads |
|---|---|
| `config.yml` | ✅ — categories, priorities, limits, notification defaults, report and punishment settings |
| `menus.yml` | ✅ — menus are rebuilt |
| `messages.yml` | ✅ — immediately, including for players already online |
| `sounds.yml` | ✅ |

## What does not

**Command names and aliases.** `Commands:` in `config.yml` is applied when Bukkit builds its command
map, which happens once at enable. A renamed or newly enabled command needs a **server restart**, not
a reload.

This is the single most common "the reload did nothing" report, and it is not a bug — it is how
Bukkit registers commands.

**`database.yml`.** The connection is opened at enable. Changing storage type or credentials needs a
restart.

**An open menu.** A player looking at a menu keeps the version they opened. It updates when they
close and reopen it.

## Check it worked

```
/dtickets status
```

Reports what is loaded and, importantly, what failed. A YAML file that does not parse is reported
here rather than failing silently — if a section of messages went quiet after an edit, this tells you
whether the file parsed at all.

## Never use `/reload`

Bukkit's own `/reload` unloads and reloads every plugin on the server. With DzusillCore beneath this
one, that means tearing down a framework other plugins are also holding references to. It produces
problems that look like plugin bugs and are not.

Restart the server instead.
