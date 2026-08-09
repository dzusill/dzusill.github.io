---
title: "Commands & Permissions"
description: "Main command /dmentions, aliases /dm, /dms, /mentions."
---

Main command `/dmentions`, aliases `/dm`, `/dms`, `/mentions`.

---

## Commands

| Command | Permission | Description |
|---|---|---|
| `/dm help` | `dmentions.help` | List subcommands |
| `/dm toggle` | `dmentions.toggle` | Turn your own mentions on or off |
| `/dm customize <display>` | `dmentions.customize` | Set how your mention tag renders |
| `/dm send <keyword>` | `dmentions.send` | Fire a mention by keyword |
| `/dm config` | `dmentions.configure` | Open the settings GUI |
| `/dm user <player> mentions <value>` | `dmentions.admin` | Set another player's mention toggle |
| `/dm user <player> display <value>` | `dmentions.admin` | Set another player's display |
| `/dm reload` | `dmentions.reload` | Reload config and language file |

---

## Command permissions

| Permission | Default | Grants |
|---|---|---|
| `dmentions.admin` | `op` | everything below, plus `/dm user` |
| `dmentions.help` | `op` | `/dm help` |
| `dmentions.toggle` | `op` | `/dm toggle` |
| `dmentions.customize` | `op` | `/dm customize` |
| `dmentions.send` | `op` | `/dm send` |
| `dmentions.configure` | `op` | `/dm config` |
| `dmentions.reload` | `op` | `/dm reload` |

`dmentions.admin` is a parent that grants all of them.

> Note the defaults: **command** permissions are op-only out of the box. If you want players to opt out of mentions — and you probably do — grant `dmentions.toggle` explicitly:
>
> ```
> lp group default permission set dmentions.toggle true
> ```

## Mention permissions

These are configurable in `config.yml`; the values below are the defaults.

| Permission | Controls |
|---|---|
| `dmentions.mention.player` | `@name` |
| `dmentions.mention.nearby` | `@nearby` |
| `dmentions.mention.everyone` | `@everyone` |
| `dmentions.mention.group.<group>` | `@<group>` |

## Restriction permissions

| Permission | Default | Effect |
|---|---|---|
| `dmentions.mention.restricted` | `false` | holders **cannot be mentioned** |
| `dmentions.mention.restricted.bypass` | `op` | may mention restricted players anyway |

---

## A working setup

Players can mention each other and nearby players, and opt out:

```
lp group default permission set dmentions.mention.player true
lp group default permission set dmentions.mention.nearby true
lp group default permission set dmentions.toggle true
```

VIPs get custom tags:

```
lp group vip permission set dmentions.customize true
```

Staff get `@everyone` and can reach restricted players:

```
lp group mod permission set dmentions.mention.everyone true
lp group mod permission set dmentions.mention.restricted.bypass true
```

Admins are not mentionable by players:

```
lp group admin permission set dmentions.mention.restricted true
```

Group mentions, one at a time:

```
lp group default permission set dmentions.mention.group.vip true
lp group mod permission set dmentions.mention.group.mod true
```

## Next

- [FAQ & Troubleshooting](/plugins/dmentions/faq/)
