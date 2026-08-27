---
title: "MOTD & Join Delivery"
description: "Two separate things can be sent to a player when they join: a block of plain lines (the MOTD), and one of your existing announcements. They are independent…"
---

Two separate things can be sent to a player when they join: a block of plain lines (the MOTD), and one of your existing announcements. They are independent and can both be on.

If neither is enabled, the join listener does no work at all — it checks that first and returns.

## The MOTD

```yaml
motd:
  enabled: false
  lines:
    - "<#7e7e7e>────────────────────────"
    - ""
    - "<#9e9e9e>Welcome to <b><gradient:#C21807:#F11800>YourServer</gradient></b>"
    - "<#8e8e8e>Check out our <#C21807>/rules"
    - "<#8e8e8e>Join the community on <#C21807>/discord"
    - "<#8e8e8e>Support the server on our <#C21807>/store"
    - ""
    - "<#7e7e7e>────────────────────────"
```

| Key | Default | |
|---|---|---|
| `enabled` | `false` | An empty `lines` list counts as disabled whatever this says. |
| `lines` | `[]` | Sent in order, one chat message each. |

Blank strings are kept, not dropped — that is how the spacing above works.

Every line is [MiniMessage](https://docs.advntr.dev/minimessage/format.html) and goes through the same rendering as an announcement: built-in placeholders, then PlaceholderAPI if installed, then MiniMessage. `%player%`, `%online%` and `%max_players%` all work. `%announcement%` and `%variant%` both render as `motd`.

The MOTD has no click line, no action bar, no title and no sound. It is a block of chat lines. If you want any of that on join, use the join announcement below.

`motd` is an ignored section on update, so lines you delete stay deleted.

### It honours the announcement mute

A player who has run `/announcements` to switch announcements off does not get the MOTD either.

That is a judgement call rather than something the setting promises — "announcements off" was read as covering everything this plugin puts in a player's chat, so a player who opted out is not greeted every login by the plugin they opted out of. If that is not what you want, the MOTD is not the right tool; use a dedicated join-message plugin. It is listed on [Known Limitations](/plugins/dannounce/limitations/#the-motd-respects-the-announcement-mute).

`dannounce.bypass-toggle` applies here as it does everywhere: a holder keeps receiving the MOTD even with announcements muted.

## The join announcement

```yaml
join:
  enabled: true
  delay-ticks: 20
  announcement: chat-announcements
```

| Key | Default | |
|---|---|---|
| `enabled` | `false` | |
| `delay-ticks` | `20` | Ticks after the join event before anything is sent. `20` is one second. |
| `announcement` | `""` | Which announcement to send. Required when `enabled` is `true`. |

There is no `join:` section in the shipped file. Add it if you want it.

The delay exists because a player's client is still settling at the moment `PlayerJoinEvent` fires, and a chat line sent into that can be lost behind the resource-pack prompt or a login-plugin teleport. One second is usually enough; raise it if your join flow is heavier.

`delay-ticks` applies to the MOTD as well — both are sent from the same delayed task.

### `announcement` names an announcement, not an entry

```yaml
join:
  announcement: chat-announcements     # ✅ the channel
```

```yaml
join:
  announcement: discord                # ❌ an entry inside it
```

The lookup is by announcement id: a channel (`chat-announcements`) or a key in the `announcements:` section. Entry ids are not accepted here, even though `/announcements send discord` takes them, and a wrong value refuses the config rather than failing quietly at the first join:

```
[DAnnounce] Invalid config.yml: join.announcement references unknown id 'discord'
```

If you want one specific message on join, put it in the `announcements:` section as its own announcement with a single variant, and point `join.announcement` at that.

### It advances the rotation

The join announcement picks its variant the same way a scheduled fire does — the next one in the rotation, and the cursor moves on. Every player who joins consumes a slot, so pointing `join.announcement` at a busy rotating channel makes the channel's own scheduled fires appear to skip around.

This is the other reason a dedicated single-variant announcement is the better shape for a join message.

### It respects every audience rule

Unlike `preview`, join delivery is a real send. `min-players`, `permission`, `gamemodes`, the world filter, the mute and `dannounce.receive.<id>` all apply — see [Audience & World Filtering](/plugins/dannounce/features/audience/).

Note what `min-players` means at that moment: the joining player is already counted as online by the time the delayed task runs, so `min-players: 2` on the join announcement means "the second player onwards".

## Order

When both are on, one joining player receives:

1. every MOTD line, in file order,
2. then the join announcement.

Both are dispatched on that player's own thread context, and a player who left during `delay-ticks` is skipped.
