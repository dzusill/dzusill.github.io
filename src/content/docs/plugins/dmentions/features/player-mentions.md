---
title: "Player Mentions"
description: "The core feature. Type @ followed by a player's name and they get pinged."
---

The core feature. Type `@` followed by a player's name and they get pinged.

---

## Configuration

```yaml
player:
  enabled: true
  permission: "dmentions.mention.player"
  sound: "entity.chicken.egg"
  color: "#a9e871"
  display: "@{p}"
  customized_display: "<#eac773>@{display}"
  cooldown: 5
```

| Key | Effect |
|---|---|
| `enabled` | `false` makes `@name` ordinary text |
| `permission` | who may mention players |
| `sound` | played to the mentioned player — any Minecraft sound key |
| `color` | the highlight colour in chat |
| `display` | how the mention renders; `{p}` = the player's name |
| `customized_display` | used instead when the target set their own tag; `{display}` = their custom text |
| `cooldown` | seconds between player mentions, per sender |

## Two display formats

`display` is the default: `@Steve` in the configured colour.

`customized_display` applies when the mentioned player has set a custom tag with `/dm customize`. Giving it its own format lets you make custom tags visually distinct — the shipped default uses a different colour — so a customised name never impersonates the plain one.

## Name matching

Matching is case-insensitive and works on the player's real name. Only online players are matched; `@Steve` when Steve is offline stays plain text and pings nobody.

## Who hears what

| Audience | Gets |
|---|---|
| The mentioned player | the sound plus the highlighted message |
| Everyone else | the highlight, no sound |
| The sender | the highlight, no sound |

## When a mention does not fire

- the sender lacks `player.permission`
- they are still inside `cooldown`
- the message is over `mention_limit`
- the world is in `disabled_worlds`
- the target has mentions off (`/dm toggle`)
- the target is vanished, AFK or ignoring the sender — see [Integrations](/plugins/dmentions/features/integrations/)

In every case the message still sends. The mention simply does not trigger, and the name is not highlighted.

## Next

- [Nearby & Everyone](/plugins/dmentions/features/nearby-and-everyone/)
