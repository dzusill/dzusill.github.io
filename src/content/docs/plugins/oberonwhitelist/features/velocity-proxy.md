---
title: "Velocity Proxy"
description: "OberonWhitelistProxy.jar applies the same ranks and the same error to the commands Velocity answers itself — /server, /geyser, /velocity:callback. Installation, the LuckPerms requirement, its config and its limits."
---

Some commands never reach your backend server. Velocity answers its own — `/server`, `/glist`, `/send`, `/velocity`, and `/velocity:callback` behind every clickable proxy message — and those of plugins installed on the proxy: Geyser's `/geyser`, Simple Voice Chat's `/voicechatproxy`, LuckPerms' `/lpv`.

It also adds them to the player's command tree *after* the backend has filtered it. So they show up in tab completion whatever the backend decided, and the backend plugin cannot see, block or hide them.

`OberonWhitelistProxy.jar` is the second half, for exactly those commands. Same config format, same ranks, same `blocked-actions` — a player cannot tell a denied proxy command from a denied backend command from one that was never installed.

## What it decides, and what it leaves alone

It only judges commands the proxy itself registers. Everything else a player types is forwarded to the backend as before, and the backend plugin decides it there.

| Command | Tab completion | Typed |
|---|---|---|
| proxy command the rank grants | shown | runs |
| proxy command in `execute-only` | hidden | runs |
| any other proxy command, under `strict` | hidden | the standard *does not exist* reply |
| namespaced proxy spelling (`/velocity:callback`, `/geyser:geyser`) | always hidden | as its command's tier says |
| backend command | untouched | forwarded to the backend |

That is why the proxy config lists proxy commands only. Judging backend commands on the proxy as well — against a list of proxy commands — would deny nearly everything your players type.

## Installation

```
proxy/plugins/
  OberonWhitelistProxy.jar
  oberonwhitelist/
    config.yml            ← written on first start
```

1. Put `OberonWhitelistProxy.jar` in the proxy's `plugins/` folder. It needs **Velocity 3.3+** and **Java 21+**, and no OberonCore — the proxy half is self-contained.
2. Install LuckPerms for Velocity — see [below](#luckperms-on-the-proxy).
3. If you turned `announce-proxy-commands` off as a stopgap, turn it back on now — see [below](#before-the-jar-announce-proxy-commands).
4. Restart the proxy. Velocity does not load plugins while it runs.
5. Edit `plugins/oberonwhitelist/config.yml` — the folder is the plugin id, in lower case — and apply it with `/obwp reload`.

The backend jar stays where it is. The proxy jar only covers what the backend cannot see.

The startup line tells you where you stand:

```
[oberonwhitelist]: Enforcement: strict, 3 groups, 11 proxy command(s) seen,
0 configuration warning(s).
```

Five seconds later, once every proxy plugin has registered its commands, the configured ones are checked against what the proxy really has:

```
[oberonwhitelist]: Group command '/home' is not registered by any plugin on this
server; it can never be suggested or run.
[oberonwhitelist]: 1 configured command(s) are not registered on this proxy. Each
one is inert here: it grants nothing and blocks nothing. Commands your backend
servers own belong in the backend plugin's config, not this one.
```

That is almost always a backend command copied into the proxy config. Take it out.

## LuckPerms on the proxy

Required in practice. A proxy grants no permission by itself: with no permission plugin every player is `default` there and nobody holds `oberonwhitelist.bypass`. Strict mode then denies every proxy command to your staff as well, and only the proxy console gets through. The plugin warns at startup when LuckPerms is missing (unless `groups-from-luckperms` is off).

* **Run LuckPerms for Velocity on the same storage as your backends**, with a messaging service between them, so a rank set on one side is the rank on the other.
* **Mirror your ranks by name.** A player's LuckPerms primary group only counts as a rank when the proxy config has a group of the same name — a rank spelled differently here quietly resolves to `default`. The `oberonwhitelist.group.<name>` nodes are the same on both sides.
* **Grant the bypass and the admin node through LuckPerms.** A proxy has no operators, so `bypass.operators` does not exist here.
* **Keep each command's own permission.** A rank grant here narrows what Velocity already allows; it does not replace it. Velocity's `/glist` and `/send` still need `velocity.command.glist` and `velocity.command.send` (`/server` is open unless set to `false`), and a proxy plugin's commands need that plugin's nodes. Without them a granted command neither runs nor appears — for bypass holders too.

```
/lp group admin permission set oberonwhitelist.bypass true
/lp group admin permission set oberonwhitelist.admin true
```

On shared storage these apply on the proxy as well.

## Configuration

The proxy's `config.yml` has the backend's format — see [config.yml](/plugins/oberonwhitelist/configuration/config/) for each key — applied to proxy commands only:

```yaml
enforcement:
  mode: strict
  forwarded-commands: false

groups:
  default:
    priority: 0
    commands:
      - /server
  mod:
    priority: 10
    extends: default
    commands:
      - /glist
  admin:
    priority: 20
    extends: mod
    commands:
      - /send

execute-only:
  - /velocity:callback
  - /callback
  - /login
  - /register

blocked-commands:
  - /velocity
  - /shutdown
```

| Key | On the proxy |
|---|---|
| `enforcement.mode` | as on the backend: `strict` or `tab-only` |
| `enforcement.forwarded-commands` | proxy only. Whether to judge commands the proxy does not own. Leave it `false` — turning it on warns loudly at startup, for the reason above |
| `groups` | proxy commands only, under the same rank names as the backend |
| `groups-from-luckperms` | as on the backend |
| `execute-only` | as on the backend. Ships the clickable-message callbacks and common login commands |
| `permission-grants` | `commands` must be listed explicitly. An empty list is ignored here, and reported: Velocity cannot say which permission a command declares |
| `blocked-commands` | as on the backend. Ships `/velocity` and `/shutdown` |
| `blocked-actions` | keep it identical to the backend's. `give_potion_effect:` does nothing here (no world), and `playsound:` depends on the proxy build |
| `blocked-action-cooldown-millis`, `debug` | as on the backend |

`bypass.operators` and `update-checker` do not exist on the proxy.

The file is never merged with the shipped defaults: a line you delete stays deleted, and a key you leave out falls back to its default.

### The login commands

If an authentication plugin runs on the proxy, its commands have to work for a player who has not logged in yet — before anybody can read their rank. The shipped `execute-only` list carries `/login`, `/l`, `/register`, `/reg`, `/changepassword` and `/premium` for that reason. Harmless when no such command exists; delete what you do not use.

## Clickable messages: /velocity:callback

Clicking any clickable message the proxy sends runs `/velocity:callback <id>`. The proxy answers it itself — it never reaches a backend — so only the proxy config can keep it working.

It ships in `execute-only`: runnable by everyone, suggested to nobody, and as a namespaced command it never appears in tab anyway. Leave it there. Under `strict`, removing it turns every clickable proxy message into *This command does not exist.* `/callback` beside it covers a proxy plugin with a callback command of its own.

The `/velocity:callback` line in the backend config is harmless, but it is not what keeps these clicks working.

## Before the jar: announce-proxy-commands

Until the proxy jar is installed, Velocity's own setting can hide every proxy command from tab completion:

```toml
# velocity.toml
[advanced]
announce-proxy-commands = false
```

The commands still run when typed; they only stop being suggested — to everyone, staff included. A fair stopgap. The wrong setting once the proxy jar is in:

:::caution
Set `announce-proxy-commands` back to **`true`** when you install `OberonWhitelistProxy.jar`. Left `false`, there is nothing for the whitelist to filter: staff holding `oberonwhitelist.bypass` see no proxy command in tab at all, not even `/server`, and every other rank sees only the proxy commands granted to it, which the whitelist adds back by itself.

Velocity does not tell plugins about this setting, so the whitelist cannot warn you.
:::

## Tab completion

Two passes, exactly as on the backend: proxy commands a rank may not see are removed from the tree, then granted proxy commands the tree is missing are added back — only when the player can actually run them. See [Tab Completion](/plugins/oberonwhitelist/features/tab-completion/).

A command added back behaves like one Velocity sent: `/server` and `/server lobby` are both accepted as complete, and the suggestions for its arguments come from the proxy.

## Known limitation: a rank change reaches the tab list late

A rank change applies to what a player may **run** through the proxy at once. Their **tab list** catches up later:

* The proxy can only edit a command tree on its way from a backend to the player. Velocity offers no way to send a new one — there is no proxy equivalent of Paper's `updateCommands()`.
* A promoted player's proxy commands therefore appear with the next tree the backend sends: at their next **server switch**, or when you run **`/obw reload` on the backend**, which resends every online player's tree.
* LuckPerms on the backend resends a player's tree by itself after a permission change (`update-client-command-list`, on by default). That often settles it sooner — but only when the proxy has already picked the change up by then.

The same goes for tab changes made with `/obwp reload`: what runs changes at once, what is suggested changes with the next tree.

## /obwp

`/oberonwhitelistproxy`, aliased `/obwp` and `/owp`. Every subcommand needs `oberonwhitelist.admin`.

| Command | What it does |
|---|---|
| `/obwp reload` | re-read the config and the proxy's command list |
| `/obwp check <player> <command>` | why a command is allowed or blocked on the proxy |
| `/obwp simulate <group> <command>` | the same trace for a rank, without a player online |
| `/obwp groups [player]` | list groups, or show one player's group |

It is deliberately not `/obw`. A proxy command hides a backend command of the same name from everyone connected through the proxy, so a proxy `/obw` would take the backend's away. `scan-dialogs` and `import` stay on the backend, where the files they read live.

`/obwp check` also tells you which side decides a command:

```
/obwp check Steve /home
```

```
Typed /home, identity not a proxy command
This proxy does not answer /home, so it is forwarded untouched and the
backend's whitelist decides it. Run /obw check there.
```

## Checking it works

After installing, with one default-rank account and one staff account holding the bypass:

1. **Default rank:** `/` in chat shows no `/server`, `/velocity`, `/geyser` or `/velocity:callback`. Typing `/velocity` gets the same reply as `/doesnotexist`.
2. **Default rank:** clicking a clickable proxy message still works.
3. **Staff with bypass:** every proxy command their own permissions allow is suggested and runs, `/velocity` included.
4. **Admin:** `/obwp check <player> /server` explains each verdict.
