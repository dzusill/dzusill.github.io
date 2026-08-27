---
title: "Commands & Permissions"
description: "Main command: /announcements. Built-in aliases /dannounce and /da, plus whatever commands.aliases adds — /announce out of the box."
---

Main command: `/announcements`. Built-in aliases `/dannounce` and `/da`, plus whatever `commands.aliases` adds — `/announce` out of the box.

| Command | Permission | Description |
|---|---|---|
| `/announcements` | `dannounce.use` | Toggle your own announcements. Player only; anyone else gets the usage lines |
| `/announcements toggle [messages\|sound]` | `dannounce.use` | The same, spelled out. `sound` toggles only the sound. Player only |
| `/announcements list` | `dannounce.admin` | Every announcement, its mode and state, with the entry ids under each |
| `/announcements next [id]` | `dannounce.admin` | When the next fire is — overall, or for one announcement |
| `/announcements preview <id> [variant]` | `dannounce.admin` | Render it to yourself, ignoring every rule. Player only |
| `/announcements send <id> [player]` | `dannounce.admin` | Send it for real, to everyone eligible or to one player |
| `/announcements reload` | `dannounce.admin` | Re-read `config.yml` and `messages.yml` |

## `<id>` is a channel **or** an entry

A channel is the scheduling unit — one interval, one rotation — but the thing an owner thinks in is the entry: `discord`, `store`, `apply`. Both answer, and both tab-complete.

```
/announcements next discord
/announcements send store
/announcements preview apply
```

What naming one rather than the other does:

| | `<id>` names a channel | `<id>` names an entry |
|---|---|---|
| `next` | that channel's next fire | the same — the entry has no schedule of its own |
| `send` | whichever entry is **next up**, without advancing the rotation | exactly that entry |
| `preview` | the **first** entry in file order, unless `[variant]` says otherwise | exactly that entry; `[variant]` is ignored |

Lookups are case-insensitive. A channel id wins over an entry id if you somehow have both.

> Both `send` and `preview` leave the rotation exactly where it was. Testing an announcement must not reorder what players see next.

## `list`

```
/announcements list
```

```
Announcements (Europe/Bratislava)
 ⏵ chat-announcements [interval] — enabled
    · discord
    · info
    · reports
    …
```

One row per announcement, then its entry ids indented under it. The bracketed word is the schedule kind (`interval`, `one_time`, `daily`, `weekly`) and the state is one of `enabled`, `disabled`, `complete` or `not scheduled`.

This is the definitions in memory, not the file on disk. After editing `config.yml`, run `reload` and check here that the change landed.

## `next`

```
/announcements next
```

```
Next: chat-announcements at 2026-08-20 14:31:07 CEST (12m 4s).
```

With no id it answers with the soonest enabled announcement that has a future time. With an id it answers about that one only, and reports:

```
No enabled announcement has a future scheduled time.
```

when the named one is disabled or has nothing scheduled left. An id that matches nothing at all says `Unknown announcement` instead — the two replies are different on purpose.

Times are printed in the configured `timezone`.

## `preview`

```
/announcements preview discord
/announcements preview chat-announcements store
```

Sends it to you alone and ignores everything: the audience rules, your own mute, `dannounce.receive.<id>`, `min-players`. It is the fastest way to check MiniMessage, placeholders and a click line without waiting for the interval.

The optional `[variant]` is only consulted when `<id>` named a channel — naming an entry is itself the variant choice. Tab completion for `[variant]` therefore only offers anything when the first argument is a channel.

An unknown variant is refused:

```
Unknown variant vote for chat-announcements.
```

## `send`

```
/announcements send store
/announcements send store Steve
```

A real broadcast. Every audience rule, mute and permission applies.

```
Sent chat-announcements using store to 14 players.
```

The count is the number of players it was queued for. With a player named:

```
Sent chat-announcements using store to Steve.
```

> That reply confirms the command was understood, not that the player saw it. `send <id> <player>` still applies the audience rules, so a muted or filtered player is silently skipped and the message still says "sent". Use `preview` when you need certainty.

## `reload`

```
/announcements reload
```

```
Reloaded 1 announcements.
```

Counting announcements, not entries. A refused reload keeps the running configuration — see [Reloading](/plugins/dannounce/configuration/reloading/).

## Permissions

| Node | Default | Grants |
|---|---|---|
| `dannounce.use` | `true` | `/announcements` and `/announcements toggle` |
| `dannounce.admin` | op | `list`, `next`, `preview`, `send`, `reload` |
| `dannounce.receive.<id>` | — | Receiving one announcement. See below |
| `dannounce.bypass-toggle` | `false` | Keep receiving announcements while they are toggled off |

`dannounce.use` defaults to everyone on purpose: opting out is the one thing a player can do here, and locking it would leave them no way to stop the messages.

### `dannounce.receive.<id>` is an opt-out

A player who has **neither been granted nor denied** the node still receives that announcement. The node is only consulted when it has actually been set on them.

That means adding an announcement needs no permission work at all, and denying the node is how you exclude a group from one announcement:

```
/lp group vip permission set dannounce.receive.chat-announcements false
```

`<id>` is the announcement id, lower-cased. For a channel that is the channel — `dannounce.receive.chat-announcements` covers everything inside it, and there is no per-entry node. Announcements in the `announcements:` section each have their own.

`plugin.yml` declares the parent `dannounce.receive.*` with `default: true` so the node is discoverable in a permission plugin; it grants nothing on its own.

### `dannounce.bypass-toggle`

For staff and broadcast accounts that must not be able to silence themselves. It overrides the message mute only — it has no effect on `/announcements toggle sound`.

## Aliases

```yaml
commands:
  aliases:
    - announce
```

Added on top of `/announcements`, `/dannounce` and `/da`. Entries are trimmed and lower-cased; blanks are skipped; an empty list falls back to `announce` rather than registering nothing.

> **A new alias needs a restart, not a reload.** Bukkit builds its command map when the plugin enables. See [Known Limitations](/plugins/dannounce/limitations/#command-aliases-need-a-restart).
