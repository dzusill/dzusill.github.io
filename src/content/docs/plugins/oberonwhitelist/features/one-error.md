---
title: "One Indistinguishable Error"
description: "Blocked, hidden and never-installed commands all produce the same message, action bar and sound — so nobody can map your plugin list by reading error replies."
---

Every command a player cannot run answers the same way. Blocked, hidden, or never installed at all — one reply:

```
This command does not exist.
```

...with the same action bar and the same sound. There is nothing in the response to tell the three cases apart.

## Why this matters

The usual failure is subtler than it looks. A whitelist fires its custom message for commands on its block list, and lets everything else fall through to the server's own reply. The two look different, and that difference is information:

```
/pl        → "This command does not exist."   ← custom: so this one is blocked
/skript    → "Unknown command."               ← vanilla: so this one really is absent
/essentials:tp → "You do not have permission" ← so EssentialsX is installed
```

A player who tries a few dozen command names learns your plugin roster, whatever the block list says. Hiding commands from tab completion does not help if the error replies answer the question anyway.

Here both paths — a denial, and Minecraft's own unknown-command path — run the same configured actions, and the vanilla message is suppressed. They cannot disagree because there is only one list of actions.

## Configuring the reply

```yaml
blocked-actions:
  - 'message: &cThis command does not exist.'
  - 'actionbar: &cThis command does not exist.'
  - 'playsound: entity.villager.no;1.0;1.0'
```

The default deliberately imitates a command that does not exist. Anything more specific — *You don't have permission for that* — confirms the command is real, which is what the whole arrangement is avoiding.

### Available actions

| Prefix | Format | Notes |
|---|---|---|
| `message:` | text | chat message |
| `actionbar:` | text | above the hotbar |
| `title:` | `title;subtitle` | |
| `playsound:` | `key;volume;pitch` | e.g. `entity.villager.no;1.0;1.0` |
| `give_potion_effect:` | `type;seconds;amplifier` | e.g. `blindness;3;0` |
| `console_command:` | command | run by the console |

Both `&`-codes and MiniMessage tags work, so a config carried over from another plugin needs no rewriting.

### Placeholders

| | |
|---|---|
| `%player%` | the player's name |
| `%command%` | what they typed |

Keep `%command%` out of the player-facing message. Echoing it back is harmless, but it makes the reply feel targeted, which invites people to test it.

### Rate limiting

```yaml
blocked-action-cooldown-millis: 500
```

The minimum gap between two replies to the same player. `0` disables it. Worth setting if you use a sound: a player holding a key down otherwise triggers it repeatedly.

## A malformed action never silences the reply

Each action runs independently. If one fails — an unknown sound key, a potion type that does not exist — it is logged and the rest still run:

```
[OberonWhitelist] Blocked-command action 'PLAYSOUND: entity.villager.nope;1.0;1.0' failed
```

The message is the part that matters, and a broken sound must not be the reason a player sees nothing at all.

If the list ends up with no usable entries, that is reported at startup:

```
[OberonWhitelist] No usable entries in blocked-actions: players will see nothing at
all when a command is denied, which tells them the command exists.
```

Silence is itself a signal — a command that produces no reply behaves differently from one that does.

## Who is exempt

Players with `oberonwhitelist.bypass` see the server's normal replies, since they are not being filtered in the first place. Console and command blocks are never affected.
