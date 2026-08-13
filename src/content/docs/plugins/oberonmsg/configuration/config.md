---
title: "config.yml"
description: "Commands, the three message formats, reply timeout, sounds, ignore behaviour, logging and the vanish ladder."
---

`plugins/OberonMSG/config.yml`. Reload with `/oberonmsg reload` — except the `Commands` section, which needs a restart.

## Commands

**Restart required** — these are written into the server's command map at startup.

```yaml
Commands:
  msg:
    Enabled: true
    Name: msg
    Aliases: [ message, tell, whisper, w, t, dm, pm ]
    Permission: "oberonmsg.message"
  reply:
    Name: reply
    Aliases: [ r ]
  ignore:
    Name: ignore
    Aliases: [ block ]
  # unignore, msgtoggle, socialspy likewise
```

> **`Enabled: false` matters if you run EssentialsX.** Two plugins registering `/msg` means load order decides which
> wins.

A server already permissioned with its own nodes can keep them by putting them in `Permission`.

## Presentation

Where each kind of message is shown, and what it sounds like.

```yaml
Presentation:
  Categories:
    TOGGLE:  { Channel: ACTION_BAR, Sound: { Enabled: true, Name: "entity.experience_orb.pickup" } }
    ERROR:   { Channel: BOTH,       Sound: { Enabled: true, Name: "entity.villager.no" } }
    INFO:    { Channel: CHAT }
  Overrides: {}
```

`TOGGLE` covers `/msgtoggle`, `/socialspy` and the ignore confirmations. `ERROR` covers every refusal. `INFO` is
everything else and stays in chat.

**Private messages are not affected** — they are built under `Formats` below and always go to chat, because a
conversation needs history.

Full explanation on [Action bar, chat & sounds](/plugins/oberonmsg/features/presentation/).

## Formats

The three lines a message produces. Here rather than in `messages.yml` because they are built from MiniMessage tags.

```yaml
Formats:
  Sender: "…<target>…<message>"
  Receiver: "…<sender>…<message>"
  Social-Spy: "…<sender>…<target>…<message>"
```

| Tag | Is |
|---|---|
| `<sender>` | who sent it |
| `<target>` | who it was for |
| `<message>` | what they typed |

All three are inserted as plain text and never parsed — see [Sending messages](/plugins/oberonmsg/features/messages/).

## Reply

```yaml
Reply:
  Timeout-Seconds: 300
```

How long `/r` keeps working after the last exchange. `0` means never expire.

## Sounds

```yaml
Sounds:
  Receive:
    Enabled: true
    Name: "entity.puffer_fish.blow_up"
    Volume: 1.0
    Pitch: 1.0
  Afk:
    Enabled: true
    Name: "block.note_block.bass"
```

`Receive` plays to the recipient; `Afk` plays to the sender when the recipient is away.

## Ignore

```yaml
Ignore:
  Hide-Public-Chat: true
```

Whether ignoring somebody also hides their public chat. Players with `oberonmsg.ignore.bypass` are never hidden.

## Log

```yaml
Log:
  Enabled: false
```

Off by default. See [Social spy & logging](/plugins/oberonmsg/features/social-spy/).

## Vanish

```yaml
Vanish:
  Enabled: true
  Filter-Tab-Completion: true
  Levels:
    - Target: "pv.see.level6"
      Required: "pv.see.level100"
  Fallback-Required: "pv.see"
```

Covered on [Vanish & AFK](/plugins/oberonmsg/features/vanish-and-afk/).

> `Vanish.Levels` is never merged back from the defaults.

## Debug

```yaml
Debug: false
```
