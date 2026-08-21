---
title: "Audience & World Filtering"
description: "Five separate things decide whether one player sees one announcement. They are checked in this order, and the first no ends it:"
---

Five separate things decide whether one player sees one announcement. They are checked in this order, and the first `no` ends it:

1. **Has the player muted announcements?** — `/announcements`, unless they hold `oberonannounce.bypass-toggle`
2. **Is `oberonannounce.receive.<id>` denied?** — unset means yes, receive it
3. **Are enough players online?** — `min-players`
4. **Do they hold the announcement's `permission`?**
5. **Are they in an allowed world, in an allowed game mode?**

Steps 3 to 5 are the audience rules. Step 1 is [Player Toggles](/plugins/oberonannounce/features/player-toggles/); step 2 is a permission node.

## The global world filter

```yaml
world-filter: allow-list
worlds: []
```

| `world-filter` | `worlds` empty | `worlds` listed |
|---|---|---|
| `allow-list` | every world | **only** those worlds |
| `deny-list` | every world | every world **except** those |

`whitelist` and `blacklist` are accepted as spellings of `allow-list` and `deny-list`. Anything else refuses the config with `world-filter must be allow-list or deny-list`.

World names are matched case-insensitively, and blanks in the list are dropped.

```yaml
world-filter: deny-list
worlds: [ creative, build ]
```

> **The global filter applies to `chat-announcements`, not to the `announcements:` section.** A channel is built from this one switch so that a server has a single place to say "no announcements in the creative world". An individually scheduled announcement carries its own `audience.worlds` block instead, and ignores the global one entirely — see below.

## Per-announcement rules

A channel takes three of the five on its own section:

```yaml
chat-announcements:
  min-players: 2
  permission: ""
  gamemodes: []
```

An announcement in the `announcements:` section takes all of them in an `audience` block:

```yaml
announcements:
  builders:
    mode: DAILY
    schedule:
      times: [ "12:00" ]
    audience:
      min-online: 1
      permission: rank.builder
      gamemodes: [ CREATIVE ]
      worlds:
        mode: allow-list
        values: [ build ]
    variants:
      main: { chat: [ "<gray>Plot review at 20:00.</gray>" ] }
```

| Key | Default | |
|---|---|---|
| `min-players` / `min-online` | `1` | Do not fire below this many players **online**. |
| `permission` | `""` | Only holders receive it. Empty means everyone. |
| `gamemodes` | `[]` | `SURVIVAL`, `CREATIVE`, `ADVENTURE`, `SPECTATOR`. Empty means all. An unknown name refuses the config. |
| `worlds.mode` + `worlds.values` | — | `all`, `allow-list` or `deny-list`, and the list it applies to. |
| `worlds.whitelist` / `worlds.blacklist` | `[]` | The same thing written as two named lists. |

Both spellings of the world block load. `worlds.mode: all` means every world, and neither list is consulted.

> `min-players` and `min-online` are aliases, but which one wins when you write both differs by section: a channel prefers `min-players`, an `audience` block prefers `min-online`. Write one.

## `min-players` is about the server, not the audience

The number compared is the total count of players **online** — not the number who would actually receive the announcement.

A channel with `min-players: 2` and one player online fires nothing. That is the setting doing its job: it exists so an almost-empty server does not talk to itself. It is not a bug, and it is the single most common reason a freshly installed OberonAnnounce appears to do nothing on a test server.

```yaml
chat-announcements:
  min-players: 1     # fire even with one player online
```

A channel with `min-players: 2` also fires when two people are online but a world filter means only one of them sees it. The gate and the filter are separate questions.

## `oberonannounce.receive.<id>`

The node is an **opt-out**. A player who has never been granted or denied it receives the announcement, so adding an announcement needs no permission work at all. Deny the node to silence one announcement for one group:

```
/lp group vip permission set oberonannounce.receive.chat-announcements false
```

> **The entry's own node wins, and the channel's is the fallback.** `oberonannounce.receive.discord`
> excludes somebody from that one entry; `oberonannounce.receive.chat-announcements` excludes them from
> everything in the channel. Whichever is *assigned* decides, the entry first — so you can deny the whole
> channel and re-allow a single entry, or the other way round.
>
> An unset node is "no opinion", which is why a newly added announcement reaches everyone without you
> editing your permission plugin first.

Ids are lower-cased when the node is built, so the node is always lower case whatever the config says.

## Where the rules are not applied

| | Audience rules | Mute | `receive` node |
|---|---|---|---|
| A scheduled fire | applied | applied | applied |
| `/announcements send <id>` | applied | applied | applied |
| `/announcements send <id> <player>` | applied | applied | applied |
| `/announcements preview <id>` | **bypassed** | **bypassed** | **bypassed** |
| The join announcement | applied | applied | applied |
| The MOTD | — | applied | — |

`preview` exists to show you what an announcement looks like, so it ignores every filter and sends only to you. `send` is a real broadcast and obeys everything.

> `send <id> <player>` on a player the rules exclude reports success and delivers nothing — the message confirms the command was understood, not that the player saw it. Use `preview` when you want to be certain something rendered.

## Debugging "nobody is getting it"

In order:

1. `/announcements list` — is it `enabled`, and does it appear at all? A channel with `enabled: false` or no entries is simply absent.
2. `/announcements next <id>` — does it have a future time? `not scheduled` means it has no occurrence left.
3. How many players are online, against `min-players`?
4. `/announcements preview <id>` — bypasses everything. If it renders here but not in the wild, the cause is an audience rule, a mute or the `receive` node.
5. `/announcements send <id>` — the reply reports the recipient count. `0` with players online narrows it to the filters above.
